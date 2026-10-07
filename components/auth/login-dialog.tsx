"use client";

import { Dialog } from "@/components/ui/dialog";
import { GoogleButton } from "./google-button";

export function LoginDialog({
  open,
  onClose,
  next,
}: {
  open: boolean;
  onClose: () => void;
  next?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose} title="Sign in" maxWidth="sm">
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
  );
}
