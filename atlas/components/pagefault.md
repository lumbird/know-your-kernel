# Page fault

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/memory.c`](https://elixir.bootlin.com/linux/latest/source/mm/memory.c)

#PF → find VMA → fill the missing PTE: zero page, page cache, swap-in or copy-on-write. No VMA → SIGSEGV.

**Key symbols:** `exc_page_fault`, `handle_mm_fault`, `do_anonymous_page`, `do_wp_page`, `do_swap_page`

**Connects to:** [Entry code](../components/entry.md) · [Address spaces](../components/vma.md) · [Page tables](../components/pgtables.md) · [Page allocator](../components/buddy.md) · [Page cache](../components/pagecache.md) · [Swap](../components/swap.md) · [Signals](../components/signals.md) · [Application](../components/app.md) · [User copy](../components/uaccess.md)
