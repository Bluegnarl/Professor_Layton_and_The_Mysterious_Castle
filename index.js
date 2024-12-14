

import responsiveLayout from "./utils/responsiveLayout.js";

const npc = document.querySelectorAll(".npc");
const inventoryIcon = document.querySelector(".inventory-icon");
const closeInventory = document.getElementById("close-inventory");
const moveIcon = document.querySelector(".move-icon");
const primaryScreen = document.querySelector(".primary-screen");
const dialogueContainer = document.querySelector(".dialogue");
const inventory = document.querySelector(".inventory");
const secondaryScreen = document.querySelector(".secondary-screen");
const moveArrowContainer = document.querySelector(".move-arrow-container");
const bookIcon = document.getElementById("book-icon");
const notebookIcon = document.getElementById("notebook-icon");
const book = document.getElementById("book");
const notebook = document.getElementById("notebook");

if (!sessionStorage.getItem("firstLaunch") || !localStorage.getItem("name")) {
    location.href = "./pages/home.html";
}

// Music

const music = new Audio("./assets/sounds/defaultMusic.mp3");
music.loop = true;
music.volume = 0.3;

if(sessionStorage.getItem("music") == "muted") {
    music.volume = 0;
}

// On Load Opacity 0 to 1

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});

// DisplayScene

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
    music.play();
    if (inventoryToggle == false) {
        const sfx = new Audio("./assets/sounds/clickSFX.mp3");
        sfx.play();
        inventory.style.display = "flex";
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
            const sfx2 = new Audio("./assets/sounds/voice2SFX.mp3");
            sfx2.play();
            document.querySelector(".scene").style.display = "none";
            document.querySelector(".dialogue").style.display = "flex";
            dialogueToggle = true;
        }, 400);
    } else {
        document.querySelector(".scene").style.display = "flex";
        document.querySelector(".dialogue").style.display = "none";
        dialogueToggle = false;
    }
}

let notebookAndBookToggle = false;

function displayNotebookOrBook(object) {
    if (notebookAndBookToggle == false) {
        const sfx = new Audio("./assets/sounds/paperSFX.mp3");
        sfx.play();
        document.querySelector(".notebook-and-book").style.display = "flex";
        if (object == "notebook") {
            notebook.style.display = "flex";
        } else if (object == "book") {
            book.style.display = "flex";
        }
        inventory.style.display = "none";
        notebookAndBookToggle = true;
    } else {
        const sfx = new Audio("./assets/sounds/backSFX.mp3");
        sfx.play();
        document.querySelector(".notebook-and-book").style.display = "none";
        inventory.style.display = "flex";
        notebook.style.display = "none";
        book.style.display = "none";
        notebookAndBookToggle = false;
    }
}

document.querySelectorAll(".back").forEach((back) => {
    back.addEventListener("click", () => displayNotebookOrBook());
});

moveIcon.addEventListener("click", () => displayMoveArrows());
inventoryIcon.addEventListener("click", () => displayInventory());
notebookIcon.addEventListener("click", () => displayNotebookOrBook("notebook"));
bookIcon.addEventListener("click", () => displayNotebookOrBook("book"));
closeInventory.addEventListener("click", () => displayInventory());
npc[0].addEventListener("click", () => displayDialogue());
dialogueContainer.addEventListener("click", () => displayDialogue());
document.getElementById("leave").addEventListener("click", () => {
    const sfx = new Audio("./assets/sounds/back2SFX.wav");
    sfx.play();
    document.body.style.opacity = "0";
    setTimeout(() => {
        location.href = "./pages/home.html";
    }, 1000);
});
