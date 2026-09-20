export interface UKEntityType {
  id: string;
  name: string;
  formationFeeDigital: number; // £ digital incorporation fee
  formationFeeLabel: string;
  annualFee: number; // £ annual compliance cost (confirmation statement, digital)
  annualLabel: string;
  suitability: 'Ideal for Non-Residents' | 'Possible with Conditions' | 'Specialist Route';
  suitabilityDescription: string;
  isPopular: boolean;
  processingTime: string;
  officialLink: string;
  additionalNotes?: string;
}

export const UK_ENTITY_TYPES: UKEntityType[] = [
  {
    id: 'LTD',
    name: 'Private Company Limited by Shares (LTD)',
    formationFeeDigital: 100,
    formationFeeLabel: '£100 online (£124 paper, £156 same-day)',
    annualFee: 50,
    annualLabel: 'Confirmation statement £50/yr (£110 paper)',
    suitability: 'Ideal for Non-Residents',
    suitabilityDescription:
      'The standard UK company for remote founders. One director and one shareholder (can be the same person), aged 16+, any nationality, and directors do NOT have to live in the UK. The company just needs a UK registered office address that is an "appropriate address" (not a PO Box alone).',
    isPopular: true,
    processingTime: 'Usually within 24 hours (online)',
    officialLink: 'https://www.gov.uk/limited-company-formation',
    additionalNotes:
      'Since 18 November 2025 every director and PSC must first verify their identity with Companies House (free via GOV.UK One Login) and receive a personal code before the company can be registered.'
  },
  {
    id: 'LBG',
    name: 'Private Company Limited by Guarantee',
    formationFeeDigital: 100,
    formationFeeLabel: '£100 online (£124 paper)',
    annualFee: 50,
    annualLabel: 'Confirmation statement £50/yr (£110 paper)',
    suitability: 'Possible with Conditions',
    suitabilityDescription:
      'Has no shares and no shareholders — instead there are guarantors (members) who agree to contribute a nominal guaranteed sum (often £1) if it is wound up. Normally used for non-profit purposes such as clubs, associations, sports bodies and community projects; profits are usually reinvested.',
    isPopular: false,
    processingTime: 'Usually within 24 hours (online)',
    officialLink: 'https://www.gov.uk/limited-company-formation',
    additionalNotes:
      'Cannot easily distribute profits to members — unsuitable for normal trading businesses that want to pay dividends.'
  },
  {
    id: 'LLP',
    name: 'Limited Liability Partnership (LLP)',
    formationFeeDigital: 100,
    formationFeeLabel: '£100 online (£124 paper, £156 same-day)',
    annualFee: 50,
    annualLabel: 'Confirmation statement £50/yr (£110 paper)',
    suitability: 'Possible with Conditions',
    suitabilityDescription:
      'Needs at least 2 members (people or companies), including at least 2 "designated members" responsible for filings. Combines limited liability with partnership flexibility — the LLP is tax-transparent, so members pay income tax on their share of profits through Self Assessment rather than Corporation Tax.',
    isPopular: false,
    processingTime: 'Usually within 24 hours (online)',
    officialLink: 'https://www.gov.uk/guidance/set-up-and-run-a-limited-liability-partnership-llp',
    additionalNotes:
      'Popular with professional firms (accountants, solicitors). Members who live abroad still usually register individually with HMRC for Self Assessment on UK LLP profits.'
  },
  {
    id: 'CIC',
    name: 'Community Interest Company (CIC)',
    formationFeeDigital: 115,
    formationFeeLabel: '£115 online (£139 paper) — Regulator approves',
    annualFee: 50,
    annualLabel: 'Confirmation statement £50/yr + CIC34 report',
    suitability: 'Specialist Route',
    suitabilityDescription:
      'A limited company designed for social enterprise. The application is reviewed and approved by the CIC Regulator, requires an asset lock restricting transfers of company assets, limits on dividend payouts, and an annual community interest report (form CIC34) filed with accounts showing the company benefited the community.',
    isPopular: false,
    processingTime: 'Longer than a normal LTD (Regulator approval)',
    officialLink: 'https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies',
    additionalNotes:
      'Choose this only if your primary purpose is community benefit. Grants bodies and commissioners often require CIC status.'
  },
  {
    id: 'PLC',
    name: 'Public Limited Company (PLC)',
    formationFeeDigital: 124,
    formationFeeLabel: '£124 paper / incorporation via agents-software',
    annualFee: 50,
    annualLabel: 'Confirmation statement £50/yr (£110 paper)',
    suitability: 'Specialist Route',
    suitabilityDescription:
      'Can offer shares to the public. Requires minimum allotted share capital of £50,000 with at least 25% (£12,500) plus the whole of any premium paid up in full, at least 2 directors, a qualified company secretary, and a trading certificate from Companies House before it can trade or borrow.',
    isPopular: false,
    processingTime: 'A few weeks (trading certificate required)',
    officialLink: 'https://www.gov.uk/limited-company-formation',
    additionalNotes:
      'Late filing penalties for PLCs are far higher (£750–£7,500). Almost never the right vehicle for a bootstrapped non-resident founder.'
  },
  {
    id: 'LP',
    name: 'Limited Partnership (LP)',
    formationFeeDigital: 124,
    formationFeeLabel: '£124 (paper form LP5 only)',
    annualFee: 0,
    annualLabel: 'No accounts filed at Companies House*',
    suitability: 'Specialist Route',
    suitabilityDescription:
      'Needs at least one general partner (full personal liability, manages the business) and one limited partner (liability capped at contribution, cannot take part in management). Registered by post on form LP5. An English/Welsh/NI LP has no separate legal personality; its partners are usually taxed through Self Assessment.',
    isPopular: false,
    processingTime: 'About 5 working days (paper)',
    officialLink: 'https://www.gov.uk/guidance/set-up-and-run-a-limited-partnership',
    additionalNotes:
      '*Since the Economic Crime and Corporate Transparency Act 2023, all UK LPs must maintain a UK registered office and file a confirmation statement (£50) like companies. Historic light-touch rules are gone.'
  },
  {
    id: 'SLP',
    name: 'Scottish Limited Partnership (SLP)',
    formationFeeDigital: 124,
    formationFeeLabel: '£124 (paper form LP5 + £110/yr "annual fee")',
    annualFee: 110,
    annualLabel: '£110 annual fee + confirmation statement',
    suitability: 'Specialist Route',
    suitabilityDescription:
      'A limited partnership registered in Scotland — uniquely, it has separate legal personality (can own property and contract in its own name), while remaining tax-transparent. Must have its principal place of business in Scotland and nominate a PSC.',
    isPopular: false,
    processingTime: 'About 5 working days (paper)',
    officialLink: 'https://www.gov.uk/guidance/set-up-and-run-a-limited-partnership',
    additionalNotes:
      'For decades heavily marketed to non-residents as a "zero tax" vehicle. Since ECCTA 2023, SLPs and Scottish qualifying partnerships file confirmation statements and pay an annual fee of £110, and misusing them attracts enforcement.'
  }
];

