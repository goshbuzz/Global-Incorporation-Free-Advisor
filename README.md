# Global Incorporation Free Advisor

**Global Incorporation** is the product brand for this site. Everything the visitor sees — the
document title, the header on every page, the footer, structured data, the package name and this
README — carries that one name.

A free, self-filing advisor for global / non-resident founders. It started life as the
[US LLC Tax & Fee Advisor](https://github.com/Solatjamil/US-LLC-Tax-Fee-Advisor) (previously published
as *US LLC & UK LTD Free Advisor*) and was extended with:

1. a complete **UK LTD (Companies House + HMRC)** counterpart,
2. a **25-country global formation database** with declared registry fees and step-by-step processes,
3. a **business licensing explorer** that answers "can a non-resident alien actually run this business?"

> **Branding rule:** the public name lives in one place — [`src/brand.ts`](src/brand.ts). Every page
> header and footer reads `BRAND.name` / `BRAND.product` from it, and `index.html`, `metadata.json`,
> `package.json` and this README carry the same wording. Change the constant, not the components.

The **home page offers four launcher cards**, each mapped to a hash route:

| Route | Section of Global Incorporation | Registry | What it answers |
|---|---|---|---|
| `#llc` | 🇺🇸 **US LLC** | Secretary of State (per state) + IRS | 50-state fee database, non-resident state-tax treatment, W-7 ITIN, SS-4 EIN, Form 5472 |
| `#ltd` | 🇬🇧 **UK LTD** | Companies House + HMRC | Structures, £100 digital filing, identity verification, CS01, CT600, Corporation Tax, VAT |
| `#global` | 🌍 **Global Countries** | 25 registries | Declared formation fees, foreign-ownership rules, formation steps, budget estimator, compare-all table |
| `#license` | 🪪 **Business Licensing** | 21 regulators | Licence-by-licence eligibility for four legal statuses, plus the lawful workaround for each blocker |

## 🌍 Global country database (25 jurisdictions)

Every country entry carries: registry name and link, entity types with **declared government
formation fee**, declared annual registry cost, minimum capital, residency rule, ownership rule,
non-resident status, tax summary, a six-step formation process (with the authority and cost at each
step), recurring compliance obligations, and source links.

| Region | Jurisdictions |
|---|---|
| North America | United States, Canada |
| Europe | United Kingdom, Germany, Ireland, Estonia, Cyprus, Russia, Turkey |
| Middle East | UAE, Saudi Arabia, Qatar |
| South Asia | Pakistan, India |
| East Asia | China, Hong Kong |
| Southeast Asia | Singapore, Malaysia, Indonesia |
| Africa | Nigeria, Kenya, South Africa |
| Oceania | Australia |
| Latin America & Caribbean | Panama, British Virgin Islands |

Non-resident status is classified as **Fully Open to Non-Residents**, **Open with a Local
Agent/Director**, **Capital or Sector Gated** or **Practically Restricted** — so a founder can see at a
glance whether 100% foreign ownership is real or nominal.

### Declared fees, not "packages"

Government charges come from the registry's own schedule. Market-priced items (registered agent,
notary, nominee director, translation, audit) are always separated and labelled. Examples verified for
this release:

| Jurisdiction | Declared formation fee | Notes |
|---|---|---|
| Singapore | S$315 | S$15 name + S$300 ACRA incorporation |
| Hong Kong | HK$1,545 electronic | + HK$2,350 business registration (1 year, from April 2026) |
| India | ₹1,000 name + ₹0 MCA fee | Nil filing fee up to ₹15 lakh authorised capital; stamp duty separate |
| Pakistan | PKR 7,755 online | PKR 1,000 name + PKR 6,655 incorporation (capital ≤ PKR 100,000) + PKR 100 |
| UAE | AED 5,750 (mainland) / AED 5,500+ (free zone) | Activity-dependent; Ejari and visas separate |
| Saudi Arabia | SAR 2,000 MISA + SAR 1,200 CR | The old SAR 62,000/yr licence fee was abolished in Feb 2025 |
| China | ¥0 | SAMR registration is free; subscribed capital due within 5 years |
| Russia | ₽4,000 | Waived when filing electronically with a qualified signature |
| Canada | C$200 federal / C$300 Ontario | Annual return C$12 federal |
| Australia | A$636 | ASIC fee from 1 July 2026; annual review A$342 |
| Germany | €150–€225 court + ~€40 publication | Notary €500–€1,000 statutory scale; €12,500 paid-in capital |
| Ireland | €50 | Form A1 online; annual return €20 |
| Estonia | €265 online | e-Residency card €150 extra; capital from €0.01 |
| Cyprus | €105 | The €350 annual levy was abolished in 2024 |
| Panama | ~US$250–300 | Annual franchise tax US$300 |
| BVI | ~US$450 | Annual licence fee ~US$450 + agent |

