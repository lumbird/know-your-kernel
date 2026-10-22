# Syscall entry

**Group:** User–kernel boundary · **Layer:** Boundary · **Source:** [`arch/x86/entry/syscall_64.c`](https://elixir.bootlin.com/linux/latest/source/arch/x86/entry/syscall_64.c)

`syscall` jumps to MSR_LSTAR → entry_SYSCALL_64 → do_syscall_64 → table dispatch. Number in rax, args in rdi rsi rdx r10 r8 r9.

**Key symbols:** `entry_SYSCALL_64`, `do_syscall_64`, `x64_sys_call`, `syscall_64.tbl`, `pt_regs`

**Connects to:** [C library](../components/libc.md) · [Entry code](../components/entry.md) · [VFS](../components/vfs.md) · [Sockets](../components/socket.md) · [Tasks](../components/task.md) · [mmap / brk](../components/mmap.md) · [Signals](../components/signals.md) · [Futex](../components/futex.md) · [io_uring](../components/iouring.md) · [eBPF](../components/bpf.md) · [seccomp](../components/seccomp.md) · [User copy](../components/uaccess.md)

**Appears in:** [Disk read](../traces/disk.md) · [fork + exec](../traces/forkexec.md)
