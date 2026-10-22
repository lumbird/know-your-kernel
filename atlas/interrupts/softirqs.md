# Softirqs

Run after hard IRQs with interrupts enabled. Ordered by priority:

0. `HI_SOFTIRQ`
1. `TIMER_SOFTIRQ`
2. `NET_TX_SOFTIRQ`
3. `NET_RX_SOFTIRQ`
4. `BLOCK_SOFTIRQ`
5. `IRQ_POLL_SOFTIRQ`
6. `TASKLET_SOFTIRQ`
7. `SCHED_SOFTIRQ`
8. `HRTIMER_SOFTIRQ`
9. `RCU_SOFTIRQ`

- Too much work → handed to the per-CPU `ksoftirqd/N` thread.
- Tasklets run inside HI and TASKLET softirqs (being replaced by BH workqueues).
