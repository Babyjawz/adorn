# Adorn Wiki

A GitHub Pages documentation site for Adorn and Adorn Seller Framework. It uses the supplied **v4 wordmark**, the mod's Dumbledor font for headings/navigation/controls, left guide navigation and a central article column. Longer articles have a slim right-hand **On this page** list; on smaller screens that list becomes an expandable section above the article. Grey is the default theme; Sky, Pine and Pink are also available. Search and theme preferences work in the browser without a server backend.

## Preview

The generated site is in `dist/`. Open `dist/index.html` directly, or run:

```sh
npm ci
npm run build
npm run check
npm run preview
```

The preview server listens at `http://127.0.0.1:4179/`. Stop it with Ctrl+C.

## Update the guides

Canonical mod documentation stays in `../source/`. Run `npm run sync` from this folder after updating the manuals, then build and check. Sync copies only the eight curated guides and the branding/font assets; it does not publish the rest of the mod source or internal handoffs.

`content/` holds the documentation snapshot that makes this folder self-contained as a docs-only repository. `site.config.mjs` splits the manuals into topics and defines the left navigation. `src/` contains the theme and browser behaviour. Internal source-only references that are not curated wiki pages remain plain text, rather than dead links.

## Add screenshots

Put a PNG or WebP under `assets/screenshots/`. In the maintained guide, use a relative image link such as:

```md
![Outfit preview with a custom look](assets/screenshots/outfit-preview.png "The selected pieces in Adorn's preview.")
```

Then sync, build and check. The builder copies asset subdirectories, includes alt text and displays an optional caption. No screenshot placeholders are published.

## GitHub Pages

This folder is ready to be a separate repository. The included Pages workflow builds and checks the documentation, then deploys `dist/`. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source. The site uses relative URLs so it works at a project path such as `/adorn/` as well as a domain root.

Only push this wiki folder. The generated site contains no API keys, personal configuration, recordings, game saves, build caches or mod runtime files.

## Artwork and notices

`assets/adorn-wordmark-v4.png` is an unchanged copy of the supplied release artwork. The accompanying GemFonts notice is preserved beside the copied heading font. These docs do not grant new rights over the mod or third-party assets. The Markdown renderer's package licence remains in its installed dependency.
