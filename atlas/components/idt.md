# IDT

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`arch/x86/kernel/idt.c`](https://elixir.bootlin.com/linux/latest/source/arch/x86/kernel/idt.c)

256 × 16-byte gates. Vector → handler address, stack (IST), privilege.

**Key symbols:** `idt_table`, `gate_desc`, `lidt`, `IST`

**Connects to:** [Entry code](../components/entry.md) · [CPU cores](../components/cpu.md) · [Boot & init](../components/boot.md)
