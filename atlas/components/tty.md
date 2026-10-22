# TTY & pty

**Group:** Drivers · **Layer:** Drivers · **Source:** [`drivers/tty/`](https://elixir.bootlin.com/linux/latest/source/drivers/tty/)

Terminals. The line discipline (n_tty) handles line editing and turns Ctrl+C into SIGINT. A pty pair links a terminal emulator to a shell.

**Key symbols:** `n_tty`, `pty master/slave`, `line discipline`, `isig`

**Connects to:** [Char devices](../components/chardev.md) · [Signals](../components/signals.md) · [Input](../components/input.md)

**Appears in:** [Ctrl+C](../traces/ctrlc.md)
