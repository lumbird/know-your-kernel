# Know Your Kernel: Atlas

Small notes on Linux (x86-64, mainline). Generated from `docs/data/` by `tools/build-atlas.mjs`; hand-written notes live in `atlas/notes/`.

> Educational notes, provided as is. They may be incomplete, outdated or inaccurate; check the kernel source before relying on them. See the [main README](../README.md#disclaimer).

## Concepts

- [Choosing deferred work](notes/deferred-work.md)
- [FRED](notes/fred.md)
- [How the kernel reaches user space](notes/kernel-to-user-paths.md)
- [Ops tables: the kernel's interfaces](notes/ops-tables.md)
- [Rings and privilege](notes/rings-and-privilege.md)
- [x86-64 syscall ABI](notes/syscall-abi.md)

## Traces

- [Trace: Disk read](traces/disk.md)
- [Trace: Keypress](traces/key.md)
- [Trace: Packet receive](traces/net.md)
- [Trace: USB hotplug](traces/plug.md)
- [Trace: fork + exec](traces/forkexec.md)
- [Trace: Swap-in fault](traces/swapin.md)
- [Trace: Ctrl+C](traces/ctrlc.md)

## Interrupts

- [IVT vs IDT](interrupts/ivt-vs-idt.md)
- [64-bit IDT gate (16 bytes)](interrupts/gate-descriptor.md)
- [x86-64 vectors in Linux](interrupts/vectors.md)
- [Hardware interrupt path](interrupts/irq-path.md)
- [Softirqs](interrupts/softirqs.md)

## Scheduler

- [Scheduling classes (pick order)](scheduler/classes.md)
- [Context switch path](scheduler/context-switch.md)
- [EEVDF in one page](scheduler/eevdf.md)
- [Nice → weight](scheduler/nice-weights.md)

## Memory

- [x86-64 virtual memory map (4-level)](memory/address-map.md)
- [Page-table walk](memory/page-walk.md)
- [Page fault flow](memory/fault-flow.md)
- [Allocator stack (top = caller side)](memory/allocators.md)
- [Zone watermarks](memory/watermarks.md)

## Channels

- [System call](channels/system-call.md)
- [vDSO](channels/vdso.md)
- [File ops on /dev](channels/file-ops-on-dev.md)
- [ioctl](channels/ioctl.md)
- [mmap](channels/mmap.md)
- [procfs / sysfs](channels/procfs-sysfs.md)
- [Netlink](channels/netlink.md)
- [io_uring](channels/io-uring.md)
- [eBPF maps](channels/ebpf-maps.md)
- [Signals](channels/signals.md)
- [poll / epoll](channels/poll-epoll.md)
- [Futex](channels/futex.md)
- [Ops tables](channels/ops-tables.md)
- [Exported symbols](channels/exported-symbols.md)
- [Wait queues](channels/wait-queues.md)
- [Notifier chains](channels/notifier-chains.md)
- [Softirqs](channels/softirqs.md)
- [Workqueues](channels/workqueues.md)
- [RCU](channels/rcu.md)
- [IPIs](channels/ipis.md)
- [MMIO](channels/mmio.md)
- [Port I/O](channels/port-i-o.md)
- [DMA](channels/dma.md)
- [Interrupts](channels/interrupts.md)
- [Polling](channels/polling.md)

## Components

**User space:** [Application](components/app.md) · [C library](components/libc.md) · [vDSO](components/vdso.md) · [udev](components/udev.md)

**User–kernel boundary:** [Syscall entry](components/syscall.md) · [User copy](components/uaccess.md) · [ioctl](components/ioctl.md) · [procfs](components/procfs.md) · [sysfs](components/sysfs.md) · [Netlink](components/netlink.md) · [io_uring](components/iouring.md) · [eBPF](components/bpf.md) · [Signals](components/signals.md)

**Processes & scheduling:** [Tasks](components/task.md) · [Scheduler core](components/schedcore.md) · [EEVDF (fair)](components/fair.md) · [Real-time](components/rt.md) · [Deadline](components/dl.md) · [sched_ext](components/schedext.md) · [cgroups](components/cgroups.md) · [Namespaces](components/ns.md) · [Time & timers](components/timers.md)

**Sync & deferred work:** [Locks & RCU](components/locking.md) · [Wait queues](components/waitq.md) · [Workqueues & kthreads](components/workq.md) · [Notifier chains](components/notifier.md) · [Futex](components/futex.md) · [poll / epoll](components/epoll.md) · [Pipes & IPC](components/ipc.md)

**Memory:** [Address spaces](components/vma.md) · [mmap / brk](components/mmap.md) · [Page tables](components/pgtables.md) · [Page fault](components/pagefault.md) · [Page allocator](components/buddy.md) · [SLUB](components/slub.md) · [vmalloc](components/vmalloc.md) · [Page cache](components/pagecache.md) · [Reclaim](components/reclaim.md) · [Swap](components/swap.md)

**Files & storage:** [VFS](components/vfs.md) · [ext4](components/ext4.md) · [Char devices](components/chardev.md) · [Block layer](components/blkmq.md)

**Networking:** [Sockets](components/socket.md) · [TCP/IP](components/tcpip.md) · [Netfilter](components/netfilter.md) · [Net core](components/netcore.md)

**Security:** [LSM](components/lsm.md) · [seccomp](components/seccomp.md)

**Interrupts:** [Generic IRQ](components/genirq.md) · [Softirqs](components/softirq.md)

**Drivers:** [kobject & uevent](components/kobject.md) · [Driver model](components/drvcore.md) · [Modules](components/module.md) · [PCI / PCIe](components/pci.md) · [DMA mapping](components/dma.md) · [NVMe driver](components/nvme.md) · [NIC driver](components/nicdrv.md) · [USB](components/usb.md) · [Input](components/input.md) · [TTY & pty](components/tty.md) · [DRM / GPU](components/drm.md)

**x86-64 arch:** [Boot & init](components/boot.md) · [IDT](components/idt.md) · [Entry code](components/entry.md) · [CPU exceptions](components/traps.md) · [APIC](components/apic.md) · [Context switch](components/switch.md)

**Hardware:** [CPU cores](components/cpu.md) · [MMU & TLB](components/mmu.md) · [RAM](components/ram.md) · [PCIe fabric](components/pcie.md) · [NVMe SSD](components/ssd.md) · [Network card](components/nic.md) · [USB keyboard](components/kbd.md) · [GPU](components/gpu.md)
