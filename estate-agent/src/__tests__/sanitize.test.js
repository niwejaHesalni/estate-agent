/**
 * sanitize.test.js
 * Tests for XSS sanitization utilities in src/utils/sanitize.js
 */

import { encodeUrlParam, encodeHtml } from '../utils/sanitize';

// ---- Test 1: encodeUrlParam encodes special characters ----
test('encodeUrlParam encodes special URL characters', () => {
  const result = encodeUrlParam('hello world & price=£500');
  expect(result).toBe('hello%20world%20%26%20price%3D%C2%A3500');
});

// ---- Test 2: encodeUrlParam returns empty string for non-string input ----
test('encodeUrlParam returns empty string for non-string input', () => {
  expect(encodeUrlParam(null)).toBe('');
  expect(encodeUrlParam(undefined)).toBe('');
  expect(encodeUrlParam(123)).toBe('');
  expect(encodeUrlParam({})).toBe('');
});

// ---- Test 3: encodeUrlParam handles empty string ----
test('encodeUrlParam handles empty string', () => {
  expect(encodeUrlParam('')).toBe('');
});

// ---- Test 4: encodeHtml escapes all five HTML special characters ----
test('encodeHtml escapes &, <, >, ", and \'', () => {
  const input = '&<>"\'';
  const result = encodeHtml(input);
  expect(result).toBe('&amp;&lt;&gt;&quot;&#x27;');
});

// ---- Test 5: encodeHtml escapes mixed content safely ----
test('encodeHtml escapes mixed HTML content', () => {
  const input = '<script>alert("xss")</script>';
  const result = encodeHtml(input);
  expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  expect(result).not.toContain('<');
  expect(result).not.toContain('>');
  expect(result).not.toContain('"');
});

// ---- Test 6: encodeHtml returns empty string for non-string input ----
test('encodeHtml returns empty string for non-string input', () => {
  expect(encodeHtml(null)).toBe('');
  expect(encodeHtml(undefined)).toBe('');
  expect(encodeHtml(42)).toBe('');
});

// ---- Test 7: encodeHtml preserves safe strings ----
test('encodeHtml preserves safe strings with no special chars', () => {
  expect(encodeHtml('hello world')).toBe('hello world');
  expect(encodeHtml('')).toBe('');
});

// ---- Test 8: encodeHtml is idempotent for already-encoded input ----
test('encodeHtml double-encodes already-encoded entities (belt-and-suspenders)', () => {
  const input = '&amp;';
  const result = encodeHtml(input);
  expect(result).toBe('&amp;amp;');
});
