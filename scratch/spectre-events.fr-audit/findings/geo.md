# GEO / AI Search Readiness - spectre-events.fr

Audit date: 2026-11-11. Source: local repo (production HTML matched local files by MD5 for /, /entreprises/, /sonorisation/, /location/, /traiteur/, /contact/). Labels: [V] = verified fact, [I] = inference.

## AI Search Readiness score: 55 / 100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 55 | Some strong fact passages (rental prices and equipment models, capacities, +120 events). Service prices are missing, and much of the copy is brand prose. |
| Structural readability | 20% | 65 | Clean static HTML and an FAQ. /location/ and /contact/ have no H1. JSON-LD only on the homepage. |
| Multi-modal | 15% | 50 | Real event photos with descriptive alt text (WebP). No video, no captions, and some file names are WhatsApp-Image-*.webp. |
| Authority & brand | 20% | 15 | The domain is 1 month old. No legal identity on the site. No third-party mentions found. Same-industry homonym exists. |
| Technical accessibility | 20% | 88 | SSR/static, robots allows all bots, every AI user agent got a 200, sitemap present, HTTPS + HSTS. |

Weighted total = 13.75 + 13 + 7.5 + 3 + 17.6 = 54.9 -> **55**.

Platform estimates [I] (no live SERP or LLM access was available): Google AI Overviews ~40, ChatGPT Search ~30, Perplexity ~35, Bing Copilot ~30. These are limited mainly by the domain's age and by how little of it is indexed or mentioned elsewhere, not by the on-page work.

## 1. AI crawler access [V]

robots.txt: `User-agent: * / Allow: /` + Sitemap. There are no bot-specific rules, so every crawler below is allowed.
Homepage tested with curl using each user agent. Every request returned **HTTP 200 with 21,831 bytes** (the full SSR page). No WAF block was seen.

| User agent | Governs | Status | TTFB |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | 200 | 0.06 s |
| ChatGPT-User | ChatGPT user-triggered fetch | 200 | 0.09 s |
| GPTBot | OpenAI training only | 200 | 0.07-0.20 s |
| Claude-SearchBot | Claude search citations | 200 | 0.07 s |
| Claude-User | Claude user-triggered fetch | 200 | 0.16 s |
| ClaudeBot | Anthropic training only | 200 | 0.09 s |
| PerplexityBot | Perplexity index | 200 | 0.40 s |
| Perplexity-User | Perplexity user fetch | 200 | 0.47 s |
| Google-Extended | Gemini/Vertex training + grounding (NOT AI Overviews; AIO follows Googlebot) | 200 | 0.17 s |
| Googlebot | Google Search + AI Overviews | 200 | **4.1-5.1 s** |
| bingbot | Bing / Copilot / feeds ChatGPT search | 200 | 1.1-4.2 s |
| Applebot | Siri/Spotlight | 200 | 4.3 s |
| Applebot-Extended | Apple Intelligence training only | 200 | 0.27 s |
| CCBot | Common Crawl (training) | 200 | 4.1 s |
| cohere-ai | training | 200 | 0.29 s |

