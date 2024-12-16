import { story } from "./datas/story.js";
import responsiveLayout from "./utils/responsiveLayout.js";

const npc = document.querySelectorAll(".npc"),
    inventoryIcon = document.querySelector(".inventory-icon"),
    closeInventory = document.getElementById("close-inventory"),
    moveIcon = document.querySelector(".move-icon"),
    primaryScreen = document.querySelector(".primary-screen"),
    dialogueContainer = document.querySelector(".dialogue"),
    inventory = document.querySelector(".inventory"),
    secondaryScreen = document.querySelector(".secondary-screen"),
    moveArrowContainer = document.querySelector(".move-arrow-container"),
    bookIcon = document.getElementById("book-icon"),
    notebookIcon = document.getElementById("notebook-icon"),
    book = document.getElementById("book"),
    notebook = document.getElementById("notebook"),
    scene = document.getElementById("scene"),
    achievement = document.getElementById("achievement"),
    goal = document.getElementById("goal"),
    place = document.getElementById("place"),
    clickToStart = document.getElementById("clickToStart"),
    puzzle = document.getElementById("puzzle"),
    endingContainer = document.getElementById("ending");

if (!sessionStorage.getItem("firstLaunch") || !localStorage.getItem("name")) {
    location.href = "./pages/home.html";
}

// Music

const music = new Audio("./assets/sounds/defaultMusic.mp3");
music.loop = true;
music.volume = 0.3;

if (sessionStorage.getItem("music") == "muted") {
    music.volume = 0;
}

// On Load Opacity 0 to 1

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});

// DisplayScene

let currentScene = localStorage.getItem("currentScene");
let dialogueToggle = false;
let currentDialogue = 0;
let activeNpc = null;
let activeInteraction = null;

