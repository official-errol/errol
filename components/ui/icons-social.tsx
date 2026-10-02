type IconProps = { className?: string };

export function FacebookIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M15 8a7 7 0 1 0-8.1 6.9V10H5.4V8h1.5V6.7c0-1.5.9-2.4 2.3-2.4.7 0 1.4.1 1.4.1v1.5h-.8c-.8 0-1 .5-1 1V8h1.7l-.3 2H8.8v4.9A7 7 0 0 0 15 8Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11.8" cy="4.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.6 4.7a1.8 1.8 0 0 0-1.2-1.2C12.2 3.2 8 3.2 8 3.2s-4.2 0-5.4.3A1.8 1.8 0 0 0 1.4 4.7 19 19 0 0 0 1.1 8c0 1.1.1 2.2.3 3.3a1.8 1.8 0 0 0 1.2 1.2c1.2.3 5.4.3 5.4.3s4.2 0 5.4-.3a1.8 1.8 0 0 0 1.2-1.2c.2-1.1.3-2.2.3-3.3s-.1-2.2-.3-3.3ZM6.7 10.1V5.9l3.6 2.1-3.6 2.1Z" />
    </svg>
  );
}

export function TiktokIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.5 4.9a3.2 3.2 0 0 1-2.1-2.7V2h-2.2v8.5a2 2 0 1 1-1.4-1.9V6.4a4 4 0 1 0 3.6 4V6.1c.6.4 1.3.7 2.1.8V4.9Z" />
    </svg>
  );
}

export function ThreadsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.5 7.5c0-.1-.1-.1-.1-.2-.1-2-1.3-3.1-3-3.1h-.3C7 4.2 6.3 4.7 6 5.5l1.2.5c.2-.5.6-.8 1.2-.8h.2c.5 0 1 .2 1.3.5.3.3.4.7.5 1.2-.5-.2-1-.3-1.6-.3-1.5 0-2.5.9-2.5 2.1 0 1.2.9 2 2.2 2 1.3 0 2.2-.8 2.6-2.2.3.3.5.8.5 1.4 0 1.4-1.1 2.6-2.7 2.6A3.3 3.3 0 0 1 5 10c0-2.2 1.3-3.9 3.4-4.4l-.3-1.1C5.2 5.1 3.5 7.4 3.5 10A4.6 4.6 0 0 0 8.2 15c2.2 0 3.9-1.6 3.9-3.8 0-1.3-.5-2.4-1.3-3 .5-.3.7-.6.7-.7Zm-2.2 2.7c-.2.6-.7 1-1.3 1-.6 0-1-.3-1-.8s.4-.8 1-.8c.5 0 .9.1 1.3.4v.2Z" />
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

export function DevtoIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.5 2h-9A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2ZM7 10H5.8V6H7v4Zm3.7-2.9c0 .7-.5 1.2-1.2 1.2v1.7h-1.2V6h2.3c.6 0 1.1.5 1.1 1.1ZM9.5 7.3v.5h.9v-.5h-.9Z" />
    </svg>
  );
}

export function MediumIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 4a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 13 4v8a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 12V4Zm1.4 1v6h1.2c.4 0 .8-.1 1.1-.4.4-.4.6-1 .6-2.5 0-1-.2-1.7-.5-2.1-.3-.4-.7-.6-1.2-.6H4.4v-.4Zm5.2 0v6h1.6V5H9.6Z" />
    </svg>
  );
}

