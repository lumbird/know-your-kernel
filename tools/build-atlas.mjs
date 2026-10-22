// Generates atlas/*.md from docs/data/*.js. Run: node tools/build-atlas.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "docs", "data");
const out = path.join(root, "atlas");

const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["components.js", "communication.js", "interrupts.js", "scheduler.js", "memory.js", "boot.js"])
  vm.runInContext(fs.readFileSync(path.join(dataDir, f), "utf8"), ctx);
const K = ctx.KF;
const byId = Object.fromEntries(K.components.map(c => [c.id, c]));
const ELIXIR = "https://elixir.bootlin.com/linux/latest/source/";

const files = [];
const write = (rel, body) => {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body.trim() + "\n");
  files.push(rel);
};
const clink = (id, from = "") => `[${byId[id].name}](${from}components/${id}.md)`;
const src = p => p ? `[\`${p}\`](${ELIXIR}${p})` : "—";

// ── components
for (const c of K.components) {
  const back = K.components.filter(o => o.links.includes(c.id) && !c.links.includes(o.id)).map(o => o.id);
  const traces = K.traces.filter(t => t.steps.some(s => s.c === c.id));
  write(`components/${c.id}.md`, `
# ${c.name}

**Group:** ${K.groups[c.group].name} · **Layer:** ${K.layers.find(l => l.id === c.layer).name} · **Source:** ${src(c.path)}

${c.sum.replace(/`/g, "`")}

**Key symbols:** ${c.keys.map(k => "`" + k + "`").join(", ")}

**Connects to:** ${[...c.links, ...back].map(id => clink(id, "../")).join(" · ")}
${traces.length ? `\n**Appears in:** ${traces.map(t => `[${t.name}](../traces/${t.id}.md)`).join(" · ")}` : ""}
`);
}

// ── traces
for (const t of K.traces) {
  const lane = id => K.lanes.find(l => l.id === id).name;
  write(`traces/${t.id}.md`, `
# Trace: ${t.name}

${t.q}.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
${t.steps.map((s, i) => `| ${i + 1} | ${lane(s.a)} → ${lane(s.b)} | ${s.via} | ${s.t.replace(/\|/g, "\\|")}. ${s.d} | ${clink(s.c, "../")} |`).join("\n")}
`);
}

// ── channels
const dirName = { u2k: "User ↔ kernel", k: "Inside the kernel", k2h: "Kernel ↔ hardware" };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
for (const ch of K.channels)
  write(`channels/${slug(ch.name)}.md`, `
# ${ch.name}

**Direction:** ${dirName[ch.dir]} · **Style:** ${ch.mode}

${ch.how}

See ${clink(ch.c, "../")}.
`);

// ── interrupts
const { ivt, idt } = K.ivtIdt;
write("interrupts/ivt-vs-idt.md", `
# IVT vs IDT

| | ${ivt.name} | ${idt.name} |
|---|---|---|
${["mode", "entry", "count", "size", "where", "holds", "protect", "user"].map(k => `| ${k} | ${ivt[k]} | ${idt[k]} |`).join("\n")}

- Both map a vector number (0–255) to a handler.
- In real mode the IDTR still exists; it defaults to base 0, limit 0x3FF.
`);
write("interrupts/gate-descriptor.md", `
# 64-bit IDT gate (16 bytes)

| Bits | Field | Meaning |
|---|---|---|
${K.gate.map(g => `| ${g.lo}–${g.hi} | ${g.f} | ${g.d} |`).join("\n")}

- Typical Linux kernel gate byte 5: \`0x8E\` (P=1, DPL=0, interrupt gate).
- User-callable (int3, int 0x80): \`0xEE\` (DPL=3).
- Linux struct: \`gate_struct\` in arch/x86/include/asm/desc_defs.h.
`);
let vrows = "";
for (let v = 0; v < 256; v++) {
  const i = K.vectorInfo(v);
  if (i.kind === "device" && v !== 0x20 && v !== 0x81) continue;
  vrows += `| ${i.hex} | ${i.kind} | ${i.tag} | ${i.name} |\n`;
}
write("interrupts/vectors.md", `
# x86-64 vectors in Linux

- 0x00–0x1F: CPU exceptions.
- 0x20–0xEA: device IRQs, allocated at runtime (0x30–0x3F legacy ISA, 0x80 int 0x80).
- 0xEB–0xFF: system vectors (timer, IPIs, APIC).
- Source: arch/x86/include/asm/irq_vectors.h.

| Vector | Kind | Tag | Use |
|---|---|---|---|
${vrows}
(Device ranges collapsed.)
`);
write("interrupts/irq-path.md", `
# Hardware interrupt path

${K.irqPath.map((s, i) => `${i + 1}. **${s.s}** — ${s.d}${s.p ? ` (\`${s.p}\`)` : ""}`).join("\n")}
`);
write("interrupts/softirqs.md", `
# Softirqs

Run after hard IRQs with interrupts enabled. Ordered by priority:

${K.softirqs.map((s, i) => `${i}. \`${s}_SOFTIRQ\``).join("\n")}

- Too much work → handed to the per-CPU \`ksoftirqd/N\` thread.
- Tasklets run inside HI and TASKLET softirqs (being replaced by BH workqueues).
`);

