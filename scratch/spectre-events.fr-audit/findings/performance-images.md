# Performance, images et rendu visuel — spectre-events.fr

**Score performance : 72/100 · Score images : 55/100**

Limites de la mesure : l'API PageSpeed Insights a renvoyé « quota exceeded » (quota gratuit partagé), et aucune donnée terrain CrUX n'existe pour un site aussi récent. Les mesures viennent du navigateur intégré, sur le site en ligne, en émulation mobile 375×812 puis en desktop. Ce sont des mesures de labo, pas des données de vrais visiteurs.

## Ce qui fonctionne
- HTML/CSS/JS très légers : CSS 38 Ko (9 Ko compressé), 5 petits scripts (~15 Ko), aucun script tiers au chargement.
- Polices auto-hébergées en WOFF2, `font-display: swap`, préchargement de la graisse 400.
- Le contenu principal du premier écran est du texte (H1 et accroche), donc le LCP ne dépend d'aucune image.
- CLS mesuré : 0,000 sur l'accueil mobile, avant et après défilement complet.
- `loading="lazy"` sur les images situées sous la ligne de flottaison, chargement vérifié au défilement réel.
- Mise en page mobile propre : pas de défilement horizontal, CTA « Demander un devis gratuit » visible dès le premier écran, menu burger accessible (aria-expanded/aria-controls).

## Constats

### Élevé — Des images 5 à 10 fois trop lourdes pour leur taille d'affichage
| Fichier | Poids | Dimensions | Affichée à (mobile) | Utilisée sur |
|---|---|---|---|---|
| sonorisation/mariage-2.webp | **1 544 Ko** | 1448×1086 | 335×223 | accueil, /sonorisation/, /photographie/ |
| photographie/borne-1.webp | 519 Ko | 1576×2100 | 335×223 | accueil, /photographie/ |
| photographie/borne-2.webp | 444 Ko | 1536×2048 | — | /entreprises/, /photographie/ |
| traiteur/entrée.jpeg | 323 Ko | 1200×1600 | — | /traiteur/ |
| traiteur/magret.jpeg | 266 Ko | 1200×1600 | — | /traiteur/ |
| logo-inv.png | **155 Ko** | 1536×1024 | **42×28** | toutes les pages (en-tête) |

- Poids total mesuré après défilement : environ 2,5 Mo pour l'accueil (dont 2,3 Mo d'images) et environ 2,1 Mo pour /sonorisation/. Les vignettes de l'accueil pèsent à elles seules 2,3 Mo pour des cartes de 335 px de large.
- `mariage-2.webp` est vraisemblablement encodé sans perte : 1,5 Mo pour 1448×1086 en WebP, c'est anormal.
- Le logo de l'en-tête (155 Ko) est chargé sur chaque page pour un affichage en 42×28. Le fichier `logo-nav.png` (60×40, 2 Ko) existe déjà dans le dépôt.
- Correctif :
  1. Ré-encoder en WebP avec perte, qualité 75-80, largeur max 1600 px (par ex. `cwebp -q 78 -resize 1600 0`). Objectif : moins de 200 Ko par photo.
  2. Générer une version 800 px et servir `srcset="... 800w, ... 1600w" sizes="(max-width: 700px) 100vw, 50vw"` sur les cartes et les galeries.
  3. Remplacer `logo-inv.png` dans l'en-tête par une version 84×56 (2× retina), ou par un SVG.
- Vérification : poids de l'accueil < 800 Ko après défilement complet (onglet Réseau, cache désactivé).

### Bas — Images sans attributs width/height
- 3 sur l'accueil, 3 sur /entreprises/, 6 sur /sonorisation/, 2 sur /photographie/, 3 sur /traiteur/. Le CSS (`aspect-ratio` + `object-fit`) évite le décalage de mise en page là où il s'applique (CLS mesuré à 0), mais ajouter les dimensions reste la protection la plus fiable.

### Bas — Images incohérentes avec leur rubrique
- L'onglet « Photographe » montre des installations sonores (`mariage-1/2/3.webp`). Voir `content-onpage.md`.

### Bas — Noms de fichiers génériques
- `corporate-1.webp`, `privee-3.webp`… Des noms descriptifs (`dj-mariage-chateau-tente.webp`) aident un peu dans Google Images. À faire au moment du ré-encodage, sans changer d'URL après coup.

### Info — Images inutilisées déployées
- Voir `technical.md` (≈ 3 Mo de fichiers non référencés).
