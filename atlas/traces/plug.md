# Trace: USB hotplug

A USB stick is plugged in.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | Hardware → Driver / IRQ | irq | Port status change → xhci_irq. Hub reports a new connection. | [USB](../components/usb.md) |
| 2 | Driver / IRQ → Kernel core | call | hub_wq runs hub_event. Reset port, assign address, read descriptors. | [Workqueues & kthreads](../components/workq.md) |
| 3 | Kernel core → Driver / IRQ | call | device_add → bus match → probe. usb-storage binds if loaded. | [Driver model](../components/drvcore.md) |
| 4 | Driver / IRQ → Boundary | event | kobject_uevent(ADD). Netlink multicast with MODALIAS etc. | [kobject & uevent](../components/kobject.md) |
| 5 | Boundary → User space | event | udevd receives uevent. Runs rules, may modprobe, creates /dev/disk/by-* links. | [udev](../components/udev.md) |
| 6 | User space → Boundary | trap | modprobe → finit_module. Only when no driver was loaded; probe follows. | [Modules](../components/module.md) |
| 7 | Boundary → User space | event | udev re-broadcasts to apps. Desktop shows the new drive. | [udev](../components/udev.md) |
