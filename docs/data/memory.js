/* Know Your Kernel — memory (x86-64, 4-level paging). */
(window.KF = window.KF || {});

/* Documentation/arch/x86/x86_64/mm.rst. Addresses as hex strings (BigInt at runtime). */
KF.memMap = [
  { s: "0000000000000000", e: "00007fffffffefff", size: "128 TB", n: "User space", k: "user", d: "Per process. Code, heap, mmaps, stack." },
  { s: "00007ffffffff000", e: "00007fffffffffff", size: "4 KB",   n: "Guard page", k: "hole", d: "" },
  { s: "0000800000000000", e: "ffff7fffffffffff", size: "~16 EB", n: "Non-canonical", k: "noncanon", d: "Bits 63:48 must copy bit 47. Any access → #GP." },
  { s: "ffff800000000000", e: "ffff87ffffffffff", size: "8 TB",   n: "Guard hole", k: "hole", d: "Reserved for hypervisors." },
  { s: "ffff880000000000", e: "ffff887fffffffff", size: "0.5 TB", n: "LDT remap", k: "kernel", d: "For page-table isolation (PTI)." },
  { s: "ffff888000000000", e: "ffffc87fffffffff", size: "64 TB",  n: "Direct map", k: "kernel", d: "All physical RAM mapped linearly. __va()/__pa()." },
  { s: "ffffc88000000000", e: "ffffc8ffffffffff", size: "0.5 TB", n: "Hole", k: "hole", d: "" },
  { s: "ffffc90000000000", e: "ffffe8ffffffffff", size: "32 TB",  n: "vmalloc / ioremap", k: "kernel", d: "Virtually contiguous allocations, device MMIO." },
  { s: "ffffe90000000000", e: "ffffe9ffffffffff", size: "1 TB",   n: "Hole", k: "hole", d: "" },
  { s: "ffffea0000000000", e: "ffffeaffffffffff", size: "1 TB",   n: "vmemmap", k: "kernel", d: "Array of struct page, one per physical frame." },
  { s: "ffffeb0000000000", e: "ffffebffffffffff", size: "1 TB",   n: "Hole", k: "hole", d: "" },
  { s: "ffffec0000000000", e: "fffffbffffffffff", size: "16 TB",  n: "KASAN shadow", k: "kernel", d: "Only with KASAN debugging." },
  { s: "fffffc0000000000", e: "fffffdffffffffff", size: "2 TB",   n: "Hole", k: "hole", d: "End of KASLR range." },
  { s: "fffffe0000000000", e: "fffffe7fffffffff", size: "0.5 TB", n: "cpu_entry_area", k: "kernel", d: "Per-CPU entry stacks, GDT, TSS. Mapped even under PTI." },
  { s: "fffffe8000000000", e: "fffffeffffffffff", size: "0.5 TB", n: "Hole", k: "hole", d: "" },
  { s: "ffffff0000000000", e: "ffffff7fffffffff", size: "0.5 TB", n: "%esp fixup stacks", k: "kernel", d: "" },
  { s: "ffffff8000000000", e: "ffffffeeffffffff", size: "444 GB", n: "Hole", k: "hole", d: "" },
  { s: "ffffffef00000000", e: "fffffffeffffffff", size: "64 GB",  n: "EFI runtime", k: "kernel", d: "Firmware services." },
  { s: "ffffffff00000000", e: "ffffffff7fffffff", size: "2 GB",   n: "Hole", k: "hole", d: "" },
  { s: "ffffffff80000000", e: "ffffffff9fffffff", size: "512 MB", n: "Kernel text", k: "kernel", d: "The kernel image. Mapped to physical 0 (+KASLR)." },
  { s: "ffffffffa0000000", e: "fffffffffeffffff", size: "1520 MB",n: "Modules", k: "kernel", d: "Loadable module code and data." },
  { s: "ffffffffff000000", e: "ffffffffff4fffff", size: "5 MB",   n: "Hole", k: "hole", d: "" },
  { s: "ffffffffff500000", e: "ffffffffff5fffff", size: "~1 MB",  n: "Fixmap", k: "kernel", d: "Compile-time fixed addresses (APIC, early ioremap). Start varies." },
  { s: "ffffffffff600000", e: "ffffffffff600fff", size: "4 KB",   n: "vsyscall", k: "kernel", d: "Legacy fixed-address syscalls." },
  { s: "ffffffffff601000", e: "ffffffffffffffff", size: "~10 MB", n: "Hole", k: "hole", d: "" }
];

KF.levels4 = [
  { n: "PGD", hi: 47, lo: 39 }, { n: "PUD", hi: 38, lo: 30 },
  { n: "PMD", hi: 29, lo: 21 }, { n: "PTE", hi: 20, lo: 12 }, { n: "offset", hi: 11, lo: 0 }
];
KF.levels5 = [
  { n: "PGD", hi: 56, lo: 48 }, { n: "P4D", hi: 47, lo: 39 }, { n: "PUD", hi: 38, lo: 30 },
  { n: "PMD", hi: 29, lo: 21 }, { n: "PTE", hi: 20, lo: 12 }, { n: "offset", hi: 11, lo: 0 }
];

/* Page fault decision flow. */
KF.faultFlow = [
  { id: "pf",   t: "#PF (vector 14)", d: "CR2 = address. Error code: present, write, user, fetch." },
  { id: "kern", t: "Kernel address?", d: "Yes → fixup or oops." },
  { id: "vma",  t: "Find VMA", d: "Per-VMA lock. None or wrong permission → SIGSEGV." },
  { id: "walk", t: "Allocate missing tables", d: "PGD → PMD, then inspect the PTE." },
  { id: "anon", t: "Empty + anonymous", d: "Zero page or fresh page.", leaf: "minor" },
  { id: "file", t: "Empty + file-backed", d: "Page cache; read from disk if absent.", leaf: "major if I/O" },
  { id: "swp",  t: "Swap entry", d: "Read page back from swap.", leaf: "major" },
  { id: "cow",  t: "Write to read-only", d: "Copy-on-write after fork.", leaf: "minor" },
  { id: "segv", t: "SIGSEGV", d: "Signal delivered on return.", leaf: "fatal" }
];

KF.allocStack = [
  { n: "kmalloc / kmem_cache_alloc", d: "Objects 8 B – 8 KiB from size-class caches.", c: "slub" },
  { n: "SLUB", d: "Per-CPU slab → partial list → new slab.", c: "slub" },
  { n: "vmalloc", d: "Large, virtually contiguous; pages from the buddy allocator.", c: "vmalloc" },
  { n: "Per-CPU page lists", d: "Lock-free cache of order-0 pages.", c: "buddy" },
  { n: "Buddy allocator", d: "Orders 0–10 (4 KiB – 4 MiB). Split on alloc, merge on free.", c: "buddy" },
  { n: "Zones", d: "DMA (<16 MiB) · DMA32 (<4 GiB) · Normal · Movable.", c: "buddy" },
  { n: "NUMA nodes", d: "One pg_data_t per memory node.", c: "ram" }
];

KF.watermarks = [
  { n: "high", d: "kswapd stops here." },
  { n: "low",  d: "Below this, kswapd wakes and reclaims in the background." },
  { n: "min",  d: "Below this, allocating tasks reclaim directly (stall). Atomic allocations may dip under." }
];
