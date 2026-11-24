# Indexation et présence dans les moteurs — spectre-events.fr

## Bing (vérifié le 11/11/2026, résultat non géolocalisé)
- `site:spectre-events.fr` : aucune page du site dans les résultats.
- `"spectre-events.fr"` : seulement des dictionnaires (Larousse, Le Robert), Wikipédia, Allociné, IMDb (le film « Spectre »).
- Interprétation (inférence) : le site n'est probablement pas encore indexé par Bing, ou l'est trop peu pour ressortir. Bing alimente aussi Copilot, DuckDuckGo et une partie de ChatGPT Search.

## Google
- Impossible à vérifier ici : Google bloque les requêtes automatisées et aucun accès Search Console n'est configuré.
- À vérifier dans Search Console : rapport « Pages » (nombre de pages indexées sur 7) et inspection de l'URL d'accueil.

## Actions
1. Search Console : propriété de type « Domaine » (vérification DNS chez OVH), soumission de `sitemap.xml`, demande d'indexation des 7 pages.
2. Bing Webmaster Tools : importer le site depuis Search Console (2 clics), soumettre le sitemap.
3. Optionnel : IndexNow (un fichier clé à la racine et un ping à chaque déploiement, faisable dans `deploy.yml`) pour que Bing et Yandex voient les mises à jour en quelques minutes.

Vérification : sous 2 semaines, `site:spectre-events.fr` sur Bing doit renvoyer au moins 5 pages, et Search Console doit afficher 7 pages indexées.
