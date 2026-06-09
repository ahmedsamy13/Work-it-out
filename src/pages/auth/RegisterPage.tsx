import { validateRegisterForm, isFormValid, useAuth } from "@/features/auth";
import type { FormErrors, RegisterFormData } from "@/features/auth";
import { ROUTES } from "@/shared/constants";
import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

export function RegisterPage() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors<RegisterFormData>>({});

  const { register, isRegistering, registerError } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formErrors = validateRegisterForm({
      userName,
      email,
      password,
      confirmPassword,
    });

    if (!isFormValid(formErrors)) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    register({ email, password, displayName: userName });
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col text-center my-6 mx-8 space-y-1 ">
        <h1 className="text-text-primary text-2xl">Create an Account</h1>
        <p className="text-text-muted text-sm mt-4">
          Sign up to track your workouts, log your sets, and crush your fitness
          goals.
        </p>
      </div>
      <div className="flex flex-col gap-3 mx-8">
        {/* Server error */}
        {registerError && (
          <div className="rounded-lg border border-status-danger-solid bg-status-danger-solid/10 px-4 py-3 text-sm text-status-danger-text">
            {registerError.message}
          </div>
        )}

        <Input
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="e.g smsm"
          error={errors.userName}
        />
        <Input
          label="Email"
          type="email"
          placeholder="e.g smsm@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[34px] right-2 text-text-secondary hover:text-brand-DEFAULT duration-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="************"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[34px] right-2 text-text-secondary hover:text-brand-DEFAULT duration-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <Button
          size="lg"
          className="mt-6 mb-5 w-full"
          disabled={isRegistering}
          isLoading={isRegistering}
        >
          {isRegistering ? "Creating account..." : "Sign Up"}
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1 bg-bg-subtle w-full py-4 border-t border-border text-sm">
        <span className="text-text-muted">Already have an account?</span>
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-text-brand hover:underline transition-colors"
        >
          Login Now
        </Link>
      </div>
    </Form>
  );
}
