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

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev     # Vite on http://localhost:3000
npm run build   # production build
npm run lint    # type-check
```
