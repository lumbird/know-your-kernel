# Tasks

**Group:** Processes & scheduling · **Layer:** Core subsystems · **Source:** [`kernel/fork.c`](https://elixir.bootlin.com/linux/latest/source/kernel/fork.c)

Every thread is a task_struct. fork/clone copy one, exec replaces its image, exit tears it down.

**Key symbols:** `task_struct`, `copy_process`, `kernel_clone`, `do_execve`, `do_exit`

**Connects to:** [Scheduler core](../components/schedcore.md) · [Address spaces](../components/vma.md) · [Signals](../components/signals.md) · [cgroups](../components/cgroups.md) · [Namespaces](../components/ns.md) · [procfs](../components/procfs.md) · [Syscall entry](../components/syscall.md) · [LSM](../components/lsm.md) · [Boot & init](../components/boot.md)

**Appears in:** [fork + exec](../traces/forkexec.md)
