# IVT vs IDT

| | IVT | IDT |
|---|---|---|
| mode | Real mode (16-bit) | Long mode (64-bit) |
| entry | 4 bytes | 16 bytes |
| count | 256 | 256 |
| size | 1 KiB | 4 KiB |
| where | Physical 0x0000–0x03FF | Anywhere; address in IDTR (lidt) |
| holds | segment:offset of handler | Gate: 64-bit handler, selector, IST, DPL, type |
| protect | None | DPL limits who may `int n`; IST picks a known-good stack |
| user | BIOS services (int 10h, 13h), boot loaders | Linux after early boot |

- Both map a vector number (0–255) to a handler.
- In real mode the IDTR still exists; it defaults to base 0, limit 0x3FF.
