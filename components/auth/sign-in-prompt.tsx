"use client";

import { useLogin } from "./login-dialog-provider";

export function SignInPrompt({
  message,
  inline,
}: {
  message?: string;
  inline?: boolean;
}) {
  const { openLogin } = useLogin();

  if (inline) {
    return (
      <button
        onClick={() => openLogin()}
        className="px-5 py-2.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
      >
        Sign in
      </button>
    );
  }

  return (
    <p className="text-sm text-text-secondary mb-8">
      <button
        onClick={() => openLogin()}
        className="text-accent hover:underline"
      >
        Sign in
      </button>{" "}
      {message ?? "to continue"}.
    </p>
  );
}
