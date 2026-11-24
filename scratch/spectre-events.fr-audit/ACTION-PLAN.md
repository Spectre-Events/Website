# Plan d'action SEO — spectre-events.fr

Chaque action indique :
- ce dont elle dépend et ce qu'elle débloque ;
- comment savoir si elle a échoué ;
- l'indicateur à suivre sans relancer d'audit.

Priorités :
- **Critique** : bloque l'indexation.
- **Élevé** : pèse sur le classement, à faire sous 1 semaine.
- **Moyen** : sous 1 mois.
- **Bas** : quand il reste du temps.

Aucun point n'est classé critique : rien ne bloque techniquement l'indexation. Le problème principal est l'absence de présence en dehors du site.

---

## Phase 1 — Fondations (semaine 1)

### 0. Réparer le menu mobile de /traiteur/ · Élevé · 5 min
- **Pourquoi** : sur mobile, le bouton menu de /traiteur/ lève une erreur JavaScript et le menu ne s'ouvre pas (vérifié en ligne).
- **Comment** : dans `traiteur/index.html`, supprimer le `<script>` en ligne (lignes 179-185) et ajouter `<script src="../js/header.js"></script>` et `<script src="../js/sous-menu.js"></script>` avant `lightbox.js`.
- **Échec si** : en mobile, le menu ne s'ouvre toujours pas, ou la console affiche encore une erreur.

### 1. Search Console et Bing Webmaster Tools · Élevé · 30 min
- **Pourquoi** : sans données, on ne peut mesurer aucune des actions suivantes. Bing ne renvoie aucune page du site aujourd'hui.
- **Comment** :
  1. Créer une propriété « Domaine » dans Search Console (enregistrement TXT dans la zone DNS OVH).
  2. Soumettre `sitemap.xml` et demander l'indexation des 7 pages.
  3. Dans Bing Webmaster Tools, importer le site depuis Search Console.
- **Débloque** : toutes les mesures du plan.
- **Échec si** : moins de 5 pages indexées après 14 jours. Dans ce cas, inspecter l'URL d'accueil dans Search Console.
- **Indicateur** : nombre de pages indexées (rapport « Pages »).

### 2. Identité juridique dans les mentions légales · Élevé · 20 min
- **Pourquoi** : obligation légale (LCEN art. 6-III), premier signal de confiance et condition pour que Google et les annuaires relient le site à l'entreprise.
- **Comment** :
  - Ajouter la dénomination, la forme juridique, le SIREN/SIRET, l'adresse du siège (une domiciliation suffit) et la situation TVA.
  - Si l'entité déposée porte un autre nom (le registre SIRENE contient « MAXIME FELTIN (MAXOW DJ EVENTS) », *à confirmer*), écrire « Spectre Events est une marque exploitée par … ».
  - Faire valider la liste exacte des mentions selon le statut juridique.
- **Débloque** : la vérification de la fiche Google (action 3) et les inscriptions aux annuaires (action 8).
- **Échec si** : Google refuse la vérification GBP pour incohérence d'identité.

### 3. Fiche Google Business Profile · Élevé · 1 h + vérification
- **Pourquoi** : sur « DJ mariage Paris », le pack local et les annuaires captent la majorité des clics. Aucune fiche n'a été trouvée.
- **Comment** :
  - Créer la fiche en « établissement de services » avec l'adresse masquée.
  - Catégorie principale « Disc-jockey » ; catégories secondaires : location de matériel de sonorisation, location de photobooth, organisateur d'événements.
  - Zones desservies : Paris, 92, 93, 94, 78, 91, 95, 77, puis Vendée.
  - Ajouter 10 photos réelles, la liste des services, le lien vers le site et le même téléphone.
- **Dépend de** : l'action 2.
- **Échec si** : la fiche n'est pas vérifiée après 3 semaines, ou elle est suspendue (souvent pour une incohérence de nom ou d'adresse).
- **Indicateur** : impressions et appels dans « Performances » de la fiche.

