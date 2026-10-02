import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit, identifierForUser, RULES } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = await checkRateLimit(identifierForUser(user.id), RULES.comment);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many comments. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  const body = await request.json();
  const { postId, parentId, content } = body as {
    postId?: string;
    parentId?: string | null;
    content?: string;
  };

  if (!postId || !content?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const trimmed = content.trim();
  if (trimmed.length < 1 || trimmed.length > 2000) {
    return NextResponse.json({ error: "Invalid length" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: user.id,
      parent_id: parentId ?? null,
      content: trimmed,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data });
}
