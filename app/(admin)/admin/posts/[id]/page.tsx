import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, content, cover_image_url, published")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit post"
        description="Changes go live immediately when published."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Posts", href: "/admin/posts" },
          { label: post.title },
        ]}
      />

      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          cover_image_url: post.cover_image_url ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
