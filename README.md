# Portfolio – Joi Diego Napitupulu

A single-page personal portfolio with a blue-galaxy theme, three languages (Indonesian, English, Japanese), animated visuals, and password-protected PDF learning modules.

Built with React 18 (UMD build) and [htm](https://github.com/developit/htm), so it needs **no build step**. The code is split into small files under `css/` and `js/`, which `index.html` loads in order.

## Features

- **Sections:** Home (greeting, short info, summary, Resume button), Skills, Projects, Experience, Education, Contact, Learning Modules.
- **Languages:** ID / EN / 日本語 switcher. The choice is remembered in `localStorage`.
- **Layout switch:** the **left sidebar is the default** (profile card, navigation with active-section highlight). A button next to the language switch toggles to a top bar (screens wider than 900px). On smaller screens a compact top bar with a dropdown menu is used. The choice is remembered in `localStorage` (key `layout`). Styles are in `css/sidebar.css`.
- **Skills filter:** buttons (All, Backend, Frontend, Database, ...) show only the languages and tools of that category.
- **Visuals:** animated starfield and nebula, shooting stars, rotating photo ring, skills ticker, 3D-tilt project cards, and a UI preview layer behind each project card.
- **Icons:** every skill and every technology tag has an inline SVG icon.
- **Projects:** each card has a “View project” button, and the first card shows a “Featured” badge (max 4 tags per card, extra tags show as “+N”) (see "Edit your content").
- **Learning modules:** four PDF cards with a password prompt before download.
- **Accessibility:** keyboard focus styles, `aria-label`s, and `prefers-reduced-motion` support.

## Project structure

```
portfolio-joi/
├── index.html                # loads the CSS and JS files below
├── css/                      # one file per area (base, nav, hero, cards, ...)
│   ├── sidebar.css           # left sidebar layout
│   └── theme.css             # light-card theme, must load last
├── js/
│   ├── config.js             # React + htm setup
│   ├── data/                 # content you edit
│   │   ├── lang-id.js        # Indonesian text
│   │   ├── lang-en.js        # English text
│   │   ├── lang-ja.js        # Japanese text
│   │   ├── translations.js   # joins the three languages
│   │   ├── skills.js, projects.js, certs.js
│   │   ├── icons.js, logos.js
│   │   ├── photo.js          # base64 photo
│   │   └── pdfs.js           # encrypted PDFs (written by the tool)
│   ├── utils/crypto.js       # PDF decryption
│   ├── components/           # reusable pieces (Galaxy, Icon, Logo, ProjectCard, ...)
│   ├── sections/             # page sections (Navbar, Hero, Skills, Projects, ...)
│   ├── App.js                # page layout + language state
│   └── main.js               # renders App
├── assets/photo.jpg          # original photo (also embedded in js/data/photo.js)
├── source-modules/           # plain PDFs, keep private, do NOT deploy
├── tools/
│   ├── encrypt_modules.py    # re-encrypt PDFs, rewrites js/data/pdfs.js
│   └── make_sample_modules.py
└── README.md
```

**Load order matters.** The JS files are classic scripts (not ES modules) so the site still opens by double-clicking `index.html`. They share one global scope, and `index.html` lists them in the order they must run: data first, then components, then sections, then `App.js` and `main.js`. If you add a new file, add its `<script>` tag in the right place. CSS works the same way: `theme.css` must stay last.

## Run locally

Open `index.html` in a browser. It loads React, htm and the fonts from a CDN, so you need an internet connection. For a local server:

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload `index.html` together with the `css/` and `js/` folders to any static host.

- **GitHub Pages / Netlify / Vercel / Cloudflare Pages:** publish the project folder as the site root.
- **Do not upload `source-modules/`.** It contains the unencrypted PDFs.

## Edit your content

All text lives in `js/data/lang-id.js`, `lang-en.js` and `lang-ja.js`. Other content is in the files below:

| What | Where |
|---|---|
| About text, roles, project and experience text | `js/data/lang-*.js` |
| Project technology tags | `TECH` in `js/data/projects.js` |
| Project link targets | `URLS` in `js/data/projects.js` (one per project, same order as the cards) |
| Skills list and filter categories | `SK` and `SK_GROUPS` in `js/data/skills.js`; button labels in `skcat` of `js/data/lang-*.js` |
| Skill and tech icons | `MAP`, `IC`, `COL` in `js/data/icons.js` |
| Certifications | `CERTS` in `js/data/certs.js` |
| Company and campus logos | `LG` in `js/data/logos.js` (color and initials). To use a real logo, edit `js/components/Logo.js` and use an `<img>` |
| Photo | `PHOTO` in `js/data/photo.js` (a base64 data URI) |
| Contact email and social links | `js/components/ContactForm.js` |
| Section order or layout | `js/App.js` and `js/sections/` |

**Project links:** by default every link points to `https://github.com/joidiego`. Replace each entry in `URLS` with the real repository or demo URL.

**Project UI previews:** the layer behind each card is an illustration drawn in `js/components/ProjectMock.js`, not a real screenshot. To use a screenshot, replace the `<svg>` of that project with an `<img>`.

## Learning modules and the password

The four PDFs are encrypted in the browser-readable page with AES-256-GCM. The password is never stored in the code. When a visitor enters it, the page derives the key (PBKDF2-SHA256, 250000 iterations), decrypts the file in memory, and starts the download. A wrong password fails the decryption.

To change the password or replace the PDFs:

```bash
pip install cryptography pypdf
# 1. put your PDFs in source-modules/ using the same file names (or edit ORDER in the script)
# 2. run (this rewrites js/data/pdfs.js):
python tools/encrypt_modules.py "a long passphrase of your choice"
```

Then edit the titles and descriptions in the `mod` list of `js/data/lang-id.js`, `lang-en.js` and `lang-ja.js`.

**Limits to know about:** this is a client-side gate on a static page. The encrypted data is public, so someone can try passwords offline. Use a long passphrase (about 4 random words) instead of a short one. If you need real access control (accounts, revocation, download logs), serve the PDFs from a backend that checks the password on the server.

## Security notes

- The site has no backend and makes no network requests except to load React, htm and Google Fonts.
- The contact form only opens the visitor's email app through `mailto:`. Input length is limited and nothing is sent to a server.
- Text is rendered by React, which escapes it, so user input cannot inject HTML.
- External links use `rel="noopener noreferrer"`.
- The phone number from the CV is intentionally not shown, to avoid spam.
- Optional: if your host lets you set headers, add a Content-Security-Policy that allows only `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `fonts.googleapis.com` and `fonts.gstatic.com`. Scripts and styles are now separate files, so you may not need `'unsafe-inline'`; test it in the browser first.

## Dependencies (loaded from a CDN, versions pinned)

- React 18.3.1 and ReactDOM 18.3.1 (cdnjs)
- htm 3.1.1 (jsDelivr)
- Google Fonts: Bricolage Grotesque, IBM Plex Sans

## Moving to Next.js (optional)

The page is already split into one file per component (`js/components/`, `js/sections/`) with the data in `js/data/`. To move it to Next.js, turn each file into a module with imports/exports, replace the `html` templates with JSX, move the CSS from `css/` into a global stylesheet, and import the data files. Replace the `window.claude` usage in `js/components/ModuleCards.js` with the plain download fallback already in the code.

## Credits

Designed and written for Joi Diego Napitupulu. Sample module PDFs are written in Indonesian and can be replaced with your own material.

## Profile settings (first section)

Edit `PROFILE` in `js/config.js`: name, location, the **Open to work** badge, the verified check mark, and the Resume button.
Put your CV at `assets/resume.pdf` (or change the path). Set `resume: ""` to hide the button.

## Achievements section

Certificates live in `js/data/certs.js` (title, issuer, tags, date `YYYY-MM`, optional `id` and `img`).
Put certificate images in `assets/certs/` and set `img: "assets/certs/name.jpg"`. Without `img`, a generated cover is shown.

## Themes

Three icon buttons next to the language switch: sun = Light-gold, moon = Dark (default), leaf = Green-brown.
The choice is saved in `localStorage` (key `theme`). Colors are CSS variables per `:root[data-theme="..."]` in `css/base.css`; edit them there.
In side mode the page is a centered two-column shell (sticky sidebar + content, max width 1144px).
