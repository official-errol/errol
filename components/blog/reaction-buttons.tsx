"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/components/auth/login-dialog-provider";

type Kind = "like" | "heart" | "fire";

const KIND_META: Record<Kind, { label: string; emoji: string }> = {
  like: { label: "Like", emoji: "👍" },
  heart: { label: "Heart", emoji: "❤️" },
  fire: { label: "Fire", emoji: "🔥" },
};

const KINDS: Kind[] = ["like", "heart", "fire"];

type Props = {
  postId: string;
  reactions: { kind: string; user_id: string }[];
  userId: string | null;
};

export function ReactionButtons({ postId, reactions, userId }: Props) {
  const router = useRouter();
  const { openLogin } = useLogin();
  const [pending, setPending] = useState<Kind | null>(null);

  const counts: Record<Kind, number> = { like: 0, heart: 0, fire: 0 };
  const mine: Record<Kind, boolean> = {
    like: false,
    heart: false,
    fire: false,
  };

  for (const r of reactions) {
    const k = r.kind as Kind;
    if (k in counts) {
      counts[k]++;
      if (r.user_id === userId) mine[k] = true;
    }
  }

  async function toggle(kind: Kind) {
    if (!userId) {
      openLogin();
      return;
    }
    if (pending) return;

    setPending(kind);

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          kind,
          action: mine[kind] ? "remove" : "add",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex gap-2">
      {KINDS.map((kind) => {
        const active = mine[kind];
        return (
          <button
            key={kind}
            onClick={() => toggle(kind)}
            disabled={pending === kind}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-colors ${
              active
                ? "bg-accent-subtle border-accent text-accent"
                : "bg-surface border-border text-text-secondary hover:border-border-strong"
            } disabled:opacity-50`}
          >
            <span>{KIND_META[kind].emoji}</span>
            <span>{counts[kind]}</span>
          </button>
        );
      })}
    </div>
  );
}
