# Driver model

**Group:** Drivers · **Layer:** Drivers · **Source:** [`drivers/base/`](https://elixir.bootlin.com/linux/latest/source/drivers/base/)

Buses match devices to drivers and call probe(). Everything appears in sysfs.

**Key symbols:** `struct device`, `device_driver`, `bus_type`, `probe`, `devm_*`

**Connects to:** [kobject & uevent](../components/kobject.md) · [PCI / PCIe](../components/pci.md) · [USB](../components/usb.md) · [Modules](../components/module.md) · [Notifier chains](../components/notifier.md) · [Boot & init](../components/boot.md)

**Appears in:** [USB hotplug](../traces/plug.md)
