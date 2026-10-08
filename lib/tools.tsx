export type ToolMeta = {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON. Handles large payloads.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3M9 12h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate secure v4 UUIDs in bulk.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M8 12h.01M12 12h.01M16 12h.01"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Turn any text or URL into a QR code.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM18 20h3v1h-3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    slug: "base64",
    name: "Base64 Encoder",
    description: "Encode text to Base64 or decode it back.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="7"
          width="18"
          height="10"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M7 11l1.5 3 1.5-3 1.5 3L13 11M15 11l1.5 3 1.5-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: "url-encoder",
    name: "URL Encoder",
    description: "Encode or decode URLs and query parameters.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
    ),
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Strong random passwords with custom rules.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
          cx="8"
          cy="15"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M10.5 12.5L19 4M17 6l2 2M14.5 8.5l1.5 1.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Inspect the header and payload of a JWT.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l7 2.5v5c0 4.5-3 8.5-7 10.5-4-2-7-6-7-10.5v-5L12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to dates and back.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3a9 9 0 0 0 0 18c1.4 0 2.5-1.1 2.5-2.5 0-.9-.4-1.4-.9-1.9-.5-.5-.9-.9-.9-1.6 0-1.2 1-2 2-2h2c2.2 0 3.8-1.6 3.8-3.8C20.5 6.3 16.7 3 12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="7" cy="11" r="1" fill="currentColor" />
        <circle cx="10.5" cy="7" r="1" fill="currentColor" />
        <circle cx="15" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  },
];