function displayScene() {
    let videos = JSON.parse(localStorage.getItem("videos")) || [];
    let texts = JSON.parse(localStorage.getItem("texts")) || [];

    if (story[currentScene]["video"]) {
        if (
            !videos.some(
                (video) => video === story[currentScene]["video"]["name"]
            )
        ) {
            if (!clickToStart) {
                const clickToStart = document.createElement("p");
                clickToStart.classList = "blinking";
                clickToStart.id = "clickToStart";
                clickToStart.addEventListener("click", () => {
                    const sfx = new Audio("./assets/sounds/clickSFX.mp3");
                    sfx.play();
                    clickToStart.remove();
                    if (story[currentScene]["video"]) {
                        if (
                            !videos.some(
                                (video) =>
                                    video ===
                                    story[currentScene]["video"]["name"]
                            )
                        ) {
                            scene.querySelector("video").play();
                        } else {
                            music.play();
                        }
                    } else {
                        music.play();
                    }
                });
                scene.appendChild(clickToStart);
            }

            const video = document.createElement("video");

            video.src = story[currentScene]["video"]["src"];
            video.controls = false;
            video.loop = false;
            video.classList = "videos";

            video.addEventListener("click", () => {
                videos.push(story[currentScene]["video"]["name"]);
                localStorage.setItem("videos", JSON.stringify(videos));
                video.remove();
                music.play();
            });
            video.addEventListener("ended", () => {
                videos.push(story[currentScene]["video"]["name"]);
                localStorage.setItem("videos", JSON.stringify(videos));
                video.remove();
                music.play();
            });

            scene.appendChild(video);
        }
    }

    if (story[currentScene]["text"]) {
        if (
            !texts.some((text) => text === story[currentScene]["text"]["name"])
        ) {
            const text = document.getElementById("text");

            text.innerHTML = story[currentScene]["text"]["text"];
            text.style.display = "flex";

            text.addEventListener("click", () => {
                const sfx = new Audio("./assets/sounds/clickSFX.mp3");
                sfx.play();

                texts.push(story[currentScene]["text"]["name"]);
                localStorage.setItem("texts", JSON.stringify(videos));

                text.style.display = "none";

                displayAchievement(story[currentScene]["text"]["achievement"]);
            });
        }
    }

    clickToStart.addEventListener("click", () => {
        const sfx = new Audio("./assets/sounds/clickSFX.mp3");
        sfx.play();
        clickToStart.remove();
        if (story[currentScene]["video"]) {
            if (
                !videos.some(
                    (video) => video === story[currentScene]["video"]["name"]
                )
            ) {
                scene.querySelector("video").play();
            } else {
                music.play();
            }
        } else {
            music.play();
        }
    });

    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    moveArrowContainer.style.display = "none";
    moveArrowContainer.classList.remove("blinking");
    moveIcon.classList.remove("blinking");
    moveToggle = false;

    inventoryIcon.style.display = "flex";
    moveIcon.style.display = "flex";

    primaryScreen.style.backgroundImage = `url(${story[currentScene]["background"]})`;

    scene
        .querySelectorAll(".interaction")
        .forEach((interaction) => interaction.remove());
    scene.querySelectorAll(".npc").forEach((npc) => npc.remove());
    moveArrowContainer.innerHTML = "";

    story[currentScene]["npc"].forEach((npc) => {
        const npcImg = document.createElement("img");
        npcImg.classList = "npc";
        npcImg.src = npc["src"];
        npcImg.alt = npc["name"];
        npcImg.style.bottom = npc["bottom"];
        npcImg.style.left = npc["left"];
        npcImg.style.width = npc["width"];

        npcImg.addEventListener("click", () => {
            const sfx = new Audio("./assets/sounds/interactSFX.mp3");
            sfx.play();
            npcImg.style.animation = "glow 0.2s ease-out";
            npcImg.addEventListener("animationend", () => {
                npcImg.style.animation = "";
            });

            if (dialogueToggle) {
                updateDialogue(npc);
            } else {
                displayDialogue(npc);
            }
        });

        scene.appendChild(npcImg);
    });

    story[currentScene]["arrows"].forEach((arrow) => {
        const arrowImg = document.createElement("img");
        arrowImg.classList = "move-arrow";
        arrowImg.src = `./assets/img/arrow-${arrow["direction"]}.png`;
        arrowImg.alt = arrow["condition"]; // Stocker la condition dans l'attribut alt
        arrowImg.style.bottom = arrow["bottom"];
        arrowImg.style.left = arrow["left"];
        arrowImg.style.width = arrow["width"];
        arrowImg.style.pointerEvents = "auto";

        let achievements =
            JSON.parse(localStorage.getItem("achievements")) || [];

        if (
            achievements.some(
                (achievement) => achievement === arrow["condition"]
            ) ||
            !arrow["condition"]
        ) {
            arrowImg.style.display = "flex";
        } else {
            arrowImg.style.display = "none";
        }

        arrowImg.addEventListener("click", () => {
            const sfx = new Audio("./assets/sounds/moveSFX.mp3");
            sfx.play();

            currentScene = arrow["destination"];
            localStorage.setItem("currentScene", currentScene);

            primaryScreen.style.animation = "fadeToBlack 0.5s ease-in";
            primaryScreen.addEventListener("animationend", () => {
                primaryScreen.style.animation =
                    "fadeToBlackReverse 0.5s ease-in";

                primaryScreen.addEventListener("animationend", () => {
                    primaryScreen.style.animation = "";
                });

                displayScene();
            });
        });

        moveArrowContainer.appendChild(arrowImg);
    });

    story[currentScene]["interactions"].forEach((interaction) => {
        const interactionDiv = document.createElement("div");
        interactionDiv.classList = "interaction";
        interactionDiv.style.bottom = interaction["bottom"];
        interactionDiv.style.left = interaction["left"];
        interactionDiv.style.width = interaction["width"];
        interactionDiv.style.height = interaction["height"];

        interactionDiv.addEventListener("click", () => {
            const sfx = new Audio("./assets/sounds/interactSpecialSFX.mp3");
            sfx.play();

            activeInteraction = interactionDiv;

            if (interaction["event"]["dialogue"]) {
                if (dialogueToggle) {
                    updateDialogue(interaction["event"]);
                } else {
                    displayDialogue(interaction["event"]);
                }
            } else {
                setTimeout(() => {
                    displayAchievement(interaction["event"]["achievement"]);
                }, 500);
            }
        });

        if (interaction["event"]["achievement"]) {
            if (
                achievements.some(
                    (achievement) =>
                        achievement ===
                        interaction["event"]["achievement"]["name"]
                ) ||
                achievements.some(
                    (achievement) =>
                        achievement.name ===
                        interaction["event"]["achievement"]["name"]
                )
            ) {
                interactionDiv.remove();
            } else {
                scene.appendChild(interactionDiv);
            }
        } else {
            scene.appendChild(interactionDiv);
        }
    });

    let puzzles = JSON.parse(localStorage.getItem("puzzles")) || [];

    document.getElementById("puzzles-list").innerHTML = "";
    puzzles.forEach((puzzle) => {
        document.getElementById("puzzles-list").innerHTML += `
        <div>
            <div>
                <h4>${puzzle["number"]}</h4>
            </div>
            <p>
                ${puzzle["description"]}
            </p>
        </div>
    `;
    });

    place.innerHTML = story[currentScene]["place"];
    goal.innerHTML = localStorage.getItem("goal") || "???";
    document.getElementById("notes").innerHTML =
        localStorage.getItem("notes") || "???";

    // Si la music n'est pas déjà égale à celle qui tourne, on la remplace
    const normalizeSrc = (src) => new URL(src, window.location.href).href;
    if (
        normalizeSrc(music.src) !==
        normalizeSrc(
            localStorage.getItem("music") || "./assets/sounds/defaultMusic.mp3"
        )
    ) {
        music.src =
            localStorage.getItem("music") || "./assets/sounds/defaultMusic.mp3";
        music.load();
    }
}

