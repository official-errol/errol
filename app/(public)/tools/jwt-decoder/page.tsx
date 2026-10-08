import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { JwtDecoderTool } from "@/components/tools/jwt-decoder-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "JWT Decoder — Inspect JSON Web Tokens",
  description:
    "Decode and inspect JSON Web Tokens (JWTs). See the header, payload, and expiration status. Runs in your browser — nothing is sent to a server.",
  alternates: { canonical: `${BASE_URL}/tools/jwt-decoder` },
  openGraph: {
    title: "JWT Decoder — Errol",
    description: "Decode and inspect JWTs in your browser.",
    url: `${BASE_URL}/tools/jwt-decoder`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder — Errol",
    description: "Decode and inspect JWTs in your browser.",
  },
};

const FAQ = [
  {
    question: "What is a JWT?",
    answer:
      "A JSON Web Token is a compact way to represent claims between two parties. It has three parts separated by dots: a header, a payload, and a signature. Each part is Base64URL-encoded.",
  },
  {
    question: "Is decoding a JWT the same as verifying it?",
    answer:
      "No. Decoding just reads the contents. Verifying checks that the signature is valid — which requires the secret or public key. This tool only decodes; it does not verify.",
  },
  {
    question: "Is it safe to paste a JWT here?",
    answer:
      "Yes, as long as you trust your browser. This tool runs entirely client-side. Nothing is uploaded. That said, do not paste production tokens into any tool you do not control the code of — including this one, if you are cautious.",
  },
  {
    question: "Why can anyone read my JWT payload?",
    answer:
      "JWTs are not encrypted — they are encoded. Anyone with the token can read the header and payload. Never put sensitive data (passwords, secrets) in a JWT payload.",
  },
  {
    question: 'What does "expired" mean?',
    answer:
      "The payload has an exp claim (expiration time). If that timestamp is in the past, the token is no longer valid and the server should reject it.",
  },
];

export default function JwtDecoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JWT Decoder",
    description: "Decode and inspect JWTs in your browser.",
    url: `${BASE_URL}/tools/jwt-decoder`,
    applicationCategory: "DeveloperApplication",
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
        title="JWT Decoder"
        slug="jwt-decoder"
        description="Decode and inspect JSON Web Tokens."
        hint={
          <>
            <p className="mb-2">
              Paste a JWT into the input. The header and payload appear decoded.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Header</strong> —
                algorithm and token type
              </li>
              <li>
                <strong className="text-text-primary">Payload</strong> — claims
                (user ID, roles, etc.)
              </li>
              <li>
                <strong className="text-text-primary">Expiration</strong> —
                whether the token has expired
              </li>
            </ul>
            <p className="mt-2">
              This tool{" "}
              <strong className="text-text-primary">only decodes</strong> — it
              does not verify signatures.
            </p>
          </>
        }
        content={
          <>
            <h2>What is a JWT?</h2>
            <p>
              A JSON Web Token is a compact, URL-safe way to represent claims
              between two parties — usually a client and a server. It is
              commonly used for stateless authentication.
            </p>
            <p>A JWT has three parts separated by dots:</p>
            <ol>
              <li>
                <strong>Header</strong> — the algorithm used for signing
              </li>
              <li>
                <strong>Payload</strong> — the claims (user ID, roles,
                expiration)
              </li>
              <li>
                <strong>Signature</strong> — cryptographic proof of authenticity
              </li>
            </ol>
            <p>
              The header and payload are Base64URL-encoded JSON. The signature
              is a hash of the first two parts using the algorithm in the
              header.
            </p>

            <h2>Decoding vs verifying</h2>
            <p>
              <strong>Decoding</strong> is trivial — anyone can do it. It just
              reverses the Base64URL encoding. <strong>Verifying</strong>{" "}
              requires the signing key and confirms that the token has not been
              tampered with.
            </p>
            <p>
              This tool decodes. It does not verify. If you need to check
              signatures, use a proper JWT library in your backend.
            </p>

            <h2>Common claims</h2>
            <table>
              <thead>
                <tr>
                  <th>Claim</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>iss</td>
                  <td>Issuer — who created the token</td>
                </tr>
                <tr>
                  <td>sub</td>
                  <td>Subject — usually the user ID</td>
                </tr>
                <tr>
                  <td>aud</td>
                  <td>Audience — who the token is for</td>
                </tr>
                <tr>
                  <td>exp</td>
                  <td>Expiration — Unix timestamp when it expires</td>
                </tr>
                <tr>
                  <td>iat</td>
                  <td>Issued at — Unix timestamp when it was created</td>
                </tr>
                <tr>
                  <td>nbf</td>
                  <td>Not before — token is invalid before this time</td>
                </tr>
              </tbody>
            </table>

            <h2>Security reminder</h2>
            <p>
              Never put secrets in a JWT. The payload is not encrypted — it is
              only encoded. Anyone with the token can read it. If it needs to be
              secret, encrypt it separately or use a reference token.
            </p>
          </>
        }
        faq={FAQ}
      >
        <JwtDecoderTool />
      </ToolPage>
    </>
  );
}
