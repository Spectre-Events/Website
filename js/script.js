/* SCRIPT.JS : le COMPORTEMENT du site.
   Ici, il sert uniquement à gérer l'envoi du formulaire de contact. */

// 1) On récupère le formulaire de la page grâce à son id="f"
const formulaire = document.getElementById('f');
const message = document.getElementById('ok');

const caseAutre = document.getElementById('opt-autre');
const texteAutre = document.getElementById('opt-autre-texte');

caseAutre.addEventListener('change', function () {
  texteAutre.hidden = !caseAutre.checked;   // affiche si cochée, cache sinon
  texteAutre.required = caseAutre.checked;  // obligatoire si affiché
  if (caseAutre.checked) {
    texteAutre.focus();                     // place le curseur dans le champ
  } else {
    texteAutre.value = '';                  // vide le champ si on décoche
  }
});



formulaire.addEventListener('submit', async function (e) {
  e.preventDefault();                       // empêche le rechargement de la page

  const d = new FormData(formulaire);

  // Même logique qu'avant pour les options, avec le texte de "Autre"
  let liste = d.getAll('opt');
  if (caseAutre.checked && texteAutre.value.trim()) {
    liste = liste.map(o => o === 'Autre' ? 'Autre : ' + texteAutre.value.trim() : o);
  }

  // Les noms ci-dessous (à gauche) sont ceux qui apparaîtront dans votre e-mail
  const donnees = {
    access_key: '4581c5c5-a3e4-44a5-bcfe-c6339e5970b7',
    subject: 'Nouvelle demande de devis : ' + d.get('type'),
    from_name: 'Formulaire de contact',
    replyto: d.get('mail'),                 // pour répondre directement au client
    'Nom': d.get('nom'),
    'E-mail': d.get('mail'),
    'Téléphone': d.get('tel'),
    'Type d\'événement': d.get('type'),
    'Date': d.get('date') || 'Non précisée',
    'Lieu': d.get('lieu') || 'Non précisé',
    'Nombre d\'invités': d.get('nb'),
    'Options': liste.join(', ') || 'Aucune',
    'Message': d.get('msg') || '—',
    botcheck: d.get('botcheck') ? true : ''  // piège à robots (voir plus bas)
  };

  const bouton = formulaire.querySelector('button[type="submit"]');
  bouton.disabled = true;                   // évite les doubles clics
  message.textContent = 'Envoi en cours…';

  try {
    const reponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(donnees)
    });
    const resultat = await reponse.json();

    if (resultat.success) {
      message.textContent = 'Merci ! Votre demande a bien été envoyée, nous vous répondrons sous 24 h.';
      formulaire.reset();                   // vide le formulaire
      texteAutre.hidden = true;             // recache le champ "Autre"
    } else {
      throw new Error(resultat.message);
    }
  } catch (erreur) {
    message.textContent = 'Une erreur est survenue. Vous pouvez nous écrire directement à contact@spectre-events.fr.';
  } finally {
    bouton.disabled = false;                // réactive le bouton
  }
});
