/**
 * Licensed-business & professional-licence database.
 *
 * The point of this file is to answer the question every cross-border founder
 * actually asks: "can *I* — a non-resident individual, or a foreign-owned
 * company — legally run this business, and what does the licence cost?"
 *
 * Verdicts are deliberately conservative. `blocked` means there is a statutory
 * citizenship / residency / SSN requirement that a non-resident cannot satisfy
 * without first changing status. `conditional` means it is possible, but only
 * through a specific structure (local entity, resident director, licensed
 * partner, or a US citizen/resident responsible party).
 *
 * Government fees are separated from market costs (training, bonds, nominee
 * directors, legal fees) everywhere.
 */

export type Persona =
  | 'nonresident-alien'
  | 'foreign-company'
  | 'local-entity'
  | 'resident-individual';

export type Verdict = 'eligible' | 'conditional' | 'blocked';

export interface Eligibility {
  verdict: Verdict;
  note: string;
}

export type LicenceCategory =
  | 'Tax & Accounting'
  | 'Real Estate'
  | 'Trade & Logistics'
  | 'Financial Services'
  | 'Insurance & Lending'
  | 'Immigration'
  | 'Corporate Services'
  | 'E-Commerce & Tech'
  | 'Transport';

export interface LicenceStep {
  title: string;
  detail: string;
  cost: string;
}

export interface LicensedBusiness {
  id: string;
  name: string;
  category: LicenceCategory;
  market: string;
  flag: string;
  regulator: string;
  licenceName: string;
  /** Declared government/regulator fee, in USD where published. */
  feeUsd: number;
  feeLabel: string;
  marketCostLabel: string;
  capitalOrBond?: string;
  timeline: string;
  residencyRule: string;
  eligibility: Record<Persona, Eligibility>;
  blockers: string[];
  steps: LicenceStep[];
  upkeep: string;
  officialLink: string;
  remoteRoute: string;
  isPopular?: boolean;
}

export const PERSONAS: { id: Persona; label: string; short: string; description: string }[] = [
  {
    id: 'nonresident-alien',
    label: 'Non-resident individual (alien)',
    short: 'Individual abroad',
    description:
      'You live outside the target market, hold a foreign passport (e.g. Pakistan) and have no local work authorisation, SSN or visa.'
  },
  {
    id: 'foreign-company',
    label: 'Foreign company (no local entity)',
    short: 'Foreign entity',
    description:
      'Your existing company is incorporated abroad and has no branch, subsidiary or registered office in the target market yet.'
  },
  {
    id: 'local-entity',
    label: 'Locally incorporated company you own',
    short: 'Your local company',
    description:
      'You formed an LLC/LTD/Sdn Bhd in the target market (fully foreign-owned), with a registered agent or local director in place.'
  },
  {
    id: 'resident-individual',
    label: 'Resident individual (citizen / PR / visa holder)',
    short: 'Local resident',
    description:
      'You live in the target market with the right to work there — the status most licensing regimes are written for.'
  }
];

