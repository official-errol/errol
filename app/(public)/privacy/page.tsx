import { PublicPageHeader } from "@/components/ui/public-page-header";

export const metadata = {
  title: "Privacy Policy",
  description: "How Errol handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[
          { label: "Portfolio", href: "/" },
          { label: "Privacy Policy" },
        ]}
        title="Privacy Policy"
        description="Last updated: October 2026"
      />

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Errol (&quot;this site&quot;, &quot;I&quot;, &quot;me&quot;) is a
          personal platform run by a single individual. This page explains what
          data is collected when you visit or use the site, why it is collected,
          and what control you have over it.
        </p>

        <p>
          This is a personal project, not a business. The site does not sell
          products, does not run advertisements, and does not track you across
          other sites.
        </p>

        <h2>What I collect</h2>

        <h3>If you only browse the site</h3>
        <p>
          Nothing personally identifiable. The site does not use third-party
          analytics, tracking pixels, or advertising cookies.
        </p>
        <p>
          Standard server logs may record your IP address and browser user agent
          for security purposes (rate limiting, abuse prevention). These logs
          are short-lived and are not linked to any account.
        </p>

        <h3>If you sign in with Google</h3>
        <p>
          When you sign in via Google OAuth, I receive the following from your
          Google account:
        </p>
        <ul>
          <li>Your name (display name)</li>
          <li>Your email address</li>
          <li>Your Google profile picture URL</li>
        </ul>
        <p>
          This is stored in the site&apos;s database so the site can identify
          you when you comment, react, or return. It is not shared with anyone.
        </p>

        <h3>If you comment or react</h3>
        <p>
          Your user ID, the content you post, and a timestamp are stored. This
          is publicly visible if you comment on a public post.
        </p>

        <h3>If you use the contact form</h3>
        <p>
          Your name, email, subject, and message are stored on the site and
          forwarded to my personal email via Gmail. They are used only to reply
          to you.
        </p>

        <h3>If you download a file</h3>
        <p>
          A download record is stored: the file ID, your user ID (if logged in),
          and a hashed version of your IP address. The IP is hashed with a
          secret salt and cannot be reversed back to your real address.
        </p>

        <h2>How long I keep it</h2>

        <ul>
          <li>
            <strong>Account data</strong> — until you delete your account or ask
            me to remove it.
          </li>
          <li>
            <strong>Comments and reactions</strong> — until you delete them, or
            until the associated post is deleted.
          </li>
          <li>
            <strong>Contact messages</strong> — kept until the conversation is
            resolved, then deleted manually.
          </li>
          <li>
            <strong>Server logs</strong> — usually a few days.
          </li>
        </ul>

        <h2>Cookies</h2>

        <p>
          The site uses a small number of cookies, all of them
          <strong> strictly necessary</strong>:
        </p>
        <ul>
          <li>
            <strong>Authentication cookies</strong> — set by Supabase to keep
            you signed in.
          </li>
          <li>
            <strong>Theme preference</strong> — remembers whether you chose
            light or dark mode.
          </li>
        </ul>
        <p>
          There are no advertising cookies, no tracking cookies, and no
          third-party cookies from analytics providers.
        </p>

        <h2>Third parties</h2>

        <p>The site relies on the following services to run:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — database, authentication, and file
            storage.
          </li>
          <li>
            <strong>Vercel</strong> — hosting and content delivery.
          </li>
          <li>
            <strong>Google</strong> — OAuth sign-in only.
          </li>
        </ul>
        <p>
          Each of these has its own privacy policy. I do not control how they
          handle data at the infrastructure level, but I do not send them
          anything beyond what is required to run the site.
        </p>

        <h2>Your rights</h2>

        <p>You can ask me to:</p>
        <ul>
          <li>Show you what data I have about you</li>
          <li>Delete your account and all associated data</li>
          <li>Correct any inaccuracies</li>
          <li>Export your data in a portable format</li>
        </ul>
        <p>
          To make any of these requests, use the{" "}
          <a href="/contact">contact page</a> or email me directly.
        </p>

        <h2>Children</h2>

        <p>
          This site is not directed at children under 13. I do not knowingly
          collect data from anyone under 13. If you believe a child has signed
          in and provided data, contact me and I will delete it.
        </p>

        <h2>Changes to this policy</h2>

        <p>
          If this policy changes, the &quot;Last updated&quot; date at the top
          will change. Significant changes will be noted on the homepage.
        </p>

        <h2>Contact</h2>

        <p>
          Questions about this policy? Reach out through the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </article>
    </div>
  );
}
