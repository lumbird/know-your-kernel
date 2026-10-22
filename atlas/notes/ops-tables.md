# Ops tables: the kernel's interfaces

- Subsystems define a struct of function pointers; drivers fill it in.
- Examples: `file_operations`, `net_device_ops`, `block_device_operations`, `vm_operations_struct`, `sched_class`.
- Caller never knows the implementation: `file->f_op->read_iter(...)`.
- This is how VFS, block, net and the scheduler stay generic.