export function RedditIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 8a1.5 1.5 0 0 0-2.5-1.1 7 7 0 0 0-3.6-1.1l.7-3.1 2.2.5a1.4 1.4 0 1 0 .2-1l-2.6-.6a.5.5 0 0 0-.6.4l-.8 3.8a7.2 7.2 0 0 0-3.5 1.1A1.5 1.5 0 1 0 2 9.8v.4C2 12 4.7 13.5 8 13.5s6-1.5 6-3.3v-.4c.6 0 1-.6 1-1.3Zm-9.7 1.3a1.1 1.1 0 1 1 1.1 1.1 1.1 1.1 0 0 1-1.1-1.1Zm5.7 2.6c-.7.7-2 1.1-2.1 1.1h-.1s-1.4-.4-2.1-1.1c-.2-.2-.2-.5 0-.7s.5-.2.7 0c.4.4 1.2.7 1.4.8h.1c.2 0 1-.3 1.4-.8.2-.2.5-.2.7 0s.2.5 0 .7Zm-.1-1.5a1.1 1.1 0 1 1 1.1-1.1 1.1 1.1 0 0 1-1.1 1.1Z" />
    </svg>
  );
}

export function DribbbleIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3 5c2 1 5 1.5 7.5 1M3 11c1.5-3 3.5-5 5.5-7M5.5 13c1.5-3.5 3.5-5.5 6-6.5M4 9h8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function BehanceIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M6.4 7.3c.7-.3 1.1-1 1.1-1.9 0-1.4-1-2.1-2.6-2.1H1.7v9.4h3.4c1.7 0 2.9-.8 2.9-2.5 0-1-.5-1.9-1.6-2.2v-.7Zm-3-.9V4.5h1.4c.6 0 1 .3 1 .9s-.4 1-1 1H3.4v-.1Zm1.6 5.4H3.4V9.5h1.6c.8 0 1.2.4 1.2 1.1 0 .8-.5 1.2-1.2 1.2ZM14 8.6c0-1.9-1.2-3.4-3.1-3.4s-3.2 1.5-3.2 3.4 1.3 3.4 3.2 3.4c1.5 0 2.6-.8 3-2.2h-1.6c-.2.5-.7.8-1.4.8-.9 0-1.5-.6-1.6-1.5h4.7v-.5Zm-4.7-.8c.1-.7.6-1.2 1.4-1.2s1.3.5 1.4 1.2h-2.8ZM9.5 3.8h3.3v.9H9.5v-.9Z" />
    </svg>
  );
}

export function FigmaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 1.5A2 2 0 0 0 4 3.5v.5a2 2 0 0 0 2 2h.5V1.5H6Zm0 6a2 2 0 0 0-2 2v.5a2 2 0 0 0 2 2h.5V7.5H6Zm4.5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 1.5H8.5v4H10a2 2 0 1 0 0-4Zm0 5.5H8.5v4H10a2 2 0 1 0 0-4Z" />
    </svg>
  );
}

export function StackoverflowIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.5 13.5H4.5V10H3.5v4.5h10V10h-1v3.5Zm-2-3.5-5-.5.1-1 5 .5-.1 1Zm.3-3.1-4.6-1.5.3-1 4.6 1.5-.3 1Zm.6-3.1-4-2.4.5-.9 4 2.4-.5.9ZM7 8.5l4.8 2.2-.4 1-4.8-2.2.4-1Z" />
    </svg>
  );
}

export function NpmIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3v10h13V3h-13Zm2 2h9v6h-1.5V6.5h-2V11h-5.5V5Z" />
    </svg>
  );
}

