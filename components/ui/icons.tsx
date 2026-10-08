type IconProps = { className?: string };

const S = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function EyeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 8s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function PencilIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M11.5 2.5l2 2-8 8H3.5v-2l8-8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M10 4l2 2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function TrashIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4h10M6.5 4V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 4l.5 9a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1L11 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5.75 7l4.5-2.25M5.75 9l4.5 2.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="6"
        y="6"
        width="8"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M10 6V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function ExternalIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M10 3h3v3M13 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function XIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l5 2v4c0 3-2 5.5-5 7-3-1.5-5-4-5-7v-4l5-2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FileTextIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 2h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5.5 8.5h5M5.5 11h3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FolderIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 4a1 1 0 0 1 1-1h3l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HardDriveIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="9"
        width="12"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M4 9l1.5-5.5A1 1 0 0 1 6.5 3h3a1 1 0 0 1 1 .5L12 9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="11" r="0.75" fill="currentColor" />
      <circle cx="7" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function MessageIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7l-3 2.5V11.5H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UploadIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 11V3M5 6l3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DownloadIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3v8M5 8l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SunIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.3 3.3l1 1M11.7 11.7l1 1M3.3 12.7l1-1M11.7 4.3l1-1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MonitorIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="3"
        width="12"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M6 14h4M8 12v2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BriefcaseIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="5"
        width="12"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M6 5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M2 9h12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function GraduationIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 6l7-3 7 3-7 3-7-3Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M4 7v3c0 1 1.8 2 4 2s4-1 4-2V7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M14 6v4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
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

export function LinkIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M6.5 9.5a2.5 2.5 0 0 0 3.5 0l2-2a2.5 2.5 0 0 0-3.5-3.5L7.5 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.5 6.5a2.5 2.5 0 0 0-3.5 0l-2 2a2.5 2.5 0 0 0 3.5 3.5L8.5 11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapPinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 14s5-4.5 5-8a5 5 0 1 0-10 0c0 3.5 5 8 5 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="1.75" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function MailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="4"
        width="12"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M2 5l6 4 6-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="3.5"
        width="12"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M2 6.5h12M5.5 2v3M10.5 2v3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UserIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle
        cx="8"
        cy="5.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M2.5 14a5.5 5.5 0 0 1 11 0"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l1.5 4.5L14 7.5l-4.5 1.5L8 13.5 6.5 9 2 7.5 6.5 6 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
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

export function LinkedinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM2 6h3v8H2V6Zm5 0h2.8v1.1h.04c.39-.7 1.34-1.44 2.76-1.44 2.95 0 3.5 1.85 3.5 4.26V14h-3v-3.6c0-.86-.02-1.96-1.2-1.96-1.2 0-1.38.93-1.38 1.9V14H7V6Z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6 1.5h2.3l-5 5.7L15.8 14.5h-4.6l-3.6-4.7-4.1 4.7H1.2l5.4-6.1L.4 1.5h4.7l3.2 4.3 4.3-4.3Zm-.8 11.6h1.3L4.3 2.8H2.9l8.9 10.3Z" />
    </svg>
  );
}

export function GlobeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2 8h12M8 2c1.8 1.7 2.7 3.7 2.7 6S9.8 12.3 8 14c-1.8-1.7-2.7-3.7-2.7-6S6.2 3.7 8 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2.5 6.5L8 2l5.5 4.5V13a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V6.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M6 14v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SchoolIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6.5 8 3l6 3.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 14v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 6.5h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CertificateIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="9" rx="1" {...S} />
      <path d="M5 5h6M5 7h4" {...S} />
      <circle cx="11" cy="12" r="2" {...S} />
      <path d="M10 13.5L9.5 15l1.5-.5L12.5 15l-.5-1.5" {...S} />
    </svg>
  );
}

export function TrophyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M5 2h6v4a3 3 0 1 1-6 0V2Z" {...S} />
      <path d="M5 3H3v1a2 2 0 0 0 2 2M11 3h2v1a2 2 0 0 1-2 2" {...S} />
      <path d="M8 9v3M5 14h6M6 14v-2h4v2" {...S} />
    </svg>
  );
}

export function RssIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M3 7a6 6 0 0 1 6 6M3 3a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" {...S} />
      <path d="M10.5 10.5l3 3" {...S} />
    </svg>
  );
}

export function ShoppingBagIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 5h10l-1 8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 5V4a2 2 0 0 1 4 0v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LockIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="1.5" {...S} />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" {...S} />
      <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function KeyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="5.5" cy="10.5" r="2.5" {...S} />
      <path d="M7.3 8.7L13 3M11.5 4.5l1.5 1.5M10 6l1 1" {...S} />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l5 2v4c0 3-2 5.5-5 7-3-1.5-5-4-5-7v-4l5-2Z" {...S} />
      <path d="M5.5 8l2 2 3-3.5" {...S} />
    </svg>
  );
}

export function ClockIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" {...S} />
      <path d="M8 4.5V8l2.5 1.5" {...S} />
    </svg>
  );
}

export function PaletteIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5a6.5 6.5 0 0 0 0 13c.9 0 1.5-.7 1.5-1.5 0-.5-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.8.7-1.5 1.5-1.5h1.4c1.5 0 2.6-1.2 2.6-2.6C14 4 11.3 1.5 8 1.5Z"
        {...S}
      />
      <circle cx="5" cy="7" r="0.75" fill="currentColor" />
      <circle cx="7.5" cy="4.5" r="0.75" fill="currentColor" />
      <circle cx="10.5" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}
