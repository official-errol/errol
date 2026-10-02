import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateToken, logShareEvent } from "@/lib/share";
import { hashPassword } from "@/lib/share-password";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  const body = await request.json();
  const { fileIds, visibility, title, expiresInHours, password } = body as {
    fileIds?: string[];
    visibility?: "public" | "authenticated";
    title?: string;
    expiresInHours?: number;
    password?: string;
  };

  if (!Array.isArray(fileIds) || fileIds.length === 0) {
    return NextResponse.json(
      { error: "Select at least one file" },
      { status: 400 },
    );
  }

  if (fileIds.length > 50) {
    return NextResponse.json(
      { error: "Max 50 files per share" },
      { status: 400 },
    );
  }

  if (password && password.length < 4) {
    return NextResponse.json(
      { error: "Password must be at least 4 characters" },
      { status: 400 },
    );
  }

  const vis = visibility === "public" ? "public" : "authenticated";
  const hours = Math.min(Math.max(expiresInHours ?? 24, 1), 24 * 30);

  const { data: files, error: filesError } = await supabase
    .from("files")
    .select("id, owner_id, visibility")
    .in("id", fileIds);

  if (filesError || !files || files.length !== fileIds.length) {
    return NextResponse.json({ error: "Files not found" }, { status: 404 });
  }

  for (const f of files) {
    if (!isAdmin && f.owner_id !== user.id) {
      return NextResponse.json(
        { error: "You can only share your own files" },
        { status: 403 },
      );
    }
    if (f.visibility === "private" && vis === "public") {
      return NextResponse.json(
        { error: "Private files cannot be in a public share" },
        { status: 400 },
      );
    }
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
  const passwordHash = password ? await hashPassword(password) : null;

  const { data: share, error: shareError } = await supabase
    .from("shares")
    .insert({
      token,
      created_by: user.id,
      visibility: vis,
      title: title?.trim() || null,
      expires_at: expiresAt,
      password_hash: passwordHash,
    })
    .select()
    .single();

  if (shareError || !share) {
    return NextResponse.json(
      { error: shareError?.message ?? "Could not create share" },
      { status: 500 },
    );
  }

  const rows = fileIds.map((file_id) => ({ share_id: share.id, file_id }));
  const { error: linkError } = await supabase.from("share_files").insert(rows);

  if (linkError) {
    await supabase.from("shares").delete().eq("id", share.id);
    return NextResponse.json({ error: linkError.message }, { status: 500 });
  }

  await logShareEvent(share.id, "created", { userId: user.id });

  return NextResponse.json({ share });
}
