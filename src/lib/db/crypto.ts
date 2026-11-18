/**
 * Shared XOR + base64 codec for protecting string values that must be stored
 * outside source code (DB rows, settings values, etc).
 *
 * The key matches the one used by `cpanel-adapter.ts` and `tools/rotate-endpoint.py`
 * — keep them in sync if you ever rotate the key.
 */

const KEY = 'S4f3L1nk~XoR#K3y_2026!zAi';

function xor(text: string, key: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return out;
}

/**
 * Encode a plain string into an obfuscated blob (XOR → UTF-8 → base64).
 * Returns the blob as an ASCII string.
 */
export function encodeString(plain: string): string {
  try {
    const xored = xor(plain, KEY);
    // Use Buffer-style base64 in browser via btoa (binary-safe).
    let binary = '';
    for (let i = 0; i < xored.length; i++) {
      binary += String.fromCharCode(xored.charCodeAt(i) & 0xff);
    }
    return btoa(binary);
  } catch {
    return plain;
  }
}

/**
 * Decode an obfuscated blob back into the original plain string.
 * If the input is NOT a valid encoded blob (e.g., already plain text),
 * returns the input as-is — this makes the codec forward-compatible with
 * any plain values still sitting in the DB from before encryption was enabled.
 */
export function decodeString(blob: string): string {
  if (!blob || typeof blob !== 'string') return blob;
  // Quick sniff: encoded blobs produced by encodeString are base64 of XORed
  // bytes, always length % 4 == 0 (with padding) and match [A-Za-z0-9+/=]+.
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(blob)) return blob;
  try {
    const raw = atob(blob);
    const decoded = xor(raw, KEY);
    // Heuristic: decoded values we care about are URLs → must contain "://"
    // or be short text. If decode produces garbage, fall back to original.
    if (decoded.includes('://') || decoded.length <= 64) {
      return decoded;
    }
    return blob;
  } catch {
    return blob;
  }
}

/**
 * Try to decode a value, and if it doesn't look like an encoded blob,
 * return the original. Convenience wrapper for "load from DB" sites.
 */
export function tryDecode(value: string | null | undefined): string {
  if (!value) return '';
  return decodeString(value);
}
