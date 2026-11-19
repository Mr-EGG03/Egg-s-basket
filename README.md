# Egg-s-basket

EGG carton, an interaction design portfolio. Plain HTML, CSS and JavaScript: no build step, just open `index.html`.

## Adding a project

Everything shown on the site comes from **`content/projects.js`**. Open it, copy the empty template at the top, paste it into the list and fill it in. Put the project's images in `images/projects/<project-id>/`.

- `featured: true` shows it on the landing page
- `hobby: true` shows it in the hobby section at the bottom of the About page
- `play: "codescape/<folder>/index.html"` puts it on the Code scape page

The before & after slider on the About page is set at the bottom of the same file.

## Adding a code project

Make a folder in `codescape/` with its own `index.html`, CSS and JS (see `codescape/example/`), then add a project in `content/projects.js` with a `play` link to it.

## CV

Replace `cv/CV.pdf` with your own CV, keeping the same name.

## Files

| Folder | What's in it |
| --- | --- |
| `index.html`, `about.html`, `codescape.html`, `gallery.html` | the four pages |
| `content/` | your projects (the only file you need to edit to add work) |
| `css/` | one stylesheet per job: `base` (fonts, colours), `nav` (folder tabs), `cards` (project cards and pop-up), then one per page |
| `js/` | small scripts: `cards` and `lightbox` are shared, the rest belong to one page each |
| `images/` | favicon and project photos |
| `codescape/` | the code projects people can try |
| `cv/` | your CV |

The example project, example images and `codescape/example/` can be deleted once you have your own.
