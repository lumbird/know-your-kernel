# Block layer

**Group:** Files & storage · **Layer:** Core subsystems · **Source:** [`block/blk-mq.c`](https://elixir.bootlin.com/linux/latest/source/block/blk-mq.c)

Turns bios into requests on per-CPU and hardware queues, then hands them to the driver.

**Key symbols:** `struct bio`, `struct request`, `submit_bio`, `mq-deadline/bfq`

**Connects to:** [ext4](../components/ext4.md) · [Page cache](../components/pagecache.md) · [NVMe driver](../components/nvme.md) · [Swap](../components/swap.md) · [io_uring](../components/iouring.md) · [Softirqs](../components/softirq.md)

**Appears in:** [Disk read](../traces/disk.md) · [Swap-in fault](../traces/swapin.md)
