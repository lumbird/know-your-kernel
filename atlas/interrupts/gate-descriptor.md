# 64-bit IDT gate (16 bytes)

| Bits | Field | Meaning |
|---|---|---|
| 0–15 | offset 15:0 | Low 16 bits of the handler address. |
| 16–31 | selector | Code segment for the handler. Linux: __KERNEL_CS = 0x10. |
| 32–34 | IST | 0 = normal stack. 1–7 = Interrupt Stack Table slot in the TSS. Linux uses it for #DF, NMI, #DB, #MC. |
| 35–39 | 0 | Reserved, zero. |
| 40–43 | type | 0xE interrupt gate (clears IF). 0xF trap gate (keeps IF). |
| 44–44 | 0 | Zero for system descriptors. |
| 45–46 | DPL | Highest ring allowed to use `int n` on this vector. 3 for int3 and int 0x80. |
| 47–47 | P | Present. 0 → #NP. |
| 48–63 | offset 31:16 | Middle 16 bits of the handler address. |
| 64–95 | offset 63:32 | High 32 bits of the handler address. |
| 96–127 | reserved | Must be zero. |

- Typical Linux kernel gate byte 5: `0x8E` (P=1, DPL=0, interrupt gate).
- User-callable (int3, int 0x80): `0xEE` (DPL=3).
- Linux struct: `gate_struct` in arch/x86/include/asm/desc_defs.h.