function updateDialogue(content) {
    if (currentDialogue < content["dialogue"].length) {
        const sfx = new Audio(
            `./assets/sounds/${content["dialogue"][currentDialogue]["voice"]}.mp3`
        );
        sfx.play();

        const dialogue = content["dialogue"][currentDialogue];

        dialogueContainer.innerHTML = `
            <div style="align-items: ${
                dialogue["side"] == "left" ? "flex-start" : "flex-end"
            }">
                <img style="${
                    dialogue["side"] == "left" ? "transform: scaleX(-1)" : ""
                }" src="${dialogue["src"]}" alt="${dialogue["name"]}" />
                <div style="background: ${dialogue["color"]}">
                    <h3>${dialogue["name"]}</h3>
                </div>
                <p>${dialogue["text"]}</p>
            </div>
        `;

        currentDialogue++;
    } else {
        let achievements =
            JSON.parse(localStorage.getItem("achievements")) || [];
        let puzzles = JSON.parse(localStorage.getItem("puzzles")) || [];

        if (
            content["puzzle"] &&
            !puzzles.some(
                (puzzle) => puzzle["number"] === content["puzzle"]["number"]
            )
        ) {
            displayPuzzle(content);
        } else {
            if (
                content["achievement"] &&
                !achievements.some(
                    (achievement) =>
                        achievement === content["achievement"]["name"]
                )
            ) {
                displayAchievement(content["achievement"]);
            }
        }

        dialogueContainer.style.display = "none";
        dialogueToggle = false;
        if (!content["puzzle"]) {
            scene.style.display = "flex";
        }
        activeNpc = null;
    }
}

dialogueContainer.addEventListener("click", () => {
    if (activeNpc) {
        updateDialogue(activeNpc);
    }
});

function displayPuzzle(content) {
    music.src = "./assets/sounds/puzzleMusic.mp3";
    music.load();
    music.play();

    inventoryIcon.style.display = "none";
    moveIcon.style.display = "none";
    document
        .querySelectorAll(".npc")
        .forEach((npc) => (npc.style.display = "none"));
    secondaryScreen.classList.add("puzzle");
    scene.style.display = "none";
    puzzle.style.display = "flex";
    puzzle.style.background = `url(${content["puzzle"]["background"]}) no-repeat center/cover`;

    document.getElementById("puzzle-number").innerHTML =
        "NO. " + content["puzzle"]["number"];
    document.getElementById("puzzle-name").innerHTML =
        content["puzzle"]["name"];
    document.getElementById("puzzle-description").innerHTML =
        content["puzzle"]["description"];

    content["puzzle"]["elements"].forEach((element) => {
        const div = document.createElement("div");
        div.style.left = element["left"];
        div.style.bottom = element["bottom"];
        div.style.width = element["width"];
        div.style.height = element["height"];
        div.style.position = "absolute";

        div.addEventListener("click", () => {
            confirmResponse(element, content);
        });

        puzzle.appendChild(div);
    });
}

function confirmResponse(element, content) {
    const sfx = new Audio("./assets/sounds/submitSFX.mp3");
    sfx.play();
    puzzle.style.pointerEvents = "none";

    if (element["response"] == true) {
        let puzzles = JSON.parse(localStorage.getItem("puzzles")) || [];
        puzzles.push({
            number: content["puzzle"]["number"],
            description: content["puzzle"]["smallDescription"],
        });
        localStorage.setItem("puzzles", JSON.stringify(puzzles));

        const video = document.createElement("video");

        video.src = "./assets/videos/win.mp4";
        video.controls = false;
        video.loop = false;
        video.autoplay = true;
        video.classList = "videos";

        video.addEventListener("ended", () => {
            video.remove();
            music.play();
            displayAchievement(content["achievement"]);
            hidePuzzle();
        });

        puzzle.appendChild(video);
    } else {
        const video = document.createElement("video");

        video.src = "./assets/videos/loose.mp4";
        video.controls = false;
        video.loop = false;
        video.autoplay = true;
        video.classList = "videos";

        video.addEventListener("ended", () => {
            video.remove();
            music.play();
            if (content["ending"]) {
                displayEndingText(content["ending"]);
            }
            puzzle.style.pointerEvents = "auto";
        });

        puzzle.appendChild(video);
    }
}

