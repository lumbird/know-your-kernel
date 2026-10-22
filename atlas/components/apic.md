# APIC

**Group:** x86-64 arch · **Layer:** x86-64 arch · **Source:** [`arch/x86/kernel/apic/`](https://elixir.bootlin.com/linux/latest/source/arch/x86/kernel/apic/)

Local APIC per CPU (timer, IPIs, EOI) and IOAPIC/MSI routing. Allocates vectors.

**Key symbols:** `apic_eoi`, `vector matrix`, `IOAPIC`, `MSI`, `IPI`

**Connects to:** [Generic IRQ](../components/genirq.md) · [Time & timers](../components/timers.md) · [Scheduler core](../components/schedcore.md) · [CPU cores](../components/cpu.md) · [PCIe fabric](../components/pcie.md)
