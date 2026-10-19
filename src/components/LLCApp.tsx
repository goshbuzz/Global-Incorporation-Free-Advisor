import { useState, useMemo } from 'react';
import { 
  US_STATES_DATA, 
  USState 
} from '../data/statesData';
import { 
  Search, 
  Filter, 
  DollarSign, 
  Globe, 
  FileText, 
  CheckCircle, 
  Calendar, 
  AlertCircle, 
  ExternalLink, 
  Calculator, 
  HelpCircle, 
  Briefcase, 
  Shield, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Info, 
  SlidersHorizontal,
  Scale,
  Activity,
  Award,
  BookOpen,
  Home
} from 'lucide-react';
import AdBanner, { LeaderboardAd, VerticalAd } from './ads/AdBanner';
import SponsoredOffer from './ads/SponsoredOffer';

export interface AdvisorViewProps {
  onBack: () => void;
  onSwitch: (target: 'llc' | 'ltd') => void;
}

export default function LLCApp({ onBack, onSwitch }: AdvisorViewProps) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'states' | 'itin' | 'calculator' | 'compliance'>('states');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTaxStatus, setSelectedTaxStatus] = useState<string>('All');
  const [selectedAnnualFeeMax, setSelectedAnnualFeeMax] = useState<number>(600);
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false);
  const [selectedStateForDetails, setSelectedStateForDetails] = useState<string | null>('NM');

  // Budget Calculator State
  const [calcStateId, setCalcStateId] = useState<string>('NM');
  const [registeredAgentTier, setRegisteredAgentTier] = useState<number>(49); // annual cost
  const [virtualAddressNeeded, setVirtualAddressNeeded] = useState<boolean>(false); // $15/mo
  const [expeditedProcessing, setExpeditedProcessing] = useState<boolean>(false);

  // ITIN Readiness Checklist State
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [currentITINStep, setCurrentITINStep] = useState<number>(1);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State data list filtering
  const filteredStates = useMemo(() => {
    return US_STATES_DATA.filter((state) => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            state.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTaxStatus = selectedTaxStatus === 'All' || state.nonResidentTaxStatus === selectedTaxStatus;
      
      const matchesAnnualFee = state.annualFee <= selectedAnnualFeeMax;
      
      const matchesPopular = !showPopularOnly || state.isPopular;

      return matchesSearch && matchesTaxStatus && matchesAnnualFee && matchesPopular;
    });
  }, [searchTerm, selectedTaxStatus, selectedAnnualFeeMax, showPopularOnly]);

  const currentlySelectedState = useMemo(() => {
    return US_STATES_DATA.find(s => s.id === selectedStateForDetails) || US_STATES_DATA[0];
  }, [selectedStateForDetails]);

  // Selected State for Calculator
  const calcState = useMemo(() => {
    return US_STATES_DATA.find(s => s.id === calcStateId) || US_STATES_DATA[0];
  }, [calcStateId]);

  // Calculate fees
  const upfrontStateFee = calcState.filingFee;
  const upfrontProcessFee = expeditedProcessing ? 50 : 0;
  const upfrontVirtualAddressFee = virtualAddressNeeded ? 30 : 0; // Setup/First two months deposit
  const upfrontRAFee = registeredAgentTier;
  const totalUpfrontCost = upfrontStateFee + upfrontProcessFee + upfrontVirtualAddressFee + upfrontRAFee;

  const ongoingStateReportFee = calcState.annualFee;
  const ongoingRAFee = registeredAgentTier;
  const ongoingVirtualAddressFee = virtualAddressNeeded ? 180 : 0; // $15 * 12 months
  const totalOngoingAnnual = ongoingStateReportFee + ongoingRAFee + ongoingVirtualAddressFee;

  const toggleCheckpoint = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter(item => item !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  const getTaxStatusColor = (status: string) => {
    switch(status) {
      case 'Fully Exempt':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Conditionally Exempt':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'High Compliance':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Visual Top Highlight Ribbon */}
      <div className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-indigo-700 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🚀 Fully Updated for 2026/2027 Filing Seasons • Designed for Global Entrepreneurs & Foreign Non-Residents
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <button
                id="back-to-home"
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-700 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Back to advisor home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Advisor Home</span>
              </button>
              <button
                id="switch-to-ltd"
                onClick={() => onSwitch('ltd')}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-2.5 py-2 transition shrink-0"
                title="Switch to UK LTD Advisor"
              >
                🇬🇧 Switch to UK LTD
              </button>
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100">
                <Scale className="h-6 w-6" id="header-logo-icon" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  US LLC <span className="text-indigo-600">Tax & Fee Advisor</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">Self-Filing System • Form W-7/SS-4 Guidelines</p>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                id="tab-states"
                onClick={() => setActiveTab('states')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'states'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇺🇸 State Fees & Rules
              </button>
              <button
                id="tab-itin"
                onClick={() => setActiveTab('itin')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'itin'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🪪 W-7 ITIN Blueprint
              </button>
              <button
                id="tab-calculator"
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧮 Budget Estimator
              </button>
              <button
                id="tab-compliance"
                onClick={() => setActiveTab('compliance')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'compliance'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📑 Form W-8 / 5472 Filing
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
            <div className="bg-slate-50 text-indigo-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cheapest Maintenance</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">New Mexico LLC</p>
              <p className="text-xs text-slate-500 mt-2">
                <strong>$50</strong> one-time setup fee. <strong>$0/year</strong> annual state reports. Perfect for low overhead.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-start gap-4">
            <div className="bg-slate-50 text-emerald-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Foreign Exemption Rate</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">45+ Exempt States</p>
              <p className="text-xs text-slate-500 mt-2">
                No physical location? Enjoy <strong>100% individual state income tax exemption</strong> in over 45 states.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-start gap-4">
            <div className="bg-slate-50 text-amber-600 p-3 rounded-xl border border-slate-100 shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Compliance Caution</p>
              <p className="text-xl font-extrabold text-slate-950 mt-1">$25,000 Penalty</p>
              <p className="text-xs text-rose-600 mt-2 font-medium">
                Mandatory Form 5472 + Pro Forma 1120 is due April 15. Failing to file triggers severe automatic fines.
              </p>
            </div>
          </div>
        </section>

        {/* Advertisement — responsive leaderboard, persistent across tabs */}
        <div className="mb-8">
          <LeaderboardAd slotId="llc-top" />
        </div>

        {/* TAB 1: ALL 50 STATES DIRECTORY */}
        {activeTab === 'states' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">50-State LLC Fee & State Tax Database</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select a state to inspect filing instructions, annual fees, and exact nonresident state income tax treatment.
                  </p>
                </div>

                {/* Popular badges quick-filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedTaxStatus('All'); setSelectedAnnualFeeMax(600); setShowPopularOnly(false); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => { setSearchTerm('Wyoming'); setSelectedStateForDetails('WY'); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    🤠 Wyoming Profile
                  </button>
                  <button
                    onClick={() => { setSearchTerm('New Mexico'); setSelectedStateForDetails('NM'); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 transition"
                  >
                    🌶️ New Mexico Profile
                  </button>
                  <button
                    onClick={() => { setSearchTerm('Delaware'); setSelectedStateForDetails('DE'); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 transition"
                  >
                    🏢 Delaware Profile
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Search State Name or Code</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Texas or WY..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Tax Status Filter */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Non-Resident Tax Exemption</label>
                  <select
                    value={selectedTaxStatus}
                    onChange={(e) => setSelectedTaxStatus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Fully Exempt">Fully Exempt (No State Personal income tax)</option>
                    <option value="Conditionally Exempt">Conditionally Exempt (Virtual activity ok)</option>
                    <option value="High Compliance">High Compliance (Annual returns / Franchise minimas)</option>
                  </select>
                </div>

                {/* Annual Renewal Cost Ceiling */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Max Annual Report Fee: <span className="text-indigo-600 font-extrabold">${selectedAnnualFeeMax}</span></label>
                  <input
                    type="range"
                    min="0"
                    max="600"
                    step="10"
                    value={selectedAnnualFeeMax}
                    onChange={(e) => setSelectedAnnualFeeMax(Number(e.target.value))}
                    className="w-full mt-2 scroll-accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>$0 (Free reports)</span>
                    <span>$600</span>
                  </div>
                </div>

                {/* Popular Choice Toggle */}
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="popular-only-checkbox"
                    checked={showPopularOnly}
                    onChange={(e) => setShowPopularOnly(e.target.checked)}
                    className="h-4 w-4 rounded-sm text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="popular-only-checkbox" className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
                    Show popular foreign-founder states
                  </label>
                </div>
              </div>

              {/* Status explanation legends */}
              <div className="mt-4 flex flex-wrap gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Classification Guide:</span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Fully Exempt (Ideal post-setup)
                </span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span> Conditionally Exempt (No local warehouse/operations)
                </span>
                <span className="text-[11px] font-semibold flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Compliance (California $800 minimums, etc)
                </span>
              </div>
            </div>

            {/* Main state grid + details pane splitting */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left list - grid container (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available States ({filteredStates.length})</span>
                    <span className="text-xs font-semibold text-slate-500">Click a state to view custom non-resident instructions</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {filteredStates.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <SlidersHorizontal className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-bold">No States Match Your Criteria</p>
                        <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or fee constraints.</p>
                      </div>
                    ) : (
                      filteredStates.map((state) => (
                        <div
                          key={state.id}
                          onClick={() => setSelectedStateForDetails(state.id)}
                          className={`p-4 flex items-center justify-between text-left transition-all cursor-pointer ${
                            selectedStateForDetails === state.id 
                              ? 'bg-indigo-50/70 border-l-4 border-indigo-600' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 text-slate-700 font-bold w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                              {state.id}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm ml-0.5 text-slate-900">{state.name}</span>
                                {state.isPopular && (
                                  <span className="bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                                    ★ TOP VALUE
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTaxStatusColor(state.nonResidentTaxStatus)}`}>
                                  {state.nonResidentTaxStatus}
                                </span>
                                <span className="text-[11px] text-slate-500 font-medium">🕒 {state.processingTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-semibold text-slate-500">Filing: <strong className="text-slate-800">${state.filingFee}</strong></div>
                            <div className="text-[11px] text-slate-400 font-medium font-mono mt-0.5">Annual: ${state.annualFee}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Custom Selected State Details Pane (5 cols) */}
              <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
                {currentlySelectedState ? (
                  <div className="bg-white rounded-2xl border-2 border-indigo-600/70 shadow-lg overflow-hidden">
                    <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative">
                      <div className="absolute right-4 top-4 bg-white/10 text-white font-black text-2xl h-11 w-11 rounded-lg flex items-center justify-center backdrop-blur-xs">
                        {currentlySelectedState.id}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Detailed Profile</p>
                      <h3 className="text-2xl font-black mt-1">{currentlySelectedState.name}</h3>
                      <p className="text-xs text-indigo-200 mt-1">Classification: <strong>{currentlySelectedState.nonResidentTaxStatus} LLC Mode</strong></p>
                    </div>

                    <div className="p-6 space-y-6">
                      
                      {/* Fees Grid */}
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-150">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Standard Filing Fee</p>
                          <p className="text-2xl font-extrabold text-slate-950">${currentlySelectedState.filingFee}</p>
                          <span className="text-[10px] font-bold text-slate-400">Online State Submission</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ongoing Annual Upkeep</p>
                          <p className="text-2xl font-extrabold text-slate-950">${currentlySelectedState.annualFee}</p>
                          <span className="text-[10px] text-indigo-600 font-bold block truncate" title={currentlySelectedState.annualLabel}>
                            {currentlySelectedState.annualLabel}
                          </span>
                        </div>
                      </div>

                      {/* Tax Exempt Status Block */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-emerald-600" /> Non-Resident State Tax Treatment
                        </h4>
                        <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md mb-2 border ${getTaxStatusColor(currentlySelectedState.nonResidentTaxStatus)}`}>
                            {currentlySelectedState.nonResidentTaxStatus} Non-Resident LLC
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {currentlySelectedState.nonResidentDescription}
                          </p>
                        </div>
                      </div>

                      {/* Speed */}
                      <div className="flex justify-between items-center text-xs p-3.5 bg-indigo-50/40 rounded-xl">
                        <span className="font-bold text-indigo-950">🕒 State Formation Window:</span>
                        <span className="font-extrabold text-indigo-700">{currentlySelectedState.processingTime}</span>
                      </div>

                      {/* Extra context / warning notes */}
                      {currentlySelectedState.additionalNotes && (
                        <div className="p-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-150 text-xs leading-relaxed font-medium">
                          <strong>Filing Alert:</strong> {currentlySelectedState.additionalNotes}
                        </div>
                      )}

                      {/* Official submission links */}
                      <a
                        href={currentlySelectedState.officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                      >
                        File Directly on State Website <ExternalLink className="h-4 w-4" />
                      </a>

                      <p className="text-[10px] text-center text-slate-400 font-medium">
                        Remember: Setting up an LLC yourself directly bypasses registered agent agency markups of $200–$500.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-100 rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                    <Info className="h-10 w-10 mx-auto text-slate-400 mb-2" />
                    <strong>No State Selected</strong>
                    <p className="text-xs mt-1">Select any state from the list on the left to review custom instructions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ITIN OBTAINMENT BLUEPRINT */}
        {activeTab === 'itin' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Award className="text-indigo-600 h-6 w-6" /> Complete Blueprint: Obtaining an ITIN as a Single-Member Foreign Owner
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                As a foreign non-resident (e.g. from Pakistan), obtaining an Individual Taxpayer Identification Number (ITIN) is your gateway to filing US personal taxes, acquiring credit history, and preventing heavy bank blocks. Follow our step-by-step master plan.
              </p>
            </div>

            {/* Interactive Progress Checker */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Wizard Steps list */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Steps Accordion */}
                <div className="space-y-4">
                  
                  {/* Step 1 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentITINStep === 1 ? 'ring-2 ring-indigo-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentITINStep(1)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">01</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Locating Your IRS Filing Exception Category</h4>
                          <p className="text-xs text-slate-500">Determining why you qualify for an ITIN without an SSN</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">EXCEPTION CATEGORIES</span>
                    </div>

                    {currentITINStep === 1 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-xs leading-relaxed text-slate-700 font-medium">
                        <p>
                          The IRS does not issue ITINs just for curiosity. You must meet a specific tax filing exception condition on **Form W-7**. For a single-member LLC owner outside the US, there are two primary routes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="p-3 bg-emerald-50 text-emerald-950 border border-emerald-150 rounded-xl space-y-1">
                            <span className="font-bold block text-emerald-800">Route A: Attach Tax Return (Standard)</span>
                            <span>
                              You file your yearly tax return (e.g., Form 1040-NR) and attach a completed Form W-7 to it. Your application is verified together by the IRS special ITIN processing center.
                            </span>
                          </div>
                          <div className="p-3 bg-indigo-50 text-indigo-950 border border-indigo-150 rounded-xl space-y-1">
                            <span className="font-bold block text-indigo-800">Route B: Exception 1(d) / partner treaty</span>
                            <span>
                              If your LLC has partner distributions or earns royalties/interest from US sources subjected to reporting, you file with documentation from payers proving withholding claims.
                            </span>
                          </div>
                        </div>

                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-150 text-amber-900 mt-2">
                          <strong>Most Common single-member path:</strong> File **Form W-7** directly with your **first annual Form 1040-NR federal tax return** at the start of the tax year. This eliminates the risk of rejection since the return本身 constitutes the reason.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentITINStep === 2 ? 'ring-2 ring-indigo-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentITINStep(2)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">02</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Assembling Identity Credentials & Certifications</h4>
                          <p className="text-xs text-slate-500">Choosing passport certifications or Certified copies</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">PASSPORT / ID SECURE</span>
                    </div>

                    {currentITINStep === 2 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
                        <p>
                          The IRS requires absolute proof of identity and foreign status. **Your passport is the only document that meets both criteria.**
                        </p>
                        <p className="font-bold text-indigo-950">You have three options to submit your passport safely:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>
                            <strong>Option A (NOT recommended):</strong> Mail your original, physical passport to the IRS in Austin, Texas. While they return it in 60-90 days, shipping high-value passport documents from Pakistan carries custom and postal loss risks.
                          </li>
                          <li>
                            <strong>Option B: Certifying Acceptance Agent (CAA) — RECOMMENDED:</strong> Hire an authorized IRS Certified Acceptance Agent. They will visually verify your physical passport on a video call, make certified form copies, and mail the W-7 directly to the IRS. You keep your passport the entire time.
                          </li>
                          <li>
                            <strong>Option C: Ministry / Embassy Certificate:</strong> Visit the US Embassy in Islamabad, Karachi, or Lahore to request a certified true copy of your passport (costs ~$50). Alternatively, coordinate with the issuing passport authority in Pakistan.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Step 3 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentITINStep === 3 ? 'ring-2 ring-indigo-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentITINStep(3)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">03</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Form W-7 Interactive Fill Mockup</h4>
                          <p className="text-xs text-slate-500">Reviewing field-by-field values for single-member LLC owners</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">W-7 DATA PREVIEW</span>
                    </div>

                    {currentITINStep === 3 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Example Visual Field Configuration for SMLLC Non-residents:</p>
                        
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800 shadow-inner">
                          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span className="text-emerald-400 font-bold text-[10px] uppercase">Form W-7 IRS Mockup</span>
                            <span className="text-[10px] text-slate-500">Rev. August 2023 - Live</span>
                          </div>

                          <div className="space-y-1">
                            <div><strong className="text-slate-400">Reason For Applying checklist:</strong></div>
                            <div className="text-emerald-400">[X] b - Nonresident alien required to get ITIN to claim tax treaty benefit</div>
                            <div className="text-emerald-400">[X] h - Other (specify) --&gt; Exception 1(d) / Single-Member LLC holding active business assets</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Section 1a - First and Last Name:</strong></div>
                            <div className="text-white">Mohammad Bilal (matches legal passport exactly)</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Section 2 - Foreign Address:</strong></div>
                            <div className="text-white">House 42, Street 3, G-11, Islamabad, Pakistan</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Section 3 - US Mailing Address (LLC office):</strong></div>
                            <div className="text-white">Your Registered Agent Address (NM, WY, or DE)</div>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                            <div><strong className="text-slate-400">Section 6g - Company / Payer details:</strong></div>
                            <div className="text-yellow-400">Filer LLC: &quot;Bilal Ecomm Sales LLC&quot; | EIN: xx-xxxxxxx (Your LLC Name)</div>
                          </div>
                        </div>

                        <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-lg text-xs leading-relaxed text-indigo-950 font-medium">
                          💡 <strong>Pro Tip:</strong> Signature fields must be completed physically! Digital/electronic signatures on W-7 are instantly **rejected** by IRS examiners. Use black or blue ballpoint pen.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 4 */}
                  <div className={`p-5 rounded-2xl border bg-white transition-all ${currentITINStep === 4 ? 'ring-2 ring-indigo-500 shadow-md border-transparent' : 'border-slate-150'}`}>
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setCurrentITINStep(4)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">04</span>
                        <div>
                          <h4 className="font-extrabold text-slate-900">Dispatch, Processing time & Final Receiving</h4>
                          <p className="text-xs text-slate-500">Mailing coordinates and IRS processing queues</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">MAILING & WAITING</span>
                    </div>

                    {currentITINStep === 4 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
                        <p>
                          Once Form W-7 is completed, signed, and identity documents are safely attached, compile the package in this exact order:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1.5 font-bold">
                          <li>Form W-7 (Signed Original)</li>
                          <li>Certified Copy of Passport (or CAA document)</li>
                          <li>Attached Tax Return (Form 1040-NR with Schedule C detailing LLC activities)</li>
                          <li>Supporting LLC letters: Copy of LLC Certificate of Formation</li>
                        </ol>

                        <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl space-y-1 mt-3">
                          <span className="text-indigo-400 font-bold text-[10px] block uppercase">IRS Official Austin Address:</span>
                          <span className="font-mono text-xs block">
                            Internal Revenue Service<br />
                            ITIN Operation<br />
                            P.O. Box 149342<br />
                            Austin, TX 78714-9342<br />
                            USA
                          </span>
                        </div>
                        <p className="mt-2 text-slate-500 text-[11px]">
                          Processing currently spans <strong>7 to 11 weeks</strong>. You will receive an official **Notice CP565** document through the mail containing your unique 9-digit ITIN, starting with the number 9. Save this letter in your secure directory.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Right Checklist - Readiness Pre-flight List */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-lg">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-400" /> W-7 Readiness Preflight
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Preflight Checklist</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Check off your progress elements to measure submission confidence.
                  </p>

                  <div className="mt-5 space-y-4">
                    {[
                      { id: 1, label: 'Formed LLC and received state-certified Certificate of Organization' },
                      { id: 2, label: 'Applied for and secured active EIN tax ID via Fax SS-4' },
                      { id: 3, label: 'Secured passport certified copy via US Embassy or trusted Certifying Acceptance Agent' },
                      { id: 4, label: 'Drafted professional Single-Member LLC Operating Agreement' },
                      { id: 5, label: 'Printed Form W-7 on clean single-sided pages (No double siding)' },
                      { id: 6, label: 'Physically signed W-7 with original ink signature (No Digital)' },
                      { id: 7, label: 'Prepared draft of federal non-resident return Form 1040-NR' },
                    ].map((step) => (
                      <div 
                        key={step.id} 
                        onClick={() => toggleCheckpoint(step.id)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition select-none ${completedSteps.includes(step.id) ? 'bg-slate-800/80 text-emerald-300' : 'hover:bg-slate-800 text-slate-300'}`}
                      >
                        <input
                          type="checkbox"
                          checked={completedSteps.includes(step.id)}
                          readOnly
                          className="mt-0.5 rounded-sm outline-hidden accent-emerald-500"
                        />
                        <span className="text-xs tracking-wide font-medium leading-tight">{step.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Readiness Rate */}
                  <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Your Submission Readiness Rate</span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      {Math.round((completedSteps.length / 7) * 100)}%
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div 
                        className="bg-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${(completedSteps.length / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4.5 w-4.5 text-indigo-600" /> Official IRS Reference Materials
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-600 font-medium">
                    <li>
                      <a href="https://www.irs.gov/pub/irs-pdf/fw7.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600 font-semibold underline">
                        📄 Download Form W-7 W-7 PDF <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.irs.gov/instructions/iw7" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600 font-semibold underline">
                        📖 Read IRS Form W-7 Instructions <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.irs.gov/individuals/international-taxpayers/acceptance-agent-program" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600 font-semibold underline">
                        🔍 Find Certifying Acceptance Agent <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                  </ul>
                </div>

                <VerticalAd slotId="llc-blueprint-rail" />
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: BUDGET ESTIMATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Calculator className="text-indigo-600 h-6 w-6" /> Self-Filing LLC Budget Estimator & Cost Simulator
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Estimate exactly what you will pay in state fees, registered agents, virtual addresses, and initial setup to legally trade as a US LLC from anywhere in the world. Bypasses overpriced agency starter fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Calculator Settings Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Customize Setup Scope</h3>

                {/* State Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-2">1. Choose State of Registration</label>
                  <select
                    value={calcStateId}
                    onChange={(e) => setCalcStateId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {US_STATES_DATA.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} (Filing: ${st.filingFee}, Annual Maintenance: ${st.annualFee}/yr)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Registered Agent choice */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">2. Registered Agent Service Tier</label>
                  <span className="text-[11px] text-slate-400 block mb-3">Required as you must have a physical address on state files for legal service process.</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div 
                      onClick={() => setRegisteredAgentTier(49)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${registeredAgentTier === 49 ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Budget Agent</span>
                      <span className="text-xl font-bold block text-indigo-700 mt-1">$49<span className="text-xs text-slate-400">/yr</span></span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Simple service registration (e.g. NM Specialized Agent)</span>
                    </div>

                    <div 
                      onClick={() => setRegisteredAgentTier(99)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${registeredAgentTier === 99 ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Standard Tier</span>
                      <span className="text-xl font-bold block text-indigo-700 mt-1">$99<span className="text-xs text-slate-400">/yr</span></span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Includes standard document mail scan models</span>
                    </div>

                    <div 
                      onClick={() => setRegisteredAgentTier(125)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-left transition select-none ${registeredAgentTier === 125 ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-150 hover:bg-slate-50'}`}
                    >
                      <span className="font-extrabold block text-xs text-slate-900">Premium / Northwest</span>
                      <span className="text-xl font-bold block text-indigo-700 mt-1">$125<span className="text-xs text-slate-400">/yr</span></span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Best privacy protection + rapid mail forwarding</span>
                    </div>
                  </div>
                </div>

                {/* Virtual Commercial Address Choice */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase">3. Real Dedicated Suite Business Address</label>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">BANKING COMPLIANCE REQUIREMENT</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-3">
                    Fintech banks like <strong>Mercury or Relay</strong> require a real suite number instead of a generic registered agent address to prove operations.
                  </span>

                  <div 
                    onClick={() => setVirtualAddressNeeded(!virtualAddressNeeded)}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition select-none ${virtualAddressNeeded ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={virtualAddressNeeded}
                        readOnly
                        className="mt-1 h-4 w-4 text-indigo-600 rounded-xs border-slate-300"
                      />
                      <div>
                        <span className="font-bold block text-sm text-slate-900">Verify a custom physical mailing address</span>
                        <span className="text-xs text-slate-500">Provide real suite numbers (e.g. through iPostal1, Northwest Commercial)</span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-indigo-600">+$15<span className="text-xs text-slate-400 font-medium">/mo</span></span>
                  </div>
                </div>

                {/* State Expedite Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-2">4. Expedited Secretary of State Processing</label>
                  
                  <div 
                    onClick={() => setExpeditedProcessing(!expeditedProcessing)}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition select-none ${expeditedProcessing ? 'border-rose-500 bg-rose-50/30' : 'border-slate-150 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={expeditedProcessing}
                        readOnly
                        className="mt-1 h-4 w-4 text-rose-600 rounded-s focus:ring-rose-500 border-slate-300"
                      />
                      <div>
                        <span className="font-bold block text-sm text-slate-900">Rush processing by State office</span>
                        <span className="text-xs text-slate-500">Decreases setup times by 5-10 business days depending on load</span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-rose-600">+$50</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Dynamic Bill Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Receipt */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-black text-[9px] uppercase px-2.5 py-1 rounded">
                    ESTIMATED COST SLATE
                  </span>
                  <h4 className="text-lg font-black text-white mt-1.5">Setup Breakdown for {calcState.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">Estimations modeled dynamically on current state criteria.</p>

                  <div className="mt-6 space-y-4 border-t border-slate-800 pt-5">
                    
                    {/* Upfront Section */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">UPFRONT INITIAL FORMATION (Year 1)</span>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">{calcState.name} LLC Filing Fee</span>
                          <span className="font-extrabold text-white">${upfrontStateFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Registered Agent Service</span>
                          <span className="font-extrabold text-white">${upfrontRAFee}</span>
                        </div>
                        {virtualAddressNeeded && (
                          <div className="flex justify-between">
                            <span className="text-slate-300">Address Suite Setup & Deposit</span>
                            <span className="font-extrabold text-white">${upfrontVirtualAddressFee}</span>
                          </div>
                        )}
                        {expeditedProcessing && (
                          <div className="flex justify-between">
                            <span className="text-slate-300">State Expedited Fee</span>
                            <span className="font-extrabold text-white">${upfrontProcessFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800/80 pt-2 text-sm">
                          <span>Total Upfront Setup Costs</span>
                          <span>${totalUpfrontCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ongoing Section */}
                    <div className="border-t border-slate-800 pt-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">RECURRING ANNUAL UPKEEP (Year 2+)</span>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Annual State Report / Franchise</span>
                          <span className="font-extrabold text-white">${ongoingStateReportFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Registered Agent Renewal</span>
                          <span className="font-extrabold text-white">${ongoingRAFee}</span>
                        </div>
                        {virtualAddressNeeded && (
                          <div className="flex justify-between">
                            <span className="text-slate-300">Virtual Commercial Suite Address</span>
                            <span className="font-extrabold text-white">${ongoingVirtualAddressFee}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-indigo-400 font-bold border-t border-slate-800/80 pt-2 text-sm">
                          <span>Total Recurring Annual Upkeep</span>
                          <span>${totalOngoingAnnual}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="bg-slate-830 rounded-xl p-3.5 border border-slate-800 text-[11px] leading-relaxed text-slate-400 mt-6">
                    🚨 <strong>Note:</strong> IRS **EIN issuance** and **ITIN processing** are completely **free ($0 filing fee)** directly from the government. Do not buy optional third-party middle-man package updates.
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">How to form it for this exact price?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    1. Hire your chosen physical **Registered Agent** online first to get your legal address coordinates.<br />
                    2. Visit the **Official State Filing Link** (located under our 50-State tab), and initialize Articles of Organization.<br />
                    3. Fill in the organization elements using your physical registree address. Pay using your payment card.<br />
                    4. Wait for processing, then fax Form SS-4 to the IRS to claim your EIN for $0 fee.
                  </p>
                </div>

                <VerticalAd slotId="llc-calculator-rail" />
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE HUB */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <Shield className="text-indigo-600 h-6 w-6" /> Non-Resident Annual Tax Filing Ledger (Form 5472, Pro Forma 1120, W-8BEN)
              </h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Most single-member foreign-owned LLCs pay **$0 in US income tax**, but they have **100% strict annual informational reporting duties**. Failing to report transactions is exceptionally punitive.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Core Forms Deep Dive (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Form 5472 Deep Dive */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3.5 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-100 text-rose-800 font-black text-xs px-2.5 py-1 rounded">CRITICAL</span>
                      <h3 className="font-extrabold text-lg text-slate-900">IRS Form 5472 + Pro Forma Form 1120</h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold font-mono">Due April 15 Annually</span>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Even if your single-member LLC doesn’t generate custom revenues or had a loss, if it was active as a domestic foreign-owned disregarded entity, you **must file** Form 5472.
                  </p>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-2 text-xs leading-relaxed text-rose-950 font-medium my-2">
                    <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>The $25,000 Automatic Penalty:</strong> If you omit this filing, do not file it on time, or submit it with mistakes, the IRS automatic processing engine assesses a **$25,000 fine** instantly. No warnings are given.
                    </div>
                  </div>

                  <div className="space-y-2 mt-3">
                    <p className="text-xs font-bold text-slate-800">What Transactions Trigger Reporting on Form 5472?</p>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      <li><strong>Capital Contributions:</strong> Injecting personal savings from Pakistan to fund the business or pay state setup fees.</li>
                      <li><strong>Owner Distributions:</strong> Transferring profits from your LLC bank account back to your personal Wise or Pakistani bank account.</li>
                      <li><strong>Operational Loans:</strong> Lending your LLC funds or paying company invoices with a personal credit card.</li>
                    </ul>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex gap-2">
                    <a href="https://www.irs.gov/pub/irs-pdf/f5472.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug">
                      <Download className="h-4 w-4" /> Form 5472 PDF
                    </a>
                    <a href="https://www.irs.gov/pub/irs-pdf/f1120.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs leading-snug">
                      <Download className="h-4 w-4" /> Pro Forma 1120 PDF
                    </a>
                  </div>
                </div>

                {/* Form W-8BEN and W-8BEN-E */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-800 font-black text-xs px-2.5 py-1 rounded">TRADING B2B</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Form W-8BEN vs Form W-8BEN-E</h3>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    When operating from Pakistan, payment merchant networks (Stripe, PayPal) or wholesale vendors in the US will prompt you to certify your foreign status so they do not withhold the standard 30% backup flat federal tax.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                      <span className="font-extrabold block text-xs text-slate-900">Form W-8BEN (Individual)</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Complete this form using your personal legal name, foreign resident address (Pakistan), and your newly acquired **ITIN**. Attests that you personally qualify for local treaty relief under the 1959 US-Pakistan Tax Treaty.
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                      <span className="font-extrabold block text-xs text-slate-900">Form W-8BEN-E (Entity)</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Complete this using your **LLC legal name**, the state of formation, and your business **EIN**. Submitted directly to platforms or corporate customers who hire your LLC for freelance work.
                      </p>
                    </div>
                  </div>
                </div>

                {/* State Bank of Pakistan Routing & Tax filers */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3 shadow-xs">
                  <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                    🇵🇰 FBR Pakistan annual filing duties
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Setting up an LLC in the US does not hide your operations from the **Federal Board of Revenue (FBR)**. 
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                    <li><strong>Foreign Asset declaration:</strong> You must list your equity share of the US LLC on your FBR Iris wealth statement.</li>
                    <li><strong>Claiming Foreign Taxes:</strong> If you paid any franchise taxes or sales tax inside the US, you can credit these under the **US-Pakistan Double Tax Avoidance Agreement (DTAA) treaty** to prevent repeating tax cycles on the same dollar in Pakistan.</li>
                    <li><strong>Repatriating Cash safely:</strong> Moving USD profits from Wise or Mercury into a local Pakistani bank account (PKR/USD) is legal. Request your bank to tag receipts under <strong>Code 9182 (IT exports / consulting agency)</strong> to enjoy a reduced income withholding rate of just 1% in Pakistan.</li>
                  </ul>
                </div>

              </div>

              {/* Compliance checklist reminder (4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="h-fit bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 space-y-5">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                    <Activity className="h-5.5 w-5.5 text-indigo-400" /> Annual Tax Calendar Checklist
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-2 border-indigo-500 pl-3">
                      <span className="text-[10px] text-indigo-400 font-extrabold block uppercase">BY MARCH 15</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Form 1065 Partnership Return</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Applicable if your US LLC has two or more members.</span>
                    </div>

                    <div className="border-l-2 border-rose-500 pl-3">
                      <span className="text-[10px] text-rose-400 font-extrabold block uppercase">BY APRIL 15 (MANDATORY)</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Form 5472 + Pro Forma Form 1120</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Filing window for single-member LLC owners. Essential informational return of transitions.</span>
                    </div>

                    <div className="border-l-2 border-indigo-500 pl-3">
                      <span className="text-[10px] text-indigo-400 font-extrabold block uppercase">BY APRIL 15</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Form 1040-NR Nonresident Return</span>
                      <span className="text-[11px] text-slate-400 block mt-1">If your LLC operates physical sales channels (ETBUS) in the US.</span>
                    </div>

                    <div className="border-l-2 border-emerald-500 pl-3">
                      <span className="text-[10px] text-emerald-400 font-extrabold block uppercase">ANNIVERSARY MONTHS</span>
                      <span className="font-bold text-xs block text-white mt-0.5">Annual Report / Franchise filings</span>
                      <span className="text-[11px] text-slate-400 block mt-1">Wyoming takes $60, Delaware takes $300 minimum. Keep good state standing.</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4 text-[11px] leading-relaxed text-slate-400">
                    ⚠️ <strong>Disclaimer:</strong> This guide provides educational compliance frameworks. Seek advice from an IRS enrolled agent or CPA for individual filing scenarios.
                  </div>
                </div>

                <VerticalAd slotId="llc-compliance-rail" />
              </div>

            </div>
          </div>
        )}

        {/* Advertisement — end of the active tab */}
        <div className="mt-10 -mx-4 sm:mx-0">
          <AdBanner size="300x250" slotId="llc-content" />
        </div>

        {/* COMPREHENSIVE NON-RESIDENT FAQ HUB */}
        <section className="mt-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-50 text-indigo-600 p-2.5 rounded-xl border border-slate-100">
              <HelpCircle className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Foreign LLC & ITIN Obtainment FAQ</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Common roadblocks solved by non-resident LLC founders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 divide-slate-150">
            
            {/* Left Col FAQ Item */}
            <div className="space-y-4">
              {[
                {
                  q: "What is ETBUS and does a non-resident owe US federal tax?",
                  a: "ETBUS stands for 'Engaged in a Trade or Business inside the United States'. For a single-member LLC, you are only subject to US income tax if you have physical operations, warehouses, or local employees in the US. If you run a digital service agency or dropship entirely using third-party warehouses (e.g. Amazon FBA), you generally have zero US source effectively connected income, and owe 0% US federal tax. Note: You must still file W-7 and annual Form 5472 disclosures."
                },
                {
                  q: "How can I obtain an EIN without an SSN or ITIN?",
                  a: "You must complete Form SS-4 manually, write 'Foreign' on line 7b, and fax the form to the IRS at +1-304-707-9471. If faxed correctly, the IRS usually responds with your unique EIN number by return fax within 5 to 15 business days."
                },
                {
                  q: "Can I open Mercury Bank or Wise from Pakistan?",
                  a: "Yes. Mercury and Wise serve Pakistani nationalities who own legitimate US LLC entities with active EIN letters. However, they will refuse standard applications that use plain registered agent maildrop addresses. Using a real business mailing suite that filters checks and official legal mail secures approval."
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-50/55 hover:bg-slate-50 transition border border-slate-100">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-start gap-1.5 leading-snug">
                    <span className="text-indigo-600 font-extrabold shrink-0">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5 pl-3 border-l-2 border-indigo-150">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Col FAQ Item */}
            <div className="space-y-4 pt-4 md:pt-0">
              {[
                {
                  q: "How often do I renew my Registered Agent?",
                  a: "Registered agent service agreements renew annually. It typically costs $49–$125 per year. If you let this cancel, the state will lose a point of contact for lawsuit process and auto-administrative dissolve your business."
                },
                {
                  q: "Why did the IRS return my Form W-7?",
                  a: "The most common rejection reason is using a scan or photocopy of your passport instead of a real Certified Acceptable ID. Alternatively, using a digital signature instead of a physical black ink signature on your W-7 application causes instant rejection."
                },
                {
                  q: "Do I need to file self-employment tax in the US?",
                  a: "No. Foreign non-resident LLC owners are completely exempt from US Self-Employment taxes (Medicare/Social Security) because they are not citizens or tax residents of the US."
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-indigo-50/20 hover:bg-indigo-50/35 transition border border-indigo-55/65">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-start gap-1.5 leading-snug">
                    <span className="text-indigo-600 font-extrabold shrink-0">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5 pl-3 border-l-2 border-indigo-150">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <SponsoredOffer className="mt-8" />
      </main>

      {/* Elegant minimalist Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 shadow-inner mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <Scale className="h-4.5 w-4.5 text-indigo-500" /> US LLC TAX & FEE ADVISOR
            </h4>
            <p className="text-slate-500 font-bold text-[10px] tracking-wider uppercase">Self-Formed Non-Resident Compliance Portal</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-slate-500">
            <span className="text-slate-400">Current Year: 2026/2027</span>
            <span>•</span>
            <a href="https://www.irs.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition">Official IRS Website</a>
            <span>•</span>
            <a href="https://wyobiz.wyo.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition">Wyoming Secretary of State</a>
            <span>•</span>
            <a href="https://portal.sos.nm.gov/" target="_blank" rel="noreferrer" className="hover:text-white transition">New Mexico Business Bureau</a>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} Hand-formed Guidance Repository.</p>
            <p className="text-[10px] text-slate-600 mt-1">No automated agent commissions charged.</p>
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
