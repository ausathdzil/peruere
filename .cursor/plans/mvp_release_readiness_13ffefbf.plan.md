---
name: MVP release readiness
overview: Assess whether Peruere is close to MVP and define a minimal set of release blockers to address before shipping.
todos:
  - id: ci-quality-gates
    content: Add CI workflow and explicit scripts for lint/typecheck/test so release checks are reproducible.
    status: pending
  - id: hook-hardening
    content: Fix and simplify pre-commit hook to avoid portability/interactive staging issues.
    status: pending
  - id: error-safety
    content: Make global error UI safe for production (generic user message, internal details hidden).
    status: pending
  - id: env-validation
    content: Add runtime env validation for required secrets/URLs/DB connection.
    status: pending
  - id: post-mvp-auth-ux
    content: Plan password reset/email verification and pagination consistency as immediate post-MVP items.
    status: pending
isProject: false
---

# MVP Release Readiness Check

Peruere appears **close to MVP**: core auth, authoring, publish/archive/delete, profile, home feed, and explore/search are implemented. The main risk is not core feature completeness, but release hardening.

## Current Verdict

- **Likely close (about 80-90%)** for MVP scope.
- **No-go until P0 blockers are closed**.

## P0 Blockers (fix before release)

- Add automated CI checks (no workflows currently): `[.github/](.github/)` is missing.
- Ensure predictable quality commands in `[package.json](package.json)`: add explicit `test` and `typecheck` scripts (currently only `check`/`fix`).
- Fix pre-commit reliability in `[.husky/pre-commit](.husky/pre-commit)` (shebang should be first line; current first line runs `bun test`).
- Avoid leaking internal error details from `[src/app/global-error.tsx](src/app/global-error.tsx)`: currently renders `error.message` and `error.digest` directly.
- Validate critical env vars at startup (`DATABASE_URL`, auth secrets/URLs): `[.env.example](.env.example)`, `[src/db/index.ts](src/db/index.ts)`, `[src/lib/auth.ts](src/lib/auth.ts)`, `[src/lib/eden.ts](src/lib/eden.ts)`.

## P1 Strongly Recommended (can ship shortly after)

- Add password reset and email verification flows in auth routes under `[src/app/(auth)/](<src/app/(auth)`/>).
- Add pagination UX consistency for home/profile lists in `[src/app/(home)/page.tsx](<src/app/(home)`/page.tsx>) and `[src/app/(home)/profile/page.tsx](<src/app/(home)`/profile/page.tsx>).
- Add baseline production protections in `[next.config.ts](next.config.ts)`: security headers and rate-limit strategy for auth/API.
- Add route-level `error.tsx` boundaries for major route groups under `[src/app/(home)/](<src/app/(home)`/>), `[src/app/(article)/](<src/app/(article)`/>), `[src/app/(auth)/](<src/app/(auth)`/>).

## Evidence Snippets (non-obvious)

```1:4:.husky/pre-commit
bun test

#!/bin/sh
# Exit on any error
```

```49:52:src/app/global-error.tsx
<EmptyContent>
  <EmptyDescription>Message: {error.message}</EmptyDescription>
  <EmptyTitle>Digest: {error.digest}</EmptyTitle>
</EmptyContent>
```

## Suggested Release Gate

- CI green on lint + typecheck + tests.
- Manual smoke test of core journeys: sign up, sign in, create draft, edit, publish, read public article, archive, delete.
- Production env validation passes.
- No internal error details exposed to end users.
