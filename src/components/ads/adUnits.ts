/**
 * Adsterra inventory used across the site.
 *
 * Every iframe-format banner is rendered inside its own isolated iframe
 * (see `AdBanner.tsx`). Adsterra's `invoke.js` reads a single global
 * `atOptions` object, so loading several banners directly into the React
 * document would make them overwrite each other. Isolating each unit in a
 * document of its own keeps every slot independent and safe for an SPA.
 */

export type AdSize = '728x90' | '468x60' | '320x50' | '300x250' | '160x600' | '160x300';

export interface AdUnit {
  /** Adsterra zone key. */
  readonly key: string;
  readonly width: number;
  readonly height: number;
}

export const AD_UNITS: Record<AdSize, AdUnit> = {
  '728x90': { key: 'b0506ed176fd9a02395e7eb8e9c83bd6', width: 728, height: 90 },
  '468x60': { key: '49a00a180850b2d7cc08aa73db3b3711', width: 468, height: 60 },
  '320x50': { key: '8be93438605e6e3f6f2fde3e58de7f09', width: 320, height: 50 },
  '300x250': { key: 'c2686e3ac1abf116d1a630f1f616f7cb', width: 300, height: 250 },
  '160x300': { key: 'fc3314a127173936e23bbbb8caa85e69', width: 160, height: 300 },
  '160x600': { key: 'd19a09b2342213e7b25d0d740c306d9b', width: 160, height: 600 },
};

/** Adsterra account host — also used for the preconnect hint in index.html. */
export const ADSTERRA_HOST = 'https://thatlobster.com';

/**
 * Adsterra direct/smart link (click-monetised). Only ever rendered inside a
 * clearly labelled "Sponsored" component, never disguised as editorial content.
 */
export const ADSTERRA_DIRECT_LINK =
  'https://thatlobster.com/yc8f09dm?key=7233a82935485d44370fdc9d572982a5';

/**
 * HTML document that boots one Adsterra iframe banner. `atOptions` is set in
 * the document that invokes the script, exactly as Adsterra's snippet expects.
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
    <script type="text/javascript" src="${ADSTERRA_HOST}/${unit.key}/invoke.js"></script>
  </body>
</html>`;
}