export interface UKJurisdiction {
  id: string;
  name: string;
  registrarOffice: string;
  officeAddress: string;
  companyNumberFormat: string;
  officeRequirement: string;
  isPopular: boolean;
}

export const UK_JURISDICTIONS: UKJurisdiction[] = [
  {
    id: 'E&W',
    name: 'England & Wales',
    registrarOffice: 'Companies House — Main Office (Cardiff)',
    officeAddress: 'Companies House, Crown Way, Cardiff, CF14 3UZ (DX 33050 Cardiff)',
    companyNumberFormat: '8 digits (e.g. 12345678)',
    officeRequirement: 'Registered office must be located in England or Wales (or specifically Wales for Welsh companies).',
    isPopular: true
  },
  {
    id: 'SCT',
    name: 'Scotland',
    registrarOffice: 'Companies House Edinburgh',
    officeAddress: '4th Floor, Edinburgh Quay 2, 139 Fountainbridge, Edinburgh, EH3 9FF',
    companyNumberFormat: 'SC followed by 6 digits (e.g. SC123456)',
    officeRequirement: 'Registered office must be located in Scotland.',
    isPopular: false
  },
  {
    id: 'NI',
    name: 'Northern Ireland',
    registrarOffice: 'Companies House Belfast',
    officeAddress: 'Second Floor, The Linenhall, 32-38 Linenhall Street, Belfast, BT2 8BG',
    companyNumberFormat: 'NI or R0 followed by 6 digits (e.g. NI123456)',
    officeRequirement: 'Registered office must be located in Northern Ireland.',
    isPopular: false
  }
];

