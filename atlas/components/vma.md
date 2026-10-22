# Address spaces

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/vma.c`](https://elixir.bootlin.com/linux/latest/source/mm/vma.c)

mm_struct per process, holding VMAs (regions with permissions) in a maple tree.

**Key symbols:** `mm_struct`, `vm_area_struct`, `maple tree`, `per-VMA lock`

**Connects to:** [Tasks](../components/task.md) · [mmap / brk](../components/mmap.md) · [Page fault](../components/pagefault.md) · [Page tables](../components/pgtables.md) · [Pipes & IPC](../components/ipc.md)

**Appears in:** [fork + exec](../traces/forkexec.md)
