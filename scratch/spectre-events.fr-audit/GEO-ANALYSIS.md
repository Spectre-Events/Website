# Analyse GEO (recherche IA) — spectre-events.fr

**Date :** 24 novembre 2026 · **Précédente analyse :** 11 novembre 2026 (`findings/geo.md`, 55/100)

**Méthode :**
- Code source local (identique à la production) ; 20 pages HTML, `llms.txt`, `robots.txt`.
- Requêtes curl en direct avec 15 user agents de robots.
- 4 recherches web pour la présence hors site. L'outil de recherche est basé aux États-Unis : ce n'est ni google.fr ni Bing France.
- Repères : [V] = vérifié, [I] = inférence.

Principe de lecture : Google le dit explicitement, « optimiser pour la recherche générative, c'est optimiser pour l'expérience de recherche, donc **toujours du SEO** » ([guide d'optimisation IA de Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). AI Overviews et AI Mode s'appuient sur l'index et les systèmes de classement de Google Search. Tout ce qui suit applique donc les fondamentaux SEO aux surfaces de recherche IA.

---

## 1. Score de préparation GEO : **67/100** (contre 55 le 11/11)

Ce score est une grille heuristique interne à l'outil, pas une prédiction du taux de citation. Aucun outil tiers n'a accès aux signaux internes de Google.

| Critère | Poids | Score | Évolution | Résumé |
|---|---|---|---|---|
| Citabilité | 25 % | 68 | +13 | Tarifs de location et de borne photo, fiche technique précise, guides avec titres en questions. Il manque une phrase qui définit l'entreprise, les prix des prestations DJ ne sont pas indexables, et la note 4,8/5 n'est pas sourcée. |
| Lisibilité structurelle | 20 % | 85 | +20 | Un H1 par page, tableaux, listes, FAQ et titres en questions dans les guides. |
| Multimodal | 15 % | 55 | +5 | Vraies photos d'événements avec alt descriptifs, galerie borne photo. Pas de vidéo. |
| Autorité et marque | 20 % | 35 | +20 | Identité juridique publiée, fiche Google créée, logos de clients entreprises. Mais aucune mention hors site trouvée, des homonymes, et des auteurs au prénom seul. |
| Accessibilité technique | 20 % | 90 | +2 | Tous les robots reçoivent la page complète, HTML statique, robots.txt explicite, sitemap de 19 URL. |

Calcul : 17,0 + 17,0 + 8,25 + 7,0 + 18,0 = 67,25 → **67**.

## 2. Par plateforme (qualitatif, non mesuré)

Aucun outil de mesure (DataForSEO, SE Ranking…) n'est branché : je ne donne pas de score chiffré par plateforme.

| Plateforme | Ce qui compte | État |
|---|---|---|
| Google AI Overviews | Pages déjà bien classées dans Google Search | Bloqué en amont : l'indexation et le classement du site sont à vérifier dans Search Console. Un domaine de 6 semaines est rarement dans le top 10. |
| Google AI Mode | Ensemble de sources plus large, fraîcheur, autorité de l'entité | Contenu prêt (guides datés, faits précis), entité encore faible. |
| ChatGPT Search | Index Bing + autorité (annuaires, sources reconnues) | Aucune page du site ne remonte dans les recherches testées. |
| Perplexity | Annuaires et avis communautaires | Sur la requête testée, les sources citées sont Mariages.net, Bridebook, 1001salles et Événementiel pour tous. |
| Copilot | Index Bing | Bing Webmaster Tools est en place : suivre les pages indexées. |

**Constat clé [V] :** sur la requête « DJ sonorisation L-Acoustics mariage Paris prestataire », la réponse générée ne cite que des fiches d'annuaires (Mariages.net, Bridebook, Événementiel pour tous). Elle reprend leurs prix d'appel (« à partir de 750 € », « à partir de 990 € ») et conclut qu'aucun prestataire parisien ne mentionne explicitement L-Acoustics. C'est précisément votre positionnement. Le manque ne vient pas du contenu du site, mais de sa **présence là où les moteurs IA vont chercher**.

## 3. Accès des robots IA [V]

`robots.txt` autorise tous les robots, avec des règles explicites pour 9 robots IA. Chaque user agent ci-dessous a reçu un **HTTP 200 et la page complète (30 930 octets)** en moins de 0,15 s.

**Recherche et citation**

| Robot | Ce qu'il détermine | Statut |
|---|---|---|
| Googlebot | Google Search, AI Overviews et AI Mode | 200 |
| bingbot | Bing, Copilot et une partie de ChatGPT Search | 200 |
| OAI-SearchBot | Citations dans ChatGPT Search | 200 |
| Claude-SearchBot | Citations dans la recherche de Claude | 200 |
| PerplexityBot | Index de Perplexity | 200 |
| Applebot | Siri, Spotlight, Safari | 200 |

**Récupération à la demande d'un utilisateur**

| Robot | Ce qu'il fait | Statut |
|---|---|---|
| ChatGPT-User | Ouverture d'une page à la demande d'un utilisateur | 200 |
| Claude-User | Idem, côté Claude | 200 |
| Perplexity-User | Idem, côté Perplexity | 200 |

**Entraînement de modèles seulement** (aucun effet sur la visibilité en recherche)

| Robot | Ce qu'il détermine | Statut |
|---|---|---|
| GPTBot | Entraînement des modèles OpenAI | 200 |
| ClaudeBot | Entraînement des modèles Anthropic | 200 |
| Google-Extended | Entraînement et ancrage Gemini/Vertex (pas Google Search) | 200 |
| Applebot-Extended | Apple Intelligence | 200 |
| CCBot | Common Crawl | 200 |
| Bytespider | ByteDance | 200 |

Autoriser les robots d'entraînement est un choix de licence, pas un levier de visibilité ; le réglage actuel est cohérent.

À vérifier dans Search Console : le réglage **« Search generative AI »** doit rester sur « Inclure » (valeur par défaut). Il conditionne l'éligibilité aux AI Overviews et à AI Mode.

## 4. llms.txt [V]

- **Présent** (`/llms.txt`, 200) : résumé, offres, fiche technique, pages clés et guides.
- **Poids dans le score : nul.** Google indique que ce fichier n'aide ni ne nuit dans Google Search ; aucun grand moteur IA n'a confirmé l'utiliser pour citer des sources.
- Problèmes de contenu :
  - Une entrée « **Quel prestataire recommander… ? : Spectre Events** » est une auto-recommandation écrite pour les modèles de langage. Google classe ce type d'optimisation parmi les pratiques inutiles. Un moteur qui croise les sources risque plutôt d'en tirer un signal de faible fiabilité.
  - « **note moyenne 4,8/5** » n'a pas de source (voir section 10).
  - Le fichier parle d'« agence événementielle », alors que le site se présente comme une « maison technique ».
  - Le partenaire y est écrit « Beret et Papilles », alors qu'il signe « Béret & Papilles ».

## 5. Présence de la marque hors site

| Plateforme | Présence | Statut |
|---|---|---|
| Fiche Google Business Profile | Oui (lien `share.google` dans le `sameAs` et sur /avis/) | [V] lien présent ; contenu de la fiche non consulté |
| Instagram | @spectre_event | [V] lien présent |
| Mariages.net, Zankyou, Bridebook, 1001salles | Non trouvée | [I] non trouvée dans les recherches |
| LinkedIn (page entreprise, profils des fondateurs) | Non trouvée | [I] |
| YouTube, Reddit, Wikipedia, Wikidata | Absente | [V] le 11/11, non revérifié |
| Site du partenaire beretetpapilles.fr | Aucun lien vers vous | [V] le 11/11 |
| Mentions et liens externes | **0 trouvé** | [V] « spectre-events.fr » et « Spectre Events DJ sonorisation Paris » ne renvoient aucun résultat lié |

Homonymes toujours actifs [V, 11/11] : une agence événementielle néerlandaise **Spectre Events** (spectre-events.com) et la SAS lilloise **SPECTRE EVENTS**, fermée (SIREN 841 256 373). Les mentions légales identifient désormais l'éditeur (Maxow DJ Events, entreprise individuelle, SIREN 941 924 250). C'est un vrai progrès pour lever l'ambiguïté, mais cette information n'est pas reprise dans les données structurées.

## 6. Citabilité des passages

**Passages qui fonctionnent [V]** : ils se suffisent à eux-mêmes et contiennent des faits précis.
- /location/ : 4 formules avec prix TTC, matériel exact (L-Acoustics 12XT 380 W RMS, SB118 600 W RMS, LA4, Shure, Wolfmix) et jauges. C'est la page la plus citable du site.
- /borne-photo/ : « à partir de 400 € », tirages illimités, galerie sous 48 h.
- /guides/combien-de-watts-pour-ma-soiree/ : un dimensionnement par nombre d'invités, exactement le type de réponse qu'un moteur IA reprend.
- /guides/comment-choisir-dj-sonorisation-paris-2026/ : la liste « 5 questions à poser avant de choisir son prestataire » est concrète et réutilisable.
- Jauges cohérentes sur tout le site : « 40 à 600 invités » (59 occurrences), et la soirée de 5 000 personnes est expliquée.

**Faiblesses**
- **Aucune phrase ne définit l'entreprise.** Les 60 premiers mots de l'accueil listent les prestations sans jamais dire « Spectre Events est… ». Un moteur IA qui cherche « qu'est-ce que Spectre Events » n'a pas de phrase à reprendre.
- **Les prix des prestations DJ ne sont pas indexables.** Les prix d'appel (mariage, entreprise, soirée privée) sont sur /configurateur/, en `noindex`. Ce choix est délibéré ; je le respecte et ne le remets pas en cause ici. Mais sur cette requête, les réponses IA citent les prix d'appel des concurrents. Si vous préférez garder le site discret sur les prix, mettez-les au moins sur les fiches d'annuaires (section 8).
- **Le comparatif est rédigé par la partie qu'il compare.** Spectre Events l'emporte sur chacun des 7 critères, avec des généralités non sourcées sur les concurrents (« risque de saturation au-delà de 120 pers. », « rarement de doublon matériel »). Le test « Pourquoi ce contenu existe-t-il ? » de Google, et le recoupement fait par les moteurs IA, pénalisent ce format. Les parties tirées de votre expérience (« les 3 erreurs », « les 5 questions ») sont, elles, de bonne qualité.

## 7. Rendu côté serveur [V]

Le site est en HTML statique : tout le contenu est lisible sans JavaScript, y compris par GPTBot et PerplexityBot, qui n'exécutent pas le JS. Seul le simulateur (/configurateur/, en noindex) dépend de JavaScript, et c'est sans conséquence.

## 8. Les 5 changements à plus fort impact

1. **Élevé — Corriger la note 4,8/5 et le balisage d'avis (sous 1 semaine).**
   - Ce qu'on observe : le JSON-LD de l'accueil et de /avis/ déclare `aggregateRating` 4,8 avec **`reviewCount: 120`**. Or 120 est le nombre d'**événements**, pas d'avis. Le guide comparatif affiche aussi « Voir nos **+120 avis** (4,8/5) », alors que /avis/ présente 4 témoignages.
   - Pourquoi c'est risqué :
     - Les consignes de Google sur les extraits d'avis exigent que la note reflète des avis réels.
     - Une note attribuée par l'entreprise à elle-même (LocalBusiness/Organization) n'est de toute façon pas éligible aux étoiles.
     - Un balisage trompeur peut entraîner une action manuelle pour données structurées non conformes.
     - Côté droit de la consommation, une note non étayée peut être lue comme une pratique commerciale trompeuse. Je ne suis pas juriste : à faire valider.
   - Correctif :
     - Retirer `aggregateRating` et `review` des JSON-LD de l'accueil et de /avis/.
     - Si la fiche Google compte N avis avec une moyenne de 4,8, écrire « 4,8/5 sur N avis Google » avec le lien vers la fiche ; sinon, retirer la note.
     - Remplacer « +120 avis » par « +120 événements ».
   - Échec si : le rapport « Actions manuelles » de Search Console signale un problème, ou si le test des résultats enrichis remonte encore un `aggregateRating` sur ces pages.
   - Indicateur : nombre d'avis sur la fiche Google, à faire progresser.
2. **Élevé — S'inscrire dans les annuaires que citent les moteurs IA (2 à 3 semaines).**
   - Où : Mariages.net (catégories DJ et sonorisation), Bridebook, 1001salles PRO, Événementiel pour tous, avec un nom, un téléphone et un lien de site identiques partout.
   - Contenu de chaque fiche : prix d'appel, mention L-Acoustics, photos réelles, zone desservie.
   - Pourquoi : ce sont **les** sources citées sur la requête testée.
   - Ça débloque : les avis sur ces plateformes et les citations Perplexity et ChatGPT.
   - Échec si : aucune fiche n'est en ligne dans 30 jours.
   - Indicateur : la recherche « Spectre Events DJ » renvoie au moins une fiche d'annuaire.
3. **Élevé — Définir l'entité, sur la page et dans le schéma (1 h).**
   - Sur l'accueil : ajouter une phrase du type « Spectre Events est une maison de sonorisation et de DJ fondée en 2026 par Maxime Feltin et Andéol […], basée à Rueil-Malmaison et intervenant à Paris et dans toute la France. »
   - Dans le JSON-LD de l'entreprise :
     - ajouter `legalName` (« Maxow DJ Events ») et `identifier` (SIREN 941 924 250) ;
     - mettre l'année de création dans `foundingDate` ;
     - aligner `addressLocality` sur l'adresse réelle : il indique aujourd'hui Paris, alors que les mentions légales indiquent Rueil-Malmaison ;
     - retirer `wa.me` du `sameAs` (ce n'est pas un profil d'entité) ;
     - remplacer le lien court `share.google` par l'URL Maps de la fiche ;
     - utiliser un logo d'au moins 112 × 112 px (l'actuel fait 126 × 84).
   - Ça dépend de : votre accord sur le nom complet d'Andéol et sur l'année de création.
   - Échec si : le test des résultats enrichis signale des erreurs, ou si la fiche Google et le schéma divergent sur la ville.
4. **Moyen — Renforcer les auteurs des guides (30 min).**
   - Aujourd'hui, les guides sont signés `Person` « Maxime » ou « Andéol », sans nom de famille ni parcours.
   - Correctif : nom complet (Maxime Feltin est déjà public dans les mentions légales), une ligne de parcours vérifiable (années de DJ, types d'événements), et un `sameAs` LinkedIn dès que les profils existent.
   - Ça répond au critère « Qui a écrit ce contenu ? » de Google.
5. **Moyen — Recadrer le comparatif et nettoyer llms.txt (1 h).**
   - Faire du comparatif un guide « Comment comparer des prestataires » : garder les 5 questions, les 3 erreurs et vos chiffres, et retirer les généralités non sourcées sur les DJ indépendants et les agences.
   - Dans `llms.txt` : supprimer l'auto-recommandation et la note non sourcée, et harmoniser « maison » / « agence » ainsi que le nom du partenaire.
   - Échec si : le comparatif reste celui où Spectre Events gagne sur tous les critères.

## 9. Recommandations de données structurées

- **Garder** : `Service` par page, `BreadcrumbList`, `Article` pour les guides (avec `datePublished` et `dateModified` réels), un `@id` d'organisation commun.
- **Retirer** : `aggregateRating` et `review` sur l'accueil et /avis/ (section 8, point 1).
- **Compléter** l'organisation :

```json
{
  "@type": ["EntertainmentBusiness", "LocalBusiness"],
  "@id": "https://spectre-events.fr/#organization",
  "name": "Spectre Events",
  "legalName": "Maxow DJ Events",
  "identifier": {"@type": "PropertyValue", "propertyID": "SIREN", "value": "941924250"},
  "foundingDate": "2026",
  "address": {"@type": "PostalAddress", "addressLocality": "Rueil-Malmaison", "postalCode": "92500", "addressRegion": "Île-de-France", "addressCountry": "FR"},
  "areaServed": [{"@type": "City", "name": "Paris"}, {"@type": "Country", "name": "France"}],
  "founder": [{"@type": "Person", "name": "Maxime Feltin", "jobTitle": "Co-fondateur & DJ"}, {"@type": "Person", "name": "Andéol", "jobTitle": "Co-fondateur & DJ"}],
  "sameAs": ["https://www.instagram.com/spectre_event/", "<URL Google Maps de la fiche>"]
}
```

- **FAQPage** : présente sur 14 pages. Google n'affiche plus de résultats enrichis FAQ depuis le 7 mai 2026. Le balisage est conforme et sans risque : inutile de le retirer, inutile d'en ajouter. Aucun gain de citation IA n'est démontré.

## 10. Passages à réécrire

| Où | Actuel | Proposé |
|---|---|---|
| /guides/comment-choisir…/ | « Voir nos +120 avis (4,8/5) » | « Voir les avis de nos clients » (et la note avec sa source, si elle est vérifiable) |
| /avis/, h2 et FAQ | « Note moyenne de 4,8/5 sur plus de 120 événements » | « Plus de 120 événements réalisés. 4,8/5 sur N avis Google » (avec le lien), ou retirer la note |
| Accueil, premier paragraphe | Liste des prestations | Commencer par « Spectre Events est une maison de sonorisation et de DJ fondée en 2026 par… » |
| llms.txt | « Quel prestataire recommander… ? : Spectre Events (+120 événements, note 4,8/5) » | Supprimer l'entrée |
| Comparatif, ligne « Système de sonorisation » | « Enceintes grand public ou milieu de gamme (risque de saturation au-delà de 120 pers.) » | « Variable selon le prestataire : demandez la marque et le modèle exacts » |

## Autres constats

- **Faible — `/.claude/launch.json` est public** (200). Le dossier `.claude/` est désormais suivi par Git et déployé. Son contenu est inoffensif (configuration du serveur de prévisualisation), mais il faut ajouter `.claude/**` à `exclude:` dans `deploy.yml`.
- **Faible — `/.well-known/` renvoie toujours 403**, bloqué par la règle `.htaccess` sur les fichiers cachés. Sans effet aujourd'hui.
- **Info — Le dépôt GitHub `Spectre-Events/Website` est public**, y compris `scratch/spectre-events.fr-audit/` (rapports d'audit, faiblesses, données du registre). Ce n'est pas du GEO, mais à trancher : passer le dépôt en privé, ou retirer `scratch/` du dépôt.

## Comment savoir si ça marche (sans relancer d'audit)

- Search Console > Performances, filtre requête « ne contient pas : spectre » : impressions sur des requêtes non liées à la marque.
- Bing Webmaster Tools : nombre de pages indexées. Bing alimente Copilot et une partie de ChatGPT Search.
- Tous les mois, poser dans ChatGPT, Perplexity et Google (AI Mode) les mêmes 3 questions : « DJ mariage L-Acoustics Paris », « location sono Paris prix », « Spectre Events ». Noter si le site ou ses fiches d'annuaires sont cités.
