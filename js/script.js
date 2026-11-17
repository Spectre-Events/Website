// ==============================================================================
// SCRIPT.JS : Comportement et soumission du formulaire de devis
// ==============================================================================

// 1) Récupération des éléments du formulaire
const formulaire = document.getElementById('f');
const message = document.getElementById('ok');

// 2) Suivi de provenance sans cookie (sessionStorage uniquement, conforme zéro-traceur)
(function enregistrerProvenance() {
  try {
    if (!sessionStorage.getItem('spectre_landing')) {
      sessionStorage.setItem('spectre_landing', location.pathname + location.search);
    }
    if (!sessionStorage.getItem('spectre_referrer') && document.referrer) {
      sessionStorage.setItem('spectre_referrer', document.referrer);
    }
    const params = new URLSearchParams(location.search);
    const utm = ['utm_source', 'utm_medium', 'utm_campaign']
      .map(k => params.get(k) ? k.replace('utm_', '') + '=' + params.get(k) : '')
      .filter(Boolean)
      .join(', ');
    if (utm && !sessionStorage.getItem('spectre_utm')) {
      sessionStorage.setItem('spectre_utm', utm);
    }
  } catch (err) {
    // Stockage indisponible (navigation privée stricte) : ignoré silencieusement
  }
})();

// 3) Pré-remplissage du formulaire depuis les pages prestations ou le configurateur
(function preremplirFormulaire() {
  if (!formulaire) return;
  const params = new URLSearchParams(location.search);

  const correspondancesType = {
    'mariage': 'Mariage',
    'entreprise': 'Soirée d\'entreprise',
    'corporate': 'Soirée d\'entreprise',
    'seminaire': 'Soirée d\'entreprise',
    'cocktail': 'Cocktail / inauguration',
    'rallye': 'Rallye',
    'anniversaire': 'Anniversaire',
    'prive': 'Événement privé',
    'privee': 'Événement privé',
    'location': 'Autre',
    'autre': 'Autre'
  };

  const typeParam = (params.get('type') || '').toLowerCase();
  const typeChoisi = document.getElementById('type');
  if (typeChoisi && correspondancesType[typeParam]) {
    typeChoisi.value = correspondancesType[typeParam];
  }

  const invitesParam = params.get('invites');
  const selectInvites = formulaire.querySelector('select[name="invites"]');
  if (selectInvites && invitesParam) {
    const optionExiste = Array.from(selectInvites.options).some(o => o.value === invitesParam || o.text === invitesParam);
    if (optionExiste) selectInvites.value = invitesParam;
  }

  const lieuParam = params.get('lieu');
  const champLieu = formulaire.querySelector('input[name="lieu"]');
  if (champLieu && lieuParam) champLieu.value = lieuParam;

  const optParam = params.get('opt');
  if (optParam) {
    const optsDemandees = optParam.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    formulaire.querySelectorAll('input[name="opt"]').forEach(cb => {
      if (optsDemandees.includes(cb.value.toLowerCase())) {
        cb.checked = true;
      }
    });
  }

  const msgParam = params.get('msg');
  const champMsg = formulaire.querySelector('textarea[name="msg"]');
  if (champMsg && msgParam) champMsg.value = msgParam;
})();

// 4) Soumission asynchrone du formulaire avec Web3Forms
if (formulaire) {
  formulaire.addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement standard de la page

    const d = new FormData(formulaire);

    // Sécurité antispam (Honeypot) : si le champ invisible 'botcheck' est rempli,
    // c'est un automate/robot. On simule un succès sans consommer le quota API.
    if (d.get('botcheck')) {
      message.className = 'ok full succes';
      message.textContent = 'Merci ! Votre demande a bien été transmise.';
      formulaire.reset();
      return;
    }

    // Options cochées (Photobooth, Bar à vinyles...)
    const liste = d.getAll('opt');

    let pageOrigine = location.pathname;
    let provenance = 'Accès direct';
    try {
      pageOrigine = sessionStorage.getItem('spectre_landing') || location.pathname;
      const utm = sessionStorage.getItem('spectre_utm');
      const ref = sessionStorage.getItem('spectre_referrer');
      provenance = [utm, ref].filter(Boolean).join(' | ') || 'Accès direct';
    } catch (err) {
      // Ignoré si sessionStorage indisponible
    }

    // Préparation des données pour l'e-mail de notification
    const donnees = {
      access_key: '4581c5c5-a3e4-44a5-bcfe-c6339e5970b7',
      subject: 'Nouvelle demande de devis : ' + (d.get('type') || 'Événement'),
      from_name: 'Spectre Events — Formulaire Web',
      replyto: d.get('mail'), // Permet de répondre d'un clic au client
      'Nom': (d.get('nom') || '').trim(),
      'E-mail': (d.get('mail') || '').trim(),
      'Téléphone': (d.get('tel') || '').trim() || 'Non précisé',
      'Entreprise': (d.get('societe') || '').trim() || 'Particulier',
      'Type d\'événement': d.get('type'),
      'Nombre d\'invités': d.get('invites') || 'Non précisé',
      'Date': d.get('date') || 'Non précisée',
      'Lieu': (d.get('lieu') || '').trim() || 'Non précisé',
      'Options souhaitées': liste.join(', ') || 'Aucune option cochée',
      'Message': (d.get('msg') || '').trim() || 'Aucun message particulier',
      'Page d\'entrée': pageOrigine,
      'Source / UTM': provenance
    };

    const bouton = formulaire.querySelector('button[type="submit"]');
    bouton.disabled = true;
    message.className = 'ok full';
    message.textContent = 'Envoi de votre demande en cours…';

    // Sécurité réseau : timeout de 12 secondes avec AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const reponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(donnees),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const resultat = await reponse.json();

      if (resultat.success) {
        // Succès : affichage vert et réinitialisation
        message.className = 'ok full succes';
        message.textContent = 'Merci ! Votre demande a bien été envoyée, nous vous répondrons sous 24 h avec un devis personnalisé.';
        formulaire.reset();
      } else {
        throw new Error(resultat.message || 'Erreur lors de la transmission');
      }
    } catch (erreur) {
      // Erreur : affichage rouge et recours par e-mail direct
      message.className = 'ok full erreur';
      message.textContent = 'Une erreur est survenue lors de l\'envoi. Vous pouvez nous écrire directement à contact@spectre-events.fr ou nous joindre au 06 81 33 42 83.';
    } finally {
      bouton.disabled = false; // Réactivation du bouton
    }
  });
}
