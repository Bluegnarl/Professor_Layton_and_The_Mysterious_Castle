export const music = new Audio("../assets/sounds/homeMusic.mp3");
music.loop = true;

// Imports

import { muteMusic, checkMuteMusic } from "./muteMusic.js";

// Définitions de variables

const parallaxContainer = document.querySelector(".parallax-container"),
    parallax = document.querySelector(".parallax"),
    modaleBackground = document.getElementById("modale-background"),
    modaleNewGame = document.getElementById("modale-new-game"),
    modaleInfos = document.getElementById("modale-infos");

// Intéractions avec muteIcon

const muteIcon = document.getElementById("mute");
muteIcon.addEventListener("click", muteMusic);
checkMuteMusic();

// Parallax Effect for Background

let width = window.innerWidth / 2;
let height = window.innerHeight / 2;

window.addEventListener("resize", () => {
    width = window.innerWidth / 2;
    height = window.innerHeight / 2;
});

document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    const posX = ((x - width) * -1) / 10;
    const posY = ((y - height) * -1) / 5;

    parallax.animate(
        { transform: `translate(${posX}px, ${posY}px)` },
        {
            duration: 7000,
            fill: "forwards",
        }
    );
});

// On Load Opacity 0 to 1

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.style.opacity = 1;
        parallaxContainer.style.opacity = 1;
    }, 100);
});

// Quand on clique sur New Game, on affiche la modale

document.getElementById("new-game").addEventListener("click", () => {
    const sfx = new Audio("../assets/sounds/clickSFX.mp3");
    sfx.play();
    modaleBackground.style.opacity = "1";
    modaleBackground.style.pointerEvents = "auto";
    modaleNewGame.style.display = "flex";
    setTimeout(() => {
        modaleNewGame.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
});

// Quand on clique sur Continuer, on affiche la modale

document.getElementById("continue").addEventListener("click", () => {
    const sfx = new Audio("../assets/sounds/clickSFX.mp3");
    sfx.play();
    if (localStorage.getItem("name")) {
        setTimeout(() => {
            sessionStorage.setItem("firstLaunch", false);
            location.href = "../index.html";
        }, 500);
    } else {
        modaleBackground.style.opacity = "1";
        modaleBackground.style.pointerEvents = "auto";
        modaleNewGame.style.display = "flex";
        setTimeout(() => {
            modaleNewGame.style.transform = "translate(-50%, -50%) scale(1)";
        }, 10);
    }
});

// Quand on clique sur Informations, on affiche la modale

document.getElementById("infos").addEventListener("click", () => {
    const sfx = new Audio("../assets/sounds/clickSFX.mp3");
    sfx.play();
    modaleBackground.style.opacity = "1";
    modaleBackground.style.pointerEvents = "auto";
    modaleInfos.querySelector("h4").innerHTML = localStorage.getItem("name")
        ? localStorage.getItem("name")
        : "???";
    modaleInfos.style.display = "flex";
    setTimeout(() => {
        modaleInfos.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
});

// Quand on clique sur le fond, on cache les modales

modaleBackground.addEventListener("click", () => {
    modaleBackground.style.opacity = "0";
    modaleBackground.style.pointerEvents = "none";
    modaleNewGame.style.transform = "translate(-50%, 200%) scale(0.5)";
    modaleInfos.style.transform = "translate(-50%, 200%) scale(0.5)";
    const sfx = new Audio("../assets/sounds/backSFX.mp3");
    sfx.play();
    setTimeout(() => {
        modaleNewGame.style.display = "none";
        modaleInfos.style.display = "none";
    }, 250);
});

// Envoie du formulaire et redirection vers le jeu

document.getElementById("submit").addEventListener("click", () => {
    const sfx = new Audio("../assets/sounds/clickSFX.mp3");
    sfx.play();
    let name = document.getElementById("name").value
        ? document.getElementById("name").value
        : "Luc";
    localStorage.setItem("name", name);
    sessionStorage.setItem("firstLaunch", false);
    setTimeout(() => {
        location.href = "../index.html";
    }, 500);
});

// Fonction de lancement du jeu

function startGame() {
    music.play();
    const sfx = new Audio("../assets/sounds/start2SFX.mp3");
    sfx.play();

    document.getElementById("start-game").classList = "";

    setTimeout(() => {
        document.getElementById("start-game").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("start-game").style.display = "none";
        }, 500);
    }, 10);

    document.querySelectorAll(".main-menu-buttons").forEach((button) => {
        button.style.opacity = 1;
        button.style.pointerEvents = "auto";
    });

    document.body.removeEventListener("click", startGame, false);
    document.body.style.cursor = "default";
}

document.body.addEventListener("click", startGame);
