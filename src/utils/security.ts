/**
 * Escapes HTML special characters to prevent XSS attacks
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitizes JSON input by parsing and stringifying
 * Throws error if invalid JSON
 */
export function sanitizeJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}