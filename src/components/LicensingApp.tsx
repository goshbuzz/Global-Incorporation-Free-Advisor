import { useMemo, useState, type ReactNode } from 'react';
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  Ban,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  BookOpen,
  Users,
  Scale,
  Briefcase,
  Lock,
  Globe2,
  Home,
  Compass,
  Lightbulb,
  ListChecks,
  Building2,
  Clock,
  Wallet,
  ChevronRight
} from 'lucide-react';
import {
  LICENSED_BUSINESSES,
  LICENCE_CATEGORIES,
  PERSONAS,
  VERDICT_STYLES,
  LICENSING_VERIFIED,
  type LicensedBusiness,
  type Persona,
  type Verdict,
  type LicenceCategory
} from '../data/professionsData';
import AdBanner, { LeaderboardAd, VerticalAd } from './ads/AdBanner';
import SponsoredOffer from './ads/SponsoredOffer';

export interface LicensingAppProps {
  onBack: () => void;
  onSwitch: (target: 'llc' | 'ltd' | 'global') => void;
}

type Tab = 'explorer' | 'matrix' | 'playbook';

const VERDICT_ICON: Record<Verdict, ReactNode> = {
  eligible: <ShieldCheck className="h-3.5 w-3.5" />,
  conditional: <ShieldAlert className="h-3.5 w-3.5" />,
  blocked: <Ban className="h-3.5 w-3.5" />
};

const verdictRank: Record<Verdict, number> = { eligible: 0, conditional: 1, blocked: 2 };

