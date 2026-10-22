# Rings and privilege

- Ring 0 = kernel, ring 3 = user. Rings 1–2 unused.
- Current ring = low 2 bits of CS (CPL).
- Ring change only via: syscall, interrupt, exception (in) and sysret/iret (out).
- SMEP: kernel cannot execute user pages. SMAP: kernel cannot read user pages except inside STAC/CLAC.
- Page-table U/S bit marks user-accessible pages.
