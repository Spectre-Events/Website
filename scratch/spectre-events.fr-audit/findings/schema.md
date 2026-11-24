# Données structurées — spectre-events.fr

**Score : 45/100**

## Existant
- Accueil uniquement : `EntertainmentBusiness` (nom, url, logo, image, description, téléphone, e-mail, `areaServed` sous forme de chaînes, `priceRange` « €€ », adresse limitée à la région « Île-de-France ») et `FAQPage` (5 questions identiques à la FAQ visible).
- Les 6 autres pages n'ont aucun balisage.

## Constats

### Moyen — L'entité entreprise est incomplète
- Pas d'`@id` stable, donc les autres pages ne peuvent pas y faire référence.
- Pas de `sameAs` : Instagram, et la future fiche Google ou Mariages.net, ne sont pas reliés à l'entité.
- Pas de `founder` ni de `foundingDate`.
- `logo` pointe vers `logo-nav.png` (60×40 px), en dessous du minimum de 112×112 px demandé par Google.
- La `description` du schema (« DJ événementiel : mariages, séminaires, rallyes… ») ne reprend pas celle du site.

### Moyen — Aucun balisage `Service` sur les pages de prestations
- /sonorisation/, /photographie/, /location/ et /entreprises/ décrivent chacune un service avec une zone et, pour /location/, des prix. Un `Service` par page (avec `provider` qui renvoie à l'`@id` de l'entreprise, `areaServed`, `serviceType`) et des `Offer` chiffrées sur /location/ rendent ces informations lisibles par les moteurs et les assistants IA.

### Bas — Pas de `BreadcrumbList`
- Utile sur les pages internes pour l'affichage du fil d'Ariane dans les résultats.

### Info — `FAQPage` sur l'accueil
- Google a retiré les résultats enrichis FAQ pour tous les sites le 7 mai 2026 : ce balisage ne produit plus d'affichage spécial dans les résultats. Il est sans risque et conforme (il reprend le contenu visible). Inutile de le retirer, inutile d'en ajouter ailleurs.

## Proposition (à valider avant intégration)

Accueil — remplace le bloc `EntertainmentBusiness` :

```json
{
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  "@id": "https://spectre-events.fr/#entreprise",
  "name": "Spectre Events",
  "url": "https://spectre-events.fr/",
  "logo": "https://spectre-events.fr/images/logo-512.png",
  "image": "https://spectre-events.fr/images/og-image.jpg",
  "description": "Sonorisation, DJ, borne photo et organisation d'événements pour entreprises et particuliers, à Paris, en Île-de-France, en Vendée et dans les Pays de la Loire.",
  "telephone": "+33681334283",
  "email": "contact@spectre-events.fr",
  "priceRange": "€€",
  "founder": [
    {"@type": "Person", "name": "Maxime"},
    {"@type": "Person", "name": "Andéol"}
  ],
  "address": {"@type": "PostalAddress", "addressRegion": "Île-de-France", "addressCountry": "FR"},
  "areaServed": [
    {"@type": "City", "name": "Paris"},
    {"@type": "AdministrativeArea", "name": "Île-de-France"},
    {"@type": "AdministrativeArea", "name": "Vendée"},
    {"@type": "AdministrativeArea", "name": "Pays de la Loire"}
  ],
  "sameAs": ["https://www.instagram.com/spectre_event/"]
}
```
Notes : `logo-512.png` est à créer (logo carré ≥ 112 px). Compléter `founder` avec les noms complets s'ils sont publiés sur le site. Ajouter `addressLocality`/`postalCode` si une adresse de siège est publiée dans les mentions légales.

/location/ — exemple de `Service` avec offres :

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Location de sonorisation et d'éclairage",
  "serviceType": "Location de matériel de sonorisation",
  "provider": {"@id": "https://spectre-events.fr/#entreprise"},
  "areaServed": {"@type": "AdministrativeArea", "name": "Île-de-France"},
  "offers": [
    {"@type": "Offer", "name": "Petite sono (2 enceintes 200 W + micro Shure, ~50 personnes)", "price": "120", "priceCurrency": "EUR"},
    {"@type": "Offer", "name": "Grosse sono L-Acoustics (jusqu'à 400 personnes)", "price": "300", "priceCurrency": "EUR"},
    {"@type": "Offer", "name": "Lumières sobres (2 lyres Wash)", "price": "60", "priceCurrency": "EUR"},
    {"@type": "Offer", "name": "Lumières immersives", "price": "150", "priceCurrency": "EUR"}
  ]
}
```
Valider avec le Rich Results Test et le validateur schema.org après intégration.
