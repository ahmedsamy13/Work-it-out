import {
  validateLoginForm,
  isFormValid,
  useAuth,
} from "@/features/auth";
import type { FormErrors, LoginFormData } from "@/features/auth";
import { ROUTES } from "@/shared/constants";
import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors<LoginFormData>>({});

  const { login, isLoggingIn, loginError } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formErrors = validateLoginForm({ email, password });
    if (!isFormValid(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    login({ email, password });
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      {/* ── Form body ─────────────────────────────────── */}
      <div className="flex flex-col gap-5 p-8">
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Welcome Back
          </h2>
          <p className="text-text-muted text-sm mt-1">
            Sign in to continue your fitness journey.
          </p>
        </div>

        {/* Server error */}
        {loginError && (
          <div className="rounded-lg border border-status-danger-solid bg-status-danger-solid/10 px-4 py-3 text-sm text-status-danger-text">
            {loginError.message}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g yourname@gmail.com"
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute right-3 top-[38px] text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        <Button
          size="lg"
          variant="primary"
          className="w-full mt-1"
          disabled={isLoggingIn}
          isLoading={isLoggingIn}
        >
          {isLoggingIn ? "Signing in..." : "Login"}
        </Button>
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-1 bg-bg-subtle w-full py-4 border-t border-border text-sm">
        <span className="text-text-muted">Don't have an account?</span>
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-text-brand hover:underline transition-colors"
        >
          Sign Up for free
        </Link>
      </div>
    </Form>
  );
}
