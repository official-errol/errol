"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { EyeIcon, PencilIcon, TrashIcon } from "@/components/ui/icons";

type Post = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/posts/${target.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast(`Deleted "${target.title}"`, "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Write your first blog post to get started."
        action={
          <ButtonLink href="/admin/posts/new" size="sm">
            New post
          </ButtonLink>
        }
      />
    );
  }

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="text-sm text-text-primary">{post.title}</div>
                  <div className="text-xs text-text-tertiary font-mono">
                    /{post.slug}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {post.published ? (
                    <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-sm">
                      Published
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(post.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    {post.published && (
                      <ButtonLink
                        href={`/blog/${post.slug}`}
                        variant="ghost"
                        size="xs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!px-2"
                        title="View"
                      >
                        <EyeIcon />
                      </ButtonLink>
                    )}
                    <ButtonLink
                      href={`/admin/posts/${post.id}`}
                      variant="ghost"
                      size="xs"
                      className="!px-2"
                      title="Edit"
                    >
                      <PencilIcon />
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(post)}
                      className="!px-2 text-error hover:text-error hover:bg-error/10"
                      title="Delete"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete post?"
        description={
          target
            ? `"${target.title}" will be permanently removed. This cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setTarget(null)}
      />
    </>
  );
}
