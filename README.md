# Birthday Wishes — Blush Paper Moon

An interactive, romantic birthday love-letter website built with React, TypeScript, and Vite. It includes a candle-and-confetti opening reveal, a hidden envelope letter, movable love notes, flip-over memory cards, a diary-style closing message, and a browser-based customization panel.

## Editing the surprise

Open the site and choose **Edit this surprise** in the header. You can update the recipient’s name, date, hero and diary messages, envelope copy, sign-off, memory titles, and all three memory images. Images can be uploaded locally or supplied as a public URL. Edits are intentionally local to the browser so visitors can safely explore the site without changing your original hosted version.

## Publishing updates

Pushing to the `main` branch starts the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The workflow builds the site with the `/birthday-site/` base path, packages it, and deploys it to the repository’s GitHub Pages URL.

## Local development

```bash
pnpm install
pnpm dev
```

To create a production-style GitHub Pages build locally, run:

```bash
pnpm vite build --base=/birthday-site/
```

