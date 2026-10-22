# Generic IRQ

**Group:** Interrupts · **Layer:** Interrupts & deferred work · **Source:** [`kernel/irq/`](https://elixir.bootlin.com/linux/latest/source/kernel/irq/)

Maps hardware interrupts to irq_desc and calls driver handlers. Supports threaded handlers.

**Key symbols:** `irq_desc`, `irq_chip`, `irq_domain`, `request_irq`, `handle_fasteoi_irq`

**Connects to:** [Entry code](../components/entry.md) · [APIC](../components/apic.md) · [Softirqs](../components/softirq.md) · [Workqueues & kthreads](../components/workq.md) · [NVMe driver](../components/nvme.md) · [NIC driver](../components/nicdrv.md) · [USB](../components/usb.md) · [PCI / PCIe](../components/pci.md)

**Appears in:** [Disk read](../traces/disk.md) · [Swap-in fault](../traces/swapin.md)