export interface UKFilingFee {
  transaction: string;
  channel: string;
  fee: string;
}

export const UK_OFFICIAL_FEES: UKFilingFee[] = [
  { transaction: 'Incorporation (LTD / LLP)', channel: 'Digital', fee: '£100' },
  { transaction: 'Incorporation (same day)', channel: 'Digital (software only)', fee: '£156' },
  { transaction: 'Incorporation (LTD / LLP)', channel: 'Paper', fee: '£124' },
  { transaction: 'Confirmation statement (CS01)', channel: 'Digital', fee: '£50' },
  { transaction: 'Confirmation statement (CS01)', channel: 'Paper', fee: '£110' },
  { transaction: 'Change of company name', channel: 'Digital', fee: '£20' },
  { transaction: 'Change of company name (same day)', channel: 'Digital', fee: '£85' },
  { transaction: 'Registration of a charge (mortgage)', channel: 'Digital', fee: '£14' },
  { transaction: 'Voluntary strike off (DS01)', channel: 'Digital', fee: '£13' },
  { transaction: 'Voluntary strike off (DS01)', channel: 'Paper', fee: '£18' },
  { transaction: 'Administrative restoration', channel: 'Paper', fee: '£341' },
  { transaction: 'Certificate of incorporation', channel: 'By post', fee: '£22' },
  { transaction: 'Certificate of incorporation (same day)', channel: 'By post', fee: '£65' },
  { transaction: 'Apply to remove personal details from register', channel: 'Paper (per transaction)', fee: '£34' }
];

export interface UKDeadline {
  milestone: string;
  when: string;
  authority: string;
  costOfMissing: string;
}

export const UK_DEADLINES: UKDeadline[] = [
  {
    milestone: 'Register company for Corporation Tax',
    when: 'Within 3 months of starting to do business',
    authority: 'HMRC',
    costOfMissing: 'Late registration can lead to HMRC penalties and estimated tax assessments'
  },
  {
    milestone: 'First annual accounts',
    when: '21 months after the date of incorporation',
    authority: 'Companies House',
    costOfMissing: 'Automatic £150–£1,500 civil penalty (doubled if late 2 years running)'
  },
  {
    milestone: 'Annual accounts',
    when: '9 months after the end of your financial year',
    authority: 'Companies House',
    costOfMissing: 'Automatic £150–£1,500 civil penalty; company can be struck off'
  },
  {
    milestone: 'Confirmation statement (CS01)',
    when: 'Within 14 days of the end of each 12-month review period',
    authority: 'Companies House',
    costOfMissing: 'Criminal offence; financial penalty; company can be struck off the register'
  },
  {
    milestone: 'Pay Corporation Tax',
    when: '9 months and 1 day after the end of your accounting period',
    authority: 'HMRC',
    costOfMissing: 'HMRC charges interest on late payments'
  },
  {
    milestone: 'File Company Tax Return (CT600)',
    when: '12 months after the end of your accounting period',
    authority: 'HMRC',
    costOfMissing: '£100 automatic late filing penalty, rising steeply the longer it is late'
  },
  {
    milestone: 'Register for VAT',
    when: 'Within 30 days of taxable turnover passing £90,000 (rolling 12 months)',
    authority: 'HMRC',
    costOfMissing: 'Backdated VAT owed plus possible failure-to-notify penalties'
  }
];

