# Audit SEO complet — spectre-events.fr

**Date :** 11 novembre 2026 · **Périmètre :** 8 URL du sitemap + fichiers publics · **Type d'activité :** prestataire événementiel local qui se déplace chez ses clients, sans adresse publique (DJ/sonorisation, borne photo, traiteur partenaire, location, organisation clé en main). Zone : Paris/IDF d'abord, puis Vendée et Pays de la Loire.

## Méthode et limites
- Code source local, identique à la production (vérifié : même taille de `index.html` en ligne).
- En-têtes HTTP, redirections et statuts mesurés en direct avec curl.
- Rendu et poids mesurés dans un navigateur, en émulation mobile 375×812 puis en desktop.
- Recherche externe (SERP, annuaires, mentions, SIRENE) confiée à trois agents spécialisés.
- **Non disponible :**
  - Le runtime Python du plugin (`/seo setup` jamais lancé).
  - L'API PageSpeed (quota gratuit épuisé).
  - Les données terrain CrUX (site trop récent).
  - Google Search Console et le tableau de bord GBP (pas d'accès).
  - Les résultats Google eux-mêmes : les recherches en ligne ont été faites via Bing, DuckDuckGo et des recherches web non géolocalisées.
- Les constats marqués *inférence* sont à confirmer.

---

## Résumé

### Score de santé SEO : **63/100**

| Catégorie | Poids | Score | Commentaire |
|---|---|---|---|
| SEO technique | 22 % | 82 | Socle solide (HTTPS, redirections, cache, sitemap, HTML statique) ; menu mobile cassé sur /traiteur/ |
| Qualité du contenu | 23 % | 58 | Bonne voix et détails concrets, mais pages minces, preuves invérifiables, identité juridique absente |
| SEO on-page | 20 % | 60 | Aucun title ne cible Paris, H1 slogans, 2 pages sans H1 |
| Données structurées | 10 % | 45 | Accueil seulement, entité incomplète |
| Performance | 10 % | 72 | Code très léger, CLS 0, mais 2 à 2,5 Mo d'images par page |
| Préparation recherche IA | 10 % | 55 | Accès des robots IA parfait (88), mais signaux d'autorité et de marque quasi nuls (15) |
| Images | 5 % | 55 | Alt OK, poids et formats à reprendre |

Hors score pondéré : **SEO local ≈ 24/100**. Aucune fiche Google, aucun annuaire et aucun avis vérifiable n'ont été trouvés.

### Le diagnostic en une phrase
Le domaine `spectre-events.fr` a été enregistré le **10 octobre 2026** : il a un mois. Une bonne partie de ce qui suit est donc normale pour un site aussi jeune. Mais c'est justement maintenant que les fondations comptent le plus. Le site est techniquement propre et bien écrit, mais **il n'est pas encore visible**. Bing n'en indexe probablement aucune page (*inférence*), aucune fiche Google Business Profile ni aucun annuaire n'a été trouvé, aucun title ne vise « Paris », et la demande principale (le DJ de mariage) se cache dans un onglet. Le travail à faire porte moins sur le code que sur la **présence** (indexation, fiche Google, avis, annuaires) et sur des **pages dédiées aux requêtes qui comptent**.

### Les 5 problèmes majeurs
1. **Aucune présence locale détectée** : pas de fiche Google Business Profile, pas d'annuaire (Mariages.net, Zankyou, PagesJaunes…), pas d'avis vérifiables. Sur « DJ mariage Paris », 3 des 10 premiers résultats sont des annuaires (`findings/local.md`).
2. **Indexation non confirmée** : `site:spectre-events.fr` ne renvoie rien sur Bing (*inférence* : pas ou très peu indexé). Côté Google, à vérifier dans Search Console (`findings/indexation.md`).
3. **Mentions légales sans identité juridique** : ni forme juridique, ni SIRET, ni adresse du siège, alors que la LCEN les exige d'un site professionnel. C'est aussi le premier point de confiance qu'une entreprise cliente vérifie. Le registre SIRENE contient une entreprise individuelle « MAXIME FELTIN (MAXOW DJ EVENTS) » à Rueil-Malmaison, qui pourrait être l'entité juridique derrière la marque (*inférence à confirmer*). Si c'est le cas, l'écart entre le nom commercial et le nom déposé doit être expliqué sur le site et dans les annuaires.
4. **Aucune page ne cible les requêtes à forte demande** : pas de « Paris » dans les titles ; le mariage tient en environ 60 mots dans un onglet masqué de /sonorisation/ ; aucune page « DJ mariage Paris », « location sono Paris » ou « borne photo mariage ».
5. **Preuves faibles** : 5 témoignages au prénom seul, sans source ; fondateurs sans nom de famille ni photo ; aucune réalisation nommée (lieu, client, dispositif) ; « +120 événements » et « 5 000 invités » non illustrés.

### Les 5 gains rapides (moins d'une heure chacun)
1. **Réparer le menu mobile de /traiteur/** : il ne s'ouvre pas (erreur JavaScript vérifiée en ligne). Il suffit de remplacer le script en ligne par `header.js` et `sous-menu.js`, comme sur les autres pages.
2. Réécrire les 7 titles avec service + « Paris » ; ajouter un H1 sur /location/ et /contact/ ; retirer /mentions-legales/ du sitemap (`findings/content-onpage.md`).
3. Corriger les liens internes sans barre finale (`../traiteur`, `../location`, `../contact`), qui passent tous par une redirection 301.
4. Remplacer le logo de l'en-tête (155 Ko pour un affichage en 42×28) et ré-encoder `mariage-2.webp` (1,5 Mo), `borne-1.webp` et `borne-2.webp` (~500 Ko chacune).
5. Créer les comptes Search Console et Bing Webmaster Tools, puis soumettre le sitemap.

---

## SEO technique — 82/100
Points forts :
- Une seule redirection 301 vers `https://spectre-events.fr/`.
- HSTS et en-têtes de sécurité en place, gzip actif, cache navigateur bien réglé.
- `robots.txt` correct, sitemap valide, canonicals auto-référentes.
- HTML statique, lisible sans JavaScript.

À corriger :
- **Élevé** : menu mobile de /traiteur/ inopérant (`getElementById('menu')` renvoie null).
- **Moyen** : liens du menu sans barre finale, qui renvoient une 301 vers une URL `:443`.
- **Bas** : page `noindex` présente dans le sitemap.
- **Bas** : page 404 Apache par défaut.
- **Bas** : `signature-mail.html` publique et indexable.
- **Bas** : environ 3 Mo d'images inutilisées déployées.

Détail : `findings/technical.md` et `findings/indexation.md`.

## Qualité du contenu — 58/100
Points forts : marques et références du matériel, chiffres concrets, process, histoire des fondateurs, tarifs de location affichés.

Faiblesses :
- **Élevé** : identité juridique absente.
- **Élevé** : contenu mariage caché dans un onglet.
- **Moyen** : /location/ (135 mots) et /photographie/ (248 mots) trop minces ; l'onglet Photographe est illustré par des photos d'installations son.
- **Moyen** : avis invérifiables.
- **Moyen** : fondateurs non identifiés.
- **Moyen** : aucune étude de cas.

Détail : `findings/content-onpage.md`.

## SEO on-page — 60/100
- **Élevé** : aucun title ni H1 ne contient la zone ou la requête principale.
- **Moyen** : 2 pages sans H1.
- **Bas** : H1 de type slogan.
- **Bas** : meta description de /entreprises/ trop longue (184 caractères).
- **Bas** : og:image identique partout.
- **Bas** : texte et lien du compte Instagram incohérents.

Détail : `findings/content-onpage.md`.

## Données structurées — 45/100
- `EntertainmentBusiness` et `FAQPage` sur l'accueil seulement.
- **Moyen** : il manque `@id`, `sameAs`, `founder`, un logo d'au moins 112 px et des `areaServed` typés.
- **Moyen** : aucun `Service` sur les pages de prestations.
- **Bas** : pas de `BreadcrumbList`.
- **Info** : la FAQPage ne produit plus d'affichage enrichi depuis le 7 mai 2026 ; elle reste conforme et peut rester.

JSON-LD prêts à intégrer : `findings/schema.md`.

## Performance — 72/100
- LCP porté par du texte, CLS de 0,000 mesuré, polices auto-hébergées avec `swap`, environ 15 Ko de JS.
- **Élevé** : environ 2,3 Mo d'images sur l'accueil pour des vignettes affichées en 335 px de large ; pas de `srcset`.
- Données de vrais visiteurs indisponibles. Avant de conclure sur les Core Web Vitals (LCP, INP, CLS), relancer PageSpeed Insights depuis le navigateur.

Détail : `findings/performance-images.md`.

## Images — 55/100
- Tous les attributs alt sont présents et descriptifs.
- Poids excessifs, pas de version responsive, logo surdimensionné.
- Plusieurs images sans width/height (CLS tout de même à 0 grâce au CSS).
- Illustrations de l'onglet Photographe hors sujet.

## SEO local — ≈ 24/100 (hors score pondéré)
- **Élevé** : aucune fiche Google Business Profile trouvée. Recherches via Bing et DuckDuckGo, sans accès au tableau de bord GBP ; une fiche non indexée reste possible.
- **Élevé** : aucun annuaire trouvé. Mariages.net et PagesJaunes ont bloqué la vérification automatique, donc leur absence n'est pas prouvée.
- **Élevé** : pas de page « service + ville ».
- Nom, téléphone et e-mail cohérents sur tout le site.
- Deux comptes Instagram coexistent (@spectre_event, 202 abonnés et 3 publications ; @spectre_events, 48 abonnés et 33 publications). Rien n'indique lequel appartient à l'entreprise.

Détail : `findings/local.md`.

## Expérience de recherche (SXO) — écart estimé ≈ 42/100
Méthode : analyse des pages de résultats « à rebours », via un outil de recherche non géolocalisé en France. Le pack local, les « Autres questions posées » et les annonces n'étaient pas visibles, donc les proportions sont à confirmer sur google.fr.

**Constat principal (Élevé)** : sur les requêtes qui rapportent, 80 à 100 % des résultats sont des **annuaires et places de marché** : Mariages.net, Bridebook, 1001salles, Lokki, Funbooker. Chaque fiche y affiche un prix « à partir de », une note étoilée sur 200 à 600 avis, des photos et la zone desservie. Le site ne montre aucun de ces éléments, sauf les tarifs de /location/.

| Requête | Page actuelle | Écart | Correctif |
|---|---|---|---|
| DJ mariage Paris / IDF | /sonorisation/#mariages (onglet masqué, ~70 mots) | Élevé | Créer `/dj-mariage/` |
| sonorisation événementielle Paris | /sonorisation/ | Moyen | Résultats peu disputés, l'occasion est réelle : renforcer la page |
| location sono Paris, location enceinte soirée | /location/ | Élevé | Bon type de page, mais pas de H1, pas de photos, conditions floues |
| borne photo mariage (+ prix) | /photographie/#borne | Élevé ; critique sur « prix » | Page `/borne-photo/` avec prix « à partir de » |
| DJ / animation soirée d'entreprise Paris | #corporate ou /entreprises/ | Élevé | Rattacher clairement à /entreprises/ |
| organisation événement entreprise clé en main | /entreprises/ | Faible | Ajouter références clients et budget par invité |
| DJ mariage Vendée ; bar à vinyles | aucune | — | Seulement avec des preuves locales réelles |

Autres constats :
- **Élevé** : afficher des prix « à partir de » sur chaque page de service, puisque les annuaires le font.
- **Élevé** : /location/ gagnerait à présenter des fiches par formule : photo, unité de prix, TTC ou HT, caution, frais de livraison, et une option « Location » dans le formulaire de contact.
- **Moyen** : sur /entreprises/, l'avis d'Astrid figure parmi les références sous « Astrid, Paris », alors que l'accueil le présente comme « anniversaire à Paris ». Sur une page destinée aux entreprises, mieux vaut des avis de clients entreprises.
- **Moyen** : SIRET et assurance responsabilité civile professionnelle visibles pour les acheteurs entreprises.

Scores par profil de visiteur (du plus faible au plus fort) :

| Profil | Score |
|---|---|
| Couple en Vendée | 28 |
| Loueur de matériel | 43 |
| Acheteur de borne photo | 43 |
| Couple qui se marie (la plus grosse occasion) | 46 |
| Hôte d'une soirée privée | 47 |
| Responsable d'événement en entreprise | 69 |

Détail, sources et user stories : `findings/sxo.md`.

## Préparation à la recherche IA — 55/100
**Accès technique : 88/100.**
- Vérifié : tous les robots testés reçoivent un 200 avec la page complète (21 831 octets). Liste : OAI-SearchBot, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Googlebot, bingbot, CCBot, Applebot.
- `robots.txt` autorise tout.
- Le HTML statique se lit sans JavaScript.

**Autorité et marque : 15/100.**
- **Élevé — Aucune mention ni lien venant d'un autre site.** Même le site du partenaire `beretetpapilles.fr` ne cite pas Spectre Events. Rien sur Wikidata ni YouTube. Pour un domaine d'un mois, c'est attendu ; les actions 3, 7, 8 et 15 du plan s'en occupent.
- **Élevé — Homonymes.**
  - `spectre-events.com` appartient à une agence événementielle néerlandaise du même nom.
  - La seule « SPECTRE EVENTS » du registre français est une société lilloise fermée, sans lien (SIREN 841 256 373).
  - Pour que les moteurs et les IA ne confondent pas : toujours associer le nom au service et à « Paris » (titles, schema, profils), et déclarer « Spectre Events » comme nom commercial de l'entité juridique.
- **Élevé — L'entreprise n'est pas clairement définie** : pas d'identité juridique, fondateurs sans nom de famille, schema sans `legalName`, `foundingDate`, `founder` ni `sameAs`. Ajouter un paragraphe qui définit l'entreprise : qui, quoi, où, depuis quand, sous quelle forme juridique.
- **Moyen — Peu de faits citables en dehors de /location/.** Les tarifs et références de matériel de /location/ sont exactement ce qu'une IA cite. Ailleurs, il manque des prix « à partir de » et des intertitres formulés comme des questions.
- **Bas** :
  - Le partenaire écrit son nom « Béret & Papilles », pas « Beret et Papilles » : aligner l'orthographe.
  - `/.well-known/` renvoie un 403 (règle `.htaccess` sur les fichiers cachés), sans conséquence aujourd'hui.
  - `llms.txt` (404) est facultatif et Google Search ne l'utilise pas. Pas prioritaire.
- *Inférence* : les requêtes qui se font passer pour Googlebot ou bingbot ont mis environ 4 s à recevoir une réponse, probablement à cause d'une vérification anti-usurpation chez OVH. Les statistiques d'exploration de Search Console diront si le vrai Googlebot est concerné.

Scores par plateforme (inférences) :

| Plateforme | Score |
|---|---|
| Google AI Overviews | ≈ 40 |
| ChatGPT | ≈ 30 |
| Perplexity | ≈ 35 |
| Copilot | ≈ 30 |

Détail : `findings/geo.md`.

---

## Plan d'action
Voir `ACTION-PLAN.md` : phases, dépendances, critère d'échec et indicateur à suivre pour chaque action.

## Fichiers de l'audit
- `findings/technical.md`, `findings/indexation.md`
- `findings/content-onpage.md`, `findings/schema.md`, `findings/performance-images.md`
- `findings/local.md`, `findings/sxo.md`, `findings/geo.md` (agents spécialisés)
- `audit-data.json` (données structurées pour un rapport PDF)
