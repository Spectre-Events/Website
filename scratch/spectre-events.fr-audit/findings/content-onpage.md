# Contenu (E-E-A-T) et SEO on-page — spectre-events.fr

**Score contenu : 58/100 · Score on-page : 60/100**

## Inventaire des pages

| Page | Title (car.) | H1 | Mots (main) | Remarque |
|---|---|---|---|---|
| / | Spectre Events — Sonorisation, DJ & organisation d'événements (61) | « L'élégance se remarque. La technique, jamais. » | 1 394 | Riche, bien écrit |
| /entreprises/ | Événements d'entreprise clé en main — Spectre Events (52) | « Votre événement d'entreprise, clé en main. » | 919 | Meta description 184 car. (tronquée) |
| /sonorisation/ | Sonorisation, lumière & DJ — Spectre Events (43) | « Nos prestations son et lumières » | 508 | Mariages et soirées privées cachés dans des onglets |
| /photographie/ | Borne photo & photographe — Spectre Events (42) | « Nos prestations visuelles » | 248 | Mince ; l'onglet Photographe montre des photos d'installations son |
| /traiteur/ | Traiteur Beret et Papilles — Spectre Events (43) | « À table, entre bons vivants. » | 306 | Contenu centré sur le partenaire |
| /location/ | Location de sonorisation & lumière — Spectre Events (51) | **aucun** (H2 seul) | **135** | Contenu mince, mais tarifs affichés |
| /contact/ | Demande de devis — Spectre Events (33) | **aucun** (H2 seul) | 155 | Formulaire Web3Forms |
| /mentions-legales/ | (64) | oui | 356 | noindex |

