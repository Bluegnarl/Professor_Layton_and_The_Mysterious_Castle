import responsiveLayout from "./utils/responsiveLayout.js";
import animatedBackground from "./utils/animatedBackground.js";

const npc = document.querySelectorAll(".npc");
const inventoryIcon = document.querySelector(".inventory-icon");
const closeInventory = document.getElementById("close-inventory");
const moveIcon = document.querySelector(".move-icon");
const primaryScreen = document.querySelector(".primary-creen");
const dialogueContainer = document.querySelector(".dialogue");
const inventory = document.querySelector(".inventory");
const secondaryScreen = document.querySelector(".secondary-screen");
const moveArrowContainer = document.querySelector(".move-arrow-container");

let action = "";

function displayScene() {
  if (action == "puzzle") {
    inventoryIcon.style.display = "none";
    moveIcon.style.display = "none";
    npc[0].style.display = "none";
    secondaryScreen.classList.add("puzzle");
  } else {
    inventoryIcon.style.display = "flex";
    moveIcon.style.display = "flex";
    npc.forEach((npc) => {
      npc.style.display = "flex";
      npc.addEventListener("click", () => {
        npc.style.animation = "glow 0.2s ease-out";

        npc.addEventListener("animationend", () => {
          npc.style.animation = "";
        });
      });
    });
  }
}
displayScene();

let moveToggle = false;

function displayMoveArrows() {
  const sfx = new Audio("./assets/sounds/clickSFX.mp3");
  sfx.play();
  if (moveToggle == false) {
    moveArrowContainer.style.display = "flex";
    moveArrowContainer.classList.add("blinking");
    moveIcon.classList.add("blinking");
    moveToggle = true;
  } else {
    moveArrowContainer.style.display = "none";
    moveArrowContainer.classList.remove("blinking");
    moveIcon.classList.remove("blinking");
    moveToggle = false;
  }
}

let inventoryToggle = false;

function displayInventory() {
  if (inventoryToggle == false) {
    const sfx = new Audio("./assets/sounds/clickSFX.mp3");
    sfx.play();
    inventory.style.display = "flex";
    moveArrowContainer.style.display = "none";
    moveArrowContainer.classList.remove("blinking");
    moveIcon.classList.remove("blinking");
    document.querySelector(".scene").style.display = "none";
    inventoryToggle = true;
  } else {
    const sfx = new Audio("./assets/sounds/inventorySFX.mp3");
    sfx.play();
    inventory.style.display = "none";
    document.querySelector(".scene").style.display = "flex";
    inventoryToggle = false;
  }
}

let dialogueToggle = false;

function displayDialogue() {
  if (dialogueToggle == false) {
    const sfx = new Audio("./assets/sounds/interactSFX.mp3");
    sfx.play();
    setTimeout(() => {
      document.querySelector(".scene").style.display = "none";
      document.querySelector(".dialogue").style.display = "flex";
      dialogueToggle = true;
    }, 500);
  } else {
    document.querySelector(".scene").style.display = "flex";
    document.querySelector(".dialogue").style.display = "none";
    dialogueToggle = false;
  }
}

moveIcon.addEventListener("click", () => displayMoveArrows());
inventoryIcon.addEventListener("click", () => displayInventory());
closeInventory.addEventListener("click", () => displayInventory());
npc[0].addEventListener("click", () => displayDialogue());
dialogueContainer.addEventListener("click", () => displayDialogue());
