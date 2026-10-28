/* ==========================================================================
   LIGHTBOX : clic sur une photo = affichage en grand, au format d'origine
   - Fonctionne sur toutes les images de <main> (sauf celles marquées data-no-zoom
     et celles qui sont dans un lien ou un bouton).
   - Flèches du clavier, glissement du doigt, Échap et clic à côté pour fermer.
   - Utilise l'élément natif <dialog> : le focus et la touche Échap sont gérés
     par le navigateur.
   - Optionnel : data-full="chemin/image-haute-definition.webp" sur une <img>
     pour afficher une version plus grande que celle de la page.
   ========================================================================== */
(function () {
  'use strict';

  // Navigateur trop ancien pour <dialog> : on ne change rien, la page reste normale.
  if (typeof HTMLDialogElement === 'undefined') return;

  var SELECTOR = 'main img:not([data-no-zoom])';
  var dialog, bigImg, caption, prevBtn, nextBtn;
  var group = [];
  var index = 0;

  function isEligible(img) {
    return !img.closest('a, button');
  }

  // Les photos qui défilent ensemble : celles du même bloc (galerie, onglet, section)
  function getGroup(img) {
    var scope = img.closest('.gallery, .photos, .tabpanel, section') || document.querySelector('main');
    return Array.prototype.filter.call(scope.querySelectorAll(SELECTOR), isEligible);
  }

  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Photo agrandie');
    dialog.innerHTML =
      '<form method="dialog"><button class="lb-btn lb-close" aria-label="Fermer" autofocus>' + ICON_CLOSE + '</button></form>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="Photo précédente">' + ICON_PREV + '</button>' +
      '<button type="button" class="lb-btn lb-next" aria-label="Photo suivante">' + ICON_NEXT + '</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(dialog);

    bigImg = dialog.querySelector('figure img');
    caption = dialog.querySelector('figcaption');
    prevBtn = dialog.querySelector('.lb-prev');
    nextBtn = dialog.querySelector('.lb-next');

    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });

    // Clic en dehors de la photo et des boutons : on ferme
    dialog.addEventListener('click', function (e) {
      if (!e.target.closest('img, button')) dialog.close();
    });

    // Flèches du clavier (Échap est géré par le navigateur)
    dialog.addEventListener('keydown', function (e) {
      if (group.length < 2) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });

    // Glissement du doigt : gauche / droite pour changer de photo
    var startX = null;
    dialog.addEventListener('touchstart', function (e) {
      startX = e.touches.length === 1 ? e.touches[0].clientX : null;
    }, { passive: true });
    dialog.addEventListener('touchend', function (e) {
      if (startX === null || group.length < 2) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    dialog.addEventListener('close', function () {
      bigImg.removeAttribute('src');
      group = [];
    });
  }

  function show(i) {
    index = (i + group.length) % group.length;
    var source = group[index];
    bigImg.src = source.dataset.full || source.currentSrc || source.src;
    bigImg.alt = source.alt || '';

    var count = group.length > 1 ? (index + 1) + ' / ' + group.length : '';
    var text = source.alt || '';
    caption.textContent = count && text ? count + ' · ' + text : count || text;
    caption.hidden = !caption.textContent;
  }

  function open(img) {
    if (!dialog) build();
    group = getGroup(img);
    index = Math.max(0, group.indexOf(img));
    prevBtn.hidden = nextBtn.hidden = group.length < 2;
    show(index);
    if (!dialog.open) dialog.showModal();
  }

  // Rend les photos cliquables et accessibles au clavier
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(SELECTOR), function (img) {
      if (!isEligible(img)) return;
      img.classList.add('zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Agrandir la photo' + (img.alt ? ' : ' + img.alt : ''));
    });
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest(SELECTOR);
    if (img && isEligible(img)) open(img);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var img = e.target.closest && e.target.closest('img.zoomable');
    if (!img) return;
    e.preventDefault();
    open(img);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
