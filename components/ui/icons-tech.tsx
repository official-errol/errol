type IconProps = { className?: string };

// ── Languages
export function ReactIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="1.3" fill="currentColor" />
      <ellipse
        cx="8"
        cy="8"
        rx="6.5"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="8"
        cy="8"
        rx="6.5"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(60 8 8)"
      />
      <ellipse
        cx="8"
        cy="8"
        rx="6.5"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(-60 8 8)"
      />
    </svg>
  );
}

export function NextjsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 11V5l5 6.5M10 5v4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TypescriptIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5 6.5h3M6.5 6.5V11M9 9c.5-.5 1.5-.5 2 0s-.3 1.5-1 1.5-1.5-.5-1-1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JavascriptIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 6v5M11 9c.5-.5 1.5-.5 2 0s-.3 1.5-1 1.5-1.5-.5-1-1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HtmlIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h10l-1 10-4 2-4-2L3 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 5.5h5M5.7 7.5h4.5l-.2 2-2 .8-2-.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CssIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h10l-1 10-4 2-4-2L3 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.5H5.5l.2 2h4.6l-.2 2-2 .8-2-.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PythonIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2c-2 0-3 .5-3 2v2h3v1H3.5C2 7 1.5 8 1.5 10s.5 3 2 3h1v-2c0-2 1-3 3-3h3c2 0 3-1 3-3V4c0-1.5-1-2-3-2H8Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6.5" cy="4" r="0.6" fill="currentColor" />
      <circle cx="9.5" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function JavaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M5 9c1-1 4-1 5 0M6 11c1-1 3-1 4 0M7 13c.7-.7 1.3-.7 2 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9 2c1 1 2 2 2 3S9 6 9 7c0 1 2 1.5 2 3s-2 2.5-4 2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhpIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <ellipse
        cx="8"
        cy="8"
        rx="6.5"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5 6.5v4M5 8h1.5a1 1 0 0 0 0-2H5M8 6.5v4M8 8h1.5a1 1 0 0 0 0-2H8M11 6.5v4M11 8h1.5a1 1 0 0 0 0-2H11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LaravelIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 4l3 1.5 3-1.5 3 1.5 3-1.5v3L8 11l-6-3V4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8 5.5v5M2 7l6 3 6-3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// ── Databases
export function MysqlIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <ellipse
        cx="8"
        cy="4"
        rx="5.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2.5 4v4c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4M2.5 8v4c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function PostgresqlIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <ellipse
        cx="8"
        cy="4"
        rx="5.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2.5 4v7c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4M2.5 7.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function MongodbIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2c-2 3-2 7 0 12M8 2c2 3 2 7 0 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M8 9v5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SupabaseIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L2 9h5v5l6-7.5H8V1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FirebaseIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 12l3-8 2 4 2-2 3 6-5 3-5-3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RedisIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 5l6-2 6 2-6 2-6-2ZM2 8l6-2 6 2-6 2-6-2ZM2 11l6-2 6 2-6 2-6-2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Tools & platforms
export function GitIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="4.5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle
        cx="4.5"
        cy="12"
        r="1.8"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle
        cx="11.5"
        cy="8"
        r="1.8"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.5 5.8v4.4M6.3 4.5c1 1 3 1 3.4 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function GithubIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5A7.5 7.5 0 0 0 .5 8a7.5 7.5 0 0 0 5.13 7.12c.38.07.51-.16.51-.36v-1.26c-2.09.45-2.53-1.01-2.53-1.01-.34-.87-.83-1.1-.83-1.1-.68-.47.05-.46.05-.46.75.05 1.15.77 1.15.77.67 1.14 1.76.81 2.19.62.07-.48.26-.81.47-1-1.66-.19-3.41-.83-3.41-3.7 0-.82.29-1.49.77-2.01-.08-.19-.33-.95.07-1.98 0 0 .63-.2 2.06.77a7.14 7.14 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.4 1.03.15 1.79.07 1.98.48.52.77 1.19.77 2.01 0 2.88-1.75 3.51-3.42 3.69.27.23.51.68.51 1.38v2.05c0 .2.13.43.52.36A7.5 7.5 0 0 0 15.5 8 7.5 7.5 0 0 0 8 .5Z" />
    </svg>
  );
}

