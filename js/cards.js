// cards.js: builds a project card from one entry in content/projects.js

function makeCard(project, onClick) {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";

  const img = document.createElement("img");
  img.src = project.cover;
  img.alt = project.title;
  img.loading = "lazy";
  card.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.textContent = project.title;
  body.appendChild(title);

  body.appendChild(makeTags(project.tags));
  card.appendChild(body);

  card.addEventListener("click", () => onClick(project));
  return card;
}

function makeTags(tags) {
  const list = document.createElement("ul");
  list.className = "tags";
  (tags || []).forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    list.appendChild(li);
  });
  return list;
}
