// about.js: fills the hobby gallery with projects marked  hobby: true

const hobbyGrid = document.getElementById("hobby-grid");
projects
  .filter((project) => project.hobby)
  .forEach((project) => hobbyGrid.appendChild(makeCard(project, openLightbox)));
