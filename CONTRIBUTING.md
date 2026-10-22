# How changes are made

`main` is the live site. Every push to `main` redeploys GitHub Pages, so `main` only changes through a pull request.

## The flow

1. **Start from fresh `main`**
   ```bash
   git switch main
   git pull
   ```
2. **Branch per change**, named by type:
   ```bash
   git switch -c content/fork-exec-trace
   ```
   | Prefix | For |
   |---|---|
   | `content/` | new or corrected kernel facts, traces, notes |
   | `feat/` | new views or page features |
   | `fix/` | bugs, broken layout |
   | `docs/` | README, this file |
3. **Edit, then rebuild the notes** if anything in `docs/data/` changed:
   ```bash
   node tools/build-atlas.mjs
   ```
4. **Check locally**: open the site, click through the changed view, check the browser console for errors.
   ```bash
   python -m http.server 8765 --directory docs
   ```
5. **Commit** small, one idea per commit, message as `type: what changed`:
   ```bash
   git add -A
   git commit -m "content: add fork/exec trace"
   ```
6. **Push and open a pull request**
   ```bash
   git push -u origin content/fork-exec-trace
   gh pr create --fill
   ```
7. **Review, then squash-merge.** One commit per change lands on `main`; the branch is deleted.
   ```bash
   gh pr merge --squash --delete-branch
   ```
8. **Confirm the deploy** finished and the live page works.

## Rules

- Never push or force-push directly to `main`.
- Undo a merged change with `git revert`, not by rewriting history.
- Tag milestones: `git tag v1.1.0 && git push --tags` (major = redesign, minor = new view or trace, patch = fixes).
- Facts must point to a source file or kernel document.
