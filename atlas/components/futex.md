# Futex

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`kernel/futex/`](https://elixir.bootlin.com/linux/latest/source/kernel/futex/)

Fast user-space lock. Uncontended path never enters the kernel; contended path sleeps on a hashed queue.

**Key symbols:** `futex_wait`, `futex_wake`, `FUTEX_WAIT/WAKE`

**Connects to:** [C library](../components/libc.md) · [Syscall entry](../components/syscall.md) · [Wait queues](../components/waitq.md) · [Locks & RCU](../components/locking.md)
