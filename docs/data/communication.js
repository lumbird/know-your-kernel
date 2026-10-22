/* Know Your Kernel — how things talk. */
(window.KF = window.KF || {});

KF.lanes = [
  { id: "user", name: "User space" },
  { id: "abi",  name: "Boundary" },
  { id: "core", name: "Kernel core" },
  { id: "drv",  name: "Driver / IRQ" },
  { id: "hw",   name: "Hardware" }
];

/* via: call | trap | ret | mmio | dma | irq | softirq | wake | copy | event */
KF.traces = [
  { id: "disk", name: "Disk read", q: "read(fd, buf, 4096) on an uncached ext4 file",
    steps: [
      { a: "user", b: "abi",  via: "trap",   c: "syscall",   t: "`syscall` with rax=0 (read)", d: "CPU switches to ring 0 at entry_SYSCALL_64." },
      { a: "abi",  b: "core", via: "call",   c: "vfs",       t: "ksys_read → vfs_read", d: "Dispatches to file->f_op->read_iter (ext4)." },
      { a: "core", b: "core", via: "call",   c: "pagecache", t: "filemap_read: cache miss", d: "Readahead allocates folios and asks ext4 to fill them." },
      { a: "core", b: "core", via: "call",   c: "ext4",      t: "extents → block numbers → bio", d: "submit_bio hands the bio to the block layer." },
      { a: "core", b: "drv",  via: "call",   c: "blkmq",     t: "blk-mq → nvme_queue_rq", d: "Request becomes an NVMe command in the submission queue." },
      { a: "drv",  b: "hw",   via: "mmio",   c: "nvme",      t: "Doorbell write", d: "One MMIO write tells the SSD a command is waiting." },
      { a: "core", b: "core", via: "wake",   c: "waitq",     t: "Task sleeps on the locked folio", d: "Scheduler runs something else meanwhile." },
      { a: "hw",   b: "hw",   via: "dma",    c: "ssd",       t: "SSD DMAs data into the folio", d: "No CPU involved in the copy." },
      { a: "hw",   b: "drv",  via: "irq",    c: "genirq",    t: "MSI-X → nvme_irq", d: "Completion entry posted; handler reaps the CQ." },
      { a: "drv",  b: "core", via: "call",   c: "blkmq",     t: "blk_mq_complete_request → bio_endio", d: "Folio marked uptodate and unlocked." },
      { a: "core", b: "core", via: "wake",   c: "schedcore", t: "Reader woken", d: "try_to_wake_up puts the task back on a run queue." },
      { a: "core", b: "user", via: "copy",   c: "uaccess",   t: "copy_to_user → sysret", d: "Bytes land in buf; rax = 4096." }
    ] },
  { id: "key", name: "Keypress", q: "A key on a USB keyboard reaches the compositor",
    steps: [
      { a: "hw",   b: "hw",   via: "dma",    c: "kbd",    t: "xHCI polls the keyboard", d: "8-byte HID report written to the event ring by DMA." },
      { a: "hw",   b: "drv",  via: "irq",    c: "usb",    t: "MSI-X → xhci_irq", d: "Transfer event completes the URB." },
      { a: "drv",  b: "drv",  via: "call",   c: "usb",    t: "URB callback → HID parser", d: "usbhid → hid_input_report decodes keys." },
      { a: "drv",  b: "drv",  via: "call",   c: "input",  t: "input_event(EV_KEY)", d: "Input core fans out to handlers (evdev, console)." },
      { a: "drv",  b: "core", via: "wake",   c: "epoll",  t: "evdev buffers event, wake_up", d: "Readers on /dev/input/eventN become ready." },
      { a: "core", b: "user", via: "copy",   c: "chardev",t: "read() returns struct input_event", d: "libinput in the compositor maps it to a key." }
    ] },
  { id: "net", name: "Packet receive", q: "A TCP segment arrives for a waiting recv()",
    steps: [
      { a: "hw",   b: "hw",   via: "dma",     c: "nic",       t: "NIC DMAs frame into RX ring", d: "Buffer was pre-posted by the driver." },
      { a: "hw",   b: "drv",  via: "irq",     c: "nicdrv",    t: "MSI-X → driver ISR", d: "ISR masks the queue IRQ and calls napi_schedule." },
      { a: "drv",  b: "drv",  via: "softirq", c: "softirq",   t: "NET_RX softirq → NAPI poll", d: "Driver builds sk_buffs in a batch (XDP can act here)." },
      { a: "drv",  b: "core", via: "call",    c: "netcore",   t: "GRO → netif_receive_skb", d: "Protocol demux by ethertype." },
      { a: "core", b: "core", via: "call",    c: "tcpip",     t: "ip_rcv → tcp_v4_rcv", d: "Netfilter hooks, socket lookup, queue to receive buffer." },
      { a: "core", b: "core", via: "wake",    c: "socket",    t: "sk_data_ready → wake reader", d: "Wakes recv() sleeper or epoll." },
      { a: "core", b: "user", via: "copy",    c: "uaccess",   t: "tcp_recvmsg → copy_to_user", d: "Data returned from recv()." }
    ] },
  { id: "plug", name: "USB hotplug", q: "A USB stick is plugged in",
    steps: [
      { a: "hw",   b: "drv",  via: "irq",   c: "usb",     t: "Port status change → xhci_irq", d: "Hub reports a new connection." },
      { a: "drv",  b: "core", via: "call",  c: "workq",   t: "hub_wq runs hub_event", d: "Reset port, assign address, read descriptors." },
      { a: "core", b: "drv",  via: "call",  c: "drvcore", t: "device_add → bus match → probe", d: "usb-storage binds if loaded." },
      { a: "drv",  b: "abi",  via: "event", c: "kobject", t: "kobject_uevent(ADD)", d: "Netlink multicast with MODALIAS etc." },
      { a: "abi",  b: "user", via: "event", c: "udev",    t: "udevd receives uevent", d: "Runs rules, may modprobe, creates /dev/disk/by-* links." },
      { a: "user", b: "abi",  via: "trap",  c: "module",  t: "modprobe → finit_module", d: "Only when no driver was loaded; probe follows." },
      { a: "abi",  b: "user", via: "event", c: "udev",    t: "udev re-broadcasts to apps", d: "Desktop shows the new drive." }
    ] },
  { id: "forkexec", name: "fork + exec", q: "A shell runs `ls`: fork() then execve()",
    steps: [
      { a: "user", b: "abi",  via: "trap", c: "syscall",   t: "clone() (glibc fork)", d: "Shell asks for a copy of itself." },
      { a: "abi",  b: "core", via: "call", c: "task",      t: "kernel_clone → copy_process", d: "New task_struct; files, signal handlers and creds are duplicated." },
      { a: "core", b: "core", via: "call", c: "vma",       t: "dup_mm copies the VMAs", d: "Private pages are shared, not copied." },
      { a: "core", b: "core", via: "call", c: "pgtables",  t: "PTEs copied read-only", d: "First write by either side triggers copy-on-write." },
      { a: "core", b: "core", via: "wake", c: "schedcore", t: "wake_up_new_task", d: "Child placed on a run queue." },
      { a: "core", b: "user", via: "ret",  c: "syscall",   t: "Two returns", d: "Parent gets the child PID; child gets 0." },
      { a: "user", b: "abi",  via: "trap", c: "syscall",   t: "Child calls execve(\"/bin/ls\")", d: "Replace this process image." },
      { a: "abi",  b: "core", via: "call", c: "vfs",       t: "Open and check the binary", d: "Path lookup, permission and LSM checks." },
      { a: "core", b: "core", via: "call", c: "task",      t: "load_elf_binary", d: "Old mm dropped; new stack built with argv and envp." },
      { a: "core", b: "core", via: "call", c: "mmap",      t: "Map ELF segments", d: "VMAs for text, data, stack. Nothing read from disk yet." },
      { a: "core", b: "user", via: "ret",  c: "entry",     t: "Return to the new entry point", d: "Execution starts in the dynamic loader." },
      { a: "user", b: "core", via: "trap", c: "pagefault", t: "First instruction faults", d: "Code is paged in from the page cache on demand." }
    ] },
  { id: "swapin", name: "Swap-in fault", q: "A process touches a page that was swapped out",
    steps: [
      { a: "user", b: "hw",   via: "call",  c: "mmu",       t: "Load from the address", d: "MMU walk finds a PTE with present = 0." },
      { a: "hw",   b: "abi",  via: "trap",  c: "entry",     t: "#PF → exc_page_fault", d: "CR2 holds the address." },
      { a: "abi",  b: "core", via: "call",  c: "pagefault", t: "handle_mm_fault → do_swap_page", d: "PTE holds a swap entry: device + slot." },
      { a: "core", b: "core", via: "call",  c: "swap",      t: "Swap cache miss", d: "Allocate a folio, add it to the swap cache." },
      { a: "core", b: "drv",  via: "call",  c: "blkmq",     t: "Read the swap slot", d: "bio queued to the NVMe driver." },
      { a: "drv",  b: "hw",   via: "mmio",  c: "nvme",      t: "Doorbell write", d: "SSD starts the read." },
      { a: "core", b: "core", via: "wake",  c: "waitq",     t: "Task sleeps on the folio", d: "This is a major fault." },
      { a: "hw",   b: "drv",  via: "irq",   c: "genirq",    t: "Completion IRQ", d: "Data is in RAM; folio unlocked, task woken." },
      { a: "core", b: "core", via: "call",  c: "pgtables",  t: "Install the PTE", d: "Swap slot freed if no one else needs it." },
      { a: "core", b: "user", via: "ret",   c: "entry",     t: "Return from the fault", d: "The load re-executes and succeeds." }
    ] },
  { id: "ctrlc", name: "Ctrl+C", q: "Ctrl+C in a terminal stops the running program",
    steps: [
      { a: "user", b: "abi",  via: "trap", c: "tty",       t: "Terminal writes 0x03 to the pty", d: "The emulator turns the keypress into the INTR byte." },
      { a: "abi",  b: "drv",  via: "call", c: "tty",       t: "n_tty sees INTR", d: "ISIG is on, so it is not passed on as input." },
      { a: "drv",  b: "core", via: "call", c: "signals",   t: "isig → kill_pgrp(SIGINT)", d: "Queued on every task in the foreground process group." },
      { a: "core", b: "core", via: "wake", c: "schedcore", t: "signal_wake_up", d: "A task blocked in read() is woken." },
      { a: "core", b: "core", via: "call", c: "entry",     t: "Exit-to-user work", d: "TIF_SIGPENDING checked before returning." },
      { a: "core", b: "user", via: "ret",  c: "signals",   t: "Deliver the signal", d: "Default action terminates; a handler gets a signal frame instead." },
      { a: "user", b: "abi",  via: "trap", c: "signals",   t: "rt_sigreturn", d: "Handler returns; saved registers restored." }
    ] }
];

