# vDSO

**Group:** User space · **Layer:** User space · **Source:** [`arch/x86/entry/vdso/`](https://elixir.bootlin.com/linux/latest/source/arch/x86/entry/vdso/)

Kernel-supplied code mapped into every process. Time calls run without entering the kernel.

**Key symbols:** `__vdso_clock_gettime`, `vdso data page`

**Connects to:** [C library](../components/libc.md) · [Time & timers](../components/timers.md)
