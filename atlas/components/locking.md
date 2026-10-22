# Locks & RCU

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`kernel/locking/`](https://elixir.bootlin.com/linux/latest/source/kernel/locking/)

Spinlocks (no sleep), mutexes (sleep), RCU (lock-free readers), atomics, per-CPU data.

**Key symbols:** `spinlock_t`, `mutex`, `rcu_read_lock`, `call_rcu`, `seqlock`

**Connects to:** [Wait queues](../components/waitq.md) · [Futex](../components/futex.md)
