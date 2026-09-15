const SUPPORTED_LOCALES = Object.freeze(['uz', 'ru', 'en']);

/** Stable product-level configuration for the Uzbekistan fork. */
export const PRODUCT_PROFILE = Object.freeze({
  id: 'gev-uz',
  name: 'GEV-UZ',
  longName: 'GEV-UZ Spatial Intelligence',
  description: 'Uzbekistan-focused real-time spatial intelligence console',
  repositoryUrl: 'https://github.com/ibostar95/gods-eye-view-uz',
  upstreamRepositoryUrl: 'https://github.com/bilawalsidhu/gods-eye-view',
  supportedLocales: SUPPORTED_LOCALES,
  fallbackLocale: 'en',
  region: Object.freeze({
    id: 'uzbekistan',
    name: 'Uzbekistan',
  }),
});
