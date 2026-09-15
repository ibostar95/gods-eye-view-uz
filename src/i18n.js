import { PRODUCT_PROFILE } from './product.js';

export const TRANSLATIONS = Object.freeze({
  en: Object.freeze({
    'document.title': '{{product}}',
    'brand.subtitle': 'UZBEKISTAN · OPEN DATA · LIVE CONTEXT',
    'welcome.kicker': 'MISSION CONTROL · FIRST LAUNCH',
    'welcome.title': 'Choose your first view',
    'welcome.description':
      'It feels like a forbidden cockpit—then you realize the sources are public and the data is real.',
    'welcome.contacts.title': 'LIVE CONTACTS',
    'welcome.contacts.subtitle': 'Aircraft, vessels and nearby intelligence',
    'welcome.space.title': 'SPACE MISSIONS',
    'welcome.space.subtitle': 'Launches, spacecraft and orbital context',
    'welcome.environmental.subtitle':
      'Live earthquakes and active fires, from USGS and NASA',
    'welcome.explore.title': 'EXPLORE MANUALLY',
    'welcome.explore.subtitle': 'Begin with a clean globe',
    'welcome.suppress': "Don't show this again",
    'welcome.dismiss': 'ESC to dismiss',
    'welcome.tip':
      'Tip: the {{product}} MIC button in the dock lets you talk to the map.',
    'errors.initialization': 'Initialization failed',
  }),
  ru: Object.freeze({
    'document.title': '{{product}}',
    'brand.subtitle': 'УЗБЕКИСТАН · ОТКРЫТЫЕ ДАННЫЕ · ЖИВОЙ КОНТЕКСТ',
    'welcome.kicker': 'ЦЕНТР УПРАВЛЕНИЯ · ПЕРВЫЙ ЗАПУСК',
    'welcome.title': 'Выберите первый вид',
    'welcome.description':
      'Сначала это похоже на закрытый разведывательный интерфейс — а затем понимаешь, что источники открытые, а данные реальные.',
    'welcome.contacts.title': 'ОБЪЕКТЫ В РЕАЛЬНОМ ВРЕМЕНИ',
    'welcome.contacts.subtitle': 'Самолёты, суда и ближайший контекст',
    'welcome.space.title': 'КОСМИЧЕСКИЕ МИССИИ',
    'welcome.space.subtitle': 'Запуски, аппараты и орбитальный контекст',
    'welcome.environmental.subtitle':
      'Землетрясения и активные пожары по данным USGS и NASA',
    'welcome.explore.title': 'ИССЛЕДОВАТЬ ВРУЧНУЮ',
    'welcome.explore.subtitle': 'Начать с чистого глобуса',
    'welcome.suppress': 'Больше не показывать',
    'welcome.dismiss': 'ESC — закрыть',
    'welcome.tip':
      'Совет: кнопка {{product}} MIC позволяет управлять картой голосом.',
    'errors.initialization': 'Ошибка инициализации',
  }),
  uz: Object.freeze({
    'document.title': '{{product}}',
    'brand.subtitle': "O‘ZBEKISTON · OCHIQ MA’LUMOTLAR · JONLI KONTEKST",
    'welcome.kicker': 'BOSHQARUV MARKAZI · BIRINCHI ISHGA TUSHIRISH',
    'welcome.title': 'Birinchi ko‘rinishni tanlang',
    'welcome.description':
      'Avval bu yopiq razvedka interfeysiga o‘xshaydi — keyin esa manbalar ochiq, ma’lumotlar esa haqiqiy ekanini ko‘rasiz.',
    'welcome.contacts.title': 'JONLI OBYEKTLAR',
    'welcome.contacts.subtitle': 'Samolyotlar, kemalar va yaqin hudud konteksti',
    'welcome.space.title': 'KOSMIK MISSIYALAR',
    'welcome.space.subtitle': 'Uchirishlar, kosmik apparatlar va orbital kontekst',
    'welcome.environmental.subtitle':
      'USGS va NASA ma’lumotlari asosidagi zilzilalar va faol yong‘inlar',
    'welcome.explore.title': 'QO‘LDA KO‘RIB CHIQISH',
    'welcome.explore.subtitle': 'Toza globusdan boshlash',
    'welcome.suppress': 'Boshqa ko‘rsatma',
    'welcome.dismiss': 'ESC — yopish',
    'welcome.tip':
      '{{product}} MIC tugmasi orqali xaritani ovoz bilan boshqarishingiz mumkin.',
    'errors.initialization': 'Ishga tushirishda xato',
  }),
});

/** Normalize a browser/user locale to one supported language code. */
export function normalizeLocale(value) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase().replaceAll('_', '-');
  if (!normalized) return null;
  const language = normalized.split('-')[0];
  return PRODUCT_PROFILE.supportedLocales.includes(language) ? language : null;
}

/** Resolve locale by explicit request first, then browser preference, then fallback. */
export function resolveLocale({ requested, languages = [], fallback } = {}) {
  const candidates = [
    requested,
    ...(Array.isArray(languages) ? languages : [languages]),
  ];
  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate);
    if (locale) return locale;
  }
  return (
    normalizeLocale(fallback) ||
    normalizeLocale(PRODUCT_PROFILE.fallbackLocale) ||
    PRODUCT_PROFILE.supportedLocales[0]
  );
}

/** Translate one message key with lightweight {{token}} interpolation. */
export function translate(locale, key, values = {}) {
  const resolvedLocale = normalizeLocale(locale) || PRODUCT_PROFILE.fallbackLocale;
  const fallbackLocale = PRODUCT_PROFILE.fallbackLocale;
  const template =
    TRANSLATIONS[resolvedLocale]?.[key] ??
    TRANSLATIONS[fallbackLocale]?.[key] ??
    key;
  return template.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (token, name) =>
    Object.hasOwn(values, name) ? String(values[name]) : token,
  );
}

/** Apply product identity and incremental data-i18n translations to static markup. */
export function applyDocumentLocalization(documentRef, locale) {
  const resolvedLocale = resolveLocale({ requested: locale });
  const values = { product: PRODUCT_PROFILE.name };

  documentRef.documentElement?.setAttribute('lang', resolvedLocale);
  documentRef.title = translate(resolvedLocale, 'document.title', values);

  documentRef
    .querySelectorAll?.('[data-product-name]')
    ?.forEach((element) => {
      element.textContent = PRODUCT_PROFILE.name;
    });
  documentRef.querySelectorAll?.('[data-i18n]')?.forEach((element) => {
    element.textContent = translate(resolvedLocale, element.dataset.i18n, values);
  });
  documentRef
    .querySelectorAll?.('[data-i18n-title]')
    ?.forEach((element) => {
      element.setAttribute(
        'title',
        translate(resolvedLocale, element.dataset.i18nTitle, values),
      );
    });
  documentRef
    .querySelectorAll?.('[data-i18n-aria-label]')
    ?.forEach((element) => {
      element.setAttribute(
        'aria-label',
        translate(resolvedLocale, element.dataset.i18nAriaLabel, values),
      );
    });

  return resolvedLocale;
}
