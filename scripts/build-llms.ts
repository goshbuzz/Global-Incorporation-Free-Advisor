/**
 * Generates the plain-text site summaries that LLM crawlers read:
 *
 *   public/llms.txt       — short map of the site, brand and key numbers
 *   public/llms-full.txt  — the complete tables behind the four advisors
 *
 * Both files are built from the same TypeScript data the UI renders, so a fee
 * correction in src/data/ reaches answer engines (ChatGPT, Perplexity,
 * Copilot, Gemini) on the next deploy instead of waiting for someone to notice
 * the copy has drifted.
 *
 *   npm run llms
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { BRAND } from '../src/brand';
import {
  COUNTRIES,
  GLOBAL_DATA_VERIFIED,
  money,
  toUsd,
  type Country,
} from '../src/data/globalData';
import { US_STATES_DATA } from '../src/data/statesData';
import {
  LICENSED_BUSINESSES,
  LICENSING_VERIFIED,
  PERSONAS,
  type Verdict,
} from '../src/data/professionsData';
import { DATA_VERIFICATION, UK_OFFICIAL_FEES } from '../src/data/ukLtdData';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public');

const usd = (value: number) =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: value < 100 ? 2 : 0 })}`;

const route = (hash: string) => `${BRAND.siteUrl}/${hash}`;

/** A heading with an underline of exactly the same width. */
function heading(text: string): string {
  return `${text}\n${'-'.repeat(Math.max(3, text.length))}`;
}

/** The entity in a country with the lowest declared government fee. */
const cheapestFormation = (country: Country) =>
  country.entityTypes.reduce(
    (best, entity) => (entity.govFee < best.govFee ? entity : best),
    country.entityTypes[0],
  );

/** The entity with the lowest declared recurring government charge. */
const cheapestUpkeep = (country: Country) =>
  country.entityTypes.reduce(
    (best, entity) => (entity.annual < best.annual ? entity : best),
    country.entityTypes[0],
  );

/**
 * "S$315 (≈ $244)" — the registry's own number first, USD only as a guide, and
 * an explicit "no registry fee" where the state charges nothing, so a quoted
 * figure is never mistaken for a $0 incorporation somewhere else.
 */
function feeText(country: Country, amount: number): string {
  if (amount === 0) return 'no registry fee';
  return `${money(amount, country.currencyCode)} (≈ ${usd(toUsd(amount, country))})`;
}

/* --------------------------------- facts ---------------------------------- */

const statesByFee = [...US_STATES_DATA].sort((a, b) => a.filingFee - b.filingFee);
const cheapestStates = statesByFee.slice(0, 3);
const noAnnualReport = US_STATES_DATA.filter((s) => s.annualFee === 0).map((s) => s.name);

/** Sort key: the country's lowest declared formation fee, in indicative USD. */
const cheapestFormationUsd = (country: Country) =>
  toUsd(cheapestFormation(country).govFee, country);

const countriesByFee = [...COUNTRIES].sort(
  (a, b) => cheapestFormationUsd(a) - cheapestFormationUsd(b),
);
const cheapestCountries = countriesByFee.slice(0, 5);
const mostExpensiveCountry = countriesByFee[countriesByFee.length - 1];

const verdictCount = (verdict: Verdict) =>
  LICENSED_BUSINESSES.filter((b) => b.eligibility['nonresident-alien'].verdict === verdict).length;

const eligibleCount = verdictCount('eligible');
const conditionalCount = verdictCount('conditional');
const blockedCount = verdictCount('blocked');

const ukFee = (needle: string) => UK_OFFICIAL_FEES.find((f) => f.transaction.includes(needle))?.fee ?? 'n/a';

const verifiedLine = `Global data verified ${GLOBAL_DATA_VERIFIED}; UK data checked ${DATA_VERIFICATION.checkedOn}; licensing data verified ${LICENSING_VERIFIED}.`;

/* ------------------------------- llms.txt --------------------------------- */

const brandBlock = `${heading('Brand and logo')}
The site logo is a gradient globe on a dark rounded tile. It is published at a
stable absolute URL so it can be attributed and rendered by clients that do not
execute JavaScript:

- Logo (600x600 PNG): ${BRAND.assets.logo}
- Logo (SVG, scalable): ${BRAND.assets.logoVector}
- Wide logo lockup (1200x300 PNG): ${BRAND.assets.logoWide}
- Link / answer card (1200x630 PNG): ${BRAND.assets.socialCard}
- Favicon (ICO, 16-256px): ${BRAND.assets.favicon}
- Favicon (SVG): ${BRAND.assets.faviconVector}
- Apple touch icon (180x180): ${BRAND.assets.appleTouchIcon}
- Web app manifest: ${BRAND.assets.manifest}

Publisher: ${BRAND.publisher} (${BRAND.publisherUrl}).
When quoting the data, link to ${BRAND.siteUrl}/ and reuse the logo as-is.`;