export const UK_CT_RATES = {
  smallProfitsRate: 19,
  smallProfitsUpperLimit: 50000,
  mainRate: 25,
  mainRateLowerLimit: 250000,
  marginalReliefFraction: '3/200',
  financialYearLabel: 'Financial years 2025/26 and 2026/27 (unchanged)'
};

export const UK_VAT = {
  registrationThreshold: 90000,
  deregistrationThreshold: 88000,
  standardRate: 20
};

export const UK_LATE_FILING_PENALTIES = {
  privateCompany: [
    { lateness: 'Up to 1 month late', penalty: 150 },
    { lateness: 'More than 1 month, up to 3 months late', penalty: 375 },
    { lateness: 'More than 3 months, up to 6 months late', penalty: 750 },
    { lateness: 'More than 6 months late', penalty: 1500 }
  ],
  publicCompany: [
    { lateness: 'Up to 1 month late', penalty: 750 },
    { lateness: 'More than 1 month, up to 3 months late', penalty: 1500 },
    { lateness: 'More than 3 months, up to 6 months late', penalty: 3000 },
    { lateness: 'More than 6 months late', penalty: 7500 }
  ],
  note: 'Penalties are doubled if accounts are also filed late in 2 successive financial years.'
};

export const UK_OFFICIAL_LINKS = {
  companiesHouse: 'https://www.gov.uk/government/organisations/companies-house',
  officeAccess: 'https://www.gov.uk/government/organisations/companies-house/about/access-and-opening',
  allFees: 'https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees',
  findAndUpdate: 'https://find-and-update.company-information.service.gov.uk/',
  webFiling: 'https://ewf.companieshouse.gov.uk/',
  incorporate: 'https://www.gov.uk/limited-company-formation/register-your-company',
  limitedCompanyFormation: 'https://www.gov.uk/limited-company-formation',
  verifyIdentity: 'https://www.gov.uk/guidance/verify-your-identity-for-companies-house',
  whenToVerify: 'https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house',
  providePscCode: 'https://www.gov.uk/guidance/provide-psc-verification',
  acspList: 'https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps',
  runningALimitedCompany: 'https://www.gov.uk/running-a-limited-company',
  confirmationStatement: 'https://www.gov.uk/guidance/confirmation-statement-guidance',
  annualAccounts: 'https://www.gov.uk/annual-accounts',
  companyTaxReturns: 'https://www.gov.uk/company-tax-returns',
  payCorporationTax: 'https://www.gov.uk/pay-corporation-tax',
  corporationTaxRates: 'https://www.gov.uk/corporation-tax-rates',
  lateFilingPenalties: 'https://www.gov.uk/annual-accounts/penalties-for-late-filing',
  vatRegistration: 'https://www.gov.uk/register-for-vat',
  hmrc: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
  oneLogin: 'https://signin.account.gov.uk/sign-in-or-create',
  softwareCIS: 'https://www.gov.uk/guidance/software-for-sending-income-tax-updates'
};

export const UK_COMPANIES_HOUSE_CONTACT = {
  email: 'enquiries@companieshouse.gov.uk',
  phone: '0303 1234 500',
  hours: 'Monday to Friday, 8:30am to 6pm (except bank holidays)',
  note: 'Companies House offices are not open to the public. Post documents only to the Cardiff main office; online filing is faster.'
};

export const DATA_VERIFICATION = {
  feesSource: 'GOV.UK “Companies House fees” publication — updated 2 July 2026 (digital incorporation £100 and confirmation statement £50 apply from 1 February 2026)',
  taxSource: 'HMRC “Corporation Tax rates and allowances” and Budget 2025 Annex A — rates unchanged for FY 2026/27',
  checkedOn: '20 September 2026'
};
