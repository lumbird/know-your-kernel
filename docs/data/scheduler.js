/* Know Your Kernel — scheduler. */
(window.KF = window.KF || {});

/* Checked top to bottom on every pick. */
KF.schedClasses = [
  { id: "stop", name: "stop", pol: "—", d: "One per CPU. Migration and stop_machine. Preempts everything." },
  { id: "dl",   name: "deadline", pol: "SCHED_DEADLINE", d: "Earliest deadline first with runtime budgets." },
  { id: "rt",   name: "real-time", pol: "SCHED_FIFO · SCHED_RR", d: "Priorities 1–99. FIFO runs until it blocks; RR adds a time slice." },
  { id: "fair", name: "fair (EEVDF)", pol: "SCHED_NORMAL · BATCH · IDLE", d: "Proportional share by weight. Most tasks live here." },
  { id: "ext",  name: "sched_ext", pol: "SCHED_EXT", d: "BPF-defined policy. Falls back to fair if the BPF scheduler fails." },
  { id: "idle", name: "idle", pol: "—", d: "Runs when nothing else can. Enters a CPU sleep state." }
];

KF.switchPath = [
  { s: "Need resched", d: "Tick, wakeup or yield sets TIF_NEED_RESCHED.", p: "kernel/sched/core.c" },
  { s: "__schedule()", d: "Called on return from IRQ/syscall or when blocking.", p: "kernel/sched/core.c" },
  { s: "pick_next_task()", d: "Walk classes top to bottom; first one with a task wins.", p: "kernel/sched/core.c" },
  { s: "context_switch()", d: "Switch address space if the next task has a different mm.", p: "kernel/sched/core.c" },
  { s: "switch_mm_irqs_off()", d: "Load CR3 (PCID avoids a full TLB flush).", p: "arch/x86/mm/tlb.c" },
  { s: "__switch_to_asm", d: "Save callee-saved registers, swap RSP.", p: "arch/x86/entry/entry_64.S" },
  { s: "__switch_to()", d: "FS/GS base, FPU state, TSS RSP0.", p: "arch/x86/kernel/process_64.c" },
  { s: "finish_task_switch()", d: "Drop the previous task's references; new task resumes.", p: "kernel/sched/core.c" }
];

/* sched_prio_to_weight[], nice -20..19 */
KF.niceWeight = [
  88761, 71755, 56483, 46273, 36291, 29154, 23254, 18705, 14949, 11916,
  9548, 7620, 6100, 4904, 3906, 3121, 2501, 1991, 1586, 1277,
  1024, 820, 655, 526, 423, 335, 272, 215, 172, 137,
  110, 87, 70, 56, 45, 36, 29, 23, 18, 15
];
KF.weightOf = function (nice) { return KF.niceWeight[nice + 20]; };
