// landing.js: the big logo shrinks into the top-left corner as you scroll,
// then the highlighted projects are filled in from content/projects.js

const logo = document.querySelector(".logo");
const BIG = window.innerWidth < 640 ? 2.6 : 4; // how big the logo starts

let start = { x: 0, y: 0 };

// work out how far the logo must move to sit in the middle of the screen
function measure() {
  logo.style.transform = "none";
  const rect = logo.getBoundingClientRect();
  start.x = window.innerWidth / 2 - (rect.width * BIG) / 2 - rect.left;
  start.y = window.innerHeight / 2 - (rect.height * BIG) / 2 - rect.top;
  update();
}

function update() {
  // p is 0 at the top of the page and 1 once you've scrolled one screen down
  const p = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
  const left = 1 - p;
  const scale = 1 + (BIG - 1) * left;
  logo.style.transform = `translate(${start.x * left}px, ${start.y * left}px) scale(${scale})`;
  document.body.style.setProperty("--p", p);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", measure);
  document.fonts.ready.then(measure); // wait for the font so the size is right
  measure();
}

// highlighted projects
const featured = document.getElementById("featured");
projects
  .filter((project) => project.featured)
  .forEach((project) => featured.appendChild(makeCard(project, openLightbox)));