export const LICENSED_BUSINESSES: LicensedBusiness[] = [
  /* ============================================================ US · IRS CAA */
  {
    id: 'us-caa',
    name: 'IRS Certifying Acceptance Agent (ITIN services)',
    category: 'Tax & Accounting',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'Internal Revenue Service (IRS)',
    licenceName: 'Acceptance Agent Agreement — Form 13551 filed through IRS e-Services',
    feeUsd: 0,
    feeLabel: '$0 — the IRS charges no application or maintenance fee',
    marketCostLabel: 'Forensic document training $75–$200; tax-compliance check and e-Services account setup are free',
    timeline: 'About 60–90 days after an electronic application',
    residencyRule:
      'The applicant must hold an EIN and be current on US federal tax obligations. Form 13551 expressly allows an eligible person to be "a U.S. person or a foreign person", and foreign nationals living outside the US enter "N/A" where an SSN/ITIN is requested — but every responsible party needs a PTIN and must clear a suitability/background check.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'Genuinely possible: the IRS Revenue Procedure and Form 13551 instructions allow a foreign person, and foreign nationals abroad enter "N/A" for the SSN/ITIN line and are exempt from fingerprinting. What you cannot skip is a PTIN, a clean US tax-compliance record and suitability clearance — approval is discretionary, not routine.'
      },
      'foreign-company': {
        verdict: 'conditional',
        note:
          'A foreign entity with an EIN can apply, but the IRS suitability check focuses on each responsible party; most foreign firms put a US citizen/LPR in that role to reduce rejection risk.'
      },
      'local-entity': {
        verdict: 'conditional',
        note:
          'A US LLC/Corp with an EIN is the cleanest wrapper — either you act as the foreign responsible party (with a PTIN) or a US citizen/LPR does.'
      },
      'resident-individual': {
        verdict: 'eligible',
        note:
          'The standard route: EIN + PTIN, two training courses, e-filed Form 13551, background check, signed agreement.'
      }
    },
    blockers: [
      'Valid EIN for the business and a PTIN for every responsible party (a foreign person with a permanent non-US address can hold a PTIN once they have an ITIN)',
      'Clean US federal tax-compliance history — the IRS suitability check rejects applicants who are behind',
      'Both mandatory trainings completed by every responsible party',
      'Discretionary suitability review: IRS internal guidance requires citizenship/immigration status verification for individuals subject to suitability, so foreign-resident applications attract extra scrutiny'
    ],
    steps: [
      { title: 'Get an EIN for the business', detail: 'Form SS-4 by fax if you have no SSN — free, 4–8 weeks.', cost: '$0' },
      { title: 'Get a PTIN', detail: 'Apply at irs.gov/ptin; the IRS user fee has been waived in recent cycles, but third-party processors may charge.', cost: '$0–$20' },
      { title: 'Complete the IRS ITIN Acceptance Agent training', detail: 'Free e-learning on IRS.gov covering W-7 rules and document handling. Required for every responsible party.', cost: '$0' },
      { title: 'Complete forensic document training', detail: 'Third-party course on passport/ID fraud detection — the only unavoidable spend.', cost: '$75–$200' },
      { title: 'Submit Form 13551 electronically', detail: 'Filed through IRS e-Services (paper is no longer accepted). Include training certificates.', cost: '$0' },
      { title: 'Suitability review + agreement', detail: 'Background/tax check, then a signed Acceptance Agent Agreement and listing in the IRS CAA directory.', cost: '$0' }
    ],
    upkeep:
      'Agreements do not auto-renew — re-apply via a fresh Form 13551 in the expiry year. Fees you may charge clients are not set by the IRS (market range $50–$275 per ITIN).',
    officialLink: 'https://www.irs.gov/individuals/international-taxpayers/acceptance-agent-program',
    remoteRoute:
      'Three routes, in order of realism. (1) Apply directly as a foreign person: file electronically, enter N/A for the SSN/ITIN line, attach training certificates and passport/identity documentation — expect scrutiny and have a US tax-compliance record. (2) Form a US LLC and appoint a US citizen or LPR as the Responsible Party while you run operations from abroad; this is what most cross-border firms do. (3) Trade as a non-CAA document-preparation service — lawful, but you cannot certify identity or issue Form W-7 (COA). Never advertise CAA status you do not hold.'
  },

  /* ============================================================ US · PTIN */
  {
    id: 'us-ptin',
    name: 'Tax return preparer (PTIN holder)',
    category: 'Tax & Accounting',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'IRS',
    licenceName: 'Preparer Tax Identification Number (PTIN)',
    feeUsd: 0,
    feeLabel: '$0–$20 depending on the cycle; the IRS has waived its user fee, processors may charge',
    marketCostLabel: 'Annual filing-season software $200–$1,500; AFSP/CPA study is optional',
    timeline: 'Same day to 4 weeks',
    residencyRule: 'No citizenship requirement — but you need an SSN or ITIN to obtain a PTIN.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'Possible if you first obtain an ITIN (Form W-7). You cannot e-file US returns without an EFIN, and many paid-preparer state rules assume a US presence — but preparing from abroad is not prohibited.'
      },
      'foreign-company': { verdict: 'conditional', note: 'The firm needs an EFIN; the individual signer still needs a PTIN.' },
      'local-entity': { verdict: 'eligible', note: 'A US LLC can operate a preparation firm once an EFIN and PTINs are in place.' },
      'resident-individual': { verdict: 'eligible', note: 'Straightforward: PTIN + EFIN + Circular 230 compliance.' }
    },
    blockers: ['SSN or ITIN required for the PTIN', 'EFIN required to e-file (identity, background and site checks)', 'Circular 230 / state-level rules on advertising and representation'],
    steps: [
      { title: 'Obtain an ITIN if you have no SSN', detail: 'File Form W-7 with a certified copy of your passport or through a CAA.', cost: '$0 (IRS)' },
      { title: 'Apply for the PTIN', detail: 'Online at irs.gov/ptin; renew annually between mid-October and 31 December.', cost: '$0–$20' },
      { title: 'Apply for an EFIN', detail: 'The firm-level e-file ID; requires a suitability check and responsible-official details.', cost: '$0' },
      { title: 'Choose software + engagement letters', detail: 'Professional software, e-signature and a written engagement scope.', cost: '$200–$1,500/yr' }
    ],
    upkeep: 'Renew the PTIN every year; keep Circular 230 records; EFIN renews annually.',
    officialLink: 'https://www.irs.gov/tax-professionals/ptin-requirements-for-tax-return-preparers',
    remoteRoute:
      'This is one of the few US tax credentials genuinely open to a non-resident — but the ITIN is the gate. Start with W-7 document preparation for your home-market clients, then add a PTIN and EFIN once your own ITIN is issued.'
  },

  /* ============================================================ US · Customs broker */
  {
    id: 'us-customs-broker',
    name: 'Licensed Customs Broker',
    category: 'Trade & Logistics',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'US Customs and Border Protection (CBP)',
    licenceName: 'Customs Broker Licence + port permit',
    feeUsd: 590,
    feeLabel: '$390 exam fee + $200 licence application fee',
    marketCostLabel: 'Study materials $0–$3,000; permit fees vary by port; surety bond is market-priced',
    timeline: 'Exam twice a year; licence 3–6 months after passing',
    residencyRule: 'Exam and licence require US citizenship or lawful permanent residency, age 18+, no disqualifying felony.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'blocked',
        note:
          'Citizenship or a green card is a hard requirement. A Pakistani passport alone cannot sit the exam, no matter where the company is formed.'
      },
      'foreign-company': { verdict: 'blocked', note: 'A brokerage licence is held by an individual who must be a citizen/LPR; a foreign parent cannot qualify on its own.' },
      'local-entity': {
        verdict: 'conditional',
        note:
          'A US corporation can hold the licence only through a licensed individual (officer/qualifying broker) who is a citizen or LPR.'
      },
      'resident-individual': { verdict: 'eligible', note: 'Pass the CBLE then apply with Form 3124 and fingerprints.' }
    },
    blockers: ['US citizenship or lawful permanent residence', '80-question open-book exam (75% pass, ~15–25% pass rate)', 'Background investigation and fingerprints', 'Triennial status report to keep the licence'],
    steps: [
      { title: 'Register for the CBLE', detail: 'Applications open ~90 days before each April/October sitting; pay on Pay.gov.', cost: '$390' },
      { title: 'Sit the open-book exam', detail: '80 questions in 4.5 hours on HTSUS, 19 CFR and CATAIR; 75% needed.', cost: 'Included' },
      { title: 'Apply for the licence', detail: 'CBP Form 3124 with citizenship proof, fingerprints and background consent within 3 years of passing.', cost: '$200' },
      { title: 'Obtain a port permit', detail: 'Form 3124E for each port/district where you will clear goods.', cost: '$0–$100 per port' },
      { title: 'Bond + ACE access', detail: 'Customs bond and ACE portal account for entry filing.', cost: 'Bond premium (market)' }
    ],
    upkeep: 'Triennial status report; continuing compliance with CBP record-keeping (5 years).',
    officialLink: 'https://www.cbp.gov/trade/programs-administration/customs-brokers',
    remoteRoute:
      'You cannot hold the licence yourself. To run a customs brokerage commercially, own a US corporation and hire/partner with a licensed broker as the qualifying officer — or white-label an existing licensed broker and focus on the freight-forwarding and sales side (which needs no CBP licence).'
  },

  /* ============================================================ US · Freight broker */
  {
    id: 'us-freight-broker',
    name: 'Freight Broker (property broker authority)',
    category: 'Transport',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'Federal Motor Carrier Safety Administration (FMCSA)',
    licenceName: 'MC broker authority + BMC-84 surety bond / BMC-85 trust',
    feeUsd: 300,
    feeLabel: '$300 FMCSA registration fee (non-refundable)',
    marketCostLabel: '$75,000 bond premium $750–$9,000/yr (credit-dependent); BOC-3 process agent $30–$50',
    capitalOrBond: '$75,000 surety bond or trust fund',
    timeline: '4–6 weeks for authority',
    residencyRule: 'No citizenship or residency requirement — but you need a US-registered business entity and a US process agent.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'Legal if you form a US LLC, get an EIN, obtain broker authority and post the $75,000 bond. Practically, shippers and factoring companies expect a US phone, US bank and a US-resident contact.'
      },
      'foreign-company': { verdict: 'conditional', note: 'A foreign entity must register to do business in a US state and appoint a process agent; a US subsidiary is the cleaner route.' },
      'local-entity': { verdict: 'eligible', note: 'This is the standard route for a foreigner: US LLC + $300 + bond + BOC-3.' },
      'resident-individual': { verdict: 'eligible', note: 'Same steps with no extra friction.' }
    },
    blockers: ['$75,000 financial security — no way around it', 'BOC-3 process agent in every state where you operate', 'Contingent cargo insurance often demanded by shippers', 'A US business bank account in practice'],
    steps: [
      { title: 'Form the US entity + EIN', detail: 'An LLC in a low-cost state; the EIN is free by fax with Form SS-4.', cost: '$50–$300 + $0' },
      { title: 'File for broker authority', detail: 'FMCSA registration (OP-1 series) with the $300 fee.', cost: '$300' },
      { title: 'Post the $75,000 bond', detail: 'BMC-84 surety bond (annual premium) or BMC-85 trust (cash).', cost: '$750–$9,000/yr' },
      { title: 'File BOC-3', detail: 'Designate a process agent for every state.', cost: '$30–$50' },
      { title: 'Insurance + load board access', detail: 'Contingent cargo and general liability, then onboarding with load boards and factoring.', cost: 'Market' }
    ],
    upkeep: 'Annual UCR registration, biennial MCS-150 update, bond renewal, and broker record-keeping.',
    officialLink: 'https://www.fmcsa.dot.gov/registration/registration-requirements',
    remoteRoute:
      'A Pakistan-based founder can legitimately own and run this remotely: the authority sits with the US LLC, the bond is posted by a US surety, and a BOC-3 agent receives service. Build a US-facing phone/bank presence before signing shippers.'
  },

  /* ============================================================ US · Real estate */
  {
    id: 'us-real-estate',
    name: 'Real Estate Sales Associate (state licence)',
    category: 'Real Estate',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'State real estate commission (e.g. Florida DBPR / TREC in Texas)',
    licenceName: 'State salesperson / sales-associate licence',
    feeUsd: 63,
    feeLabel: 'Florida DBPR application ~$62.75 + Pearson VUE exam $36.75 (Texas and other states differ)',
    marketCostLabel: '63-hour pre-licence course $70–$800; LiveScan fingerprints $50–$90; exam prep extra',
    timeline: '8–14 weeks including course and background check',
    residencyRule:
      'No state residency and no citizenship requirement in Florida — but a US Social Security Number is required on the application, and fingerprints must be taken electronically in the US.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'blocked',
        note:
          'Without an SSN and a US fingerprint appointment you cannot complete the DBPR application. A foreign passport alone is not accepted on the RE 1 form.'
      },
      'foreign-company': { verdict: 'blocked', note: 'Licences are issued to individuals, not companies; a foreign entity cannot hold one.' },
      'local-entity': {
        verdict: 'conditional',
        note:
          'Your US LLC can be a licensed real estate brokerage only through a licensed broker-owner; the sales associates must each be individually licensed.'
      },
      'resident-individual': { verdict: 'eligible', note: 'Course → DBPR application → fingerprints → exam → activate under a broker.' }
    },
    blockers: ['US Social Security Number on the application', 'Electronic fingerprints taken through a US LiveScan vendor', 'Must activate under a sponsoring broker before practising', 'State exam (75/100 in Florida) and post-licence education'],
    steps: [
      { title: 'Complete the pre-licence course', detail: '63 hours (Florida) or the state-equivalent; keep the completion certificate.', cost: '$70–$800' },
      { title: 'Submit the licence application', detail: 'DBPR RE 1 online with SSN, education and background disclosures.', cost: '~$63' },
      { title: 'Get fingerprinted', detail: 'FDLE-approved LiveScan with the correct ORI number; results expire in 6 months.', cost: '$50–$90' },
      { title: 'Pass the state exam', detail: '100 questions, 75 to pass, 3.5 hours at Pearson VUE.', cost: '$36.75' },
      { title: 'Activate under a broker', detail: 'A licensed broker files the activation; you cannot practise independently as a sales associate.', cost: 'Commission split (market)' }
    ],
    upkeep: 'Renew every 2 years with 45 hours of post-licence education (Florida), plus continuing education thereafter.',
    officialLink: 'https://www.myfloridalicense.com/DBPR/real-estate/',
    remoteRoute:
      'If you want US real estate exposure without an SSN, the realistic routes are: (a) own US rental property through your LLC and use a licensed property manager; (b) work as a referral/marketing partner paid by a licensed brokerage (check state rules on unlicensed referral fees); or (c) obtain an ITIN/SSN through a qualifying status first.'
  },

  /* ============================================================ US · Insurance */
  {
    id: 'us-insurance',
    name: 'Insurance Producer (agent/broker)',
    category: 'Insurance & Lending',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'State departments of insurance via NIPR',
    licenceName: 'Resident or non-resident producer licence (life, health, P&C)',
    feeUsd: 120,
    feeLabel: 'State application fees typically $40–$200 per line (varies by state)',
    marketCostLabel: 'Pre-licensing course $100–$400; exam $40–$100; fingerprints $50–$90',
    timeline: '4–10 weeks',
    residencyRule:
      'Most states require an SSN/TIN and US work authorisation to be licensed; a "non-resident" licence is for producers already licensed in another US state.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'blocked',
        note:
          'A non-resident licence presumes a home-state US licence. Without an SSN and US work authorisation, states will not issue a producer licence.'
      },
      'foreign-company': { verdict: 'blocked', note: 'Agencies must be owned/operated through licensed individuals; foreign entities are not licensed directly.' },
      'local-entity': { verdict: 'conditional', note: 'A US agency entity can be licensed once a licensed producer is designated as the responsible agent.' },
      'resident-individual': { verdict: 'eligible', note: 'Pre-licensing education → state exam → NIPR application → appointment with a carrier.' }
    },
    blockers: ['SSN/TIN and US work authorisation in practice', 'State exam and pre-licensing hours', 'Carrier appointment before you can sell', 'Fingerprints and background check'],
    steps: [
      { title: 'Choose lines of authority', detail: 'Life, health, property & casualty or a combination; each needs its own exam.', cost: 'Varies' },
      { title: 'Complete pre-licensing education', detail: 'State-mandated hours (often 20–40) from an approved provider.', cost: '$100–$400' },
      { title: 'Pass the state exam', detail: 'Scheduled through Pearson VUE; 70% typical pass mark.', cost: '$40–$100' },
      { title: 'Apply through NIPR', detail: 'Electronic application, fingerprints and background check.', cost: '$40–$200' },
      { title: 'Get appointed by a carrier', detail: 'No appointment = no sales authority; carriers file the appointment.', cost: 'Carrier-borne' }
    ],
    upkeep: 'Continuing education (typically 24 hours per 2 years) and timely licence renewal.',
    officialLink: 'https://www.nipr.com/',
    remoteRoute:
      'Not realistically available to a non-resident. If you are targeting insurance-adjacent income, consider claims documentation, lead generation for licensed agencies, or a back-office service agreement — all of which avoid holding the licence.'
  },

  /* ============================================================ US · Notary */
  {
    id: 'us-notary',
    name: 'Notary Public (state commission)',
    category: 'Corporate Services',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'State secretary of state / governor’s office',
    licenceName: 'Notary public commission',
    feeUsd: 40,
    feeLabel: 'State application fee typically $20–$100 (varies by state); some states add an exam fee',
    marketCostLabel: '$40–$100 four-year surety bond; $30–$150 training; seal and journal $30–$80',
    capitalOrBond: 'State-mandated surety bond, commonly $5,000–$25,000 coverage',
    timeline: '2–8 weeks',
    residencyRule:
      'Most states require the applicant to be a legal resident of that state (or to hold a state business address); a handful also require citizenship or voter registration.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'blocked',
        note:
          'State residency is the standard requirement, and the commission authorises acts performed inside that state. A Pakistan-resident founder cannot be commissioned remotely.'
      },
      'foreign-company': { verdict: 'blocked', note: 'Notarial commissions are personal, not corporate.' },
      'local-entity': { verdict: 'blocked', note: 'A company cannot hold a notary commission; individual officers can, if they meet the residency rule.' },
      'resident-individual': { verdict: 'eligible', note: 'Application, bond, oath and seal — usually 2–6 weeks.' }
    },
    blockers: ['State residency in practice', 'Surety bond and oath of office', 'Commission is limited to the issuing state', 'Journal and identification requirements'],
    steps: [
      { title: 'Check your state residency rule', detail: 'Confirm residency and eligibility on the secretary of state site before paying anything.', cost: '$0' },
      { title: 'Buy the surety bond', detail: 'Required in most states before the commission is issued.', cost: '$40–$100' },
      { title: 'Apply and take the oath', detail: 'Submit the application, bond and oath; some states require a short exam.', cost: '$20–$100' },
      { title: 'Buy seal + journal', detail: 'State-compliant seal, journal and error-and-omission cover.', cost: '$30–$180' }
    ],
    upkeep: 'Renew every 4 years, maintain the bond and journal, and complete any state training.',
    officialLink: 'https://www.nationalnotary.org/knowledge-center/about-notaries/state-requirements',
    remoteRoute:
      'Remote online notarisation (RON) still requires a commission in the state where the signer or the notary is located. Non-residents should use a US-commissioned RON provider instead of seeking a commission.'
  },

  /* ============================================================ US · Mortgage */
  {
    id: 'us-mlo',
    name: 'Mortgage Loan Originator (SAFE Act)',
    category: 'Insurance & Lending',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'NMLS / state regulators (CFPB SAFE Act)',
    licenceName: 'NMLS MLO licence',
    feeUsd: 150,
    feeLabel: 'NMLS registration + state licence fees (state-dependent, commonly $100–$500)',
    marketCostLabel: '20-hour SAFE course $150–$400; exam $110; fingerprints $30–$60; credit report',
    timeline: '6–12 weeks',
    residencyRule:
      'Requires an SSN, FBI criminal background check, credit report and financial-responsibility review; most states also require US work authorisation.',
    eligibility: {
      'nonresident-alien': { verdict: 'blocked', note: 'No SSN and no US work authorisation means no NMLS licence and no FBI channeling.' },
      'foreign-company': { verdict: 'blocked', note: 'Licences attach to individuals sponsored by a licensed lender/broker.' },
      'local-entity': { verdict: 'conditional', note: 'A mortgage brokerage entity needs licensed MLOs and a state licence of its own.' },
      'resident-individual': { verdict: 'eligible', note: 'SAFE course → exam → NMLS application → sponsorship.' }
    },
    blockers: ['SSN + FBI background check', 'Credit and financial-responsibility review', 'Employer sponsorship and state entity licence', 'Annual CE and renewal'],
    steps: [
      { title: 'Complete the 20-hour SAFE course', detail: 'NMLS-approved pre-licensing education.', cost: '$150–$400' },
      { title: 'Pass the SAFE exam', detail: 'National + state components through NMLS.', cost: '$110' },
      { title: 'Submit the NMLS application', detail: 'Fingerprints, credit authorisation and disclosures.', cost: '$100–$500' },
      { title: 'Get sponsored', detail: 'A licensed lender or brokerage must sponsor you before you originate.', cost: 'Employer' }
    ],
    upkeep: '8 hours of annual CE and licence renewal through NMLS.',
    officialLink: 'https://www.nmlsconsumeraccess.org/',
    remoteRoute: 'Not available to non-residents. Adjacent work: mortgage processing support or lead generation for licensed lenders.'
  },

  /* ============================================================ US · MSB */
  {
    id: 'us-msb',
    name: 'Money Services Business / Money Transmitter',
    category: 'Financial Services',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'FinCEN + state banking departments (NMLS)',
    licenceName: 'FinCEN MSB registration (free) + state money transmitter licences',
    feeUsd: 0,
    feeLabel: '$0 for FinCEN Form 107 registration; state MTL application fees $500–$5,000 per state',
    marketCostLabel: 'Legal $5,000–$25,000 per state; audit + AML programme; surety bonds $25,000–$1,000,000+',
    capitalOrBond: 'State minimum net worth commonly $100,000–$500,000 + surety bond',
    timeline: 'FinCEN same day; state licences 9–18 months',
    residencyRule:
      'No citizenship requirement for ownership — but a foreign-located MSB doing substantial US business must register and appoint a US-resident agent for service of process.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'Legally possible, but the capital, bonding and 12–24 month licensing runway make it unrealistic below ~$1m of committed funding.' },
      'foreign-company': { verdict: 'conditional', note: 'Foreign MSBs serving US customers must register with FinCEN and appoint a US agent; state licences still apply activity-by-activity.' },
      'local-entity': { verdict: 'conditional', note: 'A US LLC is the right wrapper, but each state still needs its own MTL and net worth.' },
      'resident-individual': { verdict: 'conditional', note: 'Same requirements; being resident reduces banking friction but not the capital tests.' }
    },
    blockers: ['48+ separate state money transmitter licences', 'Surety bonds from $25,000 to $2m+', 'Audited financials and written AML/BSA programme', 'Banking access is the hardest part — most banks de-risk MSBs'],
    steps: [
      { title: 'Register with FinCEN (Form 107)', detail: 'Within 180 days of becoming an MSB; renew every 2 years. Free.', cost: '$0' },
      { title: 'Build the AML/BSA programme', detail: 'Written policies, a compliance officer, training, independent review. Required within 90 days.', cost: 'Market' },
      { title: 'Apply for state MTLs via NMLS', detail: 'Start with the state(s) where customers are; each has its own bond and net-worth test.', cost: '$500–$5,000 per state' },
      { title: 'Audit + permissible investments', detail: 'CPA-audited financials and compliant liquid assets.', cost: 'Market' }
    ],
    upkeep: 'Biennial FinCEN re-registration, annual state renewals, SAR/CTR filing and regular state exams.',
    officialLink: 'https://www.fincen.gov/money-services-business-msb-registration',
    remoteRoute:
      'Do not start here. The realistic non-resident fintech route is to partner with a licensed BaaS provider or money transmitter under a programme-management agreement — your entity becomes a technology provider, not the licensee.'
  },

  /* ============================================================ US · Registered agent */
  {
    id: 'us-registered-agent',
    name: 'Registered Agent / company formation service',
    category: 'Corporate Services',
    market: 'United States',
    flag: '🇺🇸',
    regulator: 'State Secretary of State (no standalone licence in most states)',
    licenceName: 'None in most states — but you must maintain a physical in-state address and be reachable during business hours',
    feeUsd: 0,
    feeLabel: '$0 — registered agents are not licensed, only required to have a physical in-state address',
    marketCostLabel: 'Address/office service $50–$300/mo; compliance software $50–$200/mo',
    timeline: 'Days',
    residencyRule: 'The agent must have a physical street address in the formation state (no PO boxes) and be available during business hours.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'You cannot be your own registered agent without a US street address. You can own a US company that sells the service if it has genuine staffed premises in the state.'
      },
      'foreign-company': { verdict: 'conditional', note: 'A foreign company cannot act as agent; a US subsidiary with premises can.' },
      'local-entity': { verdict: 'eligible', note: 'The classic model: US LLC + leased office + compliance staff.' },
      'resident-individual': { verdict: 'eligible', note: 'You can act personally for clients in your own state if you have an address there.' }
    },
    blockers: ['Physical in-state address (not a virtual mailbox)', 'Availability during normal business hours', 'No protection from "unauthorised practice of law" if you draft documents', 'Errors-and-omissions insurance in practice'],
    steps: [
      { title: 'Pick the state(s)', detail: 'One physical address per state; most agents start with a single state.', cost: '$50–$300/mo' },
      { title: 'Lease real premises', detail: 'A staffed office or co-working with mail handling and a notary available.', cost: 'Market' },
      { title: 'Build the filing workflow', detail: 'Formation, annual reports, EIN assistance and compliance calendars.', cost: 'Software $50–$200/mo' },
      { title: 'Insurance + terms', detail: 'E&O cover and clear terms that you are not a law firm.', cost: 'Market' }
    ],
    upkeep: 'Annual report calendars per client, registered-agent renewals, and state business-licence renewals.',
    officialLink: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business',
    remoteRoute:
      'A non-resident can own the business but not personally act as agent. Partner with a US-based co-founder or use a fulfilment partner for the address; sell the marketing/compliance layer from abroad.'
  },

  /* ============================================================ UK · ACSP */
  {
    id: 'uk-acsp',
    name: 'Authorised Corporate Service Provider (ACSP)',
    category: 'Corporate Services',
    market: 'United Kingdom',
    flag: '🇬🇧',
    regulator: 'Companies House',
    licenceName: 'ACSP registration (Companies House authorised agent)',
    feeUsd: 84,
    feeLabel: '£63 digital registration fee (rose from £55 on 1 Feb 2026)',
    marketCostLabel: 'AML supervision via a professional body £300–£1,000/yr; ID verification software £1–£3 per check',
    timeline: '1–3 weeks after AML evidence is accepted',
    residencyRule:
      'The firm must be UK-based and supervised for AML by a recognised body (ICAEW, ACCA, AAT, LSAG, HMRC, etc.); the applicant must verify their own identity.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'You can own the UK company that registers as an ACSP, but the business must be UK-based and AML-supervised — so you need UK operations and a UK-resident senior officer in practice.'
      },
      'foreign-company': { verdict: 'blocked', note: 'An overseas entity cannot register directly; a UK subsidiary is required.' },
      'local-entity': { verdict: 'eligible', note: 'A UK LTD with AML supervision and a verified senior officer can register.' },
      'resident-individual': { verdict: 'eligible', note: 'Sole traders qualify if AML-supervised and UK-based.' }
    },
    blockers: ['Active UK AML supervision at all times', 'UK-based business', 'Own identity must be verified with Companies House', '7-year record-keeping and 14-day change notifications'],
    steps: [
      { title: 'Obtain AML supervision', detail: 'Join a supervisory body (ICAEW/ACCA/AAT/HMRC) or be supervised through an existing regulated firm.', cost: '£300–£1,000/yr' },
      { title: 'Verify your own identity', detail: 'GOV.UK One Login verification to get a personal code.', cost: '£0' },
      { title: 'Register as an ACSP', detail: 'Companies House digital application with the AML membership number.', cost: '£63' },
      { title: 'Add authorised staff', detail: 'Each person who will verify identities is added to the ACSP account.', cost: '£0' },
      { title: 'Build the IDV workflow', detail: 'Approved identity documents, liveness checks and 7-year records.', cost: 'Software (market)' }
    ],
    upkeep: 'Maintain AML supervision, notify changes within 14 days, and keep verification records for 7 years. Only ACSPs will be able to file for third parties from late 2027.',
    officialLink: 'https://www.gov.uk/guidance/register-as-an-authorised-agent',
    remoteRoute:
      'Own the UK LTD from abroad, but staff the compliance function in the UK. A non-resident sole trader cannot register. Pair this with the £100 incorporation service and ID verification for a legitimate formation business.'
  },

  /* ============================================================ UK · FCA */
  {
    id: 'uk-fca-pi',
    name: 'FCA-authorised Payment Institution / EMI',
    category: 'Financial Services',
    market: 'United Kingdom',
    flag: '🇬🇧',
    regulator: 'Financial Conduct Authority (FCA)',
    licenceName: 'Small Payment Institution / Authorised Payment Institution / EMI authorisation',
    feeUsd: 0,
    feeLabel: 'FCA application fees per the published fee schedule (SPI is the cheapest tier)',
    marketCostLabel: 'Legal + compliance build $50,000–$250,000; safeguarding arrangements; ongoing reporting',
    capitalOrBond: 'SPI: no initial capital but turnover cap; API: €20,000; EMI: €350,000',
    timeline: '3–12 months',
    residencyRule: 'The applicant must be a UK-incorporated entity with UK-based management and a UK office; the FCA assesses directors and controllers.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'You can own the UK company, but the FCA expects UK-based management and a genuine UK office.' },
      'foreign-company': { verdict: 'blocked', note: 'Direct authorisation of an overseas entity is not available — a UK subsidiary is required.' },
      'local-entity': { verdict: 'conditional', note: 'UK LTD → SPI first (turnover capped), then API as you scale.' },
      'resident-individual': { verdict: 'conditional', note: 'Entity authorisation is still required; being resident only helps with the fitness tests.' }
    },
    blockers: ['UK entity + UK office + UK-based management', 'Capital: €20,000 (API) or €350,000 (EMI)', 'Safeguarding client funds and monthly/quarterly reporting', 'Senior Manager & Certification Regime approvals'],
    steps: [
      { title: 'Choose the permission tier', detail: 'SPI (small, capped) → API (€20,000 capital) → EMI (€350,000 capital, e-money).', cost: 'Varies' },
      { title: 'Incorporate the UK entity', detail: 'UK LTD with the regulated activity in its scope.', cost: '£100' },
      { title: 'Build the regulatory business plan', detail: 'Programme of operations, safeguarding method, AML and complaints.', cost: 'Market' },
      { title: 'Apply to the FCA', detail: 'Submit the application and fee; expect questions and a 3–12 month review.', cost: 'FCA fee' },
      { title: 'SM&CR approvals', detail: 'Senior manager and certified staff approved before launch.', cost: 'Market' }
    ],
    upkeep: 'Annual fees, regulatory returns, safeguarding audits and consumer-duty compliance.',
    officialLink: 'https://www.fca.org.uk/firms/payment-services-e-money',
    remoteRoute:
      'If you are not ready for authorisation, operate as a registered agent/distributor of an already-authorised firm, or use an EMI partner with a programme-manager arrangement.'
  },

  /* ============================================================ UAE · Setup consultancy */
  {
    id: 'ae-setup',
    name: 'Business Setup Consultancy / Corporate Services Provider',
    category: 'Corporate Services',
    market: 'United Arab Emirates',
    flag: '🇦🇪',
    regulator: 'DET (Dubai) or the relevant free-zone authority',
    licenceName: 'Commercial/professional trade licence with "business setup services" activity',
    feeUsd: 1565,
    feeLabel: 'Trade licence from ~AED 5,750 (DET, activity-dependent) or a free-zone package from AED 5,500–6,000',
    marketCostLabel: 'Office/Ejari AED 6,000–25,000/yr; visa quota; PRO/typing services',
    timeline: '2–6 weeks',
    residencyRule:
      'Foreign ownership is allowed for most consultancy activities, but you need a UAE trade licence, a physical/flexi office and — for many activities — a UAE-resident manager. A Local Service Agent may be required for professional licences.',
    eligibility: {
      'nonresident-alien': {
        verdict: 'conditional',
        note:
          'You must hold a UAE residence visa and licenced premises to operate. Many founders start with a free-zone company, then add the mainland licence once volume justifies it.'
      },
      'foreign-company': { verdict: 'conditional', note: 'A UAE branch or subsidiary is required; the overseas entity alone cannot be licensed.' },
      'local-entity': { verdict: 'eligible', note: 'Free-zone or mainland entity + activity licence + office = lawful operation.' },
      'resident-individual': { verdict: 'eligible', note: 'Standard route: partner with a local service agent if the activity demands it.' }
    },
    blockers: ['Valid UAE trade licence with the correct activity', 'Physical/flexi office registered with Ejari (Dubai)', 'Residence visa for the owner/manager', 'Corporate tax registration and 9% tax above AED 375,000'],
    steps: [
      { title: 'Pick free zone vs mainland', detail: 'Free zone = cheaper, 100% ownership, but cannot trade mainland directly. Mainland = full market access.', cost: 'AED 5,500–18,900' },
      { title: 'Get initial approval + trade name', detail: 'DET name reservation and initial approval, or the free-zone equivalent.', cost: 'AED 620–1,020' },
      { title: 'Secure premises + Ejari', detail: 'Flexi-desk or office registered with the municipality.', cost: 'AED 6,000–25,000/yr' },
      { title: 'Pay the licence fee', detail: 'The licence is issued electronically with the activity scope.', cost: 'AED 5,750+' },
      { title: 'Residence visa + establishment card', detail: 'Medical, Emirates ID and visa stamping for the owner and staff.', cost: 'AED 3,000–6,500 per person' }
    ],
    upkeep: 'Annual licence renewal, Ejari renewal, corporate tax and UBO filings, visa renewals.',
    officialLink: 'https://www.det.gov.ae/en',
    remoteRoute:
      'You can run the consultancy from abroad only after a UAE entity and residence visa are in place; the licence is territorial. Alternatively act as a referral partner for a licensed UAE setup firm while you build the local presence.'
  },

  /* ============================================================ UAE · RERA */
  {
    id: 'ae-real-estate',
    name: 'Real Estate Broker (RERA / DLD)',
    category: 'Real Estate',
    market: 'United Arab Emirates',
    flag: '🇦🇪',
    regulator: 'Real Estate Regulatory Agency (RERA) / Dubai Land Department',
    licenceName: 'RERA broker registration (BROKER card) under a licensed brokerage',
    feeUsd: 0,
    feeLabel: 'RERA registration and card fees per DLD schedule; brokerage licence separate',
    marketCostLabel: 'Brokerage licence AED 15,000–50,000; RERA course AED 1,500–3,000; medical + Emirates ID',
    timeline: '4–12 weeks',
    residencyRule:
      'You need a valid UAE residence visa, an Emirates ID, a RERA-approved training course and sponsorship by a licensed brokerage to obtain a BROKER card.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'Possible, but only after a UAE residence visa — the BROKER card is tied to residency and a licensed brokerage.' },
      'foreign-company': { verdict: 'conditional', note: 'A foreign company cannot broker; a UAE-licensed brokerage entity is required.' },
      'local-entity': { verdict: 'conditional', note: 'Owning a brokerage licence still requires qualified registered brokers and DLD approvals.' },
      'resident-individual': { verdict: 'eligible', note: 'Residence visa → RERA course → brokerage sponsorship → BROKER card.' }
    },
    blockers: ['UAE residence visa + Emirates ID', 'RERA-approved training and exam', 'Sponsorship by a DLD-licensed brokerage', 'Commission rules and escrow compliance'],
    steps: [
      { title: 'Obtain a UAE residence visa', detail: 'Through a company, employment or family sponsorship.', cost: 'AED 3,000–6,500' },
      { title: 'Complete the RERA course', detail: 'Dubai real estate rules, ethics and contract law.', cost: 'AED 1,500–3,000' },
      { title: 'Join a licensed brokerage', detail: 'The brokerage sponsors your BROKER card application.', cost: 'Commission split' },
      { title: 'Register with DLD', detail: 'BROKER card issued; renew annually.', cost: 'DLD fee' }
    ],
    upkeep: 'Annual BROKER card renewal and continuing education; commission agreements must be registered.',
    officialLink: 'https://dubailand.gov.ae/en/real-estate-services/',
    remoteRoute: 'Not available without residency. Overseas investors typically use a RERA-registered broker and a power of attorney rather than becoming licensed themselves.'
  },

  /* ============================================================ Singapore · RFA */
  {
    id: 'sg-rfa',
    name: 'Registered Filing Agent (company formation)',
    category: 'Corporate Services',
    market: 'Singapore',
    flag: '🇸🇬',
    regulator: 'ACRA',
    licenceName: 'Registered Filing Agent (RFA) registration',
    feeUsd: 0,
    feeLabel: 'ACRA RFA registration (no separate licence fee published for the basic registration)',
    marketCostLabel: 'ACRA registered office + nominee director S$2,000–4,000/yr; corporate secretary S$300–1,200/yr',
    timeline: '1–4 weeks',
    residencyRule:
      'The RFA must be a Singapore-registered entity with at least one director/partner who is ordinarily resident in Singapore, and filings must be made through BizFile+.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'You can own the Singapore company, but a resident director is required to register as an RFA.' },
      'foreign-company': { verdict: 'blocked', note: 'An overseas entity cannot register directly; a Singapore subsidiary is required.' },
      'local-entity': { verdict: 'eligible', note: 'Singapore Pte Ltd + resident director + ACRA RFA registration.' },
      'resident-individual': { verdict: 'eligible', note: 'Resident directors/partners can register and file.' }
    },
    blockers: ['Singapore-resident director', 'Corporate secretary and registered office', 'BizFile+ account and ACRA terms', 'Client due diligence under AML rules'],
    steps: [
      { title: 'Incorporate the Singapore company', detail: 'Pte Ltd with a resident director and registered office.', cost: 'S$315' },
      { title: 'Appoint the company secretary', detail: 'Qualified and resident in Singapore.', cost: 'S$300–1,200/yr' },
      { title: 'Register as an RFA with ACRA', detail: 'Submit the RFA application and authorised filer details.', cost: 'ACRA fee' },
      { title: 'Set up client onboarding', detail: 'KYC, engagement letters and billing.', cost: 'Market' }
    ],
    upkeep: 'Annual return filings for clients, ACRA compliance and AML record-keeping.',
    officialLink: 'https://www.acra.gov.sg/',
    remoteRoute: 'Own it from abroad, but the resident director and RFA applicant must be in Singapore. Budget for a genuine resident partner, not a paper nominee.'
  },

  /* ============================================================ Hong Kong · TCSP */
  {
    id: 'hk-tcsp',
    name: 'Trust or Company Service Provider (TCSP)',
    category: 'Corporate Services',
    market: 'Hong Kong',
    flag: '🇭🇰',
    regulator: 'Companies Registry (TCSP Licensing)',
    licenceName: 'TCSP licence',
    feeUsd: 0,
    feeLabel: 'TCSP licence application and annual fees per the Companies Registry schedule',
    marketCostLabel: 'HK office + company secretary + AML officer; compliance software',
    capitalOrBond: 'No capital requirement, but "fit and proper" and AML staffing are assessed',
    timeline: '2–4 months',
    residencyRule:
      'Applicants must be a Hong Kong company or a non-Hong Kong company registered in HK, with a local office, a "fit and proper" test on directors/partners, and a compliant AML programme.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'You can own the HK company, but the licence requires HK premises and fit-and-proper directors — a resident MLRO is expected.' },
      'foreign-company': { verdict: 'conditional', note: 'A non-HK company can apply only if registered in Hong Kong (branch registration).' },
      'local-entity': { verdict: 'eligible', note: 'HK company + local office + AML programme + fit-and-proper officers.' },
      'resident-individual': { verdict: 'eligible', note: 'Same substantive requirements; being resident simplifies the fit-and-proper assessment.' }
    },
    blockers: ['Local office and staff in Hong Kong', 'Fit-and-proper test on directors and partners', 'AML/CFT programme and MLRO', 'Annual licence renewal and CR inspections'],
    steps: [
      { title: 'Incorporate the HK company', detail: 'Company limited by shares with a local secretary and registered office.', cost: 'HK$1,545 + HK$2,350' },
      { title: 'Build the AML programme', detail: 'Policies, customer due diligence, record-keeping and a compliance officer.', cost: 'Market' },
      { title: 'Apply for the TCSP licence', detail: 'Companies Registry application with business plan, office proof and fit-and-proper details.', cost: 'CR fee' },
      { title: 'Pass the licensing interview/inspection', detail: 'The Registry reviews controls and may inspect premises.', cost: 'Market' }
    ],
    upkeep: 'Annual return, BRC renewal and TCSP licence renewal; ongoing AML audits.',
    officialLink: 'https://www.cr.gov.hk/en/tcsp/index.htm',
    remoteRoute: 'Not workable without Hong Kong premises and staff. Non-resident founders typically partner with an existing TCSP for filings instead of licensing their own.'
  },

  /* ============================================================ Canada · RCIC */
  {
    id: 'ca-rcic',
    name: 'Regulated Canadian Immigration Consultant (RCIC)',
    category: 'Immigration',
    market: 'Canada',
    flag: '🇨🇦',
    regulator: 'College of Immigration and Citizenship Consultants (CICC)',
    licenceName: 'RCIC licence',
    feeUsd: 0,
    feeLabel: 'CICC application and annual fees per the College schedule; the graduate diploma is the real cost',
    marketCostLabel: 'Graduate diploma CAD 8,000–20,000; language test; professional insurance',
    timeline: '1–2 years including the diploma',
    residencyRule: 'Applicants must be Canadian citizens or permanent residents.',
    eligibility: {
      'nonresident-alien': { verdict: 'blocked', note: 'Citizenship or PR is a hard eligibility rule — a work permit or student status is not enough.' },
      'foreign-company': { verdict: 'blocked', note: 'Only individuals are licensed; a foreign company cannot practise immigration consulting.' },
      'local-entity': { verdict: 'conditional', note: 'A Canadian corporation can operate a consultancy only through an RCIC.' },
      'resident-individual': { verdict: 'eligible', note: 'Diploma → CICC exam → licence, if you are a citizen or PR.' }
    },
    blockers: ['Canadian citizenship or permanent residence', 'CICC-approved graduate diploma', 'Language and good-character requirements', 'Annual CPD and licence renewal'],
    steps: [
      { title: 'Confirm eligibility', detail: 'Citizenship or PR is required before you can enrol in the licensing path.', cost: 'CAD 0' },
      { title: 'Complete the graduate diploma', detail: 'CICC-approved program in Canadian immigration law and practice.', cost: 'CAD 8,000–20,000' },
      { title: 'Pass the CICC exam', detail: 'Entry-to-practice exam, plus language proficiency.', cost: 'Exam fee' },
      { title: 'Apply for the licence', detail: 'College application, insurance and practice management requirements.', cost: 'CICC fees' }
    ],
    upkeep: 'Annual CPD, insurance and College renewal.',
    officialLink: 'https://college-ic.ca/',
    remoteRoute: 'Not available abroad. If you are outside Canada, work as a document-collection assistant to an RCIC — never give immigration advice, which is a criminal offence in Canada when unlicensed.'
  },

  /* ============================================================ Australia · MARA */
  {
    id: 'au-mara',
    name: 'Registered Migration Agent (MARA)',
    category: 'Immigration',
    market: 'Australia',
    flag: '🇦🇺',
    regulator: 'Office of the Migration Agents Registration Authority (OMARA)',
    licenceName: 'MARA registration',
    feeUsd: 0,
    feeLabel: 'OMARA registration fee per the current schedule (annual renewal)',
    marketCostLabel: 'Graduate certificate in Australian migration law (approx. A$6,000–12,000); English requirement; insurance',
    timeline: '9–18 months',
    residencyRule: 'Applicants must be Australian citizens or permanent residents, or New Zealand citizens holding a special category visa.',
    eligibility: {
      'nonresident-alien': { verdict: 'blocked', note: 'Citizenship/PR is required — overseas consultants cannot register, even through an Australian company.' },
      'foreign-company': { verdict: 'blocked', note: 'Registration is individual-only.' },
      'local-entity': { verdict: 'conditional', note: 'An Australian company can operate only through registered agents.' },
      'resident-individual': { verdict: 'eligible', note: 'Migration-law qualification → English test → OMARA registration.' }
    },
    blockers: ['Australian citizenship or permanent residence', 'Graduate certificate in Australian migration law', 'English language proficiency', 'Annual renewal and CPD'],
    steps: [
      { title: 'Confirm status eligibility', detail: 'Citizen/PR requirement is statutory.', cost: 'A$0' },
      { title: 'Complete the migration-law course', detail: 'Graduate certificate from an approved provider.', cost: 'A$6,000–12,000' },
      { title: 'Meet the English requirement', detail: 'IELTS/equivalent at the prescribed level.', cost: 'Exam fee' },
      { title: 'Register with OMARA', detail: 'Application, insurance and character checks.', cost: 'OMARA fee' }
    ],
    upkeep: 'Annual renewal, CPD and strict consumer-protection obligations.',
    officialLink: 'https://www.mara.gov.au/',
    remoteRoute: 'Not available overseas. The lawful adjacent role is document preparation and client coordination under a registered agent.'
  },

  /* ============================================================ Global e-commerce */
  {
    id: 'global-ecommerce',
    name: 'E-commerce / Amazon FBA / Dropshipping seller',
    category: 'E-Commerce & Tech',
    market: 'Global (US / UK / EU marketplaces)',
    flag: '🌍',
    regulator: 'Marketplace + tax authorities (no professional licence)',
    licenceName: 'No professional licence — sales-tax/VAT registration and product compliance instead',
    feeUsd: 0,
    feeLabel: '$0 — no licence fee; you register for tax and comply with product rules',
    marketCostLabel: 'US LLC $50–$300; marketplace account $39.99/mo; prep centre, freight and inventory',
    timeline: '1–3 weeks to launch',
    residencyRule: 'No residency requirement. A US LLC/EIN plus a marketplace account is enough for most categories.',
    eligibility: {
      'nonresident-alien': { verdict: 'eligible', note: 'The most accessible cross-border business: US LLC + EIN + marketplace account. Watch sales-tax nexus and product-compliance rules.' },
      'foreign-company': { verdict: 'eligible', note: 'A foreign entity can sell on marketplaces, but US banking and tax forms (W-8BEN-E) are smoother with a US entity.' },
      'local-entity': { verdict: 'eligible', note: 'Standard operating model.' },
      'resident-individual': { verdict: 'eligible', note: 'Same, with simpler banking.' }
    },
    blockers: ['Marketplace verification (identity, address, bank)', 'Sales-tax/VAT registration once thresholds are crossed', 'Product safety and labelling rules (CE/UKCA, FCC, FDA for relevant goods)', 'Brand/IP complaints can freeze funds'],
    steps: [
      { title: 'Form the selling entity', detail: 'US LLC (or UK LTD) + EIN; the Amazon seller account is opened in the company name.', cost: '$50–$300' },
      { title: 'Open banking + payments', detail: 'Mercury/Payoneer/Wise and a marketplace disbursement account.', cost: '$0–$100' },
      { title: 'Register for indirect tax', detail: 'US sales tax permits by state; UK VAT once you hold UK stock; EU IOSS/OSS.', cost: '£0–£90 per registration' },
      { title: 'Product compliance + trademark', detail: 'Certifications for your category; a trademark for Brand Registry.', cost: '$250–$2,000 (market)' }
    ],
    upkeep: 'Annual reports, sales-tax returns, VAT returns and marketplace compliance notices.',
    officialLink: 'https://sell.amazon.com/',
    remoteRoute:
      'Fully remote by design. The main risk is tax nexus: holding inventory in a country creates registration duties there, even with a foreign-owned entity.'
  },

  /* ============================================================ Global SaaS */
  {
    id: 'global-saas',
    name: 'Software / SaaS / IT services agency',
    category: 'E-Commerce & Tech',
    market: 'Global (US / UK / EU clients)',
    flag: '🌍',
    regulator: 'None for the service itself — tax and data-protection rules apply',
    licenceName: 'No licence; export registration and data-protection compliance instead',
    feeUsd: 0,
    feeLabel: '$0 — no professional licence',
    marketCostLabel: 'Entity $50–£100; accounting $50–$300/mo; GDPR/DPA templates',
    timeline: 'Days to weeks',
    residencyRule: 'No residency requirement to sell software or services cross-border.',
    eligibility: {
      'nonresident-alien': { verdict: 'eligible', note: 'The default route for Pakistani and Indian founders — a US LLC or UK LTD invoicing global clients.' },
      'foreign-company': { verdict: 'eligible', note: 'Works, though enterprise procurement often prefers a US/UK/EU entity.' },
      'local-entity': { verdict: 'eligible', note: 'Standard.' },
      'resident-individual': { verdict: 'eligible', note: 'Standard.' }
    },
    blockers: ['Withholding tax on payments from some clients (treaty relief needs a tax residence certificate)', 'GDPR/UK GDPR if you process EU/UK personal data', 'Export-control rules for cryptography or dual-use software', 'Permanent-establishment risk if you have staff/servers in a market'],
    steps: [
      { title: 'Choose the invoicing entity', detail: 'US LLC for USD clients, UK LTD for UK/EU, or Estonia OÜ for EU VAT simplicity.', cost: '$50–£265' },
      { title: 'Set up payments', detail: 'Stripe/Wise/Payoneer; Stripe availability depends on the entity country.', cost: '2.9%+ per transaction' },
      { title: 'Paper the contracts', detail: 'MSA, DPA and a tax-residence certificate for treaty withholding relief.', cost: 'Market' },
      { title: 'Register for indirect tax where required', detail: 'UK VAT if turnover > £90k; EU VAT/OSS for B2C digital services.', cost: '£0–£90' }
    ],
    upkeep: 'Annual filings in the entity country, VAT/GST where registered, and data-protection records.',
    officialLink: 'https://stripe.com/guides/atlas',
    remoteRoute: 'Fully remote. This is the lowest-friction category on the site and the best first step before adding licensed activities.'
  },

  /* ============================================================ Pakistan IT export */
  {
    id: 'pk-it-export',
    name: 'IT / IT-enabled services exporter (PSEB registered)',
    category: 'E-Commerce & Tech',
    market: 'Pakistan',
    flag: '🇵🇰',
    regulator: 'Pakistan Software Export Board (PSEB) + FBR',
    licenceName: 'PSEB registration (for the reduced-tax export regime)',
    feeUsd: 0,
    feeLabel: 'PSEB company registration is free for most company categories',
    marketCostLabel: 'SECP incorporation PKR 7,755+; bank account; accounting',
    timeline: '1–3 weeks',
    residencyRule: 'You need a Pakistani company (or sole proprietorship) and a bank account; no residency issue for locals, and foreigners can own 100% of a Pvt Ltd.',
    eligibility: {
      'nonresident-alien': { verdict: 'conditional', note: 'A foreign-owned Pakistani Pvt Ltd can register with PSEB, but the reduced export tax regime is designed around Pakistani tax residents and requires local banking/FBR compliance.' },
      'foreign-company': { verdict: 'conditional', note: 'A foreign branch can operate, but PSEB benefits are aimed at locally incorporated entities.' },
      'local-entity': { verdict: 'eligible', note: 'Pvt Ltd + PSEB + FBR registration unlocks the concessional export tax treatment.' },
      'resident-individual': { verdict: 'eligible', note: 'Straightforward: register the business, PSEB and NTN, then invoice foreign clients.' }
    },
    blockers: ['FBR NTN and sales-tax registration where applicable', 'Export proceeds must come through a Pakistani bank to qualify', 'PSEB registration must stay current', 'Withholding tax on foreign remittances depends on treaty status'],
    steps: [
      { title: 'Incorporate with SECP', detail: 'Pvt Ltd or SMC through eZfile.', cost: 'PKR 7,755+' },
      { title: 'Register with FBR', detail: 'NTN, then sales-tax registration if required.', cost: 'PKR 0' },
      { title: 'Register with PSEB', detail: 'Company profile, NTN and incorporation certificate.', cost: 'PKR 0' },
      { title: 'Open a business bank account', detail: 'Export proceeds must be received in the company account.', cost: 'Market' }
    ],
    upkeep: 'Annual SECP return, income-tax return and PSEB renewal.',
    officialLink: 'https://www.pseb.org.pk/',
    remoteRoute:
      'This is the home-market play for a Pakistani founder: register locally, invoice foreign clients, and use a US LLC only if you need dollar banking or marketplace access.'
  }
];

export const LICENCE_CATEGORIES: LicenceCategory[] = [
  'Corporate Services',
  'Tax & Accounting',
  'Real Estate',
  'Trade & Logistics',
  'Transport',
  'Financial Services',
  'Insurance & Lending',
  'Immigration',
  'E-Commerce & Tech'
];

export const VERDICT_STYLES: Record<Verdict, { badge: string; dot: string; label: string }> = {
  eligible: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'You can do this'
  },
  conditional: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    label: 'Possible with a structure'
  },
  blocked: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    label: 'Blocked for this status'
  }
};

export const LICENSING_VERIFIED = '29 October 2026';
