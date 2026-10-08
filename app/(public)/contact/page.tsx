import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getSocialLinks } from "@/lib/portfolio";
import { resolveIcon } from "@/components/ui/icon-resolver";
import { ContactForm } from "@/components/contact/contact-form";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { MailIcon, MapPinIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Errol. Questions, project inquiries, or just saying hello.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/contact",
  },
};

export default async function ContactPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profile, socials] = await Promise.all([
    getProfile(),
    getSocialLinks(),
  ]);

  let defaultName = "";
  let defaultEmail = "";

  if (user) {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    defaultName = userProfile?.full_name ?? "";
    defaultEmail = user.email ?? "";
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Contact" }]}
        title="Contact"
        description="Have a project in mind, a question, or just want to say hi?"
      />

      <div className="space-y-4 mb-10">
        {profile?.email && (
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary"
          >
            <MailIcon />
            {profile.email}
          </a>
        )}
        {profile?.location && (
          <p className="flex items-center gap-3 text-sm text-text-secondary">
            <MapPinIcon />
            {profile.location}
          </p>
        )}
        {socials.length > 0 && (
          <div className="flex items-center gap-2 pt-2">
            {socials.map((s) => {
              const Icon = resolveIcon(s.icon_slug);
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="p-2 rounded-md border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {user && (
        <p className="text-xs text-text-tertiary mb-3">
          Signed in as {defaultName || defaultEmail}. You can still edit these
          fields before sending.
        </p>
      )}

      <ContactForm defaultName={defaultName} defaultEmail={defaultEmail} />
    </div>
  );
}