export function GitlabIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 14l-5-8 1.5-4L6 6h4l1.5-4L13 6l-5 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DockerIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 9h2v2H3V9Zm3 0h2v2H6V9Zm3 0h2v2H9V9ZM6 6.5h2v2H6v-2Zm3 0h2v2H9v-2ZM3 6.5h2v2H3v-2Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M11 9c1 0 1.5-.5 2-1.5.5 1 1 1.5 2 1.5-.3 2-2 3.5-4 3.5H5C3 12.5 1.5 10.5 1 8h10Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinuxIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2c-1.5 0-2 1.5-2 3 0 1-.5 1.5-1 2.5-.5 1-1 1.5-1 3 0 2 1.5 3 4 3s4-1 4-3c0-1.5-.5-2-1-3s-1-1.5-1-2.5c0-1.5-.5-3-2-3Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="6" r="0.6" fill="currentColor" />
      <circle cx="9" cy="6" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WindowsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 3.5l5.5-.8v5.3H2V3.5Zm6.5-.9L14 1.5v6.5H8.5V2.6ZM2 8.5h5.5v5.3L2 13V8.5Zm6.5 0H14V15l-5.5-1.1V8.5Z" />
    </svg>
  );
}

export function VscodeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M11 2L4 8l7 6V2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M11 2l3 1.5v9L11 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VercelIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2l7 12H1L8 2Z" />
    </svg>
  );
}

export function AwsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 6c2-1 4-1 6 0M11 6c1 0 2 .3 3 1M4 11c2 1 6 1 8 0M4 12c0 .8.5 1.5 2 1.5M13 11.5c0 .8-.5 1.5-2 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5 6.5l1 2 1.5-2.5L9 8.5 10.5 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloudflareIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M5 10c0-1.5 1-2.5 2.5-2.5 1 0 1.8.6 2.2 1.5h.3c1 0 1.5.5 1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3 11h9c1.5 0 2.5-.8 2.5-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PrismaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2l5 8-5 4-5-4 5-8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8 2v12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ExpoIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 13l5-10 5 10M5.5 9h5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlutterIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M9 2L3 8l3 3 6-6M6 11l3 3h6l-6-6M9 14l3-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AndroidIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 11c0-2.5 2-4.5 5-4.5s5 2 5 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5 5l-1-2M11 5l1-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="8" r="0.5" fill="currentColor" />
      <circle cx="10" cy="8" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function AppleIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M11 8.5c0-1.5 1-2.2 1-2.2s-.6-1-1.8-1c-.7 0-1.3.3-1.7.3-.4 0-1-.3-1.6-.3-1.4 0-2.7 1.2-2.7 3.3 0 2.3 1.7 5.2 3 5.2.5 0 1-.3 1.5-.3.4 0 .9.3 1.5.3 1.1 0 2.4-2 2.4-2s-1.6-.8-1.6-3.3ZM9.5 4c.6-.7.6-1.6.5-2-.6 0-1.3.3-1.8.9-.4.4-.6 1.3-.5 1.9.7 0 1.4-.3 1.8-.8Z" />
    </svg>
  );
}

// ── Design
export function FigmaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 1.5A2 2 0 0 0 4 3.5v.5a2 2 0 0 0 2 2h.5V1.5H6Zm0 6a2 2 0 0 0-2 2v.5a2 2 0 0 0 2 2h.5V7.5H6Zm4.5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 1.5H8.5v4H10a2 2 0 1 0 0-4Zm0 5.5H8.5v4H10a2 2 0 1 0 0-4Z" />
    </svg>
  );
}

