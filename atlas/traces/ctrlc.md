# Trace: Ctrl+C

Ctrl+C in a terminal stops the running program.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | User space → Boundary | trap | Terminal writes 0x03 to the pty. The emulator turns the keypress into the INTR byte. | [TTY & pty](../components/tty.md) |
| 2 | Boundary → Driver / IRQ | call | n_tty sees INTR. ISIG is on, so it is not passed on as input. | [TTY & pty](../components/tty.md) |
| 3 | Driver / IRQ → Kernel core | call | isig → kill_pgrp(SIGINT). Queued on every task in the foreground process group. | [Signals](../components/signals.md) |
| 4 | Kernel core → Kernel core | wake | signal_wake_up. A task blocked in read() is woken. | [Scheduler core](../components/schedcore.md) |
| 5 | Kernel core → Kernel core | call | Exit-to-user work. TIF_SIGPENDING checked before returning. | [Entry code](../components/entry.md) |
| 6 | Kernel core → User space | ret | Deliver the signal. Default action terminates; a handler gets a signal frame instead. | [Signals](../components/signals.md) |
| 7 | User space → Boundary | trap | rt_sigreturn. Handler returns; saved registers restored. | [Signals](../components/signals.md) |
