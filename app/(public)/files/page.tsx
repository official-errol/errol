import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPreviewUrl } from "@/lib/storage";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { FilePreview } from "@/components/files/file-preview";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";

export const metadata: Metadata = {
  title: "Files",
  description:
    "Shared downloads and resources from Errol. Documents, tools, and files available for public or authenticated download.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/files",
  },
};

type FileRecord = {
  id: string;
  filename: string;
  size_bytes: number;
  mime_type: string;
  visibility: string;
  description: string | null;
  created_at: string;
  previewUrl: string | null;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export default async function FilesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("files")
    .select(
      "id, filename, size_bytes, mime_type, visibility, description, created_at, storage_key",
    )
    .order("created_at", { ascending: false });

  const rawFiles = data ?? [];

  const files: FileRecord[] = await Promise.all(
    rawFiles.map(async (f) => {
      const bucket =
        f.visibility === "public" ? "public-assets" : "private-files";
      const previewUrl = await getPreviewUrl(
        bucket,
        f.storage_key,
        f.mime_type,
      );
      return {
        id: f.id,
        filename: f.filename,
        size_bytes: f.size_bytes,
        mime_type: f.mime_type,
        visibility: f.visibility,
        description: f.description,
        created_at: f.created_at,
        previewUrl,
      };
    }),
  );

  const hasLocked = files.some((f) => f.visibility !== "public");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Files" }]}
        title="Files"
        description="Shared downloads."
      />

      {!user && hasLocked && (
        <SignInPrompt message="to access authenticated files" />
      )}

      {files.length === 0 ? (
        <EmptyState
          title="No files shared yet"
          description="Uploads from the admin panel will appear here."
        />
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-surface border border-border rounded-lg p-4 flex items-center gap-4"
            >
              <FilePreview
                mimeType={file.mime_type}
                previewUrl={file.previewUrl}
                filename={file.filename}
                size="md"
              />

              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm text-text-primary truncate">
                  {file.filename}
                </p>
                {file.description && (
                  <p className="text-xs text-text-secondary mt-1">
                    {file.description}
                  </p>
                )}
                <p className="text-xs text-text-tertiary mt-1">
                  {formatBytes(file.size_bytes)} · {file.visibility}
                </p>
              </div>

              <ButtonLink
                href={`/api/storage/download?id=${file.id}`}
                size="sm"
              >
                <DownloadIcon />
                Download
              </ButtonLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
