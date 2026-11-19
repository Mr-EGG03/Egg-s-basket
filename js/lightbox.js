// lightbox.js: the pop-up that shows a whole project (images and text)

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
document.body.appendChild(lightbox);

let lastFocus = null;

function openLightbox(project) {
  lastFocus = document.activeElement;
  lightbox.innerHTML = "";

  const panel = document.createElement("div");
  panel.className = "lightbox-panel";

  // text column
  const text = document.createElement("div");
  text.className = "lightbox-text";
  const title = document.createElement("h2");
  title.textContent = project.title;
  const year = document.createElement("p");
  year.textContent = project.year;
  const story = document.createElement("p");
  story.textContent = project.text;
  text.append(title, year, makeTags(project.tags), story);

  if (project.play) {
    const play = document.createElement("a");
    play.className = "btn";
    play.href = project.play;
    play.target = "_blank";
    play.textContent = "Try it";
    text.appendChild(play);
  }

  // image column
  const images = document.createElement("div");
  images.className = "lightbox-images";
  (project.images || []).forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = project.title;
    img.loading = "lazy";
    images.appendChild(img);
  });

  const close = document.createElement("button");
  close.className = "btn lightbox-close";
  close.type = "button";
  close.textContent = "Close";
  close.addEventListener("click", closeLightbox);

  panel.append(text, images, close);
  lightbox.appendChild(panel);
  lightbox.classList.add("open");
  document.body.classList.add("no-scroll");
  close.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
  if (lastFocus) lastFocus.focus();
}

// click the dark background or press Escape to close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});
