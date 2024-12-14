import { music } from "./home.js"; // Importer music depuis home.js

const muteIcon = document.getElementById("mute");

// Vérifie si le joueur a mute la music

export function checkMuteMusic() {
    let musicState = sessionStorage.getItem("music");
    if (musicState == "muted") {
        if (muteIcon) muteIcon.src = "../assets/img/muted.png";
        music.volume = 0;
    } else {
        if (muteIcon) muteIcon.src = "../assets/img/unmuted.png";
        music.volume = 0.3;
    }
}

export function muteMusic() {
    let musicState = sessionStorage.getItem("music");
    if (musicState == "muted") {
        sessionStorage.setItem("music", "unmuted");
    } else {
        sessionStorage.setItem("music", "muted");
    }

    checkMuteMusic(); // Met à jour l'état du son après chaque clic
}
