import { PageHeader } from "@/components/ui/page-header";
import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New post"
        description="Write in Markdown. Save as draft or publish immediately."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Posts", href: "/admin/posts" },
          { label: "New" },
        ]}
      />

      <PostForm />
    </div>
  );
}
