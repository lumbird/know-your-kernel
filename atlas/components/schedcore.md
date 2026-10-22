# Scheduler core

**Group:** Processes & scheduling · **Layer:** Core subsystems · **Source:** [`kernel/sched/core.c`](https://elixir.bootlin.com/linux/latest/source/kernel/sched/core.c)

Per-CPU run queues. Picks the next task by class priority and switches to it.

**Key symbols:** `struct rq`, `__schedule`, `try_to_wake_up`, `sched_tick`, `pick_next_task`

**Connects to:** [Tasks](../components/task.md) · [EEVDF (fair)](../components/fair.md) · [Real-time](../components/rt.md) · [Deadline](../components/dl.md) · [sched_ext](../components/schedext.md) · [Context switch](../components/switch.md) · [Time & timers](../components/timers.md) · [Wait queues](../components/waitq.md) · [APIC](../components/apic.md)

**Appears in:** [Disk read](../traces/disk.md)
