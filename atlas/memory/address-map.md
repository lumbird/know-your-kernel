# x86-64 virtual memory map (4-level)

| Start | End | Size | Region | Notes |
|---|---|---|---|---|
| `0000000000000000` | `00007fffffffefff` | 128 TB | User space | Per process. Code, heap, mmaps, stack. |
| `00007ffffffff000` | `00007fffffffffff` | 4 KB | Guard page |  |
| `0000800000000000` | `ffff7fffffffffff` | ~16 EB | Non-canonical | Bits 63:48 must copy bit 47. Any access → #GP. |
| `ffff800000000000` | `ffff87ffffffffff` | 8 TB | Guard hole | Reserved for hypervisors. |
| `ffff880000000000` | `ffff887fffffffff` | 0.5 TB | LDT remap | For page-table isolation (PTI). |
| `ffff888000000000` | `ffffc87fffffffff` | 64 TB | Direct map | All physical RAM mapped linearly. __va()/__pa(). |
| `ffffc88000000000` | `ffffc8ffffffffff` | 0.5 TB | Hole |  |
| `ffffc90000000000` | `ffffe8ffffffffff` | 32 TB | vmalloc / ioremap | Virtually contiguous allocations, device MMIO. |
| `ffffe90000000000` | `ffffe9ffffffffff` | 1 TB | Hole |  |
| `ffffea0000000000` | `ffffeaffffffffff` | 1 TB | vmemmap | Array of struct page, one per physical frame. |
| `ffffeb0000000000` | `ffffebffffffffff` | 1 TB | Hole |  |
| `ffffec0000000000` | `fffffbffffffffff` | 16 TB | KASAN shadow | Only with KASAN debugging. |
| `fffffc0000000000` | `fffffdffffffffff` | 2 TB | Hole | End of KASLR range. |
| `fffffe0000000000` | `fffffe7fffffffff` | 0.5 TB | cpu_entry_area | Per-CPU entry stacks, GDT, TSS. Mapped even under PTI. |
| `fffffe8000000000` | `fffffeffffffffff` | 0.5 TB | Hole |  |
| `ffffff0000000000` | `ffffff7fffffffff` | 0.5 TB | %esp fixup stacks |  |
| `ffffff8000000000` | `ffffffeeffffffff` | 444 GB | Hole |  |
| `ffffffef00000000` | `fffffffeffffffff` | 64 GB | EFI runtime | Firmware services. |
| `ffffffff00000000` | `ffffffff7fffffff` | 2 GB | Hole |  |
| `ffffffff80000000` | `ffffffff9fffffff` | 512 MB | Kernel text | The kernel image. Mapped to physical 0 (+KASLR). |
| `ffffffffa0000000` | `fffffffffeffffff` | 1520 MB | Modules | Loadable module code and data. |
| `ffffffffff000000` | `ffffffffff4fffff` | 5 MB | Hole |  |
| `ffffffffff500000` | `ffffffffff5fffff` | ~1 MB | Fixmap | Compile-time fixed addresses (APIC, early ioremap). Start varies. |
| `ffffffffff600000` | `ffffffffff600fff` | 4 KB | vsyscall | Legacy fixed-address syscalls. |
| `ffffffffff601000` | `ffffffffffffffff` | ~10 MB | Hole |  |

- Source: Documentation/arch/x86/x86_64/mm.rst. KASLR shifts direct map, vmalloc and vmemmap bases.
