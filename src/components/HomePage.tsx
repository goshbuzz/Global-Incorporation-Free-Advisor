import {
  Scale,
  Landmark,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Globe2,
  DollarSign,
  FileText,
  AlertCircle,
  MapPin,
  Info,
  Briefcase,
  Ban,
  Lock,
  Sparkles
} from 'lucide-react';
import AdBanner, { LeaderboardAd } from './ads/AdBanner';
import SponsoredOffer from './ads/SponsoredOffer';
import { COUNTRIES, cheapestUsd } from '../data/globalData';
import { LICENSED_BUSINESSES } from '../data/professionsData';

export interface HomePageProps {
  onSelect: (target: 'llc' | 'ltd' | 'global' | 'license') => void;
}

const usd = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

export default function HomePage({ onSelect }: HomePageProps) {
  const openCount = LICENSED_BUSINESSES.filter(
    (b) => b.eligibility['nonresident-alien'].verdict === 'eligible'
  ).length;
  const structuredCount = LICENSED_BUSINESSES.filter(
    (b) => b.eligibility['nonresident-alien'].verdict === 'conditional'
  ).length;
  const blockedCount = LICENSED_BUSINESSES.filter(
    (b) => b.eligibility['nonresident-alien'].verdict === 'blocked'
  ).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Ribbon */}
      <div className="bg-gradient-to-r from-indigo-700 via-slate-900 to-emerald-700 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🚀 Verified for the 2026/2027 filing seasons • {COUNTRIES.length} jurisdictions • 100% of government fees sourced from
        the registries themselves (IRS, Companies House, SECP, ACRA, MOCI, CIPC…)
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-md shadow-slate-200">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Global Incorporation <span className="text-indigo-600">Free Advisor</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Company formation, non-resident tax and licensing — in one place
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => onSelect('llc')} className="text-[11px] font-bold text-indigo-700 hover:bg-indigo-50 rounded-lg px-2.5 py-2">🇺🇸 US LLC</button>
              <button onClick={() => onSelect('ltd')} className="text-[11px] font-bold text-blue-700 hover:bg-blue-50 rounded-lg px-2.5 py-2">🇬🇧 UK LTD</button>
              <button onClick={() => onSelect('global')} className="text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 rounded-lg px-2.5 py-2">🌍 25 countries</button>
              <button onClick={() => onSelect('license')} className="text-[11px] font-bold text-amber-700 hover:bg-amber-50 rounded-lg px-2.5 py-2">🪪 Licensing</button>
            </div>
            <span className="md:hidden inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1.5">
              <CheckCircle className="h-3 w-3" /> Verified
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="text-center max-w-3xl mx-auto">
          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
            Four tools · one question: where and how should you incorporate?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
            Form the company yourself — <span className="text-indigo-600">then find out what you're actually allowed to do</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Official formation fees, annual upkeep, filing calendars, foreign-owner tax treatment and — new — a licence-by-licence
            check of whether a non-resident alien or a foreign-owned company can legally run the business you have in mind.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-bold">
            <span className="bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600">🇺🇸 50 US states</span>
            <span className="bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600">🇬🇧 Companies House</span>
            <span className="bg-white border border-emerald-200 bg-emerald-50 rounded-full px-3 py-1.5 text-emerald-700">{COUNTRIES.length} countries &amp; territories</span>
            <span className="bg-white border border-amber-200 bg-amber-50 rounded-full px-3 py-1.5 text-amber-800">{LICENSED_BUSINESSES.length} licensed business types</span>
          </div>
        </section>

        {/* Advertisement — responsive leaderboard above the fold */}
        <div className="mt-8 -mx-4 sm:mx-0">
          <LeaderboardAd slotId="home-top" />
        </div>

        {/* The four big choice cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* US LLC CARD */}
          <button
            id="choose-llc"
            onClick={() => onSelect('llc')}
            className="group text-left rounded-3xl border-2 border-indigo-200 bg-white hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-indigo-300"
          >
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-7 relative">
              <div className="absolute right-5 top-5 text-6xl opacity-90 select-none">🇺🇸</div>
              <p className="text-[11px] font-black uppercase tracking-widest text-indigo-300">United States of America</p>
              <h3 className="text-3xl font-black mt-2 tracking-tight">US LLC</h3>
              <p className="text-xs text-indigo-200 mt-1 font-semibold">Limited Liability Company • 50-State Database</p>
              <div className="inline-flex items-center gap-1.5 mt-5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur-xs">
                Open LLC Advisor <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="p-7">
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <DollarSign className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">From $45–$532</strong> one-time state filing — all 50 states compared, incl. New Mexico (<strong>$50</strong>, no annual report)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Non-resident state-tax treatment</strong> per state — Fully Exempt / Conditional / High Compliance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">W-7 ITIN blueprint</strong>, Form 5472 + pro-forma 1120 duty, Form SS-4 EIN by fax (free)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Budget simulator: state fee + registered agent (<strong>$49–$125/yr</strong>) + virtual address</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 uppercase tracking-wide">Registry</span>
                <span className="text-indigo-700">Secretary of State (per state) + IRS</span>
              </div>
            </div>
          </button>

          {/* UK LTD CARD */}
          <button
            id="choose-ltd"
            onClick={() => onSelect('ltd')}
            className="group text-left rounded-3xl border-2 border-blue-200 bg-white hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-blue-300"
          >
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white p-7 relative">
              <div className="absolute right-5 top-5 text-6xl opacity-90 select-none">🇬🇧</div>
              <p className="text-[11px] font-black uppercase tracking-widest text-blue-300">United Kingdom</p>
              <h3 className="text-3xl font-black mt-2 tracking-tight">UK LTD</h3>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Private Limited Company • Companies House Database</p>
              <div className="inline-flex items-center gap-1.5 mt-5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur-xs">
                Open LTD Advisor <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="p-7">
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <DollarSign className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">£100 digital</strong> incorporation (from Feb 2026), <strong>£156</strong> same-day, <strong>£124</strong> paper</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Directors need not be UK residents</strong> — just keep a genuine UK registered office</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Confirmation statement £50/yr</strong>, CT600 deadlines, Corporation Tax 19–25%, VAT £90k</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Identity verification (GOV.UK One Login, free) is <strong>mandatory since 18 Nov 2025</strong> for directors &amp; PSCs</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 uppercase tracking-wide">Registry</span>
                <span className="text-blue-700">Companies House (Cardiff) + HMRC</span>
              </div>
            </div>
          </button>

          {/* GLOBAL CARD */}
          <button
            id="choose-global"
            onClick={() => onSelect('global')}
            className="group text-left rounded-3xl border-2 border-emerald-200 bg-white hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-100 transition-all overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
          >
            <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white p-7 relative">
              <div className="absolute right-5 top-5 text-6xl opacity-90 select-none">🌍</div>
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-300">25 jurisdictions</p>
              <h3 className="text-3xl font-black mt-2 tracking-tight">Global Countries</h3>
              <p className="text-xs text-emerald-200 mt-1 font-semibold">UAE · Saudi · Pakistan · India · China · Singapore · Canada…</p>
              <div className="inline-flex items-center gap-1.5 mt-5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur-xs">
                Open Country Advisor <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="p-7">
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <DollarSign className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Declared registry fees start at <strong className="text-slate-900">{usd(Math.min(...COUNTRIES.map((c) => cheapestUsd(c))))}</strong> — 25 fee schedules side by side, including free-to-register China and India</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Foreign-ownership rules</strong> per country — 100% open, local agent, capital-gated or restricted</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Step-by-step formation process</strong> with the authority, declared fee and document checklist for each step</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Briefcase className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Budget estimator in local currency + USD, and a <strong>compare-all</strong> table sorted by real cost</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 uppercase tracking-wide">Coverage</span>
                <span className="text-emerald-700">Gulf · South Asia · East Asia · Africa · EU · Offshore</span>
              </div>
            </div>
          </button>

          {/* LICENSING CARD */}
          <button
            id="choose-license"
            onClick={() => onSelect('license')}
            className="group text-left rounded-3xl border-2 border-amber-200 bg-white hover:border-amber-600 hover:shadow-xl hover:shadow-amber-100 transition-all overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-amber-300"
          >
            <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-slate-900 text-white p-7 relative">
              <div className="absolute right-5 top-5 text-6xl opacity-90 select-none">🪪</div>
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-200">New feature</p>
              <h3 className="text-3xl font-black mt-2 tracking-tight">Business Licensing</h3>
              <p className="text-xs text-amber-100 mt-1 font-semibold">Acceptance agents · brokers · agents · consultancies</p>
              <div className="inline-flex items-center gap-1.5 mt-5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur-xs">
                Check my eligibility <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="p-7">
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Pick who you are — <strong className="text-slate-900">non-resident alien, foreign company, your local company, or a resident</strong> — and every verdict updates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">{openCount} open outright, {structuredCount} reachable with a structure</strong> — e-commerce, SaaS, freight broker, tax prep, setup consultancies…</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Ban className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">{blockedCount} are blocked</strong> by citizenship/SSN rules — customs broker, mortgage originator, real estate, RCIC, MARA</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Licensing steps, regulator links, declared fees and the <strong>lawful workaround</strong> for each blocker</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 uppercase tracking-wide">Regulators</span>
                <span className="text-amber-700">IRS · CBP · FMCSA · FCA · MOCI · ACRA · CR</span>
              </div>
            </div>
          </button>
        </section>

        {/* Advertisement — in-content rectangle */}
        <div className="mt-10 -mx-4 sm:mx-0">
          <AdBanner size="300x250" slotId="home-mid" />
        </div>

        {/* New-feature explainer */}
        <section className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-amber-600" /> The question nobody answers: “can I actually do this from Pakistan?”
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium max-w-3xl">
              Forming a company is the easy part. Holding a regulated licence is where non-residents hit a wall. The Licensing
              Explorer checks every business type against four legal statuses and tells you which route — if any — is lawful.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Reachable in your own name</p>
                <ul className="mt-2 space-y-1.5 text-[11px] font-semibold text-emerald-900">
                  <li>• Freight broker (MC authority + $75k bond)</li>
                  <li>• Amazon FBA / e-commerce seller</li>
                  <li>• SaaS &amp; IT services agency</li>
                  <li>• Registered agent business (US premises)</li>
                  <li>• Tax preparation once you hold an ITIN</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-800">Needs a local structure</p>
                <ul className="mt-2 space-y-1.5 text-[11px] font-semibold text-amber-900">
                  <li>• UK ACSP — UK-based firm, AML supervised</li>
                  <li>• Hong Kong TCSP — HK office + MLRO</li>
                  <li>• Singapore RFA — resident director</li>
                  <li>• UAE setup consultancy — licence + visa</li>
                  <li>• Payments — sponsor an authorised firm</li>
                </ul>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">Blocked by statute</p>
                <ul className="mt-2 space-y-1.5 text-[11px] font-semibold text-rose-900">
                  <li>• US customs broker — citizen/green card</li>
                  <li>• US real estate &amp; mortgage — SSN required</li>
                  <li>• US insurance producer — work authorisation</li>
                  <li>• Canada RCIC · Australia MARA — citizen/PR</li>
                  <li>• US notary — state residency/citizenship</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">Worked example</p>
                <p className="text-sm font-extrabold mt-1">
                  Pakistani founder → IRS Acceptance Agent: allowed as a foreign applicant, but the suitability gate decides it
                </p>
                <p className="text-[11px] text-slate-300 font-medium mt-1 max-w-2xl">
                  Form 13551 lets a foreign person apply and lets foreign nationals abroad enter “N/A” for the SSN — yet every
                  responsible party needs a PTIN, a clean US tax record and suitability clearance. We walk the three routes
                  (apply directly, appoint a US citizen/LPR, or trade as a non-CAA document-preparation service) plus the same
                  logic for customs brokers, real estate agents and UK formation agents.
                </p>
              </div>
              <button
                onClick={() => onSelect('license')}
                className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl px-4 py-2.5 transition"
              >
                Open the playbook
              </button>
            </div>
          </div>
        </section>

        {/* Coverage table */}
        <section className="mt-10 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-indigo-600" /> What each advisor covers
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Cross-check every number against the linked government pages inside each advisor.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs border-collapse min-w-[820px]">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
                    <th className="py-3 pr-4 font-black">Factor</th>
                    <th className="py-3 pr-4 font-black text-indigo-700">🇺🇸 US LLC</th>
                    <th className="py-3 pr-4 font-black text-blue-700">🇬🇧 UK LTD</th>
                    <th className="py-3 pr-4 font-black text-emerald-700">🌍 Global</th>
                    <th className="py-3 pr-4 font-black text-amber-700">🪪 Licensing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Coverage</td>
                    <td className="py-3.5 pr-4">50 states</td>
                    <td className="py-3.5 pr-4">3 UK jurisdictions</td>
                    <td className="py-3.5 pr-4">{COUNTRIES.length} countries</td>
                    <td className="py-3.5 pr-4">{LICENSED_BUSINESSES.length} licence types</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Declared government fees</td>
                    <td className="py-3.5 pr-4">$45–$532 state filing</td>
                    <td className="py-3.5 pr-4">£100 digital / £124 paper</td>
                    <td className="py-3.5 pr-4">{usd(Math.min(...COUNTRIES.map((c) => cheapestUsd(c))))}+ one-off</td>
                    <td className="py-3.5 pr-4">$0–$590 regulator fees</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Non-resident analysis</td>
                    <td className="py-3.5 pr-4">State-by-state tax status</td>
                    <td className="py-3.5 pr-4">Residency-free directors</td>
                    <td className="py-3.5 pr-4">Ownership + local-agent rules</td>
                    <td className="py-3.5 pr-4">Citizenship/SSN blockers</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Process guides</td>
                    <td className="py-3.5 pr-4">ITIN W-7 + EIN SS-4</td>
                    <td className="py-3.5 pr-4">IDV + CS01 + CT600</td>
                    <td className="py-3.5 pr-4">Step checklists per country</td>
                    <td className="py-3.5 pr-4">Licensing steps + upkeep</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Budget tools</td>
                    <td className="py-3.5 pr-4">State fee + agent + address</td>
                    <td className="py-3.5 pr-4">£100 + office + accounting</td>
                    <td className="py-3.5 pr-4">Local currency + USD</td>
                    <td className="py-3.5 pr-4">Fee vs market cost split</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Country flags strip */}
        <section className="mt-8 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-emerald-600" /> Jurisdictions in the global database
            </h4>
            <button onClick={() => onSelect('global')} className="text-[11px] font-black text-emerald-700 hover:underline inline-flex items-center gap-1">
              Open all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {COUNTRIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelect('global')}
                className="text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-full px-3 py-1.5 transition"
              >
                {c.flag} {c.name}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-semibold mt-3">
            Cheapest declared formation fee: {usd(Math.min(...COUNTRIES.map((c) => cheapestUsd(c))))} · highest:
            {' '}{usd(Math.max(...COUNTRIES.map((c) => cheapestUsd(c))))} — currency conversions are indicative only.
          </p>
        </section>

        {/* Government offices strip */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl border border-indigo-100 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">US registries</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">IRS + each Secretary of State</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                IRS, 1111 Constitution Ave NW, Washington, DC 20224 · Wyoming SOS (Cheyenne) · New Mexico SOS (Santa Fe) · Delaware Division of Corporations (Dover).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">UK registries</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">Companies House + HMRC</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Companies House, Crown Way, Cardiff CF14 3UZ · Edinburgh Quay 2, 139 Fountainbridge, Edinburgh EH3 9FF · The Linenhall, Belfast BT2 8BG · 0303 1234 500.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100 shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Global registries</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">SECP · ACRA · MOCI · CIPC</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                SECP Islamabad (eZfile) · ACRA Singapore (BizFile+) · MOCI Doha · CIPC Pretoria · MISA Riyadh · DET Dubai · Companies Registry Hong Kong.
              </p>
            </div>
          </div>
        </section>

        {/* Global tax note */}
        <section className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <strong>Non-resident reality check:</strong> forming a company abroad is only half the story — you remain taxable on your
            worldwide income in your country of residence, and a licence issued in one country does not travel. Every advisor flags
            the government fee, the deadline and the ownership restriction; none of them replaces a licensed accountant or lawyer in
            the market you are entering.
          </p>
        </section>

        <SponsoredOffer className="mt-8" />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <Scale className="h-4.5 w-4.5 text-indigo-500" /> GLOBAL INCORPORATION FREE ADVISOR
            </h4>
            <p className="text-slate-500 font-bold text-[10px] tracking-wider uppercase">
              Self-Formed Compliance Portal • US + UK + {COUNTRIES.length} countries + licensing
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-slate-500">
            <a href="https://www.irs.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition">IRS</a>
            <span>•</span>
            <a href="https://www.gov.uk/government/organisations/companies-house" target="_blank" rel="noreferrer" className="hover:text-white transition">Companies House</a>
            <span>•</span>
            <a href="https://www.secp.gov.pk/" target="_blank" rel="noreferrer" className="hover:text-white transition">SECP</a>
            <span>•</span>
            <a href="https://www.acra.gov.sg/" target="_blank" rel="noreferrer" className="hover:text-white transition">ACRA</a>
            <span>•</span>
            <a href="https://www.cbp.gov/trade/programs-administration/customs-brokers" target="_blank" rel="noreferrer" className="hover:text-white transition">CBP</a>
          </div>
          <div className="text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} Hand-formed Guidance Repository.</p>
            <p className="text-[10px] text-slate-600 mt-1">
              <Globe className="inline h-3 w-3 mr-1 -mt-0.5" />
              Educational tool — always confirm figures on the official government pages before paying.
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              Ads served by{' '}
              <a href="https://adsterra.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                Adsterra
              </a>
              . Sponsored links are labelled.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
