/*
 * IDB Programming: Code Playground
 */

import * as Util from "../../util.js";

// Sock state
let socks = [];
let activeSock = null;
let a = 0;

let pileX = [150, 150, 150];
let pileY = [150, 150, 150];

let closet = Util.createThing("closet");
closet.id = "closet";
Util.setSize(300, 300, closet);
Util.setColour(180, 100, 50, 0, closet);
Util.setRoundedness(0.1, closet);
Util.setPositionPixels(50, 25, closet);


let hint = Util.createThing("hint");
hint.id = "hint";
Util.setSize(150, 150, hint);
Util.setColour(180, 100, 50, 0, hint);
Util.setRoundedness(1, hint);
hint.style.padding = "10px";
hint.style.backgroundColor = "white";
Util.setPositionPixels(1350, 25, hint);
hint.style.border = "4px solid red";


let hintImg = document.createElement("img");
hintImg.src = "./assets/items/question.png";
hintImg.style.width = "100%";
hintImg.style.height = "100%";
hintImg.style.objectFit = "contain";
hintImg.style.pointerEvents = "none";
hint.appendChild(hintImg);
hint.style.userSelect = "none";

closet.style.position = "absolute";
closet.style.transformOrigin = "center center";

  // Add image to the basket (closet)
let closetImg = document.createElement("img");
closetImg.src = "./assets/items/basket.png";
closetImg.style.width = "100%";
closetImg.style.height = "100%";
closetImg.style.objectFit = "cover";
closetImg.style.pointerEvents = "none";
closet.appendChild(closetImg);
closet.style.userSelect = "none";

closet.style.position = "absolute";
closet.style.transformOrigin = "center center";

const sockSize = 125;

const hueToImage ={
  0: "./assets/items/3.png", // red sock
  120: "./assets/items/1.png", // green sock
  240: "./assets/items/2.png", // blue sock
};

const boxImages = {
  0: "./assets/items/b1.png", //red box
  120: "./assets/items/b2.png", //green box
  240: "./assets/items/b3.png", //blue box
};

// Target boxes
const targetBoxes = [
  { x: 900, y: 500, width: 250, height: 300, hue: 120, color: "darkgreen" },
  { x: 1100, y: 500, width: 250, height: 300, hue: 240, color: "darkblue" },
  { x: 1300, y: 500, width: 250, height: 300, hue: 0, color: "darkred" },
];

// Hint function
function showHint(){
  if(a === 0){
      alert("Hint: Click the laundry basket to rotate it!");
  } else if (a === 6 && socks.length > 0){
      alert("Hint: Drag and drop socks into the boxes. Match colors to make them disappear!");
  }
}




// Rotate basket function:

function rotateBox1(a){
 Util.setRotation(a*30, closet);
}

function handleBoxClick(event){
 if( event.target.id == "closet" && a < 6){
  a++;
  console.log(a);
  rotateBox1(a);
 }

if (a === 6){
  generateSocks();
}
}

// Render target boxes
for (const box of targetBoxes) {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = `${box.x}px`;
  div.style.top = `${box.y}px`;
  div.style.width = `${box.width}px`;
  div.style.height = `${box.height}px`;
  // div.style.border = `4px solid ${box.color}`;
  // div.style.borderRadius = "12px";
  div.style.overflow = "hidden"; // Ensure image doesn't spill out
  div.style.userSelect = "none";

  // Add image to the box
  const img = document.createElement("img");
  img.src = boxImages[box.hue]; // Match hue to image
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.pointerEvents = "none"; // Prevent image from interfering with drag
  div.appendChild(img);

  document.body.appendChild(div);
  box.element = div;
}

// Fade helper
function fadeAway(current, amount = 0.9) {
  return current * amount;
}

// Animate fade out
function fadeOutSock(sockObj) {
  let opacity = 1;

  function step() {
    opacity = fadeAway(opacity);
    sockObj.element.style.opacity = opacity;
    if (sockObj.image) {
      sockObj.image.style.opacity = opacity;
    }

 if (opacity <= 0.01) {
  sockObj.element.remove();
  socks = socks.filter(s => s !== sockObj);
  checkForCompletion(); // Check if all socks are gone
} else {
  requestAnimationFrame(step);
}

  }

  requestAnimationFrame(step);
}

function checkForCompletion() {
  if (socks.length === 0) {
    jumpBoxes();
  }
}

function jumpBoxes(times = 5, delay = 200) {
  for (const box of targetBoxes) {
    let count = 0;

    function jump() {
      box.element.style.top = "490px"; 
      setTimeout(() => {
        box.element.style.top = "500px"; 
        count++;
        if (count < times) {
          setTimeout(jump, delay);
        }
      }, delay);
    }

    jump(); 
  }
}


function moveTowards(current, target, amount=0.1) {
  return current + (target - current) * amount;
}

