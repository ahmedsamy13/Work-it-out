// ─── Auth Feature: Public API ──────────────────────────────────────

// Types
export type { LoginCredentials, RegisterCredentials } from "./types";

// Store
export { useAuthStore } from "./store/authStore";

// Hooks
export { useAuth } from "./hooks";
export { useProfile } from "./hooks";

// API
export { authApi } from "./api/authApi";

// Components
export { AuthProvider } from "./components/AuthProvider";

// Utils
export {
  validateLoginForm,
  validateRegisterForm,
  isFormValid,
} from "./utils/validation";
export type {
  LoginFormData,
  RegisterFormData,
  FormErrors,
} from "./utils/validation";
