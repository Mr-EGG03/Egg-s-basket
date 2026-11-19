// before-after.js: drag the line to compare two photos (set them in content/projects.js)

const frame = document.getElementById("ba-frame");
const afterBox = document.getElementById("ba-after");
const line = document.getElementById("ba-line");

document.getElementById("ba-before").src = beforeAfter.before;
document.getElementById("ba-after-img").src = beforeAfter.after;
document.getElementById("ba-title").textContent = beforeAfter.title;
document.getElementById("ba-text").textContent = beforeAfter.text;

let position = 50;
let dragging = false;

function setPosition(percent) {
  position = Math.max(0, Math.min(percent, 100));
  afterBox.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  line.style.left = position + "%";
}

function fromPointer(x) {
  const rect = frame.getBoundingClientRect();
  setPosition(((x - rect.left) / rect.width) * 100);
}

frame.addEventListener("pointerdown", (e) => {
  dragging = true;
  fromPointer(e.clientX);
});
window.addEventListener("pointerup", () => (dragging = false));
window.addEventListener("pointermove", (e) => {
  if (dragging) fromPointer(e.clientX);
});

frame.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setPosition(position - 5);
  if (e.key === "ArrowRight") setPosition(position + 5);
});

setPosition(50);
