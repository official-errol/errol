import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKETS, type StorageFile, type UploadResult } from "./types";

const SIGNED_URL_EXPIRY_SECONDS = 60 * 60;

export function pickBucket(visibility: "public" | "authenticated" | "private") {
  return visibility === "public"
    ? STORAGE_BUCKETS.public
    : STORAGE_BUCKETS.private;
}

export function buildStorageKey(filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);
  return `${timestamp}-${random}-${safe}`;
}

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
): Promise<UploadResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return {
    path: data.path,
    bucket,
    fullPath: `${bucket}/${data.path}`,
  };
}

export async function getSignedDownloadUrl(
  bucket: string,
  path: string,
  filename?: string,
): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS, {
      download: filename ?? true,
    });

  if (error) throw error;
  return data.signedUrl;
}

export function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

export async function listFiles(bucket: string): Promise<StorageFile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .list("", { limit: 1000, sortBy: { column: "created_at", order: "desc" } });

  if (error) throw error;

  return (data ?? []).map((item) => ({
    id: item.id ?? "",
    name: item.name,
    size: item.metadata?.size ?? 0,
    mimeType: item.metadata?.mimetype ?? "application/octet-stream",
    createdAt: item.created_at ?? "",
    updatedAt: item.updated_at ?? "",
    bucket,
  }));
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export async function getPreviewUrl(
  bucket: string,
  path: string,
  mimeType: string,
): Promise<string | null> {
  if (!mimeType.startsWith("image/")) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  if (bucket === "public-assets") {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 60);

  if (error) return null;
  return data.signedUrl;
}