export function PhotoshopIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="13"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5 11V5h2a1.5 1.5 0 0 1 0 3H5M9 9c.5-.4 1.5-.4 2 0s-.5 1.5-1.5 1.5S9 9.5 9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IllustratorIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="13"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 11l1.5-6 1.5 6M4.5 9h2M10 5v6M10 9c0-.5.8-1 1.5-1s1 .3 1 1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CanvaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M10 5.5c-.5-.3-1-.5-1.5-.3-1 .4-1.5 1.8-1.5 3 0 1 .3 1.6 1 1.8.5.2 1-.1 1.5-.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Office
export function WordIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 7l1 4 1-3 1 3 1-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExcelIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5 6l4 6M9 6l-4 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PowerpointIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6 12V6h1.5a1.5 1.5 0 0 1 0 3H6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OfficeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 2h8v12l-8-2V2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M2 4h2M2 8h2M2 12h2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// ── Communication & collaboration
export function SlackIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M6.5 2a1.5 1.5 0 1 1 3 0v4a1.5 1.5 0 0 1-3 0V2Zm5.5 5.5a1.5 1.5 0 1 0 0 3h2a1.5 1.5 0 0 0 0-3h-2ZM9.5 14a1.5 1.5 0 1 1-3 0v-4a1.5 1.5 0 0 1 3 0v4ZM4 8.5a1.5 1.5 0 1 0 0-3H2a1.5 1.5 0 0 0 0 3h2Z" />
    </svg>
  );
}

export function DiscordIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.2 3.7A12 12 0 0 0 10.4 3l-.2.3a11 11 0 0 1 2.3.8 10 10 0 0 0-8.9 0c.7-.4 1.5-.6 2.3-.8L5.6 3a12 12 0 0 0-2.9.9C1 6.8.4 9.7.7 12.6c1 1 2.4 1.6 3.9 1.6l.8-1a6 6 0 0 1-1.1-.5l.3-.2a8.6 8.6 0 0 0 7 0l.3.2c-.3.2-.7.4-1.1.5l.8 1c1.5 0 2.9-.6 3.9-1.6.4-3.4-.6-6.3-2.4-8.9ZM5.8 10.9c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Zm4.4 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Z" />
    </svg>
  );
}

export function NotionIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5 11V5l6 6V5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrelloIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="3.5"
        y="3.5"
        width="4"
        height="9"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="8.5"
        y="3.5"
        width="4"
        height="6"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function JiraIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1l7 7-7 7L1 8l7-7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M8 5l3 3-3 3-3-3 3-3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ZoomIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="4"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10 7l4-2v6l-4-2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Hardware
export function MonitorIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="3"
        width="13"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6 14h4M8 12v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CpuIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="4.5"
        y="4.5"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6.5 2v2.5M9.5 2v2.5M6.5 11.5V14M9.5 11.5V14M2 6.5h2.5M2 9.5h2.5M11.5 6.5H14M11.5 9.5H14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WrenchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M10 2a3 3 0 1 0 2.5 4.5L14 8l-2 2-5.5-5.5 2-2 1.5 1.5A3 3 0 0 0 10 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9.5l-4 4M1.5 14.5l2-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DatabaseIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <ellipse
        cx="8"
        cy="4"
        rx="5.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2.5 4v8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function CloudIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4.5 12h7a2.5 2.5 0 0 0 0-5 3.5 3.5 0 0 0-6.8-.7A3 3 0 0 0 4.5 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TerminalIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="2.5"
        width="13"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 6l2 2-2 2M8 10h3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M5 5L2 8l3 3M11 5l3 3-3 3M9 3l-2 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Commerce & other
export function StripeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2a6 6 0 1 0 4 10.5c-1.4.6-2.6.7-3.6.4-1.8-.5-3-2-3-4 0-1.2.4-2.2 1.2-3C7.4 5 8.4 4.6 9.5 4.6c1.2 0 2.2.3 3 .8L11.6 7c-.6-.4-1.3-.6-2-.6-.9 0-1.5.3-1.5 1s.5 1 1.8 1.3c1.9.5 3 1.3 3 2.6M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" />
    </svg>
  );
}

export function ShopifyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 5l1.5-2 1.5 2h3l1.5-2L13 5l1 8H2L3 5h1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6 8c1-.5 3-.5 4 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WordpressIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 6h3M6 6h2l1 5 1-3 1 3 1-5h2M11 6h2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChromeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 8h11M4 3l6 10M12 3L6 13"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function CameraIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 5.5h2l1-1.5h6l1 1.5h2v7H2v-7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function MicrophoneIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="6"
        y="2"
        width="4"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 8a4 4 0 0 0 8 0M8 12v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpeakerIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6l3-2v8l-3-2V6ZM7 4l4 2v4l-4 2V4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrinterIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4V2h8v2M4 12H2V6h12v6h-2M4 10h8v4H4v-4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SettingsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
