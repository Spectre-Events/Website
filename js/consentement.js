// ==============================================================================
// CONSENTEMENT.JS : bandeau cookies et chargement de Google Tag Manager
// ------------------------------------------------------------------------------
// - Tant que le visiteur n'a pas accepté, Google Tag Manager n'est PAS chargé
//   (aucun cookie Google n'est déposé), comme le demande la CNIL.
// - Le Mode Consentement Google est réglé sur « refusé » par défaut, puis passé
//   à « accordé » seulement après un clic sur « Accepter ».
// - Le choix est conservé 6 mois dans le navigateur, puis redemandé.
// - Un lien portant l'attribut data-cookies (pied de page) rouvre le bandeau.
// ==============================================================================
(function () {
  var GTM_ID = 'GTM-K2ZPHMLF';
  var ADS_ID = 'AW-18539109415';
  var ADS_CONVERSION = 'AW-18539109415/kR_nCPGd5L0dEKe4kYhF'; // « Envoi de formulaire de lead »
  var CLE = 'spectre_cookies';
  var DUREE = 182 * 24 * 60 * 60 * 1000; // 6 mois

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Par défaut : tout est refusé tant que le visiteur n'a rien choisi
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  gtag('js', new Date());

  function lireChoix() {
    try {
      var brut = JSON.parse(localStorage.getItem(CLE));
      if (brut && brut.choix && Date.now() - brut.date < DUREE) { return brut.choix; }
    } catch (e) { /* stockage indisponible : on redemandera */ }
    return null;
  }

  function enregistrer(choix) {
    try { localStorage.setItem(CLE, JSON.stringify({ choix: choix, date: Date.now() })); } catch (e) {}
  }

  var gtmCharge = false;
  function accepter() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    if (gtmCharge) { return; }
    gtmCharge = true;
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);

    // Balise Google Ads : nécessaire pour que gtag('event', 'conversion') soit transmis
    var ads = document.createElement('script');
    ads.async = true;
    ads.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    document.head.appendChild(ads);
    gtag('config', ADS_ID);
  }

  // Conversion Google Ads (code fourni par Google Ads). Sans accord aux cookies,
  // la balise n'est pas chargée : l'appel reste sans effet.
  window.gtag_report_conversion = function (url) {
    var callback = function () {
      if (typeof url !== 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
      send_to: ADS_CONVERSION,
      value: 1.0,
      currency: 'EUR',
      event_callback: callback
    });
    return false;
  };

  function refuser() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }

  // Bandeau : « Refuser » et « Accepter » ont le même poids, comme l'exige la CNIL
  function afficherBandeau() {
    if (document.getElementById('bandeau-cookies')) { return; }
    var b = document.createElement('div');
    b.id = 'bandeau-cookies';
    b.className = 'cookies';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Choix des cookies');
    b.innerHTML =
      '<p>Nous utilisons des cookies de mesure d\'audience et de publicité (Google) pour comprendre comment le site est utilisé ' +
      'et mesurer l\'efficacité de nos annonces. Vous pouvez les accepter ou les refuser, et changer d\'avis à tout moment. ' +
      '<a href="/mentions-legales/#cookies">En savoir plus</a></p>' +
      '<div class="cookies-btns">' +
      '<button type="button" class="btn-outline" data-choix="refuse">Refuser</button>' +
      '<button type="button" class="btn" data-choix="accepte">Accepter</button>' +
      '</div>';
    b.addEventListener('click', function (e) {
      var bouton = e.target.closest('[data-choix]');
      if (!bouton) { return; }
      var choix = bouton.getAttribute('data-choix');
      enregistrer(choix);
      if (choix === 'accepte') { accepter(); } else { refuser(); }
      b.remove();
    });
    document.body.appendChild(b);
  }

  // Choix déjà fait : on l'applique ; sinon on affiche le bandeau
  var choix = lireChoix();
  if (choix === 'accepte') { accepter(); }

  function demarrer() {
    if (!choix) { afficherBandeau(); }
    document.addEventListener('click', function (e) {
      // Lien « Gérer les cookies » du pied de page
      var lien = e.target.closest('[data-cookies]');
      if (lien) {
        e.preventDefault();
        afficherBandeau();
        return;
      }
      // Clic sur un numéro de téléphone, une adresse e-mail ou WhatsApp : conversion Google Ads
      var contact = e.target.closest('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me/"], a[href*="api.whatsapp.com"]');
      if (contact) { window.gtag_report_conversion(); }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrer);
  } else {
    demarrer();
  }
})();
