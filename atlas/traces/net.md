# Trace: Packet receive

A TCP segment arrives for a waiting recv().

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | Hardware → Hardware | dma | NIC DMAs frame into RX ring. Buffer was pre-posted by the driver. | [Network card](../components/nic.md) |
| 2 | Hardware → Driver / IRQ | irq | MSI-X → driver ISR. ISR masks the queue IRQ and calls napi_schedule. | [NIC driver](../components/nicdrv.md) |
| 3 | Driver / IRQ → Driver / IRQ | softirq | NET_RX softirq → NAPI poll. Driver builds sk_buffs in a batch (XDP can act here). | [Softirqs](../components/softirq.md) |
| 4 | Driver / IRQ → Kernel core | call | GRO → netif_receive_skb. Protocol demux by ethertype. | [Net core](../components/netcore.md) |
| 5 | Kernel core → Kernel core | call | ip_rcv → tcp_v4_rcv. Netfilter hooks, socket lookup, queue to receive buffer. | [TCP/IP](../components/tcpip.md) |
| 6 | Kernel core → Kernel core | wake | sk_data_ready → wake reader. Wakes recv() sleeper or epoll. | [Sockets](../components/socket.md) |
| 7 | Kernel core → User space | copy | tcp_recvmsg → copy_to_user. Data returned from recv(). | [User copy](../components/uaccess.md) |
