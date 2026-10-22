# Net core

**Group:** Networking · **Layer:** Core subsystems · **Source:** [`net/core/dev.c`](https://elixir.bootlin.com/linux/latest/source/net/core/dev.c)

sk_buff and net_device. NAPI polling, GRO, queuing disciplines, XDP.

**Key symbols:** `sk_buff`, `net_device`, `napi_struct`, `netif_receive_skb`, `dev_queue_xmit`

**Connects to:** [TCP/IP](../components/tcpip.md) · [NIC driver](../components/nicdrv.md) · [Softirqs](../components/softirq.md) · [eBPF](../components/bpf.md) · [Netlink](../components/netlink.md) · [Notifier chains](../components/notifier.md)

**Appears in:** [Packet receive](../traces/net.md)
