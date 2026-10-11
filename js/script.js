// ==============================================================================
// SCRIPT.JS : Comportement et soumission du formulaire de contact
// ==============================================================================

// 1) Récupération des éléments du formulaire
const formulaire = document.getElementById('f');
const message = document.getElementById('ok');
const caseAutre = document.getElementById('opt-autre');
const texteAutre = document.getElementById('opt-autre-texte');

// 2) Gestion dynamique de l'option "Autre"
if (caseAutre && texteAutre) {
  caseAutre.addEventListener('change', function () {
    texteAutre.hidden = !caseAutre.checked;   // Affiche le champ texte si la case est cochée
    texteAutre.required = caseAutre.checked;  // Rend le champ obligatoire si affiché
    if (caseAutre.checked) {
      texteAutre.focus();                     // Place automatiquement le curseur dans le champ
    } else {
      texteAutre.value = '';                  // Réinitialise la valeur si décoché
    }
  });
}

// 3) Soumission asynchrone du formulaire avec Web3Forms
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

    // Gestion des options cochées (avec précision du champ "Autre")
    let liste = d.getAll('opt');
    if (caseAutre && caseAutre.checked && texteAutre.value.trim()) {
      liste = liste.map(o => o === 'Autre' ? 'Autre : ' + texteAutre.value.trim() : o);
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
      'Type d\'événement': d.get('type'),
      'Date': d.get('date') || 'Non précisée',
      'Lieu': (d.get('lieu') || '').trim() || 'Non précisé',
      'Nombre d\'invités': d.get('nb') || 'Non précisé',
      'Options souhaitées': liste.join(', ') || 'Aucune',
      'Message': (d.get('msg') || '').trim() || 'Aucun message particulier'
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
        if (texteAutre) texteAutre.hidden = true;
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
