# Page cache

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/filemap.c`](https://elixir.bootlin.com/linux/latest/source/mm/filemap.c)

File data cached in folios, indexed per file. Reads hit it first; writeback flushes dirty folios.

**Key symbols:** `folio`, `address_space`, `filemap_read`, `readahead`, `writeback`

**Connects to:** [VFS](../components/vfs.md) · [ext4](../components/ext4.md) · [Reclaim](../components/reclaim.md) · [Page fault](../components/pagefault.md) · [Block layer](../components/blkmq.md) · [Wait queues](../components/waitq.md) · [mmap / brk](../components/mmap.md)

**Appears in:** [Disk read](../traces/disk.md)
