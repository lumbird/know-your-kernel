# Choosing deferred work

| Mechanism | Context | Can sleep | Use for |
|---|---|---|---|
| Hard IRQ handler | interrupt | no | ack device, grab status |
| Threaded IRQ | kthread | yes | slow device handling |
| Softirq | after IRQ / ksoftirqd | no | networking, timers, block completion |
| Tasklet | softirq | no | legacy; being replaced by BH workqueues |
| Workqueue | kworker | yes | anything that may block |
| Timer / hrtimer | softirq / hardirq | no | run later at a time |

Rule: do the minimum in hard IRQ, push the rest down.
