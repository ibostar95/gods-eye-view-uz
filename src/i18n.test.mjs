import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TRANSLATIONS,
  normalizeLocale,
  resolveLocale,
  translate,
} from './i18n.js';
import { PRODUCT_PROFILE } from './product.js';

test('product profile declares the supported locale contract', () => {
  assert.deepEqual(PRODUCT_PROFILE.supportedLocales, ['uz', 'ru', 'en']);
  assert.equal(PRODUCT_PROFILE.fallbackLocale, 'en');
  assert.equal(PRODUCT_PROFILE.name, 'GEV-UZ');
});

test('normalizeLocale accepts supported regional locale forms', () => {
  assert.equal(normalizeLocale('uz-Latn-UZ'), 'uz');
  assert.equal(normalizeLocale('ru_RU'), 'ru');
  assert.equal(normalizeLocale('EN-us'), 'en');
  assert.equal(normalizeLocale('de-DE'), null);
  assert.equal(normalizeLocale(''), null);
  assert.equal(normalizeLocale(null), null);
});

test('resolveLocale prefers an explicit request before browser languages', () => {
  assert.equal(
    resolveLocale({ requested: 'uz-UZ', languages: ['ru-RU', 'en-US'] }),
    'uz',
  );
  assert.equal(resolveLocale({ languages: ['de-DE', 'ru-RU'] }), 'ru');
  assert.equal(resolveLocale({ languages: ['de-DE'] }), 'en');
});

test('translation dictionaries expose the same keys in every locale', () => {
  const reference = Object.keys(TRANSLATIONS.en).sort();
  for (const locale of PRODUCT_PROFILE.supportedLocales) {
    assert.deepEqual(Object.keys(TRANSLATIONS[locale]).sort(), reference, locale);
  }
});

test('translate falls back safely and interpolates product tokens', () => {
  assert.equal(
    translate('ru', 'welcome.tip', { product: 'GEV-UZ' }),
    'Совет: кнопка GEV-UZ MIC позволяет управлять картой голосом.',
  );
  assert.equal(translate('de', 'document.title', { product: 'GEV-UZ' }), 'GEV-UZ');
  assert.equal(translate('uz', 'missing.key'), 'missing.key');
});
