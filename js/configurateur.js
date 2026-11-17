// ==============================================================================
// CONFIGURATEUR.JS : Calcul de configuration son, lumière et repère budgétaire
// ==============================================================================

(function initConfigurateur() {
  const racine = document.getElementById('configurateur-app');
  if (!racine) return;

  const elTitre = document.getElementById('cfg-titre');
  const elBudget = document.getElementById('cfg-budget');
  const elNote = document.getElementById('cfg-note');
  const elListe = document.getElementById('cfg-liste');
  const elConseil = document.getElementById('cfg-conseil');
  const elDevis = document.getElementById('cfg-devis-btn');
  const elCopier = document.getElementById('cfg-copier-btn');
  const elCopieStatut = document.getElementById('cfg-copie-statut');
  const blocLumiere = document.getElementById('cfg-bloc-lumiere');

  const libellesType = {
    mariage: 'Mariage',
    entreprise: 'Soirée d\'entreprise / Séminaire',
    rallye: 'Rallye / Gala',
    anniversaire: 'Anniversaire / Soirée privée'
  };

  const libellesJauge = {
    'moins-50': 'Moins de 50',
    '50-150': '50 à 150',
    '150-400': '150 à 300',
    'plus-400': 'Plus de 300'
  };

  const libellesJaugeTexte = {
    'moins-50': 'moins de 50 personnes',
    '50-150': '50 à 150 personnes',
    '150-400': '150 à 400 personnes',
    'plus-400': '400 à 5 000 personnes'
  };

  const libellesLieu = {
    interieur: 'Intérieur / Salle',
    exterieur: 'Extérieur / Tente / Chapiteau',
    multi: 'Multi-espaces (cocktail + salle)'
  };

  function lireRadio(nom, defaut) {
    const coche = racine.querySelector('input[name="' + nom + '"]:checked');
    return coche ? coche.value : defaut;
  }

  function lireOptions() {
    return Array.from(racine.querySelectorAll('input[name="cfg-opt"]:checked')).map(cb => cb.value);
  }

  function appliquerParametresUrl() {
    const params = new URLSearchParams(location.search);
    const type = (params.get('type') || '').toLowerCase();
    const mode = (params.get('mode') || '').toLowerCase();

    if (type && racine.querySelector('input[name="cfg-type"][value="' + type + '"]')) {
      racine.querySelector('input[name="cfg-type"][value="' + type + '"]').checked = true;
    }
    if (mode && racine.querySelector('input[name="cfg-mode"][value="' + mode + '"]')) {
      racine.querySelector('input[name="cfg-mode"][value="' + mode + '"]').checked = true;
    }
  }

  function calculer() {
    const mode = lireRadio('cfg-mode', 'prestation');
    const type = lireRadio('cfg-type', 'mariage');
    const jauge = lireRadio('cfg-jauge', '50-150');
    const lieu = lireRadio('cfg-lieu', 'interieur');
    const lumiere = lireRadio('cfg-lumiere', 'immersive');
    const opts = lireOptions();

    if (blocLumiere) {
      blocLumiere.hidden = (mode !== 'location');
    }

    const equipements = [];
    const optDevis = [];
    const optForm = [];
    let titre = '';
    let budget = '';
    let note = '';
    let conseil = '';

    const aBornePhoto = opts.includes('Photobooth');
    const aBarVinyles = opts.includes('Bar à vinyles');
    const supplementOptions = (aBornePhoto ? 400 : 0) + (aBarVinyles ? 300 : 0);

    if (aBornePhoto) optForm.push('Photobooth');
    if (aBarVinyles) optForm.push('Bar à vinyles');
    if (opts.includes('Effets scéniques')) {
      optDevis.push('Effets scéniques (étincelles froides / fumée lourde)');
    }
    if (opts.includes('Photographe')) {
      optDevis.push('Photographe événementiel');
      optForm.push('Photographe');
    }
    if (opts.includes('Traiteur')) {
      optDevis.push('Traiteur Beret et Papilles');
      optForm.push('Traiteur');
    }

    if (mode === 'location') {
      if (jauge === 'plus-400') {
        titre = 'Système L-Acoustics grande jauge (avec technicien)';
        budget = 'À partir de ' + (1400 + supplementOptions).toLocaleString('fr-FR') + ' € TTC (sur devis)';
        note = 'Au-delà de 400 invités, nous dimensionnons la diffusion L-Acoustics avec installation et présence technique pour garantir une couverture homogène sans risque de coupure.';
        equipements.push('Système L-Acoustics dimensionné de 400 à 5 000 personnes');
        equipements.push('Amplification LA4, consoles et micros sans fil Shure HF');
        equipements.push('Éclairage DMX piloté et matériel de secours');
        conseil = 'Conseil : pour un événement de plus de 400 personnes, passez sur une prestation encadrée afin d\'assurer le calage acoustique et la sécurité électrique.';
      } else {
        const estPetiteSono = (jauge === 'moins-50' && lieu === 'interieur');
        const prixSono = estPetiteSono ? 120 : 300;
        let prixLumiere = 0;

        if (estPetiteSono) {
          titre = 'Location Petite sono 200 W';
          equipements.push('Petite sono : 2 enceintes 200 W sur trépieds, connexion Bluetooth + 1 micro Shure (120 €)');
        } else {
          titre = 'Location Grosse sono L-Acoustics (12XT + SB118)';
          equipements.push('Grosse sono L-Acoustics : 2 enceintes 12XT (380 W RMS), 2 caissons SB118 (600 W RMS), ampli LA4, table Yamaha MG12, 2 micros HF Shure (300 €)');
        }

        if (lumiere === 'sobre') {
          prixLumiere = 60;
          titre += ' + Lumières sobres';
          equipements.push('Lumières sobres : 2 lyres Wash Electroconcept synchronisées avec le son (60 €)');
        } else if (lumiere === 'immersive') {
          prixLumiere = 150;
          titre += ' + Lumières immersives';
          equipements.push('Lumières immersives : 2 lyres Wash sur totems + 8 PAR LED sur batterie + console Wolfmix (150 €)');
        }

        const totalBase = prixSono + prixLumiere + supplementOptions;
        budget = (aBornePhoto || aBarVinyles || optDevis.length)
          ? 'À partir de ' + totalBase.toLocaleString('fr-FR') + ' € TTC'
          : totalBase.toLocaleString('fr-FR') + ' € TTC (hors livraison)';

        note = 'Tarif indicatif matériel en autonomie à Paris & Île-de-France. Livraison et installation sur devis sous 24 h.';

        if (jauge === 'moins-50' && lieu !== 'interieur') {
          conseil = 'Conseil acoustique : même sous 50 invités, l\'extérieur ou le multi-espaces disperse les basses. La Grosse sono L-Acoustics (300 €) garde un son propre sans pousser les enceintes.';
        } else if (lumiere === 'immersive') {
          conseil = 'Conseil lumière : les 8 PAR LED sur batterie évitent tout câble apparent le long des murs ou colonnes de votre salle.';
        } else {
          conseil = 'Conseil : pensez à vérifier si vous avez besoin d\'une livraison/installation en Île-de-France lors de votre demande.';
        }
      }
    } else {
      // Mode Prestation complète avec DJ
      optForm.push('DJ');
      if (type === 'entreprise' || lieu === 'multi') optForm.push('Sonorisation conférence');

      const tarifsBasePrestation = {
        mariage: 1400,
        entreprise: 800,
        rallye: 600,
        anniversaire: 600
      };
      const prixBaseType = tarifsBasePrestation[type] || 600;

      titre = 'Prestation DJ & Sonorisation L-Acoustics — ' + libellesType[type];
      const basePrix = prixBaseType + supplementOptions;
      budget = 'À partir de ' + basePrix.toLocaleString('fr-FR') + ' € TTC';
      note = 'Comprend la prestation complète (dès ' + prixBaseType.toLocaleString('fr-FR') + ' €)'
        + (aBornePhoto ? ' + borne photo (+400 €)' : '')
        + (aBarVinyles ? ' + bar à vinyles (+300 €)' : '')
        + (optDevis.length ? ' + options sur devis.' : '. Devis précis poste par poste sous 24 h.');

      equipements.push('DJ résident (Maxime Feltin ou Andéol) et rendez-vous de préparation en amont');
      if (jauge === 'plus-400' || jauge === '150-400') {
        equipements.push('Système L-Acoustics haute puissance (12XT 380 W RMS + caissons SB118 600 W RMS + ampli LA4)');
      } else {
        equipements.push('Système de diffusion L-Acoustics calibré pour ' + libellesJaugeTexte[jauge]);
      }
      equipements.push('Micros sans fil Shure HF pour vos discours et table de mixage Yamaha MG12');
      equipements.push('Mise en lumière architecturale & piste (lyres Wash, PAR LED sur batterie, console DMX Wolfmix)');
      equipements.push('Montage plusieurs heures avant vos invités + matériel de secours systématique');

      if (lieu === 'multi') {
        conseil = 'Conseil multi-espaces : nous prévoyons des points son dédiés (cérémonie/cocktail puis dîner/piste) afin d\'éviter tout déplacement de matériel devant vos invités.';
      } else if (lieu === 'exterieur') {
        conseil = 'Conseil plein air / tente : les caissons SB118 L-Acoustics assurent une assise dans le grave sans saturer ni gêner les tables éloignées.';
      } else {
        conseil = 'Conseil : chaque installation est habillée et les câbles dissimulés pour respecter le décor de votre lieu.';
      }
    }

    if (aBornePhoto) {
      equipements.push('Borne photo vintage (+400 €) : impressions illimitées, cadre personnalisé, galerie en ligne');
    }
    if (aBarVinyles) {
      equipements.push('Bar à vinyles (+300 €) : +500 disques (house, jazz, rock, variété) choisis par vos invités');
    }
    optDevis.forEach(item => {
      equipements.push('Option sur devis : ' + item);
    });

    elTitre.textContent = titre;
    elBudget.textContent = budget;
    elNote.textContent = note;
    elConseil.textContent = conseil;

    elListe.innerHTML = '';
    equipements.forEach(txt => {
      const li = document.createElement('li');
      li.textContent = txt;
      elListe.appendChild(li);
    });

    const resumeTexte = [
      'Simulation Spectre Events :',
      '- Formule : ' + (mode === 'location' ? 'Location autonome' : 'Prestation complète avec DJ'),
      '- Événement : ' + libellesType[type],
      '- Jauge : ' + libellesJaugeTexte[jauge],
      '- Configuration : ' + libellesLieu[lieu],
      '- Recommandation : ' + titre,
      '- Repère budgétaire : ' + budget,
      optDevis.length ? '- Options sur devis : ' + optDevis.join(', ') : ''
    ].filter(Boolean).join('\n');

    if (elDevis) {
      const q = new URLSearchParams();
      q.set('type', mode === 'location' ? 'location' : type);
      q.set('invites', libellesJauge[jauge]);
      if (optForm.length) q.set('opt', Array.from(new Set(optForm)).join(','));
      q.set('msg', resumeTexte);
      elDevis.href = '../contact/?' + q.toString();
    }

    racine.dataset.resume = resumeTexte;
  }

  racine.addEventListener('change', calculer);

  if (elCopier) {
    elCopier.addEventListener('click', async function () {
      const texte = racine.dataset.resume || '';
      if (!texte) return;
      try {
        await navigator.clipboard.writeText(texte);
        elCopieStatut.textContent = 'Récapitulatif copié dans le presse-papiers.';
      } catch (err) {
        elCopieStatut.textContent = 'Copie automatique indisponible, cliquez sur « Demander ce devis » pour tout transmettre.';
      }
    });
  }

  appliquerParametresUrl();
  calculer();
})();
