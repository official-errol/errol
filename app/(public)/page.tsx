import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  getProfile,
  getExperiences,
  getEducation,
  getCertifications,
  getAwards,
  getSkillCategories,
  getSkills,
  getSocialLinks,
} from "@/lib/portfolio";
import { resolveIcon } from "@/components/ui/icon-resolver";
import {
  BriefcaseIcon,
  GraduationIcon,
  CodeIcon,
  MapPinIcon,
  MailIcon,
  CalendarIcon,
  DownloadIcon,
  CertificateIcon,
  TrophyIcon,
  ExternalIcon,
} from "@/components/ui/icons";
import { ProjectCard } from "@/components/projects/project-card";
import { PostCard } from "@/components/blog/post-card";
import { SectionPattern } from "@/components/ui/section-pattern";
import { Metadata } from "next";
import { getReadingTime } from "@/lib/reading-time";
import { PixelCharacter } from "@/components/character/pixel-character";

function formatRange(
  start: string | null,
  end: string | null,
  current?: boolean,
) {
  const year = (d: string) => new Date(d).getFullYear().toString();
  if (!start && !end) return "";
  if (start && (current || !end)) return `${year(start)} — Present`;
  if (start && end) return `${year(start)} — ${year(end)}`;
  return end ? year(end) : "";
}

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-10" data-character-ignore>
      <h2 className="flex items-center gap-2.5 text-2xl md:text-3xl font-semibold text-text-primary">
        <Icon className="w-5 h-5 text-text-secondary" />
        {title}
      </h2>
      {action}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Errol — Developer, Builder, Problem Solver",
  description:
    "Portfolio, projects, and writing by Errol. A personal workshop for things worth building.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app",
  },
};

