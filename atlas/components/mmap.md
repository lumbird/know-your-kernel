# mmap / brk

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/mmap.c`](https://elixir.bootlin.com/linux/latest/source/mm/mmap.c)

Creates VMAs. Pages are not allocated until first touch.

**Key symbols:** `do_mmap`, `munmap`, `brk`, `vm_operations_struct`

**Connects to:** [Address spaces](../components/vma.md) · [Syscall entry](../components/syscall.md) · [Page cache](../components/pagecache.md) · [DRM / GPU](../components/drm.md)
