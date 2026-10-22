# VFS

**Group:** Files & storage · **Layer:** Core subsystems · **Source:** [`fs/`](https://elixir.bootlin.com/linux/latest/source/fs/)

Common file API over every filesystem. Dispatches through file_operations.

**Key symbols:** `struct file`, `inode`, `dentry`, `file_operations`, `vfs_read`

**Connects to:** [Syscall entry](../components/syscall.md) · [ext4](../components/ext4.md) · [Char devices](../components/chardev.md) · [Page cache](../components/pagecache.md) · [procfs](../components/procfs.md) · [sysfs](../components/sysfs.md) · [poll / epoll](../components/epoll.md) · [LSM](../components/lsm.md) · [ioctl](../components/ioctl.md) · [io_uring](../components/iouring.md) · [Pipes & IPC](../components/ipc.md)

**Appears in:** [Disk read](../traces/disk.md) · [fork + exec](../traces/forkexec.md)
