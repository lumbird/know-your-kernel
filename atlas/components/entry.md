# Entry code

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`arch/x86/entry/entry_64.S`](https://elixir.bootlin.com/linux/latest/source/arch/x86/entry/entry_64.S)

Assembly that saves registers into pt_regs, switches stacks and GS, then calls C handlers.

**Key symbols:** `DEFINE_IDTENTRY`, `irqentry_enter/exit`, `swapgs`, `FRED`

**Connects to:** [IDT](../components/idt.md) · [Syscall entry](../components/syscall.md) · [Generic IRQ](../components/genirq.md) · [Page fault](../components/pagefault.md) · [Signals](../components/signals.md) · [CPU exceptions](../components/traps.md)

**Appears in:** [fork + exec](../traces/forkexec.md) · [Swap-in fault](../traces/swapin.md) · [Ctrl+C](../traces/ctrlc.md)
