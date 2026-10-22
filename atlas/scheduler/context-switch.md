# Context switch path

1. **Need resched** — Tick, wakeup or yield sets TIF_NEED_RESCHED. (`kernel/sched/core.c`)
2. **__schedule()** — Called on return from IRQ/syscall or when blocking. (`kernel/sched/core.c`)
3. **pick_next_task()** — Walk classes top to bottom; first one with a task wins. (`kernel/sched/core.c`)
4. **context_switch()** — Switch address space if the next task has a different mm. (`kernel/sched/core.c`)
5. **switch_mm_irqs_off()** — Load CR3 (PCID avoids a full TLB flush). (`arch/x86/mm/tlb.c`)
6. **__switch_to_asm** — Save callee-saved registers, swap RSP. (`arch/x86/entry/entry_64.S`)
7. **__switch_to()** — FS/GS base, FPU state, TSS RSP0. (`arch/x86/kernel/process_64.c`)
8. **finish_task_switch()** — Drop the previous task's references; new task resumes. (`kernel/sched/core.c`)
