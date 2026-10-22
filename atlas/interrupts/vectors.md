# x86-64 vectors in Linux

- 0x00–0x1F: CPU exceptions.
- 0x20–0xEA: device IRQs, allocated at runtime (0x30–0x3F legacy ISA, 0x80 int 0x80).
- 0xEB–0xFF: system vectors (timer, IPIs, APIC).
- Source: arch/x86/include/asm/irq_vectors.h.

| Vector | Kind | Tag | Use |
|---|---|---|---|
| 0x00 | exception | #DE | Divide error |
| 0x01 | exception | #DB | Debug |
| 0x02 | exception | NMI | Non-maskable interrupt |
| 0x03 | exception | #BP | Breakpoint (int3) |
| 0x04 | exception | #OF | Overflow |
| 0x05 | exception | #BR | Bound range |
| 0x06 | exception | #UD | Invalid opcode |
| 0x07 | exception | #NM | Device not available (FPU) |
| 0x08 | exception | #DF | Double fault |
| 0x09 | reserved | — | Coprocessor overrun (legacy) |
| 0x0A | exception | #TS | Invalid TSS |
| 0x0B | exception | #NP | Segment not present |
| 0x0C | exception | #SS | Stack-segment fault |
| 0x0D | exception | #GP | General protection |
| 0x0E | exception | #PF | Page fault |
| 0x0F | reserved | — | Reserved |
| 0x10 | exception | #MF | x87 FP error |
| 0x11 | exception | #AC | Alignment check |
| 0x12 | exception | #MC | Machine check |
| 0x13 | exception | #XM | SIMD FP error |
| 0x14 | exception | #VE | Virtualization exception |
| 0x15 | exception | #CP | Control protection (CET) |
| 0x16 | reserved | — | Reserved |
| 0x17 | reserved | — | Reserved |
| 0x18 | reserved | — | Reserved |
| 0x19 | reserved | — | Reserved |
| 0x1A | reserved | — | Reserved |
| 0x1B | reserved | — | Reserved |
| 0x1C | exception | #HV | Hypervisor injection (AMD) |
| 0x1D | exception | #VC | VMM communication (SEV-ES) |
| 0x1E | exception | #SX | Security exception (AMD) |
| 0x1F | reserved | — | Reserved |
| 0x20 | device | DEV | Device IRQ (allocated at runtime) |
| 0x30 | isa | ISA | Legacy ISA IRQ 0 |
| 0x31 | isa | ISA | Legacy ISA IRQ 1 |
| 0x32 | isa | ISA | Legacy ISA IRQ 2 |
| 0x33 | isa | ISA | Legacy ISA IRQ 3 |
| 0x34 | isa | ISA | Legacy ISA IRQ 4 |
| 0x35 | isa | ISA | Legacy ISA IRQ 5 |
| 0x36 | isa | ISA | Legacy ISA IRQ 6 |
| 0x37 | isa | ISA | Legacy ISA IRQ 7 |
| 0x38 | isa | ISA | Legacy ISA IRQ 8 |
| 0x39 | isa | ISA | Legacy ISA IRQ 9 |
| 0x3A | isa | ISA | Legacy ISA IRQ 10 |
| 0x3B | isa | ISA | Legacy ISA IRQ 11 |
| 0x3C | isa | ISA | Legacy ISA IRQ 12 |
| 0x3D | isa | ISA | Legacy ISA IRQ 13 |
| 0x3E | isa | ISA | Legacy ISA IRQ 14 |
| 0x3F | isa | ISA | Legacy ISA IRQ 15 |
| 0x80 | syscall | SYS | int 0x80 (32-bit compat syscalls) |
| 0x81 | device | DEV | Device IRQ (allocated at runtime) |
| 0xEB | system | SYS | Posted MSI notification |
| 0xEC | system | SYS | Local APIC timer |
| 0xED | system | SYS | Hyper-V stimer0 |
| 0xEE | system | SYS | Hyper-V reenlightenment |
| 0xEF | system | SYS | Managed IRQ shutdown |
| 0xF0 | system | SYS | Posted interrupt nested |
| 0xF1 | system | SYS | Posted interrupt wakeup |
| 0xF2 | system | SYS | Posted interrupt |
| 0xF3 | system | SYS | Hypervisor callback |
| 0xF4 | system | SYS | Deferred error (AMD) |
| 0xF5 | system | SYS | Perf guest PMI |
| 0xF6 | system | SYS | IRQ work |
| 0xF7 | system | SYS | Platform IPI |
| 0xF8 | system | SYS | Reboot |
| 0xF9 | system | SYS | Threshold (MCE) |
| 0xFA | system | SYS | Thermal |
| 0xFB | system | SYS | Call function single IPI |
| 0xFC | system | SYS | Call function IPI |
| 0xFD | system | SYS | Reschedule IPI |
| 0xFE | system | SYS | APIC error |
| 0xFF | system | SYS | Spurious APIC |

(Device ranges collapsed.)
