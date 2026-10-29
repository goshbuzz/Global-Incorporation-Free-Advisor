/**
 * Global company-formation database.
 *
 * Every `govFee` / `annual` figure below is a **declared government charge**
 * taken from the registry's own fee schedule (or, where the registry publishes
 * only a range, the published range). Market-priced items — registered agent,
 * notary, accountant, nominee director — are always labelled as market costs
 * and are never mixed into the government figures.
 *
 * `usdPerUnit` is an indicative FX rate used only to sort and compare; it is
 * not a quoted rate. Re-check the registry before paying anything.
 */

export type Region =
  | 'North America'
  | 'Europe'
  | 'Middle East'
  | 'South Asia'
  | 'East Asia'
  | 'Southeast Asia'
  | 'Africa'
  | 'Oceania'
  | 'Latin America & Caribbean';

export type NonResidentStatus =
  | 'Fully Open to Non-Residents'
  | 'Open with a Local Agent/Director'
  | 'Capital or Sector Gated'
  | 'Practically Restricted';

export type OwnershipRule =
  | '100% foreign ownership'
  | '100% in free zones / gated onshore'
  | 'Sector-dependent'
  | 'Local partner or sponsor required'
  | 'Resident director required';

export interface CountryEntity {
  id: string;
  name: string;
  /** Declared government formation fee, in the country's own currency. */
  govFee: number;
  feeNote: string;
  /** Declared recurring government/registry charge per year. */
  annual: number;
  annualNote: string;
  /** Minimum capital that must be declared and/or paid in. */
  minCapital?: number;
  capitalNote?: string;
  timeline: string;
  residency: string;
  ownership: OwnershipRule;
  bestFor: string;
  link: string;
}

export interface ProcessStep {
  title: string;
  detail: string;
  cost: string;
  authority: string;
}

export interface ComplianceItem {
  item: string;
  when: string;
  cost: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  region: Region;
  currency: string;
  currencyCode: string;
  /** Indicative USD value of 1 unit of local currency. */
  usdPerUnit: number;
  registry: string;
  registryLink: string;
  headline: string;
  nonResidentStatus: NonResidentStatus;
  nonResidentNote: string;
  taxSummary: string;
  taxNote: string;
  entityTypes: CountryEntity[];
  process: ProcessStep[];
  compliance: ComplianceItem[];
  isPopular: boolean;
  sources: { label: string; url: string }[];
}

export const FX_NOTE = 'Indicative USD conversion (FX ≈ October 2026) — for comparison only.';

export const GLOBAL_DATA_VERIFIED = '29 October 2026';

