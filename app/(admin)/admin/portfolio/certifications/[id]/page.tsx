import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { CertificationForm } from "@/components/admin/portfolio/certification-form";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit certification"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Certifications", href: "/admin/portfolio/certifications" },
          { label: data.name },
        ]}
      />
      <CertificationForm
        initial={{
          id: data.id,
          name: data.name,
          issuer: data.issuer ?? "",
          year: data.year ?? null,
          credential_id: data.credential_id ?? "",
          credential_url: data.credential_url ?? "",
          image_url: data.image_url ?? "",
          description: data.description ?? "",
          sort_order: data.sort_order,
        }}
      />
    </div>
  );
}
