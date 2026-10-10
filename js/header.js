// Header qui disparaît en descendant et réapparaît dès qu'on remonte
const entete = document.querySelector('header.top');
let dernierY = window.scrollY;

window.addEventListener('scroll', function () {
  const y = window.scrollY;

  if (y > dernierY && y > entete.offsetHeight) {
    entete.classList.add('cache');      // on descend : on cache
  } else if (y < dernierY) {
    entete.classList.remove('cache');   // on remonte : on affiche
  }

  dernierY = y;
}, { passive: true });