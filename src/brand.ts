/**
 * Single source of truth for the product's public identity.
 *
 * Every header, footer, document title and structured-data node should read
 * its name from here so a future rebrand is a one-line change instead of a
 * hunt through five components.
 */
export const BRAND = {
  /** Short brand name, used as the leading word in every page header. */
  name: 'Global Incorporation',
  /** Full product name, used in document metadata and footers. */
  product: 'Global Incorporation Free Advisor',
  /** Position statement shown under the home-page header. */
  tagline: 'Company formation, non-resident tax and licensing — in one place',
  /** Publisher / operator of the site. */
  publisher: 'GoshBuzz',
  publisherUrl: 'https://goshbuzz.com/',
} as const;