export function CodepenIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2L2 6v4l6 4 6-4V6L8 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M2 6l6 4 6-4M2 10l6-4 6 4M8 2v4M8 10v4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function MastodonIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.6 8.2c0 .3-.5.3-.5.3H9.5c0 .5 0 1 .3 1.5.4.5 1 .6 1.5.6.5 0 1-.1 1.4-.4l.3 1c-.6.3-1.3.5-1.9.5-1 0-2.6-.4-2.9-2.6V8.4c0-.7.2-1.2.4-1.5.4-.4.9-.5 1.3-.5h.8c.5 0 .9.2 1.2.5s.5.8.5 1.4h1.2Zm-3.4-.8c0-.3-.1-.5-.3-.6-.2-.2-.4-.2-.6-.2-.3 0-.5.1-.6.3-.2.2-.3.4-.3.8V10h1.8V7.4ZM2.5 8.5c0 .5 0 1 .3 1.5.4.5.9.6 1.5.6.5 0 1-.1 1.4-.4l.3 1c-.6.3-1.3.5-1.9.5-1 0-2.5-.4-2.8-2.6V5h1.2v3.5Zm8.5-7h-4c-.8 0-1.5.2-2 .6-.4.4-.7.8-.8 1.5v5.3h1.7V6.5c0-.9.6-1.5 1.5-1.5h1.5c1 0 1.6.6 1.6 1.5v6H10V9h-1.7v3.5H6.6v-.3c-.3.3-.8.4-1.3.4V5c.2-.7.5-1.1.9-1.5.5-.4 1.2-.6 2-.6h4c.8 0 1.5.2 1.9.6.4.4.7.8.8 1.5v6h-1.7V4c0-.3-.1-.5-.3-.6-.2-.2-.4-.2-.6-.2" />
    </svg>
  );
}

export function TwitchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12 5.5v4H9.5L8 11H6V9.5H3v-8h9l1.5 1.5H12Zm-4.5-.5h1v4h-1V5Zm2.5 0h1v4h-1V5ZM3 .5H1.5V12H5v2.5L7.5 12H10l4.5-4.5V.5h-12Z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.7 2.3A7.6 7.6 0 0 0 2.2 11.4L1 15l3.7-1.1a7.6 7.6 0 0 0 11-8.4 7.6 7.6 0 0 0-2-3.2Zm-5.7 11.4a6.3 6.3 0 0 1-3.2-.9l-.2-.1-2.2.6.6-2.1-.2-.2a6.3 6.3 0 0 1 9.8-7.8A6.3 6.3 0 0 1 8 13.7Zm3.5-4.7c-.2-.1-1.2-.6-1.3-.7-.2 0-.3-.1-.4.1l-.6.7c-.1.2-.2.2-.4.1-.2-.1-.8-.3-1.5-.9a5.5 5.5 0 0 1-1-1.3c-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4v-.3l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3A2.5 2.5 0 0 0 4.6 6c0 1.5 1.1 3 1.2 3.2.2.2 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.2-.7 1.4-1.3.2-.6.2-1.2.1-1.3 0-.1-.2-.2-.4-.3l-1.1-.6Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.7 1.3 1 6.6c-.8.3-.8 1.4 0 1.6l3.4 1.1 1.3 4c.2.7 1 .8 1.5.3l1.8-1.8 3.5 2.6c.6.4 1.4.1 1.6-.6l2-11.4c.1-.8-.6-1.4-1.4-1.1ZM6 9.6l-.3 2.6-1-3L12 3.5 6 9.6Z" />
    </svg>
  );
}

export function EmailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="4"
        width="12"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2 5l6 4 6-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
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

export function GithubIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5A7.5 7.5 0 0 0 .5 8a7.5 7.5 0 0 0 5.13 7.12c.38.07.51-.16.51-.36v-1.26c-2.09.45-2.53-1.01-2.53-1.01-.34-.87-.83-1.1-.83-1.1-.68-.47.05-.46.05-.46.75.05 1.15.77 1.15.77.67 1.14 1.76.81 2.19.62.07-.48.26-.81.47-1-1.66-.19-3.41-.83-3.41-3.7 0-.82.29-1.49.77-2.01-.08-.19-.33-.95.07-1.98 0 0 .63-.2 2.06.77a7.14 7.14 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.4 1.03.15 1.79.07 1.98.48.52.77 1.19.77 2.01 0 2.88-1.75 3.51-3.42 3.69.27.23.51.68.51 1.38v2.05c0 .2.13.43.52.36A7.5 7.5 0 0 0 15.5 8 7.5 7.5 0 0 0 8 .5Z" />
    </svg>
  );
}
