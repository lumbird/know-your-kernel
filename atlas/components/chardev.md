# Char devices

**Group:** Files & storage · **Layer:** Core subsystems · **Source:** [`fs/char_dev.c`](https://elixir.bootlin.com/linux/latest/source/fs/char_dev.c)

/dev nodes with a major/minor number routed to a driver's file_operations.

**Key symbols:** `cdev_add`, `misc_register`, `major:minor`

**Connects to:** [VFS](../components/vfs.md) · [ioctl](../components/ioctl.md) · [Input](../components/input.md) · [DRM / GPU](../components/drm.md) · [TTY & pty](../components/tty.md)

**Appears in:** [Keypress](../traces/key.md)
