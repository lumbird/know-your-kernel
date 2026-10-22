# Allocator stack (top = caller side)

- **kmalloc / kmem_cache_alloc** — Objects 8 B – 8 KiB from size-class caches.
- **SLUB** — Per-CPU slab → partial list → new slab.
- **vmalloc** — Large, virtually contiguous; pages from the buddy allocator.
- **Per-CPU page lists** — Lock-free cache of order-0 pages.
- **Buddy allocator** — Orders 0–10 (4 KiB – 4 MiB). Split on alloc, merge on free.
- **Zones** — DMA (<16 MiB) · DMA32 (<4 GiB) · Normal · Movable.
- **NUMA nodes** — One pg_data_t per memory node.

- GFP_KERNEL may sleep; GFP_ATOMIC may not and can dip into reserves.
