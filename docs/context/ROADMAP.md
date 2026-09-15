# GEV-UZ Roadmap

## Milestone 0 — Fork bootstrap

Status: IN PROGRESS

- [x] Create GitHub fork under `ibostar95`.
- [x] Confirm write/admin access.
- [x] Record exact upstream bootstrap SHA.
- [x] Create isolated bootstrap feature branch.
- [ ] Confirm inherited GitHub Actions and baseline checks.
- [ ] Confirm clean install, build and unit tests on a supported Node version.
- [ ] Open and merge bootstrap PR.

## Milestone 1 — Product identity and configuration

- Introduce a single product configuration layer for product name, short name, default locale and default region.
- Rebrand user-facing GEV-UZ surfaces without deleting required upstream copyright/data attribution.
- Replace upstream homepage/repository links only where they represent the fork itself; preserve attribution links where required.
- Add Uzbekistan/Tashkent default camera presets as configuration rather than hard-coded forks where possible.

## Milestone 2 — RU / UZ / EN localization

- Create an i18n foundation rather than manually duplicating strings.
- Default locale should be configurable and browser-aware.
- Support Russian (`ru`), Uzbek Latin (`uz`) and English (`en`).
- Localize startup flow, map controls, layers, tracking UI, settings and AI-visible labels.
- Keep source/provider proper names unchanged where translation would be misleading.

## Milestone 3 — Uzbekistan experience

- Add Tashkent, Samarkand, Bukhara, Namangan, Andijan, Fergana, Nukus and other useful presets.
- Add Uzbekistan-wide quick navigation.
- Review available public feeds for aviation, weather, earthquakes, roads/traffic, public cameras and infrastructure.
- Add new providers only after documenting terms, reliability, rate limits and attribution.

## Milestone 4 — AI operator

- Preserve upstream OpenAI Realtime architecture and server-side API-key handling.
- Add multilingual RU/UZ/EN command understanding and responses.
- Add Uzbekistan-aware navigation commands and regional context.
- Add structured scene summaries and operator workflows without claiming unavailable data.

## Milestone 5 — Regional intelligence workspace

Potential modules, subject to source/licence review:

- aviation overview;
- weather and environmental events;
- earthquake/event timeline;
- transport/road context;
- energy and infrastructure layers based on lawful public data;
- public-camera coverage where available and permitted;
- saved scenes, shared views and incident workspaces.

## Milestone 6 — Production hardening

- Security review and secret-handling audit.
- Dependency and supply-chain review.
- Performance budgets for desktop and mobile.
- Provider rate-limit/cost controls.
- Deployment architecture and observability.
- Commercial-use licence audit for every bundled/runtime dataset and model.

## Development workflow

1. Keep `main` releasable.
2. Develop one milestone/task per feature branch.
3. Use PRs for all substantive changes.
4. Record important architectural decisions in `docs/context/DECISIONS.md`.
5. Record completed development blocks in `docs/context/TASK_HISTORY.md`.
6. Before merging upstream updates, review `UPSTREAM_SYNC.md` and run the full regression matrix.
