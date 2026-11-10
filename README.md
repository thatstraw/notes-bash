# Bash notes

My shell scripting notes, in one searchable place: **https://bash.traw.sh**.

Variables, arrays, conditions, loops, functions, arithmetic, chaining, redirections, shell options, history, built-ins, and regular expressions. The design follows my [portfolio](https://traw.sh), with a compact reference-card layout inspired by [QuickRef](https://quickref.me/bash).

## Contribute

Found a typo, a broken example, or a better explanation? Edit the Markdown in [`content/bash/`](content/bash/) and open a pull request. Every topic on the site has an **Edit these notes** link. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

These are personal learning notes, not a fully audited shell manual. Regex features vary between tools; some shell options need newer Bash versions. Read examples before running them. The original exported notes have been reformatted for the web, with a few obvious syntax corrections. No QuickRef source text or code is bundled here.

## Local development

Use Node.js 22.13 or later and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No API keys, accounts, environment variables, or database are required.

```sh
npm run lint
npm run typecheck
npm run build
```

The build generates a static website in `out/`. Deploy that directory to any static web host. The production domain is configured in `app/layout.tsx`, `app/page.tsx`, `app/sitemap.ts`, and `app/robots.ts`.

## Structure

- `content/bash/*.md` — the notes; this is where most contributions belong.
- `lib/bash-notes.ts` — topic order, card extraction, and table splitting.
- `app/BashReference.tsx` — client-side search and topic navigation.
- `app/CodeBlock.tsx` — copyable code examples; nothing executes commands.
- `app/bash.css` and `app/globals.css` — responsive layout and light/dark theme.
- `deploy/Caddyfile.example` — static hosting on an existing server.

Markdown is rendered at build time with Markdoc. Search runs locally in the browser; the site has no analytics, tracking, newsletter collection, or server process. Theme choice is saved in browser local storage. Rebuild after changing notes. Internet access to Google Fonts is required at build time; the resulting font files are served locally.

## Publishing

After a reviewed change lands on `main`, build with `npm ci && npm run build` and upload `out/` to the static host. CI validates pull requests and pushes; it does not publish to the server or hold deployment credentials. Production uses the existing portfolio server, not another VM.

## License

No redistribution license has been selected yet. Public visibility alone does not grant a general license to republish the notes or site. Please ask before redistribution.
