# GEV-UZ Master Context

## Project

**Repository:** `ibostar95/gods-eye-view-uz`  
**Upstream:** `bilawalsidhu/gods-eye-view`  
**Bootstrap upstream SHA:** `223cae609fbe3549be47da2a175a06ddc1929a3e`  
**Bootstrap date:** 2026-09-15

GEV-UZ is an Uzbekistan-focused fork of God's Eye View. The goal is to keep the upstream project's global real-time spatial-intelligence capabilities while building a distinct product optimized for Uzbekistan, with Tashkent as the first regional experience.

## Product direction

The product should evolve from a generic global demo into a practical regional situational-awareness platform with:

- Uzbekistan-first startup experience and geographic presets.
- Russian, Uzbek and English UI/localization.
- Real-time public/open data layers where legally and technically available.
- Strong Tashkent experience first, followed by Uzbekistan-wide coverage.
- OpenAI-powered conversational control and scene intelligence.
- A distinct GEV-UZ visual identity without obscuring required upstream/data-provider attribution.
- Desktop-first power-user UX while preserving responsive/mobile usability.

## Architecture policy

1. **Keep upstream mergeability.** Prefer additive modules, configuration and extension points over invasive rewrites.
2. **Do not commit secrets.** API keys, tokens, credentials, `.env` contents and private endpoints must never be committed.
3. **Preserve attribution.** Third-party provider attribution and source-specific licence obligations remain mandatory.
4. **Separate code licence from data licences.** The upstream MIT code grant does not automatically cover bundled or runtime third-party datasets/assets.
5. **Public/open data only by default.** New data sources must have documented provenance, terms and attribution requirements.
6. **Fail soft.** Optional Uzbekistan-specific feeds must not prevent the global application from starting.
7. **Test before merge.** Build, unit tests, formatting checks and relevant browser QA must pass before feature branches merge to `main`.
8. **Git-backed continuity.** Decisions, milestone state and task history live under `docs/context/` so development can resume from any machine or coding agent.

## Initial technical baseline

At bootstrap, our fork `main` exactly matches upstream `main` at:

`223cae609fbe3549be47da2a175a06ddc1929a3e`

The upstream application already exposes modular packages for maps, flights, military flights, vessels, satellites, earthquakes, launches, traffic, CCTV, radio, OpenAI realtime voice, annotations and regional context. GEV-UZ should extend these modules rather than duplicate them.

## First milestone: Uzbekistan foundation

The first milestone is intentionally conservative:

- establish fork/project documentation and upstream tracking;
- verify clean baseline CI/build/tests;
- introduce product configuration for GEV-UZ branding and Uzbekistan defaults;
- establish RU / UZ / EN localization architecture;
- add Tashkent / Uzbekistan geographic presets without breaking global navigation;
- audit potential Uzbekistan data sources before integrating any provider;
- preserve current keyless startup behavior;
- keep OpenAI features optional and server-side credential handling intact.

## Non-goals for the bootstrap milestone

- No removal of existing global layers.
- No secret or private surveillance feeds.
- No fabricated "live satellite" imagery claims.
- No commercial deployment assumptions until all third-party data licences are reviewed.
- No large visual rewrite before the baseline test matrix is green.

## Current state

- Fork created: PASS
- Fork ownership/write access: PASS
- Fork is recognized by GitHub as a fork of `bilawalsidhu/gods-eye-view`: PASS
- Initial fork/upstream SHA parity: PASS
- Bootstrap feature branch: `feat/gev-uz-bootstrap`
- Baseline CI/build/test validation: PENDING
- Product code modifications: NOT STARTED
