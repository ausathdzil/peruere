---
name: Post-MVP hardening
overview: Track important improvements that are not release blockers for MVP launch.
todos:
  - id: auth-recovery-flows
    content: Add password reset and email verification flows in auth routes.
    status: pending
  - id: list-pagination-consistency
    content: Add pagination UX consistency for home and profile article lists.
    status: pending
  - id: security-hardening
    content: Add baseline production protections such as security headers and API/auth rate limiting strategy.
    status: pending
  - id: route-level-error-boundaries
    content: Add route-level error.tsx boundaries for major app route groups.
    status: pending
isProject: false
---

# Post-MVP Hardening Plan

These items are important but can ship immediately after MVP release.

## Scope

- Add password reset and email verification in `[src/app/(auth)/](src/app/(auth)/)`.
- Add pagination UX for home/profile lists in `[src/app/(home)/page.tsx](src/app/(home)/page.tsx)` and `[src/app/(home)/profile/page.tsx](src/app/(home)/profile/page.tsx)`.
- Add production security baseline in `[next.config.ts](next.config.ts)` and API middleware (headers + rate-limit strategy).
- Add route-level error boundaries under `[src/app/(home)/](src/app/(home)/)`, `[src/app/(article)/](src/app/(article)/)`, and `[src/app/(auth)/](src/app/(auth)/)`.

## Delivery Order

- Auth recovery flows first (highest user-impact when account access fails).
- Pagination consistency second (performance and UX under larger datasets).
- Security and route-level resilience third (operational hardening).
