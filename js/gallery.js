// gallery.js: every project, with a filter button for each tag

const galleryGrid = document.getElementById("gallery-grid");
const filters = document.getElementById("filters");

// collect every tag used in content/projects.js
const allTags = [...new Set(projects.flatMap((project) => project.tags || []))].sort();

function show(tag) {
  galleryGrid.innerHTML = "";
  projects
    .filter((project) => tag === "all" || (project.tags || []).includes(tag))
    .forEach((project) => galleryGrid.appendChild(makeCard(project, openLightbox)));

  filters.querySelectorAll(".btn").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.tag === tag);
  });
}

["all", ...allTags].forEach((tag) => {
  const button = document.createElement("button");
  button.className = "btn";
  button.type = "button";
  button.dataset.tag = tag;
  button.textContent = tag === "all" ? "All" : tag;
  button.addEventListener("click", () => show(tag));
  filters.appendChild(button);
});

show("all");
