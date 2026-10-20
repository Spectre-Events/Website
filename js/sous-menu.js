/* SOUS-MENU : ouvre et ferme le menu déroulant au clic sur la flèche et au clavier.
   (Sur ordinateur, il s'ouvre aussi au survol de la souris, géré en CSS.) */
(function () {
  var blocs = document.querySelectorAll('.has-sub');

  blocs.forEach(function (bloc) {
    var bouton = bloc.querySelector('.sub-toggle');

    function ouvrir(oui) {
      bloc.classList.toggle('ouvert', oui);
      bouton.setAttribute('aria-expanded', oui);
    }

    // Clic sur la flèche : ouvre ou ferme
    bouton.addEventListener('click', function () {
      ouvrir(!bloc.classList.contains('ouvert'));
    });

    // Touche Échap : ferme et remet le focus sur la flèche
    bloc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bloc.classList.contains('ouvert')) {
        ouvrir(false);
        bouton.focus();
      }
    });

    // Quand le focus clavier sort du bloc : ferme
    bloc.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !bloc.contains(e.relatedTarget)) { ouvrir(false); }
    });

    // Clic sur un choix du sous-menu : ferme
    bloc.querySelectorAll('.sub a').forEach(function (lien) {
      lien.addEventListener('click', function () { ouvrir(false); });
    });
  });

  // Clic ailleurs dans la page : ferme tous les sous-menus
  document.addEventListener('click', function (e) {
    blocs.forEach(function (bloc) {
      if (!bloc.contains(e.target)) {
        bloc.classList.remove('ouvert');
        bloc.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
