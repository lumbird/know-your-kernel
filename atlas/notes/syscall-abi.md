# x86-64 syscall ABI

- Number in `rax`. Args: `rdi rsi rdx r10 r8 r9` (r10, not rcx).
- `syscall` saves RIP in `rcx`, RFLAGS in `r11`, jumps to `MSR_LSTAR`.
- Return value in `rax`; `-4095..-1` = `-errno`.
- Return via `sysret` (fast) or `iret` when state is unusual.
- Table: `arch/x86/entry/syscalls/syscall_64.tbl`.
