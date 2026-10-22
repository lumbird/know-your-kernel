# Sockets

**Group:** Networking · **Layer:** Core subsystems · **Source:** [`net/socket.c`](https://elixir.bootlin.com/linux/latest/source/net/socket.c)

File-backed endpoint. Each protocol family plugs in proto_ops.

**Key symbols:** `struct socket`, `struct sock`, `sendmsg/recvmsg`

**Connects to:** [Syscall entry](../components/syscall.md) · [TCP/IP](../components/tcpip.md) · [Netlink](../components/netlink.md) · [poll / epoll](../components/epoll.md) · [io_uring](../components/iouring.md)

**Appears in:** [Packet receive](../traces/net.md)
