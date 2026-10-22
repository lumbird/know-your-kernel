# How the kernel reaches user space

The kernel never calls into user code directly. It can only:

- Return from a syscall (value in `rax`).
- Write into user memory (`copy_to_user`, shared rings, mmap).
- Wake a sleeping task (wait queue, epoll, futex).
- Queue a signal (runs on next return to user).
- Send a message (netlink, uevent).
