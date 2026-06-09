// ─── Auth Form Validation ──────────────────────────────────────────
// Composes shared validators into form-specific validation logic
// for Login and Register forms.

import { isEmail, isNonEmpty, isStrongPassword } from "@/shared/utils";

// ─── Types ─────────────────────────────────────────────────────────

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

// ─── Login Validation ──────────────────────────────────────────────

export function validateLoginForm(data: LoginFormData): FormErrors<LoginFormData> {
  const errors: FormErrors<LoginFormData> = {};

  if (!isNonEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!isNonEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return errors;
}

// ─── Register Validation ───────────────────────────────────────────

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

export function validateRegisterForm(
  data: RegisterFormData
): FormErrors<RegisterFormData> {
  const errors: FormErrors<RegisterFormData> = {};

  // Username
  if (!isNonEmpty(data.userName)) {
    errors.userName = "Username is required";
  } else if (data.userName.trim().length < USERNAME_MIN_LENGTH) {
    errors.userName = `Username must be at least ${USERNAME_MIN_LENGTH} characters`;
  } else if (data.userName.trim().length > USERNAME_MAX_LENGTH) {
    errors.userName = `Username must be at most ${USERNAME_MAX_LENGTH} characters`;
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.userName.trim())) {
    errors.userName = "Username can only contain letters, numbers, and underscores";
  }

  // Email
  if (!isNonEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password
  if (!isNonEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!isStrongPassword(data.password)) {
    errors.password =
      "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
  }

  // Confirm Password
  if (!isNonEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * Returns true if the errors object has no entries (form is valid).
 */
export function isFormValid<T>(errors: FormErrors<T>): boolean {
  return Object.keys(errors).length === 0;
}
