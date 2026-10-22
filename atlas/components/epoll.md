# poll / epoll

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`fs/eventpoll.c`](https://elixir.bootlin.com/linux/latest/source/fs/eventpoll.c)

Wait on many files at once. Drivers wake the wait queue, epoll marks the file ready.

**Key symbols:** `epoll_wait`, `ep_poll_callback`, `f_op->poll`

**Connects to:** [Wait queues](../components/waitq.md) · [VFS](../components/vfs.md) · [Sockets](../components/socket.md) · [Input](../components/input.md)

**Appears in:** [Keypress](../traces/key.md)
