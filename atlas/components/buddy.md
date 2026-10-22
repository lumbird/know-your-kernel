# Page allocator

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/page_alloc.c`](https://elixir.bootlin.com/linux/latest/source/mm/page_alloc.c)

Buddy allocator: free blocks of 2^order pages per zone. Watermarks trigger reclaim.

**Key symbols:** `alloc_pages`, `free_area[order]`, `zones`, `GFP_KERNEL`, `watermarks`

**Connects to:** [SLUB](../components/slub.md) · [vmalloc](../components/vmalloc.md) · [Reclaim](../components/reclaim.md) · [Page fault](../components/pagefault.md) · [RAM](../components/ram.md) · [Boot & init](../components/boot.md)
