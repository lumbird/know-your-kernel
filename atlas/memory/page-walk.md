# Page-table walk

4-level (48-bit): PGD [47:39] → PUD [38:30] → PMD [29:21] → PTE [20:12] → offset [11:0]

5-level (57-bit): PGD [56:48] → P4D [47:39] → PUD [38:30] → PMD [29:21] → PTE [20:12] → offset [11:0]

- Each table: 512 × 8-byte entries = one 4 KiB page.
- 9 bits per level; 12-bit offset into the page.
- A PMD entry can map 2 MiB directly; a PUD entry 1 GiB (huge pages).
- Canonical: all bits above the top index copy the top bit.
- CR3 holds the root; switching processes reloads it.