- [V] Search-engine user agents (Googlebot, bingbot, CCBot, Applebot, YandexBot) consistently get about 4 s TTFB. AI and browser user agents get under 0.5 s.
- [I] This looks like OVH verifying the bot by reverse DNS. These requests used spoofed user agents from a non-Google IP, so real Googlebot is probably unaffected. To confirm, check Search Console > Settings > Crawl stats (average response time).
- [V] /llms.txt 404, /llms-full.txt 404, /license.xml 404 (no RSL).
- [V] /.well-known/* returns **403**, even for paths that don't exist. Cause: the `.htaccess` rule `<FilesMatch "^\.">` matches the `.well-known` path segment. This is harmless today but would block security.txt, ACME or app-association files. Fix: exempt /.well-known/.
- [V] Dotfiles (.git, .github, .claude, .htaccess) correctly return 403.

## 2. Citability and entity clarity

### Citable passages that already work [V]
- /location/: indicative prices with exact equipment. Petite sono is 120 EUR (2 x 200 W, Shure mic, ~50 people). Grosse sono is 300 EUR (L-Acoustics 2 x 12XT 380 W RMS, 2 x SB118 600 W RMS, LA4 amplifier, Yamaha MG12, 2 Shure wireless mics, up to 400 people). Lumières sobres is 60 EUR and Lumières immersives is 150 EUR (Electroconcept, Wolfmix). Delivery across Ile-de-France. This is the most quotable page on the site.
- Homepage stats: +120 events, largest event 5,000 guests, 500+ vinyl records, quote within 24 h, capacity 40 to 5,000 people.
- /sonorisation/: rooms up to 1,000 m2, sparkular (cold sparks) and heavy fog options.
- Homepage FAQ: price, full event management, capacity, area served, booking lead time. It is mirrored in FAQPage JSON-LD.
- /entreprises/: a 4-step process (brief, proposal, preparation, event day). It extracts well.

### Gaps [V]
- No price or price range for DJ, sonorisation packages, the borne photo, the photographer or catering. "Combien coûte une prestation ?" answers "ça dépend". AI engines answering "prix DJ mariage Paris" have nothing to quote.
- Headings are mostly slogans ("L'élégance se remarque. La technique, jamais.", "À table, entre bons vivants."). Only the FAQ uses question-style headings.
- /location/ and /contact/ have **no H1**. Only the homepage has JSON-LD. There is no Service schema on service pages.
- There are no dates on the site (founding date, "mis à jour"). "Jeune maison" is the only age signal.

### Entity clarity: weak [V]
- "Spectre Events" is never defined in one self-contained sentence covering who, what, where, since when and what legal form.
- The founders appear by first name only ("Maxime et Andéol"). The full name of the directeur de publication appears only on /mentions-legales/, which is `noindex`.
- Mentions légales give **no legal form, SIREN/SIRET, RCS/RNE, registered address or VAT number**. [I] LCEN art. 6-III requires a business site to publish its registration number and address, so this is a compliance gap as well as an entity gap.
- Schema `EntertainmentBusiness` has only `addressRegion: Île-de-France` (no locality). There is no `legalName`, `foundingDate`, `founder`, `sameAs` or `identifier`. `areaServed` includes Vendée/Pays de la Loire, but the footer on every page says only "Paris & Île-de-France". The schema description mentions "rallyes", which the page copy barely mentions.
- Instagram link mismatch: the URL is `instagram.com/spectre_event/` but the visible label is `@spectre_events` (/contact/ and signature-mail.html). The correct handle could not be verified because Instagram shows a login wall.
- Partner name differs: the site writes "Beret et Papilles", while the partner brands itself **"Béret & Papilles"** (beretetpapilles.fr). /traiteur/ links only to their Instagram, not to their website.

## 3. Brand disambiguation [V]
| Homonym | Details | Risk |
|---|---|---|
| **Spectre Events (Netherlands)** | spectre-events.com, "evenementen bureau Spectre Events", Instagram @spectreeventsnl, Facebook page, a YouTube video. Holds the .com. | **High**: same name, same industry. AI engines may merge the two entities or pick the .com. |
| **SPECTRE EVENTS SAS, Lille** | SIREN 841 256 373, created 2018-08-01, NAF 93.29Z, **closed** (establishment closed 2026-01-26, company 2026-05-04). Its manager does not match either founder (checked locally). | **High**: it is the *only* registry result for "Spectre Events" (recherche-entreprises.api.gouv.fr). An AI or client checking the registry finds a closed Lille company. |
| Spectre S.r.l. (Milan) | spectre.events, Italian company | Low |
| "Spectre" generic | James Bond film/SPECTRE organization, CPU vulnerability, dictionary word. These dominate SERPs for "spectre". | Medium: the brand needs a descriptor ("Spectre Events, DJ et sonorisation à Paris"). |
| spectreevents.com | Parked at HugeDomains | Low |

[V] No active French company called "Spectre Events" was found under spectre/spectre event/spectre evenements/spectre evenementiel. [I] The business is probably registered under another name, such as a sole trader under a personal name, without a declared nom commercial.

## 4. Off-site mentions and links
**Verified third-party mentions or links found: 0.**
- [V] Domain registered **2026-10-10** (AFNIC RDAP, registrar OVH). It is about 1 month old.
- [V] Wayback Machine has 8 URLs, the first captured on 2026-10-11.
- [V] beretetpapilles.fr is a single page with **no mention of or link to Spectre Events**.
- [V] Wikipedia FR/EN have 0 hits for "Spectre Events" and 0 external links to the domain. Wikidata has no item for either Spectre Events or Béret & Papilles.
- [V] No YouTube channel exists at @spectreevents, @spectre-events, @spectre_events, @spectreevent or @spectre_event (all 404).
- Not verifiable here: Google, Bing, DuckDuckGo and Brave search results. Google showed a consent wall, DuckDuckGo and Brave showed captchas, and Bing returned degraded results that ignored the operators. Instagram, LinkedIn, Facebook, Reddit and directories (Mariages.net, Zankyou, PagesJaunes) were also not checked. There was no backlink API.
- Next step: check Google Search Console > Links and Bing Webmaster Tools > Backlinks (both free). Also run `"spectre-events.fr" -site:spectre-events.fr` and `"Spectre Events" DJ` manually.

## 5. llms.txt verdict
Optional, low priority. Google says AI Overviews and AI Mode need no special file, and Google Search does not use llms.txt. No major AI search engine has confirmed using it for citations. It is cheap to add (~15 min: a short summary, service list, the location prices and the legal identity) and is harmless for agent or user-triggered fetches. Do it after the entity and off-site fixes, not instead of them.

## Prioritized fixes
1. **High: define the entity** (1-2 h, plus admin):
   - Add legal form, SIREN/SIRET, registered address/city and RCS/RNE to the mentions légales, and remove `noindex` or mirror the details in the footer.
   - Add an "À propos" passage: "Spectre Events est une entreprise française de sonorisation, DJ et organisation d'événements, fondée en 2026 par Maxime [Nom] et Andéol [Nom], basée à [ville], intervenant à Paris/IDF et en Vendée/Pays de la Loire."
   - Upgrade the JSON-LD on every page to LocalBusiness/Organization with `legalName`, `foundingDate`, `founder` (Person), `address.addressLocality`, `identifier` (SIRET) and `sameAs`.
   - Declare "Spectre Events" as the nom commercial with INSEE/guichet unique so the registry resolves to the right business and not the closed Lille SAS.
2. **High: build an off-site footprint** (1-3 weeks):
   - Google Business Profile (service-area) and Bing Places, both feeding AI answers. LinkedIn company page and founder profiles. Fix and confirm the Instagram handle.
   - Wedding and event directories: Mariages.net, Zankyou.
   - Ask Béret & Papilles to link back. Link /traiteur/ to beretetpapilles.fr and use their exact spelling.
   - Collect Google reviews.
3. **High: disambiguate from the Dutch Spectre Events.** Always pair the name with "Paris"/"France" and the service in titles, schema `description`, social bios and the GBP name policy-compliant description. Use the same NAP everywhere.
4. **Medium: add quotable facts** (2-4 h):
   - Price ranges ("à partir de") for DJ/sonorisation, borne photo and catering per person.
   - Question H2s on service pages ("Combien coûte un DJ pour un mariage ?").
   - An H1 on /location/ and /contact/, and Service schema per page.
   - Align areaServed with the footer text.
5. **Low:**
   - Exempt /.well-known/ from the dotfile rule.
   - Watch Googlebot response time in Search Console.
   - Optional llms.txt.
   - Rename the WhatsApp-Image-*.webp files.
   - Side bugs on /traiteur/ [V]: the inline script uses `getElementById('menu')` but the nav id is `nav-principale`, so the mobile menu throws on tap. style.css is loaded twice, and the apple-touch-icon path is `../../`.

## Structured findings (audit-data.json, category "AI Search Readiness")
```json
{"category":"AI Search Readiness","score":55,"findings":[
{"id":"geo-entity-legal","severity":"high","verified":true,"title":"No legal identity/SIREN; founders first-name only; schema lacks legalName/founder/foundingDate/sameAs","fix":"Publish legal details + About passage + full Organization/LocalBusiness schema sitewide"},
{"id":"geo-homonym-nl","severity":"high","verified":true,"title":"Same-industry homonym Spectre Events (NL) owns spectre-events.com","fix":"Brand + location descriptor everywhere, consistent NAP, sameAs"},
{"id":"geo-homonym-registry","severity":"high","verified":true,"title":"Only registry match for 'Spectre Events' is a closed Lille SAS (SIREN 841256373)","fix":"Declare nom commercial; show SIREN on site"},
{"id":"geo-offsite-zero","severity":"high","verified":true,"title":"0 third-party mentions found; domain registered 2026-10-10; partner site does not link back","fix":"GBP, Bing Places, LinkedIn, directories, partner backlink, reviews"},
{"id":"geo-citability-prices","severity":"medium","verified":true,"title":"No price ranges outside /location/; slogan headings; no H1 on /location/ and /contact/","fix":"Add 'à partir de' prices, question H2s, H1s, Service schema"},
{"id":"geo-instagram-mismatch","severity":"medium","verified":true,"title":"Instagram URL spectre_event vs label @spectre_events","fix":"Verify the handle and align the URL and label"},
{"id":"geo-crawler-access","severity":"info","verified":true,"title":"All AI and search user agents get HTTP 200; robots allows all","fix":"None"},
{"id":"geo-wellknown-403","severity":"low","verified":true,"title":"/.well-known/ blocked by dotfile FilesMatch","fix":"Exempt /.well-known/"},
{"id":"geo-bot-ttfb","severity":"low","verified":false,"title":"Spoofed search-bot user agents see ~4 s TTFB (likely OVH rDNS check)","fix":"Check GSC crawl stats"},
{"id":"geo-llms-txt","severity":"low","verified":true,"title":"llms.txt missing (404); optional, not used by Google Search","fix":"Optional 15-min addition"}]}
```
