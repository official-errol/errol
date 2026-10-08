import { createClient } from "@/lib/supabase/server";

export type PortfolioProfile = {
  id: string;
  name: string;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  email: string | null;
  resume_url: string | null;
  availability: "available" | "open" | "unavailable";
  availability_note: string | null;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
  url: string | null;
  sort_order: number;
};

export type Education = {
  id: string;
  school: string;
  degree: string | null;
  field: string | null;
  location: string | null;
  year_graduated: number | null;
  description: string | null;
  url: string | null;
  sort_order: number;
};

export type SkillCategory = {
  id: string;
  name: string;
  sort_order: number;
};

export type Skill = {
  id: string;
  category_id: string | null;
  name: string;
  proficiency: number;
  icon_slug: string | null;
  sort_order: number;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon_slug: string;
  sort_order: number;
};

export async function getProfile(): Promise<PortfolioProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_profile")
    .select("*")
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("start_date", { ascending: false });
  return data ?? [];
}

export async function getEducation(): Promise<Education[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("start_date", { ascending: false });
  return data ?? [];
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: false });
  return data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: false });
  return data ?? [];
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: false });
  return data ?? [];
}

export type Certification = {
  id: string;
  name: string;
  issuer: string | null;
  year: number | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  sort_order: number;
};

export type Award = {
  id: string;
  title: string;
  issuer: string | null;
  year: number | null;
  description: string | null;
  url: string | null;
  image_url: string | null;
  sort_order: number;
};

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false });
  return data ?? [];
}

export async function getAwards(): Promise<Award[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("awards")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false });
  return data ?? [];
}
