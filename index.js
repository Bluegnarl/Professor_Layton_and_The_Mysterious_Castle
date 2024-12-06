// Ajuster le scale du body pour que le jeu fasse 100% de la largeur
function adjustScale() {
  const screenWidth = window.innerWidth;

  const bodyStyle = getComputedStyle(document.body);
  const bodyPaddingLeft = parseFloat(bodyStyle.paddingLeft);
  const bodyPaddingRight = parseFloat(bodyStyle.paddingRight);

  const availableWidth = screenWidth - bodyPaddingLeft - bodyPaddingRight;

  const primaryScreenWidth =
    document.querySelector(".primary-screen").offsetWidth;

  if (primaryScreenWidth > availableWidth) {
    const scale = availableWidth / primaryScreenWidth;
    document.body.style.transform = `scale(${scale})`;
  } else {
    document.body.style.transform = "scale(1)";
  }
}

window.addEventListener("load", adjustScale);
window.addEventListener("resize", adjustScale);
