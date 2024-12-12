export default function responsiveLayout() {
  // Ajuster le scale du body pour que le jeu fasse 100% de la largeur sur mobile
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Récupérer le padding du body
  const bodyStyle = getComputedStyle(document.body);
  const bodyPaddingLeft = parseFloat(bodyStyle.paddingLeft);
  const bodyPaddingRight = parseFloat(bodyStyle.paddingRight);

  // Calculer l'espace restant sans le padding
  let availableWidth = screenWidth - (bodyPaddingLeft + bodyPaddingRight) * 1.2;

  // Si on est dans le layout Desktop, l'espace libre est réduit pour que le scale se lance plus tôt
  if (screenWidth > 1500) {
    availableWidth = screenWidth - (bodyPaddingLeft + bodyPaddingRight) * 6;
  }
  if (screenHeight < 500) {
    availableWidth = screenWidth - (bodyPaddingLeft + bodyPaddingRight) * 4;
  }

  const primaryScreenWidth =
    document.querySelector(".primary-screen").offsetWidth;

  if (primaryScreenWidth > availableWidth) {
    const scale = availableWidth / primaryScreenWidth;
    document.body.style.transform = `scale(${scale})`;
  } else {
    document.body.style.transform = "scale(1)";
  }
}

window.addEventListener("load", responsiveLayout);
window.addEventListener("DOMContentLoaded", responsiveLayout);
window.addEventListener("resize", responsiveLayout);
window.addEventListener("orientationchange", responsiveLayout);