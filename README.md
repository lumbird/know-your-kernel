# Know Your Kernel

An interactive map of the Linux kernel on x86-64, with a set of short notes.

**Live:** https://lumbird.github.io/know-your-kernel/

## What's inside

- `docs/` — the site: one page with six views (Stack, Network, Communication, Interrupts, Scheduler, Memory).
- `docs/data/` — the facts behind every view.
- `atlas/` — short markdown notes, one per topic.
- `tools/build-atlas.mjs` — rebuilds the notes from the data.

## Run locally

```bash
python -m http.server 8765 --directory docs
```

Then open http://localhost:8765.

## Update the notes

```bash
node tools/build-atlas.mjs
```

## License

© 2026 LumBird · [MIT License](LICENSE)
