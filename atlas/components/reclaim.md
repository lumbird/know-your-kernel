# Reclaim

**Group:** Memory · **Layer:** Core subsystems · **Source:** [`mm/vmscan.c`](https://elixir.bootlin.com/linux/latest/source/mm/vmscan.c)

Frees memory under pressure: drop clean cache, write dirty, swap anon. OOM killer as last resort.

**Key symbols:** `kswapd`, `MGLRU`, `shrinkers`, `compaction`, `oom_kill`

**Connects to:** [Page allocator](../components/buddy.md) · [Page cache](../components/pagecache.md) · [Swap](../components/swap.md) · [cgroups](../components/cgroups.md)