### 4. Titles, H1 et sitemap · Élevé · 45 min
- **Comment** :
  - Réécrire les 7 titles (service + Paris), avec les propositions de `findings/content-onpage.md`.
  - Ajouter un H1 sur /location/ et /contact/.
  - Raccourcir la meta description de /entreprises/.
  - Retirer /mentions-legales/ du sitemap.
- **Échec si** : aucune impression sur une requête contenant « paris » dans Search Console après 6 semaines.
- **Indicateur** : impressions sur les requêtes non liées à la marque (Search Console > Performances, filtre requête « ne contient pas : spectre »).

### 5. Liens internes · Moyen · 20 min
- **Comment** : remplacer `../traiteur`, `../location` et `../contact` par `/traiteur/`, `/location/` et `/contact/` sur les 9 fichiers HTML ; uniformiser tous les liens internes en absolu avec la barre finale.
- **Échec si** : `grep -rn 'href="\.\./[a-z]*"' --include=*.html .` renvoie encore des lignes.

### 6. Poids des images · Élevé · 1 h
- **Comment** :
  - Ré-encoder `mariage-2.webp` (1,5 Mo), `borne-1.webp`, `borne-2.webp` et les JPEG du traiteur en WebP qualité 75-80, largeur max 1600 px, avec une version 800 px servie via `srcset`.
  - Remplacer le logo de l'en-tête (`logo-inv.png`, 155 Ko) par une version 84×56 ou un SVG.
  - Supprimer les images inutilisées (`logo2-4.png`, `WhatsApp-Image-*.webp`, `privee-22.webp`).
- **Échec si** : l'accueil dépasse encore 800 Ko après défilement complet (onglet Réseau, cache désactivé).
- **Indicateur** : poids total de la page ; score PageSpeed mobile.

## Phase 2 — Présence et preuves (semaines 2-3)

