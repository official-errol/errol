import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listFiles } from "@/lib/storage";

export async function GET() {
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

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const [publicFiles, privateFiles] = await Promise.all([
      listFiles("public-assets"),
      listFiles("private-files"),
    ]);

    const all = [...publicFiles, ...privateFiles];
    const totalBytes = all.reduce((sum, f) => sum + f.size, 0);

    return NextResponse.json({
      files: all,
      totalBytes,
      totalFiles: all.length,
      limitBytes: 1024 * 1024 * 1024,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "List failed" },
      { status: 500 },
    );
  }
}
