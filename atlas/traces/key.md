# Trace: Keypress

A key on a USB keyboard reaches the compositor.

| # | From → To | Via | Step | Component |
|---|---|---|---|---|
| 1 | Hardware → Hardware | dma | xHCI polls the keyboard. 8-byte HID report written to the event ring by DMA. | [USB keyboard](../components/kbd.md) |
| 2 | Hardware → Driver / IRQ | irq | MSI-X → xhci_irq. Transfer event completes the URB. | [USB](../components/usb.md) |
| 3 | Driver / IRQ → Driver / IRQ | call | URB callback → HID parser. usbhid → hid_input_report decodes keys. | [USB](../components/usb.md) |
| 4 | Driver / IRQ → Driver / IRQ | call | input_event(EV_KEY). Input core fans out to handlers (evdev, console). | [Input](../components/input.md) |
| 5 | Driver / IRQ → Kernel core | wake | evdev buffers event, wake_up. Readers on /dev/input/eventN become ready. | [poll / epoll](../components/epoll.md) |
| 6 | Kernel core → User space | copy | read() returns struct input_event. libinput in the compositor maps it to a key. | [Char devices](../components/chardev.md) |
