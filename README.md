# US LLC & UK LTD Free Advisor

A free, self-filing incorporation advisor for global / non-resident founders, built from the
[US LLC Tax & Fee Advisor](https://github.com/Solatjamil/US-LLC-Tax-Fee-Advisor) and extended with a complete
**UK LTD (Companies House + HMRC)** counterpart.

The **home page offers two launcher buttons**:

| | 🇺🇸 US LLC Advisor | 🇬🇧 UK LTD Advisor |
|---|---|---|
| Registry | Secretary of State (per state) + IRS | Companies House (Cardiff) + HMRC |
| Coverage | 50-state fee & non-resident tax database | UK company structures & official fee schedule |
| Identity guides | Form W-7 ITIN blueprint, Form SS-4 EIN by fax | GOV.UK One Login identity verification (mandatory since 18 Nov 2025) |
| Estimators | State filing + registered agent + virtual address budget | £100 digital incorporation + registered office + filing routes |
| Compliance | Form 5472 / 1120, W-8BEN, annual reports | CS01 confirmation statement (£50/yr), accounts, CT600, Corporation Tax 19–25%, VAT £90k, late-filing penalties |

### Data verification

All government fees, penalties, thresholds and office addresses used in the UK advisor were checked against
public government sources (last verified **20 September 2026**):

- GOV.UK **Companies House fees** publication (fees effective 1 Feb 2026: £100 digital incorporation / £50 digital CS01 / £124 paper)
- GOV.UK **Corporation Tax rates and allowances** (19% ≤ £50k · 25% ≥ £250k, marginal relief 3/200)
- GOV.UK **Late filing penalties** for accounts (£150–£1,500 private, doubled on repetition)
- GOV.UK **VAT registration threshold** (£90,000) and dividend rates (2026/27: 10.75% / 35.75% / 39.35%, £500 allowance)
- Companies House **office access & opening times** (Cardiff / Edinburgh / Belfast offices)
- Companies House **identity verification** guidance (personal codes, 14-day PSC windows)

Market-priced items (registered office services, ACSP identity checks, accountants) are labelled as
*typical market ranges* inside the app — never presented as government fees.

## Advertising (Adsterra)

The site is monetised with Adsterra inventory. Every placement is labelled **Advertisement** and
kept visually separate from the advisory content.

### Site-wide formats

| Format | Where | Implementation |
|---|---|---|
| Social bar | Every page (floating overlay) | Container + `invoke.js` in `index.html`, outside `#root` |
| Pop-under / in-page | Every page | The two account scripts at the end of `index.html` |
| Direct / smart link | "Sponsored" card at the end of the home page and both advisors | `SponsoredOffer.tsx`, `rel="sponsored noopener noreferrer"` |

### Display banners

| Zone key | Size | Placement |
|---|---|---|
| `b0506ed176fd9a02395e7eb8e9c83bd6` | 728×90 | Header leaderboard — desktop |
| `49a00a180850b2d7cc08aa73db3b3711` | 468×60 | Header leaderboard — tablet |
| `8be93438605e6e3f6f2fde3e58de7f09` | 320×50 | Header leaderboard — phone |
| `c2686e3ac1abf116d1a630f1f616f7cb` | 300×250 | Home mid-content; end of each advisor tab |
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

Placements are intentionally limited: the fee tables and filing guidance stay first, ads are clearly
labelled, and the direct link is marked `rel="sponsored"`.

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev     # Vite on http://localhost:3000
npm run build   # production build
npm run lint    # type-check
```
