# Hardware interrupt path

1. **Device signals** — MSI-X: a memory write carrying the vector. Legacy: IOAPIC pin.
2. **Local APIC accepts** — Sets the vector's IRR bit; delivers when priority allows and IF=1.
3. **CPU indexes IDT** — Loads the gate, switches to kernel stack (TSS RSP0 or IST), pushes SS RSP RFLAGS CS RIP. (`arch/x86/kernel/idt.c`)
4. **Entry stub** — swapgs if from user, build pt_regs, irqentry_enter. (`arch/x86/entry/entry_64.S`)
5. **common_interrupt** — vector_irq[vector] → irq_desc → flow handler. (`arch/x86/kernel/irq.c`)
6. **Driver handler** — action->handler from request_irq. Returns HANDLED or WAKE_THREAD. (`kernel/irq/handle.c`)
7. **EOI** — apic_eoi() lets the APIC deliver the next one. (`arch/x86/kernel/apic/`)
8. **Softirqs** — irq_exit runs pending bottom halves (NET_RX, TIMER, BLOCK...). (`kernel/softirq.c`)
9. **Exit** — Maybe reschedule, deliver signals, then iretq (or ERETU with FRED). (`kernel/entry/common.c`)
