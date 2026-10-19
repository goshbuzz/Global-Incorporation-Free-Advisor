import { useState, useMemo } from 'react';
import {
  UK_ENTITY_TYPES,
  UK_JURISDICTIONS,
  UK_OFFICIAL_FEES,
  UK_DEADLINES,
  UK_CT_RATES,
  UK_VAT,
  UK_LATE_FILING_PENALTIES,
  UK_OFFICIAL_LINKS,
  UK_COMPANIES_HOUSE_CONTACT,
  DATA_VERIFICATION,
  UKEntityType
} from '../data/ukLtdData';
import {
  Search,
  Landmark,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Calculator,
  HelpCircle,
  Shield,
  Download,
  Info,
  SlidersHorizontal,
  Scale,
  Award,
  BookOpen,
  Home,
  MapPin,
  Building2,
  Fingerprint,
  Percent,
  CalendarClock
} from 'lucide-react';
import AdBanner, { LeaderboardAd, VerticalAd } from './ads/AdBanner';
import SponsoredOffer from './ads/SponsoredOffer';

export interface AdvisorViewProps {
  onBack: () => void;
  onSwitch: (target: 'llc' | 'ltd') => void;
}

export default function LTDApp({ onBack, onSwitch }: AdvisorViewProps) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'structures' | 'blueprint' | 'calculator' | 'compliance'>('structures');

  // Search & Filter State (Entities)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuitability, setSelectedSuitability] = useState<string>('All');
  const [selectedAnnualMax, setSelectedAnnualMax] = useState<number>(110);
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('LTD');

  // Budget Calculator State
  const [formationRoute, setFormationRoute] = useState<'digital' | 'paper' | 'sameday'>('digital');
  const [officeTier, setOfficeTier] = useState<number>(29); // annual cost of a registered office service
  const [acspVerification, setAcspVerification] = useState<boolean>(false); // use an ACSP instead of free One Login
  const [filingRoute, setFilingRoute] = useState<'self' | 'accountant'>('self');
  const [accountantTier, setAccountantTier] = useState<number>(290); // typical market year-end package

  // Blueprint State
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Entity list filtering
  const filteredEntities = useMemo(() => {
    return UK_ENTITY_TYPES.filter((entity) => {
      const matchesSearch =
        entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSuitability = selectedSuitability === 'All' || entity.suitability === selectedSuitability;
      const matchesAnnual = entity.annualFee <= selectedAnnualMax;
      const matchesPopular = !showPopularOnly || entity.isPopular;
      return matchesSearch && matchesSuitability && matchesAnnual && matchesPopular;
    });
  }, [searchTerm, selectedSuitability, selectedAnnualMax, showPopularOnly]);

  const currentlySelectedEntity: UKEntityType = useMemo(() => {
    return UK_ENTITY_TYPES.find((e) => e.id === selectedEntityId) || UK_ENTITY_TYPES[0];
  }, [selectedEntityId]);

  // ===== Budget calculator maths (all £ GBP) =====
  const formationFee = formationRoute === 'digital' ? 100 : formationRoute === 'paper' ? 124 : 156;
  const verificationCost = acspVerification ? 40 : 0; // ACSP typical market fee; GOV.UK One Login DIY is free
  const filingSoftwareCost = filingRoute === 'self' ? 25 : 0; // typical low-end CT600 software licence / yr
  const accountantCost = filingRoute === 'accountant' ? accountantTier : 0;

  const totalUpfrontCost = formationFee + verificationCost + officeTier;
  const totalRecurringAnnual = 50 + officeTier + filingSoftwareCost + accountantCost;

  const toggleCheckpoint = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((item) => item !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  const getSuitabilityColor = (status: string) => {
    switch (status) {
      case 'Ideal for Non-Residents':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Possible with Conditions':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Specialist Route':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Visual Top Highlight Ribbon */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🚀 Fully Updated for the 2026/27 UK Filing Season • Companies House digital fees apply from 1 Feb 2026 • Identity verification mandatory since 18 Nov 2025
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <button
                id="back-to-home"
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Back to advisor home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Advisor Home</span>
              </button>
              <button
                id="switch-to-llc"
                onClick={() => onSwitch('llc')}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Switch to US LLC Advisor"
              >
                🇺🇸 Switch to US LLC
              </button>
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-100">
                <Landmark className="h-6 w-6" id="header-logo-icon" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  UK LTD <span className="text-blue-600">Tax & Fee Advisor</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">Self-Filing System • Companies House & HMRC Guidelines</p>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                id="tab-structures"
                onClick={() => setActiveTab('structures')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'structures' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 Structures & Fees
              </button>
              <button
                id="tab-blueprint"
                onClick={() => setActiveTab('blueprint')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'blueprint' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🪪 Incorporation Blueprint
              </button>
              <button
                id="tab-calculator"
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'calculator' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧮 Budget Estimator
              </button>
              <button
                id="tab-compliance"
                onClick={() => setActiveTab('compliance')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'compliance' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📑 CS01 / CT600 Filing
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Pane */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Announcement Cards */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-start gap-4">
            <div className="bg-slate-50 text-blue-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cheapest Full-Remote Setup</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">Digital LTD: £100</p>
              <p className="text-xs text-slate-500 mt-2">
                Incorporate online in ~24 hours. <strong>£50/year</strong> confirmation statement — the only mandatory registry upkeep.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-start gap-4">
            <div className="bg-slate-50 text-emerald-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Small Profits Rate</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">19% Corporation Tax</p>
              <p className="text-xs text-slate-500 mt-2">
                Profits up to <strong>£50,000</strong> stay at <strong>19%</strong>; the 25% main rate starts above £250,000 with marginal relief in between.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-start gap-4">
            <div className="bg-slate-50 text-amber-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Compliance Caution</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">£1,500 + Strike Off</p>
              <p className="text-xs text-rose-600 mt-2 font-medium">
                Late accounts trigger automatic £150–£1,500 penalties (doubled if repeated). Missing your CS01 is a criminal offence for directors.
              </p>
            </div>
          </div>
        </section>

        {/* Advertisement — responsive leaderboard, persistent across tabs */}
        <div className="mb-8 -mx-4 sm:mx-0">
          <LeaderboardAd slotId="ltd-top" />
        </div>

        {/* TAB 1: UK STRUCTURE & FEE DATABASE */}
        {activeTab === 'structures' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">UK Company Structures & Companies House Fee Database</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select a structure to inspect formation fees, annual upkeep, and exact non-resident suitability — every figure sourced from GOV.UK.
                  </p>
                </div>

                {/* Quick filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSuitability('All');
                      setSelectedAnnualMax(110);
                      setShowPopularOnly(false);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => {
                      setSearchTerm('Ltd');
                      setSelectedEntityId('LTD');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    🏢 LTD Profile
                  </button>
                  <button
                    onClick={() => {
                      setSearchTerm('Liability');
                      setSelectedEntityId('LLP');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 transition"
                  >
                    🤝 LLP Profile
                  </button>
                  <button
                    onClick={() => {
                      setSearchTerm('CIC');
                      setSelectedEntityId('CIC');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 border border-violet-200 text-violet-800 hover:bg-violet-100 transition"
                  >
                    ❤️ CIC Profile
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Search Structure or Code</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Limited by Shares..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Suitability Filter */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Non-Resident Suitability</label>
                  <select
                    value={selectedSuitability}
                    onChange={(e) => setSelectedSuitability(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Suitability Classes</option>
                    <option value="Ideal for Non-Residents">Ideal for Non-Residents</option>
                    <option value="Possible with Conditions">Possible with Conditions</option>
                    <option value="Specialist Route">Specialist Route (Niche)</option>
                  </select>
                </div>

                {/* Annual Cost Ceiling */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Max Annual Registry Fee: <span className="text-blue-700 font-extrabold">£{selectedAnnualMax}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="110"
                    step="10"
                    value={selectedAnnualMax}
                    onChange={(e) => setSelectedAnnualMax(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>£0</span>
                    <span>£110</span>
                  </div>
                </div>

                {/* Popular Toggle */}
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="popular-only-checkbox"
                    checked={showPopularOnly}
                    onChange={(e) => setShowPopularOnly(e.target.checked)}
                    className="h-4 w-4 rounded-sm text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="popular-only-checkbox" className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
                    Show founder-favourite structures
                  </label>
                </div>
              </div>

              {/* Status explanation legends */}
              <div className="mt-4 flex flex-wrap gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Classification Guide:</span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Ideal (no residency / citizenship barriers)
                </span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span> Possible (works but watch the conditions)
                </span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500"></span> Specialist (niche legal purpose only)
                </span>
              </div>
            </div>

            {/* Jurisdictions strip — verified Companies House offices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UK_JURISDICTIONS.map((j) => (
                <div key={j.id} className={`bg-white rounded-2xl border p-5 shadow-xs ${j.isPopular ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">{j.name} Registrar</span>
                    {j.isPopular && (
                      <span className="bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">★ Most Common</span>
                    )}
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 mt-2 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-blue-600" /> {j.registrarOffice}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{j.officeAddress}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] font-semibold">
                    <p className="text-slate-600">Company № format: <span className="text-blue-700 font-mono">{j.companyNumberFormat}</span></p>
                    <p className="text-slate-500 leading-relaxed">{j.officeRequirement}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-2">
              ⚠️ Companies House offices are <strong>not open to the public</strong>. Contact: {UK_COMPANIES_HOUSE_CONTACT.email} · {UK_COMPANIES_HOUSE_CONTACT.phone} · {UK_COMPANIES_HOUSE_CONTACT.hours}.{' '}
              <a href={UK_OFFICIAL_LINKS.officeAccess} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                Official access &amp; opening page <ExternalLink className="inline h-3 w-3" />
              </a>
            </p>

            {/* Main entity grid + details pane splitting */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left list (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Structures ({filteredEntities.length})</span>
                    <span className="text-xs font-semibold text-slate-500">Click a structure to view custom non-resident instructions</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {filteredEntities.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <SlidersHorizontal className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-bold">No Structures Match Your Criteria</p>
                        <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or fee constraints.</p>
                      </div>
                    ) : (
                      filteredEntities.map((entity) => (
                        <div
                          key={entity.id}
                          onClick={() => setSelectedEntityId(entity.id)}
                          className={`p-4 flex items-center justify-between text-left transition-all cursor-pointer ${
                            selectedEntityId === entity.id ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 text-slate-700 font-bold w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 shadow-2xs shrink-0 text-xs">
                              {entity.id}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm ml-0.5 text-slate-900">{entity.name}</span>
                                {entity.isPopular && (
                                  <span className="bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">★ TOP VALUE</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSuitabilityColor(entity.suitability)}`}>
                                  {entity.suitability}
                                </span>
                                <span className="text-[11px] text-slate-500 font-medium">🕒 {entity.processingTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-semibold text-slate-500">
                              Digital: <strong className="text-slate-800">£{entity.formationFeeDigital}</strong>
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium font-mono mt-0.5">Annual: £{entity.annualFee}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Official fee schedule */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Companies House Fee Schedule (from 1 Feb 2026)</span>
                    <a
                      href={UK_OFFICIAL_LINKS.allFees}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      Verify on GOV.UK <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    <table className="w-full text-xs">
                      <tbody className="divide-y divide-slate-100">
                        {UK_OFFICIAL_FEES.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-2.5 font-semibold text-slate-700">{row.transaction}</td>
                            <td className="px-4 py-2.5 text-slate-400 font-medium">{row.channel}</td>
                            <td className="px-4 py-2.5 text-right font-extrabold text-slate-900">{row.fee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Side - Selected Entity Details Pane (5 cols) */}
              <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
                {currentlySelectedEntity ? (
                  <div className="bg-white rounded-2xl border-2 border-blue-600/70 shadow-lg overflow-hidden">
                    <div className="p-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative">
                      <div className="absolute right-4 top-4 bg-white/10 text-white font-black text-lg h-11 w-11 rounded-lg flex items-center justify-center backdrop-blur-xs">
                        {currentlySelectedEntity.id}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Detailed Profile</p>
                      <h3 className="text-2xl font-black mt-1 pr-12 leading-tight">{currentlySelectedEntity.name}</h3>
                      <p className="text-xs text-blue-200 mt-1">
                        Classification: <strong>{currentlySelectedEntity.suitability}</strong>
                      </p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Fees Grid */}
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-150">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Incorporation Fee</p>
                          <p className="text-2xl font-extrabold text-slate-950">£{currentlySelectedEntity.formationFeeDigital}</p>
                          <span className="text-[10px] font-bold text-slate-400 block truncate" title={currentlySelectedEntity.formationFeeLabel}>
                            {currentlySelectedEntity.formationFeeLabel}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ongoing Annual Upkeep</p>
                          <p className="text-2xl font-extrabold text-slate-950">£{currentlySelectedEntity.annualFee}</p>
                          <span className="text-[10px] text-blue-700 font-bold block truncate" title={currentlySelectedEntity.annualLabel}>
                            {currentlySelectedEntity.annualLabel}
                          </span>
                        </div>
                      </div>

                      {/* Suitability Block */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-emerald-600" /> Non-Resident Suitability Assessment
                        </h4>
                        <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md mb-2 border ${getSuitabilityColor(currentlySelectedEntity.suitability)}`}>
                            {currentlySelectedEntity.suitability}
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">{currentlySelectedEntity.suitabilityDescription}</p>
                        </div>
                      </div>

                      {/* Speed */}
                      <div className="flex justify-between items-center text-xs p-3.5 bg-blue-50/40 rounded-xl">
                        <span className="font-bold text-blue-950">🕒 Formation Window:</span>
                        <span className="font-extrabold text-blue-700">{currentlySelectedEntity.processingTime}</span>
                      </div>

                      {/* Extra notes */}
                      {currentlySelectedEntity.additionalNotes && (
                        <div className="p-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-150 text-xs leading-relaxed font-medium">
                          <strong>Filing Alert:</strong> {currentlySelectedEntity.additionalNotes}
                        </div>
                      )}

                      {/* Official link */}
                      <a
                        href={currentlySelectedEntity.officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                      >
                        Open Official GOV.UK Guide <ExternalLink className="h-4 w-4" />
                      </a>

                      <p className="text-[10px] text-center text-slate-400 font-medium">
                        Incorporating directly at Companies House bypasses £100–£300 formation-agent markups on the same £100 government fee.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-100 rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                    <Info className="h-10 w-10 mx-auto text-slate-400 mb-2" />
                    <strong>No Structure Selected</strong>
                    <p className="text-xs mt-1">Select any structure from the list on the left to review custom instructions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NON-RESIDENT INCORPORATION BLUEPRINT */}
        {activeTab === 'blueprint' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Award className="text-blue-600 h-6 w-6" /> Complete Blueprint: Forming a UK LTD as a Non-Resident, Online, Without an Agent
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                UK law places no UK-residency or nationality condition on company directors or shareholders. The whole set-up — name search,
                identity verification, incorporation and tax registration — can be finished from abroad in about 1–3 days. Follow the verified master plan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Wizard Steps list */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentStep === 1 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentStep(1)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">01</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Choose a Compliant Company Name & SIC Code</h4>
                          <p className="text-xs text-slate-500">Name must end in "Limited"/"Ltd" and be unique on the register</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">FREE NAME CHECK</span>
                    </div>
                    {currentStep === 1 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Search availability free on the{' '}
                            <a href={UK_OFFICIAL_LINKS.findAndUpdate} target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline">
                              Find and update company information <ExternalLink className="inline h-3 w-3" />
                            </a>{' '}
                            register — names that are the "same as" or "too like" an existing company are rejected.
                          </li>
                          <li>
                            Names suggesting government links, or containing restricted / sensitive words (e.g. "Bank", "Royal", "Institute"),
                            need extra approval — non-residents should avoid them.
                          </li>
                          <li>
                            Pick your <strong>SIC code</strong> (Standard Industrial Classification) identifying the company's activity — e.g. 62020
                            (IT consultancy), 47910 (internet retail), 70229 (management consultancy). You confirm it on your confirmation statement.
                          </li>
                          <li>You also declare a <strong>lawful purpose</strong> at incorporation — a rule in force since 4 March 2024 (ECCTA 2023).</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Step 2 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentStep === 2 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentStep(2)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">02</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Secure a UK Registered Office Address</h4>
                          <p className="text-xs text-slate-500">Must be an "appropriate address" in your chosen jurisdiction</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">FROM ~£25/YR MARKET</span>
                    </div>
                    {currentStep === 2 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
                        <p>
                          Every UK company needs a <strong>registered office address</strong> — the public address where official post (HMRC, Companies House, courts) is delivered:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Since <strong>4 March 2024</strong> it must be an <strong>"appropriate address"</strong>: a real place where documents would reach the
                            company and be recorded. A PO Box <em>alone</em> is not allowed.
                          </li>
                          <li>
                            The address must sit in the <strong>same jurisdiction</strong> as incorporation: England &amp; Wales (Cardiff), Scotland (Edinburgh) or
                            Northern Ireland (Belfast).
                          </li>
                          <li>
                            As a non-resident you'll usually rent one from a <strong>registered-office service</strong> (typical market: £25–£150/yr with scan-to-email),
                            or use a UK-based friend's address <em>with consent</em>. Never invent one — Companies House can now query and change suspicious addresses.
                          </li>
                          <li>
                            Your company must also supply a <strong>registered email address</strong> (kept private, never published). Read every email sent to it.
                          </li>
                          <li>
                            Directors give a public <strong>service address</strong> (use the registered office) plus a confidential home address kept off the public record.
                          </li>
                        </ul>
                        <a
                          href={UK_OFFICIAL_LINKS.limitedCompanyFormation}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-700 font-bold underline"
                        >
                          GOV.UK registered office & email rules <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Step 3 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentStep === 3 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentStep(3)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">03</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Verify Your Identity → Companies House Personal Code</h4>
                          <p className="text-xs text-slate-500">Legally mandatory for directors &amp; PSCs since 18 November 2025</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">FREE VIA ONE LOGIN</span>
                    </div>
                    {currentStep === 3 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
                        <p>
                          Since <strong>18 November 2025</strong> every new director and PSC must verify identity <em>before</em> a company can even be registered.
                          A biometric passport from any country works.
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 font-semibold">
                          <li>
                            Create a free{' '}
                            <a href={UK_OFFICIAL_LINKS.oneLogin} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                              GOV.UK One Login <ExternalLink className="inline h-3 w-3" />
                            </a>{' '}
                            account with your email.
                          </li>
                          <li>
                            Open the{' '}
                            <a href={UK_OFFICIAL_LINKS.verifyIdentity} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                              "Verify your identity for Companies House" service <ExternalLink className="inline h-3 w-3" />
                            </a>{' '}
                            and follow the app-based passport scan, security questions or (in the UK) the Post Office route.
                          </li>
                          <li>
                            Receive your <strong>11-character personal code</strong> instantly. It is yours for life — store it safely.
                          </li>
                          <li>
                            Provide the code inside the incorporation form (and later in each confirmation statement; PSCs have their own 14-day windows via the{' '}
                            <a href={UK_OFFICIAL_LINKS.providePscCode} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                              PSC verification service <ExternalLink className="inline h-3 w-3" />
                            </a>
                            ).
                          </li>
                        </ol>
                        <div className="p-3 bg-blue-50 border border-blue-150 rounded-lg text-blue-950 font-medium">
                          💡 <strong>Pro Tip:</strong> DIY verification through One Login is <strong>completely free</strong>. Only pay an{' '}
                          <a href={UK_OFFICIAL_LINKS.acspList} target="_blank" rel="noreferrer" className="underline">
                            Authorised Corporate Service Provider (ACSP)
                          </a>{' '}
                          if you genuinely cannot use the app — agents typically charge ~£25–£100.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 4 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentStep === 4 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentStep(4)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">04</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Incorporate Online — Interactive Form Preview (IN01)</h4>
                          <p className="text-xs text-slate-500">£100 digital fee · usually registered within 24 hours</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">£100 OFFICIAL FEE</span>
                    </div>
                    {currentStep === 4 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          File on the official{' '}
                          <a href={UK_OFFICIAL_LINKS.incorporate} target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline">
                            Companies House Web Incorporation service <ExternalLink className="inline h-3 w-3" />
                          </a>
                          . Paper form IN01 costs £124 and takes ~10 days; the £156 same-day route is reserved for software filing (agents).
                        </p>

                        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800 shadow-inner">
                          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span className="text-emerald-400 font-bold text-[10px] uppercase">IN01 / Web Incorporation Field Mockup</span>
                            <span className="text-[10px] text-slate-500">Model articles auto-attached</span>
                          </div>

                          <div className="space-y-1">
                            <div><strong className="text-slate-400">Company name:</strong></div>
                            <div className="text-white">MERIDIAN TRADING LTD</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Registered office (England &amp; Wales):</strong></div>
                            <div className="text-white">20 Example Street, Suite 5, London, EC1A 1AA (appropriate address)</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Registered email (private):</strong></div>
                            <div className="text-white">founder@yourdomain.com</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Director 1 (also sole shareholder):</strong></div>
                            <div className="text-white">Ayesha Khan — nationality: Pakistani — DOB: (private on register)</div>
                            <div className="text-emerald-400">Personal code: XXXX-XXXX-XXX ✔ verified via GOV.UK One Login</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Person with Significant Control (PSC):</strong></div>
                            <div className="text-white">Ayesha Khan — owns 75%+ of shares and voting rights</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Share capital:</strong></div>
                            <div className="text-yellow-400">1 × Ordinary £1.00 share (fully issued, fully paid)</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">SIC codes:</strong></div>
                            <div className="text-white">62020 — Information technology consultancy activities</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Declarations:</strong></div>
                            <div className="text-emerald-400">[X] Company is being formed for a lawful purpose</div>
                            <div className="text-emerald-400">[X] Subscribers wish to form a company (memorandum)</div>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-150 rounded-lg text-xs leading-relaxed text-blue-950 font-medium">
                          💡 <strong>Pro Tip:</strong> On success you instantly get a digital <strong>Certificate of Incorporation</strong> (with your company number)
                          and incorporation date. A printed certificate costs £22 post / £65 same-day from Companies House — you rarely need one; banks accept the
                          public register entry.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 5 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentStep === 5 ? 'ring-2 ring-blue-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentStep(5)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">05</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">HMRC Onboarding: UTR, Corporation Tax &amp; Banking</h4>
                          <p className="text-xs text-slate-500">UTR is posted to the registered office within ~14 days</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">FREE · 3-MONTH WINDOW</span>
                    </div>
                    {currentStep === 5 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
                        <ol className="list-decimal pl-5 space-y-2 font-semibold">
                          <li>
                            HMRC automatically posts your company's 10-digit <strong>Unique Taxpayer Reference (UTR)</strong> to your registered office around
                            <strong> 10–14 days</strong> after incorporation (overseas post can take longer — use an address service that scans instantly).
                          </li>
                          <li>
                            Create a <strong>Government Gateway / HMRC business tax account</strong> and register for Corporation Tax —
                            legally required <strong>within 3 months of starting to do business</strong> (trading, invoicing, advertising, employing).
                          </li>
                          <li>Dormant? Tell HMRC the company is dormant for Corporation Tax to stop CT600 notices until you trade.</li>
                          <li>
                            Open a business account: UK high-street banks usually want a UK-resident director for in-branch KYC, so non-residents commonly onboard
                            with UK-regulated e-money/fintech providers using the certificate, UTR letter and PSC page as evidence (typical onboarding 1–10 days).
                          </li>
                          <li>From 1 April 2026 the old joint HMRC/Companies House free filing portal is closed — plan on commercial software (or an accountant) for your first CT600.</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Checklist - Readiness Pre-flight List */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-lg">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-400" /> Incorporation Readiness Preflight
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Preflight Checklist</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Check off your progress to measure submission confidence.</p>

                  <div className="mt-5 space-y-4">
                    {[
                      { id: 1, label: 'Company name checked free on the Find-and-Update register (unique, legal)' },
                      { id: 2, label: 'SIC code(s) selected for your trading activity' },
                      { id: 3, label: 'UK "appropriate address" registered office secured (jurisdiction-matching)' },
                      { id: 4, label: 'Identity verified via GOV.UK One Login — 11-character personal code saved' },
                      { id: 5, label: 'Share structure decided (e.g. 1 × £1 ordinary share) & article choice (model)' },
                      { id: 6, label: '£100 paid on Companies House Web Incorporation; confirmation email saved' },
                      { id: 7, label: 'Certificate of Incorporation + company memorandum downloaded' },
                      { id: 8, label: 'HMRC UTR received; Corporation Tax registration completed within 3 months' }
                    ].map((step) => (
                      <div
                        key={step.id}
                        onClick={() => toggleCheckpoint(step.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition select-none ${
                          completedSteps.includes(step.id) ? 'bg-slate-800/80 text-emerald-300' : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <input type="checkbox" checked={completedSteps.includes(step.id)} readOnly className="mt-0.5 rounded-sm outline-hidden accent-emerald-500" />
                        <span className="text-xs tracking-wide font-medium leading-tight">{step.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Readiness Rate */}
                  <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Your Submission Readiness Rate</span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">{Math.round((completedSteps.length / 8) * 100)}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${(completedSteps.length / 8) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4.5 w-4.5 text-blue-600" /> Official Government Reference Links
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-600 font-medium">
                    <li>
                      <a href={UK_OFFICIAL_LINKS.incorporate} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 font-semibold underline">
                        🏢 Register your company (Web Incorporations) <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href={UK_OFFICIAL_LINKS.verifyIdentity} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 font-semibold underline">
                        🪪 Verify identity (GOV.UK One Login) <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href={UK_OFFICIAL_LINKS.findAndUpdate} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 font-semibold underline">
                        🔍 Search the public company register <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href={UK_OFFICIAL_LINKS.acspList} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 font-semibold underline">
                        🤝 List of authorised agents (ACSPs) <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href={UK_OFFICIAL_LINKS.allFees} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-700 font-semibold underline">
                        💷 Full Companies House fee schedule <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                  </ul>
                </div>

                <VerticalAd slotId="ltd-blueprint-rail" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUDGET ESTIMATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Calculator className="text-blue-600 h-6 w-6" /> Self-Filing UK LTD Budget Estimator & Cost Simulator
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Government figures are the verified Companies House/HMRC prices. Address / agent / accountant options show <em>typical market ranges</em> —
                always quoted, never hidden inside government fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Calculator Settings Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Customize Setup Scope</h3>

                {/* Formation route */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">1. Choose Incorporation Channel (official fee)</label>
                  <span className="text-[11px] text-slate-400 block mb-3">Fees verified from the gov.uk Companies House fee schedule, effective 1 Feb 2026.</span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => setFormationRoute('digital')}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${formationRoute === 'digital' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Digital (Web Incorporations)</span>
                      <span className="text-xl font-bold block text-blue-700 mt-1">£100</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Registered usually within 24 hours</span>
                    </div>

                    <div
                      onClick={() => setFormationRoute('paper')}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${formationRoute === 'paper' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Paper Form IN01</span>
                      <span className="text-xl font-bold block text-blue-700 mt-1">£124</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">~10 days by post to Cardiff</span>
                    </div>

                    <div
                      onClick={() => setFormationRoute('sameday')}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${formationRoute === 'sameday' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Same-Day (software only)</span>
                      <span className="text-xl font-bold block text-blue-700 mt-1">£156</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Via software/agents; company formed same day</span>
                    </div>
                  </div>
                </div>

                {/* Registered office */}
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <label className="block text-xs font-bold text-slate-600 uppercase">2. UK Registered Office Service</label>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">MANDATORY ADDRESS</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-3">
                    Must be an "appropriate address" in England &amp; Wales, Scotland or Northern Ireland. Market prices — official fee is £0.
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[
                      { price: 0, label: 'Friendly Address', desc: 'Consenting UK contact (free, keep records private)' },
                      { price: 29, label: 'Budget Scan Service', desc: 'Address + mail scan-to-email (typical market)' },
                      { price: 79, label: 'Standard Suite', desc: "Address + director's service address cover (typical market)" },
                      { price: 149, label: 'Premium City Address', desc: 'Central London address + forwarding (typical market)' }
                    ].map((tier) => (
                      <div
                        key={tier.price}
                        onClick={() => setOfficeTier(tier.price)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${officeTier === tier.price ? 'border-blue-600 bg-blue-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                      >
                        <span className="font-extrabold block text-xs text-slate-900">{tier.label}</span>
                        <span className="text-xl font-bold block text-blue-700 mt-1">
                          {tier.price === 0 ? '£0' : `£${tier.price}`}
                          <span className="text-xs text-slate-400">{tier.price === 0 ? '' : '/yr'}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{tier.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ID verification */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-2">3. Identity Verification Route (legal requirement)</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setAcspVerification(false)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition select-none ${!acspVerification ? 'border-blue-600 bg-blue-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold block text-sm text-slate-900">DIY — GOV.UK One Login</span>
                        <span className="text-base font-extrabold text-emerald-600">£0</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-1">Free official route with a biometric passport; personal code issued instantly.</span>
                    </div>

                    <div
                      onClick={() => setAcspVerification(true)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition select-none ${acspVerification ? 'border-blue-600 bg-blue-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold block text-sm text-slate-900">Via an ACSP agent</span>
                        <span className="text-base font-extrabold text-blue-700">~£40</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-1">Typical market charge from an authorised agent if you cannot use the app.</span>
                    </div>
                  </div>
                </div>

                {/* Accounts & CT filing */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">4. Annual Accounts + CT600 Filing Route</label>
                  <span className="text-[11px] text-slate-400 block mb-3">
                    HMRC's joint filing portal closed 31 March 2026 — CT600s must now go through commercial software or an accountant.
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setFilingRoute('self')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition select-none ${filingRoute === 'self' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold block text-sm text-slate-900">Self-file with CT software</span>
                        <span className="text-base font-extrabold text-blue-700">~£25/yr</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-1">Low-cost CT600 software licences start around ~£10–£40; micro-entity accounts are free on Companies House web services.</span>
                    </div>

                    <div
                      onClick={() => setFilingRoute('accountant')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition select-none ${filingRoute === 'accountant' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold block text-sm text-slate-900">Hire an accountant</span>
                        <span className="text-base font-extrabold text-blue-700">£{accountantTier}/yr</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-1">Pick typical market tier below for year-end-only or monthly packages.</span>

                      {filingRoute === 'accountant' && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {[
                            { price: 290, label: 'Year-end only' },
                            { price: 588, label: 'Monthly essentials (~£49/mo)' }
                          ].map((t) => (
                            <button
                              key={t.price}
                              onClick={(e) => {
                                e.stopPropagation();
                                setAccountantTier(t.price);
                              }}
                              className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border transition ${
                                accountantTier === t.price ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Dynamic Bill Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Visual Receipt */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-black text-[9px] uppercase px-2.5 py-1 rounded">
                    ESTIMATED COST SLATE
                  </span>
                  <h4 className="text-lg font-black text-white mt-1.5">Setup Breakdown — UK LTD</h4>
                  <p className="text-xs text-slate-400 mt-1">Estimations modeled on verified 2026 government fees + market add-ons.</p>

                  <div className="mt-6 space-y-4 border-t border-slate-800 pt-5">
                    {/* Upfront Section */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">UPFRONT FORMATION (Year 1)</span>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">
                            Companies House incorporation ({formationRoute === 'digital' ? 'digital' : formationRoute === 'paper' ? 'paper IN01' : 'same-day software'})
                          </span>
                          <span className="font-extrabold text-white">£{formationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Identity verification ({acspVerification ? 'ACSP ~market' : 'One Login — free'})</span>
                          <span className="font-extrabold text-white">£{verificationCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Registered office (Yr 1, market tier)</span>
                          <span className="font-extrabold text-white">£{officeTier}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800/80 pt-2 text-sm">
                          <span>Total Upfront Setup Costs</span>
                          <span>£{totalUpfrontCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ongoing Section */}
                    <div className="border-t border-slate-800 pt-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">RECURRING ANNUAL UPKEEP (Year 2+)</span>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Confirmation statement CS01 (digital, official)</span>
                          <span className="font-extrabold text-white">£50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Registered office renewal (market tier)</span>
                          <span className="font-extrabold text-white">£{officeTier}</span>
                        </div>
                        {filingRoute === 'self' ? (
                          <div className="flex justify-between">
                            <span className="text-slate-300">CT600 filing software (typical)</span>
                            <span className="font-extrabold text-white">£{filingSoftwareCost}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="text-slate-300">Accountant package (market)</span>
                            <span className="font-extrabold text-white">£{accountantCost}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-blue-400 font-bold border-t border-slate-800/80 pt-2 text-sm">
                          <span>Total Recurring Annual Upkeep</span>
                          <span>£{totalRecurringAnnual}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-830 rounded-xl p-3.5 border border-slate-800 text-[11px] leading-relaxed text-slate-400 mt-6">
                    🚨 <strong>Note:</strong> HMRC charges <strong>£0</strong> for the UTR, Corporation Tax registration, and VAT registration. Identity verification via GOV.UK One
                    Login is also <strong>free</strong>. Corporation Tax itself is on profits only (<strong>19%–25%</strong>) — not a flat fee.
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">How to form it for this exact price?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    1. Verify identity free on GOV.UK One Login and keep your 11-character personal code ready.<br />
                    2. Buy a registered-office service tier above (scan-to-email) — keep the certificate it issues.<br />
                    3. File on Companies House Web Incorporations, pay the £100 digital fee; company live in ~24 hours.<br />
                    4. Register for Corporation Tax within 3 months of trading using the UTR letter HMRC posts you for free.
                  </p>
                </div>

                <VerticalAd slotId="ltd-calculator-rail" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE HUB */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Shield className="text-blue-600 h-6 w-6" /> UK Non-Resident Compliance Ledger (CS01, Accounts, CT600, VAT)
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                A UK LTD is cheap to form but strictly enforced thereafter. Two registries matter — <strong>Companies House</strong> (public filings) and
                <strong> HMRC</strong> (tax) — and both penalise lateness automatically, even for dormant companies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Core Filings Deep Dive (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                {/* CS01 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3.5 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-100 text-rose-800 font-black text-xs px-2.5 py-1 rounded">CRITICAL</span>
                      <h3 className="font-extrabold text-lg text-slate-900">Confirmation Statement (Form CS01)</h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold font-mono">£50/yr digital</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    File at least once every 12 months (<strong>within 14 days</strong> of each review period ending). It confirms the public register —
                    directors, PSCs, SIC code, share capital, registered office, registered email — is accurate, and declares the company's intended future
                    activities are lawful.
                  </p>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-2 text-xs leading-relaxed text-rose-950 font-medium my-2">
                    <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Rejection Rule (2025 Act Changes):</strong> since 18 November 2025 the statement must include every director's Companies House
                      personal code — Companies House will <strong>not accept</strong> your CS01 until all directors are verified. Failing to file is a
                      <strong> criminal offence</strong>; the registrar can financially penalise and strike off your company.
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex gap-2">
                    <a
                      href={UK_OFFICIAL_LINKS.confirmationStatement}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug"
                    >
                      <FileText className="h-4 w-4" /> CS01 Filing Guidance
                    </a>
                    <a
                      href={UK_OFFICIAL_LINKS.webFiling}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug"
                    >
                      <ExternalLink className="h-4 w-4" /> Companies House WebFiling
                    </a>
                  </div>
                </div>

                {/* Accounts */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 font-black text-xs px-2.5 py-1 rounded">ANNUAL</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Annual Accounts & Late Filing Penalties</h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Private companies file statutory accounts with Companies House <strong>9 months</strong> after the financial year end (first accounts: 21
                    months from incorporation). Small owner-run LTDs usually file <strong>micro-entity accounts</strong> — a short balance sheet, no P&amp;L
                    on the public register.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="font-extrabold block text-xs text-slate-900 mb-2">Private company / LLP penalties</span>
                      <div className="space-y-1.5">
                        {UK_LATE_FILING_PENALTIES.privateCompany.map((row, i) => (
                          <div key={i} className="flex justify-between text-[11px] font-semibold text-slate-600">
                            <span>{row.lateness}</span>
                            <span className="font-extrabold text-rose-600">£{row.penalty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="font-extrabold block text-xs text-slate-900 mb-2">Public company penalties</span>
                      <div className="space-y-1.5">
                        {UK_LATE_FILING_PENALTIES.publicCompany.map((row, i) => (
                          <div key={i} className="flex justify-between text-[11px] font-semibold text-slate-600">
                            <span>{row.lateness}</span>
                            <span className="font-extrabold text-rose-600">£{row.penalty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold">{UK_LATE_FILING_PENALTIES.note} No warning is given — the penalty is automatic.</p>
                  <a href={UK_OFFICIAL_LINKS.lateFilingPenalties} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 underline">
                    Verify penalties on GOV.UK <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Corporation Tax & CT600 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-2.5 py-1 rounded">TAX</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Corporation Tax & Company Tax Return (CT600)</h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">{UK_CT_RATES.financialYearLabel}:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-emerald-50 border border-emerald-150 rounded-xl text-center">
                      <span className="text-2xl font-black text-emerald-700">{UK_CT_RATES.smallProfitsRate}%</span>
                      <p className="text-[11px] font-bold text-emerald-900 mt-1">Small profits rate</p>
                      <p className="text-[10px] text-emerald-700">profits ≤ £{UK_CT_RATES.smallProfitsUpperLimit.toLocaleString()}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl text-center">
                      <span className="text-2xl font-black text-slate-700">19–25%</span>
                      <p className="text-[11px] font-bold text-slate-900 mt-1">Marginal Relief band</p>
                      <p className="text-[10px] text-slate-500">£50,000 – £250,000 (fraction {UK_CT_RATES.marginalReliefFraction})</p>
                    </div>
                    <div className="p-3.5 bg-blue-50 border border-blue-150 rounded-xl text-center">
                      <span className="text-2xl font-black text-blue-700">{UK_CT_RATES.mainRate}%</span>
                      <p className="text-[11px] font-bold text-blue-900 mt-1">Main rate</p>
                      <p className="text-[10px] text-blue-700">profits ≥ £{UK_CT_RATES.mainRateLowerLimit.toLocaleString()}</p>
                    </div>
                  </div>

                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 font-semibold">
                    <li>
                      <strong>Pay Corporation Tax:</strong> 9 months + 1 day after your accounting period ends (earlier payment gets interest from HMRC).
                    </li>
                    <li>
                      <strong>File the CT600 Company Tax Return:</strong> 12 months after the accounting period ends; £100 automatic penalty if a day late
                      (rises to £200, then 10% of unpaid tax, at longer delays).
                    </li>
                    <li>
                      <strong>Register first:</strong> within 3 months of starting to do business; the 10-digit UTR is posted free to the registered office within ~14 days of forming.
                    </li>
                    <li>
                      <strong>New from April 2026:</strong> the old free joint HMRC/Companies House filing portal is closed — CT600s must now be filed through
                      commercial software (or an agent); accounts go via software, WebFiling or paper.
                    </li>
                  </ul>

                  <div className="pt-3.5 border-t border-slate-100 flex gap-2">
                    <a href={UK_OFFICIAL_LINKS.corporationTaxRates} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug">
                      <Download className="h-4 w-4" /> CT Rates (GOV.UK)
                    </a>
                    <a href={UK_OFFICIAL_LINKS.companyTaxReturns} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug">
                      <Download className="h-4 w-4" /> Company Tax Returns Guide
                    </a>
                  </div>
                </div>

                {/* VAT */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3 shadow-xs">
                  <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                    💷 VAT — the £90,000 line
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Register with HMRC when taxable turnover passes <strong>£{UK_VAT.registrationThreshold.toLocaleString()}</strong> in any rolling 12-month window
                    (deregistration below £{UK_VAT.deregistrationThreshold.toLocaleString()}). Standard rate is <strong>{UK_VAT.standardRate}%</strong>. Registration
                    itself is free; most businesses then file quarterly Making Tax Digital returns using software.
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                    <li><strong>Timing:</strong> register within 30 days of crossing the threshold — your effective VAT date is the 1st of the second month after you crossed.</li>
                    <li><strong>Non-resident sellers:</strong> if a business has no UK establishment it may have to register regardless of turnover when it first makes UK supplies.</li>
                    <li><strong>Exports/foreign clients:</strong> many B2B services supplied overseas fall outside the scope of UK VAT — but the rules are technical; confirm with an accountant or HMRC guidance.</li>
                  </ul>
                  <a href={UK_OFFICIAL_LINKS.vatRegistration} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 underline">
                    Register for VAT — official guidance <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* PSC & ID verification duties */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3 shadow-xs">
                  <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                    <Fingerprint className="h-5 w-5 text-blue-600" /> PSC Register & Identity Verification Duties
                  </h3>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 font-semibold leading-relaxed">
                    <li>
                      A <strong>Person with Significant Control</strong> is anyone holding &gt;25% of shares or voting rights (or with other listed control) —
                      almost always you, the founder. PSC details sit on the public register; there are no nominee-style shortcuts.
                    </li>
                    <li>
                      Every PSC must verify identity and give a personal code inside their <strong>14-day window</strong> (non-director PSCs: the first 14 days
                      of their birth month). Acting as a director while unverified can be an offence, and unverified people cannot be appointed.
                    </li>
                    <li>Keep statutory registers (members, directors, PSC) and <strong>accounting records for at least 6 years</strong>; keep minutes of all company decisions.</li>
                    <li>Report changes (address, directors, name, SIC) as they happen — most are free to file online; a company name change costs £20 digital (£85 same-day).</li>
                  </ul>
                </div>

                {/* Master Deadline Tracker */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-blue-400" /> Master Deadline Tracker (Verified)
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{DATA_VERIFICATION.checkedOn}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs min-w-[560px]">
                      <thead>
                        <tr className="bg-slate-50 text-left text-[10px] uppercase tracking-widest text-slate-400">
                          <th className="px-4 py-2.5 font-black">Milestone</th>
                          <th className="px-4 py-2.5 font-black">When It's Due</th>
                          <th className="px-4 py-2.5 font-black">To</th>
                          <th className="px-4 py-2.5 font-black">Cost of Missing It</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {UK_DEADLINES.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-extrabold text-slate-800">{row.milestone}</td>
                            <td className="px-4 py-3 font-semibold text-slate-600">{row.when}</td>
                            <td className="px-4 py-3 font-bold text-blue-700">{row.authority}</td>
                            <td className="px-4 py-3 text-rose-700 font-semibold leading-snug">{row.costOfMissing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Compliance calendar sidebar (4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="h-fit bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 space-y-5">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <CalendarClock className="h-5.5 w-5.5 text-blue-400" /> Annual UK Filing Calendar
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-2 border-emerald-500 pl-3">
                      <span className="text-[10px] text-emerald-400 font-extrabold block uppercase">WITHIN 3 MONTHS OF TRADING</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Register for Corporation Tax</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Using the UTR HMRC posts to your registered office (~14 days after formation).</span>
                    </div>

                    <div className="border-l-2 border-blue-500 pl-3">
                      <span className="text-[10px] text-blue-400 font-extrabold block uppercase">EVERY 12 MONTHS + 14 DAYS</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Confirmation statement CS01 (£50 digital)</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Must include verified personal codes for all directors. Extra CS01s in the same payment year are free.</span>
                    </div>

                    <div className="border-l-2 border-rose-500 pl-3">
                      <span className="text-[10px] text-rose-400 font-extrabold block uppercase">FYE + 9 MONTHS(1 DAY)</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Annual accounts + pay Corporation Tax</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Accounts due at Companies House; CT payment due to HMRC 9 months and 1 day after the period.</span>
                    </div>

                    <div className="border-l-2 border-indigo-400 pl-3">
                      <span className="text-[10px] text-indigo-300 font-extrabold block uppercase">FYE + 12 MONTHS</span>
                      <span className="font-bold text-xs block text-white mt-0.5">CT600 Company Tax Return</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Filed via commercial software (joint free portal closed 31 Mar 2026).</span>
                    </div>

                    <div className="border-l-2 border-amber-500 pl-3">
                      <span className="text-[10px] text-amber-400 font-extrabold block uppercase">ROLLING 12-MONTH VIEW</span>
                      <span className="font-bold text-xs block text-white mt-0.5">VAT registration at £{UK_VAT.registrationThreshold.toLocaleString()}</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Register within 30 days of crossing; deregister below £{UK_VAT.deregistrationThreshold.toLocaleString()}.</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4 text-[11px] leading-relaxed text-slate-400">
                    ⚠️ <strong>Disclaimer:</strong> Educational compliance frameworks only. UK company and tax law — consult an ICAEW/ACCA accountant or tax
                    adviser for your individual filing scenario.
                  </div>
                </div>

                <VerticalAd slotId="ltd-compliance-rail" />
              </div>
            </div>
          </div>
        )}

        {/* Advertisement — end of the active tab */}
        <div className="mt-10 -mx-4 sm:mx-0">
          <AdBanner size="300x250" slotId="ltd-content" />
        </div>

        {/* NON-RESIDENT FAQ HUB */}
        <section className="mt-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-50 text-blue-600 p-2.5 rounded-xl border border-slate-100">
              <HelpCircle className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">UK LTD & Non-Resident Owner FAQ</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Common roadblocks solved for foreign founders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 divide-slate-150">
            {/* Left Col */}
            <div className="space-y-4">
              {[
                {
                  q: 'Do I have to be a UK resident or citizen to form and own a UK LTD?',
                  a: 'No. GOV.UK is explicit: directors do not have to live in the UK, and there is no nationality rule for directors or shareholders (16+ age applies). What the company must always have is a UK registered office that is an "appropriate address" in the jurisdiction of incorporation — which you rent as a service from abroad.'
                },
                {
                  q: 'Do I ever need to travel to the UK or visit an office?',
                  a: 'No. Name search, identity verification (GOV.UK One Login with a biometric passport), the £100 incorporation, Corporation Tax registration and even VAT registration are all online. Companies House offices (Cardiff, Edinburgh, Belfast) are not open to the public anyway.'
                },
                {
                  q: 'How do I actually take money out — salary or dividends?',
                  a: 'Most non-resident owners pay themselves dividends from post-Corporation-Tax profits, declared via a dividend voucher and minute. The UK does not withhold tax on dividends at source — instead you usually declare them where you are tax-resident (many countries have a UK double-tax treaty). UK dividends use a £500 allowance then 8.75%/33.75%/39.35% rates for UK residents (rising to 10.75%/35.75%/39.35% for the 2026/27 tax year) — foreign residents check their own country\'s rules. Director salary drags the company into PAYE payroll; most skip it.'
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-50/55 hover:bg-slate-50 transition border border-slate-100">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-start gap-1.5 leading-snug">
                    <span className="text-blue-600 font-extrabold shrink-0">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5 pl-3 border-l-2 border-blue-150">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Right Col */}
            <div className="space-y-4 pt-4 md:pt-0">
              {[
                {
                  q: 'What exactly is a PSC and must I publish my name?',
                  a: 'A PSC (Person with Significant Control) is anyone with over 25% of the shares or voting rights. Companies House publishes PSC name, month/year of birth, nationality and county of residence on the public register (your day of birth and home address stay private). Since November 2025 each PSC must also verify their identity and supply a personal code inside a fixed 14-day window.'
                },
                {
                  q: 'What happens if my company never trades or goes dormant?',
                  a: 'You still owe annual dormant accounts to Companies House and the £50 confirmation statement — every 12 months, no exceptions. For HMRC, you can claim "dormant for Corporation Tax" until trading starts, which suspends CT600 returns. Planning to dissolve? A voluntary strike-off (form DS01) costs just £13 online (£18 paper).'
                },
                {
                  q: 'Is my home address or identity at risk on the public register?',
                  a: 'Directors file two addresses: a public "service address" (use your registered office) and their confidential residential address. Female and male founders alike should never list a home address publicly. If your home address did leak onto the register, you can apply to have specific details suppressed for £34 per transaction.'
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-blue-50/20 hover:bg-blue-50/35 transition border border-blue-55/65">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-start gap-1.5 leading-snug">
                    <span className="text-blue-600 font-extrabold shrink-0">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5 pl-3 border-l-2 border-blue-150">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SponsoredOffer className="mt-8" />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 shadow-inner mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <Scale className="h-4.5 w-4.5 text-blue-500" /> UK LTD TAX &amp; FEE ADVISOR
            </h4>
            <p className="text-slate-500 font-bold text-[10px] tracking-wider uppercase">Self-Formed Non-Resident Compliance Portal</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-slate-500">
            <span className="text-slate-400">Current Year: 2026/2027</span>
            <span>•</span>
            <a href={UK_OFFICIAL_LINKS.companiesHouse} target="_blank" rel="noreferrer" className="hover:text-white transition">Companies House</a>
            <span>•</span>
            <a href={UK_OFFICIAL_LINKS.hmrc} target="_blank" rel="noreferrer" className="hover:text-white transition">HMRC</a>
            <span>•</span>
            <a href={UK_OFFICIAL_LINKS.findAndUpdate} target="_blank" rel="noreferrer" className="hover:text-white transition">UK Company Register</a>
            <span>•</span>
            <a href={UK_OFFICIAL_LINKS.allFees} target="_blank" rel="noreferrer" className="hover:text-white transition">Official Fee Schedule</a>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} Hand-formed Guidance Repository.</p>
            <p className="text-[10px] text-slate-600 mt-1">{DATA_VERIFICATION.checkedOn} — all government fees verified against GOV.UK publications.</p>
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
