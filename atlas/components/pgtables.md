# Page tables

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`include/linux/pgtable.h`](https://elixir.bootlin.com/linux/latest/source/include/linux/pgtable.h)

Virtual → physical translation tree, 4 or 5 levels of 512 entries. CR3 points at the root.

**Key symbols:** `pgd/p4d/pud/pmd/pte`, `CR3`, `PCID`, `flush_tlb_*`

**Connects to:** [Address spaces](../components/vma.md) · [Page fault](../components/pagefault.md) · [MMU & TLB](../components/mmu.md) · [Context switch](../components/switch.md) · [vmalloc](../components/vmalloc.md)