export const COUNTRIES: Country[] = [
  /* ------------------------------------------------------------------ USA */
  {
    id: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    currency: 'USD',
    currencyCode: 'USD',
    usdPerUnit: 1,
    registry: 'State Secretary of State + IRS',
    registryLink: 'https://www.irs.gov/',
    headline: '50 states, 50 fee schedules — the LLC remains the default vehicle for non-resident founders.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'No citizenship, visa or residency requirement to own a US LLC. You need a registered agent with a physical street address in the formation state and an EIN (Form SS-4 by fax, free). The company must still file Form 5472 + pro-forma 1120 every year once a foreign owner holds ≥25%.',
    taxSummary: 'Pass-through; 21% federal corporate rate applies only if you elect C-corp status.',
    taxNote:
      'A foreign-owned single-member LLC with no US trade or business (ETBUS) generally owes $0 US income tax but still files Form 5472 + 1120 ($25,000 penalty for failure). State franchise tax may apply regardless of profit.',
    entityTypes: [
      {
        id: 'LLC',
        name: 'Limited Liability Company (LLC)',
        govFee: 50,
        feeNote: 'State filing from $50 (New Mexico) to $500 (Massachusetts); Wyoming $100, Delaware $110',
        annual: 0,
        annualNote: 'State annual report from $0 (New Mexico, Arizona) to $800 (California minimum franchise tax)',
        minCapital: 0,
        capitalNote: 'No minimum capital in any state',
        timeline: '1–15 business days depending on state',
        residency: 'No US residency needed for members or managers',
        ownership: '100% foreign ownership',
        bestFor: 'E-commerce, SaaS, consulting and holding companies sold to global customers',
        link: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business'
      },
      {
        id: 'C-CORP',
        name: 'C Corporation (Delaware)',
        govFee: 148,
        feeNote: 'Delaware Division of Corporations: $89 filing + $50 minimum franchise tax + $9 processing = $148 minimum',
        annual: 225,
        annualNote: 'Delaware franchise tax minimum $225/yr (authorised-shares or assumed-par-value method)',
        timeline: '1–3 business days (24-hour expedite available)',
        residency: 'Directors and officers may live anywhere',
        ownership: '100% foreign ownership',
        bestFor: 'Venture-backed startups issuing preferred stock to US funds',
        link: 'https://corp.delaware.gov/fee/'
      }
    ],
    process: [
      { title: 'Pick the state', detail: 'Balance filing fee against annual cost and privacy. New Mexico ($50, no annual report) and Wyoming ($100, no income tax) are the usual non-resident picks.', cost: '$0', authority: 'Comparison only' },
      { title: 'Reserve/clear the company name', detail: 'Check the state business search; most states include the name check in the formation filing.', cost: 'Usually included', authority: 'Secretary of State' },
      { title: 'Appoint a registered agent', detail: 'A physical street address in the state is mandatory. Commercial services start around $49/yr.', cost: '$49–$300/yr (market)', authority: 'Private provider' },
      { title: 'File the Articles of Organisation', detail: 'Filed online with a credit card. Provide the organiser, registered agent and (in some states) member details.', cost: '$50–$500', authority: 'Secretary of State' },
      { title: 'Get the EIN', detail: 'Form SS-4 by fax (no SSN needed for a foreign responsible party — write "Foreign" in the SSN box). Free either way.', cost: '$0', authority: 'IRS' },
      { title: 'Open banking + bookkeeping', detail: 'Use Mercury/Relay/Wise Business or a US bank. Keep the operating agreement and EIN letter on file.', cost: '$0–$100 (market)', authority: 'Bank / fintech' }
    ],
    compliance: [
      { item: 'Form 5472 + pro-forma 1120', when: 'By 15 April (calendar year filers), extension to 15 October', cost: '$0 filing fee' },
      { item: 'State annual/biennial report', when: 'Per state anniversary date', cost: '$0–$800/yr' },
      { item: 'Registered agent renewal', when: 'Anniversary of formation', cost: '$49–$300/yr' },
      { item: 'BOI report', when: 'Not required for domestic LLCs under the March 2025 interim final rule', cost: '$0' }
    ],
    isPopular: true,
    sources: [
      { label: 'IRS — Employer ID Numbers', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers' },
      { label: 'IRS — About Form 5472', url: 'https://www.irs.gov/forms-pubs/about-form-5472' }
    ]
  },

  /* ------------------------------------------------------------------ UK */
  {
    id: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    currency: 'GBP',
    currencyCode: 'GBP',
    usdPerUnit: 1.34,
    registry: 'Companies House + HMRC',
    registryLink: 'https://find-and-update.company-information.service.gov.uk/',
    headline: '£100 digital incorporation, no UK-resident director needed — but identity verification is now compulsory.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'Directors and shareholders can live anywhere. Since 18 November 2025 every director and PSC must verify identity with Companies House (free via GOV.UK One Login) and supply a personal code. You still need a genuine UK registered office ("appropriate address") and an email address.',
    taxSummary: 'Corporation Tax 19% (profits ≤ £50k) → 25% (≥ £250k), marginal relief between.',
    taxNote:
      'A UK company is UK tax resident and taxable on worldwide profits, whether or not directors are in the UK. Non-resident directors do not automatically create a UK payroll obligation.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Limited Company (LTD)',
        govFee: 100,
        feeNote: '£100 digital / £124 paper / £156 same-day (Companies House fees from 1 Feb 2026)',
        annual: 50,
        annualNote: '£50 digital confirmation statement (CS01); £110 on paper',
        minCapital: 1,
        capitalNote: 'No minimum capital — one £1 share is normal',
        timeline: 'Usually under 24 hours online',
        residency: 'No UK-resident director required',
        ownership: '100% foreign ownership',
        bestFor: 'UK/EU-facing services, Amazon UK, contracting and holding IP',
        link: 'https://www.gov.uk/limited-company-formation'
      },
      {
        id: 'LLP',
        name: 'Limited Liability Partnership (LLP)',
        govFee: 100,
        feeNote: '£100 digital incorporation (same fee schedule as a LTD)',
        annual: 50,
        annualNote: '£50 confirmation statement; accounts filed at Companies House',
        timeline: 'Within 24 hours online',
        residency: 'Members may be non-resident individuals or companies',
        ownership: '100% foreign ownership',
        bestFor: 'Professional partnerships sharing profits without Corporation Tax at entity level',
        link: 'https://www.gov.uk/guidance/set-up-and-run-a-limited-liability-partnership-llp'
      }
    ],
    process: [
      { title: 'Verify your identity', detail: 'Create a GOV.UK One Login, scan a biometric passport, and keep the personal code — every director and PSC needs one.', cost: '£0', authority: 'Companies House' },
      { title: 'Check the name', detail: 'Names must be unique and must not imply government links. "Ltd" or "Limited" must be the last word.', cost: 'Included', authority: 'Companies House' },
      { title: 'Get a UK registered office', detail: 'An "appropriate address" where post reaches you and is acknowledged. Service address for directors is separate.', cost: '£25–£120/yr (market)', authority: 'Private provider' },
      { title: 'File the incorporation', detail: 'Online application with SIC codes, statement of capital, PSCs and the three lawful-purpose statements.', cost: '£100', authority: 'Companies House' },
      { title: 'Register for Corporation Tax', detail: 'HMRC posts the company UTR to the registered office within about 14 days; register within 3 months of trading.', cost: '£0', authority: 'HMRC' },
      { title: 'Open a business bank account', detail: 'Wise, Revolut Business or a high-street bank. Expect enhanced KYC for non-resident directors.', cost: '£0–£100 (market)', authority: 'Bank / EMI' }
    ],
    compliance: [
      { item: 'Confirmation statement (CS01)', when: 'Within 14 days of each 12-month review period', cost: '£50 digital' },
      { item: 'Annual accounts', when: '9 months after the accounting reference date (21 months for the first set)', cost: '£0 to file; £150–£1,500 late penalty' },
      { item: 'Company Tax Return (CT600)', when: '12 months after the end of the accounting period', cost: '£0 (software ~£25+)' },
      { item: 'VAT registration', when: 'Within 30 days of £90,000 rolling turnover', cost: '£0 to register' }
    ],
    isPopular: true,
    sources: [
      { label: 'Companies House fees', url: 'https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees' },
      { label: 'Verify your identity for Companies House', url: 'https://www.gov.uk/guidance/verify-your-identity-for-companies-house' }
    ]
  },

  /* ------------------------------------------------------------------ UAE */
  {
    id: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Middle East',
    currency: 'AED',
    currencyCode: 'AED',
    usdPerUnit: 0.2723,
    registry: 'DET / DED (Dubai) and free-zone authorities',
    registryLink: 'https://www.det.gov.ae/en',
    headline: 'Mainland licence from AED 5,750, or a free-zone package from AED 5,500 — 100% ownership either way for most activities.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'A foreigner can own 100% of a mainland LLC in most commercial and industrial activities (Federal Decree-Law 26/2020 removed the 51% local-shareholder rule). Professional licences (civil companies) still need a UAE-national Local Service Agent who is paid a fixed fee and holds no shares. Free-zone companies are 100% foreign but cannot trade directly in the mainland without a distributor or a mainland branch.',
    taxSummary: '9% corporate tax above AED 375,000 profit; 0% below. No personal income tax.',
    taxNote:
      'Free-zone entities can qualify for a 0% qualifying free-zone person rate but must meet substance and "non-qualifying income" tests. Economic Substance Regulations and UBO filings apply.',
    entityTypes: [
      {
        id: 'MAINLAND',
        name: 'Mainland LLC (DET Dubai)',
        govFee: 5750,
        feeNote: 'Trade licence from AED 5,750 (activity-dependent). Add trade name AED 620–720, initial approval AED 120–300',
        annual: 6000,
        annualNote: 'Licence renewal from ~AED 5,750–15,000 + Ejari tenancy registration (activity/office dependent)',
        minCapital: 0,
        capitalNote: 'No statutory minimum for most activities',
        timeline: '3–10 working days',
        residency: 'No UAE-resident shareholder; a Local Service Agent is needed only for professional licences',
        ownership: '100% foreign ownership',
        bestFor: 'Selling directly to UAE/GCC clients, government contracts, retail and tenders',
        link: 'https://www.det.gov.ae/en'
      },
      {
        id: 'FREEZONE',
        name: 'Free-Zone Company (RAKEZ / IFZA / DMCC / SHAMS)',
        govFee: 5500,
        feeNote: 'Free-zone packages from AED 5,500–6,000 (RAKEZ Biz Starter AED 6,000); DMCC and DIFC cost materially more',
        annual: 6000,
        annualNote: 'Renewal ≈ the original package price + visa/office add-ons',
        minCapital: 0,
        capitalNote: 'No minimum capital in most free zones',
        timeline: '24 hours to 2 weeks',
        residency: 'No local sponsor; a free-zone "registered agent"/office is required',
        ownership: '100% in free zones / gated onshore',
        bestFor: 'Holding, consulting, e-commerce and export services billed outside the UAE mainland',
        link: 'https://rakez.com/'
      }
    ],
    process: [
      { title: 'Choose mainland vs free zone', detail: 'Mainland = direct UAE trading and government work. Free zone = 100% ownership and cheaper setup, but no mainland trading without an agent.', cost: '£0 to decide', authority: 'DET / free-zone authority' },
      { title: 'Reserve the trade name + initial approval', detail: 'Name rules block religious and political terms; activity list determines approvals.', cost: 'AED 620–720 + AED 120–300', authority: 'DET' },
      { title: 'Draft and notarise the MOA', detail: 'Mainland needs a notarised Memorandum of Association; free zones use their own Articles.', cost: 'AED 1,000–1,500 (market)', authority: 'Notary / authority' },
      { title: 'Secure premises and Ejari', detail: 'A physical or flexi-desk address registered with Ejari is required before the licence is issued.', cost: 'AED 6,000–25,000/yr (market)', authority: 'Dubai Municipality / DET' },
      { title: 'Pay the licence fee', detail: 'The licence is issued electronically; add external approvals for regulated activities (food, health, education).', cost: 'AED 5,750+', authority: 'DET / free zone' },
      { title: 'Immigration card + residence visas', detail: 'Establishment card, e-channel, medical and Emirates ID for each shareholder/employee.', cost: 'AED 750 card + AED 3,000–6,500 per visa', authority: 'GDRFA' }
    ],
    compliance: [
      { item: 'Trade licence renewal', when: 'Annual, on the licence anniversary', cost: 'AED 5,750–15,000+' },
      { item: 'Corporate tax registration + return', when: 'Register within 3 months; file within 9 months of year end', cost: '£0 to register' },
      { item: 'UBO + Economic Substance notification', when: 'At incorporation and on change', cost: '£0' },
      { item: 'VAT return (if registered)', when: 'Quarterly above AED 375,000 turnover', cost: '£0' }
    ],
    isPopular: true,
    sources: [
      { label: 'Dubai Department of Economy and Tourism', url: 'https://www.det.gov.ae/en' },
      { label: 'UAE Federal Tax Authority — Corporate Tax', url: 'https://tax.gov.ae/en/taxes/corporate.tax.aspx' }
    ]
  },

  /* ------------------------------------------------------------------ Saudi */
  {
    id: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Middle East',
    currency: 'SAR',
    currencyCode: 'SAR',
    usdPerUnit: 0.2666,
    registry: 'Ministry of Investment (MISA) + Ministry of Commerce (CR)',
    registryLink: 'https://misa.gov.sa/',
    headline: 'The old SAR 62,000/year licence fee is gone — but service-sector capital floors still bite.',
    nonResidentStatus: 'Capital or Sector Gated',
    nonResidentNote:
      'Foreign investors need a MISA investor registration before a Commercial Registration (CR) can be issued. GCC nationals are treated as locals. Since the new Investment Law (February 2025) the SAR 62,000 annual licence fee is no longer collected and several activities can sit on one licence — but ministries and banks still expect paid-up capital (commonly SAR 500,000 for service activities, far more for trading).',
    taxSummary: '20% corporate income tax on foreign share of profit; Zakat 2.5% on the Saudi share.',
    taxNote:
      'A foreign-owned entity pays 20% corporate income tax; a Saudi/GCC-owned share pays Zakat instead. Withholding tax applies to cross-border royalties (15%) and services (5–15%).',
    entityTypes: [
      {
        id: 'MISA-LLC',
        name: 'Foreign-Owned LLC (MISA + CR)',
        govFee: 2000,
        feeNote: 'MISA investor registration application ≈ SAR 2,000 (published fee); CR SAR 1,200/yr',
        annual: 1200,
        annualNote: 'Commercial Registration renewal SAR 1,200/yr + Chamber of Commerce membership SAR 1,500–10,000',
        minCapital: 500000,
        capitalNote: 'No universal statutory minimum, but MISA practice / banks expect ~SAR 500,000 paid-up for services; trading is far higher',
        timeline: '3–6 weeks end to end',
        residency: 'No Saudi shareholder needed; a Saudi-resident manager and office are required in practice',
        ownership: 'Sector-dependent',
        bestFor: 'Contracting, industrial, logistics and services inside Vision 2030 programmes',
        link: 'https://misa.gov.sa/'
      },
      {
        id: 'BRANCH',
        name: 'Branch of a Foreign Company',
        govFee: 2000,
        feeNote: 'MISA branch licence ≈ SAR 2,000 application + CR SAR 1,200',
        annual: 1200,
        annualNote: 'CR renewal SAR 1,200 + Chamber membership',
        timeline: '4–8 weeks',
        residency: 'No local partner, but a resident GM and office are required',
        ownership: '100% foreign ownership',
        bestFor: 'Executing a specific Saudi government or Aramco contract',
        link: 'https://misa.gov.sa/'
      }
    ],
    process: [
      { title: 'Check the activity list', detail: 'Confirm your activity is open to foreign investment and note the capital floor and any ministry approval.', cost: 'SAR 0', authority: 'MISA' },
      { title: 'Attest corporate documents', detail: 'Parent-company documents need notarisation, apostille/embassy attestation and Arabic translation.', cost: 'SAR 2,000–5,000 (market)', authority: 'Embassy / notary' },
      { title: 'Apply for MISA investor registration', detail: 'Submit the business plan, financials and shareholder documents on the MISA portal.', cost: '≈SAR 2,000', authority: 'MISA' },
      { title: 'Notarise the Articles of Association', detail: 'Arabic AoA executed before a notary, then published in the Official Gazette.', cost: 'SAR 3,000–8,000 (market)', authority: 'Ministry of Justice' },
      { title: 'Issue the Commercial Registration', detail: 'CR is the trading certificate; it also unlocks the tax and labour files.', cost: 'SAR 1,200/yr', authority: 'Ministry of Commerce' },
      { title: 'Municipal licence, GOSI, ZATCA, bank', detail: 'Premises inspection, labour/Saudization registration and e-invoicing integration.', cost: 'SAR 1,000–5,000 + office', authority: 'Municipality / GOSI / ZATCA' }
    ],
    compliance: [
      { item: 'CR renewal + Chamber membership', when: 'Annual (Hijri anniversary)', cost: 'SAR 1,200 + SAR 1,500–10,000' },
      { item: 'ZATCA tax return + e-invoicing', when: 'Monthly/quarterly; Phase 2 integration mandatory', cost: 'Software SAR 5,000+/yr (market)' },
      { item: 'GOSI contributions', when: 'Monthly payroll', cost: '~11.75% employer (Saudi) / 2% (expat)' },
      { item: 'Audited financial statements', when: 'Annually for MISA entities', cost: 'SAR 5,000–25,000 (market)' }
    ],
    isPopular: true,
    sources: [
      { label: 'Ministry of Investment (MISA)', url: 'https://misa.gov.sa/' },
      { label: 'Saudi Ministry of Commerce', url: 'https://mc.gov.sa/en' }
    ]
  },

  /* ------------------------------------------------------------------ Qatar */
  {
    id: 'QA',
    name: 'Qatar',
    flag: '🇶🇦',
    region: 'Middle East',
    currency: 'QAR',
    currencyCode: 'QAR',
    usdPerUnit: 0.2747,
    registry: 'Ministry of Commerce and Industry (MOCI)',
    registryLink: 'https://www.moci.gov.qa/en/',
    headline: 'Up to 100% foreign ownership across 1,000+ activities; the CR is your company birth certificate.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'Foreign ownership is allowed up to 100% in most sectors, but a Qatari "service agent" is still required for some professional activities and a physical office plus a resident manager are expected in practice. Qatar Financial Centre (QFC) is a separate 100%-foreign regime with its own fees.',
    taxSummary: '10% corporate income tax on non-GCC shareholders; 0% on the Qatari/GCC share.',
    taxNote:
      'Withholding tax of 5% applies to services and royalties paid abroad. QFC entities are taxed under the QFC tax regime at 10%.',
    entityTypes: [
      {
        id: 'LLC',
        name: 'Limited Liability Company (WLL)',
        govFee: 500,
        feeNote: 'CR registration from QAR 500 (main activity) per the MOCI fee schedule; trade name QAR 200–500',
        annual: 1000,
        annualNote: 'CR renewal + commercial licence renewal (activity dependent)',
        minCapital: 200000,
        capitalNote: 'MOCI practice: QAR 200,000 for a WLL; lower for some professional services',
        timeline: '2–6 weeks',
        residency: 'Resident manager required; local service agent for certain professional licences',
        ownership: 'Sector-dependent',
        bestFor: 'Contracting, trading and services bidding for Qatari public projects',
        link: 'https://www.moci.gov.qa/en/'
      },
      {
        id: 'QFC',
        name: 'QFC-Registered Company',
        govFee: 5000,
        feeNote: 'QFC registration and licensing fees are published by the QFC Authority (application + annual fee per activity)',
        annual: 5000,
        annualNote: 'QFC annual licence fee by activity; no local shareholder',
        timeline: '2–4 weeks',
        residency: 'No local partner; QFC-registered office required',
        ownership: '100% foreign ownership',
        bestFor: 'Financial services, fintech, consulting and holding structures',
        link: 'https://www.qfc.qa/en'
      }
    ],
    process: [
      { title: 'Reserve the trade name', detail: 'Submit up to several proposed names on the MOCI portal; religious and political terms are blocked.', cost: 'QAR 200–500', authority: 'MOCI' },
      { title: 'Draft and notarise the MOA', detail: 'Arabic articles signed before the notary; all shareholders present or represented by POA.', cost: 'QAR 500–1,000', authority: 'Qatar Courts / notary' },
      { title: 'Deposit capital and obtain the certificate', detail: 'Bank certificate confirming capital deposit for the CR file.', cost: 'Bank fee only', authority: 'Local bank' },
      { title: 'Issue the Commercial Registration', detail: 'CR records the company, activities and shareholders; it is the trading certificate.', cost: 'From QAR 500', authority: 'MOCI' },
      { title: 'Municipal trade licence', detail: 'Premises inspection by the municipality before the licence is granted.', cost: 'QAR 1,000–10,000', authority: 'Municipality' },
      { title: 'Tax, labour and immigration files', detail: 'Register with the General Tax Authority for a TIN and set up the labour file for visas.', cost: 'QAR 0', authority: 'GTA / MoL' }
    ],
    compliance: [
      { item: 'CR and licence renewal', when: 'Annual', cost: 'Activity dependent; QAR 100/day late penalty' },
      { item: 'Corporate tax return', when: 'Within 4 months of the financial year end', cost: '10% on non-GCC share' },
      { item: 'Audited accounts', when: 'Annually', cost: 'QAR 5,000–20,000 (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'Qatar Ministry of Commerce and Industry', url: 'https://www.moci.gov.qa/en/' },
      { label: 'Qatar Financial Centre', url: 'https://www.qfc.qa/en' }
    ]
  },

  /* ------------------------------------------------------------------ Pakistan */
  {
    id: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    region: 'South Asia',
    currency: 'PKR',
    currencyCode: 'PKR',
    usdPerUnit: 0.00357,
    registry: 'SECP (eZfile / LEAP) + FBR',
    registryLink: 'https://www.secp.gov.pk/',
    headline: 'Fully online SECP incorporation from about PKR 7,755 for a PKR 100,000-capital company — foreigners may hold 100%.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'Foreign individuals and companies can hold 100% of a Pakistani private limited company in most sectors; a few sectors (arms, security printing, currency) stay restricted. Non-resident shareholders sign notarised/apostilled documents and need a local registered office; at least one director is normally expected to hold a valid CNIC/NICOP — overseas Pakistanis use a NICOP.',
    taxSummary: '29% corporate tax (22% for small companies); 15% on dividends; 0.25–1% final tax on PSEB-registered IT exports.',
    taxNote:
      'Resident companies are taxed on worldwide income; a branch of a foreign company is taxed on Pakistan-source income. Withholding tax is extensive, and sales tax registration is required above the threshold.',
    entityTypes: [
      {
        id: 'PVT',
        name: 'Private Limited Company (Pvt Ltd)',
        govFee: 7755,
        feeNote: 'Name reservation PKR 1,000 + incorporation PKR 6,655 (capital ≤ PKR 100,000, online) + PKR 100 filing. Each extra PKR 100,000 of capital adds PKR 932',
        annual: 0,
        annualNote: 'Annual return (Form A) + audited accounts; SECP charges a late-filing fee only if you miss the deadline',
        minCapital: 0,
        capitalNote: 'No minimum legal capital; SECP charges the minimum slab as if capital were PKR 100,000',
        timeline: '3–7 working days online',
        residency: 'Foreign directors allowed; a local registered office and company secretary are required',
        ownership: '100% foreign ownership',
        bestFor: 'IT/ITeS exports, e-commerce, manufacturing and joint ventures',
        link: 'https://www.secp.gov.pk/'
      },
      {
        id: 'SMC',
        name: 'Single Member Company (SMC)',
        govFee: 7755,
        feeNote: 'Same SECP slab as a Pvt Ltd: PKR 1,000 name + PKR 6,655 incorporation + PKR 100 filing',
        annual: 0,
        annualNote: 'Annual return + audited accounts',
        minCapital: 0,
        capitalNote: 'No minimum capital',
        timeline: '3–7 working days',
        residency: 'One natural-person member; nominee director required if the sole member is a company',
        ownership: '100% foreign ownership',
        bestFor: 'Solo founders who want a corporate bank account without a second shareholder',
        link: 'https://www.secp.gov.pk/'
      },
      {
        id: 'BRANCH',
        name: 'Branch / Liaison Office of a Foreign Company',
        govFee: 60000,
        feeNote: 'Foreign companies register under the Companies Act via SECP Form 38; fees depend on capital and document volume',
        annual: 0,
        annualNote: 'Annual accounts + Form 38-series returns',
        timeline: '2–4 weeks',
        residency: 'A local principal officer and registered office are mandatory',
        ownership: '100% foreign ownership',
        bestFor: 'Testing the market before committing to a local subsidiary',
        link: 'https://www.secp.gov.pk/'
      }
    ],
    process: [
      { title: 'Create a SECP eServices account', detail: 'Register on the LEAP/eZfile portal with an email and mobile number; a one-time user fee applies at first filing.', cost: 'PKR 100', authority: 'SECP' },
      { title: 'Reserve the company name', detail: 'Submit up to three names with objects; reserved names are valid for 60 days.', cost: 'PKR 1,000 online', authority: 'SECP' },
      { title: 'Prepare MOA/AOA + subscriber pages', detail: 'Foreign subscribers sign before a notary and get documents apostilled/attested by the Pakistani mission.', cost: 'Market / notary', authority: 'Notary + consulate' },
      { title: 'File the incorporation application', detail: 'Attach CNIC/NICOP/passport copies, registered-office details and digital signatures of subscribers.', cost: 'PKR 6,655 (≤PKR 100k capital)', authority: 'SECP' },
      { title: 'Pay via the generated challan/PSID', detail: 'Online payment through the linked bank; the certificate is issued after payment clears.', cost: 'Included above', authority: 'SECP' },
      { title: 'FBR NTN + sales tax + bank account', detail: 'Register the company with FBR (NTN) and open a corporate account; SECP now shares data with FBR automatically.', cost: 'PKR 0', authority: 'FBR / bank' }
    ],
    compliance: [
      { item: 'Annual return (Form A) + Form 29', when: 'Within 30 days of the AGM', cost: 'SECP late-fee schedule applies' },
      { item: 'Audited financial statements', when: 'Filed with the annual return', cost: 'Auditor fee (market)' },
      { item: 'Income tax return', when: '30 September (companies) / 31 December (individuals)', cost: 'Filer benefit; late filing penalties' },
      { item: 'Sales tax return', when: 'Monthly, if registered', cost: 'PKR 0' }
    ],
    isPopular: true,
    sources: [
      { label: 'SECP company registration', url: 'https://www.secp.gov.pk/' },
      { label: 'FBR — Iris portal', url: 'https://iris.fbr.gov.pk/' }
    ]
  },

  /* ------------------------------------------------------------------ India */
  {
    id: 'IN',
    name: 'India',
    flag: '🇮🇳',
    region: 'South Asia',
    currency: 'INR',
    currencyCode: 'INR',
    usdPerUnit: 0.0114,
    registry: 'MCA (SPICe+ on MCA V3)',
    registryLink: 'https://www.mca.gov.in/',
    headline: 'Zero MCA incorporation fee up to ₹15 lakh authorised capital — stamp duty and one resident director are the real requirements.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      '100% FDI is allowed in most sectors under the automatic route, but a private company needs at least one director who is resident in India (182+ days in the previous year). Every foreign director needs a DIN and a DSC; documents must be apostilled and, for some states, notarised locally.',
    taxSummary: '22% (domestic company, 115BAA) or 25.17% effective; 30% + surcharge if the concessional regime is not elected.',
    taxNote:
      'Foreign companies pay 35% (plus surcharge) on India-source income. GST registration is mandatory above ₹40 lakh turnover (₹20 lakh for services).',
    entityTypes: [
      {
        id: 'PVT',
        name: 'Private Limited Company (SPICe+)',
        govFee: 1000,
        feeNote: 'Name reservation ₹1,000; MCA incorporation fee ₹0 up to ₹15 lakh authorised capital; state stamp duty ₹400–5,000',
        annual: 0,
        annualNote: 'AOC-4 and MGT-7 filing (nil fee for small companies in most cases) + auditor appointment (ADT-1)',
        minCapital: 100000,
        capitalNote: 'No minimum paid-up capital; ₹1 lakh authorised capital is the market norm',
        timeline: '10–20 working days',
        residency: 'At least one director resident in India; no local shareholder needed',
        ownership: 'Sector-dependent',
        bestFor: 'Indian market operations, software development teams and consumer businesses',
        link: 'https://www.mca.gov.in/content/mca/global/en/services/incorporation.html'
      },
      {
        id: 'LLP',
        name: 'Limited Liability Partnership (LLP)',
        govFee: 1000,
        feeNote: 'RUN-LLP name ₹200 + FiLLiP filing (fee slab by capital) + stamp duty; roughly ₹1,500–8,000 total government cost',
        annual: 0,
        annualNote: 'Form 8 and Form 11 filings (₹50–₹100 per form for small LLPs)',
        timeline: '10–15 working days',
        residency: 'At least one designated partner resident in India',
        ownership: 'Sector-dependent',
        bestFor: 'Professional services and consultancies with lower compliance load',
        link: 'https://www.mca.gov.in/'
      }
    ],
    process: [
      { title: 'Obtain DSC and DIN', detail: 'Every director/subscriber needs a Class 3 digital signature; DIN is allotted through SPICe+ for up to three new directors.', cost: '₹1,000–2,000 per DSC (market)', authority: 'Certifying authority' },
      { title: 'Reserve the name (SPICe+ Part A)', detail: 'Up to two names with objects; approved names are valid for 20 days.', cost: '₹1,000', authority: 'MCA' },
      { title: 'Draft e-MOA / e-AOA', detail: 'Filed in SPICe+ Part B with subscriber and director details, plus INC-9 declarations.', cost: 'Included', authority: 'MCA' },
      { title: 'Pay stamp duty + MCA fees', detail: 'The portal auto-calculates state stamp duty from the registered-office state and collects it with the filing.', cost: '₹0 MCA + ₹400–5,000 stamp duty', authority: 'MCA / state' },
      { title: 'AGILE-PRO-S linked registrations', detail: 'PAN, TAN, EPFO, ESIC, GSTIN and bank account can all be requested in the same application.', cost: '₹0', authority: 'MCA / CBDT' },
      { title: 'Certificate + post-incorporation', detail: 'Certificate of Incorporation arrives with PAN/TAN; appoint the auditor within 30 days (ADT-1).', cost: '₹0', authority: 'MCA' }
    ],
    compliance: [
      { item: 'AOC-4 (financial statements)', when: 'Within 30 days of the AGM', cost: '₹0 for small companies; ₹100/day late fee' },
      { item: 'MGT-7 (annual return)', when: 'Within 60 days of the AGM', cost: '₹0–₹100' },
      { item: 'DIR-3 KYC', when: '30 September each year', cost: '₹0 (₹5,000 if late)' },
      { item: 'ITR-6 + tax audit', when: '31 October (audit cases)', cost: 'CA fee (market)' }
    ],
    isPopular: true,
    sources: [
      { label: 'MCA — Company incorporation', url: 'https://www.mca.gov.in/' },
      { label: 'Companies (Incorporation) Rules, 2014', url: 'https://www.mca.gov.in/MinistryV2/companiesincorporationrules.html' }
    ]
  },

  /* ------------------------------------------------------------------ China */
  {
    id: 'CN',
    name: 'China',
    flag: '🇨🇳',
    region: 'East Asia',
    currency: 'CNY',
    currencyCode: 'CNY',
    usdPerUnit: 0.1408,
    registry: 'SAMR (market regulation) + MOFCOM / NDRC',
    registryLink: 'https://www.samr.gov.cn/',
    headline: 'Registration itself is free; the cost is the 5-year capital commitment and the 8–16 week licensing runway.',
    nonResidentStatus: 'Capital or Sector Gated',
    nonResidentNote:
      'A WFOE (wholly foreign-owned enterprise) is 100% foreign-owned in most sectors outside the Negative List, but every foreign investment must pass the MOFCOM foreign-investment information report. The 2024 Company Law requires subscribed capital to be paid in within five years, and a real registered address plus a Chinese legal representative are mandatory.',
    taxSummary: '25% corporate income tax; 10% dividend withholding; small low-profit enterprises get an effective 5% on part of profit.',
    taxNote:
      'China taxes resident enterprises on worldwide income. VAT (fapiao) invoicing is mandatory and the annual statutory audit is required for foreign-invested entities.',
    entityTypes: [
      {
        id: 'WFOE',
        name: 'WFOE (Wholly Foreign-Owned Enterprise)',
        govFee: 0,
        feeNote: 'SAMR business-licence issuance is free (¥0); chops, certificates and notarisation cost ¥1,000–5,000',
        annual: 0,
        annualNote: 'No annual government fee; mandatory annual audit + CIT reconciliation (market cost)',
        minCapital: 0,
        capitalNote: 'No statutory minimum for most activities, but the declared capital must be paid in within 5 years',
        timeline: '8–16 weeks end to end',
        residency: 'No Chinese shareholder; a Chinese legal representative and registered address are required',
        ownership: 'Sector-dependent',
        bestFor: 'Manufacturing, trading and selling inside China with a local invoicing entity',
        link: 'https://www.samr.gov.cn/'
      },
      {
        id: 'JV',
        name: 'Sino-Foreign Equity Joint Venture',
        govFee: 0,
        feeNote: 'Same free SAMR registration; notarisation and approval costs are market-priced',
        annual: 0,
        annualNote: 'Annual audit + CIT filing (market cost)',
        timeline: '10–20 weeks',
        residency: 'Chinese partner required (useful where the Negative List caps foreign ownership)',
        ownership: 'Sector-dependent',
        bestFor: 'Restricted sectors such as certain education, media and value-added telecom services',
        link: 'https://www.samr.gov.cn/'
      }
    ],
    process: [
      { title: 'Check the Negative List', detail: 'Confirm your activity is not restricted or prohibited; restricted sectors cap foreign ownership.', cost: '¥0', authority: 'NDRC / MOFCOM' },
      { title: 'Reserve the company name', detail: 'Name pre-approval through the local SAMR office; Chinese characters required.', cost: '¥0', authority: 'SAMR' },
      { title: 'Lease a registered address', detail: 'A genuine lease is required — virtual addresses are rejected in most cities.', cost: '$1,000–6,000/yr (market)', authority: 'Landlord' },
      { title: 'File the MOFCOM information report', detail: 'Foreign-investment information report through the enterprise registration system.', cost: '¥0', authority: 'MOFCOM' },
      { title: 'Obtain the business licence', detail: 'The "five-in-one" licence bundles the registration, tax, social credit and statistical codes.', cost: '¥0', authority: 'SAMR' },
      { title: 'Chops, bank account and tax setup', detail: 'Official chop carving, RMB + FX accounts, and golden-tax e-invoicing registration.', cost: '¥1,000–5,000 (market)', authority: 'Police / bank / tax bureau' }
    ],
    compliance: [
      { item: 'Annual CIT reconciliation (A-class return)', when: '31 May', cost: '¥0 filing' },
      { item: 'Statutory annual audit', when: 'Before 30 June', cost: '$1,500–4,000 (market)' },
      { item: 'Foreign-investment annual report', when: '30 June', cost: '¥0' },
      { item: 'Capital contribution', when: 'Within 5 years of establishment', cost: 'Declared capital' }
    ],
    isPopular: true,
    sources: [
      { label: 'SAMR — enterprise registration', url: 'https://www.samr.gov.cn/' },
      { label: 'MOFCOM', url: 'http://english.mofcom.gov.cn/' }
    ]
  },

  /* ------------------------------------------------------------------ Russia */
  {
    id: 'RU',
    name: 'Russia',
    flag: '🇷🇺',
    region: 'Europe',
    currency: 'RUB',
    currencyCode: 'RUB',
    usdPerUnit: 0.0125,
    registry: 'Federal Tax Service (EGRUL)',
    registryLink: 'https://www.nalog.gov.ru/eng/',
    headline: 'A ₽4,000 state duty — waived entirely if you file electronically with a qualified signature.',
    nonResidentStatus: 'Capital or Sector Gated',
    nonResidentNote:
      'A foreign individual or company can own 100% of an OOO, but since 2022 foreign shareholders from "unfriendly" states face government-approval requirements for certain deals, and banking is heavily restricted in practice. A Russian legal address and a director (who may be foreign, but then needs a work permit) are mandatory.',
    taxSummary: '25% corporate profit tax from 2025; 15% dividend withholding (treaty dependent).',
    taxNote:
      'Russian companies are taxed on worldwide income. Sanctions, payment routing and currency controls make operating from abroad difficult regardless of the low registration cost.',
    entityTypes: [
      {
        id: 'OOO',
        name: 'Limited Liability Company (OOO)',
        govFee: 4000,
        feeNote: 'State duty ₽4,000; ₽0 when filing electronically with a qualified e-signature',
        annual: 0,
        annualNote: 'No annual registry fee; accounting, legal address and reporting are market costs',
        minCapital: 10000,
        capitalNote: 'Minimum charter capital ₽10,000, paid within 4 months',
        timeline: '3–5 working days',
        residency: 'Any director nationality; a foreign director needs a work permit. Registered legal address required',
        ownership: 'Sector-dependent',
        bestFor: 'Local trading and services where sanctions exposure is manageable',
        link: 'https://www.nalog.gov.ru/eng/companies/reg_komp/reg_russ/'
      },
      {
        id: 'BRANCH',
        name: 'Branch / Representative Office',
        govFee: 120000,
        feeNote: 'Accreditation duty rose sharply in 2024; budget ₽120,000+ including accreditation and Chamber of Commerce fees',
        annual: 0,
        annualNote: 'Annual accreditation confirmation filings',
        timeline: '6–10 weeks',
        residency: 'Head office abroad; a resident branch head required',
        ownership: '100% foreign ownership',
        bestFor: 'Representative functions for an existing foreign group',
        link: 'https://www.nalog.gov.ru/eng/'
      }
    ],
    process: [
      { title: 'Choose the tax regime', detail: 'General regime (25% profit tax, VAT) or a special regime if eligible; confirm before drafting.', cost: '₽0', authority: 'FTS' },
      { title: 'Prepare charter + founder decision', detail: 'Charter, establishment protocol and a notarised application (R11001) if filing on paper.', cost: '₽3,000–10,000 notary (market)', authority: 'Notary' },
      { title: 'Secure a legal address', detail: 'A lease or a "legal address" service with a landlord guarantee letter.', cost: '₽15,000–40,000/yr (market)', authority: 'Landlord' },
      { title: 'Pay the state duty', detail: '₽4,000 or ₽0 when filing electronically with a qualified electronic signature.', cost: '₽0–4,000', authority: 'FTS' },
      { title: 'File with the Federal Tax Service', detail: 'Registration, INN, OGRN and statistical codes are issued together within 5 working days.', cost: 'Included', authority: 'FTS' },
      { title: 'Open a bank account', detail: 'Russian banks apply enhanced KYC to foreign-owned entities; expect several weeks.', cost: '₽0–5,000', authority: 'Bank' }
    ],
    compliance: [
      { item: 'Profit tax and VAT returns', when: 'Quarterly / monthly', cost: '₽0 filing' },
      { item: 'Accounting + audit (if thresholds met)', when: 'Annually', cost: '₽60,000+/yr (market)' },
      { item: 'Currency-control reporting', when: 'Per contract', cost: '₽0' }
    ],
    isPopular: false,
    sources: [
      { label: 'Federal Tax Service — register a legal entity', url: 'https://www.nalog.gov.ru/eng/companies/reg_komp/reg_russ/' }
    ]
  },

  /* ------------------------------------------------------------------ Turkey */
  {
    id: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    region: 'Middle East',
    currency: 'TRY',
    currencyCode: 'TRY',
    usdPerUnit: 0.0238,
    registry: 'Trade Registry Office (MERSIS)',
    registryLink: 'https://www.ticaret.gov.tr/',
    headline: 'A Turkish LLC needs TRY 50,000 of capital and no local partner — the registry fees are modest.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'Foreigners can own 100% of a Limited Şirket. At least one shareholder is enough, but a Turkish resident company director is needed in practice, and a foreign director must obtain a residence permit to sign at the registry. A notarised power of attorney (apostilled in your home country) is the standard remote route.',
    taxSummary: '25% corporate tax; 15% dividend withholding (20% for certain exemptions).',
    taxNote: 'Turkish companies are taxed on worldwide income. VAT rates run 1–20% and the e-invoice/e-ledger regime is mandatory above turnover thresholds.',
    entityTypes: [
      {
        id: 'LLC',
        name: 'Limited Şirket (LLC)',
        govFee: 12500,
        feeNote: 'Trade-registry fees + Competition Authority contribution (0.04% of capital) typically TRY 12,500–15,000 total government cost',
        annual: 0,
        annualNote: 'No fixed annual registry fee; accounting and e-ledger Costs are market-priced',
        minCapital: 50000,
        capitalNote: 'Minimum TRY 50,000 (25% may be payable before registration, balance within 24 months)',
        timeline: '1–3 weeks with a power of attorney',
        residency: 'No local shareholder. Resident director / permit needed in practice',
        ownership: '100% foreign ownership',
        bestFor: 'Manufacturing, e-commerce and regional distribution between Europe and Asia',
        link: 'https://www.ticaret.gov.tr/'
      },
      {
        id: 'JSC',
        name: 'Anonim Şirket (JSC)',
        govFee: 15000,
        feeNote: 'Registry + Competition Authority contribution; higher notary costs because the articles are longer',
        annual: 0,
        annualNote: 'Accounting, audit and e-ledger costs (market)',
        minCapital: 250000,
        capitalNote: 'Minimum TRY 250,000; 25% paid before registration',
        timeline: '2–3 weeks',
        residency: 'Board members may be foreign; a resident representative is normally appointed',
        ownership: '100% foreign ownership',
        bestFor: 'Businesses that plan to raise capital or issue shares',
        link: 'https://www.ticaret.gov.tr/'
      }
    ],
    process: [
      { title: 'Reserve the company name', detail: 'Check availability at the Trade Registry and reserve through MERSIS.', cost: 'Included', authority: 'Trade Registry' },
      { title: 'Notarise the articles + POA', detail: 'Articles of association notarised; if you are abroad, a notarised and apostilled power of attorney.', cost: 'TRY 2,000–4,000 (market)', authority: 'Notary' },
      { title: 'Deposit capital', detail: 'Deposit 25% of capital in a Turkish bank and obtain the blocking certificate.', cost: 'TRY 12,500+', authority: 'Bank' },
      { title: 'Register with the Trade Registry', detail: 'Submission through MERSIS; the registry notifies the tax office automatically.', cost: 'TRY 12,500–15,000', authority: 'Trade Registry' },
      { title: 'Tax registration + signature circular', detail: 'Tax number, e-signature and notarised signature circular for authorised signatories.', cost: 'TRY 1,000–3,000 (market)', authority: 'Tax office / notary' },
      { title: 'Social security and accounting setup', detail: 'Register the workplace with SGK and appoint an accountant (mali müşavir) required by law.', cost: 'Market', authority: 'SGK' }
    ],
    compliance: [
      { item: 'Corporate tax return', when: 'Within 4 months of year end', cost: '25%' },
      { item: 'VAT returns', when: 'Monthly', cost: '0–20%' },
      { item: 'Annual general assembly', when: 'Within 3 months of year end', cost: 'Notary + gazette (market)' },
      { item: 'e-Ledger / e-Invoice', when: 'Continuous above thresholds', cost: 'Software (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'Turkish Ministry of Trade', url: 'https://www.ticaret.gov.tr/' },
      { label: 'Revenue Administration (GİB)', url: 'https://www.gib.gov.tr/' }
    ]
  },

  /* ------------------------------------------------------------------ Canada */
  {
    id: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    currency: 'CAD',
    currencyCode: 'CAD',
    usdPerUnit: 0.725,
    registry: 'Corporations Canada or provincial registry',
    registryLink: 'https://ised-isde.canada.ca/site/corporations-canada/en',
    headline: 'C$200 federal incorporation online — but at least 25% of directors must be Canadian residents.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'Under the CBCA at least 25% of directors must be resident Canadians (and a majority if the corporation has fewer than four directors). You can hold 100% of the shares, but you need a resident director or a provincial incorporation where rules differ. Federal corporations must also register extra-provincially wherever they operate.',
    taxSummary: 'Federal 15% + provincial 8–16%; small-business rate ≈ 9–12.2% on the first C$500,000.',
    taxNote:
      'Resident corporations are taxed on worldwide income. Non-resident shareholders are subject to 25% dividend withholding unless a tax treaty reduces it.',
    entityTypes: [
      {
        id: 'FED',
        name: 'Federal Corporation (CBCA)',
        govFee: 200,
        feeNote: 'C$200 online (C$250 by mail); NUANS name report C$14–60 if named; express service +C$100',
        annual: 12,
        annualNote: 'Annual return C$12 online; provincial extra-provincial registration fees apply per province',
        minCapital: 0,
        capitalNote: 'No minimum capital',
        timeline: '1–10 business days',
        residency: '25% of directors must be resident Canadians (majority if <4 directors)',
        ownership: 'Resident director required',
        bestFor: 'Pan-Canadian operations, government contracts and IP holding',
        link: 'https://ised-isde.canada.ca/site/corporations-canada/en'
      },
      {
        id: 'ON',
        name: 'Ontario Corporation (OBCA)',
        govFee: 300,
        feeNote: 'C$300 online; NUANS report C$14–60 for a named company',
        annual: 25,
        annualNote: 'Ontario annual return C$25 (filed with the CRA corporate income tax return)',
        timeline: 'Same day to 5 business days',
        residency: 'No Canadian-resident director requirement in Ontario (unlike federal)',
        ownership: 'Resident director required',
        bestFor: 'Non-resident founders who want to avoid a nominee director',
        link: 'https://www.ontario.ca/page/incorporate-business-ontario'
      }
    ],
    process: [
      { title: 'Pick federal or provincial', detail: 'Federal = national name protection but extra-provincial registrations; Ontario has no resident-director rule.', cost: 'C$0', authority: 'Comparison' },
      { title: 'Run a NUANS name search', detail: 'Required for a named corporation; a numbered company skips this step entirely.', cost: 'C$14–60 (market)', authority: 'NUANS' },
      { title: 'File the articles', detail: 'Articles of incorporation with directors, share structure and registered office.', cost: 'C$200 federal / C$300 Ontario', authority: 'Corporations Canada / Ontario' },
      { title: 'Appoint directors and officers', detail: 'Keep the resident-director rule in mind and file the initial registered office / director forms.', cost: 'Included', authority: 'Registry' },
      { title: 'Get a CRA business number', detail: 'BN, GST/HST account (if turnover > C$30,000) and payroll account.', cost: 'C$0', authority: 'CRA' },
      { title: 'Open banking + bookkeeping', detail: 'Business account with a Canadian bank or fintech; keep minute book resolutions up to date.', cost: 'Market', authority: 'Bank' }
    ],
    compliance: [
      { item: 'Annual return', when: 'On the anniversary of incorporation', cost: 'C$12 federal / C$25 Ontario' },
      { item: 'T2 corporate return', when: 'Within 6 months of the tax year end', cost: 'C$0' },
      { item: 'GST/HST return', when: 'Annual, quarterly or monthly', cost: '5–15% collected' },
      { item: 'Minute book + director changes', when: 'On change', cost: 'C$0–200' }
    ],
    isPopular: true,
    sources: [
      { label: 'Corporations Canada — incorporate', url: 'https://ised-isde.canada.ca/site/corporations-canada/en' },
      { label: 'Ontario — incorporate a business', url: 'https://www.ontario.ca/page/incorporate-business-ontario' }
    ]
  },

  /* ------------------------------------------------------------------ Singapore */
  {
    id: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Southeast Asia',
    currency: 'SGD',
    currencyCode: 'SGD',
    usdPerUnit: 0.775,
    registry: 'ACRA (BizFile+)',
    registryLink: 'https://www.acra.gov.sg/',
    headline: 'S$315 in ACRA fees, 1–3 days to incorporate — but a locally resident director is compulsory.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'A Singapore private limited company needs at least one director ordinarily resident in Singapore (citizen, PR or EntrePass/EP holder). Foreigners typically appoint a nominee director (S$2,000–4,000/yr) or relocate on an Employment Pass. Filings must be made by the company or a registered filing agent.',
    taxSummary: '17% corporate tax with partial exemptions; 0% on foreign-sourced dividends under the remittance rules.',
    taxNote:
      'Singapore is territorial: foreign-sourced income is generally exempt unless remitted and not exempt. GST is 9% above S$1 million turnover. No capital gains tax.',
    entityTypes: [
      {
        id: 'PTE',
        name: 'Private Limited Company (Pte Ltd)',
        govFee: 315,
        feeNote: 'S$15 name application + S$300 incorporation, both to ACRA (declared fee)',
        annual: 60,
        annualNote: 'ACRA annual return S$60 + mandatory company secretary and registered office (market)',
        minCapital: 1,
        capitalNote: 'Minimum issued and paid-up capital S$1',
        timeline: '1–3 business days',
        residency: 'At least one director ordinarily resident in Singapore; must appoint a company secretary within 6 months',
        ownership: 'Resident director required',
        bestFor: 'Asia-Pacific headquarters, fintech, holding companies and IP licensing',
        link: 'https://www.acra.gov.sg/how-to-guides/setting-up-a-local-company'
      },
      {
        id: 'BRANCH',
        name: 'Branch of a Foreign Company',
        govFee: 315,
        feeNote: 'Registration of a foreign branch is S$300 + S$15 name fee through BizFile+',
        annual: 60,
        annualNote: 'Annual return S$60; audited accounts of the head office must be filed',
        timeline: '3–10 business days',
        residency: 'Two Singapore-resident agents required to accept service',
        ownership: '100% foreign ownership',
        bestFor: 'Testing Singapore without a separate subsidiary; profits are taxed at head-office level disclosures',
        link: 'https://www.acra.gov.sg/'
      }
    ],
    process: [
      { title: 'Apply for the company name', detail: 'Submit a name through BizFile+ (filed by a registered filing agent or the director with Singpass).', cost: 'S$15', authority: 'ACRA' },
      { title: 'Appoint a resident director', detail: 'A Singapore citizen, PR or EP/EntrePass holder. Nominee director services are market-priced.', cost: 'S$2,000–4,000/yr (market)', authority: 'Private provider' },
      { title: 'Register the company', detail: 'File the constitution/constitution of the company, share capital and officers.', cost: 'S$300', authority: 'ACRA' },
      { title: 'Appoint a company secretary', detail: 'Must be a Singapore resident and qualified; appoint within 6 months of incorporation.', cost: 'S$300–1,200/yr (market)', authority: 'ACRA' },
      { title: 'Secure a registered office', detail: 'A local address (virtual office acceptable if the provider is licensed).', cost: 'S$240–600/yr (market)', authority: 'Private provider' },
      { title: 'Open corporate banking + tax', detail: 'Most banks require the resident director to attend; register for GST if turnover exceeds S$1m.', cost: 'Market', authority: 'Bank / IRAS' }
    ],
    compliance: [
      { item: 'Annual return (BizFile+)', when: 'Within 7 months of the financial year end', cost: 'S$60' },
      { item: 'ECI / Form C-S', when: 'Within 3 months of year end (ECI); 30 Nov (Form C-S)', cost: 'S$0' },
      { item: 'AGM + audited accounts', when: 'Within 6 months of year end (private company)', cost: 'Audit exempt if small' },
      { item: 'GST returns', when: 'Quarterly above S$1m turnover', cost: '9%' }
    ],
    isPopular: true,
    sources: [
      { label: 'ACRA — setting up a local company', url: 'https://www.acra.gov.sg/how-to-guides/setting-up-a-local-company' },
      { label: 'IRAS — corporate tax', url: 'https://www.iras.gov.sg/taxes/corporate-income-tax' }
    ]
  },

  /* ------------------------------------------------------------------ Hong Kong */
  {
    id: 'HK',
    name: 'Hong Kong',
    flag: '🇭🇰',
    region: 'East Asia',
    currency: 'HKD',
    currencyCode: 'HKD',
    usdPerUnit: 0.1282,
    registry: 'Companies Registry + Inland Revenue (BRC)',
    registryLink: 'https://www.cr.gov.hk/en/home/index.htm',
    headline: 'HK$1,545 electronic incorporation plus HK$2,350 business registration — no residency requirement for directors.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'Directors and shareholders can be any nationality and need not live in Hong Kong, but a local company secretary (individual or TCSP) and a Hong Kong registered office are mandatory. A TCSP licence is required for anyone providing company-secretarial services for profit.',
    taxSummary: 'Two-tier profits tax: 8.25% on the first HK$2m, 16.5% thereafter — territorial basis.',
    taxNote:
      'Hong Kong taxes only profits arising in or derived from Hong Kong. Offshore claims require evidence. No VAT, no capital gains tax, no dividend withholding.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Company Limited by Shares',
        govFee: 1545,
        feeNote: 'HK$1,545 electronic / HK$1,720 hard copy (Companies Registry); plus business registration fee HK$2,350 for 1 year from April 2026',
        annual: 2455,
        annualNote: 'Annual return NAR1 HK$105 (on time) + business registration renewal HK$2,350/yr = HK$2,455',
        minCapital: 1,
        capitalNote: 'No minimum capital; 1 share of HK$1 is standard',
        timeline: '1–3 business days electronically',
        residency: 'No resident director needed; local company secretary + registered office required',
        ownership: '100% foreign ownership',
        bestFor: 'Trading with mainland China, IP holding, e-commerce and consulting',
        link: 'https://www.cr.gov.hk/en/services/register-company.htm'
      },
      {
        id: 'OFFSHORE',
        name: 'Non-Hong-Kong Company (Registered Branch)',
        govFee: 1400,
        feeNote: 'Registration of a registered non-Hong Kong company: HK$1,400 (Companies Registry Form NN1)',
        annual: 105,
        annualNote: 'Annual return + BRC renewal; accounts of the overseas parent must be filed',
        timeline: '7–14 working days',
        residency: 'Authorised representative in Hong Kong required',
        ownership: '100% foreign ownership',
        bestFor: 'Formalising an existing foreign company’s Hong Kong place of business',
        link: 'https://www.cr.gov.hk/en/services/register-company.htm'
      }
    ],
    process: [
      { title: 'Choose the company name', detail: 'Check availability on the Companies Registry e-Search; "Limited" must be the last word.', cost: 'HK$0', authority: 'Companies Registry' },
      { title: 'Appoint a company secretary', detail: 'A TCSP-licensed provider or a Hong Kong resident individual. Mandatory from day one.', cost: 'HK$1,500–4,000/yr (market)', authority: 'Private provider' },
      { title: 'Prepare the articles (AA)', detail: 'Use the model articles or a bespoke Articles of Association.', cost: 'Included / market', authority: 'Companies Registry' },
      { title: 'File Form NNC1', detail: 'Incorporation form with the registered office, directors, shareholders and founder member details.', cost: 'HK$1,545', authority: 'Companies Registry' },
      { title: 'Pay business registration', detail: 'BRC is issued together with the certificate of incorporation (1-year or 3-year option).', cost: 'HK$2,350 (1 year)', authority: 'Inland Revenue' },
      { title: 'Bank account + profits tax', detail: 'Bank onboarding is the slow step (2–8 weeks); register with the IRD within 1 month.', cost: 'Market', authority: 'Bank / IRD' }
    ],
    compliance: [
      { item: 'Annual return (NAR1)', when: 'Within 42 days of the incorporation anniversary', cost: 'HK$105 (HK$3,480 if late)' },
      { item: 'Business registration renewal', when: 'Annually (or 3-yearly)', cost: 'HK$2,350/yr' },
      { item: 'Profits tax return', when: 'Within 1 month of issue (extendable via tax representative)', cost: '8.25% / 16.5%' },
      { item: 'Audited accounts', when: 'Annually with the tax return', cost: 'HK$5,000–20,000 (market)' }
    ],
    isPopular: true,
    sources: [
      { label: 'Companies Registry — fees', url: 'https://www.cr.gov.hk/en/services/fees.htm' },
      { label: 'Inland Revenue — business registration', url: 'https://www.ird.gov.hk/eng/tax/bre.htm' }
    ]
  },

  /* ------------------------------------------------------------------ Malaysia */
  {
    id: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Southeast Asia',
    currency: 'MYR',
    currencyCode: 'MYR',
    usdPerUnit: 0.238,
    registry: 'SSM (Companies Commission of Malaysia)',
    registryLink: 'https://www.ssm.com.my/',
    headline: 'RM1,050 in SSM fees for a Sdn Bhd — but one director must ordinarily reside in Malaysia.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      '100% foreign shareholding is allowed in most sectors, but a Sdn Bhd needs at least one director whose principal place of residence is in Malaysia. A qualified company secretary must be appointed within 30 days. Some activities need sector licences and higher paid-up capital (e.g. wholesale/retail trade needs RM1m).',
    taxSummary: '24% corporate tax; 15–17% for SMEs on the first RM600,000; no capital gains tax on shares.',
    taxNote:
      'Malaysia taxes resident companies on worldwide income; foreign-sourced income has had a temporary exemption regime that is periodically extended. Withholding tax on payments abroad (10–15%) applies.',
    entityTypes: [
      {
        id: 'SDN',
        name: 'Sendirian Berhad (Sdn Bhd)',
        govFee: 1050,
        feeNote: 'SSM name reservation RM50 + incorporation RM1,000 (company limited by shares)',
        annual: 0,
        annualNote: 'SSM annual-return fee from ~RM40 depending on share capital, plus company secretary retainer (market)',
        minCapital: 1,
        capitalNote: 'Minimum one share; higher paid-up capital for licensed sectors',
        timeline: '1–3 business days',
        residency: 'At least one director ordinarily resident in Malaysia',
        ownership: 'Resident director required',
        bestFor: 'ASEAN market entry, manufacturing and shared-service centres',
        link: 'https://www.ssm.com.my/'
      },
      {
        id: 'BRANCH',
        name: 'Branch of a Foreign Company',
        govFee: 5000,
        feeNote: 'Registration of a foreign company branch under the Companies Act 2016 — SSM fees by share capital',
        annual: 0,
        annualNote: 'Annual return + audited branch accounts',
        timeline: '2–4 weeks',
        residency: 'A local resident agent is required',
        ownership: '100% foreign ownership',
        bestFor: 'Project offices and regional representative functions',
        link: 'https://www.ssm.com.my/'
      }
    ],
    process: [
      { title: 'Reserve the name', detail: 'Submit the proposed name via MyCoID (SSM portal); approval holds for 30 days.', cost: 'RM50', authority: 'SSM' },
      { title: 'Appoint a resident director', detail: 'At least one director with a Malaysian principal place of residence.', cost: 'Nominee service RM6,000–24,000/yr if needed (market)', authority: 'Private provider' },
      { title: 'File the incorporation', detail: 'Lodge the constitution (optional), directors and shareholders in MyCoID.', cost: 'RM1,000', authority: 'SSM' },
      { title: 'Appoint a company secretary', detail: 'A licensed secretary under the Companies Act, within 30 days of incorporation.', cost: 'RM1,500–3,000/yr (market)', authority: 'SSM' },
      { title: 'Register with LHDN + EPF/SOCSO', detail: 'Tax file and payroll registrations once you hire.', cost: 'RM0', authority: 'LHDN' },
      { title: 'Sector licences', detail: 'WRT licence, MIDA manufacturing licence or Bank Negara approval depending on activity.', cost: 'RM3,000–10,000 (market)', authority: 'KPDN / MIDA / BNM' }
    ],
    compliance: [
      { item: 'Annual return', when: 'Within 30 days of the incorporation anniversary', cost: 'SSM fee by share capital' },
      { item: 'Audited financial statements', when: 'Within 6 months of the financial year end', cost: 'Audit fee (market)' },
      { item: 'Form C tax return', when: 'Within 7 months of year end', cost: '24%' },
      { item: 'SST returns', when: 'Bi-monthly if registered', cost: '5–10%' }
    ],
    isPopular: false,
    sources: [
      { label: 'SSM — Companies Commission of Malaysia', url: 'https://www.ssm.com.my/' },
      { label: 'LHDN — Inland Revenue Board', url: 'https://www.hasil.gov.my/' }
    ]
  },

  /* ------------------------------------------------------------------ Indonesia */
  {
    id: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    currency: 'IDR',
    currencyCode: 'IDR',
    usdPerUnit: 0.0000606,
    registry: 'AHU (Ministry of Law) + BKPM / OSS-RBA',
    registryLink: 'https://www.indonesia.go.id/',
    headline: 'PT PMA is open to 100% foreign ownership in many sectors, but minimum capital is IDR 10 billion.',
    nonResidentStatus: 'Capital or Sector Gated',
    nonResidentNote:
      'A foreign-owned PT PMA needs at least two shareholders (individuals or companies, foreign or local), a notarised deed of establishment, a resident director and a commissioner. The authorised capital floor is IDR 10 billion per investment plan, with 25% (IDR 2.5 billion) paid up — a genuine barrier for small founders.',
    taxSummary: '22% corporate tax; 11% VAT; 20% dividend withholding (treaty relief available).',
    taxNote:
      'Indonesia taxes resident companies on worldwide income. The OSS risk-based licensing system attaches a business licence level to your KBLI activity code.',
    entityTypes: [
      {
        id: 'PMA',
        name: 'PT PMA (Foreign-Owned Company)',
        govFee: 5000000,
        feeNote: 'Government fees are small; the notary deed, AHU registration and OSS licences typically cost IDR 5–15 million',
        annual: 0,
        annualNote: 'Annual corporate tax returns and LKPM investment reports (no registry fee)',
        minCapital: 2500000000,
        capitalNote: 'IDR 2.5 billion paid-up within the IDR 10 billion authorised capital (BKPM Reg. 5/2025)',
        timeline: '4–8 weeks',
        residency: 'Resident director + commissioner required; 2 shareholders minimum',
        ownership: 'Sector-dependent',
        bestFor: 'Manufacturing, natural resources and large consumer-market operations',
        link: 'https://www.bkpm.go.id/'
      },
      {
        id: 'REP',
        name: 'Representative Office (KPPA)',
        govFee: 3000000,
        feeNote: 'Registration and licensing fees through OSS; notary and translation are market costs',
        annual: 0,
        annualNote: 'Annual activity report to BKPM',
        timeline: '2–4 weeks',
        residency: 'A local representative office head is required',
        ownership: '100% foreign ownership',
        bestFor: 'Market research and liaison — cannot earn revenue or invoice locally',
        link: 'https://www.bkpm.go.id/'
      }
    ],
    process: [
      { title: 'Check the Positive Investment List', detail: 'Confirm your KBLI code is open, and at what maximum foreign ownership.', cost: 'IDR 0', authority: 'BKPM' },
      { title: 'Reserve the company name', detail: 'Three-word name reservation through the AHU portal.', cost: 'IDR 0', authority: 'Ministry of Law' },
      { title: 'Notarise the deed of establishment', detail: 'A notary drafts and executes the deed in Indonesian, including the capital structure.', cost: 'IDR 5–15 million (market)', authority: 'Notary' },
      { title: 'Register with AHU + OSS', detail: 'Legal-entity status (SK) then NIB business identification number through OSS-RBA.', cost: 'IDR 0', authority: 'AHU / OSS' },
      { title: 'Obtain the business licence', detail: 'Risk-based licence level depends on the KBLI; some sectors need ministry approvals.', cost: 'IDR 0–5 million', authority: 'Ministry / OSS' },
      { title: 'Tax card + bank account', detail: 'NPWP tax ID, then a corporate bank account and LKPM reporting registration.', cost: 'IDR 0', authority: 'DJP / bank' }
    ],
    compliance: [
      { item: 'Annual corporate tax return', when: 'Within 4 months of year end', cost: '22%' },
      { item: 'LKPM investment report', when: 'Quarterly', cost: 'IDR 0' },
      { item: 'Audited financial statements', when: 'Annually', cost: 'IDR 25–100 million (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'BKPM — Investment Coordinating Board', url: 'https://www.bkpm.go.id/' },
      { label: 'OSS — Online Single Submission', url: 'https://oss.go.id/' }
    ]
  },

  /* ------------------------------------------------------------------ Nigeria */
  {
    id: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'Africa',
    currency: 'NGN',
    currencyCode: 'NGN',
    usdPerUnit: 0.000654,
    registry: 'CAC (Corporate Affairs Commission)',
    registryLink: 'https://www.cac.gov.ng/',
    headline: 'CAC filing for a limited company is about ₦10,000 plus stamp duty — Africa’s cheapest large-market entry.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'Foreigners may own 100% of a Nigerian limited company (except on the negative list), but at least two directors are required and a local registered address with a Nigerian resident company secretary is standard. Foreign-invested companies need NIPC registration to repatriate capital, and expatriate quotas are heavily controlled.',
    taxSummary: '30% companies income tax (0% for small companies under ₦100m turnover); 7.5% VAT.',
    taxNote:
      'Companies are taxed on worldwide income if resident in Nigeria. Withholding tax (5–10%) applies to many payments, and FIRS requires e-invoicing for large taxpayers.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Limited Company (Ltd)',
        govFee: 10500,
        feeNote: 'Name reservation ₦500–1,000 + CAC registration ₦10,000 (share capital ≤ ₦1m) + stamp duty 0.75% of share capital',
        annual: 0,
        annualNote: 'CAC annual-return fee scales with share capital; audited accounts attached (market cost)',
        minCapital: 100000,
        capitalNote: 'No statutory minimum; ₦100,000–₦1m issued capital is the market norm (₦100m for foreign-owned with NIPC)',
        timeline: '3–10 working days on the CAC portal',
        residency: 'Minimum 2 directors (individuals); a Nigerian resident company secretary is expected',
        ownership: '100% foreign ownership',
        bestFor: 'Fintech, consumer goods, energy services and the large domestic market',
        link: 'https://www.cac.gov.ng/'
      },
      {
        id: 'BN',
        name: 'Business Name (Sole Proprietorship)',
        govFee: 10500,
        feeNote: 'Business name registration ≈ ₦10,000 + ₦500 name reservation; only available to Nigerian citizens/residents',
        annual: 0,
        annualNote: 'Annual return to CAC; no audited accounts',
        timeline: '1–5 working days',
        residency: 'Foreign nationals cannot register a business name — a limited company is required',
        ownership: 'Local partner or sponsor required',
        bestFor: 'Nigerian-resident sole traders only',
        link: 'https://www.cac.gov.ng/'
      }
    ],
    process: [
      { title: 'Create a CAC account', detail: 'Register on the CAC Company Registration Portal (CRP) with an email and phone.', cost: '₦0', authority: 'CAC' },
      { title: 'Reserve the company name', detail: 'Submit two proposed names; approval usually takes 1–3 days.', cost: '₦500–1,000', authority: 'CAC' },
      { title: 'Prepare MEMART + incorporation forms', detail: 'Memorandum and Articles, particulars of directors/shareholders, statement of share capital.', cost: 'Market', authority: 'CAC' },
      { title: 'Pay CAC fees + stamp duty', detail: 'Fees scale with share capital; stamp duty is 0.75% of the share capital for companies.', cost: '₦10,000+', authority: 'CAC / FIRS' },
      { title: 'Collect the certificate', detail: 'Certificate of Incorporation, status report and TIN are issued together.', cost: 'Included', authority: 'CAC' },
      { title: 'NIPC + FIRS + bank account', detail: 'Register with NIPC for foreign participation, then TIN/FIRS and a corporate bank account.', cost: 'Market', authority: 'NIPC / FIRS' }
    ],
    compliance: [
      { item: 'Annual return (CAC)', when: 'Within 42 days of the AGM', cost: 'CAC fee by share capital' },
      { item: 'Companies income tax return', when: 'Within 6 months of year end', cost: '30%' },
      { item: 'VAT return', when: 'Monthly', cost: '7.5%' },
      { item: 'Audited financial statements', when: 'Annually', cost: 'Audit fee (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'CAC — Corporate Affairs Commission', url: 'https://www.cac.gov.ng/' },
      { label: 'FIRS — Federal Inland Revenue Service', url: 'https://www.firs.gov.ng/' }
    ]
  },

  /* ------------------------------------------------------------------ Kenya */
  {
    id: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    region: 'Africa',
    currency: 'KES',
    currencyCode: 'KES',
    usdPerUnit: 0.00775,
    registry: 'Business Registration Service (eCitizen)',
    registryLink: 'https://brs.ecitizen.go.ke/',
    headline: 'KES 10,650 for a private limited company, 3–5 days on eCitizen — one director is enough.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'Foreigners can own 100% of a Kenyan private company in most sectors. Only one director and one shareholder are needed (they can be the same person), and there is no general minimum capital. Beneficial-ownership disclosure is mandatory, and a KRA PIN plus a Kenyan bank account follow incorporation.',
    taxSummary: '30% corporate tax (25% for manufacturing / SEZ); 16% VAT; 15% dividend withholding.',
    taxNote:
      'Resident companies are taxed on worldwide income. Kenya has been aggressive on digital-economy taxation and transfer pricing, so keep intercompany pricing documented.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Limited Company (Ltd)',
        govFee: 10650,
        feeNote: 'BRS registration fee KES 10,650 (name search KES 150 separately)',
        annual: 0,
        annualNote: 'BRS annual-return fee (per schedule) + KRA filings',
        minCapital: 0,
        capitalNote: 'No general minimum capital for an ordinary private company',
        timeline: '3–5 business days',
        residency: 'At least one director and one shareholder; no residency requirement',
        ownership: '100% foreign ownership',
        bestFor: 'East African regional HQs, fintech, agri-processing and logistics',
        link: 'https://brs.ecitizen.go.ke/'
      },
      {
        id: 'BRANCH',
        name: 'Branch of a Foreign Company',
        govFee: 20000,
        feeNote: 'Registration of a foreign branch under the Companies Act; BRS fees plus document authentication',
        annual: 0,
        annualNote: 'Annual return + audited head-office and branch accounts',
        timeline: '2–4 weeks',
        residency: 'A local resident representative is required',
        ownership: '100% foreign ownership',
        bestFor: 'Contract-driven project offices',
        link: 'https://brs.ecitizen.go.ke/'
      }
    ],
    process: [
      { title: 'Search and reserve the name', detail: 'Name search and reservation through eCitizen; three proposed names can be submitted.', cost: 'KES 150', authority: 'BRS' },
      { title: 'Complete the incorporation forms', detail: 'Directors, shareholders, beneficial owners, share capital and registered office details.', cost: 'Included', authority: 'BRS' },
      { title: 'Pay the BRS invoice', detail: 'M-Pesa or card payment generates the certificate once the registrar approves.', cost: 'KES 10,650', authority: 'BRS' },
      { title: 'Obtain the KRA PIN', detail: 'Automatic via the eCitizen business profile; required before banking.', cost: 'KES 0', authority: 'KRA' },
      { title: 'Open the corporate bank account', detail: 'Banks require the certificate, CR12, KRA PIN and director IDs; in-person attendance is common.', cost: 'Market', authority: 'Bank' },
      { title: 'Sector licences', detail: 'Some sectors (financial services, health, education) need a regulator licence before trading.', cost: 'Varies', authority: 'Sector regulator' }
    ],
    compliance: [
      { item: 'Annual returns (BRS)', when: 'Within 30 days of the incorporation anniversary', cost: 'BRS fee' },
      { item: 'Income tax return (IT2C)', when: 'Within 6 months of year end', cost: '30%' },
      { item: 'VAT returns', when: 'Monthly (if registered)', cost: '16%' },
      { item: 'Audited accounts', when: 'Annually', cost: 'Audit fee (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'Business Registration Service', url: 'https://brs.ecitizen.go.ke/' },
      { label: 'Kenya Revenue Authority', url: 'https://www.kra.go.ke/' }
    ]
  },

  /* ------------------------------------------------------------------ South Africa */
  {
    id: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    region: 'Africa',
    currency: 'ZAR',
    currencyCode: 'ZAR',
    usdPerUnit: 0.0571,
    registry: 'CIPC',
    registryLink: 'https://www.cipc.co.za/',
    headline: 'R125 to register a private company with CIPC — one of the cheapest registries in the world.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'There is no citizenship or residency requirement for shareholders, but a South African company needs a local registered office and a public officer for tax purposes. Exchange-control rules (SARB) mean a non-resident’s share capital must be brought in through an authorised dealer with a "share certificates" endorsement.',
    taxSummary: '27% corporate income tax; 15% VAT; 20% dividends tax.',
    taxNote:
      'Resident companies are taxed on worldwide income. Dividends paid to non-residents carry 20% dividends tax unless a treaty reduces it. Transfer pricing rules apply to cross-border group dealings.',
    entityTypes: [
      {
        id: 'PTY',
        name: 'Private Company (Pty Ltd)',
        govFee: 175,
        feeNote: 'CIPC registration R125 + optional name reservation R50 = R175 (customised MOI R425)',
        annual: 0,
        annualNote: 'CIPC annual return — turnover-based fee, filed within 30 business days of the anniversary (market + statutory combined)',
        minCapital: 0,
        capitalNote: 'No minimum share capital',
        timeline: 'Same day to 5 business days',
        residency: 'No resident director requirement; local registered office + public officer needed',
        ownership: '100% foreign ownership',
        bestFor: 'African market entry, mining services, agri and tech',
        link: 'https://www.cipc.co.za/'
      },
      {
        id: 'EXT',
        name: 'External Company (Branch)',
        govFee: 2000,
        feeNote: 'Registration of an external company: CIPC filing plus translation/authentication of foreign documents',
        annual: 0,
        annualNote: 'Annual return + audited financial statements of the foreign parent',
        timeline: '2–4 weeks',
        residency: 'A local authorised representative is required',
        ownership: '100% foreign ownership',
        bestFor: 'Project offices and contractors executing local contracts',
        link: 'https://www.cipc.co.za/'
      }
    ],
    process: [
      { title: 'Reserve the name (optional)', detail: 'Electronic reservation costs R50 and holds the name; otherwise register with a numbered name.', cost: 'R50', authority: 'CIPC' },
      { title: 'Prepare the MOI', detail: 'Use the standard MOI or a customised one; directors, incorporators and share structure are listed.', cost: 'R0–R425', authority: 'CIPC' },
      { title: 'File on the CIPC portal', detail: 'Register the company and receive the registration number immediately.', cost: 'R125', authority: 'CIPC' },
      { title: 'Register for tax', detail: 'SARS issues the income tax number automatically; register for VAT if turnover exceeds R1m.', cost: 'R0', authority: 'SARS' },
      { title: 'Appoint the public officer', detail: 'A resident public officer is required for tax filings; appoint within 1 month.', cost: 'Market', authority: 'SARS' },
      { title: 'B-BBEE + bank account', detail: 'B-BBEE affidavit/certificate (often required by corporates) and a business bank account.', cost: 'Market', authority: 'Bank / SANAS' }
    ],
    compliance: [
      { item: 'Annual return (CIPC)', when: 'Within 30 business days of the anniversary', cost: 'Turnover-based' },
      { item: 'ITR14 corporate return', when: 'Within 12 months of the financial year end', cost: '27%' },
      { item: 'Provisional tax', when: 'Twice a year (Aug/Feb)', cost: 'Based on estimate' },
      { item: 'Audited financial statements', when: 'Annually, depending on the public-interest score', cost: 'Audit/review fee (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'CIPC — company registration', url: 'https://www.cipc.co.za/' },
      { label: 'SARS — corporate income tax', url: 'https://www.sars.gov.za/types-of-tax/corporate-income-tax/' }
    ]
  },

  /* ------------------------------------------------------------------ Germany */
  {
    id: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    currency: 'EUR',
    currencyCode: 'EUR',
    usdPerUnit: 1.16,
    registry: 'Handelsregister (local court) via notary',
    registryLink: 'https://www.unternehmensregister.de/',
    headline: 'A GmbH needs €25,000 of capital, a notary and a local managing director — the UG (haftungsbeschränkt) is the €1 alternative.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'No nationality requirement for shareholders or managing directors, but the managing director must be able to be served with documents in Germany and must register a German business address. Formation must go through a German notary, and a blocked bank account must hold the paid-in capital before registration.',
    taxSummary: '15% corporate tax + ~14–17% trade tax (effective ~30%); 19% VAT.',
    taxNote:
      'German-resident companies are taxed on worldwide income. Trade tax applies on top of corporate tax and depends on the municipality. A permanent establishment or German director can create German tax nexus.',
    entityTypes: [
      {
        id: 'GMBH',
        name: 'GmbH (Limited Liability Company)',
        govFee: 375,
        feeNote: 'Court registration €150–€225 + publication ~€40 (notary fees are statutory and separate: ~€500–1,000)',
        annual: 0,
        annualNote: 'No annual registry fee; trade tax returns, accounting and (often) audit are market costs',
        minCapital: 25000,
        capitalNote: '€25,000 minimum, at least €12,500 paid in before registration',
        timeline: '2–4 weeks with a notary appointment',
        residency: 'German-registered address and a director able to be served in Germany',
        ownership: '100% foreign ownership',
        bestFor: 'EU-market credibility, German customers and hiring',
        link: 'https://www.unternehmensregister.de/'
      },
      {
        id: 'UG',
        name: 'UG (haftungsbeschränkt)',
        govFee: 375,
        feeNote: 'Court registration €150–€225 + publication; notary ~€300–500 (market)',
        annual: 0,
        annualNote: 'Same ongoing obligations; must reserve 25% of profit until capital reaches €25,000',
        minCapital: 1,
        capitalNote: '€1 minimum capital (25% profit-retention duty until €25,000)',
        timeline: '1–3 weeks',
        residency: 'Same German address/director requirements',
        ownership: '100% foreign ownership',
        bestFor: 'Bootstrapped founders testing the German market',
        link: 'https://www.unternehmensregister.de/'
      }
    ],
    process: [
      { title: 'Notarise the articles of association', detail: 'A German notary drafts/executes the articles and certifies the managing director.', cost: '€500–1,000 (market, statutory scale)', authority: 'Notary' },
      { title: 'Open a blocked bank account', detail: 'Deposit the paid-in capital (€12,500 for a GmbH, or the full UG capital).', cost: 'Bank fee', authority: 'Bank' },
      { title: 'File with the commercial register', detail: 'The notary files electronically; the entry is published in the Handelsregister.', cost: '€150–225', authority: 'Amtsgericht' },
      { title: 'Register with the tax office', detail: 'Fragebogen zur steuerlichen Erfassung — issues the tax number and decides VAT rules.', cost: '€0', authority: 'Finanzamt' },
      { title: 'Trade licence + IHK membership', detail: 'Gewerbeanmeldung at the municipality and automatic Chamber of Commerce membership.', cost: '€15–65', authority: 'Municipality / IHK' },
      { title: 'Bookkeeping & payroll setup', detail: 'German accounting standards, e-invoicing and payroll registration are compulsory.', cost: 'Market', authority: 'Accountant' }
    ],
    compliance: [
      { item: 'Trade tax and corporate tax returns', when: 'Annually (extension automatic)', cost: '30% combined' },
      { item: 'Balance-sheet filing (Offenlegung)', when: 'Within 12 months of year end', cost: '€0' },
      { item: 'VAT returns', when: 'Monthly/quarterly', cost: '19%' },
      { item: 'Audit', when: 'Above size thresholds', cost: 'Market' }
    ],
    isPopular: false,
    sources: [
      { label: 'German Corporate Register', url: 'https://www.unternehmensregister.de/' },
      { label: 'German Federal Finance Ministry', url: 'https://www.bundesfinanzministerium.de/EN/Home/home_node.html' }
    ]
  },

  /* ------------------------------------------------------------------ Ireland */
  {
    id: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    region: 'Europe',
    currency: 'EUR',
    currencyCode: 'EUR',
    usdPerUnit: 1.16,
    registry: 'Companies Registration Office (CORE)',
    registryLink: 'https://www.cro.ie/',
    headline: '€50 Form A1 online, 12.5% corporate tax — but a non-EEA board needs an s137 bond.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'One director must be resident in an EEA member state. If the whole board is outside the EEA, the company must post an s137 insurance bond (typically €1,000–2,000/yr) or appoint an EEA-resident director. Every director needs a PPSN or verified identity (Form VIF since April 2026).',
    taxSummary: '12.5% trading corporate tax; 25% on non-trading income; 6.25% for certain IP under the Knowledge Development Box.',
    taxNote:
      'Irish-resident companies are taxed on worldwide income. The withholding tax on dividends to non-residents is generally exempt for treaty residents, and Ireland has a wide treaty network.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Company Limited by Shares (LTD)',
        govFee: 50,
        feeNote: 'CRO Form A1 online €50 (≈double on paper); optional name reservation €25',
        annual: 20,
        annualNote: 'Annual return (Form B1) €20 + CRO fees for late filing',
        minCapital: 1,
        capitalNote: 'No minimum — one €1 share is standard',
        timeline: 'About 5 business days online',
        residency: 'One EEA-resident director, or an s137 bond if the board is outside the EEA',
        ownership: '100% foreign ownership',
        bestFor: 'EU access with an English-speaking common-law system and US investor familiarity',
        link: 'https://www.cro.ie/'
      },
      {
        id: 'DAC',
        name: 'Designated Activity Company (DAC)',
        govFee: 50,
        feeNote: 'Same CRO €50 online fee; objects clause drafting is market cost',
        annual: 20,
        annualNote: 'Annual return €20 + accounts',
        timeline: '5–10 business days',
        residency: 'Same EEA-director / s137 rule',
        ownership: '100% foreign ownership',
        bestFor: 'Structured finance, joint ventures and activities requiring a defined objects clause',
        link: 'https://www.cro.ie/'
      }
    ],
    process: [
      { title: 'Reserve the company name (optional)', detail: 'Name reservation is optional but avoids rejection; check the CRO register first.', cost: '€25', authority: 'CRO' },
      { title: 'Prepare the constitution', detail: 'A single-document LTD constitution in the statutory form.', cost: 'Market', authority: 'Company' },
      { title: 'Verify director identity (Form VIF)', detail: 'PPSN or verified identity; a non-EEA director must complete the VIF with witnessed ID.', cost: '€0', authority: 'CRO' },
      { title: 'File Form A1 on CORE', detail: 'Submit the incorporation application with the registered office and EEA-resident director or bond.', cost: '€50', authority: 'CRO' },
      { title: 'Revenue registration', detail: 'Corporation tax, PAYE and VAT registrations once trading begins.', cost: '€0', authority: 'Revenue' },
      { title: 'RBO beneficial ownership filing', detail: 'Register beneficial owners within 5 months of incorporation.', cost: '€0', authority: 'RBO' }
    ],
    compliance: [
      { item: 'Annual return (B1)', when: 'Every 12 months, within 56 days of the made-up date', cost: '€20' },
      { item: 'Corporation tax return (CT1)', when: 'Within 9 months of the accounting period', cost: '12.5%' },
      { item: 'RBO updates', when: 'Within 14 days of a change', cost: '€0' },
      { item: 's137 bond renewal', when: 'Annually if the board is outside the EEA', cost: '€1,000–2,000 (market)' }
    ],
    isPopular: false,
    sources: [
      { label: 'Companies Registration Office', url: 'https://www.cro.ie/' },
      { label: 'Revenue — corporation tax', url: 'https://www.revenue.ie/en/companies-and-charities/corporation-tax-for-companies/index.aspx' }
    ]
  },

  /* ------------------------------------------------------------------ Estonia */
  {
    id: 'EE',
    name: 'Estonia',
    flag: '🇪🇪',
    region: 'Europe',
    currency: 'EUR',
    currencyCode: 'EUR',
    usdPerUnit: 1.16,
    registry: 'e-Business Register',
    registryLink: 'https://www.rik.ee/en/e-business-register',
    headline: 'The original e-Residency jurisdiction: €150 card + €265 state fee, and 0% tax on retained profits.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'e-Residency lets you sign documents and run an OÜ entirely online, but it is not a visa or tax residency. You need a legal address and a "contact person" in Estonia (usually a service provider), and the company must file its annual report through the e-Business Register.',
    taxSummary: '0% on undistributed profits; 22% corporate income tax on distributions (the planned rise to 24% was scrapped).',
    taxNote:
      'Estonia taxes distributed profits rather than retained earnings. If the company is managed from abroad, the tax residence of the company can be challenged — management and control matters.',
    entityTypes: [
      {
        id: 'OU',
        name: 'Private Limited Company (OÜ)',
        govFee: 265,
        feeNote: 'State fee €265 online (€200 via notary route); e-Residency card €150 extra',
        annual: 0,
        annualNote: 'No annual registry fee; annual report + contact-person and address service (market)',
        minCapital: 1,
        capitalNote: 'Share capital from €0.01',
        timeline: '1–5 business days online',
        residency: 'No resident director required; Estonian address + contact person mandatory',
        ownership: '100% foreign ownership',
        bestFor: 'EU-licensed online businesses, consultants and holding companies',
        link: 'https://www.rik.ee/en/e-business-register'
      },
      {
        id: 'BRANCH',
        name: 'Branch of a Foreign Company',
        govFee: 265,
        feeNote: 'Registration fee €265; the parent’s documents need apostille/translation',
        annual: 0,
        annualNote: 'Audited annual report of the branch',
        timeline: '2–4 weeks',
        residency: 'A local contact person and address are required',
        ownership: '100% foreign ownership',
        bestFor: 'Formalising EU operations without a separate subsidiary',
        link: 'https://www.rik.ee/en/e-business-register'
      }
    ],
    process: [
      { title: 'Apply for e-Residency', detail: 'Online application, passport scan and motivation; collect the card at an embassy or in Tallinn.', cost: '€150', authority: 'e-Residency programme' },
      { title: 'Choose address + contact person', detail: 'A service provider supplies both; a contact person is legally required.', cost: '€50–150/yr (market)', authority: 'Private provider' },
      { title: 'Register the OÜ', detail: 'File through the e-Business Register with the articles, capital and board member details.', cost: '€265', authority: 'RIK' },
      { title: 'Open a bank/payment account', detail: 'Estonian banks apply enhanced KYC; Wise Business or a fintech is common for non-residents.', cost: '€0–300 (market)', authority: 'Bank / EMI' },
      { title: 'Register for VAT (if applicable)', detail: 'Mandatory for taxable turnover above €40,000; EU OSS for cross-border B2C.', cost: '€0', authority: 'Tax Board' },
      { title: 'Accounting setup', detail: 'Monthly bookkeeping is required from the first transaction.', cost: '€50–200/mo (market)', authority: 'Accountant' }
    ],
    compliance: [
      { item: 'Annual report (majandusaasta aruanne)', when: 'Within 6 months of the financial year end', cost: '€0' },
      { item: 'Corporate income tax on distributions', when: 'Monthly return when profits distributed', cost: '22%' },
      { item: 'VAT returns', when: 'Monthly if registered', cost: '24% standard rate' }
    ],
    isPopular: false,
    sources: [
      { label: 'Estonian e-Business Register', url: 'https://www.rik.ee/en/e-business-register' },
      { label: 'e-Residency official', url: 'https://www.e-resident.gov.ee/' }
    ]
  },

  /* ------------------------------------------------------------------ Cyprus */
  {
    id: 'CY',
    name: 'Cyprus',
    flag: '🇨🇾',
    region: 'Europe',
    currency: 'EUR',
    currencyCode: 'EUR',
    usdPerUnit: 1.16,
    registry: 'Department of Registrar of Companies',
    registryLink: 'https://www.companies.gov.cy/en',
    headline: '€105 registration, 12.5% tax and a wide treaty network — the €350 annual levy was abolished in 2024.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'Shareholders and directors can be non-resident, and the company needs a Cyprus registered office plus a company secretary. An audit is mandatory every year regardless of size, and banks require full KYC on every beneficial owner.',
    taxSummary: '12.5% corporate tax; 0% on dividends to non-residents in most treaty cases; 19% VAT.',
    taxNote:
      'Cyprus is a full member of the EU and applies EU directives. Non-dom status gives individuals a 17-year exemption from dividend/interest tax, but the company still pays 12.5%.',
    entityTypes: [
      {
        id: 'LTD',
        name: 'Private Company Limited by Shares',
        govFee: 105,
        feeNote: 'Registrar fee €105 standard / €205 expedited + name approval €30–60 + certificates',
        annual: 0,
        annualNote: 'No annual government levy since 2024 (the €350 levy was abolished); HE32 annual return + audited accounts',
        minCapital: 1,
        capitalNote: 'No minimum for most activities (€1 is standard)',
        timeline: '5–15 working days',
        residency: 'No Cypriot resident director required; local registered office + secretary needed',
        ownership: '100% foreign ownership',
        bestFor: 'EU holding companies, royalties, IP and shipping',
        link: 'https://www.companies.gov.cy/en'
      },
      {
        id: 'BRANCH',
        name: 'Branch of an Overseas Company',
        govFee: 105,
        feeNote: 'Registration of an overseas branch; certified translations and apostilles are market cost',
        annual: 0,
        annualNote: 'Annual return with audited branch accounts',
        timeline: '2–4 weeks',
        residency: 'Local authorised representative required',
        ownership: '100% foreign ownership',
        bestFor: 'Group operations inside the EU',
        link: 'https://www.companies.gov.cy/en'
      }
    ],
    process: [
      { title: 'Name approval', detail: 'Submit proposed names to the Registrar; approval usually within 2–5 days.', cost: '€30–60', authority: 'Registrar' },
      { title: 'Prepare HE1 + constitution', detail: 'Lawyer drafts the memorandum/articles and the statutory declaration of compliance.', cost: 'Market', authority: 'Lawyer / notary' },
      { title: 'File HE1–HE3', detail: 'Registered office, directors and secretary are declared alongside the incorporation form.', cost: '€105', authority: 'Registrar' },
      { title: 'Tax identification', detail: 'Register with the Tax Department for a TIN and, if needed, VAT and VIES.', cost: '€0', authority: 'Tax Department' },
      { title: 'Bank account', detail: 'Enhanced due diligence applies to non-resident UBOs; expect several weeks.', cost: 'Market', authority: 'Bank' },
      { title: 'Auditor appointment', detail: 'A Cyprus-licensed auditor must be appointed; audited accounts are filed annually.', cost: '€1,000–3,000/yr (market)', authority: 'ICPAC' }
    ],
    compliance: [
      { item: 'Annual return (HE32)', when: 'Annually, with audited accounts', cost: '€0 registry fee' },
      { item: 'Audited financial statements', when: 'Within 6 months of year end', cost: 'Market' },
      { item: 'Corporate tax return', when: 'Within 15 months of year end', cost: '12.5%' },
      { item: 'VAT returns', when: 'Quarterly if registered', cost: '19%' }
    ],
    isPopular: false,
    sources: [
      { label: 'Cyprus Registrar of Companies', url: 'https://www.companies.gov.cy/en' },
      { label: 'Cyprus Tax Department', url: 'https://tax.gov.cy/en/' }
    ]
  },

  /* ------------------------------------------------------------------ Panama */
  {
    id: 'PA',
    name: 'Panama',
    flag: '🇵🇦',
    region: 'Latin America & Caribbean',
    currency: 'USD',
    currencyCode: 'USD',
    usdPerUnit: 1,
    registry: 'Registro Público (Mercantile Registry)',
    registryLink: 'https://www.registro-publico.gob.pa/',
    headline: 'A territorial-tax corporation from ~$250 in registry fees, with a $300 annual franchise tax.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'A Panamanian S.A. needs three directors (any nationality, no residency) and a licensed resident agent. Shareholder identity is not publicly disclosed if bearer/nominee structures are used. A registered office in Panama is mandatory.',
    taxSummary: 'Territorial: 0% on foreign-source income; 25% on Panama-source income.',
    taxNote:
      'Panama taxes only Panama-source income. Banks and counterparties increasingly demand substance and beneficial-ownership evidence despite the territorial regime.',
    entityTypes: [
      {
        id: 'SA',
        name: 'Sociedad Anónima (S.A.)',
        govFee: 300,
        feeNote: 'Government/registry fees from ~$250–$300 (notary, registration and protocolisation)',
        annual: 300,
        annualNote: 'Annual franchise tax $300 (Tasa Única) + registered agent $250–$500 (market)',
        minCapital: 10000,
        capitalNote: 'Standard capital US$10,000 (no minimum paid-in)',
        timeline: '3–10 business days',
        residency: '3 directors any nationality; licensed resident agent + local office required',
        ownership: '100% foreign ownership',
        bestFor: 'Offshore holding, international invoicing and asset protection',
        link: 'https://www.registro-publico.gob.pa/'
      },
      {
        id: 'FOUNDATION',
        name: 'Private Interest Foundation',
        govFee: 350,
        feeNote: 'Registration and protocolisation from ~$350; notary and agent fees are market costs',
        annual: 300,
        annualNote: 'Annual franchise tax $300 + resident agent',
        timeline: '1–3 weeks',
        residency: 'Local agent and foundation council required',
        ownership: '100% foreign ownership',
        bestFor: 'Wealth structuring, succession and holding family assets',
        link: 'https://www.registro-publico.gob.pa/'
      }
    ],
    process: [
      { title: 'Engage a resident agent', detail: 'Only a Panamanian lawyer/firm can file; they also act as registered agent.', cost: '$250–600 (market)', authority: 'Resident agent' },
      { title: 'Reserve the corporate name', detail: 'Name availability check at the Mercantile Registry.', cost: '$0–50', authority: 'Registro Público' },
      { title: 'Draft the pacto social', detail: 'Articles in Spanish with directors, capital and purpose; notarised before a Panamanian notary.', cost: 'Market', authority: 'Notary' },
      { title: 'File for registration', detail: 'Registry entry returns the registration number; publish the incorporation notice.', cost: '~$250–300', authority: 'Registro Público' },
      { title: 'Pay the franchise tax + annual agent', detail: 'Tasa Única $300 is due each year; the agent handles it.', cost: '$300/yr', authority: 'MEF' },
      { title: 'Banking + accounting', detail: 'Panama banks apply strict KYC; bookkeeping is required but accounts are not publicly filed.', cost: 'Market', authority: 'Bank' }
    ],
    compliance: [
      { item: 'Annual franchise tax (Tasa Única)', when: 'By 15 July (first half) or 15 January (second half)', cost: '$300' },
      { item: 'Registered agent renewal', when: 'Annually', cost: '$250–500 (market)' },
      { item: 'Annual declaration of income', when: 'Annually', cost: '$0 (territorial)' },
      { item: 'UBO / accounting records', when: 'Maintained at the agent', cost: 'Market' }
    ],
    isPopular: false,
    sources: [
      { label: 'Panama Public Registry', url: 'https://www.registro-publico.gob.pa/' }
    ]
  },

  /* ------------------------------------------------------------------ BVI */
  {
    id: 'VG',
    name: 'British Virgin Islands',
    flag: '🇻🇬',
    region: 'Latin America & Caribbean',
    currency: 'USD',
    currencyCode: 'USD',
    usdPerUnit: 1,
    registry: 'BVI Financial Services Commission',
    registryLink: 'https://www.bvifsc.vg/',
    headline: 'The classic offshore business company: ~$450 to incorporate, $450–$1,100 a year to keep, zero tax.',
    nonResidentStatus: 'Fully Open to Non-Residents',
    nonResidentNote:
      'A BVI business company needs a licensed registered agent and registered office in the BVI; directors and shareholders may be anywhere. Names of directors are not public. Economic substance requirements apply to certain "relevant activities" (banking, IP, holding, distribution, etc.).',
    taxSummary: '0% corporate tax, 0% capital gains, 0% withholding.',
    taxNote:
      'BVI companies are tax-neutral. Owners pay tax where they are resident, and economic-substance rules plus CRS reporting mean "zero tax" is only true at the BVI level.',
    entityTypes: [
      {
        id: 'BC',
        name: 'BVI Business Company (BC)',
        govFee: 450,
        feeNote: 'Government incorporation fee from ~$450 (5-year licence option available)',
        annual: 450,
        annualNote: 'Annual government licence fee ~$450 (higher for high-capital/PE structures) + agent $500–1,500 (market)',
        minCapital: 0,
        capitalNote: 'No minimum capital; standard US$50,000 authorised capital',
        timeline: '1–3 business days',
        residency: 'Registered agent + BVI registered office mandatory; no resident director',
        ownership: '100% foreign ownership',
        bestFor: 'International holding, joint ventures, funds and pre-IPO structuring',
        link: 'https://www.bvifsc.vg/'
      },
      {
        id: 'SEGREGATED',
        name: 'Segregated Portfolio Company (SPC)',
        govFee: 1200,
        feeNote: 'SPC registration carries a higher government fee than a standard BC',
        annual: 1200,
        annualNote: 'Annual licence fee scales with the number of segregated portfolios',
        timeline: '1–3 weeks',
        residency: 'Licensed agent and BVI office required',
        ownership: '100% foreign ownership',
        bestFor: 'Investment funds and insurance vehicles isolating assets by portfolio',
        link: 'https://www.bvifsc.vg/'
      }
    ],
    process: [
      { title: 'Engage a licensed agent', detail: 'Only a BVI-licensed agent can incorporate and must supply the registered office.', cost: '$500–1,500 (market)', authority: 'BVI FSC licensee' },
      { title: 'Check the name', detail: 'Must end with Ltd, Limited, Corp, Corporation, Inc or similar; restricted words need consent.', cost: 'Included', authority: 'Registry of Corporate Affairs' },
      { title: 'File the memorandum + articles', detail: 'Agent files M&A with the Registry of Corporate Affairs.', cost: '~$450', authority: 'Registry' },
      { title: 'Issue shares and appoint directors', detail: 'First directors’ resolutions and share register are kept at the agent’s office.', cost: 'Included', authority: 'Company' },
      { title: 'Economic substance assessment', detail: 'Determine whether the company conducts a "relevant activity" and file the annual report accordingly.', cost: 'Market', authority: 'BVI ITA' },
      { title: 'Banking', detail: 'Most BVI companies bank in Hong Kong, Singapore, Switzerland or via EMIs; KYC is heavy.', cost: 'Market', authority: 'Bank' }
    ],
    compliance: [
      { item: 'Annual licence fee', when: '31 May (or 30 November for second-half incorporations)', cost: '$450+' },
      { item: 'Registered agent renewal', when: 'Annually', cost: '$500–1,500 (market)' },
      { item: 'Economic substance report', when: 'Within 6 months of year end', cost: 'Market' },
      { item: 'Beneficial ownership filing', when: 'At incorporation and on change (via agent)', cost: '$0' }
    ],
    isPopular: false,
    sources: [
      { label: 'BVI Financial Services Commission', url: 'https://www.bvifsc.vg/' }
    ]
  },

  /* ------------------------------------------------------------------ Australia */
  {
    id: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    currency: 'AUD',
    currencyCode: 'AUD',
    usdPerUnit: 0.658,
    registry: 'ASIC',
    registryLink: 'https://asic.gov.au/',
    headline: 'A$636 ASIC registration and one Australian-resident director — that residency rule is the real gate.',
    nonResidentStatus: 'Open with a Local Agent/Director',
    nonResidentNote:
      'A proprietary company must have at least one director ordinarily resident in Australia, plus an Australian registered office. Foreign shareholders can own 100%. Foreign investment approval (FIRB) applies to certain acquisitions and land, not to ordinary small-business formation.',
    taxSummary: '25% base-rate entity tax (aggregated turnover ≤ A$50m) or 30%; 10% GST.',
    taxNote:
      'Australian-resident companies are taxed on worldwide income. Dividends to non-residents carry 30% withholding unless a treaty reduces it, and franking credits are generally lost to foreign shareholders.',
    entityTypes: [
      {
        id: 'PTY',
        name: 'Proprietary Limited Company (Pty Ltd)',
        govFee: 636,
        feeNote: 'ASIC registration A$636 from 1 July 2026 (A$611 in 2025–26)',
        annual: 342,
        annualNote: 'ASIC annual review fee A$342 from 1 July 2026',
        minCapital: 0,
        capitalNote: 'No minimum capital',
        timeline: '1–3 business days online',
        residency: 'At least one director ordinarily resident in Australia',
        ownership: 'Resident director required',
        bestFor: 'Australian customers, government work and local hiring',
        link: 'https://asic.gov.au/for-business/registering-a-company/'
      },
      {
        id: 'BRANCH',
        name: 'Foreign Company Branch (ARBN)',
        govFee: 636,
        feeNote: 'ASIC registration of a foreign company; A$636 lodgement plus certified copies of home-registry documents',
        annual: 342,
        annualNote: 'Annual review fee + lodged financial statements of the foreign parent',
        timeline: '2–4 weeks',
        residency: 'A local agent (Australian resident or company) is required',
        ownership: '100% foreign ownership',
        bestFor: 'Contractors entering Australia for a defined project',
        link: 'https://asic.gov.au/'
      }
    ],
    process: [
      { title: 'Appoint a resident director', detail: 'Required by law; nominee director services are market-priced if you will not relocate.', cost: 'A$3,000–12,000/yr (market)', authority: 'Private provider' },
      { title: 'Secure a registered office', detail: 'An Australian street address (not a PO box) is mandatory.', cost: 'A$200–600/yr (market)', authority: 'Private provider' },
      { title: 'Check the name + reserve', detail: 'Name availability is checked during registration; a business name is a separate ASIC registration.', cost: 'Included / A$44 business name', authority: 'ASIC' },
      { title: 'Register the company', detail: 'Online application with officeholders, shareholders and share structure.', cost: 'A$636', authority: 'ASIC' },
      { title: 'Apply for ABN + TFN', detail: 'Australian Business Number and tax file number from the ATO (free).', cost: 'A$0', authority: 'ATO' },
      { title: 'GST + PAYG registration', detail: 'Register for GST at A$75,000 turnover; PAYG withholding once you hire.', cost: 'A$0', authority: 'ATO' }
    ],
    compliance: [
      { item: 'ASIC annual review', when: 'Each anniversary of registration', cost: 'A$342' },
      { item: 'Company tax return', when: 'By 15 July (or later with a tax agent)', cost: '25–30%' },
      { item: 'BAS / GST returns', when: 'Quarterly if registered', cost: '10%' },
      { item: 'Financial records + solvency resolution', when: 'Annually', cost: 'Market' }
    ],
    isPopular: true,
    sources: [
      { label: 'ASIC — register a company', url: 'https://asic.gov.au/for-business/registering-a-company/' },
      { label: 'ASIC — fees', url: 'https://asic.gov.au/for-business/payments-fees-and-invoices/asic-fees/' }
    ]
  }
];

