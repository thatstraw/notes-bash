# Contributing

Thanks for helping make these notes a little more useful.

1. Fork this repository and create a branch for your change.
2. Edit the relevant file under `content/bash/`. GitHub’s editor works too; each topic on the website links straight to its source.
3. Keep changes focused. Explain what was incorrect and why the replacement works.
4. Open a pull request against `main`.

## Writing notes

- Use short, descriptive headings; each heading with content becomes a reference card.
- Use fenced blocks with the `bash` language for runnable examples. Label pseudocode clearly.
- Separate the command from its expected output. Explain version requirements and platform differences.
- Escape literal pipes as `\|` inside Markdown tables, including in inline code.
- Keep table rows on one line; put multiline shell examples in fenced blocks instead.
- Link to the Bash manual or the relevant tool’s documentation when correcting behavior.
- Avoid personal data, real credentials, private addresses, and destructive examples without clear warnings.
- Don’t copy third-party cheat sheets or other content without the required permission and attribution.
- Keep the tone relaxed and practical. No skill ratings, generated filler, or unnecessary jargon.

To add a topic, add its Markdown file and register its slug, label, and description in `lib/bash-notes.ts`.

## Check changes

```sh
npm ci
npm run lint
npm run typecheck
npm run build
```

For UI changes, check light and dark themes, narrow mobile widths, keyboard navigation, search and empty results, anchor links, and code copying. For shell examples, use a disposable test directory and document the Bash version you checked. Never run unknown scripts against a production system.

Pull requests are welcome, but aren’t published automatically. The maintainer reviews them before merging and deploying.
