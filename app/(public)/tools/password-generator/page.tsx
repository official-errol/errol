import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Password Generator — Strong Random Passwords",
  description:
    "Generate strong, cryptographically secure passwords. Customize length, character sets, and exclude ambiguous characters. Runs in your browser.",
  alternates: { canonical: `${BASE_URL}/tools/password-generator` },
  openGraph: {
    title: "Password Generator — Errol",
    description: "Generate strong random passwords in your browser.",
    url: `${BASE_URL}/tools/password-generator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator — Errol",
    description: "Generate strong random passwords in your browser.",
  },
};

const FAQ = [
  {
    question: "Are these passwords secure?",
    answer:
      "Yes. They are generated using your browser's crypto.getRandomValues() — the same API used for cryptographic operations. They are not derived from Math.random(), which is not secure for passwords.",
  },
  {
    question: "How long should a password be?",
    answer:
      "For most uses, at least 16 characters with mixed character sets. For critical accounts (email, banking), 20+ characters. Length matters more than complexity for resisting brute force.",
  },
  {
    question: "Is my password sent anywhere?",
    answer:
      "No. Everything runs in your browser. Nothing is uploaded, logged, or stored.",
  },
  {
    question: "What are ambiguous characters?",
    answer:
      "Characters that look similar — like 0 and O, 1 and l and I. Excluding them prevents errors when you need to type the password manually.",
  },
  {
    question: "Should I reuse passwords?",
    answer:
      "Never. Every account should have a unique password. If one account is breached, reusing the password exposes the others. Use a password manager to store them.",
  },
];

export default function PasswordGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Password Generator",
    description: "Generate strong random passwords in your browser.",
    url: `${BASE_URL}/tools/password-generator`,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ToolPage
        title="Password Generator"
        slug="password-generator"
        description="Strong random passwords, generated in your browser."
        hint={
          <>
            <p className="mb-2">
              Pick a length, toggle the character sets you want, and click
              Generate.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Length</strong> — 8 to 128
                characters
              </li>
              <li>
                <strong className="text-text-primary">Character sets</strong> —
                uppercase, lowercase, digits, symbols
              </li>
              <li>
                <strong className="text-text-primary">Exclude ambiguous</strong>{" "}
                — skip 0/O, 1/l/I
              </li>
              <li>
                <strong className="text-text-primary">Batch</strong> — generate
                up to 20 at once
              </li>
            </ul>
          </>
        }
        content={
          <>
            <h2>What makes a strong password?</h2>
            <p>
              Strength comes from two things: <strong>length</strong> and{" "}
              <strong>randomness</strong>. A 20-character random password is
              vastly harder to crack than a 10-character one, regardless of
              complexity.
            </p>
            <p>
              This generator uses <code>crypto.getRandomValues()</code>, which
              is the same secure random source used for cryptography. It is not
              the weak <code>Math.random()</code> you sometimes see in scripts.
            </p>

            <h2>How long should my password be?</h2>
            <table>
              <thead>
                <tr>
                  <th>Account type</th>
                  <th>Recommended length</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Casual accounts (forums, newsletters)</td>
                  <td>16 characters</td>
                </tr>
                <tr>
                  <td>Email, social, cloud storage</td>
                  <td>20 characters</td>
                </tr>
                <tr>
                  <td>Banking, crypto, password manager</td>
                  <td>24+ characters</td>
                </tr>
              </tbody>
            </table>

            <h2>Best practices</h2>
            <ul>
              <li>
                <strong>One password per account.</strong> Never reuse.
              </li>
              <li>
                <strong>Use a password manager.</strong> Bitwarden, 1Password,
                or the one built into your browser.
              </li>
              <li>
                <strong>Enable two-factor auth</strong> wherever possible. That
                matters more than password length.
              </li>
              <li>
                <strong>Change immediately</strong> if a service you use
                announces a breach.
              </li>
            </ul>
          </>
        }
        faq={FAQ}
      >
        <PasswordGeneratorTool />
      </ToolPage>
    </>
  );
}