export default function LicensingApp({ onBack, onSwitch }: LicensingAppProps) {
  const [tab, setTab] = useState<Tab>('explorer');
  const [persona, setPersona] = useState<Persona>('nonresident-alien');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'All' | LicenceCategory>('All');
  const [market, setMarket] = useState('All');
  const [selectedId, setSelectedId] = useState('us-caa');

  const markets = useMemo(
    () => Array.from(new Set(LICENSED_BUSINESSES.map((b) => b.market))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LICENSED_BUSINESSES.filter((b) => {
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.regulator.toLowerCase().includes(q) ||
        b.licenceName.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || b.category === category;
      const matchesMarket = market === 'All' || b.market === market;
      return matchesSearch && matchesCategory && matchesMarket;
    }).sort((a, b) => {
      const byVerdict = verdictRank[a.eligibility[persona].verdict] - verdictRank[b.eligibility[persona].verdict];
      if (byVerdict !== 0) return byVerdict;
      return Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular));
    });
  }, [search, category, market, persona]);

  const selected = useMemo(
    () => LICENSED_BUSINESSES.find((b) => b.id === selectedId) || LICENSED_BUSINESSES[0],
    [selectedId]
  );

  const counts = useMemo(() => {
    const tally = { eligible: 0, conditional: 0, blocked: 0 };
    LICENSED_BUSINESSES.forEach((b) => {
      tally[b.eligibility[persona].verdict] += 1;
    });
    return tally;
  }, [persona]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-amber-500 selection:text-white">
      {/* Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-slate-900 to-orange-700 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🪪 Citizenship, residency and SSN rules checked business-by-business · last verified {LICENSING_VERIFIED}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <button
                id="licensing-back-to-home"
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-700 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Back to advisor home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Advisor Home</span>
              </button>
              <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-md shadow-amber-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Business <span className="text-amber-600">Licensing Explorer</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  What can you legally run as a non-resident, alien or foreign company?
                </p>
              </div>
            </div>

            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {(
                [
                  ['explorer', '🪪 Licence Explorer'],
                  ['matrix', '📋 Eligibility Matrix'],
                  ['playbook', '🧭 Non-Resident Playbook']
                ] as [Tab, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  id={`licensing-tab-${id}`}
                  onClick={() => setTab(id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    tab === id ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold mb-6">
          <span className="text-slate-400 uppercase tracking-widest mr-1">Switch advisor:</span>
          <button onClick={() => onSwitch('llc')} className="px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">🇺🇸 US LLC</button>
          <button onClick={() => onSwitch('ltd')} className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">🇬🇧 UK LTD</button>
          <button onClick={() => onSwitch('global')} className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">🌍 Global Countries</button>
        </div>

        <div className="mt-2 -mx-4 sm:mx-0">
          <LeaderboardAd slotId="licensing-top" />
        </div>

        {/* Persona picker — always visible, it drives every verdict */}
        <section className="mt-8 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-600" /> Step 1 — Who is applying?
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Every verdict below changes with your legal status. This is the question most guides ignore.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black">
              <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{counts.eligible} open</span>
              <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{counts.conditional} conditional</span>
              <span className="px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">{counts.blocked} blocked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
            {PERSONAS.map((p) => {
              const active = persona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={`text-left rounded-xl border-2 p-3.5 transition ${
                    active
                      ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-extrabold text-slate-900">{p.label}</p>
                    {active && <CheckCircle className="h-4 w-4 text-amber-600 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed">{p.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---------------- EXPLORER ---------------- */}
        {tab === 'explorer' && (
          <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search a licence (customs broker, ACSP, RERA…)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'All' | LicenceCategory)}
                    className="text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2"
                  >
                    <option value="All">All categories</option>
                    {LICENCE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2"
                  >
                    <option value="All">All markets</option>
                    {markets.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2.5">
                  {filtered.length} of {LICENSED_BUSINESSES.length} licences · sorted by what you can actually do
                </p>
              </div>

              <div className="mt-3 space-y-2 max-h-[760px] overflow-y-auto pr-1">
                {filtered.map((b) => {
                  const verdict = b.eligibility[persona].verdict;
                  const active = b.id === selected.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedId(b.id)}
                      className={`w-full text-left rounded-xl border p-3.5 transition ${
                        active ? 'border-amber-400 bg-amber-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[13px] font-extrabold text-slate-900 leading-snug">
                            <span className="mr-1">{b.flag}</span>{b.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5 truncate">
                            {b.market} · {b.category}
                          </p>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 mt-1 ${active ? 'text-amber-600' : 'text-slate-300'}`} />
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-2.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full border ${VERDICT_STYLES[verdict].badge}`}>
                          {VERDICT_ICON[verdict]} {VERDICT_STYLES[verdict].label}
                        </span>
                        <span className="text-[10px] font-black text-slate-500">
                          {b.feeUsd === 0 ? 'No gov fee' : `$${b.feeUsd.toLocaleString('en-US')} gov`}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-xs font-bold text-slate-500">
                    No licence matches those filters.
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <LicenceDetail business={selected} persona={persona} />
              <div className="flex justify-center">
                <AdBanner size="300x250" slotId="licensing-detail" />
              </div>
            </div>
          </section>
        )}

        {/* ---------------- MATRIX ---------------- */}
        {tab === 'matrix' && (
          <section className="mt-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-600" /> Eligibility matrix — every licence, every status
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 max-w-3xl">
                Green means you can hold the licence in your own name. Amber means a structure is required (local entity,
                resident director, US responsible party, licensed partner). Red means a statutory citizenship, residency or
                SSN requirement you cannot satisfy from abroad.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[980px]">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
                      <th className="py-3 pr-3 font-black">Licence</th>
                      <th className="py-3 pr-3 font-black">Regulator</th>
                      {PERSONAS.map((p) => (
                        <th key={p.id} className={`py-3 pr-3 font-black ${p.id === persona ? 'text-amber-700' : ''}`}>
                          {p.short}
                        </th>
                      ))}
                      <th className="py-3 pr-3 font-black">Gov fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {LICENSED_BUSINESSES.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/70">
                        <td className="py-3 pr-3">
                          <button
                            onClick={() => {
                              setSelectedId(b.id);
                              setTab('explorer');
                            }}
                            className="text-left font-extrabold text-slate-900 hover:text-amber-700"
                          >
                            <span className="mr-1">{b.flag}</span>{b.name}
                          </button>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">{b.category}</span>
                        </td>
                        <td className="py-3 pr-3 text-[10px] text-slate-500 leading-snug max-w-[160px]">{b.regulator}</td>
                        {PERSONAS.map((p) => {
                          const verdict = b.eligibility[p.id].verdict;
                          return (
                            <td key={p.id} className="py-3 pr-3">
                              <span
                                title={b.eligibility[p.id].note}
                                className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full border ${VERDICT_STYLES[verdict].badge}`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${VERDICT_STYLES[verdict].dot}`} />
                                {verdict === 'eligible' ? 'Yes' : verdict === 'conditional' ? 'Structure' : 'No'}
                              </span>
                            </td>
                          );
                        })}
                        <td className="py-3 pr-3 text-[11px] font-black text-slate-800">
                          {b.feeUsd === 0 ? '—' : `$${b.feeUsd.toLocaleString('en-US')}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-700 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" /> Hard blockers to know
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] font-semibold text-rose-900/90">
                    <li>• US customs broker — citizenship/LPR</li>
                    <li>• US real estate & MLO — SSN + fingerprints</li>
                    <li>• US insurance producer — work authorisation</li>
                    <li>• Canada RCIC + Australia MARA — citizen/PR</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" /> Genuinely open to you
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] font-semibold text-emerald-900/90">
                    <li>• Freight broker (FMCSA) with a bond</li>
                    <li>• E-commerce / SaaS / IT exports</li>
                    <li>• Registered agent business (with US premises)</li>
                    <li>• Tax preparation once you hold an ITIN</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" /> Structures that unlock the rest
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] font-semibold text-amber-900/90">
                    <li>• US citizen/resident as Responsible Party</li>
                    <li>• Resident nominee director (SG, MY, AU, IN)</li>
                    <li>• White-label a licensed broker/agent</li>
                    <li>• Own the entity, employ the licensee</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- PLAYBOOK ---------------- */}
        {tab === 'playbook' && (
          <section className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                    <Compass className="h-5 w-5 text-amber-600" /> Five lawful routes to run a licensed business from abroad
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Almost every "you cannot do this as a foreigner" problem has a structural answer. These are the five that
                    actually survive regulatory scrutiny.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        n: 1,
                        title: 'Own the entity, hire the licensee',
                        body: 'The licence often attaches to a person, not a company. Own 100% of the local company and employ or contract the qualified individual (customs broker, RCIC, MARA agent, insurance producer, RERA broker) as the responsible officer.',
                        good: 'Retains full economic ownership',
                        watch: 'Employment, non-compete and key-person risk'
                      },
                      {
                        n: 2,
                        title: 'Resident nominee director',
                        body: 'Singapore, Malaysia, Australia, India, Ireland and Canada all demand a locally resident director or partner. Commercial nominee services exist, but a passive nominee leaves you exposed to liability and bank de-risking.',
                        good: 'Fast, cheap, standard market practice',
                        watch: 'Use a regulated corporate-services firm with a real indemnity, never a friend on paper'
                      },
                      {
                        n: 3,
                        title: 'White-label or programme agreement',
                        body: 'Operate under an existing licensee: payments via a BaaS/EMI, customs entries via a licensed broker, insurance sales via an appointed agency, migration filings under a registered agent.',
                        good: 'No licensing runway, launch in weeks',
                        watch: 'The licensee controls the relationship and takes a margin'
                      },
                      {
                        n: 4,
                        title: 'Partner-of-record (local sponsor or service agent)',
                        body: 'Gulf structures often need a national service agent (fixed fee, no equity) or a local partner in restricted sectors. Get the fee, term and exit in writing — verbal arrangements fail audits.',
                        good: 'Unlocks restricted sectors',
                        watch: 'Sponsor holds leverage; courts favour the national in disputes'
                      },
                      {
                        n: 5,
                        title: 'Change status — relocate or naturalise',
                        body: 'The honest answer for customs broking, MLO, CAA, RCIC and MARA: the requirement is status-based. A green card, PR or citizenship is the prerequisite, not a workaround.',
                        good: 'Removes the blocker permanently',
                        watch: '12–60 months and real cost; plan the business around it'
                      }
                    ].map((route) => (
                      <div key={route.n} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <span className="h-7 w-7 shrink-0 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center">
                            {route.n}
                          </span>
                          <div>
                            <p className="text-sm font-extrabold text-slate-900">{route.title}</p>
                            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">{route.body}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <span className="text-[10px] font-bold text-emerald-700">✓ {route.good}</span>
                              <span className="text-[10px] font-bold text-rose-600">! {route.watch}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Worked example */}
                <div className="bg-white rounded-2xl border border-amber-200 p-6">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600" />
                    <h2 className="text-lg font-black text-slate-950">Worked example: a Pakistani founder and the IRS Acceptance Agent question</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    "Can I become an acceptance agent in America from Pakistan?" — on paper yes, because the IRS allows a
                    foreign person to apply. In practice the suitability gate is what decides it. Here is the precise rule and
                    the three routes that actually work.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">The trap</p>
                      <p className="text-[11px] font-semibold text-rose-900/90 mt-2 leading-relaxed">
                        Applying with no US tax footprint and no PTIN. Applications are rejected for incomplete training,
                        missing documents and unresolved tax-compliance issues — and IRS internal guidance requires
                        citizenship/immigration status verification for individuals subject to suitability.
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-800">What the rule says</p>
                      <p className="text-[11px] font-semibold text-amber-900/90 mt-2 leading-relaxed">
                        Form 13551 states an eligible person may be "a U.S. person or a foreign person". Foreign nationals
                        living outside the US enter N/A for the SSN/ITIN line and are exempt from fingerprinting — so a
                        Pakistan-resident applicant is not excluded by the form itself.
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">What scales</p>
                      <p className="text-[11px] font-semibold text-emerald-900/90 mt-2 leading-relaxed">
                        Own a US LLC, put a US citizen/LPR in the Responsible Party seat, and run intake, document
                        collection, QA and billing from Pakistan. Foreign ownership of the entity is fine; the signatory is
                        the part that attracts scrutiny.
                      </p>
                    </div>
                  </div>

                  <ol className="mt-5 space-y-3">
                    {[
                      'Form the US LLC and obtain the EIN (Form SS-4 by fax, free).',
                      'Decide the responsible party: yourself as a foreign person (allowed, but scrutinised) or a US citizen/LPR with a written compliance charter and indemnity.',
                      'Get a PTIN for every responsible party — foreign persons with a permanent non-US address can hold one once they have an ITIN.',
                      'Complete the free IRS ITIN Acceptance Agent training; CAA applicants also complete forensic document training ($75–$200).',
                      'E-file Form 13551 through IRS e-Services, upload training and identity documents, and wait out the ~60–90 day suitability review.',
                      'Operate intake, document collection, translation, QA and billing from Pakistan; the responsible party signs the certifications.',
                      'Diary the renewal — the agreement does not auto-renew, and a fresh Form 13551 is required in the expiry year.'
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 text-[11px] font-medium text-slate-600">
                        <span className="h-5 w-5 shrink-0 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 bg-slate-900 text-white rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Same logic, other brokers</p>
                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-200">
                      <li>• Customs broker → citizenship/LPR required; hire a licensed broker as qualifying officer</li>
                      <li>• Freight broker → no citizenship rule, so you can hold it yourself</li>
                      <li>• Real estate → SSN required; partner with a licensed brokerage</li>
                      <li>• UK company formation → UK-based ACSP with AML supervision</li>
                    </ul>
                  </div>

                  <a
                    href="https://www.irs.gov/individuals/international-taxpayers/acceptance-agent-program"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 text-[11px] font-black text-amber-700 hover:underline"
                  >
                    Read the IRS Acceptance Agent Program page <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-amber-600" /> Before you spend anything
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      {
                        t: 'Read the statute, not the blog',
                        d: 'Look for "citizen", "resident", "social security number" and "work authorisation" in the regulator’s own eligibility page. Those four words decide most cases.'
                      },
                      {
                        t: 'Separate licence from activity',
                        d: 'You can often own the business, market it, and take profit without personally holding the licence — the licensee must simply be employed or contracted.'
                      },
                      {
                        t: 'Budget market cost, not just the fee',
                        d: 'Government fees are usually the smallest line: bonds, training, nominee directors, notaries and audits dominate.'
                      },
                      {
                        t: 'Check advertising rules',
                        d: 'Claiming a licence you do not hold (or implying government affiliation) is a fast route to enforcement — and in the US, unauthorised-practice-of-law exposure.'
                      }
                    ].map((card) => (
                      <div key={card.t} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-[11px] font-black text-slate-900">{card.t}</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1.5 leading-relaxed">{card.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Your route at a glance
                  </p>
                  <ol className="mt-3 space-y-2.5 text-[11px] font-semibold text-slate-600">
                    <li className="flex gap-2"><span className="text-amber-600 font-black">1.</span> Form the operating entity (US LLC / UK LTD / local company).</li>
                    <li className="flex gap-2"><span className="text-amber-600 font-black">2.</span> Check the licence's eligibility page for status language.</li>
                    <li className="flex gap-2"><span className="text-amber-600 font-black">3.</span> Choose a route: employ the licensee, nominee, white-label, or relocate.</li>
                    <li className="flex gap-2"><span className="text-amber-600 font-black">4.</span> Budget the bond/capital before the fee.</li>
                    <li className="flex gap-2"><span className="text-amber-600 font-black">5.</span> Paper the relationship: charter, indemnity, exit clause.</li>
                  </ol>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" /> Not legal advice
                  </p>
                  <p className="text-[11px] text-amber-900/90 font-medium mt-2 leading-relaxed">
                    Licence eligibility turns on facts (citizenship, visa class, criminal record, tax compliance) that this tool
                    cannot verify. Confirm with the regulator and a licensed professional in that market before you trade or
                    advertise a regulated service.
                  </p>
                </div>
                <VerticalAd slotId="licensing-playbook" />
                <SponsoredOffer />
              </aside>
            </div>
          </section>
        )}

        <SponsoredOffer className="mt-10" />

        <footer className="mt-12 border-t border-slate-200 pt-6 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regulators referenced</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {Array.from(new Set(LICENSED_BUSINESSES.map((b) => b.officialLink)))
                  .slice(0, 7)
                  .map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-slate-500 hover:text-amber-700 hover:underline"
                    >
                      {new URL(link).hostname.replace('www.', '')}
                    </a>
                  ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold max-w-md leading-relaxed">
              Government fees shown are the regulator's declared charge. Training, bonds, nominee and legal costs are shown
              separately as market ranges.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Licence detail                                                      */
/* ------------------------------------------------------------------ */

function LicenceDetail({ business, persona }: { business: LicensedBusiness; persona: Persona }) {
  const current = business.eligibility[persona];
  const personaMeta = PERSONAS.find((p) => p.id === persona)!;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">
              {business.flag} {business.market} · {business.category}
            </p>
            <h2 className="text-xl font-black tracking-tight mt-1 leading-tight">{business.name}</h2>
            <p className="text-[11px] text-slate-300 font-semibold mt-1">{business.regulator}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[10px] font-black bg-white/10 border border-white/20 rounded-full px-2.5 py-1">
            {business.feeUsd === 0 ? 'No government fee' : `$${business.feeUsd.toLocaleString('en-US')} gov fee`}
          </span>
          <span className="text-[10px] font-black bg-white/10 border border-white/20 rounded-full px-2.5 py-1">
            {business.timeline}
          </span>
          {business.capitalOrBond && (
            <span className="text-[10px] font-black bg-white/10 border border-white/20 rounded-full px-2.5 py-1">
              {business.capitalOrBond}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Verdict for the selected persona */}
        <div className={`rounded-xl border p-4 ${VERDICT_STYLES[current.verdict].badge}`}>
          <div className="flex items-center gap-2">
            {VERDICT_ICON[current.verdict]}
            <p className="text-xs font-black uppercase tracking-wide">
              {personaMeta.short}: {VERDICT_STYLES[current.verdict].label}
            </p>
          </div>
          <p className="text-[11px] font-semibold mt-1.5 leading-relaxed opacity-90">{current.note}</p>
        </div>

        {/* All personas */}
        <div className="mt-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verdict by status</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {PERSONAS.map((p) => {
              const v = business.eligibility[p.id];
              return (
                <div
                  key={p.id}
                  className={`rounded-lg border px-3 py-2.5 ${
                    p.id === persona ? 'border-amber-400 bg-amber-50/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${VERDICT_STYLES[v.verdict].dot}`} />
                    <p className="text-[10px] font-black text-slate-700">{p.short}</p>
                    <span className="ml-auto text-[9px] font-black uppercase tracking-wide text-slate-400">
                      {v.verdict === 'eligible' ? 'Yes' : v.verdict === 'conditional' ? 'Structure' : 'No'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1 leading-snug">{v.note}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 flex items-center gap-1">
              <Wallet className="h-3 w-3" /> Declared government fee
            </p>
            <p className="text-[11px] font-bold text-emerald-950 mt-1.5 leading-relaxed">{business.feeLabel}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> Market cost (not a fee)
            </p>
            <p className="text-[11px] font-bold text-slate-700 mt-1.5 leading-relaxed">{business.marketCostLabel}</p>
          </div>
        </div>

        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
            <Users className="h-3 w-3" /> Residency / citizenship rule
          </p>
          <p className="text-[11px] font-bold text-slate-700 mt-1.5 leading-relaxed">{business.residencyRule}</p>
        </div>

        {/* Blockers */}
        <div className="mt-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> What you must satisfy
          </p>
          <ul className="mt-2 space-y-1.5">
            {business.blockers.map((b) => (
              <li key={b} className="flex gap-2 text-[11px] font-semibold text-slate-600">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mt-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5" /> Licensing process
          </p>
          <ol className="mt-2 space-y-2.5">
            {business.steps.map((step, i) => (
              <li key={step.title} className="flex gap-2.5">
                <span className="h-5 w-5 shrink-0 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[11px] font-extrabold text-slate-900">
                    {step.title}
                    <span className="ml-2 text-[9px] font-black uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5">
                      {step.cost}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Route for non-residents */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1">
            <Globe2 className="h-3 w-3" /> How a non-resident actually does this
          </p>
          <p className="text-[11px] font-semibold text-amber-950 mt-1.5 leading-relaxed">{business.remoteRoute}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {business.upkeep}
          </p>
          <a
            href={business.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 hover:underline shrink-0"
          >
            Regulator page <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
