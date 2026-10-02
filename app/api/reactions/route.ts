import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, identifierForUser, RULES } from "@/lib/rate-limit";

const VALID_KINDS = ["like", "heart", "fire"] as const;
type Kind = (typeof VALID_KINDS)[number];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { postId, kind, action } = body as {
    postId?: string;
    kind?: string;
    action?: "add" | "remove";
  };

  if (!postId || !kind || !VALID_KINDS.includes(kind as Kind)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (action !== "remove") {
    const rate = await checkRateLimit(
      identifierForUser(user.id),
      RULES.reaction,
    );
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Slow down." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        },
      );
    }
  }

  if (action === "remove") {
    const { error } = await supabase
      .from("reactions")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .eq("kind", kind);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("reactions")
    .insert({ post_id: postId, user_id: user.id, kind });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
