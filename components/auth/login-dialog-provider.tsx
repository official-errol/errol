"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Dialog } from "@/components/ui/dialog";
import { GoogleButton } from "./google-button";

type LoginContextValue = {
  openLogin: (next?: string) => void;
  closeLogin: () => void;
};

const LoginContext = createContext<LoginContextValue | null>(null);

export function useLogin() {
  const ctx = useContext(LoginContext);
  if (!ctx)
    throw new Error("useLogin must be used inside <LoginDialogProvider>");
  return ctx;
}

export function LoginDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState<string | undefined>(undefined);

  const openLogin = useCallback((nextPath?: string) => {
    setNext(nextPath);
    setOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setOpen(false);
    setNext(undefined);
  }, []);

  return (
    <LoginContext.Provider value={{ openLogin, closeLogin }}>
      {children}

      <Dialog open={open} onClose={closeLogin} title="Sign in" maxWidth="sm">
        <div className="space-y-5">
          <p className="text-sm text-text-secondary">
            Continue with your Google account to access Errol.
          </p>

          <GoogleButton next={next} />

          <p className="text-xs text-text-tertiary text-center">
            We only use your Google account for authentication. No spam, ever.
          </p>
        </div>
      </Dialog>
    </LoginContext.Provider>
  );
}
