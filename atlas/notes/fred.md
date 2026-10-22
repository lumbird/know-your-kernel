# FRED

- Flexible Return and Event Delivery. New x86 event model (Linux 6.9+).
- Replaces IDT gate lookup and IRET with one entry point and `ERETU`/`ERETS`.
- Saves full state in a fixed frame; removes swapgs and IST corner cases.
- Off unless the CPU supports it and the kernel enables it.
