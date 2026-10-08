import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { AwardForm } from "@/components/admin/portfolio/award-form";

export default async function EditAwardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("awards")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit award"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Awards", href: "/admin/portfolio/awards" },
          { label: data.title },
        ]}
      />
      <AwardForm
        initial={{
          id: data.id,
          title: data.title,
          issuer: data.issuer ?? "",
          year: data.year ?? null,
          description: data.description ?? "",
          url: data.url ?? "",
          image_url: data.image_url ?? "",
          sort_order: data.sort_order,
        }}
      />
    </div>
  );
}
