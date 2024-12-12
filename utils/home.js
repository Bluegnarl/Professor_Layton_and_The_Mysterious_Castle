const parallaxContainer = document.querySelector(".parallax-container"),
  parallax = document.querySelector(".parallax");

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

  //   parallax.style.transform = `translate(${posX}px, ${posY}px)`;

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

document.getElementById("new-game").addEventListener("click", () => {
    localStorage.setItem("name", "Bluegnarl");
    sessionStorage.setItem("firstLaunch", true);

    location.href = "../index.html";
})
