# stuaninauts.com

Personal site and portfolio of **Eduardo Stuani**, Data & AI Engineer. Live at [stuaninauts.com](https://stuaninauts.com).

Static [Astro](https://astro.build) site in English and Portuguese, deployed on Cloudflare Workers (static assets).

## Development

Requires the Node version in `.node-version` (24 LTS) and, for the pre-commit secret scan, [gitleaks](https://github.com/gitleaks/gitleaks) on your `PATH`.

```sh
npm install        # also installs git hooks (lefthook)
npm run dev        # http://localhost:4321
npm run check      # type and template checks
npm run build && npm run preview   # the CSP only exists in the production build
```

Projects live in `src/content/projects/<en|pt>/<slug>.md`. See [`CLAUDE.md`](CLAUDE.md) for conventions and
[`docs/decisions/`](docs/decisions) for the reasoning behind them.

## Working with Claude Code

This repo is set up to be worked on with [Claude Code](https://code.claude.com): `CLAUDE.md` holds the project context,
and `.claude/settings.json` adds permissions plus a `PreToolUse` hook that blocks pushes to `main`, force pushes and
other destructive commands. The `/pr` skill runs the checks, pushes and opens the pull request from the terminal
(through `scripts/gh.sh`, which pins the repo owner's GitHub account), following
[`.github/pull_request_template.md`](.github/pull_request_template.md), filled only with checks that
actually ran.

## License

- **Code** is licensed under the [MIT License](LICENSE).
- **Content** (texts in `src/content/` and `src/data/`, photos and images in `src/assets/`) is © Eduardo Stuani, all rights reserved.
- **Fonts** in `public/fonts/` are IBM Plex, under the [SIL Open Font License 1.1](https://github.com/IBM/plex/blob/master/LICENSE.txt).
