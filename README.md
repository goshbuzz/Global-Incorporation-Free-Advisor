# Global Incorporation & Business Licensing Free Advisor

A free, self-filing advisor for global / non-resident founders, built from the
[US LLC Tax & Fee Advisor](https://github.com/Solatjamil/US-LLC-Tax-Fee-Advisor) and extended with:

1. a complete **UK LTD (Companies House + HMRC)** counterpart,
2. a **25-country global formation database** with declared registry fees and step-by-step processes,
3. a **business licensing explorer** that answers "can a non-resident alien actually run this business?"

The **home page offers four launcher cards**, each mapped to a hash route:

| Route | Advisor | Registry | What it answers |
|---|---|---|---|
| `#llc` | 🇺🇸 **US LLC** | Secretary of State (per state) + IRS | 50-state fee database, non-resident state-tax treatment, W-7 ITIN, SS-4 EIN, Form 5472 |
| `#ltd` | 🇬🇧 **UK LTD** | Companies House + HMRC | Structures, £100 digital filing, identity verification, CS01, CT600, Corporation Tax, VAT |
| `#global` | 🌍 **Global Countries** | 25 registries | Declared formation fees, foreign-ownership rules, formation steps, budget estimator, compare-all table |
| `#license` | 🪪 **Business Licensing** | 20 regulators | Licence-by-licence eligibility for four legal statuses, plus the lawful workaround for each blocker |

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

The site is monetised with Adsterra inventory. Every placement is labelled **Advertisement** and
kept visually separate from the advisory content.

### Site-wide formats

| Format | Where | Implementation |
|---|---|---|
| Social bar | Every page (floating overlay) | Container + `invoke.js` in `index.html`, outside `#root` |
| Pop-under / in-page | Every page | The two account scripts at the end of `index.html` |
| Direct / smart link | "Sponsored" card at the end of each advisor | `SponsoredOffer.tsx`, `rel="sponsored noopener noreferrer"` |

### Display banners

| Zone key | Size | Placement |
|---|---|---|
| `b0506ed176fd9a02395e7eb8e9c83bd6` | 728×90 | Header leaderboard — desktop |
| `49a00a180850b2d7cc08aa73db3b3711` | 468×60 | Header leaderboard — tablet |
| `8be93438605e6e3f6f2fde3e58de7f09` | 320×50 | Header leaderboard — phone |
| `c2686e3ac1abf116d1a630f1f616f7cb` | 300×250 | Home mid-content; country detail; end of each advisor tab |
| `d19a09b2342213e7b25d0d740c306d9b` | 160×600 | Advisor sidebar (desktop) |
| `fc3314a127173936e23bbbb8caa85e69` | 160×300 | Advisor sidebar (smaller screens) |

### Implementation notes

- Each banner renders inside its own `srcDoc` iframe (`src/components/ads/AdBanner.tsx`). Adsterra's
  `invoke.js` reads a single global `atOptions`, so one document per unit is what keeps several
  banners from overwriting each other in a React SPA.
- Banners are lazy-mounted with `IntersectionObserver` (600px prefetch margin), while their exact
  width × height is reserved up front — no layout shift, no wasted requests for off-screen slots.
- `LeaderboardAd` mounts only the creative for the matched breakpoint (728 / 468 / 320), so one
  request is made rather than three.
- All zone keys and the direct link live in `src/components/ads/adUnits.ts`.
- The social-bar container sits outside `#root` so React never replaces it. The two site scripts in
  `index.html` are deliberately outside React for the same reason.

Placements are intentionally limited: the fee tables and licensing guidance stay first, ads are clearly
labelled, and the direct link is marked `rel="sponsored"`.

## Project structure

```
src/
  App.tsx                     # hash router: home | llc | ltd | global | license
  components/
    HomePage.tsx              # four launcher cards + coverage comparison
    LLCApp.tsx                # 50-state US LLC advisor
    LTDApp.tsx                # UK Companies House advisor
    GlobalApp.tsx             # 25-country formation advisor (4 tabs)
    LicensingApp.tsx          # licensing eligibility explorer (3 tabs)
    ads/                      # Adsterra banner, leaderboard, sidebar, sponsored card
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
```

Routes are hash-based and shareable: `/#llc`, `/#ltd`, `/#global`, `/#license`.
