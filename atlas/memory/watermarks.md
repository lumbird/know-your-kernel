# Zone watermarks

- **high** — kswapd stops here.
- **low** — Below this, kswapd wakes and reclaims in the background.
- **min** — Below this, allocating tasks reclaim directly (stall). Atomic allocations may dip under.

- Reclaim order: clean page cache → dirty cache (writeback) → anon to swap → OOM killer.
