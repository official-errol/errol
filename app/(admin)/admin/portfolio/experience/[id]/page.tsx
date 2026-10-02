import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ExperienceForm } from "@/components/admin/portfolio/experience-form";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit experience"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Experience", href: "/admin/portfolio/experience" },
          { label: data.role },
        ]}
      />
      <ExperienceForm
        initial={{
          id: data.id,
          company: data.company,
          role: data.role,
          location: data.location ?? "",
          start_date: data.start_date,
          end_date: data.end_date ?? "",
          current: data.current,
          description: data.description ?? "",
          url: data.url ?? "",
          sort_order: data.sort_order,
        }}
      />
    </div>
  );
}
