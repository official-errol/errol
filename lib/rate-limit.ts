import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

type Rule = {
  action: string;
  limit: number;
  windowSeconds: number;
};

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export function hashIp(ip: string): string {
  const secret = process.env.RATE_LIMIT_SECRET ?? "default-dev-secret";
  return createHash("sha256")
    .update(`${ip}:${secret}`)
    .digest("hex")
    .slice(0, 32);
}

export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function identifierForUser(userId: string): string {
  return `user:${userId}`;
}

export function identifierForIp(ip: string): string {
  return `ip:${hashIp(ip)}`;
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; remaining: 0; retryAfterSeconds: number };

export async function checkRateLimit(
  identifier: string,
  rule: Rule,
): Promise<RateLimitResult> {
  const supabase = getAdminClient();
  const since = new Date(Date.now() - rule.windowSeconds * 1000).toISOString();

  const { count, error } = await supabase
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("identifier", identifier)
    .eq("action", rule.action)
    .gte("created_at", since);

  if (error) {
    console.error("[rate-limit] query failed:", error.message);
    return { ok: true, remaining: rule.limit };
  }

  const used = count ?? 0;

  if (used >= rule.limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: rule.windowSeconds,
    };
  }

  await supabase.from("rate_limits").insert({
    identifier,
    action: rule.action,
  });

  if (Math.random() < 0.01) {
    void supabase.rpc("cleanup_rate_limits");
  }

  return { ok: true, remaining: rule.limit - used - 1 };
}

export const RULES = {
  comment: { action: "comment", limit: 10, windowSeconds: 60 * 60 } as Rule,
  reaction: { action: "reaction", limit: 60, windowSeconds: 60 * 60 } as Rule,
  download: { action: "download", limit: 60, windowSeconds: 60 * 60 } as Rule,
};
