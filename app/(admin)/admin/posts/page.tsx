import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PostList } from "@/components/admin/post-list";
import { PlusIcon } from "@/components/ui/icons";

export default async function AdminPostsPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, published, published_at, created_at, updated_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Posts"
        description="Write, edit, and publish blog posts."
        action={
          <ButtonLink href="/admin/posts/new">
            <PlusIcon />
            New post
          </ButtonLink>
        }
      />

      <PostList posts={posts ?? []} />
    </div>
  );
}
