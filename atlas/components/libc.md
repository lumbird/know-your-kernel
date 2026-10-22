# C library

**Group:** User space · **Layer:** User space · **Source:** —

glibc/musl wrap each syscall: load registers, execute `syscall`, turn -errno into errno.

**Key symbols:** `read()`, `pthread_mutex_lock()`, `errno`

**Connects to:** [Application](../components/app.md) · [Syscall entry](../components/syscall.md) · [vDSO](../components/vdso.md) · [Futex](../components/futex.md)
