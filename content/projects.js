/*
  projects.js: THE ONE PLACE TO ADD PROJECTS

  How to add a project:
  1. Make a folder for its images:  images/projects/<your-id>/
  2. Copy the EMPTY TEMPLATE below, paste it inside the list at the bottom,
     and fill it in. Keep the comma after the closing } of each project.
  3. Save and refresh the page. The site builds the cards from this list.

  Which page shows it:
  - Gallery page:      every project
  - Landing page:      projects with  featured: true
  - About page (hobby
    break-through):    projects with  hobby: true
  - Code scape page:   projects with a  play  link (a folder in codescape/)

  ------------------------- EMPTY TEMPLATE -------------------------
  {
    id: "",            // short name, no spaces, e.g. "t-62"
    title: "",
    year: "",
    tags: [],          // e.g. ["interaction", "making", "code", "hobby"]
    cover: "",         // e.g. "images/projects/t-62/cover.webp"
    images: [
      "",
    ],
    text: ``,          // between the `backticks` you can write several lines
    featured: false,   // true = show on the landing page
    hobby: false,      // true = show in the hobby section on the About page
    play: "",          // code projects only, e.g. "codescape/itsocks/index.html"
  },
  ------------------------------------------------------------------
*/

const projects = [
  // EXAMPLE: delete this one once you have added your own
  {
    id: "example",
    title: "Example project",
    year: "2026",
    tags: ["example", "making"],
    cover: "images/projects/example/cover.svg",
    images: [
      "images/projects/example/cover.svg",
      "images/projects/example/before.svg",
      "images/projects/example/after.svg",
    ],
    text: `This is where the project story goes.

What was the brief, what did you make, and what did you learn?`,
    featured: true,
    hobby: true,
    play: "",
  },

  // EXAMPLE CODE PROJECT: shows how the Code scape page works
  {
    id: "example-code",
    title: "Example code toy",
    year: "2026",
    tags: ["example", "code"],
    cover: "images/projects/example/cover.svg",
    images: [],
    text: `A tiny HTML, CSS and JavaScript project. Click "Try it" to play.`,
    featured: false,
    hobby: false,
    play: "codescape/example/index.html",
  },
];

/*
  BEFORE & AFTER slider on the About page.
  Use two photos taken from the same angle.
*/
const beforeAfter = {
  title: "Beginning and end",
  text: "Drag the line to compare the first shading with the finished model.",
  before: "images/projects/example/before.svg",
  after: "images/projects/example/after.svg",
};
