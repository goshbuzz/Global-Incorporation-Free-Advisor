import { Scale, Landmark, ArrowRight, CheckCircle, Shield, Globe, DollarSign, FileText, AlertCircle, MapPin, Info } from 'lucide-react';

export interface HomePageProps {
  onSelect: (target: 'llc' | 'ltd') => void;
}

export default function HomePage({ onSelect }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Ribbon */}
      <div className="bg-gradient-to-r from-indigo-700 via-slate-900 to-blue-700 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🚀 Verified for the 2026/2027 Filing Seasons • 100% of government fees sourced from IRS.gov, state Secretary of State offices and GOV.UK / Companies House
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
                <p className="text-xs text-slate-500 font-medium">Self-Filing Toolkits • US LLC & UK LTD for Non-Residents</p>
              </div>
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> All prices verified from public / government sources
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="text-center max-w-3xl mx-auto">
          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
            Choose Your Jurisdiction
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
            Form your company yourself — <span className="text-indigo-600">skip the middle-man markups</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Pick a flag below to open a full self-filing advisor: official formation fees, annual upkeep costs,
            filing calendars, tax treatment for foreign owners, and direct links to the government registries —
            no agent commissions, no upsells.
          </p>
        </section>

        {/* The two big choice cards */}
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
                  <span><strong className="text-slate-900">Confirmation statement £50/yr</strong>, CT600 deadlines, Corporation Tax <strong>19%–25%</strong>, VAT at £90k</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Identity verification (GOV.UK One Login, free) is <strong>mandatory since 18 Nov 2025</strong> for directors & PSCs</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 uppercase tracking-wide">Registry</span>
                <span className="text-blue-700">Companies House (Cardiff) + HMRC</span>
              </div>
            </div>
          </button>
        </section>

        {/* Side by side comparison — verified figures */}
        <section className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-indigo-600" /> At-a-Glance: LLC vs LTD (verified government figures)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Cross-check every number against the linked government pages inside each advisor.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
                    <th className="py-3 pr-4 font-black">Factor</th>
                    <th className="py-3 pr-4 font-black text-indigo-700">🇺🇸 US LLC</th>
                    <th className="py-3 pr-4 font-black text-blue-700">🇬🇧 UK LTD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Formation fee</td>
                    <td className="py-3.5 pr-4">$45–$532 depending on state (WY $100, NM $50, DE $90)</td>
                    <td className="py-3.5 pr-4">£100 online · £124 paper · £156 same-day</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Ongoing mandatory state/registry cost</td>
                    <td className="py-3.5 pr-4">$0/yr (NM) – $800/yr (CA franchise minimum)</td>
                    <td className="py-3.5 pr-4">£50/yr digital confirmation statement (£110 paper)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Local presence needed</td>
                    <td className="py-3.5 pr-4">Registered agent in state (~$39–$300/yr market)</td>
                    <td className="py-3.5 pr-4">UK registered office (appropriate address; services from ~£25/yr market)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Tax ID for owners</td>
                    <td className="py-3.5 pr-4">EIN free via SS-4 fax; personal ITIN via Form W-7</td>
                    <td className="py-3.5 pr-4">Company UTR posted by HMRC within ~14 days of incorporation (free)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Core federal/national tax treatment</td>
                    <td className="py-3.5 pr-4">Pass-through; non-ETBUS foreign SMLLC usually owes $0 US income tax but must file Form 5472 + 1120</td>
                    <td className="py-3.5 pr-4">Corporation Tax on UK Ltd profits: 19% ≤ £50k · 25% ≥ £250k (marginal relief between)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Identity rules (2026)</td>
                    <td className="py-3.5 pr-4">No federal ID verification; FinCEN BOI reporting not required for domestic LLCs (2025 interim rule)</td>
                    <td className="py-3.5 pr-4">Mandatory verified identity + personal code for all directors & PSCs (since 18 Nov 2025)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 text-slate-500">Company information</td>
                    <td className="py-3.5 pr-4">Public register per state; owners often listed by state law</td>
                    <td className="py-3.5 pr-4">Fully public register — directors, PSCs and accounts on Find-and-Update</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Government offices strip */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl border border-indigo-100 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">US Registries</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">IRS (EIN/ITIN) + each Secretary of State</p>
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
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">UK Registries</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">Companies House + HMRC</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Companies House, Crown Way, Cardiff CF14 3UZ (main office — not open to public) · Edinburgh Quay 2, 139 Fountainbridge, Edinburgh EH3 9FF · The Linenhall, 32–38 Linenhall Street, Belfast BT2 8BG · enquiries@companieshouse.gov.uk · 0303 1234 500.
              </p>
            </div>
          </div>
        </section>

        {/* Global tax note */}
        <section className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <strong>Non-resident reality check:</strong> forming a US LLC or UK LTD is only half the story — you remain taxable on your
            worldwide business income in your country of residence, must keep your registry filings (annual report / confirmation statement)
            immaculate, and must never let the company's registered address lapse. Both advisors flag every government fee and deadline so
            you can self-file with confidence — and we always recommend a licensed CPA/accountant for the final filings.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <Scale className="h-4.5 w-4.5 text-indigo-500" /> GLOBAL INCORPORATION FREE ADVISOR
            </h4>
            <p className="text-slate-500 font-bold text-[10px] tracking-wider uppercase">Self-Formed Compliance Portal • US + UK</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-slate-500">
            <a href="https://www.irs.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition">IRS</a>
            <span>•</span>
            <a href="https://www.gov.uk/government/organisations/companies-house" target="_blank" rel="noreferrer" className="hover:text-white transition">Companies House</a>
            <span>•</span>
            <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noreferrer" className="hover:text-white transition">HMRC</a>
            <span>•</span>
            <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noreferrer" className="hover:text-white transition">UK Company Register</a>
          </div>
          <div className="text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} Hand-formed Guidance Repository.</p>
            <p className="text-[10px] text-slate-600 mt-1">
              <Globe className="inline h-3 w-3 mr-1 -mt-0.5" />
              Educational tool — always confirm figures on the official government pages before paying.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