The estimator converts everything into the local currency and an indicative USD figure, and splits
**government fee** from **market cost** (address, accountant, visa) so the "from $X" claims are never
padded.

## 🪪 Business licensing explorer

The blocker for cross-border founders is rarely incorporation — it is the licence. This module holds
21 regulated business types and evaluates each against four legal statuses:

- **Non-resident individual (alien)** — no local visa, SSN or work authorisation
- **Foreign company** — overseas entity with no local branch or office
- **Locally incorporated company you own** — e.g. your US LLC / UK LTD / Sdn Bhd
- **Resident individual** — citizen, PR or visa holder

Each licence records the regulator, licence name, **declared government fee**, market costs (training,
bonds, nominees), the residency or citizenship rule, the step-by-step licensing process, ongoing
obligations, and a "how a non-resident actually does this" route.

Coverage includes:

| Market | Licences |
|---|---|
| United States | IRS Certifying Acceptance Agent (ITIN), tax preparer / PTIN, customs broker, FMCSA freight broker, real estate sales associate, insurance producer, mortgage loan originator, MSB/money transmitter, registered agent & formation service, notary public |
| United Kingdom | Authorised Corporate Service Provider (ACSP), FCA payment institution / EMI |
| UAE | Business setup consultancy, RERA real estate broker |
| Singapore / Hong Kong | ACRA registered filing agent, TCSP licence |
| Canada / Australia | RCIC immigration consultant, MARA migration agent |
| Global / Pakistan | E-commerce & Amazon FBA, SaaS/IT services, PSEB-registered IT exporter |

Three verdicts drive the UI: **eligible** (you can hold it), **conditional** (a structure is required —
resident director, licensed partner, US responsible party — or eligibility is discretionary), and
**blocked** (statutory citizenship, residency or SSN requirement). Hard blockers are stated plainly: US
customs brokers need citizenship or a green card, US real estate and mortgage licensing need an SSN, and
Canadian RCIC / Australian MARA registration requires citizenship or permanent residence.

### Worked example included in the app

"Can a Pakistani founder become an IRS Certifying Acceptance Agent?" The honest answer is *conditional,
not blocked*: Revenue Procedure 2006-10 and the Form 13551 instructions state that an eligible person may
be "a U.S. person or a foreign person", and foreign nationals living outside the US enter "N/A" on the
SSN/ITIN line and are exempt from fingerprinting. What cannot be skipped is an EIN, a PTIN for every
responsible party, a clean US federal tax-compliance history and the discretionary suitability review —
and IRS internal guidance requires citizenship/immigration-status verification for individuals subject to
suitability. The playbook lays out the three routes: apply as a foreign person, own a US LLC with a US
citizen/LPR as Responsible Party, or trade as a non-CAA document-preparation service. The same reasoning
is applied to customs brokers, freight brokers, real estate agents and UK ACSPs.

## Data verification

All government fees, penalties, thresholds and office addresses are checked against public government
sources (last verified **29 October 2026** for the global and licensing modules, **20 September 2026**
for the UK module):

- GOV.UK **Companies House fees** publication (fees effective 1 Feb 2026: £100 digital incorporation / £50 digital CS01 / £124 paper)
- GOV.UK **Corporation Tax rates and allowances** (19% ≤ £50k · 25% ≥ £250k, marginal relief 3/200)
- GOV.UK **Late filing penalties** for accounts (£150–£1,500 private, doubled on repetition)
- GOV.UK **VAT registration threshold** (£90,000) and dividend rates (2026/27: 10.75% / 35.75% / 39.35%, £500 allowance)
- Companies House **office access & opening times** (Cardiff / Edinburgh / Belfast offices)
- Companies House **identity verification** guidance (personal codes, 14-day PSC windows) and **ACSP registration** (£63 digital from 1 Feb 2026)
- IRS **Acceptance Agent Program** (Form 13551 filed electronically via e-Services; no IRS fee) and **PTIN** requirements
- CBP **customs broker** licensing ($390 exam, $200 licence) and FMCSA **broker authority** ($300 + $75,000 bond)
- State licensing pages (e.g. Florida DBPR real estate: 63-hour course, ~$62.75 application, $36.75 exam, SSN required)
- Registry fee schedules: ACRA (S$315), Companies Registry HK (HK$1,545), MCA/SPICe+ (₹0 up to ₹15 lakh), SECP Seventh Schedule (PKR 6,655), MISA (SAR 2,000), DET Dubai (AED 5,750), ASIC (A$636 from 1 Jul 2026), CRO Ireland (€50), CIPC (R125), BRS Kenya (KES 10,650), CAC Nigeria (~₦10,000)