### 7. Collecte d'avis Google · Élevé · routine
- **Pourquoi** : les avis sont un facteur majeur du pack local, et les 5 témoignages du site sont invérifiables.
- **Comment** :
  - Envoyer le lien direct d'avis de la fiche aux clients des 12 derniers mois.
  - Ajouter un QR code et le lien dans le message de remerciement envoyé après chaque prestation.
  - Répondre à chaque avis.
  - Sur le site, remplacer les citations au prénom par des extraits sourcés (lien vers l'avis Google).
  - Sur /entreprises/, remplacer l'avis d'Astrid (un anniversaire, d'après l'accueil) par un avis de client entreprise.
- **Dépend de** : l'action 3.
- **Échec si** : moins de 5 avis après 60 jours.
- **Indicateur** : nombre d'avis et note moyenne. Objectif : plus de 15 avis en 90 jours.

### 8. Annuaires et réseaux · Élevé · 2-3 h
- **Comment** :
  - S'inscrire ou revendiquer sa fiche sur Mariages.net, Zankyou, PagesJaunes, Bing Places (import depuis GBP), Apple Business Connect, une page Facebook et une page LinkedIn entreprise.
  - Reprendre exactement le même nom, téléphone, e-mail et lien de site partout.
- **Dépend de** : l'action 2 (même identité partout).
- **Échec si** : la recherche « Spectre Events DJ » sur Bing ne renvoie toujours aucun de ces profils après 30 jours.
- **Indicateur** : nombre de profils indexés ; visites venant de Mariages.net (dans les statistiques de l'annuaire).

### 9. Compte Instagram unique · Moyen · 15 min
- **Comment** : confirmer lequel de @spectre_event et @spectre_events appartient à l'entreprise ; aligner le texte du lien sur /contact/, le `sameAs` du schema et la signature e-mail.

### 10. Données structurées · Moyen · 1 h
- **Comment** :
  - Intégrer le bloc entreprise enrichi (`@id`, `sameAs`, `founder`, `areaServed` typés, logo ≥ 112 px).
  - Ajouter un `Service` par page de prestation, avec les `Offer` chiffrées sur /location/.
  - Ajouter un `BreadcrumbList` sur les pages internes.
  - Modèles : `findings/schema.md`.
- **Dépend de** : l'action 9 (le bon compte Instagram dans `sameAs`) et l'action 3 (ajouter le lien de la fiche GBP au `sameAs`).
- **Échec si** : le Rich Results Test signale des erreurs.

## Phase 3 — Contenu qui capte la demande (mois 2)

### 11. Page « DJ mariage » · Élevé · 1 jour
- **Pourquoi** : c'est la première source de demandes et la requête la plus concurrencée. Aujourd'hui, environ 70 mots dans un onglet masqué y répondent. Sur Google, la page de résultats est dominée par des annuaires qui affichent prix, note et photos.
- **Comment** :
  - Créer `/dj-mariage/` (au moins 600 mots), avec le title « DJ mariage à Paris et en Île-de-France | Spectre Events ». L'URL reste sans ville, puisque les avis viennent aussi de mariages à Angers et Valenciennes.
  - Contenu : prix « à partir de », déroulé d'une journée, matériel, lieux déjà sonorisés, 2 ou 3 mariages racontés avec photos, avis sourcés, FAQ propre au mariage. : déroulé d'une journée, matériel, lieux déjà sonorisés, 2 ou 3 mariages racontés avec photos, avis sourcés, fourchette de prix, FAQ propre au mariage.
  - La lier depuis le menu et depuis /sonorisation/.
- **Dépend de** : l'action 7 (avis à citer), plus des photos réelles.
- **Échec si** : la page n'entre pas dans le top 30 sur « DJ mariage Paris » après 3 mois.
- **Indicateur** : impressions de la page dans Search Console.

### 12. Enrichir /location/ pour « location sono Paris » · Élevé · 3 h
- **Comment** :
  - H1 avec la ville.
  - Une fiche par formule : photo, prix avec unité (par jour ou par week-end, TTC ou HT), caution, frais de livraison, installation en option.
  - Capacités, courte FAQ, et une option « Location » dans le formulaire de contact.
  - Garder les tarifs déjà affichés : c'est un atout.
- **Échec si** : moins de 100 impressions par mois après 3 mois, ou aucune demande de location reçue.

### 12 bis. Prix « à partir de » sur chaque page de service · Élevé · 1 h
- **Pourquoi** : tous les annuaires qui occupent les premières places affichent un prix d'appel. Sans prix, le visiteur qui compare repart vers eux.
- **Échec si** : aucune évolution du nombre ni de la qualité des demandes de devis après 8 semaines.

### 13. Réalisations et fondateurs · Moyen · 1 jour
- **Comment** :
  - Créer une page `/realisations/` avec 4 à 6 événements (lieu, type, nombre d'invités, dispositif, photos, mot du client).
  - Ajouter un bloc fondateurs (photos, parcours).
  - Illustrer « +120 événements » et « 5 000 invités ».
- **Débloque** : des liens depuis les lieux de réception et les partenaires (action 15).

### 14. Photographie et borne · Moyen · 3 h
- **Comment** :
  - Remplacer les photos d'installations son de l'onglet Photographe par de vraies photos du photographe (ou présenter le partenaire et son portfolio).
  - Créer une page `/borne-photo/` avec un prix « à partir de ». Sur « borne photo mariage prix », les résultats sont des guides de prix et des fiches chiffrées (voir `findings/sxo.md`).

### 15. Liens depuis les partenaires · Moyen · continu
- **Comment** : obtenir un lien de Beret et Papilles (site ou bio Instagram), des lieux de réception partenaires (pages « prestataires recommandés ») et des photographes partenaires.
- **Indicateur** : domaines référents dans Search Console > Liens.

### 16. Page Vendée · Bas · seulement s'il y a des preuves
- **Comment** : ne la créer qu'avec un contenu propre à la Vendée (événements réalisés là-bas, lieux, avis locaux), jamais en recopiant la page Paris avec une autre ville.

## Phase 4 — Suivi (continu)
- Chaque mois dans Search Console : pages indexées, requêtes non liées à la marque, CTR des pages de service.
- Chaque mois dans la fiche Google : nombre d'avis, appels, demandes d'itinéraire.
- Après la phase 1 : `/seo drift baseline https://spectre-events.fr` pour détecter les régressions à chaque déploiement.
- Dans 3 mois : relancer `/seo audit` pour comparer.
