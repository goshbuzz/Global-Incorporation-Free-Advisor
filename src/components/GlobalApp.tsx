import { useMemo, useState } from 'react';
import {
  Search,
  Globe2,
  Landmark,
  FileText,
  Calculator,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Info,
  Building2,
  Wallet,
  CalendarClock,
  ChevronRight,
  Home,
  Shield,
  Scale,
  ArrowRight,
  SlidersHorizontal,
  MapPin,
  Percent,
  ListChecks,
  Users
} from 'lucide-react';
import {
  COUNTRIES,
  REGIONS,
  NON_RESIDENT_STATUS_STYLES,
  GLOBAL_DATA_VERIFIED,
  FX_NOTE,
  money,
  toUsd,
  cheapestUsd,
  cheapestAnnualUsd,
  type Country,
  type Region,
  type NonResidentStatus
} from '../data/globalData';
import AdBanner, { LeaderboardAd, VerticalAd } from './ads/AdBanner';
import SponsoredOffer from './ads/SponsoredOffer';

export interface GlobalAppProps {
  onBack: () => void;
  onSwitch: (target: 'llc' | 'ltd' | 'license') => void;
}

type Tab = 'countries' | 'process' | 'calculator' | 'compare';

/** Typical market (non-government) costs used by the estimator, in USD/year. */
const MARKET_DEFAULTS: Record<string, { address: number; accountant: number; visa: number }> = {
  US: { address: 99, accountant: 600, visa: 0 },
  UK: { address: 60, accountant: 700, visa: 0 },
  AE: { address: 4000, accountant: 1500, visa: 1400 },
  SA: { address: 5500, accountant: 2500, visa: 1800 },
  QA: { address: 4000, accountant: 2000, visa: 1600 },
  PK: { address: 150, accountant: 400, visa: 0 },
  IN: { address: 100, accountant: 350, visa: 0 },
  CN: { address: 3000, accountant: 2500, visa: 800 },
  RU: { address: 250, accountant: 900, visa: 400 },
  TR: { address: 1200, accountant: 900, visa: 500 },
  CA: { address: 150, accountant: 1200, visa: 0 },
  SG: { address: 500, accountant: 1200, visa: 0 },
  HK: { address: 600, accountant: 1800, visa: 0 },
  MY: { address: 350, accountant: 700, visa: 900 },
  ID: { address: 900, accountant: 1200, visa: 700 },
  NG: { address: 300, accountant: 600, visa: 500 },
  KE: { address: 300, accountant: 700, visa: 400 },
  ZA: { address: 250, accountant: 900, visa: 300 },
  DE: { address: 600, accountant: 1800, visa: 0 },
  IE: { address: 500, accountant: 1500, visa: 0 },
  EE: { address: 100, accountant: 900, visa: 0 },
  CY: { address: 500, accountant: 1800, visa: 0 },
  PA: { address: 500, accountant: 800, visa: 0 },
  VG: { address: 900, accountant: 1200, visa: 0 },
  AU: { address: 350, accountant: 1500, visa: 0 }
};

const usd = (value: number) => {
  const digits = value === 0 || value >= 10 ? 0 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
};

