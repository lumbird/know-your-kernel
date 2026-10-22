# Signals

**Group:** User–kernel boundary · **Layer:** Boundary · **Source:** [`kernel/signal.c`](https://elixir.bootlin.com/linux/latest/source/kernel/signal.c)

Kernel → process notifications. Queued on the task, delivered on the next return to user space.

**Key symbols:** `send_signal`, `get_signal`, `rt_sigreturn`, `SIGSEGV`

**Connects to:** [Tasks](../components/task.md) · [Entry code](../components/entry.md) · [Page fault](../components/pagefault.md) · [Syscall entry](../components/syscall.md) · [TTY & pty](../components/tty.md) · [CPU exceptions](../components/traps.md)

**Appears in:** [Ctrl+C](../traces/ctrlc.md)
