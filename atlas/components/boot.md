# Boot & init

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`init/main.c`](https://elixir.bootlin.com/linux/latest/source/init/main.c)

Firmware → decompress → long mode → start_kernel → initcalls → PID 1.

**Key symbols:** `startup_64`, `start_kernel`, `initcalls`, `initramfs`, `kernel_init`

**Connects to:** [IDT](../components/idt.md) · [Page allocator](../components/buddy.md) · [Driver model](../components/drvcore.md) · [Tasks](../components/task.md)
