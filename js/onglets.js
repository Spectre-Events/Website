/* ONGLETS : affiche un panneau à la fois, au clic ou au clavier (flèches, Début, Fin).
   Sans JavaScript, les trois panneaux restent visibles les uns sous les autres.
   Une adresse comme /sonorisation/#mariages ouvre directement le bon onglet,
   y compris quand on clique sur un lien du menu depuis la même page. */
(function () {
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var boutons = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
    var panneaux = boutons.map(function (b) {
      return document.getElementById(b.getAttribute('aria-controls'));
    });

    tabs.classList.add('js');   // active l'affichage des onglets en CSS

    function afficher(i, focus) {
      boutons.forEach(function (b, j) {
        var actif = (i === j);
        b.setAttribute('aria-selected', actif);
        b.tabIndex = actif ? 0 : -1;
        panneaux[j].hidden = !actif;
      });
      if (focus) { boutons[i].focus(); }
    }

    boutons.forEach(function (b, i) {
      b.addEventListener('click', function () {
        afficher(i);
        history.replaceState(null, '', '#' + b.dataset.onglet);   // lien partageable
      });
      b.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') { n = (i + 1) % boutons.length; }
        else if (e.key === 'ArrowLeft') { n = (i - 1 + boutons.length) % boutons.length; }
        else if (e.key === 'Home') { n = 0; }
        else if (e.key === 'End') { n = boutons.length - 1; }
        if (n !== null) { e.preventDefault(); afficher(n, true); }
      });
    });

    // Ouvre l'onglet indiqué dans l'adresse et fait défiler jusqu'à la section
    function depuisAdresse() {
      var i = boutons.findIndex(function (b) { return '#' + b.dataset.onglet === location.hash; });
      if (i >= 0) {
        afficher(i);
        tabs.closest('section').scrollIntoView();
      }
      return i;
    }

    if (depuisAdresse() < 0) { afficher(0); }
    window.addEventListener('hashchange', depuisAdresse);   // clic sur le menu depuis la même page
  });
})();
