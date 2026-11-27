import { useEffect } from 'react';
import { AD_OVERLAYS, type AdOverlay } from './adUnits';

/**
 * Site-wide Adsterra formats (popunder, in-page push, social bar).
 *
 * These three tags are *not* content slots: they overlay the page, and each of
 * them costs a cross-origin script. Loading them the way Adsterra's snippet
 * template suggests — straight into `<head>` — hurts the very metrics this site
 * needs for search (LCP, INP) and pops a window before the visitor has done
 * anything. So the tags are injected lazily, one per page view, and each with
 * the trigger its format actually needs:
 *
 * | format        | injected when                                              |
 * | ------------- | ---------------------------------------------------------- |
 * | social bar    | window `load` — the least intrusive format, mobile-first    |
 * | in-page push  | the reader is engaged (45% scroll depth or 20s of dwell)    |
 * | popunder      | after the first user gesture — browsers block popup windows |
 * |               | without one, so an earlier load is pure waste               |
 *
 * The tags are injected imperatively into `document.body`, outside `#root`, so
 * React can never destroy them while the visitor moves between the four
 * advisors. Everything below is module-scoped and idempotent: a double-invoked
 * effect (React StrictMode) or a re-mount can never inject the same tag twice.
 */

type OverlayId = AdOverlay['id'];

const injected = new Set<OverlayId>();
let started = false;

const overlayById = (id: OverlayId): AdOverlay | undefined =>
  AD_OVERLAYS.find((overlay) => overlay.id === id);

/**
 * Don't spend ad impressions (or bandwidth) on crawlers, linters and headless
 * browsers: they can't click, and serving them inflates CTR-negative traffic in
 * the Adsterra dashboard, which is how publisher accounts get flagged.
 */
function isAutomatedClient(): boolean {
  if (typeof navigator === 'undefined') return true;
  if (navigator.webdriver === true) return true;
  return /bot|\bcrawl|spider|slurp|headless|lighthouse|gtmetrix|pingdom/i.test(
    navigator.userAgent ?? '',
  );
}

function whenWindowLoaded(callback: () => void): void {
  if (document.readyState === 'complete') {
    callback();
    return;
  }
  window.addEventListener('load', callback, { once: true });
}

/** Fires once, on the first deliberate interaction with the page. */
function onFirstInteraction(callback: () => void): void {
  const events = ['pointerdown', 'keydown'] as const;

  const handler = () => {
    for (const event of events) window.removeEventListener(event, handler);
    callback();
  };

  for (const event of events) {
    window.addEventListener(event, handler, { passive: true });
  }
}

/**
 * Fires once the reader looks like a real, engaged visitor: either a good part
 * of the page has been scrolled, or they have stayed on a visible tab for
 * `dwellMs`. The dwell clock is paused while the tab is hidden, so a link
 * opened and abandoned in a background tab never triggers an overlay.
 */
function onEngagement(callback: () => void, dwellMs = 20_000, depth = 0.45): void {
  let done = false;
  let visibleFor = 0;
  let tick: number | undefined;

  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('visibilitychange', onVisibility);
    if (tick !== undefined) window.clearInterval(tick);
    callback();
  };

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0 || (scrollable > 0 && window.scrollY / scrollable >= depth)) {
      finish();
    }
  };

  const onVisibility = () => {
    if (document.hidden) {
      if (tick !== undefined) {
        window.clearInterval(tick);
        tick = undefined;
      }
    } else {
      startClock();
    }
  };

  const startClock = () => {
    if (done || tick !== undefined || document.hidden) return;
    tick = window.setInterval(() => {
      visibleFor += 500;
      if (visibleFor >= dwellMs) finish();
    }, 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('visibilitychange', onVisibility);
  startClock();
  // The page may already be deep-linked past the threshold (e.g. /#license shared
  // with a hash) — check once on the next frame.
  window.requestAnimationFrame(onScroll);
}

function inject(overlay: AdOverlay | undefined): void {
  if (!overlay || injected.has(overlay.id)) return;
  injected.add(overlay.id);

  // The social bar renders into a container it expects to find already there.
  if (overlay.containerId && !document.getElementById(overlay.containerId)) {
    const host = document.createElement('div');
    host.id = overlay.containerId;
    document.body.appendChild(host);
  }

  const tag = document.createElement('script');
  tag.src = overlay.src;
  tag.async = overlay.async ?? false;
  // `data-cfasync="false"` keeps Cloudflare's Rocket Loader from deferring the tag.
  tag.dataset.cfasync = 'false';
  if (overlay.priority === 'high') tag.setAttribute('fetchpriority', 'high');
  document.body.appendChild(tag);
}

/** Kick off the site-wide ad loaders. Safe to call more than once. */
export function initAdsterraOverlays(): void {
  if (started || typeof document === 'undefined') return;
  started = true;

  if (isAutomatedClient()) return;

  whenWindowLoaded(() => {
    inject(overlayById('social-bar'));
    onEngagement(() => inject(overlayById('in-page-push')));
    onFirstInteraction(() => inject(overlayById('popunder')));
  });
}

export default function AdsterraOverlays() {
  useEffect(() => {
    initAdsterraOverlays();
  }, []);

  return null;
}