export default function GlobalApp({ onBack, onSwitch }: GlobalAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>('countries');
  const [selectedId, setSelectedId] = useState<string>('AE');
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState<'All' | Region>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | NonResidentStatus>('All');
  const [popularOnly, setPopularOnly] = useState(false);
  const [entityId, setEntityId] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, number[]>>({});
  const [services, setServices] = useState({ address: true, accountant: true, visa: false });

  const country = useMemo(
    () => COUNTRIES.find((c) => c.id === selectedId) || COUNTRIES[0],
    [selectedId]
  );

  const entity = useMemo(() => {
    return country.entityTypes.find((e) => e.id === entityId) || country.entityTypes[0];
  }, [country, entityId]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.registry.toLowerCase().includes(q) ||
        c.currencyCode.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q);
      const matchesRegion = region === 'All' || c.region === region;
      const matchesStatus = statusFilter === 'All' || c.nonResidentStatus === statusFilter;
      const matchesPopular = !popularOnly || c.isPopular;
      return matchesSearch && matchesRegion && matchesStatus && matchesPopular;
    });
  }, [searchTerm, region, statusFilter, popularOnly]);

  const market = MARKET_DEFAULTS[country.id] || { address: 400, accountant: 1000, visa: 0 };
  const marketAddress = services.address ? market.address : 0;
  const marketAccountant = services.accountant ? market.accountant : 0;
  const marketVisa = services.visa ? market.visa : 0;

  // MARKET_DEFAULTS are already in USD, so convert once into local currency.
  const oneTimeTotal = entity.govFee + toLocal(marketAddress + marketVisa, country);
  const annualTotal = entity.annual + toLocal(marketAddress + marketAccountant, country);

  const toggleStep = (index: number) => {
    const list = checkedSteps[country.id] || [];
    setCheckedSteps({
      ...checkedSteps,
      [country.id]: list.includes(index) ? list.filter((i) => i !== index) : [...list, index]
    });
  };

  const done = checkedSteps[country.id] || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* Ribbon */}
      <div className="bg-gradient-to-r from-emerald-700 via-slate-900 to-teal-700 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🌍 25 jurisdictions · declared government fees only · non-resident rules checked against each registry ({GLOBAL_DATA_VERIFIED})
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <button
                id="global-back-to-home"
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Back to advisor home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Advisor Home</span>
              </button>
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md shadow-emerald-100">
                <Globe2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Global Company <span className="text-emerald-600">Formation Advisor</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  25 countries · declared registry fees · foreign-ownership rules
                </p>
              </div>
            </div>

            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {(
                [
                  ['countries', '🌍 Countries & Fees'],
                  ['process', '🧾 Formation Process'],
                  ['calculator', '🧮 Cost Estimator'],
                  ['compare', '📊 Compare All']
                ] as [Tab, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  id={`global-tab-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    activeTab === id ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
          <button onClick={() => onSwitch('license')} className="px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100">🪪 Business Licensing</button>
        </div>

        <div className="mt-2 -mx-4 sm:mx-0">
          <LeaderboardAd slotId="global-top" />
        </div>

        {/* ---------------- COUNTRIES TAB ---------------- */}
        {activeTab === 'countries' && (
          <section className="mt-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search a country, registry or currency (e.g. Singapore, SECP, AED)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
                  />
                </div>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as 'All' | Region)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="All">All regions</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'All' | NonResidentStatus)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="All">Any non-resident status</option>
                  <option value="Fully Open to Non-Residents">Fully open</option>
                  <option value="Open with a Local Agent/Director">Needs local agent/director</option>
                  <option value="Capital or Sector Gated">Capital / sector gated</option>
                </select>
                <button
                  onClick={() => setPopularOnly(!popularOnly)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition ${
                    popularOnly
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Popular only
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold mt-3">
                {filtered.length} of {COUNTRIES.length} jurisdictions · fees shown in local currency with an indicative USD conversion
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Country list */}
              <div className="lg:col-span-4 space-y-2 max-h-[820px] overflow-y-auto pr-1">
                {filtered.map((c) => {
                  const active = c.id === country.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedId(c.id);
                        setEntityId(null);
                      }}
                      className={`w-full text-left rounded-xl border p-3.5 transition ${
                        active
                          ? 'bg-emerald-50/60 border-emerald-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="text-2xl leading-none mt-0.5">{c.flag}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold text-slate-900 truncate">{c.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">
                              {c.region} · {c.currencyCode}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 mt-1 ${active ? 'text-emerald-600' : 'text-slate-300'}`} />
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-2.5">
                        <span className="text-[11px] font-bold text-slate-700">
                          {usd(cheapestUsd(c))} <span className="text-slate-400 font-semibold">one-off</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {usd(cheapestAnnualUsd(c))}/yr
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                    <p className="text-xs font-bold text-slate-500">No jurisdiction matches those filters.</p>
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="lg:col-span-8 space-y-6">
                <CountryDetail country={country} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Percent className="h-3.5 w-3.5" /> Tax treatment
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 mt-2 leading-snug">{country.taxSummary}</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-2 leading-relaxed">{country.taxNote}</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> Registry
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 mt-2 leading-snug">{country.registry}</p>
                    <a
                      href={country.registryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-[11px] font-black text-emerald-700 hover:underline"
                    >
                      Open the official registry <ExternalLink className="h-3 w-3" />
                    </a>
                    <p className="text-[10px] text-slate-400 font-semibold mt-3">
                      Last checked {GLOBAL_DATA_VERIFIED} · {country.sources.length} official source{country.sources.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-amber-900">Currency & fee caveat</p>
                    <p className="text-[11px] text-amber-900/90 font-medium mt-1 leading-relaxed">
                      {FX_NOTE} Government fee schedules change without notice (several registries update on 1 January or 1 April).
                      Always price your filing on the registry's own payment page before you transfer money.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <AdBanner size="300x250" slotId="global-detail" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- PROCESS TAB ---------------- */}
        {activeTab === 'process' && (
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h2 className="text-xl font-black text-slate-950 tracking-tight">{country.name} — how to incorporate</h2>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">{country.registry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={country.id}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all"
                      style={{ width: `${Math.round((done.length / country.process.length) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-slate-500">
                    {done.length}/{country.process.length} done
                  </span>
                </div>

                <ol className="mt-6 space-y-4">
                  {country.process.map((step, index) => {
                    const complete = done.includes(index);
                    return (
                      <li key={step.title} className="flex gap-3.5">
                        <button
                          onClick={() => toggleStep(index)}
                          className={`mt-0.5 h-7 w-7 shrink-0 rounded-full border-2 flex items-center justify-center transition ${
                            complete
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-300 text-slate-400 hover:border-emerald-400'
                          }`}
                          aria-label={`Mark "${step.title}" ${complete ? 'not done' : 'done'}`}
                        >
                          {complete ? <CheckCircle className="h-4 w-4" /> : <span className="text-[11px] font-black">{index + 1}</span>}
                        </button>
                        <div className={`flex-1 pb-4 ${index === country.process.length - 1 ? '' : 'border-b border-slate-100'}`}>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={`text-sm font-extrabold ${complete ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                              {step.title}
                            </h3>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                              {step.cost}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">{step.detail}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1.5">{step.authority}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Declared government cost — {entity.name}</p>
                  <p className="text-lg font-black text-slate-900 mt-1">
                    {money(entity.govFee, country.currencyCode)}{' '}
                    <span className="text-[11px] font-bold text-slate-500">
                      ≈ {usd(toUsd(entity.govFee, country))} · plus market costs (notary, agent, translation)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" /> Recurring obligations
                </p>
                <ul className="mt-3 space-y-3">
                  {country.compliance.map((item) => (
                    <li key={item.item} className="text-[11px]">
                      <p className="font-extrabold text-slate-800">{item.item}</p>
                      <p className="text-slate-500 font-medium">{item.when}</p>
                      <p className="text-emerald-700 font-bold mt-0.5">{item.cost}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <VerticalAd slotId="global-process-rail" />
              <SponsoredOffer />
            </aside>
          </section>
        )}

        {/* ---------------- CALCULATOR TAB ---------------- */}
        {activeTab === 'calculator' && (
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-600" /> Realistic first-year budget
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Government fees come straight from the declared schedule. Service costs are typical market ranges you can edit.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jurisdiction</span>
                    <select
                      value={country.id}
                      onChange={(e) => {
                        setSelectedId(e.target.value);
                        setEntityId(null);
                      }}
                      className="mt-1.5 w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Entity type</span>
                    <select
                      value={entity.id}
                      onChange={(e) => setEntityId(e.target.value)}
                      className="mt-1.5 w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                    >
                      {country.entityTypes.map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-5 space-y-2.5">
                  {(
                    [
                      ['address', 'Registered address / agent (annual market cost)'],
                      ['accountant', 'Accountant or bookkeeping (annual market cost)'],
                      ['visa', 'Owner residence visa / establishment card (annual)']
                    ] as [keyof typeof services, string][]
                  ).map(([key, label]) => (
                    <label key={key} className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 cursor-pointer">
                      <span className="text-[11px] font-bold text-slate-700">{label}</span>
                      <input
                        type="checkbox"
                        checked={services[key]}
                        onChange={(e) => setServices({ ...services, [key]: e.target.checked })}
                        className="h-4 w-4 accent-emerald-600"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5 bg-slate-900 text-white rounded-2xl p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Government (one-off)</p>
                      <p className="text-lg font-black mt-1">{money(entity.govFee, country.currencyCode)}</p>
                      <p className="text-[10px] font-bold text-slate-400">≈ {usd(toUsd(entity.govFee, country))}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Year-one total</p>
                      <p className="text-lg font-black mt-1 text-emerald-400">{money(oneTimeTotal, country.currencyCode)}</p>
                      <p className="text-[10px] font-bold text-slate-400">≈ {usd(toUsd(oneTimeTotal, country))}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Recurring / year</p>
                      <p className="text-lg font-black mt-1 text-teal-300">{money(annualTotal, country.currencyCode)}</p>
                      <p className="text-[10px] font-bold text-slate-400">≈ {usd(toUsd(annualTotal, country))}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold mt-3 leading-relaxed">
                  The year-one total adds the declared government fee plus your selected services. It excludes notary/apostille
                  charges, translation, capital that stays in the company, and any sector licence.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-emerald-600" /> What the declared fee does and does not cover
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Covered</p>
                    <ul className="mt-2 space-y-1.5 text-[11px] font-semibold text-slate-600">
                      <li>• Registry review and certificate</li>
                      <li>• Name reservation (where bundled)</li>
                      <li>• Digital certificate / registry extract</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Not covered</p>
                    <ul className="mt-2 space-y-1.5 text-[11px] font-semibold text-slate-600">
                      <li>• Notary, apostille and translation</li>
                      <li>• Registered agent / local director</li>
                      <li>• Sector licences and visas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> Non-resident check
                </p>
                <p className="text-xs font-extrabold text-emerald-950 mt-2">{country.nonResidentStatus}</p>
                <p className="text-[11px] text-emerald-900/90 font-medium mt-1.5 leading-relaxed">{country.nonResidentNote}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> Capital & residency
                </p>
                <dl className="mt-3 space-y-2.5 text-[11px]">
                  <div>
                    <dt className="font-black text-slate-800">Minimum capital</dt>
                    <dd className="text-slate-500 font-medium">
                      {entity.minCapital !== undefined && entity.minCapital > 0
                        ? `${money(entity.minCapital, country.currencyCode)} · ${entity.capitalNote || ''}`
                        : entity.capitalNote || 'None'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-800">Residency rule</dt>
                    <dd className="text-slate-500 font-medium">{entity.residency}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-800">Timeline</dt>
                    <dd className="text-slate-500 font-medium">{entity.timeline}</dd>
                  </div>
                </dl>
              </div>
              <AdBanner size="300x250" slotId="global-calc" />
            </aside>
          </section>
        )}

        {/* ---------------- COMPARE TAB ---------------- */}
        {activeTab === 'compare' && (
          <section className="mt-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7">
              <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <Scale className="h-5 w-5 text-emerald-600" /> Every jurisdiction at a glance
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Sorted by cheapest declared government formation fee (indicative USD). Annual figures are the cheapest declared
                recurring registry cost — they exclude agent, accounting and audit services.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[900px]">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
                      <th className="py-3 pr-3 font-black">Jurisdiction</th>
                      <th className="py-3 pr-3 font-black">Registry</th>
                      <th className="py-3 pr-3 font-black">Cheapest formation</th>
                      <th className="py-3 pr-3 font-black">Recurring (gov)</th>
                      <th className="py-3 pr-3 font-black">Ownership</th>
                      <th className="py-3 pr-3 font-black">Non-resident status</th>
                      <th className="py-3 pr-3 font-black">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {[...COUNTRIES]
                      .sort((a, b) => cheapestUsd(a) - cheapestUsd(b))
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/70">
                          <td className="py-3 pr-3">
                            <button
                              onClick={() => {
                                setSelectedId(c.id);
                                setEntityId(null);
                                setActiveTab('countries');
                              }}
                              className="flex items-center gap-2 font-extrabold text-slate-900 hover:text-emerald-700"
                            >
                              <span className="text-base">{c.flag}</span>
                              {c.name}
                            </button>
                          </td>
                          <td className="py-3 pr-3 text-slate-500 text-[11px]">{c.registry.split('+')[0].trim()}</td>
                          <td className="py-3 pr-3">
                            <span className="font-extrabold text-slate-900">{usd(cheapestUsd(c))}</span>
                            <span className="block text-[10px] text-slate-400 font-semibold">{c.currencyCode}</span>
                          </td>
                          <td className="py-3 pr-3 text-[11px]">{usd(cheapestAnnualUsd(c))}</td>
                          <td className="py-3 pr-3 text-[11px]">{c.entityTypes[0].ownership}</td>
                          <td className="py-3 pr-3">
                            <span className={`inline-block text-[10px] font-black px-2 py-1 rounded-full border ${NON_RESIDENT_STATUS_STYLES[c.nonResidentStatus]}`}>
                              {c.nonResidentStatus}
                            </span>
                          </td>
                          <td className="py-3 pr-3">
                            <a href={c.registryLink} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline inline-flex items-center gap-1 text-[11px] font-black">
                              Registry <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <AlertCircle className="h-5 w-5" />,
                  title: 'Cheap to register ≠ cheap to run',
                  body: 'China and India are effectively free to register but demand paid-in capital, audits and resident officers. Germany is €375 in court fees but €12,500 must sit in the bank.'
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: 'The residency rule is the real gate',
                  body: 'Singapore, Malaysia, Australia, Canada, India and Ireland all require a locally resident director or partner — budget a nominee or relocate.'
                },
                {
                  icon: <ListChecks className="h-5 w-5" />,
                  title: 'Fees update on fixed dates',
                  body: 'UK (1 Feb), Australia (1 July), Hong Kong (1 April) and India (annual Finance Act) all revise schedules. Re-check before paying.'
                }
              ].map((card) => (
                <div key={card.title} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="text-emerald-600">{card.icon}</div>
                  <p className="text-xs font-black text-slate-900 mt-2">{card.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1.5 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <AdBanner size="300x250" slotId="global-compare" />
            </div>
          </section>
        )}

        <SponsoredOffer className="mt-10" />

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 pt-6 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official registries referenced</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {COUNTRIES.slice(0, 8).map((c) => (
                  <a
                    key={c.id}
                    href={c.registryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-slate-500 hover:text-emerald-700 hover:underline"
                  >
                    {c.name}
                  </a>
                ))}
                <span className="text-[11px] font-bold text-slate-400">+ {COUNTRIES.length - 8} more</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold max-w-md leading-relaxed">
              Educational tool, not legal or tax advice. Cross-border structuring creates tax residence, permanent-establishment
              and reporting questions that need a local accountant.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Country detail panel                                                */
/* ------------------------------------------------------------------ */

function CountryDetail({ country }: { country: Country }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="text-5xl leading-none">{country.flag}</span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">{country.region}</p>
              <h2 className="text-2xl font-black tracking-tight mt-0.5">{country.name}</h2>
              <p className="text-[11px] font-semibold text-slate-300 mt-1">{country.currency} · {country.currencyCode}</p>
            </div>
          </div>
          <span
            className={`hidden sm:inline-block text-[10px] font-black px-2.5 py-1.5 rounded-full border ${NON_RESIDENT_STATUS_STYLES[country.nonResidentStatus]}`}
          >
            {country.nonResidentStatus}
          </span>
        </div>
        <p className="text-xs text-slate-200 font-medium mt-4 leading-relaxed max-w-2xl">{country.headline}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Cheapest formation" value={usd(cheapestUsd(country))} sub={`${country.currencyCode} schedule`} />
          <Stat label="Recurring (gov)" value={`${usd(cheapestAnnualUsd(country))}/yr`} sub="registry only" />
          <Stat label="Entities covered" value={`${country.entityTypes.length}`} sub="structures" />
          <Stat label="Last checked" value="Oct 2026" sub="registry pages" />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-emerald-600" /> Structures & declared fees
          </h3>
          <div className="mt-3 space-y-3">
            {country.entityTypes.map((entity) => (
              <div key={entity.id} className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{entity.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{entity.ownership}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-emerald-700">{money(entity.govFee, country.currencyCode)}</p>
                    <p className="text-[10px] font-bold text-slate-400">≈ {usd(toUsd(entity.govFee, country))}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-2 leading-relaxed">{entity.feeNote}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
                  <MiniFact label="Annual" value={`${money(entity.annual, country.currencyCode)} · ${entity.annualNote}`} />
                  <MiniFact label="Timeline" value={entity.timeline} />
                  <MiniFact label="Residency" value={entity.residency} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                  <p className="text-[10px] font-bold text-slate-400">
                    {entity.minCapital && entity.minCapital > 0
                      ? `Capital: ${money(entity.minCapital, country.currencyCode)}`
                      : 'No minimum capital'}
                  </p>
                  <a
                    href={entity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 hover:underline"
                  >
                    Official page <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Non-resident reality check
          </p>
          <p className="text-[11px] text-slate-600 font-medium mt-2 leading-relaxed">{country.nonResidentNote}</p>
          <p className="text-[11px] text-slate-600 font-medium mt-3 leading-relaxed">
            <span className="font-black text-slate-800">Tax: </span>{country.taxNote}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sources</p>
          {country.sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-full px-2.5 py-1"
            >
              {s.label} <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ))}
          <a
            href={country.registryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 hover:underline"
          >
            Registry <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-sm font-black text-slate-900 mt-1 leading-tight">{value}</p>
      <p className="text-[9px] font-bold text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}

function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-[10px] font-semibold text-slate-600 mt-0.5 leading-snug">{value}</p>
    </div>
  );
}

/** Convert a USD figure back into the country's currency for display. */
function toLocal(usdAmount: number, country: Country): number {
  return country.usdPerUnit === 0 ? usdAmount : usdAmount / country.usdPerUnit;
}
