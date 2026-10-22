# Time & timers

**Group:** Processes & scheduling · **Layer:** Core subsystems · **Source:** [`kernel/time/`](https://elixir.bootlin.com/linux/latest/source/kernel/time/)

Clocksource reads time (TSC); clockevents fire interrupts (LAPIC timer). Drives the tick and hrtimers.

**Key symbols:** `timekeeping`, `hrtimer`, `timer_list`, `NO_HZ`, `jiffies`

**Connects to:** [Scheduler core](../components/schedcore.md) · [APIC](../components/apic.md) · [Softirqs](../components/softirq.md) · [vDSO](../components/vdso.md)
