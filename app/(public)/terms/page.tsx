import type { Metadata } from "next";
import { PublicPageHeader } from "@/components/ui/public-page-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using Errol — what the site is, what you can post, and how disputes are handled.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[
          { label: "Portfolio", href: "/" },
          { label: "Terms of Service" },
        ]}
        title="Terms of Service"
        description="Last updated: October 2026"
      />

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          These terms govern your use of Errol (the &quot;site&quot;). By
          visiting or using the site, you agree to them. If you do not agree,
          please do not use the site.
        </p>

        <h2>What this site is</h2>

        <p>
          Errol is a personal platform. It hosts my portfolio, blog, shared
          files, and a small set of interactive features (comments, reactions,
          and contact form). It is not a commercial service and is provided as a
          personal project.
        </p>

        <h2>Who can use it</h2>

        <p>
          You may use the site if you are at least 13 years old and can form a
          binding agreement. If you use the site on behalf of an organization,
          you confirm you have authority to do so.
        </p>

        <h2>Your account</h2>

        <p>
          Sign-in is via Google OAuth. You are responsible for keeping your
          Google account secure. You agree not to share your account or
          impersonate anyone.
        </p>

        <p>
          I may suspend or delete any account that violates these terms or
          misuses the site. Where possible, I&apos;ll warn you first.
        </p>

        <h2>Content you post</h2>

        <p>
          You retain ownership of anything you post (comments, messages). By
          posting, you grant me a non-exclusive, worldwide, royalty-free license
          to store, display, and distribute that content as part of running the
          site.
        </p>

        <p>You agree not to post content that:</p>
        <ul>
          <li>Is illegal in the jurisdiction where you live</li>
          <li>Harasses, threatens, or defames anyone</li>
          <li>Contains malware, phishing links, or spam</li>
          <li>Violates someone else&apos;s copyright or privacy</li>
          <li>Impersonates another person or entity</li>
          <li>
            Contains hate speech or targets people based on race, ethnicity,
            religion, gender, sexual orientation, or disability
          </li>
        </ul>

        <p>
          I reserve the right to remove any content that violates these rules,
          without notice.
        </p>

        <h2>Files and downloads</h2>

        <p>
          Files shared on this site are provided as-is. Some may be licensed
          under specific terms (noted on the file itself, if applicable). Unless
          a file says otherwise, you may not redistribute it commercially.
        </p>

        <p>
          Share links may expire. I am not responsible for lost files or expired
          links. Do not rely on this site for critical storage.
        </p>

        <h2>Comments and reactions</h2>

        <p>
          Comments are moderated at my discretion. Rate limits apply. Attempts
          to bypass rate limits or spam the site will result in account
          suspension.
        </p>

        <h2>Intellectual property</h2>

        <p>
          The site&apos;s code, design, and original written content are owned
          by me unless otherwise noted. You may not copy, republish, or
          redistribute substantial portions without permission.
        </p>

        <p>
          Third-party names, logos, and trademarks (GitHub, Next.js, Supabase,
          etc.) belong to their respective owners. Their use here is for
          identification purposes only.
        </p>

        <h2>Disclaimer</h2>

        <p>
          The site is provided <strong>&quot;as is&quot;</strong> and{" "}
          <strong>&quot;as available&quot;</strong>, without warranties of any
          kind — express or implied. I do not guarantee the site will be
          available, error-free, or fit for any particular purpose.
        </p>

        <h2>Limitation of liability</h2>

        <p>
          To the maximum extent allowed by law, I am not liable for any direct,
          indirect, incidental, or consequential damages arising from your use
          of the site, including but not limited to lost data, lost profits, or
          service interruptions.
        </p>

        <p>
          This is a personal project, not a business. Nothing on this site
          constitutes professional advice.
        </p>

        <h2>Indemnity</h2>

        <p>
          You agree to indemnify and hold me harmless from any claim arising
          from your use of the site, your content, or your violation of these
          terms.
        </p>

        <h2>Governing law</h2>

        <p>
          These terms are governed by the laws of the Republic of the
          Philippines. Any dispute will be handled in the courts of that
          jurisdiction.
        </p>

        <h2>Changes</h2>

        <p>
          I may update these terms at any time. The &quot;Last updated&quot;
          date at the top reflects the most recent change. Continued use of the
          site after changes means you accept the new terms.
        </p>

        <h2>Termination</h2>

        <p>
          I may terminate or suspend access to the site at any time, for any
          reason, without notice. You may stop using the site at any time.
        </p>

        <h2>Contact</h2>

        <p>
          Questions about these terms? Reach out through the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </article>
    </div>
  );
}
