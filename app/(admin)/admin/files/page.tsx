import { createClient } from "@/lib/supabase/server";
import { getPreviewUrl } from "@/lib/storage";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { FileList } from "@/components/admin/file-list";
import { StorageUsage } from "@/components/admin/storage-usage";
import { CreateShareButton } from "@/components/admin/create-share-button";
import { UploadDialog } from "@/components/admin/upload-dialog";
import { UploadIcon } from "@/components/ui/icons";

const STORAGE_LIMIT_BYTES = 1024 * 1024 * 1024;

export default async function AdminFilesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("files")
    .select(
      "id, filename, storage_key, size_bytes, mime_type, visibility, description, created_at",
    )
    .order("created_at", { ascending: false });

  const rawFiles = data ?? [];

  const files = await Promise.all(
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
        storage_key: f.storage_key,
        size_bytes: f.size_bytes,
        mime_type: f.mime_type,
        visibility: f.visibility,
        description: f.description,
        created_at: f.created_at,
        bucket,
        previewUrl,
      };
    }),
  );

  const totalBytes = files.reduce((sum, f) => sum + f.size_bytes, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Files"
        description="Upload, manage, and monitor storage usage."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Files" }]}
        action={
          <div className="flex gap-2 w-full sm:w-auto sm:justify-end">
            <CreateShareButton
              files={files.map((f) => ({
                id: f.id,
                filename: f.filename,
                size_bytes: f.size_bytes,
                visibility: f.visibility,
              }))}
            />
            <UploadDialog
              trigger={
                <Button>
                  <UploadIcon />
                  Upload file
                </Button>
              }
            />
          </div>
        }
      />

      <StorageUsage totalBytes={totalBytes} limitBytes={STORAGE_LIMIT_BYTES} />

      <FileList files={files} />
    </div>
  );
}
