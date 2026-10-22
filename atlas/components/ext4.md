# ext4

**Group:** Files & storage · **Layer:** Core subsystems · **Source:** [`fs/ext4/`](https://elixir.bootlin.com/linux/latest/source/fs/ext4/)

Example filesystem. Maps file offsets to disk blocks via extents; journals metadata (jbd2).

**Key symbols:** `ext4_file_read_iter`, `extents`, `jbd2`

**Connects to:** [VFS](../components/vfs.md) · [Page cache](../components/pagecache.md) · [Block layer](../components/blkmq.md)

**Appears in:** [Disk read](../traces/disk.md)