export const REGIONS: Region[] = [
  'North America',
  'Europe',
  'Middle East',
  'South Asia',
  'East Asia',
  'Southeast Asia',
  'Africa',
  'Oceania',
  'Latin America & Caribbean'
];

/** Format a number in a currency, e.g. `money(6655, 'PKR')`. */
export function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: amount < 100 ? 2 : 0
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString('en-US')}`;
  }
}

/** Convert a local-currency amount to USD using the indicative rate. */
export function toUsd(amount: number, country: Country): number {
  return amount * country.usdPerUnit;
}

/** Cheapest declared government formation fee in a country, in USD. */
export function cheapestUsd(country: Country): number {
  return Math.min(...country.entityTypes.map((e) => toUsd(e.govFee, country)));
}

/** Cheapest declared recurring government cost in a country, in USD. */
export function cheapestAnnualUsd(country: Country): number {
  return Math.min(...country.entityTypes.map((e) => toUsd(e.annual, country)));
}

export const NON_RESIDENT_STATUS_STYLES: Record<NonResidentStatus, string> = {
  'Fully Open to Non-Residents': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Open with a Local Agent/Director': 'bg-blue-50 text-blue-700 border-blue-200',
  'Capital or Sector Gated': 'bg-amber-50 text-amber-800 border-amber-200',
  'Practically Restricted': 'bg-rose-50 text-rose-700 border-rose-200'
};
