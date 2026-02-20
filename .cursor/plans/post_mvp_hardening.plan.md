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
  - id: db-search-optimization
    content: Optimize ILIKE search with pg_trgm GIN indexes for article and author lookup paths.
    status: pending
  - id: db-cursor-pagination
    content: Migrate article list queries from offset pagination to cursor-based pagination.
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
- Optimize substring search (`ILIKE '%q%'`) with Postgres trigram indexes (`pg_trgm`) for article title and author profile fields.
- Replace offset pagination in article list APIs with cursor pagination using `created_at` + `public_id` as a stable cursor key.

## Delivery Order

- Auth recovery flows first (highest user-impact when account access fails).
- Pagination consistency second (performance and UX under larger datasets).
- Security and route-level resilience third (operational hardening).
- DB search and pagination hardening fourth (scale-read performance).

## Database Hardening Notes

- `ILIKE` search currently uses leading wildcards, so btree indexes are not used effectively.
- Add `pg_trgm` plus GIN indexes for:
  - `articles.title`
  - `user.name`
  - `user.username`
  - `user.display_username`
- Cursor pagination plan:
  - Keep current API shape for MVP compatibility.
  - Add cursor params (`cursorCreatedAt`, `cursorPublicId`) alongside `limit`.
  - Query with seek method: `created_at < cursorCreatedAt` OR tie-break on `public_id`.
  - Return `nextCursor` instead of `totalPages` for cursor endpoints.
