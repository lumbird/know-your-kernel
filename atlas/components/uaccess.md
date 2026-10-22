# User copy

**Group:** User–kernel boundary · **Layer:** Boundary · **Source:** [`arch/x86/include/asm/uaccess.h`](https://elixir.bootlin.com/linux/latest/source/arch/x86/include/asm/uaccess.h)

Only safe way to touch user memory. SMAP blocks it unless STAC/CLAC open a window; faults are caught by exception tables.

**Key symbols:** `copy_to_user`, `copy_from_user`, `get_user`, `put_user`, `STAC/CLAC`

**Connects to:** [Syscall entry](../components/syscall.md) · [Page fault](../components/pagefault.md)

**Appears in:** [Disk read](../traces/disk.md) · [Packet receive](../traces/net.md)
