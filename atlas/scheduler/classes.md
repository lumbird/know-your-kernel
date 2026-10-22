# Scheduling classes (pick order)

1. **stop** (—) — One per CPU. Migration and stop_machine. Preempts everything.
2. **deadline** (SCHED_DEADLINE) — Earliest deadline first with runtime budgets.
3. **real-time** (SCHED_FIFO · SCHED_RR) — Priorities 1–99. FIFO runs until it blocks; RR adds a time slice.
4. **fair (EEVDF)** (SCHED_NORMAL · BATCH · IDLE) — Proportional share by weight. Most tasks live here.
5. **sched_ext** (SCHED_EXT) — BPF-defined policy. Falls back to fair if the BPF scheduler fails.
6. **idle** (—) — Runs when nothing else can. Enters a CPU sleep state.

- First class with a runnable task wins.
