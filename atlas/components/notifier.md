# Notifier chains

**Group:** Sync & deferred work · **Layer:** Core subsystems · **Source:** [`kernel/notifier.c`](https://elixir.bootlin.com/linux/latest/source/kernel/notifier.c)

Publish/subscribe callbacks inside the kernel (netdev up, reboot, CPU hotplug).

**Key symbols:** `blocking_notifier_call_chain`, `register_netdevice_notifier`

**Connects to:** [Net core](../components/netcore.md) · [Driver model](../components/drvcore.md)