export default async function PortfolioPage() {
  const supabase = await createClient();

  const [
    profile,
    experiences,
    education,
    certifications,
    awards,
    categories,
    skills,
    socials,
    featuredProjects,
    latestPosts,
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getEducation(),
    getCertifications(),
    getAwards(),
    getSkillCategories(),
    getSkills(),
    getSocialLinks(),
    supabase
      .from("projects")
      .select("id, slug, title, summary, cover_image_url, tech_stack, live_url")
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: false })
      .limit(3),
    supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, content, cover_image_url, published_at, tags",
      )
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3),
  ]);

  const availabilityMeta = profile
    ? {
        available: { label: "Available for work", dot: "bg-success" },
        open: { label: "Open to opportunities", dot: "bg-accent" },
        unavailable: { label: "Not looking", dot: "bg-text-tertiary" },
      }[profile.availability]
    : null;

  const hasSkills = categories.some((cat) =>
    skills.some((s) => s.category_id === cat.id),
  );

  const latestPostIds = (latestPosts.data ?? []).map((p) => p.id);
  const latestCommentCounts: Record<string, number> = {};
  const latestReactionCounts: Record<
    string,
    { like: number; heart: number; fire: number }
  > = {};

  if (latestPostIds.length > 0) {
    const [cRes, rRes] = await Promise.all([
      supabase.from("comments").select("post_id").in("post_id", latestPostIds),
      supabase
        .from("reactions")
        .select("post_id, kind")
        .in("post_id", latestPostIds),
    ]);

    for (const c of cRes.data ?? []) {
      latestCommentCounts[c.post_id] =
        (latestCommentCounts[c.post_id] ?? 0) + 1;
    }

    for (const r of rRes.data ?? []) {
      if (!latestReactionCounts[r.post_id]) {
        latestReactionCounts[r.post_id] = { like: 0, heart: 0, fire: 0 };
      }
      const kind = r.kind as "like" | "heart" | "fire";
      if (kind in latestReactionCounts[r.post_id]) {
        latestReactionCounts[r.post_id][kind]++;
      }
    }
  }

  return (
    <>
      <PixelCharacter />
      {/* ───────────────────────────────── HERO — dots */}
      <SectionPattern pattern="dots">
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                {availabilityMeta && (
                  <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-surface border border-border mb-5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${availabilityMeta.dot}`}
                    />
                    <span className="text-text-secondary">
                      {profile?.availability_note ?? availabilityMeta.label}
                    </span>
                  </div>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.05] tracking-tight mb-4">
                  {profile?.name ?? "Your Name"}
                </h1>

                {profile?.headline && (
                  <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-6">
                    {profile.headline}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary mb-8">
                  {profile?.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon /> {profile.location}
                    </span>
                  )}
                  {profile?.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors"
                    >
                      <MailIcon /> {profile.email}
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    data-character-target
                    className="px-5 py-2.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
                  >
                    Get in touch
                  </Link>
                  {profile?.resume_url && (
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-character-target
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
                    >
                      <DownloadIcon /> Resume
                    </a>
                  )}
                </div>

                {socials.length > 0 && (
                  <div className="flex items-center gap-2 mt-8">
                    {socials.map((s) => {
                      const Icon = resolveIcon(s.icon_slug);
                      return (
                        <a
                          key={s.id}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={s.label}
                          data-character-target
                          className="p-2 rounded-md border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {profile?.avatar_url && (
                <div className="md:order-last justify-self-start md:justify-self-end">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    data-character-target
                    className="w-32 h-32 md:w-56 md:h-56 rounded-full border border-border object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </SectionPattern>

      {/* ───────────────────────────────── ABOUT — none */}
      {profile?.bio && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
                {profile.bio}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────── EXPERIENCE — grid */}
      {experiences.length > 0 && (
        <SectionPattern pattern="grid">
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeader icon={BriefcaseIcon} title="Experience" />

              <div className="space-y-10">
                {experiences.map((exp, i) => (
                  <div
                    key={exp.id}
                    className="relative pl-8"
                    data-character-target
                  >
                    <div
                      className="absolute left-0 top-[7px] w-2.5 h-2.5 rounded-full border-2 border-accent bg-background"
                      data-character-ignore
                    />
                    {i < experiences.length - 1 && (
                      <div
                        className="absolute left-[4px] top-[26px] bottom-[-2.5rem] w-px bg-border"
                        data-character-ignore
                      />
                    )}

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {formatRange(exp.start_date, exp.end_date, exp.current)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mb-3">
                      <span>
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary">
                          <MapPinIcon className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionPattern>
      )}

      {/* ───────────────────────────────── EDUCATION — none */}
      {education.length > 0 && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader icon={GraduationIcon} title="Education" />

            <div className="space-y-10">
              {education.map((ed, i) => (
                <div
                  key={ed.id}
                  className="relative pl-8"
                  data-character-target
                >
                  <div
                    className="absolute left-0 top-[7px] w-2.5 h-2.5 rounded-full border-2 border-accent bg-background"
                    data-character-ignore
                  />
                  {i < education.length - 1 && (
                    <div
                      className="absolute left-[4px] top-[26px] bottom-[-2.5rem] w-px bg-border"
                      data-character-ignore
                    />
                  )}

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {ed.degree}
                      {ed.field && `, ${ed.field}`}
                    </h3>
                    {ed.year_graduated && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Graduated {ed.year_graduated}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mb-3">
                    <span>
                      {ed.url ? (
                        <a
                          href={ed.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {ed.school}
                        </a>
                      ) : (
                        ed.school
                      )}
                    </span>
                    {ed.location && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        {ed.location}
                      </span>
                    )}
                  </div>

                  {ed.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {ed.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────── CERTIFICATIONS — stripes */}
      {certifications.length > 0 && (
        <SectionPattern pattern="stripes">
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeader icon={CertificateIcon} title="Certifications" />

              <div className="space-y-10">
                {certifications.map((cert, i) => {
                  const hasImage = Boolean(cert.image_url);
                  return (
                    <div
                      key={cert.id}
                      className="relative pl-8"
                      data-character-target
                    >
                      <div
                        className={`absolute left-0 w-2.5 h-2.5 -mt-1 rounded-full border-2 border-accent bg-background ${
                          hasImage ? "top-[1.75rem]" : "top-[0.625rem]"
                        }`}
                        data-character-ignore
                      />
                      {i < certifications.length - 1 && (
                        <div
                          className={`absolute left-[4px] bottom-[-2.5rem] w-px bg-border ${
                            hasImage ? "top-[2rem]" : "top-[0.875rem]"
                          }`}
                          data-character-ignore
                        />
                      )}

                      <div
                        className={`flex items-start ${
                          hasImage ? "gap-4" : ""
                        }`}
                      >
                        {cert.image_url && (
                          <img
                            src={cert.image_url}
                            alt=""
                            className="w-16 h-16 rounded-md border border-border object-cover shrink-0"
                          />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                            <h3 className="text-lg font-semibold text-text-primary">
                              {cert.name}
                            </h3>
                            {cert.year && (
                              <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                {cert.year}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mb-2">
                            {cert.issuer && <span>{cert.issuer}</span>}
                            {cert.credential_url && (
                              <a
                                href={cert.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                              >
                                Verify credential
                                <ExternalIcon className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {cert.description && (
                            <p className="text-sm text-text-secondary leading-relaxed">
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </SectionPattern>
      )}

      {/* ───────────────────────────────── AWARDS — none */}
      {awards.length > 0 && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader icon={TrophyIcon} title="Awards" />

            <div className="space-y-10">
              {awards.map((award, i) => {
                const hasImage = Boolean(award.image_url);
                return (
                  <div
                    key={award.id}
                    className="relative pl-8"
                    data-character-target
                  >
                    <div
                      className={`absolute left-0 w-2.5 h-2.5 -mt-1 rounded-full border-2 border-accent bg-background ${
                        hasImage ? "top-[1.75rem]" : "top-[0.625rem]"
                      }`}
                      data-character-ignore
                    />
                    {i < awards.length - 1 && (
                      <div
                        className={`absolute left-[4px] bottom-[-2.5rem] w-px bg-border ${
                          hasImage ? "top-[2rem]" : "top-[0.875rem]"
                        }`}
                        data-character-ignore
                      />
                    )}

                    <div
                      className={`flex items-start ${hasImage ? "gap-4" : ""}`}
                    >
                      {award.image_url && (
                        <img
                          src={award.image_url}
                          alt=""
                          className="w-16 h-16 rounded-md border border-border object-cover shrink-0"
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {award.title}
                          </h3>
                          {award.year && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
                              <CalendarIcon className="w-3.5 h-3.5" />
                              {award.year}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mb-2">
                          {award.issuer && <span>{award.issuer}</span>}
                          {award.url && (
                            <a
                              href={award.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                            >
                              Details
                              <ExternalIcon className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {award.description && (
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {award.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────── SKILLS — cross */}
      {hasSkills && (
        <SectionPattern pattern="cross">
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeader icon={CodeIcon} title="Skills" />

              <div className="grid gap-8 md:grid-cols-2">
                {categories.map((cat) => {
                  const catSkills = skills.filter(
                    (s) => s.category_id === cat.id,
                  );
                  if (catSkills.length === 0) return null;

                  return (
                    <div key={cat.id}>
                      <h3 className="text-sm font-medium text-text-primary mb-3">
                        {cat.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {catSkills.map((skill) => {
                          const Icon = skill.icon_slug
                            ? resolveIcon(skill.icon_slug)
                            : null;
                          return (
                            <span
                              key={skill.id}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-surface border border-border rounded-md text-text-primary font-mono"
                              data-character-target
                            >
                              {Icon && (
                                <Icon className="w-3.5 h-3.5 text-text-secondary shrink-0" />
                              )}
                              <span className="truncate">{skill.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </SectionPattern>
      )}

      {/* ───────────────────────────────── FEATURED PROJECTS — none */}
      {featuredProjects.data && featuredProjects.data.length > 0 && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              icon={CodeIcon}
              title="Featured projects"
              action={
                <Link
                  href="/projects"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors shrink-0"
                >
                  All projects →
                </Link>
              }
            />

            <div className="grid gap-6 md:grid-cols-3">
              {featuredProjects.data.map((project) => (
                <div key={project.id} data-character-target>
                  <ProjectCard
                    project={{
                      id: project.id,
                      slug: project.slug,
                      title: project.title,
                      summary: project.summary,
                      cover_image_url: project.cover_image_url,
                      tech_stack: project.tech_stack ?? [],
                      featured: true,
                      live_url: project.live_url,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────── LATEST POSTS — waves */}
      {latestPosts.data && latestPosts.data.length > 0 && (
        <SectionPattern pattern="waves">
          <section className="py-20 pb-24">
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeader
                icon={CalendarIcon}
                title="Recent posts"
                action={
                  <Link
                    href="/blog"
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors shrink-0"
                  >
                    All posts →
                  </Link>
                }
              />

              <div className="grid gap-6 md:grid-cols-3">
                {latestPosts.data.map((post) => (
                  <div key={post.id} data-character-target>
                    <PostCard
                      post={{
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        excerpt: post.excerpt,
                        cover_image_url: post.cover_image_url,
                        published_at: post.published_at,
                        reading_minutes: getReadingTime(post.content),
                        comment_count: latestCommentCounts[post.id] ?? 0,
                        reactions: latestReactionCounts[post.id],
                        tags: post.tags ?? [],
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionPattern>
      )}
    </>
  );
}
