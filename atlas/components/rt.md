# Real-time

**Group:** Processes & scheduling · **Layer:** Core subsystems · **Source:** [`kernel/sched/rt.c`](https://elixir.bootlin.com/linux/latest/source/kernel/sched/rt.c)

SCHED_FIFO / SCHED_RR. 100 fixed priority lists; highest non-empty list runs.

**Key symbols:** `rt_rq`, `rt_prio_array`, `SCHED_FIFO`, `SCHED_RR`

**Connects to:** [Scheduler core](../components/schedcore.md)