function displayEndingText(ending) {
    hidePuzzle();
    const sfx = new Audio("./assets/sounds/endingSFX.wav");
    sfx.play();
    music.volume = 0;
    endingContainer.style.display = "flex";
    endingContainer.getElementsByTagName("p")[0].innerHTML = ending.title;
    endingContainer.getElementsByTagName("p")[1].innerHTML = ending.text;
    inventoryIcon.style.display = "none";
    moveIcon.style.display = "none";
    document
        .querySelectorAll(".npc")
        .forEach((npc) => (npc.style.display = "none"));
    secondaryScreen.classList.remove("puzzle");
    document
        .querySelectorAll(".interaction")
        .forEach((interaction) => (interaction.style.display = "none"));
    scene.style.display = "flex";
    puzzle.style.display = "none";
}
endingContainer.addEventListener("click", () => {
    const sfx = new Audio("./assets/sounds/clickSFX.mp3");
    sfx.play();
    sfx.addEventListener("ended", () => {
        localStorage.clear();
        location.reload();
    });
});

function hidePuzzle() {
    puzzle.style.pointerEvents = "auto";
    puzzle.style.display = "none";

    music.src = localStorage.getItem("music");
    music.load();
    setTimeout(() => {
        music.play();
    }, 1000);

    inventoryIcon.style.display = "flex";
    moveIcon.style.display = "flex";
    document
        .querySelectorAll(".npc")
        .forEach((npc) => (npc.style.display = "flex"));
    secondaryScreen.classList.remove("puzzle");
    scene.style.display = "flex";
    puzzle.style.display = "none";

    displayScene();
}

function displayDialogue(npc) {
    if (!dialogueToggle) {
        currentDialogue = 0;
        activeNpc = npc;
        setTimeout(() => {
            scene.style.display = "none";
            dialogueContainer.style.display = "flex";
            dialogueToggle = true;

            updateDialogue(npc);
        }, 400);
    } else {
        scene.style.display = "flex";
        dialogueContainer.style.display = "none";
        dialogueToggle = false;
        activeNpc = null;
    }
}

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
        scene.style.display = "none";
        inventoryToggle = true;
    } else {
        const sfx = new Audio("./assets/sounds/inventorySFX.mp3");
        sfx.play();
        inventory.style.display = "none";
        scene.style.display = "flex";
        inventoryToggle = false;
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

function displayAchievement(content) {
    const sfx = new Audio("./assets/sounds/achievementSFX.wav");
    sfx.play();

    achievement.style.display = "flex";
    achievement.getElementsByTagName("img")[0].src = content["img"];
    achievement.getElementsByTagName("p")[0].innerHTML = content["text"];

    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    achievements.push(content["name"]);
    localStorage.setItem("achievements", JSON.stringify(achievements));

    if (activeInteraction) {
        activeInteraction.style.display = "none";
        activeInteraction.remove();
        activeInteraction = null;
    }

    achievement.style.animation = "blurIn 0.7s ease-in-out";
    achievement.addEventListener(
        "animationend",
        () => (achievement.style.animation = "")
    );

    if (content["goal"]) {
        localStorage.setItem("goal", content["goal"]);
    }
    goal.innerHTML = localStorage.getItem("goal") || "???";
    if (content["notes"]) {
        localStorage.setItem("notes", content["notes"]);

        document.getElementById("notes").innerHTML =
            localStorage.getItem("notes");
    }

    if (content["music"]) {
        localStorage.setItem("music", content["music"]);

        music.src = content["music"];
        music.load();
        music.play();
    }

    updateArrowVisibility();
}

achievement.addEventListener("click", () => {
    const sfx = new Audio("./assets/sounds/clickSFX.mp3");
    sfx.play();

    achievement.style.display = "none";
});

function updateArrowVisibility() {
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    const arrows = moveArrowContainer.querySelectorAll(".move-arrow");

    arrows.forEach((arrow) => {
        const condition = arrow.alt;
        if (achievements.includes(condition) || !condition) {
            arrow.style.display = "flex";
        }
    });
}

document.querySelectorAll(".back").forEach((back) => {
    back.addEventListener("click", () => displayNotebookOrBook());
});

moveIcon.addEventListener("click", () => displayMoveArrows());
inventoryIcon.addEventListener("click", () => displayInventory());
notebookIcon.addEventListener("click", () => displayNotebookOrBook("notebook"));
bookIcon.addEventListener("click", () => displayNotebookOrBook("book"));
closeInventory.addEventListener("click", () => displayInventory());
document.getElementById("leave").addEventListener("click", () => {
    const sfx = new Audio("./assets/sounds/back2SFX.wav");
    sfx.play();
    document.body.style.opacity = "0";
    setTimeout(() => {
        location.href = "./pages/home.html";
    }, 1000);
});
displayScene();
