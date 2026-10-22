# Swap

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/swapfile.c`](https://elixir.bootlin.com/linux/latest/source/mm/swapfile.c)

Anonymous pages written to swap; the PTE keeps a swap entry to fault them back in.

**Key symbols:** `swp_entry_t`, `swap cache`, `zswap`

**Connects to:** [Reclaim](../components/reclaim.md) · [Page fault](../components/pagefault.md) · [Block layer](../components/blkmq.md)

**Appears in:** [Swap-in fault](../traces/swapin.md)
