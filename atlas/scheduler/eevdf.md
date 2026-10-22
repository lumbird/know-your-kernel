# EEVDF in one page

- Each task: **weight** (from nice), **vruntime**, **virtual deadline**.
- vruntime grows by `ran_ns × 1024 / weight`. Heavier tasks age slower.
- **V** = weighted average vruntime of the queue.
- **Eligible**: vruntime ≤ V (lag ≥ 0, it is owed CPU).
- **Deadline** = vruntime + `slice × 1024 / weight`.
- **Pick**: eligible task with the earliest deadline.
- Default slice ≈ 0.75 ms × (1 + log2 CPUs), capped at 8 CPUs.
- Replaced CFS in Linux 6.6. Code: `pick_eevdf()` in kernel/sched/fair.c.
