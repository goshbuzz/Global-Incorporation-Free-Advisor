import { useEffect, useMemo, useRef, useState } from 'react';
import { AD_UNITS, adFrameDocument, type AdSize } from './adUnits';

export interface AdBannerProps {
  /** Which Adsterra zone to render. */
  size: AdSize;
  /** Stable identifier for the placement (useful for analytics / debugging). */
  slotId: string;
  className?: string;
  /**
   * When true (default) the ad iframe is only mounted once the slot is near
   * the viewport. Space is always reserved, so this never causes layout shift.
   */
  lazy?: boolean;
}

function useLazyVisible(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start fetching roughly one viewport early so the creative is ready
      // by the time the reader scrolls to it.
      { rootMargin: '600px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, visible };
}

export default function AdBanner({ size, slotId, className = '', lazy = true }: AdBannerProps) {
  const unit = AD_UNITS[size];
  const source = useMemo(() => adFrameDocument(size), [size]);
  // `size` can change when the viewport crosses a breakpoint; keying the
  // iframe by size forces a clean reload with the correct dimensions.
  const { ref, visible } = useLazyVisible(lazy);

  return (
    <div
      ref={ref}
      id={`ad-slot-${slotId}`}
      data-ad-slot={slotId}
      data-ad-format={size}
      className={`flex w-full flex-col items-center ${className}`}
    >
      <span className="mb-1.5 select-none text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Advertisement
      </span>
      <div
        style={{ width: unit.width, height: unit.height }}
        className="relative shrink-0 overflow-hidden rounded-lg border border-slate-200/90 bg-slate-50"
      >
        {visible ? (
          <iframe
            key={size}
            title={`Advertisement (${size})`}
            srcDoc={source}
            width={unit.width}
            height={unit.height}
            scrolling="no"
            referrerPolicy="no-referrer-when-downgrade"
            className="block border-0 bg-transparent"
          />
        ) : null}
      </div>
    </div>
  );
}

/** Matches a CSS media query and re-renders when it changes. */
function useMinWidth(minWidth: number) {
  const query = `(min-width: ${minWidth}px)`;
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export interface LeaderboardProps {
  slotId: string;
  className?: string;
  lazy?: boolean;
}

/**
 * 728×90 on desktop, 468×60 on tablets, 320×50 on phones — one request only,
 * because only the matched size is mounted.
 */
export function LeaderboardAd({ slotId, className = '', lazy = true }: LeaderboardProps) {
  const isDesktop = useMinWidth(1024);
  const isTablet = useMinWidth(640);
  const size: AdSize = isDesktop ? '728x90' : isTablet ? '468x60' : '320x50';

  return <AdBanner size={size} slotId={slotId} className={className} lazy={lazy} />;
}

/**
 * Skyscraper rail for the advisor sidebars: 160×600 on desktop, 160×300 on
 * smaller screens (same width, so the surrounding column never reflows).
 */
export function VerticalAd({ slotId, className = '', lazy = true }: LeaderboardProps) {
  const isDesktop = useMinWidth(1024);

  return (
    <AdBanner
      size={isDesktop ? '160x600' : '160x300'}
      slotId={slotId}
      className={className}
      lazy={lazy}
    />
  );
}
