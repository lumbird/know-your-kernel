/* Know Your Kernel — interrupts (x86-64). */
(window.KF = window.KF || {});

KF.ivtIdt = {
  ivt: { name: "IVT", mode: "Real mode (16-bit)", entry: "4 bytes", count: 256, size: "1 KiB", where: "Physical 0x0000–0x03FF", holds: "segment:offset of handler", protect: "None", user: "BIOS services (int 10h, 13h), boot loaders" },
  idt: { name: "IDT", mode: "Long mode (64-bit)", entry: "16 bytes", count: 256, size: "4 KiB", where: "Anywhere; address in IDTR (lidt)", holds: "Gate: 64-bit handler, selector, IST, DPL, type", protect: "DPL limits who may `int n`; IST picks a known-good stack", user: "Linux after early boot" }
};

/* 64-bit gate descriptor, bit ranges inclusive */
KF.gate = [
  { f: "offset 15:0",  lo: 0,  hi: 15,  d: "Low 16 bits of the handler address." },
  { f: "selector",     lo: 16, hi: 31,  d: "Code segment for the handler. Linux: __KERNEL_CS = 0x10." },
  { f: "IST",          lo: 32, hi: 34,  d: "0 = normal stack. 1–7 = Interrupt Stack Table slot in the TSS. Linux uses it for #DF, NMI, #DB, #MC." },
  { f: "0",            lo: 35, hi: 39,  d: "Reserved, zero." },
  { f: "type",         lo: 40, hi: 43,  d: "0xE interrupt gate (clears IF). 0xF trap gate (keeps IF)." },
  { f: "0",            lo: 44, hi: 44,  d: "Zero for system descriptors." },
  { f: "DPL",          lo: 45, hi: 46,  d: "Highest ring allowed to use `int n` on this vector. 3 for int3 and int 0x80." },
  { f: "P",            lo: 47, hi: 47,  d: "Present. 0 → #NP." },
  { f: "offset 31:16", lo: 48, hi: 63,  d: "Middle 16 bits of the handler address." },
  { f: "offset 63:32", lo: 64, hi: 95,  d: "High 32 bits of the handler address." },
  { f: "reserved",     lo: 96, hi: 127, d: "Must be zero." }
];

KF.exceptions = [
  ["#DE","Divide error"],["#DB","Debug"],["NMI","Non-maskable interrupt"],["#BP","Breakpoint (int3)"],
  ["#OF","Overflow"],["#BR","Bound range"],["#UD","Invalid opcode"],["#NM","Device not available (FPU)"],
  ["#DF","Double fault"],["—","Coprocessor overrun (legacy)"],["#TS","Invalid TSS"],["#NP","Segment not present"],
  ["#SS","Stack-segment fault"],["#GP","General protection"],["#PF","Page fault"],["—","Reserved"],
  ["#MF","x87 FP error"],["#AC","Alignment check"],["#MC","Machine check"],["#XM","SIMD FP error"],
  ["#VE","Virtualization exception"],["#CP","Control protection (CET)"],["—","Reserved"],["—","Reserved"],
  ["—","Reserved"],["—","Reserved"],["—","Reserved"],["—","Reserved"],
  ["#HV","Hypervisor injection (AMD)"],["#VC","VMM communication (SEV-ES)"],["#SX","Security exception (AMD)"],["—","Reserved"]
];

/* Linux system vectors, arch/x86/include/asm/irq_vectors.h (mainline) */
KF.sysVectors = {
  0xff: "Spurious APIC", 0xfe: "APIC error", 0xfd: "Reschedule IPI", 0xfc: "Call function IPI",
  0xfb: "Call function single IPI", 0xfa: "Thermal", 0xf9: "Threshold (MCE)", 0xf8: "Reboot",
  0xf7: "Platform IPI", 0xf6: "IRQ work", 0xf5: "Perf guest PMI", 0xf4: "Deferred error (AMD)",
  0xf3: "Hypervisor callback", 0xf2: "Posted interrupt", 0xf1: "Posted interrupt wakeup",
  0xf0: "Posted interrupt nested", 0xef: "Managed IRQ shutdown", 0xee: "Hyper-V reenlightenment",
  0xed: "Hyper-V stimer0", 0xec: "Local APIC timer", 0xeb: "Posted MSI notification"
};

KF.vectorKind = function (v) {
  if (v < 32) return KF.exceptions[v][0] === "—" ? "reserved" : "exception";
  if (v === 0x80) return "syscall";
  if (KF.sysVectors[v]) return "system";
  if (v >= 0x30 && v <= 0x3f) return "isa";
  return "device";
};

KF.vectorInfo = function (v) {
  var hex = "0x" + v.toString(16).toUpperCase().padStart(2, "0");
  var k = KF.vectorKind(v);
  if (v < 32) return { hex: hex, kind: k, name: KF.exceptions[v][1], tag: KF.exceptions[v][0] };
  if (k === "syscall") return { hex: hex, kind: k, name: "int 0x80 (32-bit compat syscalls)", tag: "SYS" };
  if (k === "system") return { hex: hex, kind: k, name: KF.sysVectors[v], tag: "SYS" };
  if (k === "isa") return { hex: hex, kind: k, name: "Legacy ISA IRQ " + (v - 0x30), tag: "ISA" };
  return { hex: hex, kind: k, name: "Device IRQ (allocated at runtime)", tag: "DEV" };
};

/* Hardware interrupt, end to end */
KF.irqPath = [
  { s: "Device signals", w: "hw",   d: "MSI-X: a memory write carrying the vector. Legacy: IOAPIC pin.", p: "" },
  { s: "Local APIC accepts", w: "hw", d: "Sets the vector's IRR bit; delivers when priority allows and IF=1.", p: "" },
  { s: "CPU indexes IDT", w: "cpu", d: "Loads the gate, switches to kernel stack (TSS RSP0 or IST), pushes SS RSP RFLAGS CS RIP.", p: "arch/x86/kernel/idt.c" },
  { s: "Entry stub", w: "asm", d: "swapgs if from user, build pt_regs, irqentry_enter.", p: "arch/x86/entry/entry_64.S" },
  { s: "common_interrupt", w: "c", d: "vector_irq[vector] → irq_desc → flow handler.", p: "arch/x86/kernel/irq.c" },
  { s: "Driver handler", w: "c", d: "action->handler from request_irq. Returns HANDLED or WAKE_THREAD.", p: "kernel/irq/handle.c" },
  { s: "EOI", w: "hw", d: "apic_eoi() lets the APIC deliver the next one.", p: "arch/x86/kernel/apic/" },
  { s: "Softirqs", w: "c", d: "irq_exit runs pending bottom halves (NET_RX, TIMER, BLOCK...).", p: "kernel/softirq.c" },
  { s: "Exit", w: "c", d: "Maybe reschedule, deliver signals, then iretq (or ERETU with FRED).", p: "kernel/entry/common.c" }
];

KF.softirqs = ["HI", "TIMER", "NET_TX", "NET_RX", "BLOCK", "IRQ_POLL", "TASKLET", "SCHED", "HRTIMER", "RCU"];
