"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "@/components/ui/icons";

type Post = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
      {/* Desktop table */}
      <div className="hidden md:block bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium w-20">Cover</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-border">
                <td className="px-4 py-3 align-top">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt=""
                      className="w-12 h-12 rounded-md border border-border object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-surface-subtle border border-border" />
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="text-sm text-text-primary">{post.title}</div>
                  <div className="text-xs text-text-tertiary font-mono mt-0.5">
                    /{post.slug}
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 bg-surface-subtle text-text-tertiary rounded-sm font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="text-xs text-text-tertiary px-1.5 py-0.5">
                          +{post.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
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
                <td className="px-4 py-3 text-sm text-text-secondary align-top">
                  {formatDate(post.updated_at)}
                </td>
                <td className="px-4 py-3 align-top">
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

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-surface border border-border rounded-lg overflow-hidden"
          >
            {post.cover_image_url && (
              <img
                src={post.cover_image_url}
                alt=""
                className="w-full aspect-video object-cover border-b border-border"
              />
            )}

            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {post.title}
                  </h3>
                  {post.published ? (
                    <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-sm shrink-0">
                      Published
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm shrink-0">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-tertiary font-mono truncate">
                  /{post.slug}
                </p>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 bg-surface-subtle text-text-tertiary rounded-sm font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 4 && (
                    <span className="text-xs text-text-tertiary px-1.5 py-0.5">
                      +{post.tags.length - 4}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <CalendarIcon className="w-3.5 h-3.5" />
                {formatDate(post.updated_at)}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                {post.published && (
                  <ButtonLink
                    href={`/blog/${post.slug}`}
                    variant="ghost"
                    size="xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EyeIcon />
                    View
                  </ButtonLink>
                )}
                <ButtonLink
                  href={`/admin/posts/${post.id}`}
                  variant="ghost"
                  size="xs"
                >
                  <PencilIcon />
                  Edit
                </ButtonLink>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setTarget(post)}
                  className="ml-auto text-error hover:text-error hover:bg-error/10"
                >
                  <TrashIcon />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
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