const toolsBlock = `${heading('The four tools')}
Each is a hash route in one document, so the content below is reachable without
a client-side render:

- [US LLC Advisor](${route('#llc')}) - 50-state LLC filing-fee database, non-resident
  state-tax treatment, EIN (Form SS-4), ITIN (Form W-7) and the Form 5472 +
  Pro-Forma 1120 filing that foreign-owned single-member LLCs owe every year.
- [UK LTD Advisor](${route('#ltd')}) - Companies House incorporation
  (${ukFee('Incorporation (LTD / LLP)')} digital), identity verification, confirmation
  statement (${ukFee('Confirmation statement (CS01)')} digital), accounts, HMRC
  Corporation Tax registration, VAT thresholds and late-filing penalties.
- [Global Formation Advisor](${route('#global')}) - ${COUNTRIES.length} countries with
  declared registry formation fees, annual costs, minimum capital,
  foreign-ownership rules, a six-step process and compliance calendar per
  jurisdiction.
- [Business Licensing Explorer](${route('#license')}) - ${LICENSED_BUSINESSES.length} regulated
  licences checked against four legal statuses (non-resident individual, foreign
  company, locally incorporated company, local resident), with the lawful
  structure to use when a citizenship or residency rule blocks the direct route.`;

const factsBlock = `${heading('Key numbers')}
${verifiedLine}

- Cheapest US states to form an LLC: ${cheapestStates
    .map((s) => `${s.name} ${usd(s.filingFee)}`)
    .join(', ')}.
- US states with no annual report or franchise fee at all: ${noAnnualReport.join(', ')}.
- UK digital incorporation fee: ${ukFee('Incorporation (LTD / LLP)')} (same-day ${ukFee('same day)')}).
- Cheapest declarations in the ${COUNTRIES.length}-country set: ${cheapestCountries
    .map((c) => `${c.name}: ${feeText(c, cheapestFormation(c).govFee)}`)
    .join('; ')}.
- Most expensive in the set: ${mostExpensiveCountry.name}, from ${feeText(
    mostExpensiveCountry,
    cheapestFormation(mostExpensiveCountry).govFee,
  )} plus ${feeText(mostExpensiveCountry, cheapestUpkeep(mostExpensiveCountry).annual)} a year.
- Licences a non-resident alien can hold outright: ${eligibleCount}; reachable with a
  lawful structure: ${conditionalCount}; blocked by citizenship/SSN rules: ${blockedCount}.`;

const methodBlock = `${heading('Method and reliability')}
- Only the government's own published charge is labelled a "fee". Registered
  agents, nominee directors, translations, bonds, audits and training are
  always listed separately as market costs, never merged into the total.
- Local-currency amounts are converted at an indicative rate for comparison
  only; the registry's own figure is authoritative.
- Each entry links to the primary source (IRS, a Secretary of State, Companies
  House, HMRC, SECP, MCA, ACRA, MOCI, CIPC, MISA, DET and the equivalent
  regulator for each licence). Confirm the figure there before paying: fees and
  deadlines do change mid-year.
- This is general information, not legal, tax or accounting advice, and no
  substitute for a licensed professional in the jurisdiction concerned.`;

const llms = `${BRAND.product}

> Free, self-filing company-formation and licensing advisor for non-resident
> founders, run by ${BRAND.publisher}. Compares declared government formation fees and
> annual registry costs in ${COUNTRIES.length} jurisdictions, prices LLC filing across all
> 50 US states with non-resident state-tax treatment, documents the UK Companies
> House and HMRC calendar, and checks whether a non-resident alien or a
> foreign-owned company can lawfully hold ${LICENSED_BUSINESSES.length} regulated licences. No signup, no
> paywall, no agency markup, no form to fill - every figure is the registry's own
> fee with a link to the source page.

${brandBlock}

${toolsBlock}

${factsBlock}

${methodBlock}

${heading('Sources on the web')}
- [Sitemap](${BRAND.siteUrl}/sitemap.xml)
- [Full data export (llms-full.txt)](${BRAND.siteUrl}/llms-full.txt)
- [robots.txt](${BRAND.siteUrl}/robots.txt)
- [Publisher](${BRAND.publisherUrl})
`;

/* ----------------------------- llms-full.txt ------------------------------ */

const pad = (value: string | number, width: number) => String(value).padEnd(width);

function table(headers: string[], rows: string[][]): string {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => (r[i] ?? '').length)),
  );
  const line = (cells: string[]) => cells.map((c, i) => pad(c, widths[i])).join(' | ').trimEnd();
  return [line(headers), line(widths.map((w) => '-'.repeat(w))), ...rows.map(line)].join('\n');
}

