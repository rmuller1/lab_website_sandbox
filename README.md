# Lab website template — multi-page

Static HTML, no build step. Each tab is a real page with its own URL.

```
index.html          →  yoursite/              Home
research.html       →  yoursite/research.html Research
people.html         →  yoursite/people.html   People
publications.html   →  yoursite/publications.html
join.html           →  yoursite/join.html     Join & contact
404.html            →  shown for any bad URL
styles.css          →  all styling, shared by every page
site.js             →  PEOPLE and PUBLICATIONS data, shared by every page
images/             →  create this and put photos in it
```

Double-click `index.html` to preview locally. Relative links between files work over `file://`, so the whole site is navigable offline.

---

## How the tabs work

There is no magic. Every page contains the same `<header class="topbar">` block, and each link is a relative path:

```html
<a href="publications.html">Publications</a>
```

The page you're currently on carries `aria-current="page"` on its own link, which the CSS uses to underline that tab. When you copy the nav into a new page, move that attribute.

**Pretty URLs** (`/research/` instead of `/research.html`) are possible: make a folder named `research` containing a file named `index.html`. It's tidier, but then relative paths inside that file need `../styles.css`, which is an easy thing to get wrong early on. `.html` endings are fine.

---

## The one real tradeoff: duplicated navigation

Plain HTML has no "include this file here" mechanism. The nav and footer are therefore copy-pasted into all five pages, so adding a sixth tab means editing five files. Your options, in rough order of how much machinery they bring:

**1. Copy-paste (what this template does).** Five files, one find-and-replace. Nothing to install, nothing to break, works with JavaScript disabled, and search engines see the links immediately. Adequate up to roughly 10 pages.

**2. Inject the nav with JavaScript.** One `nav.js` builds the header on every page. Tempting, but it costs you: the nav can flash in late, it vanishes entirely if the script fails, and crawlers see a page whose links appear only after JS runs. *Opinion:* not worth it for five pages.

**3. Let Jekyll do it.** GitHub Pages runs [Jekyll](https://jekyllrb.com/) server-side for free — you don't install anything for it to work on GitHub. You put the nav in `_includes/nav.html`, write `{% include nav.html %}` in each page, and GitHub assembles the pages when you push. Real templating, no client-side cost.

   The catch is local preview. Once a file contains `{% ... %}`, double-clicking it shows you raw template syntax; you either push and wait ~1 minute to see each change, or install Ruby + Jekyll locally, which is a genuinely annoying setup on macOS. *Opinion:* worth switching to when nav edits start to irritate you, not before. The HTML and CSS here carry over unchanged.

---

## Editing

- **Text, headings, page content** → edit the `.html` file directly. Everything between `<main>` and `</main>` is yours.
- **Lab members and papers** → `site.js` only. The home page shows the three most recent publications (`data-limit="3"` on its container); `publications.html` shows all of them. One list, two views.
- **Colours, fonts, spacing** → the `:root` block at the top of `styles.css`.
- **Photos** → create an `images/` folder, then set `photo: "images/rivera.jpg"` in `site.js`.

If people or publications render as a blank space, you've broken the JSON-ish syntax in `site.js` — a missing comma or an unescaped quote. Press F12 → Console and the browser names the line.

---

## Putting it on GitHub

**Terminology:** a *repository* is a tracked folder. A *commit* is a saved snapshot with a message. *Push* uploads commits. **GitHub Pages** serves a repo's files as a website, free for public repos.

| | Repo name | URL |
|---|---|---|
| User site | `YOURNAME.github.io` (exact match to your username) | `https://YOURNAME.github.io/` |
| Project site | anything, e.g. `lab-website` | `https://YOURNAME.github.io/lab-website/` |

Steps, browser only:

1. **+ → New repository**, set **Public**, tick "Add a README file", create.
2. **Add file → Upload files**, drag in all seven files at once, **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, folder: `/ (root)`, Save.
4. Wait ~1 minute (occasionally up to 10). The URL appears at the top of that settings page.

For ongoing edits, install [GitHub Desktop](https://desktop.github.com/) — clone, edit in your usual editor, Commit, Push. Much gentler than learning `git` on the command line.

---

## Things that will bite you

- **Filenames are case-sensitive on GitHub Pages**, but not on macOS or Windows. `Publications.html` linked as `publications.html` works locally and 404s live. This is the most common "but it worked on my laptop" bug.
- **Use relative links** (`research.html`), not absolute ones (`/research.html`). Absolute paths break on project sites, where everything lives under `/lab-website/`. The one exception is `404.html`, which GitHub serves from arbitrary URLs and therefore needs absolute paths — see the comment inside it.
- **Public repos are public and effectively permanent.** Deleted files survive in the commit history. No unpublished data, no drafts, no personal information.
- **No server-side code.** Static files only; a working contact form needs Formspree, Tally, or similar.
- **Files starting with `_` are ignored** by default, since Pages runs Jekyll over your repo. Add an empty `.nojekyll` file at the root to switch that off — but note that doing so also disables option 3 above.
- **Custom domain:** add it under Settings → Pages, point a CNAME record at `YOURNAME.github.io` at your registrar, then tick **Enforce HTTPS** once the certificate issues.
- **Soft limits:** ~1 GB per repo, ~100 GB/month bandwidth, ~10 builds/hour. Irrelevant unless you host video. Put datasets on Zenodo or an institutional repository regardless.

---

## Alternatives

If BibTeX-driven publication lists matter more to you than layout control, [al-folio](https://github.com/alshedivat/al-folio) is the most widely used academic lab theme and handles this out of the box. [Academic Pages](https://github.com/academicpages/academicpages.github.io), Hugo's Blowfish, and Quarto are the other common choices. All bring a build system and someone else's update cycle; this template brings neither.
