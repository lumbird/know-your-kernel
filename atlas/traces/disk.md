# Trace: Disk read

read(fd, buf, 4096) on an uncached ext4 file.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | User space → Boundary | trap | `syscall` with rax=0 (read). CPU switches to ring 0 at entry_SYSCALL_64. | [Syscall entry](../components/syscall.md) |
| 2 | Boundary → Kernel core | call | ksys_read → vfs_read. Dispatches to file->f_op->read_iter (ext4). | [VFS](../components/vfs.md) |
| 3 | Kernel core → Kernel core | call | filemap_read: cache miss. Readahead allocates folios and asks ext4 to fill them. | [Page cache](../components/pagecache.md) |
| 4 | Kernel core → Kernel core | call | extents → block numbers → bio. submit_bio hands the bio to the block layer. | [ext4](../components/ext4.md) |
| 5 | Kernel core → Driver / IRQ | call | blk-mq → nvme_queue_rq. Request becomes an NVMe command in the submission queue. | [Block layer](../components/blkmq.md) |
| 6 | Driver / IRQ → Hardware | mmio | Doorbell write. One MMIO write tells the SSD a command is waiting. | [NVMe driver](../components/nvme.md) |
| 7 | Kernel core → Kernel core | wake | Task sleeps on the locked folio. Scheduler runs something else meanwhile. | [Wait queues](../components/waitq.md) |
| 8 | Hardware → Hardware | dma | SSD DMAs data into the folio. No CPU involved in the copy. | [NVMe SSD](../components/ssd.md) |
| 9 | Hardware → Driver / IRQ | irq | MSI-X → nvme_irq. Completion entry posted; handler reaps the CQ. | [Generic IRQ](../components/genirq.md) |
| 10 | Driver / IRQ → Kernel core | call | blk_mq_complete_request → bio_endio. Folio marked uptodate and unlocked. | [Block layer](../components/blkmq.md) |
| 11 | Kernel core → Kernel core | wake | Reader woken. try_to_wake_up puts the task back on a run queue. | [Scheduler core](../components/schedcore.md) |
| 12 | Kernel core → User space | copy | copy_to_user → sysret. Bytes land in buf; rax = 4096. | [User copy](../components/uaccess.md) |
