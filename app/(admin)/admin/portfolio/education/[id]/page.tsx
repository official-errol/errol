import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { EducationForm } from "@/components/admin/portfolio/education-form";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("education")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit education"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Education", href: "/admin/portfolio/education" },
          { label: data.school },
        ]}
      />
      <EducationForm
        initial={{
          id: data.id,
          school: data.school,
          degree: data.degree ?? "",
          field: data.field ?? "",
          location: data.location ?? "",
          start_date: data.start_date ?? "",
          end_date: data.end_date ?? "",
          description: data.description ?? "",
          url: data.url ?? "",
          sort_order: data.sort_order,
        }}
      />
    </div>
  );
}
