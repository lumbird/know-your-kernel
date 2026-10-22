# Trace: Swap-in fault

A process touches a page that was swapped out.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | User space → Hardware | call | Load from the address. MMU walk finds a PTE with present = 0. | [MMU & TLB](../components/mmu.md) |
| 2 | Hardware → Boundary | trap | #PF → exc_page_fault. CR2 holds the address. | [Entry code](../components/entry.md) |
| 3 | Boundary → Kernel core | call | handle_mm_fault → do_swap_page. PTE holds a swap entry: device + slot. | [Page fault](../components/pagefault.md) |
| 4 | Kernel core → Kernel core | call | Swap cache miss. Allocate a folio, add it to the swap cache. | [Swap](../components/swap.md) |
| 5 | Kernel core → Driver / IRQ | call | Read the swap slot. bio queued to the NVMe driver. | [Block layer](../components/blkmq.md) |
| 6 | Driver / IRQ → Hardware | mmio | Doorbell write. SSD starts the read. | [NVMe driver](../components/nvme.md) |
| 7 | Kernel core → Kernel core | wake | Task sleeps on the folio. This is a major fault. | [Wait queues](../components/waitq.md) |
| 8 | Hardware → Driver / IRQ | irq | Completion IRQ. Data is in RAM; folio unlocked, task woken. | [Generic IRQ](../components/genirq.md) |
| 9 | Kernel core → Kernel core | call | Install the PTE. Swap slot freed if no one else needs it. | [Page tables](../components/pgtables.md) |
| 10 | Kernel core → User space | ret | Return from the fault. The load re-executes and succeeds. | [Entry code](../components/entry.md) |
