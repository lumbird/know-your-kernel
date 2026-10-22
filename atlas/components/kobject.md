# kobject & uevent

**Group:** Drivers · **Layer:** Drivers · **Source:** [`lib/kobject_uevent.c`](https://elixir.bootlin.com/linux/latest/source/lib/kobject_uevent.c)

Refcounted object behind every sysfs directory. Emits add/remove events over netlink.

**Key symbols:** `kobject`, `kset`, `kobject_uevent`, `KOBJ_ADD`

**Connects to:** [sysfs](../components/sysfs.md) · [Netlink](../components/netlink.md) · [Driver model](../components/drvcore.md)

**Appears in:** [USB hotplug](../traces/plug.md)
