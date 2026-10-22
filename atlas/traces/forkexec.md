# Trace: fork + exec

A shell runs `ls`: fork() then execve().

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | User space → Boundary | trap | clone() (glibc fork). Shell asks for a copy of itself. | [Syscall entry](../components/syscall.md) |
| 2 | Boundary → Kernel core | call | kernel_clone → copy_process. New task_struct; files, signal handlers and creds are duplicated. | [Tasks](../components/task.md) |
| 3 | Kernel core → Kernel core | call | dup_mm copies the VMAs. Private pages are shared, not copied. | [Address spaces](../components/vma.md) |
| 4 | Kernel core → Kernel core | call | PTEs copied read-only. First write by either side triggers copy-on-write. | [Page tables](../components/pgtables.md) |
| 5 | Kernel core → Kernel core | wake | wake_up_new_task. Child placed on a run queue. | [Scheduler core](../components/schedcore.md) |
| 6 | Kernel core → User space | ret | Two returns. Parent gets the child PID; child gets 0. | [Syscall entry](../components/syscall.md) |
| 7 | User space → Boundary | trap | Child calls execve("/bin/ls"). Replace this process image. | [Syscall entry](../components/syscall.md) |
| 8 | Boundary → Kernel core | call | Open and check the binary. Path lookup, permission and LSM checks. | [VFS](../components/vfs.md) |
| 9 | Kernel core → Kernel core | call | load_elf_binary. Old mm dropped; new stack built with argv and envp. | [Tasks](../components/task.md) |
| 10 | Kernel core → Kernel core | call | Map ELF segments. VMAs for text, data, stack. Nothing read from disk yet. | [mmap / brk](../components/mmap.md) |
| 11 | Kernel core → User space | ret | Return to the new entry point. Execution starts in the dynamic loader. | [Entry code](../components/entry.md) |
| 12 | User space → Kernel core | trap | First instruction faults. Code is paged in from the page cache on demand. | [Page fault](../components/pagefault.md) |