## Ce qui fonctionne
- Une vraie voix, et des preuves concrètes que les concurrents donnent rarement : marques et références du matériel (L-Acoustics 12XT, SB118, LA4, Shure, Yamaha MG12), chiffres (+120 événements, jusqu'à 5 000 invités, 40 à 5 000 personnes), devis sous 24 h, process de préparation détaillé.
- L'histoire des fondateurs (« née derrière les platines ») est un bon signal d'expérience.
- /location/ affiche des tarifs indicatifs (120 €, 300 €, 60 €, 150 €) : rare dans le secteur, utile aux visiteurs comme aux moteurs IA.
- Toutes les images ont un attribut alt descriptif.

## Constats

### Élevé — Aucune page ne cible « Paris » dans le title, ni les requêtes principales
- Aucun des 7 titles ne contient « Paris » ni « Île-de-France », alors que l'activité vise d'abord Paris/IDF. Les requêtes à fort volume (« DJ mariage Paris », « sonorisation événementielle Paris », « location sono Paris », « borne photo mariage ») n'apparaissent dans aucun title ni aucun H1. Le nom de marque passe en premier alors qu'il n'est encore recherché par personne.
- Correctif (exemples) :
  - `/` → « DJ & sonorisation événementielle à Paris | Spectre Events »
  - `/sonorisation/` → « Sonorisation & DJ pour mariages et soirées à Paris | Spectre Events »
  - `/location/` → « Location sono & lumière à Paris et en IDF, dès 120 € | Spectre Events »
  - `/photographie/` → « Borne photo vintage & photographe à Paris | Spectre Events »
  - `/entreprises/` → « Organisation de soirée d'entreprise clé en main à Paris | Spectre Events »
- Vérification : dans Search Console, les impressions sur les requêtes contenant « paris » doivent apparaître dans les 4 à 8 semaines qui suivent.

### Élevé — Les mentions légales ne précisent pas l'identité juridique de l'entreprise
- La rubrique « Éditeur du site » ne donne ni forme juridique, ni SIREN/SIRET, ni RCS/RNE, ni adresse du siège. La LCEN (art. 6-III) les exige d'un site professionnel. C'est aussi le premier signal de confiance (le « T » de E-E-A-T) qu'une entreprise cliente vérifie, et ce qui permet à Google de relier le site à la fiche entreprise officielle.
- Correctif : ajouter la dénomination, la forme juridique, le SIRET, l'adresse du siège (une domiciliation suffit) et, le cas échéant, le numéro de TVA. Je ne suis pas juriste : fais valider la liste exacte selon ton statut.

### Élevé — Le mariage, première source de demandes, n'a pas de page dédiée
- Le contenu mariage tient en environ 60 mots, dans un onglet masqué par défaut de /sonorisation/ (#mariages). Même chose pour les soirées privées. Les onglets sont indexés, mais une page dont le H1 est « Nos prestations son et lumières » ne peut pas se positionner sur « DJ mariage Paris ».
- Correctif : créer une page `/dj-mariage/` (ou `/sonorisation/mariage/`) d'au moins 600 mots : déroulé d'une journée (cérémonie, cocktail, dîner, soirée), matériel, lieux déjà sonorisés, avis de mariés, fourchette de prix, FAQ propre au mariage. Lier depuis le menu « Sonorisation > Mariages ».
- Voir `sxo.md` pour la carte complète requêtes → pages.

### Moyen — Pages minces : /location/ (135 mots, sans H1) et /photographie/ (248 mots)
- /location/ : ajouter un H1 (« Location de sonorisation et d'éclairage à Paris »), les conditions (caution, retrait/livraison, installation en option, durée), les capacités, et une ou deux photos du matériel réel.
- /photographie/ : l'onglet « Photographe » illustre l'offre avec `mariage-1/2/3.webp`, qui sont des photos d'installations sonores (alt « Sonorisation d'une cérémonie de mariage »). Il faut des photos prises par le photographe, ou le nom et le portfolio du partenaire, sans quoi l'offre ne se démontre pas.
- /contact/ : passer le H2 « Demande de devis » en H1.

### Moyen — Des avis impossibles à vérifier
- 4 témoignages au prénom seul (« Emma, soirée corporate »…), sans lien vers une source. Ni les visiteurs ni Google ne peuvent les vérifier.
- Correctif : renvoyer vers les avis Google, Mariages.net ou équivalent dès qu'ils existent (voir `local.md`) et afficher la note et le nombre d'avis avec leur source. Ne pas ajouter de balisage Review/AggregateRating « auto-attribué » : Google ne l'affiche plus pour une entreprise qui parle d'elle-même.

### Moyen — Les fondateurs ne sont pas identifiés
- « Maxime et Andéol » sans nom de famille, sans photo ni parcours. Pour un service où l'on choisit une personne (le DJ), c'est le signal d'expérience le plus fort.
- Correctif : un bloc « Qui sommes-nous » avec photos, rôles et parcours (années de DJ, types d'événements), sur l'accueil ou sur une page `/a-propos/`.

### Moyen — Pas de références concrètes
- Aucun lieu nommé (château, domaine, salle), aucun client entreprise, aucune étude de cas. « 5 000 invités sur notre plus grand événement » n'est pas sourcé.
- Correctif : 3 à 6 réalisations courtes (lieu, type d'événement, nombre d'invités, dispositif, photo, mot du client). C'est aussi le meilleur contenu pour les recherches « DJ [nom du lieu] ».

### Bas — H1 de type slogan
- Les H1 de l'accueil, de /photographie/ et de /traiteur/ sont des accroches sans mot-clé. Garder le slogan comme accroche visuelle, mais faire porter le H1 (ou un surtitre balisé H1) par l'intitulé du service et la zone.

### Bas — Meta description trop longue sur /entreprises/
- 184 caractères, tronquée vers 155-160. La raccourcir.

### Bas — Incohérence du compte Instagram
- /contact/ affiche « @spectre_events » mais pointe vers `instagram.com/spectre_event/`. Harmoniser (et réutiliser le même compte dans le `sameAs` du schema).

### Bas — Même image de partage (og:image) sur toutes les pages
- Utiliser une image propre à chaque service pour les partages WhatsApp/LinkedIn.
