# Page fault flow

1. **#PF (vector 14)** — CR2 = address. Error code: present, write, user, fetch.
2. **Kernel address?** — Yes → fixup or oops.
3. **Find VMA** — Per-VMA lock. None or wrong permission → SIGSEGV.
4. **Allocate missing tables** — PGD → PMD, then inspect the PTE.
5. **Empty + anonymous** — Zero page or fresh page. *(minor)*
6. **Empty + file-backed** — Page cache; read from disk if absent. *(major if I/O)*
7. **Swap entry** — Read page back from swap. *(major)*
8. **Write to read-only** — Copy-on-write after fork. *(minor)*
9. **SIGSEGV** — Signal delivered on return. *(fatal)*

- Minor fault: no I/O. Major fault: waits for disk.
