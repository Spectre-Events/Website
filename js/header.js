// ==============================================================================
// HEADER.JS : Gestion de l'en-tête (masquage au scroll et menu mobile)
// ==============================================================================

const entete = document.querySelector('header.top');
const menuBtn = document.querySelector('.menu-toggle');
const menuNav = document.querySelector('header.top nav');
let dernierY = window.scrollY;

// 1) Menu mobile : ouverture / fermeture au clic sur le bouton burger
if (menuBtn && menuNav) {
  menuBtn.addEventListener('click', function () {
    const estOuvert = menuNav.classList.toggle('ouvert');
    menuBtn.setAttribute('aria-expanded', estOuvert);
  });

  // Ferme automatiquement le menu mobile lorsqu'on clique sur un lien de navigation
  menuNav.querySelectorAll('a').forEach(function (lien) {
    lien.addEventListener('click', function () {
      menuNav.classList.remove('ouvert');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 2) Masquage intelligent du header au défilement (scroll)
window.addEventListener('scroll', function () {
  const y = window.scrollY;
  const menuEstOuvert = menuNav && menuNav.classList.contains('ouvert');

  // Ne pas masquer l'en-tête si le menu mobile est actuellement déployé
  if (!menuEstOuvert) {
    if (y > dernierY && y > entete.offsetHeight) {
      entete.classList.add('cache');      // On descend : on masque l'en-tête
    } else if (y < dernierY) {
      entete.classList.remove('cache');   // On remonte : on réaffiche l'en-tête
    }
  }

  dernierY = y;
}, { passive: true });