Market-priced items (registered office services, ACSP identity checks, accountants, nominee directors,
bonds, forensic training) are labelled as *typical market ranges* inside the app — never presented as
government fees. Currency conversions use an indicative October 2026 FX table and are labelled as such.

## Advertising (Adsterra)

The site is monetised with Adsterra inventory. Every placement is labelled **Advertisement** and kept
visually separate from the advisory content. All zone keys, tag URLs and the direct link live in
`src/components/ads/adUnits.ts` — that file is the only place to edit when Adsterra rotates its
delivery domains.

### Display banners (iframe format)

| Zone key | Size | Placement |
|---|---|---|
| `c84224f3f0ca2b5106b28dcfc1fddfaf` | 728×90 | Header leaderboard — desktop (≥1024px) |
| `f9cc98fd54c28a30efb60728f039b4ad` | 468×60 | Header leaderboard — tablet (640–1023px) |
| `e034dd272ca506accfe6774c198a33dd` | 320×50 | Header leaderboard — phone (<640px) |
| `bb1b7e541eb9cd76a816156a2d5691d2` | 300×250 | Home mid + home deep, country detail, calculator, compare, licence detail |
| `09c588559343bcaa3dd47b8e56962d1e` | 160×600 | Advisor sidebar rail — desktop |
| `4524a192d5ec082eabe7c381d3f64212` | 160×300 | Advisor sidebar rail — smaller screens |

Served from `https://bauval.org/22/<key>`. One slot is mounted per size, so a page never requests two
creatives for the same placement.

### Site-wide formats

| Format | Tag | Fires when |
|---|---|---|
| Pop-under | `https://abscloud.org/1/d3b7c01a789523fc9268e83a743d1910` | first `pointerdown`/`keydown` — browsers block popups without a user gesture, so loading it earlier is pure waste |
| In-page push | `https://bauval.org/14/5e77550f43015fa836f9a95f6cf07f13` | 45% scroll depth **or** 20s of *visible* dwell time |
| Social bar | `https://bauval.org/21/206df8edcf5cd30b98f82ce17bf8a922` → `#container-206df8ed…` | `window.load`, `async` + `fetchpriority="high"` |
| Direct / smart link | `https://araplhn.org/4/79f189149c2b36f46af866a650cdb1ed` | plain link in the "Sponsored" card, `rel="sponsored noopener noreferrer"` |

### Implementation notes

- **Nothing ad-related is in the initial HTML.** The three overlay tags are injected by
  `src/components/ads/AdsterraOverlays.tsx` after the window has loaded, which keeps them out of the
  LCP/INP critical path and out of the crawler-rendered DOM. `index.html` only carries low-priority
  `dns-prefetch` hints for the three hosts.
- Injection is **idempotent and once per page view**: a module-scoped guard means React StrictMode's
  double-invoked effect, or switching between the four advisors, can never stack a second popunder.
- Overlays are **skipped for crawlers and headless clients** (`navigator.webdriver`, bot UA match).
  Bots cannot click, and serving them impressions tanks CTR in the Adsterra dashboard.
- The container div for the social bar is created outside `#root`, so React never re-mounts or
  destroys the overlay while the visitor switches advisors.
- Each banner renders inside its own `srcDoc` iframe (`AdBanner.tsx`): Adsterra's banner loader reads a
  single global `atOptions`, so one document per unit is what keeps several banners from overwriting
  each other in a React SPA.
- Banners are lazy-mounted with `IntersectionObserver` (600px prefetch margin) while their exact
  width × height stays reserved — no layout shift, no off-screen requests. `maxWidth: 100%` on the
  box means a 300px creative can never widen a 320px phone layout.
- `LeaderboardAd` mounts only the creative for the matched breakpoint (728 / 468 / 320), so one
  request is made rather than three; `VerticalAd` swaps 160×600 ⇄ 160×300 at the same width so the
  sidebar column never reflows.

Placements are intentionally limited: the fee tables and licensing guidance stay first, ads are clearly
labelled, and the direct link is marked `rel="sponsored"`.

## Brand, favicon and discoverability

One mark (`brand/*.svg`) is rendered into every format a client asks for. `npm run icons` rebuilds the
whole set; the outputs in `public/` are committed so a plain `npm run build` needs no raster toolchain.

