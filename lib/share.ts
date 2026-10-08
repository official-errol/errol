import { createClient as createAdminClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";
import { verifyPassword } from "./share-password";

const TOKEN_BYTES = 32;

export function generateToken(): string {
  return randomBytes(TOKEN_BYTES)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export type ShareRecord = {
  id: string;
  token: string;
  created_by: string;
  visibility: "public" | "authenticated";
  title: string | null;
  view_count: number;
  download_count: number;
  revoked: boolean;
  created_at: string;
  password_hash: string | null;
};

export type ShareWithFiles = ShareRecord & {
  files: {
    id: string;
    filename: string;
    size_bytes: number;
    mime_type: string;
    storage_key: string;
    visibility: string;
    description: string | null;
  }[];
};

export async function getShareByToken(
  token: string,
): Promise<ShareWithFiles | null> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;

  const supabase = getAdminClient();

  const { data: share, error } = await supabase
    .from("shares")
    .select(
      "id, token, created_by, visibility, title, view_count, download_count, revoked, created_at, password_hash",
    )
    .eq("token", token)
    .eq("revoked", false)
    .single();

  if (error || !share) return null;

  const { data: links } = await supabase
    .from("share_files")
    .select("file_id")
    .eq("share_id", share.id);

  if (!links || links.length === 0) {
    return { ...share, files: [] };
  }

  const fileIds = links.map((l) => l.file_id);

  const { data: files } = await supabase
    .from("files")
    .select(
      "id, filename, size_bytes, mime_type, storage_key, visibility, description",
    )
    .in("id", fileIds);

  return { ...share, files: files ?? [] };
}

export async function verifySharePassword(
  share: ShareRecord,
  password: string | null,
): Promise<boolean> {
  if (!share.password_hash) return true;
  if (!password) return false;
  return verifyPassword(password, share.password_hash);
}

export async function logShareEvent(
  shareId: string,
  eventType: "view" | "download" | "created" | "revoked" | "expired",
  options: { fileId?: string; userId?: string; ipHash?: string } = {},
): Promise<void> {
  const supabase = getAdminClient();
  await supabase.from("share_events").insert({
    share_id: shareId,
    event_type: eventType,
    file_id: options.fileId ?? null,
    user_id: options.userId ?? null,
    ip_hash: options.ipHash ?? null,
  });
}

export async function incrementShareView(shareId: string): Promise<void> {
  const supabase = getAdminClient();
  await supabase.rpc("increment_share_view", { share_id: shareId });
}

export async function incrementShareDownload(shareId: string): Promise<void> {
  const supabase = getAdminClient();
  await supabase.rpc("increment_share_download", { share_id: shareId });
}
