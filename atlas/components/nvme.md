# NVMe driver

**Group:** Drivers · **Layer:** Drivers · **Source:** [`drivers/nvme/host/`](https://elixir.bootlin.com/linux/latest/source/drivers/nvme/host/)

Submission/completion queue pairs in RAM. Doorbell write starts I/O; MSI-X signals completion.

**Key symbols:** `nvme_queue_rq`, `doorbell`, `nvme_irq`, `PRP`

**Connects to:** [Block layer](../components/blkmq.md) · [PCI / PCIe](../components/pci.md) · [DMA mapping](../components/dma.md) · [Generic IRQ](../components/genirq.md) · [NVMe SSD](../components/ssd.md)

**Appears in:** [Disk read](../traces/disk.md) · [Swap-in fault](../traces/swapin.md)
