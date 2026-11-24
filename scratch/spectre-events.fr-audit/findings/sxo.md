# SXO Findings: spectre-events.fr

- Analysis date: 2026-11-11
- Scope: 8 indexable URLs (/, /entreprises/, /sonorisation/ (#corporate #mariages #privees), /photographie/ (#borne #photo), /traiteur/, /location/, /contact/, /mentions-legales/)
- Method: local source read (identical to production), 17 WebSearch SERP samples (FR queries), 1 directory page fetched (Mariages.net "DJ mariage Paris"), page-type taxonomy, user-story and persona frameworks from the seo-sxo skill.
- The SXO Gap Score is **separate from the SEO Health Score**.

---

## 0. Headline finding (lead mismatch)

**CRITICAL / HIGH page-type mismatch on the money keywords.** For "DJ mariage Paris", "borne photo mariage Paris", "DJ soirée d'entreprise Paris", "animation soirée entreprise Paris" and "DJ mariage Vendée", **80-100% of observed results are directories or marketplaces** (Mariages.net, Bridebook, WeddingWire, 1001salles PRO, Evenementielpourtous, Lokki, Funbooker, Malt, PagesJaunes/118712). Every result card answers the same 5 questions: **photo, rating + review count, area, "à partir de" price, response time**.

spectre-events.fr answers that checklist on almost none of its pages, and it uses **one URL (/sonorisation/) with three JS tabs** to serve three different intents (wedding, corporate, private party), each given about 70 words. The tab panels share one title and one H1 ("Nos prestations son et lumières"), the default tab is Corporate, and the `#mariages` fragment exists only in the site's own menu. Google ignores fragments, so a couple arriving from Google lands on corporate content.

Two consequences:
1. **Ranking:** a site about one month old (first commits Oct 2026) with 8 pages will not outrank directories on head terms in the near term. The near-term organic channel is **being listed on those directories**, and the site becomes the conversion destination.
2. **Conversion:** visitors arriving from a directory card (with prices and 200-600 reviews) find no price, no review count and only first-name testimonials. That is a trust drop at the decision stage.

---

## 1. Keyword to page map

| # | Query cluster (FR) | Intent / stage | SERP dominant type (observed consensus) | Price visible in SERP? | Current target page | Mismatch | Recommended target |
|---|---|---|---|---|---|---|---|
| 1 | DJ mariage Paris / DJ mariage Île-de-France | Commercial, local, decision | Directory listing + vendor profiles on directories (~80%, 13/16) | Yes: from 450 € to 1 490 € (Mariages.net cards), 490-2 500 € on vendor profiles | /sonorisation/#mariages (tab) | **HIGH** (generic service page with no local or wedding focus vs directory/local SERP) | New `/dj-mariage/` + Mariages.net/Bridebook listing |
| 2 | sonorisation événementielle Paris / sonorisation séminaire | Commercial B2B, local | Mixed: directories/annuaires (~64%), noise (PDFs, manufacturers ~30%), no strong vendor page | Rarely | /sonorisation/ | **MEDIUM** (right type, wrong H1/title, no location, diluted) | Keep /sonorisation/ as technical hub (conférence, micros, L-Acoustics, écran) |
| 3 | location sono Paris / location sonorisation Île-de-France | Transactional, rent | Rental marketplace / product listings (Lokki "85 loueurs", Lightyshare per-day listings): 100% of relevant results | Yes (per day: e.g. 159 €/jour pack, 110-170 € packs) | /location/ | **MEDIUM-HIGH** (price list is the right type but lacks product-page elements: photos, unit, deposit, delivery, availability, H1) | Rebuilt /location/ + Lokki listing |
| 4 | location enceinte soirée (Paris) | Transactional, consumer | Marketplace product listings (P2P) | Yes, per day | /location/ ("Petite sono" 120 €) | **MEDIUM** | /location/ with a "Pack enceinte soirée" product block |
| 5 | borne photo mariage Paris / location photobooth mariage | Commercial, decision | Vendor profiles on Mariages.net (12/18), Bridebook, Lokki, Naboo (~95% directories) | Yes: 229-600 €, 350-550 €/24 h, from 450 € | /photographie/#borne (tab) | **HIGH** (H1 "Nos prestations visuelles", no price, about 70 words) | New `/borne-photo/` |
| 6 | location borne photo Paris prix soirée entreprise | Commercial investigation | Price guides (Plateya "prix comparatif 2026", ~25%) + marketplaces with prices (Funbooker 890 € HT/4 h, Lokki 200-300 €) | Yes | /photographie/#borne | **CRITICAL** for price-modified queries (no price, no guide) | /borne-photo/ with price block + FAQ |
| 7 | animation soirée entreprise Paris / DJ soirée d'entreprise Paris | Commercial B2B | 1001salles PRO listings (15/17 ≈ 88%), Malt profiles | Yes: "à partir de 300-1 090 € HT" | /sonorisation/#corporate or /entreprises/ | **HIGH** (no dedicated DJ-corporate page, no price) | `/dj-soiree-entreprise/` (or a strong section on /entreprises/) + 1001salles PRO listing |
| 8 | organisation événement entreprise clé en main Paris / agence soirée d'entreprise | Commercial B2B, consideration | Agency directories (Sortlist, 1001salles agence, 118712, Paris je t'aime convention) ~85% + agency service pages | Sometimes (packages from 150 € HT/pers) | /entreprises/ | **ALIGNED → MEDIUM** (right type; lacks references, budget/head, case studies) | /entreprises/ (strengthen) |
| 9 | DJ mariage Vendée / DJ mariage Pays de la Loire | Commercial, local | Directories 100% (6/6: Mariages.net ~65 vendors, Bridebook, Evenementielpourtous) | Yes: 590-1 190 €, from 800 €, from 990 € | none (Vendée only in home FAQ) | **HIGH (missing page)** | `/dj-mariage-vendee/` (one page, only with real local proof) |
| 10 | DJ anniversaire Paris / DJ soirée privée / DJ rallye | Mixed (venue + DJ) | Venue listicles (Privateaser ~60%), DJ directories ~25%, Malt | Sometimes (220 €/2 h kids party) | /sonorisation/#privees (tab) | **MEDIUM** | `/dj-anniversaire-soiree-privee/` (later) |
| 11 | bar à vinyles mariage / animation bar à vinyles | Commercial niche | Dedicated vendor profiles on Mariages.net (~75%), ABC Salles articles, Funbooker | Yes: 400-895 €, 15 € HT/pers | none (an option line "Sur devis" on /sonorisation/) | **HIGH (missing page; differentiator buried)** | `/bar-a-vinyles/` |
| 12 | prix DJ mariage / combien coûte un DJ mariage | Informational, awareness | Guides / marketplace cost guides (avg "1 280 €" in France) | Yes (ranges) | none (home FAQ: "le tarif dépend…") | **MEDIUM (missing content)** | Guide `/prix-dj-mariage/` or rich FAQ on /dj-mariage/ |
| 13 | budget soirée d'entreprise par personne Paris | Informational B2B | Guides (1001salles 60-180 €/participant, Schlouk Map, Plateya) | Yes | none | **LOW-MEDIUM** | Guide or FAQ block on /entreprises/ |
| 14 | traiteur événementiel / traiteur mariage | Commercial | Caterer sites + directories, per-person pricing (Plateya 18-95 € HT/pers) | Yes | /traiteur/ (partner page, H1 "À table, entre bons vivants.") | **HIGH** (partner showcase, not a caterer service page; partner brand returns no results) | Do not chase head terms; reposition as an add-on |
| 15 | photographe mariage Paris | Commercial, very crowded | Directories + photographer portfolios | Yes | /photographie/#photo | **CRITICAL** (portfolio shows sound-installation photos) | Remove or replace before targeting |
| 16 | Spectre Events (brand) | Navigational | Not found in sampled index; nearest match "Spectre Entertainment (ex-Groupe Spectre Sonore)" | n/a | / | Brand-entity gap | GBP + directory profiles + sameAs |

---

## 2. SERP backwards analysis (what Google rewards)

### 2.1 "DJ mariage Paris"
- Results: mariages.net category page (H1 "DJ mariage Paris", 80 results, 36/page) + mariages.net vendor profile, Bridebook, PagesJaunes, WeddingWire x2, Evenementielpourtous x2, Malt x2, Behance, fixthemusic, 118712. No independent vendor site was in the observed set.
- Directory card fields (fetched): photo + "Voir N autres photos", PREMIUM badge, rating /5 + **review count (224-637)**, city, short description, **"À partir de" price**, promotion (-10%), "Nous contacter", **"Réponse en 24 heures"**.
- Filters (the user's mental model): price buckets **<400 / 400-600 / 600-800 / 800-1 000 / >1 000 €**; services (musique cocktail, cérémonie, soirée dansante, animation, audiovisuel, karaoké, DJ); styles (latino, oriental, pop, rock, disco…); Wedding Awards winners.
- Example cards: FCCV from 1 200 € (4.9, 226 avis); Mon DJ Antillais from 450 € (4.9, 623); Fiestamania from 850 € (4.9, 637); Lol Evènements from 600 € (4.9, 435); Mix-Moving from 500 € (5.0, 224).
- **What wins:** price anchor + volume of reviews + photos + named style/specialty + response time.

### 2.2 "sonorisation événementielle Paris"
- Results: Malt freelancers, annuaires (118712 x2, PagesJaunes x2, Mappy, Spectable x2), Evenementielpourtous, Mariages.net vendor, Lokki, plus noise (Yamaha, PDFs, eduscol, Sonovente news).
- **Low-quality, fragmented SERP**: Google has no clear vendor-page winner. A focused technical service page (conférence, séminaire, micros HF Shure, diffusion L-Acoustics, écran, capacity in m² and pax, reference venues) has a real chance on long-tail variants ("sonorisation séminaire Paris", "location sono conférence", "sonorisation L-Acoustics événement").

### 2.3 "location sono Paris" / "location enceinte soirée"
- Relevant results: Lokki ("85 loueurs de sono à Paris", peak season Jun-Sep advice), Lightyshare listings (Bose L1 Pro16; JBL Partybox 720 at 159 €/jour; QSC K8), Sonovente location packs mariage, Naboo "Pack 1 110 € (50-100 pers) / Pack 2 170 € with sub".
- **What wins:** per-item product cards with photo, price per day, capacity in persons, what is delivered (bag, cables), delivery/pickup terms, availability.
- spectre-events.fr is one of the few vendor sites that **shows prices** (120 € / 300 € / 60 € / 150 €). That is a real asset, but it sits on a 135-word page with **no H1, no product photos, no unit (jour? week-end?), no TTC/HT, no caution, no delivery fee**.

### 2.4 "borne photo mariage Paris" / "location borne photo prix"
- 12/18 results are Mariages.net vendor profiles (FotoBorne, ShootnBox, Ecobooth, Wizito, Sharingbox, Atelier Booth, Wedstory…), plus Bridebook, Lokki, Naboo.
- Prices are surfaced: Sharingbox 229-600 €, Wedstory 350-550 €/24 h, Atelier Booth from 450 € (book 4-6 weeks ahead), Funbooker 890 € HT/4 h + 100 € HT/h, Lokki 200-300 €/soirée, Plateya guide 350-600 € typical, 1 200-2 500 € HT prestige.
- Included-items checklist users compare: duration, number of prints (illimité vs 400), animateur/hôtesse, custom template, digital gallery, delivery/installation, booking lead time.
- spectre-events.fr has unlimited prints, delivery/installation, custom frame and online gallery, but **no price, no duration, no sample print image, no "vintage" visual proof beyond 2 photos**.

### 2.5 "animation / DJ soirée d'entreprise Paris"
- 1001salles PRO dominates (15/17), plus Malt. Cards show "Tarification par type d'événement – Soirée d'entreprise, à partir de 450 € HT"; ranges 300-1 090 € HT; travel radius (80-130 km).
- **What wins:** HT price by event type, travel radius, reviews from companies.

### 2.6 "organisation événement entreprise clé en main Paris"
- Agency directories (Sortlist x2, 1001salles agence x5, 118712, Evenementielpourtous x3), Paris je t'aime convention-bureau listings, one editorial article. Budget guides elsewhere put Paris corporate evenings at **60-180 €/participant**; packages from 150 € HT/pers (Funbooker).
- **What wins:** agency profile with references/portfolio, team, formats, per-head budget indications.

### 2.7 "DJ mariage Vendée"
- 6/6 directories. Mariages.net lists about 65 Vendée vendors; DJ WDR 590-1 190 €, DCS from 800 € (24 h response), ToniiX from 990 €.
- **Smaller, less saturated market**: a genuine local page plus a Mariages.net Vendée listing is realistic.

### 2.8 "bar à vinyles mariage"
- Mariages.net has **dedicated bar-à-vinyles vendors** (Loire Vinyle Box, Le Bac à Vinyles, Tout en Vinyle, Swing la Vie, Lolo Waymel…), with prices of 400-895 € or 15 € HT/pers. One DJ promotes "bar à vinyles offert (300 €)".
- spectre-events.fr's "+500 vinyles" is a **distinct, searchable product**, yet it has no page.

### 2.9 Informational (awareness) SERPs
- "combien coûte un DJ mariage": cost guides (fixthemusic "prix moyen 1 280 €" France, Linkaband, frenchweddingstyle). Answer format: range + drivers (duration, matériel, déplacement, heures sup).
- "budget soirée d'entreprise par personne": guides (1001salles, Schlouk Map, Plateya). Answer format: €/pers ranges by format (afterwork / cocktail / dîner).

### 2.10 SERP features
- The sampling engine does not expose Google SERP features (local pack, PAA, ads, AI Overview). Local intent is still evident: city in every directory H1, "inclure villes à 50 km" filters, "near me"-style radius fields. **Assume a local pack on google.fr for #1, #3, #5, #7, #9** and verify manually.

---

## 3. Page-type classification and mismatches (target pages)

| Page | Taxonomy type | H1 (actual) | Words in main | Key gaps | Severity |
|---|---|---|---|---|---|
| / | Landing Page (brand) | "L'élégance se remarque. La technique, jamais." (no keyword) | ~1 390 | Strongest page. Text-only hero (no photo above fold); no price anchor; testimonials first-name only (Valenciennes, Angers: outside main zones) | MEDIUM |
| /entreprises/ | Service Page | "Votre événement d'entreprise, clé en main." | ~920 | No client references/logos/case studies; only 1 true corporate testimonial ("Emma, soirée corporate"), the second is the anniversary client from the home page relabeled "Astrid, Paris"; no budget/head; no capacity; no SIRET/RC Pro; no schema | ALIGNED → MEDIUM |
| /sonorisation/ | Service Page (multi-intent tabs) | "Nos prestations son et lumières" | ~510 split across 3 tabs + intro | One URL for 3 intents; default tab = Corporate; about 70 words per intent; no price; no FAQ; no reviews; no location in H1/title; bar à vinyles buried as "Sur devis" | **HIGH** |
| /photographie/ | Service Page (multi-intent tabs) | "Nos prestations visuelles" | ~200 visible | Borne + photographer merged; **Photographe tab displays sound-installation photos** (mariage-1/2/3 from /sonorisation/, alt "Sonorisation d'une cérémonie de mariage"); no price; 2 borne photos | **HIGH** (borne) / **CRITICAL** (photographe) |
| /traiteur/ | Partner showcase (closest: Service Page) | "À table, entre bons vivants." | ~300 | No "traiteur" in H1; no menus, no €/pers; partner returns no search results; partner email exposed; **mobile burger menu broken** (inline script uses `getElementById('menu')` but the nav id is `nav-principale`, so click and scroll handlers throw TypeError) | HIGH |
| /location/ | Product list (thin) | **none** (H2 "Location de matériel") | ~135 | No H1, no hero, **zero product photos**, price unit unclear, no TTC/HT, no caution/deposit, no delivery fee/zone, no pickup option, no rental conditions; CTA "Réserver du matériel" leads to a form with **no "Location" option** and no date-range field | **HIGH** |
| /contact/ | Conversion page | **none** (H2 "Demande de devis") | ~155 | No H1; form lacks "Location de matériel" and budget field; no per-service prefill except ?type=entreprise | MEDIUM |
| /mentions-legales/ | Legal | OK | n/a | No SIRET / legal form / RCS: trust gap for B2B buyers (and a legal-notice obligation; verify with /seo content or a legal check) | MEDIUM (trust) |

Site-wide observations:
- **No imagery above the fold on any page.** Heroes are text on a coloured grid; H1 font is 3.25-6.15 rem, so on mobile the first screen is H1 plus 2-3 lines. Directories lead with photos.
- **Schema only on the home page** (EntertainmentBusiness without streetAddress, areaServed includes "France", plus FAQPage). No Service/Offer, no Product/Offer on /location/ despite visible prices, no BreadcrumbList.
- **No analytics or GSC verification tag in source.** Every "how to know it failed" signal below depends on measurement (GSC may be DNS-verified; confirm).
- **No video** anywhere (DJ/sound buyers want to hear and see the setup).
- Reviews: 4 on-site quotes, first names only, no dates, no source, no aggregate. Directory competitors show 4.9★ with 200-600 reviews.

---

## 4. Missing pages (by expected impact)

| Missing page | Why (SERP evidence) | Priority |
|---|---|---|
| `/dj-mariage/` (DJ & sonorisation de mariage, Paris & Île-de-France) | #1 commercial cluster; wedding intent is currently a hidden tab; directories show the info set users need | High |
| Directory/GBP profiles (Mariages.net, Bridebook, 1001salles PRO, Funbooker, Lokki, Google Business Profile as a service-area business) | 80-100% of money-keyword results are these platforms | High (off-site) |
| `/borne-photo/` | Separate SERP (Mariages.net borne vendors, price guides); currently a tab sharing an H1 with photographer | Medium-High |
| `/bar-a-vinyles/` | Dedicated vendor category on Mariages.net with prices; Spectre differentiator | Medium |
| `/dj-soiree-entreprise/` (or merge into a stronger /entreprises/ section + /sonorisation/ as B2B tech hub) | 1001salles PRO dominance with HT prices by event type | Medium |
| `/dj-mariage-vendee/` (Vendée & Pays de la Loire) | 100% directory SERP, smaller market, no page today | Medium (only with real local proof) |
| Price content (`/tarifs/` or "À partir de" blocks + guide `/prix-dj-mariage/`) | Price is visible in nearly every SERP result; Spectre FAQ refuses ranges | High (blocks) / Low (guide) |
| `/dj-anniversaire-soiree-privee/` (anniversaires, rallyes, soirées étudiantes) | Mixed SERP; rallye/étudiant niche is under-served | Low |
| City pages (Versailles, Boulogne, Neuilly…) | Do **not** build now: thin doorway risk, no local proof yet | Not recommended (yet) |

---

## 5. User stories (SERP-derived)

1. **Consideration / Decision: couple planning a wedding in Île-de-France**
   As a couple comparing wedding DJs, I want to see a starting price, what's included and reviews from other couples before I ask for a quote, because directories show me "à partir de 450-1 200 €" next to 4.9★ (200-600 avis) for every competitor, but I'm blocked by a **price and trust gap**: Spectre shows neither, and the wedding content opens on a Corporate tab.
   *Signals: Mariages.net card fields (price-from, rating, review count, "Réponse en 24 h"); price filter buckets <400/400-600/600-800/800-1 000/>1 000 €; vendor profiles "490 € à 2 500 €".*

2. **Decision: office manager / corporate event lead**
   As the person organising the year-end party, I want a per-head budget range, references from similar companies and an HT price I can forward to my manager, because I must justify the supplier, but I'm blocked by **missing references and budget indicators** (no logos, one first-name testimonial, no €/pers).
   *Signals: 1001salles PRO cards "Soirée d'entreprise à partir de 450 € HT"; budget guides 60-180 €/participant; Funbooker packages "à partir de 150 € HT/pers"; Sortlist agency profiles with portfolios.*

3. **Decision: gear-only renter**
   As someone throwing a party who only needs speakers, I want price per day/week-end, delivery cost, deposit and availability for my date, because marketplaces show this instantly, but I'm blocked by **unclear terms and no product photos**, and the "Réserver" button leads to an event-quote form without a rental option.
   *Signals: Lokki "85 loueurs" with season advice; Lightyshare per-day listings (159 €/jour) "livré avec housse et câble"; Naboo packs 110/170 € by guest count.*

4. **Consideration: borne-photo buyer (wedding or corporate)**
   As a buyer comparing photobooths, I want to compare duration, print count, animator and price, because guides and listings put these side by side (350-600 € typical; 890 € HT/4 h), but I'm blocked by **comparison fatigue**: Spectre's borne is a tab with about 70 words, 2 photos and no price.
   *Signals: Plateya "location photobooth Paris prix comparatif 2026"; Funbooker 890 € HT/4 h + 100 €/h; Mariages.net borne profiles 229-600 €; "réserver 4-6 semaines à l'avance".*

5. **Awareness: couple budgeting early**
   As a newly engaged couple, I want to know what a wedding DJ typically costs and what drives the price, because I'm building a budget, but I'm blocked by an **information gap**: Spectre's FAQ says "le tarif dépend…" without a range, so cost guides capture this stage.
   *Signals: cost guides ranking for "combien coûte un DJ mariage" ("prix moyen 1 280 €" France); budget guides.*

---

## 6. SXO Gap Score (per page, vs. its primary query)

Scale: Page Type 15, Content Depth 15, UX Signals 15, Schema 15, Media 15, Authority 15, Freshness 10 = 100.

| Page (primary query) | Type | Depth | UX | Schema | Media | Authority | Fresh | **SXO Gap Score** |
|---|---|---|---|---|---|---|---|---|
| / ("DJ événementiel Paris", brand) | 10 | 12 | 11 | 10 | 5 | 5 | 6 | **59** |
| /entreprises/ ("organisation soirée d'entreprise clé en main Paris") | 12 | 10 | 11 | 2 | 6 | 4 | 7 | **52** |
| /sonorisation/ ("DJ mariage Paris" / "sonorisation événementielle Paris") | 6 | 5 | 8 | 2 | 8 | 3 | 6 | **38** |
| /photographie/ ("borne photo mariage Paris") | 6 | 4 | 7 | 0 | 5 | 2 | 5 | **29** |
| /traiteur/ ("traiteur événementiel") | 6 | 5 | 4 | 0 | 6 | 2 | 5 | **28** |
| /location/ ("location sono Paris") | 8 | 3 | 5 | 0 | 0 | 2 | 5 | **23** |

Evidence notes:
- **Type:** /sonorisation/ and /photographie/ lose points for multi-intent tabs on one URL; /location/ has the right "price list" type but none of the product-page elements.
- **Depth:** about 70 words per intent on tabbed pages; no price ranges, inclusions or FAQ outside the home page.
- **UX:** clear CTAs everywhere (+); text-only heroes, wrong default tab for wedding visitors, missing H1 on /location/ and /contact/, broken mobile menu on /traiteur/ (−).
- **Schema:** home only (EntertainmentBusiness + FAQPage). No Service/Offer/Product/Breadcrumb.
- **Media:** real photos of their own installations (+), lightbox (+); none above the fold, no video, photographer tab uses sound photos, /location/ has zero gear photos, 6 image files named "WhatsApp-Image-…" (unused or unoptimised naming).
- **Authority:** 4 first-name quotes, no third-party review source, brand not found in sampled search index, partner caterer not findable, no SIRET in legal notice.
- **Freshness:** sitemap lastmod Oct/Nov 2026, © 2026 (+); no dated event references or "saison 2027" availability (−).

Site-level weighted SXO Gap Score (weighted by commercial value: sonorisation 35%, entreprises 20%, home 15%, photographie 15%, location 10%, traiteur 5%): **≈ 42 / 100**.

---

## 7. Persona scoring

### Persona cards

**P1: Wedding couple, Paris/IDF**
- Role: engaged couple, 6-18 months before the date. Goal: book a DJ (+ borne, maybe bar à vinyles) within budget.
- Emotional state: evaluating carefully, with comparison fatigue. Stage: Consideration → Decision.
- Key questions: How much from? What's included (cérémonie, cocktail, heures sup)? Proof from other couples / our type of venue?
- SERP evidence: Mariages.net/Bridebook dominance; price filter buckets; review counts 224-637.
- Landing page: /sonorisation/ (#mariages tab).

**P2: Corporate event manager / office manager**
- Role: office manager, HR/communication lead, assistant de direction. Goal: year-end party / séminaire / inauguration, one supplier, defensible budget.
- Emotional state: risk-averse. Stage: Consideration → Decision.
- Key questions: €/pers or HT range? References like us? Invoicing, insurance, capacity, lead time?
- SERP evidence: 1001salles PRO HT pricing by event type; Sortlist agency profiles; budget-per-head guides.
- Landing page: /entreprises/ (and /sonorisation/#corporate).

**P3: Private party host (anniversaire, rallye, soirée étudiante)**
- Role: individual or student association. Goal: DJ + sound for 50-1 000 guests, often in a rented venue.
- Emotional state: price-sensitive, time-pressed. Stage: Consideration.
- Key questions: Price for X hours? Works in my venue (salle, jardin, chapiteau)? Noise limits?
- SERP evidence: Privateaser venue listicles, Malt DJ profiles, "220 € / 2 h" style prices, Evenementielpourtous.
- Landing page: /sonorisation/ (#privees tab).

**P4: Gear-only renter**
- Role: private host or small organiser who will DJ themselves. Goal: rent speakers/lights for a date.
- Emotional state: ready to buy. Stage: Decision.
- Key questions: Price per day/week-end? Delivery or pickup, and where? Deposit? Available on my date? What it looks like?
- SERP evidence: Lokki marketplace, Lightyshare per-day listings, Naboo packs by guest count.
- Landing page: /location/.

**P5: Borne-photo buyer (wedding or corporate)**
- Goal: book a photobooth only. Stage: Consideration.
- Key questions: Price for how many hours? Prints included? Animator? Custom template? Sample output?
- SERP evidence: Plateya price guides, Funbooker 890 € HT/4 h, Mariages.net borne vendors 229-600 €.
- Landing page: /photographie/ (#borne tab).

**P6: Vendée / Pays de la Loire couple**
- Goal: wedding DJ in Vendée. Stage: Consideration.
- SERP evidence: "DJ mariage Vendée" is 100% directories (about 65 vendors, 590-1 190 €).
- Landing page: none (home FAQ mention only).

### Scores (sorted weakest first)

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P6 Vendée couple (home) | 5 | 3 | 8 | 12 | **28** | Critical Mismatch |
| P4 Gear renter (/location/) | 17 | 12 | 6 | 8 | **43** | Needs Work |
| P5 Borne buyer (/photographie/#borne) | 13 | 9 | 8 | 13 | **43** | Needs Work |
| P1 Wedding couple (/sonorisation/#mariages) | 12 | 10 | 9 | 15 | **46** | Needs Work |
| P3 Private host (/sonorisation/#privees) | 13 | 10 | 10 | 14 | **47** | Needs Work |
| P2 Corporate manager (/entreprises/) | 21 | 17 | 11 | 20 | **69** | Good |

Evidence per persona:
- **P6:** Vendée appears only in the home FAQ and schema areaServed. The only nearby proof is "mariage à Angers". The contact form works, so Action is not zero.
- **P4:** Prices are visible (rare in this SERP, so Relevance 17), but there is no H1, no unit, no TTC/HT, no deposit or delivery fee and zero gear photos. "Réserver du matériel" opens a form whose event types and prestations have **no rental option** and only a single date field.
- **P5:** Unlimited prints, delivery/installation, custom frame and gallery are listed. H1 "Nos prestations visuelles", no price, no duration, 2 photos, no sample print.
- **P1:** Arriving from Google (no fragment), the visitor sees "Nos prestations son et lumières" and the **Corporate** tab first. The wedding panel has 4 bullets (cérémonie option, micros/vidéoprojecteur, soirée dansante, rendez-vous de préparation) and lacks price, end time/overtime, playlist process, venue experience and any couple reviews on the page (the 2 wedding quotes are on the home page only).
- **P3:** About 70 words (good mention of rallyes/soirées étudiantes and "5 000 personnes"); no price, no noise-limiter or venue guidance, testimonial only on the home page.
- **P2:** Dedicated page, clear 4-step process, prefilled CTA (`?type=entreprise`), phone. Trust is the gap: one corporate quote with no company, a relabeled private testimonial, no logos/case studies/SIRET/RC Pro, no budget-per-head indicator.

### Weakest persona: P6 Vendée couple (28/100); highest-value weak persona: P1 Wedding couple (46/100)
- P6 has the lowest score but lower volume. Fix only if Vendée is a real, staffed market (one page, real local proof).
- **P1 carries the largest search demand and value**, so it gets the first build slot.

### Systemic issues
- **Trust is the lowest dimension across all personas** (avg 8.7/25): no verifiable reviews, no aggregate, no client references.
- **Clarity on price is absent everywhere** (except /location/), while nearly every SERP card shows a price.
- **Action friction for non-standard intents:** the form assumes "event + prestations"; renters and borne-only buyers do not fit.

### Priority actions (persona-driven)
1. P1: build `/dj-mariage/` (section list in rec H1 below).
2. Systemic trust: verifiable reviews (GBP + Mariages.net) and named, dated, venue-tagged testimonials on each intent page.
3. P4: rebuild /location/ as product cards plus a rental-specific form path.
4. P5: `/borne-photo/` with price and inclusions table.
5. P2: add a references/case-studies block and a B2B trust row to /entreprises/.
6. P6: Vendée page only when real local proof exists.

---

## 8. Recommendations (each with a failure signal)

Prerequisite (High, enabler): **install measurement**: Google Search Console (confirm verification) and privacy-friendly analytics (e.g. Plausible/Matomo) with events for "Demander un devis" clicks, `tel:`, WhatsApp and form submit by `type`. *Failed if:* after 2 weeks you still cannot report impressions per URL and quote submissions per event type.

### High
- **H1. Build `/dj-mariage/`** (title e.g. "DJ mariage à Paris et en Île-de-France | Spectre Events"; H1 "DJ et sonorisation de mariage à Paris et en Île-de-France"). Sections, in order:
  1. Hero with a real wedding dance-floor photo, "À partir de X €" (soirée dansante, until Y h), a "Vérifier ma date" CTA and phone/WhatsApp.
  2. "Ce qui est inclus": cérémonie / vin d'honneur / dîner / soirée.
  3. "Votre déroulé, étape par étape": préparation meetings, playlist, première danse.
  4. Options: bar à vinyles, effets (étincelles froides), borne.
  5. Lieux où nous avons joué (named châteaux/domaines).
  6. Avis de mariés: name, venue, month/year, link to source.
  7. Wedding-specific FAQ: heures sup, limiteur sonore, fin de soirée, déplacement, acompte.
  8. Devis CTA prefilled `?type=mariage`.

  Keep /sonorisation/ as the technical/B2B hub and point the "Mariages" menu entry at the new URL. *Failed if:* 10-12 weeks after indexing the URL has fewer than ~50 impressions/month on "dj mariage*" queries or an average position below 40, or "Mariage" quote submissions do not rise against the pre-launch baseline.
- **H2. Show price anchors on every service page**: "À partir de" for DJ mariage, soirée d'entreprise (HT), soirée privée and borne; inclusions; overtime rate. Replace the home FAQ answer "Le tarif dépend…" with a range plus drivers. *Failed if:* quote volume does not change and the share of out-of-budget leads does not fall over 8 weeks, or GSC CTR on those pages stays flat.
- **H3. Get listed where the SERP is**: Mariages.net and Bridebook (wedding), 1001salles PRO and Funbooker (corporate), Lokki (rental), Google Business Profile as a service-area business (address hidden), with consistent NAP and links back to the matching intent page. Ask the 120 past clients for reviews. *Failed if:* fewer than 10 reviews on GBP and Mariages.net combined after 90 days, or zero leads from directories after 60 days. → `/seo local`
- **H4. Proof overhaul**:
  - Named, dated, venue-tagged testimonials on each intent page, linking to the review source.
  - Corporate references (company names/logos with permission) and 2-3 mini case studies (guests, venue, setup, outcome).
  - Fix the relabeled "Astrid, Paris" quote on /entreprises/ (it is an anniversary client).
  - **Replace the Photographe tab images**, which are sound-installation photos, with the photographer's real work, or remove the photographer offer until a portfolio exists.

  *Failed if:* on-page conversion (quote clicks / sessions) on /entreprises/ and /dj-mariage/ does not improve within 8 weeks of the change.
- **H5. Keyworded H1s and titles**:
  - /sonorisation/: "Sonorisation et éclairage d'événements à Paris et en Île-de-France". Keep the tagline as a subtitle.
  - /photographie/: "Borne photo et photographe pour mariages et soirées d'entreprise".
  - /traiteur/: "Traiteur pour vos événements : cocktails, dîners et buffets".
  - /location/: add an H1, "Location de sono et d'éclairage à Paris et en Île-de-France".
  - /contact/: add an H1.

  *Failed if:* after 6-8 weeks these URLs still receive only brand queries in GSC.
- **H6. Fix the /traiteur/ mobile menu**: the inline script calls `document.getElementById('menu')`, but the nav is `#nav-principale`, so the burger click throws a TypeError. Use the shared `/js/header.js` and `/js/sous-menu.js` like the other pages. Also remove the duplicate unversioned `style.css` include and the `../../images/apple-touch-icon.png` path. *Failed if:* on a 375 px viewport the burger still does not open or the console shows errors.
- **H7. Rebuild /location/ as product cards**:
  - Photo per pack, capacity, price with unit and TTC/HT, caution amount.
  - Delivery/installation fee by zone, pickup option and address area, rental conditions.
  - A "Location de matériel" option and a date-range field in the contact form (or `?type=location` prefill).
  - Product/Offer schema.

  *Failed if:* after 3 months there are fewer than 100 impressions/month on "location sono*" / "location enceinte*" queries, or zero rental requests via the form.

### Medium
- **M1. `/borne-photo/` page**: price from, duration, prints, template examples, sample print photo, short video, booking lead time; corporate and wedding use cases. *Failed if:* fewer than 50 impressions/month on "borne photo*" after 3 months.
- **M2. `/bar-a-vinyles/` page**: the differentiator (500+ disques, genres, how it works, photos/video, price from or €/pers). *Failed if:* no impressions on "bar à vinyles*" after 3 months, or the option is never ticked in the form.
- **M3. `/dj-mariage-vendee/`**: one page only, with real local proof (venues played, Pays de la Loire couples, logistics, travel terms). *Failed if:* fewer than 50 impressions/month on "dj mariage vendée" after 3 months, or no Vendée leads in 6 months (then noindex/merge to avoid a thin doorway page).
- **M4. Above-the-fold visuals**: a real event photo or short muted video in every hero, smaller hero H1 on mobile, and phone/WhatsApp in the hero on wedding and private pages. *Failed if:* hero CTA click-through does not improve against baseline over 4 weeks.
- **M5. Structured data**: Service + Offer per service page, Product/Offer on /location/, consistent LocalBusiness (service-area, no "France" catch-all), BreadcrumbList. Do not self-markup AggregateRating from on-site quotes. *Failed if:* Rich Results Test / GSC enhancements report errors, or no Merchant/Product detection on /location/. → `/seo schema`
- **M6. B2B trust row on /entreprises/**: SIRET, legal form, RC Pro insurance, invoicing for companies, capacity (40-5 000), lead time, downloadable 1-page plaquette PDF, a budget-per-head indicator by format. Also add SIRET to /mentions-legales/. *Failed if:* corporate leads still ask for these basics in first replies (track in CRM notes).
- **M7. Split /sonorisation/ remaining intents**: after /dj-mariage/ proves out, give soirée d'entreprise and soirée privée/anniversaire/rallye their own URLs, and repoint the menu anchors. *Failed if:* the split URLs cannibalise each other (same queries flipping between URLs in GSC).

### Low
- **L1. Price guides**: "Prix d'un DJ de mariage en Île-de-France (2027)" and "Budget d'une soirée d'entreprise à Paris par personne", internally linked to the service pages. *Failed if:* no top-20 positions on the guide queries after 4 months.
- **L2. Reposition /traiteur/** as an add-on within the clé-en-main offer: menu examples, €/pers range, where the partner operates. Do not target "traiteur Paris" head terms; the partner has no findable web presence. *Failed if:* the traiteur option share in quote requests does not rise.
- **L3. No mass city pages** (Versailles, Boulogne…) until H1-H4 are live and there is real per-city proof. *Failed if (should you do it anyway):* city pages are indexed but get under 10 impressions/month each, which is the doorway signature.

---

## 9. Cross-skill referrals
- Local intent in every money SERP: `/seo local` (GBP as service-area business, directory NAP consistency, review acquisition).
- Missing Service/Offer/Product/Breadcrumb schema: `/seo schema`.
- E-E-A-T and trust gaps (named testimonials, references, legal identity, partner credibility): `/seo content`.
- Thin pages (/location/, /photographie/, /traiteur/): `/seo page`.
- PDF report: `/seo google report`.

---

## 10. Limitations
- **SERPs were sampled with a US-located web search engine, not live google.fr.** Results include noise (e.g. Paris apartments for "location sono Paris", Paris TN), and **local pack, PAA, ads and AI Overview could not be observed**. Consensus percentages are based on the returned result sets and should be checked on google.fr (mobile, Paris geolocation).
- No search-volume or keyword-difficulty data; priorities are based on SERP composition and commercial value.
- No GSC, analytics or CRM data (none installed in source), so current rankings, impressions and conversion rates are unknown.
- The claude-seo Python runtime was not used (`render_page.py` / `parse_html.py`) per the task constraint. Pages were analysed from local source, which is identical to production. JS behaviour (tabs, menus) was inferred from code, not rendered.
- One directory page (Mariages.net DJ Paris) was fetched in full; Lokki returned HTTP 429. Other competitor details come from search snippets/summaries and are self-declared by vendors.
- Brand check: "Spectre Events" did not surface in the sampled index (possible indexation lag for a ~1-month-old site, or the engine's index). Verify with `site:spectre-events.fr` on google.fr.

---

## 11. Structured findings (JSON-compatible, category: Search Experience)

```json
{
  "category": "Search Experience",
  "sxo_gap_score_site": 42,
  "page_scores": {
    "/": 59, "/entreprises/": 52, "/sonorisation/": 38,
    "/photographie/": 29, "/traiteur/": 28, "/location/": 23
  },
  "primary_mismatch": {
    "severity": "HIGH",
    "summary": "Money-keyword SERPs are 80-100% directories/marketplaces showing price-from, rating+count, photos, area; site uses one tabbed /sonorisation/ URL for wedding, corporate and private intents with no price or verifiable reviews."
  },
  "findings": [
    {"id": "SXO-01", "severity": "High", "page": "/sonorisation/", "issue": "Three intents (mariage, corporate, privée) on one URL via JS tabs; default tab Corporate; ~70 words per intent; H1 lacks keyword/location", "fix": "Create /dj-mariage/ first; keep /sonorisation/ as technical B2B hub"},
    {"id": "SXO-02", "severity": "High", "page": "site-wide", "issue": "No price anchors while nearly all SERP results show 'à partir de' prices", "fix": "Add price-from + inclusions blocks per service"},
    {"id": "SXO-03", "severity": "High", "page": "off-site", "issue": "Absent from directories that occupy 80-100% of money SERPs; brand not found in sampled index", "fix": "Mariages.net, Bridebook, 1001salles PRO, Funbooker, Lokki, GBP (service-area)"},
    {"id": "SXO-04", "severity": "High", "page": "site-wide", "issue": "Trust lowest persona dimension: 4 first-name quotes, no source/aggregate, relabeled testimonial on /entreprises/, no corporate references", "fix": "Verifiable, named, dated, venue-tagged reviews; case studies; logos"},
    {"id": "SXO-05", "severity": "Critical", "page": "/photographie/#photo", "issue": "Photographer portfolio shows sound-installation photos", "fix": "Replace with real photographer work or remove offer"},
    {"id": "SXO-06", "severity": "High", "page": "/location/", "issue": "No H1, no gear photos, price unit/TTC/deposit/delivery unclear, form lacks rental option", "fix": "Product cards + rental form path + Product/Offer schema"},
    {"id": "SXO-07", "severity": "High", "page": "/traiteur/", "issue": "Mobile burger menu broken (getElementById('menu') vs #nav-principale)", "fix": "Use shared header.js/sous-menu.js"},
    {"id": "SXO-08", "severity": "High", "page": "/sonorisation/, /photographie/, /traiteur/, /location/, /contact/", "issue": "Non-descriptive or missing H1s", "fix": "Keyworded H1 incl. service + Paris/Île-de-France"},
    {"id": "SXO-09", "severity": "Medium", "page": "/photographie/#borne", "issue": "Borne photo has separate SERP with visible prices; currently a tab", "fix": "Dedicated /borne-photo/"},
    {"id": "SXO-10", "severity": "Medium", "page": "missing", "issue": "Bar à vinyles differentiator has a dedicated SERP category but no page", "fix": "/bar-a-vinyles/"},
    {"id": "SXO-11", "severity": "Medium", "page": "missing", "issue": "Vendée/Pays de la Loire served but no page; SERP 100% directories", "fix": "/dj-mariage-vendee/ with real local proof"},
    {"id": "SXO-12", "severity": "Medium", "page": "site-wide", "issue": "No imagery above the fold; no video", "fix": "Real event photo/video in heroes; phone/WhatsApp in hero"},
    {"id": "SXO-13", "severity": "Medium", "page": "site-wide", "issue": "Schema only on home; no Service/Offer/Product/Breadcrumb", "fix": "/seo schema"},
    {"id": "SXO-14", "severity": "Medium", "page": "/entreprises/, /mentions-legales/", "issue": "No SIRET/legal form/RC Pro/invoicing info for B2B buyers", "fix": "B2B trust row + legal notice completion"},
    {"id": "SXO-15", "severity": "High", "page": "site-wide", "issue": "No analytics/GSC tag in source; outcomes unmeasurable", "fix": "Install GSC + analytics with CTA/form events"}
  ],
  "personas": [
    {"name": "Vendée couple", "score": 28, "rating": "Critical Mismatch"},
    {"name": "Gear renter", "score": 43, "rating": "Needs Work"},
    {"name": "Borne-photo buyer", "score": 43, "rating": "Needs Work"},
    {"name": "Wedding couple IDF", "score": 46, "rating": "Needs Work"},
    {"name": "Private party host", "score": 47, "rating": "Needs Work"},
    {"name": "Corporate event manager", "score": 69, "rating": "Good"}
  ]
}
```

---

## Sources (SERP samples and fetched pages)
- [Mariages.net – DJ mariage Paris](https://www.mariages.net/musique-mariage/dj-mariage/paris)
- [Mariages.net – DJ Événement Paris](https://www.mariages.net/musique-mariage/dj-evenement-paris--e171986)
- [Mariages.net – DJ mariage Vendée](https://www.mariages.net/musique-mariage/dj-mariage/vendee)
- [Mariages.net – DJ WDR (Vendée)](https://www.mariages.net/musique-mariage/dj-wdr--e370927)
- [Mariages.net – Sharingbox](https://www.mariages.net/animation-mariage/sharingbox--e131434)
- [Mariages.net – Atelier Booth](https://www.mariages.net/animation-mariage/photobooth-paris-atelier-booth--e414299)
- [Mariages.net – Wedstory](https://www.mariages.net/animation-mariage/wedstory-photobooth--e315342)
- [Mariages.net – Le Bac à Vinyles](https://www.mariages.net/musique-mariage/le-bac-a-vinyles--e227524)
- [Bridebook – DJ Vendée](https://bridebook.com/fr/wedding-musicians-bands-djs/dj-disting-son-sonorisation-vendee-venansault-pays-de-la-loire-frEgQy4PgJ)
- [Evenementielpourtous – DJ mariage Vendée](https://www.evenementielpourtous.com/animation-dj/dj-mariage/pays-de-la-loire/vendee)
- [1001salles – DJ & animation musicale Paris](https://www.1001salles.com/dj-animation-musicale-3-paris-v.html)
- [1001salles PRO – Parisuperlive](https://www.1001salles.com/pro/dj-animation-musicale/26972-parisuperlive.aspx)
- [1001salles – Soirée d'entreprise Paris guide](https://www.1001salles.com/pro/blog/article/2608/about:blank)
- [Sortlist – Events & Company](https://www.sortlist.fr/agency/events-company)
- [Lokki – Location sono Paris](https://www.lokki.rent/location/paris/sono)
- [Lokki – Photobooth Paris](https://www.lokki.rent/location/paris/photobooth)
- [Lightyshare – JBL Partybox 720](https://www.lightyshare.com/en/annonce/show/40524)
- [Naboo – Storm sonorisation](https://www.naboo.app/en-ca/explorer/houses/storm-sonorisation)
- [Plateya – Location photobooth Paris prix 2026](https://www.plateya.fr/blog/detail/location-photobooth-paris-prix-comparatif-et-guide-complet-2026)
- [Funbooker – Animation borne photo Paris IDF](https://www.funbooker.com/fr/annonce/animation-borne-photo-avec-animateur-a-paris-et-en-idf/voir)
- [Privateaser – DJ anniversaire Paris](https://www.privateaser.com/location-salle/top-salles-ou-amener-son-dj-paris)
- [Fixthemusic – Wedding DJs France](https://www.fixthemusic.com/blog/best-wedding-djs-for-hire-france)
- [Linkaband – Wedding DJ France](https://linkaband.com/blog-musique/en/mariage/wedding-dj-france)
- [Schlouk Map – Organiser une soirée d'entreprise 2026](https://www.schlouk-map.com/fr/blog/comment_organiser_soiree_entreprise_guide_2026)
- [Plateya – Traiteur événementiel entreprise Paris 2026](https://plateya.fr/blog/detail/traiteur-evenementiel-entreprise-paris-2026-guide-plateya)
- [ABC Salles – Bar à vinyles](https://www.abcsalles.com/mag/inspiration/bar-vinyles-animation-fete)
- [GearFocus – Spectre Entertainment (brand-collision check)](https://gearfocus.com/brands/le-groupe-spectre-sonore-350)
