import { ArrowUpRight, Megaphone } from 'lucide-react';
import { ADSTERRA_DIRECT_LINK } from './adUnits';

export interface SponsoredOfferProps {
  className?: string;
}

/**
 * Clearly-labelled direct-link placement (Adsterra smart link).
 * `rel="sponsored"` keeps it compliant with search-engine link guidelines.
 */
export default function SponsoredOffer({ className = '' }: SponsoredOfferProps) {
  return (
    <aside
      aria-label="Sponsored offer"
      className={`bg-white rounded-2xl border border-dashed border-slate-300 p-5 sm:p-6 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-start gap-3.5 flex-1">
          <div className="bg-amber-50 text-amber-600 border border-amber-200 p-2.5 rounded-xl shrink-0">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <span className="inline-block text-[9px] font-black uppercase tracking-[0.18em] text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
              Sponsored
            </span>
            <p className="text-sm font-extrabold text-slate-900 mt-1.5">Partner offer</p>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Explore today&apos;s sponsored deal from our advertising partner. Sponsored links keep this
              advisory free to use.
            </p>
          </div>
        </div>
        <a
          href={ADSTERRA_DIRECT_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shrink-0"
        >
          Open offer
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3.5 pt-3 border-t border-slate-100 text-[10px] leading-relaxed text-slate-400 font-medium">
        Advertisement by Adsterra. We do not endorse the advertised product or service — always review the
        offer&apos;s terms before sharing personal or payment details.
      </p>
    </aside>
  );
}
