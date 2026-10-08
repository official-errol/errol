import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/search/search-input";
import { getPreviewUrl } from "@/lib/storage";
import {
  FileTextIcon,
  FolderIcon,
  HardDriveIcon,
  CalendarIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across posts, projects, and files.",
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ q?: string }>;

type PostResult = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

type ProjectResult = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  tech_stack: string[];
};

type FileResult = {
  id: string;
  filename: string;
  description: string | null;
  size_bytes: number;
  mime_type: string;
  visibility: string;
  storage_key: string;
  created_at: string;
  previewUrl: string | null;
};

const PER_GROUP = 20;

function escapeForIlike(q: string): string {
  return q.replace(/[%_\\]/g, "\\$&");
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function SearchResults({ query }: { query: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let posts: PostResult[] = [];
  let projects: ProjectResult[] = [];
  let files: FileResult[] = [];

  if (query.length >= 2) {
    const pattern = `%${escapeForIlike(query)}%`;

    const [postsRes, projectsRes, filesRes] = await Promise.all([
      supabase
        .from("posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at")
        .eq("published", true)
        .or(
          `title.ilike.${pattern},excerpt.ilike.${pattern},content.ilike.${pattern}`,
        )
        .order("published_at", { ascending: false })
        .limit(PER_GROUP),

      supabase
        .from("projects")
        .select("id, slug, title, summary, cover_image_url, tech_stack")
        .eq("status", "published")
        .or(
          `title.ilike.${pattern},summary.ilike.${pattern},content.ilike.${pattern}`,
        )
        .order("created_at", { ascending: false })
        .limit(PER_GROUP),

      supabase
        .from("files")
        .select(
          "id, filename, description, size_bytes, mime_type, visibility, storage_key, created_at",
        )
        .or(`filename.ilike.${pattern},description.ilike.${pattern}`)
        .order("created_at", { ascending: false })
        .limit(PER_GROUP),
    ]);

    posts = (postsRes.data ?? []) as PostResult[];
    projects = (projectsRes.data ?? []) as ProjectResult[];

    const rawFiles = (filesRes.data ?? []) as Omit<FileResult, "previewUrl">[];
    const visibleFiles = rawFiles.filter((f) => {
      if (f.visibility === "public") return true;
      if (f.visibility === "authenticated") return Boolean(user);
      if (f.visibility === "private") return false;
      return false;
    });

    files = await Promise.all(
      visibleFiles.map(async (f) => {
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
  }

  const totalResults = posts.length + projects.length + files.length;
  const hasQuery = query.length >= 2;

  if (!hasQuery) {
    return (
      <EmptyState
        title="Start typing"
        description="Type at least 2 characters to search across posts, projects, and files."
      />
    );
  }

  if (totalResults === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        description="Try different keywords, or check the spelling."
      />
    );
  }

  return (
    <div className="space-y-10">
      <p className="text-sm text-text-secondary">
        {totalResults} result{totalResults === 1 ? "" : "s"} for{" "}
        <span className="text-text-primary font-medium">
          &ldquo;{query}&rdquo;
        </span>
      </p>

      {/* POSTS */}
      {posts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileTextIcon className="w-4 h-4 text-text-secondary" />
            <h2 className="text-sm uppercase tracking-wide text-text-secondary font-medium">
              Posts ({posts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-4 bg-surface border border-border rounded-lg p-4 hover:border-border-strong transition-colors"
              >
                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt=""
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-md border border-border object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-text-primary mb-1 truncate">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.published_at && (
                    <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FolderIcon className="w-4 h-4 text-text-secondary" />
            <h2 className="text-sm uppercase tracking-wide text-text-secondary font-medium">
              Projects ({projects.length})
            </h2>
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="flex gap-4 bg-surface border border-border rounded-lg p-4 hover:border-border-strong transition-colors"
              >
                {project.cover_image_url && (
                  <img
                    src={project.cover_image_url}
                    alt=""
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-md border border-border object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-text-primary mb-1 truncate">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FILES */}
      {files.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <HardDriveIcon className="w-4 h-4 text-text-secondary" />
            <h2 className="text-sm uppercase tracking-wide text-text-secondary font-medium">
              Files ({files.length})
            </h2>
          </div>
          <div className="space-y-3">
            {files.map((file) => (
              <a
                key={file.id}
                href={`/api/storage/download?id=${file.id}`}
                className="flex items-center gap-4 bg-surface border border-border rounded-lg p-4 hover:border-border-strong transition-colors"
              >
                {file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt=""
                    className="w-16 h-16 rounded-md border border-border object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md border border-border bg-surface-subtle flex items-center justify-center shrink-0">
                    <HardDriveIcon className="w-5 h-5 text-text-tertiary" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-text-primary truncate">
                    {file.filename}
                  </p>
                  {file.description && (
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                      {file.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-text-tertiary mt-1.5">
                    <span>{formatBytes(file.size_bytes)}</span>
                    <span>·</span>
                    <span>{file.visibility}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-lg p-4 animate-pulse flex gap-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-surface-subtle shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-4 w-1/3 bg-surface-subtle rounded mb-2" />
            <div className="h-3 w-full bg-surface-subtle rounded mb-1" />
            <div className="h-3 w-2/3 bg-surface-subtle rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawQuery = (params.q ?? "").trim();
  const query = rawQuery.slice(0, 100);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Search" }]}
        title="Search"
        description="Find posts, projects, and files."
      />

      <SearchInput initialValue={query} />

      <Suspense key={query} fallback={<SearchSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