| File | Size | Used by |
|---|---|---|
| `favicon.svg` | vector | browsers with SVG favicon support, crawlers, LLM fetchers |
| `favicon-16x16.png` · `favicon-32x32.png` · `favicon-48x48.png` | 16 / 32 / 48 | `<link rel="icon">`, Google's site-icon fetch |
| `favicon.ico` | 16–256 | legacy browsers and crawlers that ignore `<link rel="icon">` |
| `apple-touch-icon.png` | 180 | iOS home screen (iOS applies its own mask, so it is full-bleed) |
| `icon-192.png` · `icon-512.png` · `maskable-icon-512.png` | 192 / 512 | `site.webmanifest` (`any` + `maskable`) |
| `logo.png` | 600 | `Organization.logo` / `WebApplication.logo` in the JSON-LD |
| `logo-wide.png` | 1200×300 | second `Organization.logo` entry (the wide variant Google offers) |
| `og-image.png` | 1200×630 | `og:image` + `twitter:image` link cards |

Why the sizes overlap: 16–64px renditions use `brand/icon-bold.svg` (bigger mark, no hairline latitude
rows) because a 20-unit stroke at 16px falls below one device pixel; everything at 180px and above uses
`brand/icon.svg` with the full detail.

For indexing and answer engines:

- `index.html` declares the icon chain, `apple-touch-icon`, the manifest, absolute `og:image` /
  `twitter:image` URLs, and `rel="fluid-icon"`.
- JSON-LD is a `@graph` of `Organization` (with both logo ImageObjects) ← `WebSite` ← `WebApplication`,
  cross-linked by `@id`, so the logo is attributed to the publisher rather than left as an orphan image.
- `public/llms.txt` (short map) and `public/llms-full.txt` (every table: 50 states, 25 countries, UK
  fees, 21 licences) are generated by `npm run llms` **from the same `src/data` the UI renders**, so a
  citation cannot disagree with the page. Both are `text/plain`, linked from the head and from robots.txt.
- `public/robots.txt` explicitly allows the brand assets and the LLM exports, and does **not** block the
  ad hosts (blocking ad scripts for Googlebot while serving them to users is cloaking).
- `public/sitemap.xml` declares the logo and link card through the image sitemap namespace. There is one
  `<loc>` on purpose: `#llc` / `#ltd` / `#global` / `#license` are fragments of the same document.

**Search Console checklist** (one-time, after deploy):

1. Add the property `globalincorporationfreeadvisor.goshbuzz.com`, then paste the token into the
   commented `google-site-verification` meta in `index.html` (keep exactly one verification method).
2. Request indexing of `/`, then run **Rich Results Test** on the page to confirm the
   `Organization`/`WebApplication` logo parses.
3. In the URL Inspection tool, check the rendered HTML contains `/favicon.svg` and `/logo.png` — if the
   icon is missing there, the SERP favicon will not appear.
4. Fetch `/llms.txt` and `/llms-full.txt` once (they are not in the sitemap by design) to confirm they
   are served as `text/plain`.

## Project structure

```
brand/                        # master SVGs: icon, icon-bold (16–64px), icon-maskable, lockup, og card
scripts/
  build-brand-assets.mjs      # npm run icons — renders brand/ into public/ (resvg + ImageMagick for .ico)
  build-llms.ts               # npm run llms — renders public/llms.txt + llms-full.txt from src/data
public/                       # served as-is: favicons, logos, og-image, manifest, robots, sitemap, llms
src/
  brand.ts                    # brand name/tagline/publisher + absolute logo/asset URLs — the single source of truth
  App.tsx                     # hash router: home | llc | ltd | global | license
  components/
    HomePage.tsx              # four launcher cards + coverage comparison
    LLCApp.tsx                # Global Incorporation · US LLC
    LTDApp.tsx                # Global Incorporation · UK LTD
    GlobalApp.tsx             # Global Incorporation · Countries (25 jurisdictions, 4 tabs)
    LicensingApp.tsx          # Global Incorporation · Licensing (3 tabs)
    ads/                      # Adsterra banners, leaderboard, sidebar, sponsored card, site-wide overlays
  data/
    statesData.ts             # 50 US states: fees + non-resident tax status
    ukLtdData.ts              # UK entities, fees, deadlines, tax rates
    globalData.ts             # 25 countries: entities, fees, processes, compliance
    professionsData.ts        # 21 licensed businesses with persona eligibility
```

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev     # Vite on http://localhost:3000
npm run build   # production build
npm run lint    # type-check (tsc --noEmit)

# Regenerators (only when brand/ or src/data changes; both outputs are committed)
npm run icons   # brand/*.svg -> public/favicon.*, public/logo.*, public/og-image.png
npm run llms    # src/data/*  -> public/llms.txt, public/llms-full.txt
npm run meta    # both
```

Routes are hash-based and shareable: `/#llc`, `/#ltd`, `/#global`, `/#license`.
