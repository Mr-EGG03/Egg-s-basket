// breakthrough.js: at the bottom of the About page you hit a wall.
// Keep scrolling and it cracks, then breaks to reveal the hobby section.
// Clicking it, or pressing Enter, also breaks it.

const barrier = document.getElementById("barrier");
const hobby = document.getElementById("hobby");

const STRENGTH = 1500; // how much scrolling it takes to break through
const HEAL = 0.96; // how fast the crack closes again when you stop pushing
let force = 0;
let broken = false;

function atBottom() {
  return window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
}

function push(amount) {
  if (broken || amount <= 0 || !atBottom()) return;
  force += amount;
  barrier.classList.remove("shake");
  void barrier.offsetWidth; // restart the shake animation
  barrier.classList.add("shake");
  if (force >= STRENGTH) breakThrough();
  draw();
}

function draw() {
  barrier.style.setProperty("--crack", Math.min(force / STRENGTH, 1));
}

function breakThrough() {
  broken = true;
  barrier.classList.add("broken");
  barrier.setAttribute("aria-expanded", "true");
  hobby.hidden = false;
  hobby.scrollIntoView({ behavior: "smooth" });
}

// the crack slowly heals if you stop pushing
setInterval(() => {
  if (broken || force === 0) return;
  force = force * HEAL < 5 ? 0 : force * HEAL;
  draw();
}, 50);

// mouse wheel / trackpad
window.addEventListener("wheel", (e) => push(e.deltaY), { passive: true });

// touch screens
let touchY = null;
window.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), { passive: true });
window.addEventListener(
  "touchmove",
  (e) => {
    const y = e.touches[0].clientY;
    push((touchY - y) * 3);
    touchY = y;
  },
  { passive: true },
);

// keyboard
window.addEventListener("keydown", (e) => {
  if (["ArrowDown", "PageDown", " "].includes(e.key)) push(250);
});

// click or Enter on the wall
barrier.addEventListener("click", breakThrough);
barrier.addEventListener("keydown", (e) => {
  if (e.key === "Enter") breakThrough();
});
