/**
 * XSS Sanitization Utilities
 *
 * React auto-escapes JSX expressions by default, preventing injection
 * of HTML/script content in rendered output. These functions provide
 * additional explicit encoding for URLs and other attributes where
 * React's automatic escaping does not apply.
 */

/**
 * Encodes a string for safe use in a URL query parameter.
 * Protects against URL-based injection attacks.
 */
export function encodeUrlParam(str) {
  if (typeof str !== 'string') return '';
  return encodeURIComponent(str);
}

/**
 * Encodes a string for safe use in an HTML attribute context.
 * This is belt-and-suspenders protection — React already escapes
 * JSX expressions, but this provides defense-in-depth.
 */
export function encodeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
