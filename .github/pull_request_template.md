## Summary
<!-- 1 to 3 sentences: what this PR changes and why. Lead with the user-visible outcome. -->

## Type of change
<!-- Keep the ones that apply (Conventional Commits types). -->
- [ ] `feat`: new feature or content
- [ ] `fix`: bug fix
- [ ] `refactor`: code change with no behavior change
- [ ] `docs`: documentation only
- [ ] `chore` / `ci` / `build`: tooling, CI, dependencies or config
- [ ] Breaking change (URL, config or contract that something else depends on)

## Changes
<!-- Bullet list of what changed, grouped by area. Facts, not narrative. -->
-

## Motivation and context
<!-- Why is this needed? Link the issue or decision record: Closes #123, docs/decisions/000X. -->

## How has this been tested?
<!-- Commands actually run and their result. Anything not tested goes under "Not tested". -->
| Check | Result |
|---|---|
| `npm run check` | |
| `npm run build` | |

**Not tested:**

## Verification (QA / staging)
<!-- What was validated on a running build: local preview, Workers Builds preview URL or production after deploy.
     Pages, languages (EN/PT), themes (light/dark), viewports (desktop/mobile), browsers. -->

## Screenshots
<!-- Required for visual changes. Before / after, desktop and mobile. -->

## Risk and rollback
- **Risk:** low / medium / high, and why
- **Rollback:** revert this PR; production redeploys automatically from `main`

## Checklist
- [ ] EN and PT updated together
- [ ] No secrets, personal data (phone, address, personal email) or image metadata
- [ ] Accessibility: `alt` text, contrast in both themes, keyboard focus
- [ ] CSP still holds (`npm run build && npm run preview`, no console violations)
- [ ] `CLAUDE.md` / `docs/decisions/` updated if a convention or decision changed