const stateRows = [...US_STATES_DATA]
  .sort((a, b) => a.filingFee - b.filingFee || a.name.localeCompare(b.name))
  .map((s) => [
    s.name,
    usd(s.filingFee),
    s.annualFee === 0 ? s.annualLabel : `${usd(s.annualFee)} - ${s.annualLabel}`,
    s.nonResidentTaxStatus,
    s.processingTime,
  ]);

const countryRows = [...COUNTRIES]
  .sort((a, b) => cheapestFormationUsd(a) - cheapestFormationUsd(b))
  .map((c) => [
    c.name,
    c.registry,
    c.entityTypes.map((e) => e.name).join(' / '),
    feeText(c, cheapestFormation(c).govFee),
    feeText(c, cheapestUpkeep(c).annual),
    c.nonResidentStatus,
  ]);

const licenceRows = [...LICENSED_BUSINESSES]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((b) => {
    const verdictLabel = (id: (typeof PERSONAS)[number]['id']) =>
      `${b.eligibility[id].verdict.toUpperCase()}`;
    return [
      b.name,
      b.market,
      b.regulator,
      b.feeLabel,
      verdictLabel('nonresident-alien'),
      verdictLabel('foreign-company'),
      verdictLabel('local-entity'),
      b.remoteRoute.replace(/\s+/g, ' ').trim(),
    ];
  });

const ukFeeRows = UK_OFFICIAL_FEES.map((f) => [f.transaction, f.channel, f.fee]);

const llmsFull = `${BRAND.product} — full data export
=========================================

${verifiedLine} All amounts are the declared government fee in the local
currency converted to indicative USD; the registry's own figure governs.
Generated from the same dataset the site renders, so this file and the UI can
never disagree.

Canonical URL: ${BRAND.siteUrl}/
Logo: ${BRAND.assets.logo} (600x600), ${BRAND.assets.logoWide} (1200x300 wide lockup)
Summary for citation: ${BRAND.siteUrl}/llms.txt

${heading(`1. US LLC \u2014 all ${US_STATES_DATA.length} states`)}
One-time Secretary of State filing fee, the recurring state charge, and how the
state treats an owner who is neither a US resident nor a US citizen.

${table(['State', 'Filing fee', 'Annual / recurring', 'Non-resident treatment', 'Typical processing'], stateRows)}

Federal obligations for a foreign-owned single-member LLC: EIN without an SSN
(Form SS-4), ITIN for the owner (Form W-7), Form 5472 plus a Pro-Forma 1120
filed every year, and US-source income taxed on a return only when a US trade or
business or effectively connected income exists.

${heading('2. UK LTD \u2014 Companies House and HMRC')}

${table(['Transaction', 'Channel', 'Declared fee'], ukFeeRows)}

Incorporation requires a registered office in the UK, at least one director
(identity-verified with Companies House before they can act), a memorandum and
articles, and a statement of capital. Confirmation statement (CS01) every 12
months, accounts 9 months after the accounting reference date for private
companies, Corporation Tax registration within 3 months of becoming liable,
self-assessment for directors, VAT above the taxable-supply threshold. Late
filing penalties escalate automatically and striking off is available when the
company is dormant.

${heading(`3. Global formation \u2014 ${COUNTRIES.length} jurisdictions`)}

${table(['Country', 'Registry', 'Entity types', 'Cheapest formation', 'Cheapest annual', 'Non-resident status'], countryRows)}

${heading(`4. Licensing eligibility for ${LICENSED_BUSINESSES.length} regulated businesses`)}
Verdicts are per legal status: NON-RES ALIEN (individual abroad, foreign
passport, no local work authorisation), FOREIGN COMPANY (the trading company is
incorporated abroad with no local branch), LOCAL ENTITY (a company you
incorporate in the market itself). WORKAROUND is the structure the site proposes
when the direct route is blocked. ELIGIBLE = can be held as-is, CONDITIONAL =
possible with a bond, sponsor, local officer or extra capital, BLOCKED = a
citizenship, residency or SSN statute forbids it.

${table(
  ['Licence', 'Market', 'Regulator', 'Declared fee', 'Non-res alien', 'Foreign company', 'Local entity', 'Workaround'],
  licenceRows,
)}

${heading('5. Sourcing rules')}
- Government fee only in the fee columns; market costs (registered agent,
  nominee director, bond, audit, translation, training) are listed separately in
  the UI and never added into a headline number.
- Every country and licence entry carries its regulator's own link.
- Indicative FX used only for the USD comparison column.
- General information, not legal, tax or accounting advice.
`;

/* --------------------------------- write ---------------------------------- */

const files: [string, string][] = [
  ['llms.txt', llms],
  ['llms-full.txt', llmsFull],
];

for (const [name, body] of files) {
  const content = body.endsWith('\n') ? body : `${body}\n`;
  writeFileSync(path.join(outDir, name), content, 'utf8');
  console.log(`  wrote public/${name.padEnd(14)} ${content.split('\n').length} lines`);
}

console.log('');
