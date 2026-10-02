"use client";

import { useEffect, useState } from "react";

export function ShareExpiry({ expiresAt }: { expiresAt: string }) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    function compute() {
      const ms = new Date(expiresAt).getTime() - Date.now();
      if (ms <= 0) return setLabel("expired");

      const totalMin = Math.floor(ms / 60000);
      const hours = Math.floor(totalMin / 60);
      const mins = totalMin % 60;

      if (hours >= 1) return setLabel(`expires in ${hours}h ${mins}m`);
      return setLabel(`expires in ${mins}m`);
    }

    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return <span>{label}</span>;
}
