# Upstream Sync Policy

## Canonical remotes

- Fork: `https://github.com/ibostar95/gods-eye-view-uz.git`
- Upstream: `https://github.com/bilawalsidhu/gods-eye-view.git`

## Bootstrap point

GEV-UZ was forked from upstream `main` at:

`223cae609fbe3549be47da2a175a06ddc1929a3e`

At bootstrap time, fork `main` and upstream `main` were identical.

## Recommended local setup

```bash
git clone https://github.com/ibostar95/gods-eye-view-uz.git
cd gods-eye-view-uz
git remote add upstream https://github.com/bilawalsidhu/gods-eye-view.git
git fetch --all --prune
```

Verify:

```bash
git remote -v
git status
git log --oneline --decorate -n 10
```

## Sync procedure

Do not mix upstream synchronization with feature development in one commit.

1. Start from a clean working tree.
2. Fetch both remotes.
3. Create a dedicated sync branch from our current `main`.
4. Merge upstream `main` into that branch.
5. Resolve conflicts while preserving GEV-UZ product configuration and attribution requirements.
6. Run formatting, unit tests, build and relevant browser/regression QA.
7. Open a dedicated PR describing upstream range and conflicts.
8. Merge only after checks are green.

Example:

```bash
git checkout main
git pull --ff-only origin main
git fetch upstream
git checkout -b chore/sync-upstream-YYYYMMDD
git merge --no-ff upstream/main
```

## Conflict policy

Prefer keeping upstream architecture improvements and reapplying GEV-UZ behavior through configuration or narrow extension points. If recurring conflicts appear in the same files, refactor our customization so it lives outside upstream-hot paths.

Never resolve a conflict by removing:

- required source/provider attribution;
- upstream security fixes;
- secret-handling protections;
- rate-limit safeguards;
- licence notices needed for bundled assets/data.

## Tracking rule

After every successful upstream sync, update `docs/context/TASK_HISTORY.md` with:

- previous GEV-UZ main SHA;
- upstream target SHA;
- resulting merged SHA;
- conflicts/resolutions;
- test/build/QA status.