function animateFall() {
  let anyFalling = false;
  for (const sock of socks) {
    if (sock.falling) {
      sock.x = moveTowards(sock.x, sock.targetX, 0.1);
      sock.y = moveTowards(sock.y, sock.targetY, 0.1);
      Util.setPositionPixels(sock.x, sock.y, sock.element);
      if (Math.abs(sock.x - sock.targetX) < 1 && Math.abs(sock.y - sock.targetY) < 1) {
        sock.x = sock.targetX;
        sock.y = sock.targetY;
        Util.setPositionPixels(sock.x, sock.y, sock.element);
        sock.falling = false;
      } else {
        anyFalling = true;
      }
    }
  }
  if (anyFalling) {
    requestAnimationFrame(animateFall);
  }
}

let hasGeneratedSocks = false;

// Make all socks fall to random X and max Y
function dropSocksToGround() {
  const maxY = window.innerHeight - sockSize;
  for (const sock of socks) {
    const randomX = Math.floor(Math.random() * (window.innerWidth/3 - sockSize));
    sock.targetX = randomX;
    sock.targetY = maxY;
    sock.falling = true;
  }
  animateFall();
}

// Sock generator
function generateSocks() {

  if (hasGeneratedSocks) return;
  hasGeneratedSocks = true;
  // Clear existing socks
  for (const s of socks) {
    s.element.remove();
  }
  socks = [];

    // Create 6 socks: 2 of each color (red, green, blue)
    const hues = [0, 120, 240];
    // Use pileX and pileY to spread socks
    const positions = [
      {x: pileX[0], y: pileY[0]},
      {x: pileX[1], y: pileY[0]},
      {x: pileX[2], y: pileY[0]},
      {x: pileX[0], y: pileY[1]},
      {x: pileX[1], y: pileY[1]},
      {x: pileX[2], y: pileY[1]},
    ];
    let sockIndex = 0;
    for (let colorIdx = 0; colorIdx < 3; colorIdx++) {
      for (let pair = 0; pair < 2; pair++) {
        let sock = Util.createThing();
        // Assign each sock a unique position from the positions array
        const pos = positions[sockIndex % positions.length];
        const x = pos.x;
        const y = pos.y;
        const hue = hues[colorIdx];

        Util.setSize(sockSize, null, sock);
        Util.setPositionPixels(x, y, sock);
        Util.setColour(hue, 100, 50, 0, sock);
        Util.setRoundedness(0.5, sock);
        Util.setRotation(0, sock);

    // Add image to the sock based on its hue

        const img = document.createElement("img");
    img.src = hueToImage[hue];
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none";
    sock.appendChild(img);
        sock.style.userSelect = "none";

        const sockObj = {
          element: sock,
          x,
          y,
          startX: x,
          startY: y,
          hue,
          isDragging: false,
        };
        socks.push(sockObj);
        sock.addEventListener("pointerdown", (e) => handlePointerDown(e, sockObj));
        sockIndex++;
      }
    }
setTimeout(dropSocksToGround, 300); // Give a short delay for generation
  }

// Drag handlers
function handlePointerDown(event, sock) {
  sock.isDragging = true;
  activeSock = sock;
  // console.log("Dragging:", sock);
}


function handlePointerUp() {
  if (activeSock) {
    activeSock.isDragging = false;

    for (const box of targetBoxes) {
      if (
        activeSock.x + sockSize / 2 > box.x &&
        activeSock.x + sockSize / 2 < box.x + box.width &&
        activeSock.y + sockSize / 2 > box.y &&
        activeSock.y + sockSize / 2 < box.y + box.height
      ) {
        // Check for matching sock in box
        const socksInBox = socks.filter((s) => {
          if (s === activeSock) return false; // Don't count the current sock
          const sockCenterX = s.x + sockSize / 2;
          const sockCenterY = s.y + sockSize / 2;
          return (
            sockCenterX > box.x &&
            sockCenterX < box.x + box.width &&
            sockCenterY > box.y &&
            sockCenterY < box.y + box.height &&
            s.hue === activeSock.hue // Same color
          );
        });

        // If matching sock found in box, fade both away
        if (socksInBox.length > 0 && activeSock.hue === box.hue) {
          fadeOutSock(activeSock);
          // Fade out the matching sock(s) as well
          for (const matchingSock of socksInBox) {
            fadeOutSock(matchingSock);
          }
        }
        // If no matching sock and wrong color, sock stays in box but doesn't fade
        // If no matching sock and correct color, sock stays in box waiting for pair

        break;
      }
    }
    activeSock = null;
  }
}

function handlePointerMove(event) {
  if (activeSock && activeSock.isDragging) {
    activeSock.x = event.x - sockSize / 2;
    activeSock.y = event.y - sockSize / 2;
    // Util.setPositionPixels(activeSock.x, activeSock.y, activeSock.element);
  }
}

// Main loop
function loop() {

  for (const sock of socks) {
    Util.setPositionPixels(sock.x, sock.y, sock.element);
  }
  requestAnimationFrame(loop);
}

// Setup
function setup() {
  closet.addEventListener("click",handleBoxClick);
    // setTimeout(dropSocksToGround, 300); // Give a short delay for generation
  hint.addEventListener("click", showHint);
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  requestAnimationFrame(loop);
}

setup();