// ── scheduler
write("scheduler/classes.md", `
# Scheduling classes (pick order)

${K.schedClasses.map((c, i) => `${i + 1}. **${c.name}** (${c.pol}) — ${c.d}`).join("\n")}

- First class with a runnable task wins.
`);
write("scheduler/context-switch.md", `
# Context switch path

${K.switchPath.map((s, i) => `${i + 1}. **${s.s}** — ${s.d} (\`${s.p}\`)`).join("\n")}
`);
write("scheduler/eevdf.md", `
# EEVDF in one page

- Each task: **weight** (from nice), **vruntime**, **virtual deadline**.
- vruntime grows by \`ran_ns × 1024 / weight\`. Heavier tasks age slower.
- **V** = weighted average vruntime of the queue.
- **Eligible**: vruntime ≤ V (lag ≥ 0, it is owed CPU).
- **Deadline** = vruntime + \`slice × 1024 / weight\`.
- **Pick**: eligible task with the earliest deadline.
- Default slice ≈ 0.75 ms × (1 + log2 CPUs), capped at 8 CPUs.
- Replaced CFS in Linux 6.6. Code: \`pick_eevdf()\` in kernel/sched/fair.c.
`);
write("scheduler/nice-weights.md", `
# Nice → weight

Each nice step ≈ 1.25× CPU share. Nice 0 = 1024.

| nice | weight |
|---|---|
${K.niceWeight.map((w, i) => `| ${i - 20} | ${w} |`).join("\n")}
`);

// ── memory
write("memory/address-map.md", `
# x86-64 virtual memory map (4-level)

| Start | End | Size | Region | Notes |
|---|---|---|---|---|
${K.memMap.map(r => `| \`${r.s}\` | \`${r.e}\` | ${r.size} | ${r.n} | ${r.d} |`).join("\n")}

- Source: Documentation/arch/x86/x86_64/mm.rst. KASLR shifts direct map, vmalloc and vmemmap bases.
`);
write("memory/page-walk.md", `
# Page-table walk

4-level (48-bit): ${K.levels4.map(l => `${l.n} [${l.hi}:${l.lo}]`).join(" → ")}

5-level (57-bit): ${K.levels5.map(l => `${l.n} [${l.hi}:${l.lo}]`).join(" → ")}

- Each table: 512 × 8-byte entries = one 4 KiB page.
- 9 bits per level; 12-bit offset into the page.
- A PMD entry can map 2 MiB directly; a PUD entry 1 GiB (huge pages).
- Canonical: all bits above the top index copy the top bit.
- CR3 holds the root; switching processes reloads it.
`);
write("memory/fault-flow.md", `
# Page fault flow

${K.faultFlow.map((s, i) => `${i + 1}. **${s.t}** — ${s.d}${s.leaf ? ` *(${s.leaf})*` : ""}`).join("\n")}

- Minor fault: no I/O. Major fault: waits for disk.
`);
write("memory/allocators.md", `
# Allocator stack (top = caller side)

${K.allocStack.map(s => `- **${s.n}** — ${s.d}`).join("\n")}

- GFP_KERNEL may sleep; GFP_ATOMIC may not and can dip into reserves.
`);
write("memory/watermarks.md", `
# Zone watermarks

${K.watermarks.map(w => `- **${w.n}** — ${w.d}`).join("\n")}

- Reclaim order: clean page cache → dirty cache (writeback) → anon to swap → OOM killer.
`);

// ── boot
write("boot/sequence.md", `
# Boot sequence (x86-64)

${K.boot.map((s, i) => `${i + 1}. **${s.t}** (${K.bootPhases[s.ph].name}) — ${s.d}${s.p ? ` (\`${s.p}\`)` : ""}`).join("\n")}

- PID 0 = idle task, PID 1 = init, PID 2 = kthreadd (parent of all kernel threads).
`);

// ── index (hand-written notes in atlas/notes/ are listed too, never overwritten)
const notesDir = path.join(out, "notes");
if (fs.existsSync(notesDir)) for (const f of fs.readdirSync(notesDir)) if (f.endsWith(".md")) files.push("notes/" + f);
const sec = (title, prefix) => `## ${title}\n\n${files.filter(f => f.startsWith(prefix)).map(f => {
  const first = fs.readFileSync(path.join(out, f), "utf8").split("\n")[0].replace(/^# /, "");
  return `- [${first}](${f})`;
}).join("\n")}`;
write("README.md", `
# Know Your Kernel: Atlas

Small notes on Linux (x86-64, mainline). Generated from \`docs/data/\` by \`tools/build-atlas.mjs\`; hand-written notes live in \`atlas/notes/\`.

> Educational notes, provided as is. They may be incomplete, outdated or inaccurate; check the kernel source before relying on them. See the [main README](../README.md#disclaimer).

${sec("Concepts", "notes/")}

${sec("Traces", "traces/")}

${sec("Interrupts", "interrupts/")}

${sec("Scheduler", "scheduler/")}

${sec("Memory", "memory/")}

${sec("Boot", "boot/")}

${sec("Channels", "channels/")}

## Components

${Object.keys(K.groups).map(g => `**${K.groups[g].name}:** ${K.components.filter(c => c.group === g).map(c => clink(c.id)).join(" · ")}`).join("\n\n")}
`);

console.log(`wrote ${files.length} files to atlas/`);
