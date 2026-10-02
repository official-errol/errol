"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "./login-dialog-provider";

export function AutoOpenLogin() {
  const searchParams = useSearchParams();
  const { openLogin } = useLogin();

  useEffect(() => {
    if (searchParams.get("signin") === "1") {
      const next = searchParams.get("next") ?? undefined;
      openLogin(next);
    }
  }, [searchParams, openLogin]);

  return null;
}
