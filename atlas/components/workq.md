# Workqueues & kthreads

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`kernel/workqueue.c`](https://elixir.bootlin.com/linux/latest/source/kernel/workqueue.c)

Run deferred work later in process context (can sleep). kworker threads execute it.

**Key symbols:** `queue_work`, `kworker`, `delayed_work`, `kthread_run`

**Connects to:** [Softirqs](../components/softirq.md) · [Generic IRQ](../components/genirq.md) · [USB](../components/usb.md)

**Appears in:** [USB hotplug](../traces/plug.md)