/* Channel catalog: dir = u2k | k | k2h */
KF.channels = [
  { dir: "u2k", name: "System call",   c: "syscall", mode: "sync",  how: "Trap into the kernel with a number and six register args." },
  { dir: "u2k", name: "vDSO",          c: "vdso",    mode: "sync",  how: "Kernel code mapped into user space; no trap for time reads." },
  { dir: "u2k", name: "File ops on /dev", c: "chardev", mode: "sync", how: "open/read/write on a device node go to the driver's file_operations." },
  { dir: "u2k", name: "ioctl",         c: "ioctl",   mode: "sync",  how: "Driver-specific command plus a pointer to a struct." },
  { dir: "u2k", name: "mmap",          c: "mmap",    mode: "shared",how: "Share pages (device memory, buffers) directly with the kernel or a device." },
  { dir: "u2k", name: "procfs / sysfs",c: "sysfs",   mode: "sync",  how: "Read and write kernel state as files." },
  { dir: "u2k", name: "Netlink",       c: "netlink", mode: "async", how: "Socket messages both ways; multicast for events." },
  { dir: "u2k", name: "io_uring",      c: "iouring", mode: "async", how: "Shared rings: user writes requests, kernel posts completions." },
  { dir: "u2k", name: "eBPF maps",     c: "bpf",     mode: "shared",how: "Key/value tables read and written by both sides." },
  { dir: "u2k", name: "Signals",       c: "signals", mode: "async", how: "Kernel interrupts a process at its next return to user space." },
  { dir: "u2k", name: "poll / epoll",  c: "epoll",   mode: "async", how: "Sleep until any of many files is ready." },
  { dir: "u2k", name: "Futex",         c: "futex",   mode: "sync",  how: "Kernel only involved when a lock is contended." },
  { dir: "k",   name: "Ops tables",    c: "vfs",     mode: "sync",  how: "Structs of function pointers (file_operations, net_device_ops): the kernel's interfaces." },
  { dir: "k",   name: "Exported symbols", c: "module", mode: "sync", how: "Modules call EXPORT_SYMBOL functions directly." },
  { dir: "k",   name: "Wait queues",   c: "waitq",   mode: "async", how: "Sleep on an event; producer calls wake_up." },
  { dir: "k",   name: "Notifier chains", c: "notifier", mode: "async", how: "Subscribers get callbacks on system events." },
  { dir: "k",   name: "Softirqs",      c: "softirq", mode: "async", how: "Raise a pending bit; handler runs after the IRQ returns." },
  { dir: "k",   name: "Workqueues",    c: "workq",   mode: "async", how: "Queue a function to run later in a kworker thread." },
  { dir: "k",   name: "RCU",           c: "locking", mode: "shared",how: "Readers run lock-free; writers publish new copies and free old ones later." },
  { dir: "k",   name: "IPIs",          c: "apic",    mode: "async", how: "One CPU interrupts another (reschedule, TLB shootdown, call function)." },
  { dir: "k2h", name: "MMIO",          c: "pci",     mode: "sync",  how: "Device registers mapped into address space; readl/writel." },
  { dir: "k2h", name: "Port I/O",      c: "cpu",     mode: "sync",  how: "Legacy in/out instructions on a 64K port space." },
  { dir: "k2h", name: "DMA",           c: "dma",     mode: "async", how: "Device reads/writes RAM itself via descriptor rings." },
  { dir: "k2h", name: "Interrupts",    c: "genirq",  mode: "async", how: "Device signals the CPU (MSI-X write or IOAPIC pin)." },
  { dir: "k2h", name: "Polling",       c: "netcore", mode: "sync",  how: "CPU checks device state in a loop (NAPI under load)." }
];
