# USB

**Group:** Drivers · **Layer:** Drivers · **Source:** [`drivers/usb/`](https://elixir.bootlin.com/linux/latest/source/drivers/usb/)

xHCI host controller driver, hub driver (hotplug), URB transfers to class drivers.

**Key symbols:** `xhci_irq`, `hub_event`, `urb`, `usb_driver`

**Connects to:** [PCI / PCIe](../components/pci.md) · [Driver model](../components/drvcore.md) · [Input](../components/input.md) · [Workqueues & kthreads](../components/workq.md) · [Generic IRQ](../components/genirq.md) · [USB keyboard](../components/kbd.md)

**Appears in:** [Keypress](../traces/key.md) · [USB hotplug](../traces/plug.md)
