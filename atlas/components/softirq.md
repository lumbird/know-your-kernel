# Softirqs

**Group:** Interrupts · **Layer:** Interrupts & deferred work · **Source:** [`kernel/softirq.c`](https://elixir.bootlin.com/linux/latest/source/kernel/softirq.c)

Bottom halves run right after hard IRQs: NET_RX, TIMER, BLOCK, RCU... Overflow goes to ksoftirqd.

**Key symbols:** `raise_softirq`, `handle_softirqs`, `ksoftirqd`, `tasklet`

**Connects to:** [Generic IRQ](../components/genirq.md) · [Net core](../components/netcore.md) · [Time & timers](../components/timers.md) · [Block layer](../components/blkmq.md) · [Workqueues & kthreads](../components/workq.md)

**Appears in:** [Packet receive](../traces/net.md)
