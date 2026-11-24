# SEO technique — spectre-events.fr

Audit du 11/11/2026. Sources : en-têtes HTTP en direct (curl), code source local (identique à la production), navigateur intégré.

**Score : 82/100**

## Ce qui fonctionne
- HTTP → HTTPS et www → sans www en une seule 301 vers `https://spectre-events.fr/` (vérifié pour les 3 variantes).
- En-têtes de sécurité : HSTS (6 mois), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- Compression gzip active (HTML 21,8 Ko → 6,9 Ko), cache navigateur correct (HTML 1 h, CSS/JS 1 mois, images 6 mois, polices 1 an).
- `robots.txt` ouvert à tous, avec la ligne `Sitemap:`. Sitemap XML valide, 8 URL, toutes en 200.
- Balise canonical auto-référente sur les 7 pages indexables, `lang="fr"`, viewport mobile.
- Site 100 % HTML statique : aucun contenu ne dépend du JavaScript, donc Google et les robots IA lisent tout dès le premier passage.
- Temps de réponse serveur très court (TTFB ≈ 25 à 300 ms selon les mesures).

## Constats

### Élevé — Le menu mobile de /traiteur/ ne s'ouvre pas
- Preuve : vérifié sur le site en ligne, en mobile 375 px. Un clic sur le bouton menu lève `Uncaught TypeError: Cannot read properties of null (reading 'classList')` (traiteur/:182) et le menu reste fermé. Le script en ligne de `traiteur/index.html` (lignes 179-185) appelle `document.getElementById('menu')`, alors que la `<nav>` a pour id `nav-principale`. La même erreur se déclenche au défilement, dans le gestionnaire qui masque l'en-tête.
- Impact : sur mobile, un visiteur arrivé sur /traiteur/ ne peut aller nulle part, sauf par les boutons « Demander un devis ». Google n'est pas gêné, car les liens existent dans le HTML.
- Correctif : supprimer le script en ligne et charger les mêmes fichiers que les autres pages (`../js/header.js` et `../js/sous-menu.js`). Profiter de l'occasion pour ajouter `?v=…` au lien `../css/style.css` de cette page, comme sur l'accueil.

### Moyen — Les liens du menu passent par une redirection 301 (avec un port `:443` explicite)
- Preuve : `href="../traiteur"` et `href="../location"` dans le menu des 9 pages, `href="../contact"` sur /photographie/ (×3), /sonorisation/ (×4), /traiteur/ (×1). Côté serveur : `/traiteur` → `301 https://spectre-events.fr:443/traiteur/` (idem pour /location, /contact, /photographie).
- Impact : chaque clic dans le menu ajoute un aller-retour réseau, et Googlebot suit des liens internes qui redirigent au lieu d'aller droit à l'URL canonique.
- Correctif : écrire tous les liens internes en absolu avec la barre finale (`/traiteur/`, `/location/`, `/contact/`). Uniformiser au passage le mélange `../x/` / `/x/` / `x/`.
- Vérification : `grep -rn 'href="\.\./[a-z]*"' --include=*.html .` ne doit plus rien renvoyer.

### Bas — Une page en `noindex` figure dans le sitemap
- Preuve : /mentions-legales/ a `<meta name="robots" content="noindex, follow">` et figure dans `sitemap.xml`.
- Correctif : retirer cette URL du sitemap (le sitemap ne doit lister que des pages indexables).

### Bas — Pas de page 404 personnalisée
- Preuve : `/page-inexistante-xyz` renvoie la page Apache par défaut, en anglais, encodée en iso-8859-1.
- Correctif : créer `404.html` (aux couleurs du site, avec des liens vers les prestations et le devis) et ajouter `ErrorDocument 404 /404.html` dans `.htaccess`.

### Bas — `signature-mail.html` est publique et indexable
- Preuve : `https://spectre-events.fr/signature-mail.html` → 200, sans `noindex`.
- Correctif : l'exclure du déploiement (`exclude:` dans `deploy.yml`) ou ajouter `<meta name="robots" content="noindex">`.

### Bas — Fichiers inutilisés déployés (~3 Mo)
- `images/logo2.png`, `logo3.png`, `logo4.png`, les 6 `images/sonorisation/WhatsApp-Image-*.webp` et `privee-22.webp` ne sont référencés nulle part.
- Correctif : les supprimer du dépôt ou les déplacer dans un dossier exclu du déploiement.

### Info — `/index.html` répond en 200
- Doublon de `/`, neutralisé par la canonical. Optionnel : rediriger `/index.html` vers `/` en 301 dans `.htaccess`.

### Info — Search Console et Bing Webmaster Tools
- Aucune balise de vérification dans le HTML (la vérification par DNS reste possible). À confirmer : propriété Search Console (domaine) créée, sitemap soumis, et Bing Webmaster Tools (il alimente aussi Copilot et ChatGPT Search).
