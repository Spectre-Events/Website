# Local SEO findings - spectre-events.fr (2026-11-11)

Method limits: no WebSearch tool, no Google/GBP access. Used curl against Bing/DuckDuckGo HTML (non-geolocated, DDG then blocked by captcha), the public SIRENE API (recherche-entreprises.api.gouv.fr), Instagram public meta tags, and local source. Mariages.net / PagesJaunes returned HTTP 403 to curl, so listing presence there is UNVERIFIED (not "absent").

## Verified facts
- Business type: SAB, no street address anywhere (HTML, JSON-LD, mentions-legales). No Maps embed, no directions link.
- NAP: phone +33 6 81 33 42 83 (tel:/wa.me/JSON-LD +33681334283 all consistent), email contact@spectre-events.fr. Name "Spectre Events" consistent. Address: only addressRegion "Île-de-France" in JSON-LD; footer "Paris & Île-de-France".
- Schema: ONE JSON-LD on homepage only (EntertainmentBusiness + FAQPage). No LocalBusiness on other pages, no @id, no geo, no openingHoursSpecification, no sameAs, no aggregateRating, no Service/Offer, no addressLocality. areaServed is plain strings (incl. "France"), not Place/AdministrativeArea objects; "Pays de la loire" casing.
- sameAs candidates present on page: Instagram https://www.instagram.com/spectre_event/ (singular) - fetched: 202 followers, 3 posts. A different account @spectre_events (plural) exists: 48 followers, 33 posts, bio (via DDG snippet) "Concepteur - Organisateur - Producteur d'événements" - unknown whether owned by the business.
- mentions-legales: editor "Spectre Events", activity, phone, email, "Directeur de la publication : Maxime Feltin", host OVH. NO legal form, SIREN/SIRET, RCS/RM, address/siège, VAT number. (Legally required for professionals under LCEN art. 6-III; also a trust/E-E-A-T and citation-matching gap.)
- No location pages; one page per service. Sitemap lists 8 URLs. robots.txt OK.
- Testimonials: 4 blockquotes (index) + 1 (entreprises), first names only, hard-coded 5 stars, no source/link/date, no Review schema (good: unmarked, avoids self-serving-review violation). Locations in testimonials: Valenciennes, Angers, Paris - none in Vendée and none Île-de-France wedding.
- Claim "+120 événements" with no proof.
- SIRENE (public registry, queried 2026-11-11):
  - "SPECTRE EVENTS" SIREN 841256373, Lille 59800, NAF 93.29Z, status C (ceased), different director. Name collision, not the same entity (inference from different director/city).
  - "MAXIME FELTIN (MAXOW DJ EVENTS)" SIREN 941924250, Rueil-Malmaison 92500, NAF 93.29Z, status A (active). Plausibly the legal entity operating Spectre Events (INFERENCE ONLY - name matches the publication director; commercial name differs). If so, the legal/commercial name mismatch needs to be declared on the site and in citations.
- Search presence: Bing queries "spectre-events.fr", "Spectre Events" + DJ/sonorisation/Maxime Feltin returned only dictionary/film results, no GBP, no directories, no site (non-geolocated, single snapshot). DDG: "Spectre Events" returned unrelated Instagram @spectre_events and allevents.in/paris/spectre. => No evidence of a GBP, Mariages.net, PagesJaunes, Facebook, LinkedIn, Yelp listing. site:spectre-events.fr on Bing returned junk -> indexation not confirmed (Search Console check needed).
- Competitor SERP (DDG, "DJ mariage Paris", national, not local-pack): mariages.net/musique-mariage/dj-mariage/paris, miguel-events.com, mariages.net IDF category, djdadicool.com, mkl-events.com/prestations/dj-mariage-paris, djobooking.com/villes/dj/paris/mariage, dj-mariage-paris.paris, djwplus.com, mgrevents.fr/mariage, sos-dj.com/paris-dj-mariage. Mix: 3 directories/marketplaces + 7 vendor sites; vendor sites are mostly city-specific service pages or exact-match domains. Other queries (sonorisation événementielle Paris, location sono Paris, borne photo mariage Paris, DJ mariage Vendée) returned unusable results from Bing/DDG (noise / captcha) - NOT assessed.

## Inferences / not assessable
- Whether a GBP exists (could be unindexed or SAB with hidden address); Local pack positions; review counts elsewhere; Mariages.net/Zankyou/PagesJaunes/Pappers/societe.com presence; Apple/Bing Places.
- Proximity (~55% of local ranking variance) is outside control; SAB with hidden address and base in Hauts-de-Seine (if Rueil is the base) cannot rank well in Vendée pack.

## Scoring (estimate)
GBP signals 2/25 (none detected); Reviews 4/20 (unsourced first-name quotes); Local on-page 8/20 (area stated, FAQ, no location/city pages, no map); NAP & citations 5/15 (consistent on site, no external citations found, no legal ID); Schema 4/10; Links/authority 1/10. Total approx 24/100.

## Prioritised actions
1. Critical - Create/claim GBP as service-area business: hide address, primary category "Disc jockey" (or "Service d'animation de soirée"), secondaries Sound system rental / Photo booth rental / Event planner; service areas Paris + 92/93/94/75 + Vendée departement. Verify; add photos, services, weekly posts.
2. Critical - Add legal identity to mentions-legales: legal name, form, SIREN/SIRET, VAT status, siège/contact address (can be a domiciliation). Align the trading name vs. "Maxime Feltin / Maxow DJ Events" registration with citations.
3. High - Review engine: ask all past clients for Google reviews (direct review link, QR in post-event email); target 15+ in 90 days, respond to all. Move onsite quotes to a feed/widget of real Google reviews; add full names/initial, date, event, link to source.
4. High - Citations: create/claim Mariages.net, Zankyou, Bing Places, Apple Business Connect, Facebook page, LinkedIn, PagesJaunes, Pappers/societe.com check; identical NAP (name, phone, email, region); fix SIRENE activity/commercial name.
5. High - Build dedicated location+service pages: /dj-mariage-paris/, /sonorisation-evenementielle-ile-de-france/, /dj-mariage-vendee/, /borne-photo-mariage-paris/, /location-sono-paris/ with unique proof (venues, photos, setups, quotes), not city-swapped doorway text.
6. High - Schema: sitewide LocalBusiness-compatible node with @id, sameAs (IG, FB, GBP, Mariages.net), areaServed as AdministrativeArea objects, founder Person, hasOfferCatalog/Service per page; add geo of service-area centre only if not a private address; keep AggregateRating off until reviews are verifiable on third-party page. Consider LocalBusiness + additionalType rather than EntertainmentBusiness (acceptable but loose).
7. Medium - Unify Instagram: confirm @spectre_event vs @spectre_events; link the right one, post regularly (3 posts only).
8. Medium - Add a service-area map/list (not a street pin) and departments served; fix "Pays de la loire" casing; remove "France" from areaServed unless true.
9. Medium - Substantiate "+120 événements" with case studies; diversify testimonials to Paris/IDF/Vendée.
10. Low - Verify Search Console indexation of all 8 URLs; target Vendée-specific local links (wedding venues, planners, Beret et Papilles cross-link).
