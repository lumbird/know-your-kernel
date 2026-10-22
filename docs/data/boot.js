/* Know Your Kernel — boot sequence (x86-64). */
(window.KF = window.KF || {});

KF.bootPhases = {
  fw:   { name: "Firmware", g: "hw" },
  load: { name: "Boot loader", g: "user" },
  arch: { name: "Early arch", g: "arch" },
  core: { name: "Kernel init", g: "proc" },
  user: { name: "User space", g: "abi" }
};

KF.boot = [
  { ph: "fw",   t: "Power on, firmware runs", d: "UEFI (or legacy BIOS) tests hardware, trains RAM, finds a boot device.", p: "", c: "cpu" },
  { ph: "load", t: "Boot loader", d: "GRUB or systemd-boot loads bzImage and the initramfs, passes the command line.", p: "", c: "" },
  { ph: "arch", t: "Setup code / EFI stub", d: "Collects the memory map and boot parameters. Under UEFI the kernel is itself an EFI program.", p: "arch/x86/boot/", c: "boot" },
  { ph: "arch", t: "Decompressor", d: "Enters 64-bit long mode, picks a random location (KASLR), unpacks the kernel.", p: "arch/x86/boot/compressed/", c: "boot" },
  { ph: "arch", t: "startup_64", d: "Early page tables, GDT and an early IDT, then the first C code.", p: "arch/x86/kernel/head_64.S", c: "idt" },
  { ph: "core", t: "start_kernel()", d: "setup_arch (memory map, ACPI), IDT, page and slab allocators, scheduler, IRQs, timers, console.", p: "init/main.c", c: "boot" },
  { ph: "core", t: "rest_init()", d: "Creates PID 1 (kernel_init) and PID 2 (kthreadd). The boot CPU becomes the idle task, PID 0.", p: "init/main.c", c: "task" },
  { ph: "core", t: "kernel_init()", d: "Brings up the other CPUs, then runs initcalls in levels: core → arch → subsys → fs → device → late. Drivers probe here.", p: "init/main.c", c: "drvcore" },
  { ph: "core", t: "initramfs", d: "Unpacked into a RAM filesystem. Its /init loads modules and mounts the real root.", p: "init/initramfs.c", c: "vfs" },
  { ph: "user", t: "exec /sbin/init", d: "PID 1 becomes a user process: usually systemd.", p: "init/main.c", c: "syscall" },
  { ph: "user", t: "systemd", d: "Mounts filesystems, starts udev (replays device events), launches services and the login prompt.", p: "", c: "udev" }
];
