# Context switch

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`arch/x86/kernel/process_64.c`](https://elixir.bootlin.com/linux/latest/source/arch/x86/kernel/process_64.c)

Swap stack pointer and callee-saved registers, load CR3 if the mm changes, restore FPU/TLS.

**Key symbols:** `__switch_to_asm`, `__switch_to`, `switch_mm_irqs_off`

**Connects to:** [Scheduler core](../components/schedcore.md) · [Page tables](../components/pgtables.md) · [CPU cores](../components/cpu.md)
