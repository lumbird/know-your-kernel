# Boot sequence (x86-64)

1. **Power on, firmware runs** (Firmware) — UEFI (or legacy BIOS) tests hardware, trains RAM, finds a boot device.
2. **Boot loader** (Boot loader) — GRUB or systemd-boot loads bzImage and the initramfs, passes the command line.
3. **Setup code / EFI stub** (Early arch) — Collects the memory map and boot parameters. Under UEFI the kernel is itself an EFI program. (`arch/x86/boot/`)
4. **Decompressor** (Early arch) — Enters 64-bit long mode, picks a random location (KASLR), unpacks the kernel. (`arch/x86/boot/compressed/`)
5. **startup_64** (Early arch) — Early page tables, GDT and an early IDT, then the first C code. (`arch/x86/kernel/head_64.S`)
6. **start_kernel()** (Kernel init) — setup_arch (memory map, ACPI), IDT, page and slab allocators, scheduler, IRQs, timers, console. (`init/main.c`)
7. **rest_init()** (Kernel init) — Creates PID 1 (kernel_init) and PID 2 (kthreadd). The boot CPU becomes the idle task, PID 0. (`init/main.c`)
8. **kernel_init()** (Kernel init) — Brings up the other CPUs, then runs initcalls in levels: core → arch → subsys → fs → device → late. Drivers probe here. (`init/main.c`)
9. **initramfs** (Kernel init) — Unpacked into a RAM filesystem. Its /init loads modules and mounts the real root. (`init/initramfs.c`)
10. **exec /sbin/init** (User space) — PID 1 becomes a user process: usually systemd. (`init/main.c`)
11. **systemd** (User space) — Mounts filesystems, starts udev (replays device events), launches services and the login prompt.

- PID 0 = idle task, PID 1 = init, PID 2 = kthreadd (parent of all kernel threads).
