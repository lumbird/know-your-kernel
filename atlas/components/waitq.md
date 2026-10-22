# Wait queues

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`kernel/sched/wait.c`](https://elixir.bootlin.com/linux/latest/source/kernel/sched/wait.c)

How a task sleeps until an event. wake_up() makes it runnable again.

**Key symbols:** `wait_event`, `wake_up`, `completion`

**Connects to:** [Scheduler core](../components/schedcore.md) · [poll / epoll](../components/epoll.md) · [Locks & RCU](../components/locking.md) · [Page cache](../components/pagecache.md) · [Futex](../components/futex.md) · [Pipes & IPC](../components/ipc.md)

**Appears in:** [Disk read](../traces/disk.md) · [Swap-in fault](../traces/swapin.md)
