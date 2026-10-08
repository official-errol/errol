import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  getShareByToken,
  incrementShareView,
  logShareEvent,
} from "@/lib/share";
import { getPreviewUrl } from "@/lib/storage";
import { FilePreview } from "@/components/files/file-preview";
import { SharePasswordForm } from "@/components/share/share-password-form";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";

export const metadata = {
  title: "Shared files",
  robots: { index: false, follow: false },
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const share = await getShareByToken(token);

  if (!share) notFound();

  if (share.password_hash) {
    const cookieStore = await cookies();
    const cookieName = `share_pass_${share.id}`;
    const passed = cookieStore.get(cookieName)?.value === "ok";

    if (!passed) {
      return (
        <div className="max-w-md mx-auto px-6 py-24">
          <SharePasswordForm token={token} title={share.title} />
        </div>
      );
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (share.visibility === "authenticated" && !user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-3">
          Sign in to view this share
        </h1>
        <p className="text-text-secondary mb-8">
          This shared bundle is only available to logged-in users.
        </p>
        <SignInPrompt message="to view this share" inline />
      </div>
    );
  }

  void logShareEvent(share.id, "view", { userId: user?.id ?? undefined });
  void incrementShareView(share.id);

  const filesWithPreviews = await Promise.all(
    share.files.map(async (f) => {
      const bucket =
        f.visibility === "public" ? "public-assets" : "private-files";
      const previewUrl = await getPreviewUrl(
        bucket,
        f.storage_key,
        f.mime_type,
      );
      return { ...f, previewUrl };
    }),
  );

  const totalBytes = share.files.reduce((sum, f) => sum + f.size_bytes, 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-wide text-text-tertiary mb-2">
          Shared bundle
        </p>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {share.title ?? "Shared files"}
        </h1>
        <p className="text-sm text-text-secondary">
          {share.files.length} file{share.files.length === 1 ? "" : "s"} ·{" "}
          {formatBytes(totalBytes)}
        </p>
      </div>

      {share.files.length === 0 ? (
        <p className="text-text-secondary">This share is empty.</p>
      ) : (
        <div className="space-y-3">
          {filesWithPreviews.map((file) => (
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
                  {formatBytes(file.size_bytes)}
                </p>
              </div>
              <a
                href={`/api/share/${token}/download/${file.id}`}
                className="shrink-0 px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
