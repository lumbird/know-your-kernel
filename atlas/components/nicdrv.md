# NIC driver

**Group:** Drivers · **Layer:** Drivers · **Source:** [`drivers/net/ethernet/`](https://elixir.bootlin.com/linux/latest/source/drivers/net/ethernet/)

RX/TX descriptor rings shared with the NIC. Interrupt → NAPI poll.

**Key symbols:** `ndo_start_xmit`, `napi_schedule`, `RX ring`

**Connects to:** [Net core](../components/netcore.md) · [PCI / PCIe](../components/pci.md) · [DMA mapping](../components/dma.md) · [Generic IRQ](../components/genirq.md) · [Network card](../components/nic.md)

**Appears in:** [Packet receive](../traces/net.md)
