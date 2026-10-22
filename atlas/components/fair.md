# EEVDF (fair)

**Group:** Processes & scheduling · **Layer:** Core subsystems · **Source:** [`kernel/sched/fair.c`](https://elixir.bootlin.com/linux/latest/source/kernel/sched/fair.c)

Default class. Runs the eligible task with the earliest virtual deadline. Weight comes from nice.

**Key symbols:** `sched_entity`, `cfs_rq`, `vruntime`, `avg_vruntime`, `pick_eevdf`

**Connects to:** [Scheduler core](../components/schedcore.md) · [cgroups](../components/cgroups.md)
