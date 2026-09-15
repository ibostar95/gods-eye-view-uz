import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';
import {
  applyDocumentLocalization,
  resolveLocale,
  translate,
} from './i18n.js';
import { PRODUCT_PROFILE } from './product.js';

const requestedLocale = new URLSearchParams(
  globalThis.location?.search || '',
).get('lang');
const locale = resolveLocale({
  requested: requestedLocale,
  languages:
    globalThis.navigator?.languages || globalThis.navigator?.language || [],
});
applyDocumentLocalization(document, locale);

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

application.start().catch((error) => {
  console.error(`${PRODUCT_PROFILE.name} initialization failed:`, error);
  const loaderStatus = document.querySelector('#loading-screen .loader-status');
  loaderStatus.textContent = `${translate(
    locale,
    'errors.initialization',
  )}: ${describeError(error)}`;
  loaderStatus.style.color = '#ff4444';
});

export { application, locale };
