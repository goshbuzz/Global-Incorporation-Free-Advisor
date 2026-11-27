/**
 * Adsterra inventory used across the site.
 *
 * The account is organised in two groups:
 *
 * 1. **Iframe banners** (the six zones below) — every one of them is rendered
 *    inside its own isolated iframe (see `AdBanner.tsx`). Adsterra's banner
 *    loader reads a single global `atOptions` object, so loading several
 *    banners straight into the React document would make them overwrite each
 *    other and only the last tag would ever fill. Isolating each unit in a
 *    document of its own keeps every slot independent, which is what an SPA
 *    with four switchable views needs.
 *
 * 2. **Site-wide formats** (popunder, in-page push, social bar) — one request
 *    per page view, injected by `AdsterraOverlays.tsx` once the visitor has
 *    actually engaged with the page. They live outside `#root`, so React
 *    never re-mounts or destroys them while switching advisors.
 *
 * Adsterra rotates the delivery domains, so the hosts and zone keys below are
 * the single place to edit when the network reissues the tags.
 */

export type AdSize = '728x90' | '468x60' | '320x50' | '300x250' | '160x600' | '160x300';

/** Host serving the iframe banner zones and the social bar. */
const BANNER_HOST = 'https://bauval.org';
/** Host serving the popunder. */
const POPUNDER_HOST = 'https://abscloud.org';
/** Host serving the click-monetised direct link. */
const DIRECT_LINK_HOST = 'https://araplhn.org';

export interface AdUnit {
  /** Adsterra zone key. */
  readonly key: string;
  /** Tag URL Adsterra hands out for this zone (`/22/<key>`). */
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

const bannerUnit = (key: string, width: number, height: number): AdUnit => ({
  key,
  src: `${BANNER_HOST}/22/${key}`,
  width,
  height,
});

export const AD_UNITS: Record<AdSize, AdUnit> = {
  /** Desktop leaderboard — above the fold on every view. */
  '728x90': bannerUnit('c84224f3f0ca2b5106b28dcfc1fddfaf', 728, 90),
  /** Tablet leaderboard. */
  '468x60': bannerUnit('f9cc98fd54c28a30efb60728f039b4ad', 468, 60),
  /** Phone leaderboard. */
  '320x50': bannerUnit('e034dd272ca506accfe6774c198a33dd', 320, 50),
  /** In-content rectangle, the highest fill-rate desktop format. */
  '300x250': bannerUnit('bb1b7e541eb9cd76a816156a2d5691d2', 300, 250),
  /** Desktop skyscraper rail beside the long advisor panels. */
  '160x600': bannerUnit('09c588559343bcaa3dd47b8e56962d1e', 160, 600),
  /** Same rail on tablets, so the column never reflows. */
  '160x300': bannerUnit('4524a192d5ec082eabe7c381d3f64212', 160, 300),
};

/**
 * Site-wide Adsterra formats. `containerId` is only needed by the social bar,
 * which writes itself into that element.
 */
export interface AdOverlay {
  readonly id: 'popunder' | 'in-page-push' | 'social-bar';
  readonly key: string;
  readonly src: string;
  readonly containerId?: string;
  /** Fetch with `async` — only the social bar supports it. */
  readonly async?: boolean;
  /** Emit `fetchpriority="high"` so the bar paints the moment it is allowed to. */
  readonly priority?: 'high';
}

export const AD_OVERLAYS: readonly AdOverlay[] = [
  {
    id: 'popunder',
    key: 'd3b7c01a789523fc9268e83a743d1910',
    src: `${POPUNDER_HOST}/1/d3b7c01a789523fc9268e83a743d1910`,
  },
  {
    id: 'in-page-push',
    key: '5e77550f43015fa836f9a95f6cf07f13',
    src: `${BANNER_HOST}/14/5e77550f43015fa836f9a95f6cf07f13`,
  },
  {
    id: 'social-bar',
    key: '206df8edcf5cd30b98f82ce17bf8a922',
    src: `${BANNER_HOST}/21/206df8edcf5cd30b98f82ce17bf8a922`,
    containerId: 'container-206df8edcf5cd30b98f82ce17bf8a922',
    async: true,
    priority: 'high',
  },
] as const;

/** Every third-party host the ad stack touches — used for the prefetch hints. */
export const AD_HOSTS = [BANNER_HOST, POPUNDER_HOST, DIRECT_LINK_HOST] as const;

/**
 * Adsterra direct/smart link (click-monetised). Only ever rendered inside a
 * clearly labelled "Sponsored" component, never disguised as editorial content.
 */
export const ADSTERRA_DIRECT_LINK = `${DIRECT_LINK_HOST}/4/79f189149c2b36f46af866a650cdb1ed`;

/**
 * HTML document that boots one Adsterra iframe banner. `atOptions` is set in
 * the same document that invokes the tag, exactly as Adsterra's snippet expects.
 */
export function adFrameDocument(size: AdSize): string {
  const unit = AD_UNITS[size];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=${unit.width}, initial-scale=1" />
    <base target="_blank" />
    <title>Advertisement</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: ${unit.width}px;
        height: ${unit.height}px;
        overflow: hidden;
        background: transparent;
      }
      iframe { border: 0; display: block; }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key': '${unit.key}',
        'format': 'iframe',
        'height': ${unit.height},
        'width': ${unit.width},
        'params': {}
      };
    </script>
    <script type="text/javascript" data-cfasync="false" src="${unit.src}"></script>
  </body>
</html>`;
}
