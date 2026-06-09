// ─── Validators ────────────────────────────────────────────────────
// Pure validation functions used across auth forms and input fields.

/**
 * Validate an email address format.
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Check if a password meets minimum strength requirements.
 * At least 8 chars, 1 uppercase, 1 lowercase, 1 number.
 */
export function isStrongPassword(value: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}

/**
 * Check if a value is a non-empty string after trimming.
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
