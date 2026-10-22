# CPU exceptions

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`arch/x86/kernel/traps.c`](https://elixir.bootlin.com/linux/latest/source/arch/x86/kernel/traps.c)

Handlers for vectors 0–31: #UD, #GP, #DB, #BP... User faults become signals; kernel faults oops.

**Key symbols:** `exc_general_protection`, `exc_invalid_op`, `die()`

**Connects to:** [Entry code](../components/entry.md) · [Signals](../components/signals.md)
