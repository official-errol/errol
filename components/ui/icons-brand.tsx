type IconProps = { className?: string };

// ═════════════════════════════════════════════════
// LANGUAGES
// ═════════════════════════════════════════════════

export function ReactBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="1.6" fill="#61DAFB" />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="#61DAFB"
        strokeWidth="1.3"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="#61DAFB"
        strokeWidth="1.3"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="#61DAFB"
        strokeWidth="1.3"
        transform="rotate(-60 12 12)"
      />
    </svg>
  );
}

export function NextjsBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" className="fill-black dark:fill-white" />
      <path
        d="M17.4 17.3L9.5 7.5H8v9.4h1.4v-7.4l7.1 8.9c.3-.3.6-.7.9-1.1zM15.6 7.5h-1.4v7.4l1.4 1.7V7.5z"
        className="fill-white dark:fill-black"
      />
    </svg>
  );
}

export function TypescriptBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
      <path
        d="M14 12.1v1.9c.3.2.7.3 1.1.4.4.1.8.1 1.3.1.4 0 .8 0 1.2-.1.4-.1.7-.2.9-.4.3-.2.5-.4.6-.7.2-.3.2-.6.2-1 0-.3 0-.6-.1-.8-.1-.2-.2-.4-.4-.6-.2-.2-.4-.3-.6-.4-.3-.1-.5-.2-.9-.3-.3-.1-.5-.2-.7-.2-.2-.1-.3-.1-.4-.2-.1-.1-.2-.1-.2-.2-.1-.1-.1-.1-.1-.2 0-.1 0-.2.1-.2 0-.1.1-.1.2-.2.1-.1.2-.1.4-.1.2 0 .3 0 .5.1.2 0 .3.1.5.2.2.1.3.2.4.3.1.1.2.2.4.4v-1.7c-.3-.1-.6-.2-.9-.2-.3-.1-.7-.1-1.1-.1-.4 0-.8 0-1.2.1-.4.1-.7.3-.9.5-.3.2-.5.4-.6.7-.2.3-.2.7-.2 1 0 .5.2.9.4 1.2.3.4.7.7 1.4 1 .3.1.6.2.8.3.3.1.5.2.7.3.2.1.3.2.5.3.1.1.2.2.2.4 0 .1 0 .2-.1.3 0 .1-.1.2-.2.2-.1.1-.3.1-.4.2-.2 0-.4.1-.6.1-.4 0-.9-.1-1.3-.3-.4-.2-.7-.5-1-.8zM13.4 10.3v-1.6H7v1.6h2.3v6.8h1.8v-6.8h2.3z"
        fill="white"
      />
    </svg>
  );
}

export function JavascriptBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
      <path
        d="M6.5 18l1.4-.8c.3.5.6.9 1.1.9.6 0 .9-.2.9-1v-5.6h1.8v5.7c0 1.8-1 2.7-2.6 2.7-1.4 0-2.2-.7-2.6-1.9zM13.5 17.9l1.4-.8c.4.7.9 1.1 1.8 1.1.7 0 1.2-.4 1.2-.9 0-.6-.5-.9-1.3-1.3l-.5-.2c-1.3-.6-2.2-1.3-2.2-2.7 0-1.4 1-2.4 2.7-2.4 1.1 0 2 .4 2.6 1.5l-1.4.9c-.3-.5-.6-.7-1.1-.7-.4 0-.8.3-.8.8 0 .5.4.8 1.1 1.1l.5.2c1.6.7 2.4 1.4 2.4 2.8 0 1.7-1.3 2.6-3.1 2.6-1.7 0-2.8-.8-3.3-2z"
        fill="#000"
      />
    </svg>
  );
}

export function HtmlBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3z" fill="#E44D26" />
      <path d="M12 4.6v14.9l5.4-1.5L18.7 4.6H12z" fill="#F16529" />
      <path
        d="M12 10.6H9.2l-.2-2H12V6.6H7l.5 6h4.5v-2zM12 15.6l-2.6-.7-.2-2.1H7.3l.3 3.9 4.4 1.2v-2.3z"
        fill="#EBEBEB"
      />
      <path
        d="M12 10.6v2h2.5l-.3 2.9-2.2.6v2.3l4.2-1.2.5-5.2.1-1.4H12zM12 6.6v2h5l.2-2H12z"
        fill="#fff"
      />
    </svg>
  );
}

export function CssBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3z" fill="#1572B6" />
      <path d="M12 4.6v14.9l5.4-1.5L18.7 4.6H12z" fill="#33A9DC" />
      <path
        d="M12 10.6H7.5l.2-2H12V6.6H5.4l.5 6H12v-2zM12 15.6l-2.6-.7-.2-2.1H7.1l.3 3.9 4.6 1.2v-2.3z"
        fill="#EBEBEB"
      />
      <path
        d="M12 10.6v2h4.2l-.4 4-3.8 1v2.3l6.3-1.7.5-5.6.1-2H12zM12 6.6v2h6.5l.2-2H12z"
        fill="#fff"
      />
    </svg>
  );
}

export function PythonBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c-2.6 0-4.4.4-4.4 2.4v1.9h4.5v.9H5.5C3.4 7.2 2 8.6 2 12s1.5 4.6 3.3 4.6h1.6V14c0-1.9 1.6-3.4 3.6-3.4h4.4c1.6 0 2.9-1.3 2.9-2.9V4.4C17.8 2.6 15.8 2 12 2zM9.5 4.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
        fill="#3776AB"
      />
      <path
        d="M12 22c2.6 0 4.4-.4 4.4-2.4v-1.9h-4.5v-.9h6.6c2.1 0 3.5-1.4 3.5-4.8s-1.5-4.6-3.3-4.6h-1.6V10c0 1.9-1.6 3.4-3.6 3.4H8.9c-1.6 0-2.9 1.3-2.9 2.9v4.3C6 22.4 8.2 22 12 22zm2.5-2.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18.3c-1.5.3-1.2.9.5 1.1 1.7.2 3.6.2 5.3-.1 1-.2 2.5-.6 3.3-1.1 0 0-.6.5-1.3.7-3.9 1.2-10.6.8-13.2-.5-.7-.3-1.2-.7-1.2-1 0-.2.3-.3.6-.3.5 0 1.3.1 2.3 0 .4 0 1.3-.3 3.7-.8zM8.7 15.6c-1.2.2-.8.7.4.9 1.5.2 2.8.2 4.6-.2.8-.2 1.9-.6 2.5-1 0 0-.5.4-1 .6-3 1-6.4.8-9 .2-1-.2-1.5-.5-1.5-.7 0-.2.3-.4.8-.4.5 0 1.5.1 3.2.6zM14 10.7c1.1 1.3-.3 2.4-.3 2.4s2.7-1.4 1.4-3.1c-1.2-1.6-2.1-2.4 2.9-5.2 0 0-7.8 2-4 5.9z"
        fill="#5382A1"
      />
      <path
        d="M19.3 20c.9-.7-.2-1.4-.2-1.4s.7.3.4 1c-.3.6-1.3 1.1-2.4 1.5-1.2.4-2.5.6-3.9.7-3.1.2-6.5-.2-9.2-1.3 0 0 .4.4 1.6.8 3.6 1.1 9.3 1.1 12.6-.2 1-.4 1.1-.8 1.1-1.1zM11 11.6c0 0-3.5 1.4-1 .4.2-.1.4-.1.4-.1 1.9-.3 3.7-.3 5.6 0 2.4.3 4.7 1.1 4.7 1.1s-1.3-.8-3.3-1.2c-3-.5-6.4-.3-6.4-.2z"
        fill="#F89820"
      />
    </svg>
  );
}

export function PhpBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4" />
      <ellipse cx="12" cy="12" rx="8" ry="4.5" fill="#8892BF" />
      <path
        d="M7 9.5h2.4c1.1 0 1.8.5 1.7 1.4-.1.9-.9 1.4-2 1.4h-1l-.3 1.7H6.4L7 9.5zm1.1 1l-.2 1h.5c.5 0 .8-.2.9-.6.1-.4-.2-.4-.6-.4h-.6zM11.8 9.5h2.4c1.1 0 1.8.5 1.7 1.4-.1.9-.9 1.4-2 1.4h-1l-.3 1.7h-1.4l.6-4.5zm1.1 1l-.2 1h.5c.5 0 .8-.2.9-.6.1-.4-.2-.4-.6-.4h-.6zM16.6 9.5h2.4c1.1 0 1.8.5 1.7 1.4-.1.9-.9 1.4-2 1.4h-1l-.3 1.7h-1.4l.6-4.5zm1.1 1l-.2 1h.5c.5 0 .8-.2.9-.6.1-.4-.2-.4-.6-.4h-.6z"
        fill="#fff"
      />
    </svg>
  );
}

export function LaravelBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.9 7.8v-.2l-.1-.1v-.1l-.1-.1-.1-.1L17.1 4h-.4l-5.6 3.2-.1.1h-.1l-.1.1v.1l-.1.1v3.5L6 8.7h-.4L.3 12l-.1.1-.1.1v6.6l.1.1v.1l.1.1h.1L6.3 22h.4l5.6-3.2h.1l.1-.1v-.1l.1-.1v-3.5l5.1 2.9h.4l5.6-3.2.1-.1V7.9l-.5-.1zM11.5 5.1l4.9 2.8-4.9 2.8-4.9-2.8 4.9-2.8zm-5.4 8.5v4.8l-4.8-2.7v-4.8l4.8 2.7zm5.4 7.5l-4.8-2.8v-4.8l4.8 2.8v4.8zm5.4-7.5l-4.8 2.8v-4.8l4.8-2.8v4.8zm.6-6l-4.9 2.8V5.5l4.9-2.8v4.9z"
        fill="#FF2D20"
      />
    </svg>
  );
}

// ═════════════════════════════════════════════════
// DATABASES
// ═════════════════════════════════════════════════

export function MysqlBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 13.9c-.9 0-1.7.1-2.4.3-.5-.9-1.2-1.6-2.1-2.1.3-1.4.3-2.5 0-3.2-.3-.6-.9-.9-1.5-.9-.4 0-.8.1-1 .4-.9.7-1.2 2-.9 3.4-.7.3-1.3.7-1.9 1.1-.5-.3-1.1-.6-1.7-.8.5-1.7.4-3.1-.1-4-.4-.8-1.1-1.2-1.9-1.2-.6 0-1.1.2-1.5.7-.9 1.2-.6 2.9-.2 4.1-.7.2-1.4.5-2 .8-.3-.1-.5-.3-.8-.4-.2-1.7-.7-3-1.5-3.8-.5-.5-1.1-.8-1.8-.8-.5 0-.9.2-1.2.5-.8.7-.9 1.9-.6 2.9C.6 12.4-.1 13.7.1 15c.1.9.4 1.6 1 2 .4.3.8.4 1.3.4.4 0 .9-.1 1.4-.3h.1c.7.4 1.5.6 2.4.6 3.3 0 6.5-.7 8.9-2 1.4-.7 2.6-1.7 3.4-2.8.4 0 .8.1 1.2.1.9 0 1.5-.3 1.8-.8.2-.4.2-.9-.1-1.3z"
        fill="#00758F"
      />
      <path
        d="M3.3 16c1.5 0 3.4-.6 5-1.4 2.4-1.2 4.9-3 6.6-4.4.2-.1.4-.3.5-.4.1.1.1.2.1.3 0 .1 0 .1-.1.2-1.7 1.5-4.4 3.4-6.9 4.7-1.8.9-3.9 1.6-5.4 1.6-.2 0-.5 0-.7-.1.2 0 .5-.1.7-.1.1-.1.1-.3.2-.4z"
        fill="#F29111"
      />
    </svg>
  );
}

export function PostgresBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.6 8.5c0 .6-.1 1.2-.2 1.8.4.7.6 1.5.6 2.4 0 .8-.2 1.5-.5 2.1.2 1.1.3 2.1.1 2.9-.1.4-.4.8-1 .8-.7 0-1.3-.5-1.9-1.2-.3-.3-.6-.7-.8-1.2-.5.1-1 .1-1.5.1h-.9c-.1.2-.2.4-.3.6-.6 1-1.3 1.7-2.1 1.7-.6 0-1-.3-1.3-.9-.3-.7-.3-1.6-.1-2.7-.6-.7-1-1.5-1-2.4 0-.8.3-1.6.7-2.3-.1-.5-.1-1-.1-1.6 0-2 .5-3.4 1.6-4.2 1-.7 2.3-.8 3.7-.7.3 0 .6 0 .9 0 .3 0 .6 0 .9 0 1.4-.1 2.7 0 3.7.7 1.1.8 1.6 2.2 1.6 4.2z"
        fill="#336791"
      />
      <path
        d="M12.2 4c-2.9 0-4.8 1-5 3.6-.1.8 0 1.7.2 2.7-.4.6-.6 1.3-.6 2.1 0 .9.3 1.7.9 2.3-.1 1.1 0 2.1.3 2.8.3.7.9 1.2 1.6 1.2.8 0 1.4-.7 2-1.7.1-.2.2-.3.2-.5h.5c.5 0 1.1 0 1.6-.1.3.4.6.9.9 1.2.6.7 1.1 1.2 1.8 1.2.6 0 1-.3 1.1-.9.2-.8.2-1.8 0-3 .4-.6.6-1.3.6-2.1 0-.9-.3-1.7-.8-2.4.1-.6.2-1.1.2-1.7 0-1.9-.5-3.3-1.6-4.1-1-.6-2.3-.8-3.7-.7h-1.8z"
        fill="#fff"
      />
      <circle cx="9.6" cy="8.8" r="0.7" fill="#336791" />
      <circle cx="14.2" cy="8.8" r="0.7" fill="#336791" />
      <path
        d="M11 11.5c-.5.3-1 .4-1.5.4-.3 0-.5 0-.7-.1.2.3.5.4.8.4.4 0 .8-.2 1.1-.5l.3-.2z"
        fill="#336791"
      />
    </svg>
  );
}

export function MongodbBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c1.6 2.4 4.8 6.6 4.8 11 0 3.4-2 6-4.4 6.9v.1h-.8v-.1c-2.4-.9-4.4-3.5-4.4-6.9 0-4.4 3.2-8.6 4.8-11z"
        fill="#4FAA41"
      />
      <path
        d="M12 2c1.6 2.4 4.8 6.6 4.8 11 0 3.4-2 6-4.4 6.9L12 2z"
        fill="#3F8C34"
      />
      <path d="M11.6 19.9h.8v2.6l-.4 1.5-.4-1.5v-2.6z" fill="#3F8C34" />
    </svg>
  );
}

export function SupabaseBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M13.3 2L2.8 14h8.1v8L21.3 10h-8V2z"
        fill="url(#supabase-gradient)"
      />
      <defs>
        <linearGradient
          id="supabase-gradient"
          x1="3"
          y1="2"
          x2="21"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FirebaseBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M5.2 18.3L8 3.4c.1-.3.5-.4.6 0l2.9 5.4-5.3 9.5z"
        fill="#FFA000"
      />
      <path d="M5.2 18.3L9.7 7.9l2.7 3.5-3 6.9z" fill="#F57C00" />
      <path
        d="M5.2 18.3L14.4 8l4.4 8.3c.1.2 0 .4-.1.5l-6.5 3.7c-.1.1-.3.1-.4 0l-6.6-3.7c-.2-.1-.2-.3 0-.5z"
        fill="#FFCA28"
      />
    </svg>
  );
}

export function RedisBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M2.5 5.3L12 2l9.5 3.3L12 8.6 2.5 5.3z" fill="#A41E11" />
      <path d="M12 8.6l9.5-3.3v3L12 11.6 2.5 8.3v-3L12 8.6z" fill="#D82C20" />
      <path
        d="M2.5 11.3L12 14.6l9.5-3.3v3L12 17.6l-9.5-3.3v-3z"
        fill="#A41E11"
      />
      <path
        d="M2.5 14.3L12 17.6l9.5-3.3v3L12 20.6l-9.5-3.3v-3z"
        fill="#D82C20"
      />
    </svg>
  );
}
// ═════════════════════════════════════════════════
// TOOLS & PLATFORMS
// ═════════════════════════════════════════════════

export function GitBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.4 10.9L13.1.6a1.5 1.5 0 0 0-2.1 0L8.9 2.7l2.9 2.9c.4-.1.8-.2 1.2-.1 1.4.2 2.5 1.3 2.6 2.7 0 .4 0 .8-.2 1.2l2.7 2.7c.4-.1.8-.1 1.2 0 1.4.2 2.5 1.3 2.6 2.7 0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7 0-.4.1-.8.2-1.2l-2.5-2.5v6.6c.4.3.7.7.8 1.2.2 1.4-.7 2.7-2.2 3-1.5.2-2.8-.7-3-2.2-.2-1.4.7-2.7 2.1-3v-6.6c-.5-.3-.9-.7-1.1-1.3-.1-.4-.1-.9 0-1.3L6.5 4.3 0.6 10.2c-.6.6-.6 1.5 0 2.1l10.3 10.3c.6.6 1.5.6 2.1 0l10.4-10.4c.6-.6.6-1.5 0-2.1"
        fill="#F05032"
      />
    </svg>
  );
}

export function GithubBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1.1.8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.8-1.1 2.8-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function GitlabBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 21.7l4.1-12.6H7.9L12 21.7z" fill="#E24329" />
      <path d="M12 21.7L7.9 9.1H2.6L12 21.7z" fill="#FC6D26" />
      <path
        d="M2.6 9.1L1.4 12.8c-.1.3 0 .6.2.8l10.4 8.1L2.6 9.1z"
        fill="#FCA326"
      />
      <path
        d="M2.6 9.1h5.3L5.6 2.4c-.1-.3-.6-.3-.7 0L2.6 9.1z"
        fill="#E24329"
      />
      <path d="M12 21.7l4.1-12.6h5.3L12 21.7z" fill="#FC6D26" />
      <path
        d="M21.4 9.1l1.2 3.7c.1.3 0 .6-.2.8l-10.4 8.1L21.4 9.1z"
        fill="#FCA326"
      />
      <path
        d="M21.4 9.1h-5.3L18.4 2.4c.1-.3.6-.3.7 0l2.3 6.7z"
        fill="#E24329"
      />
    </svg>
  );
}

export function DockerBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.5 10h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9-3h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-3-3h2v2h-2V4z"
        fill="#2496ED"
      />
      <path
        d="M22.5 11.5c-.4-.3-1.4-.6-2.2-.4-.1-.7-.5-1.3-1.1-1.8l-.4-.2-.2.4c-.3.5-.4 1.3-.1 1.9-.2.1-.6.2-1 .2H1.8c-.2 0-.3.1-.3.3 0 1.5.4 2.9 1.1 3.9.8 1.2 2.1 1.8 3.7 1.8 3.7 0 6.5-1.7 7.8-4.8.5 0 1.7 0 2.3-.9l.2-.3-.1-.1z"
        fill="#2496ED"
      />
    </svg>
  );
}

export function LinuxBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c-2.2 0-3.5 1.9-3.5 4.3 0 1.4-.5 2.3-1.1 3.2-.7 1-1.6 2.3-1.6 4.5 0 3.4 2.5 5.5 6.2 5.5s6.2-2.1 6.2-5.5c0-2.2-.9-3.5-1.6-4.5-.6-.9-1.1-1.8-1.1-3.2C15.5 3.9 14.2 2 12 2z"
        fill="#000"
      />
      <path
        d="M12 3.5c-1.7 0-2.5 1.4-2.5 3 0 1.1-.4 1.9-.9 2.7-.6.9-1.3 1.9-1.3 3.5 0 2.6 2 4.3 4.7 4.3s4.7-1.7 4.7-4.3c0-1.6-.7-2.6-1.3-3.5-.5-.8-.9-1.6-.9-2.7 0-1.6-.8-3-2.5-3z"
        fill="#F5C518"
      />
      <ellipse cx="10.4" cy="7.2" rx="0.8" ry="1.1" fill="#000" />
      <ellipse cx="13.6" cy="7.2" rx="0.8" ry="1.1" fill="#000" />
      <ellipse cx="12" cy="9.7" rx="1.1" ry="0.7" fill="#E86B22" />
    </svg>
  );
}

export function WindowsBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 4.5l7.5-1v8H3v-7z" fill="#F25022" />
      <path d="M11.5 3.4l9.5-1.4v9.5h-9.5V3.4z" fill="#7FBA00" />
      <path d="M3 12.5h7.5v8L3 19.5v-7z" fill="#00A4EF" />
      <path d="M11.5 12.5H21V21l-9.5-1.4v-7.1z" fill="#FFB900" />
    </svg>
  );
}

export function VscodeBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M17.5 2.5L8 12l9.5 9.5V2.5z" fill="#007ACC" />
      <path d="M17.5 2.5L22 5v14l-4.5 2.5V2.5z" fill="#0078D7" />
      <path d="M5 8.5l3.5 3.5L5 15.5 2 13v-2l3-2.5z" fill="#1F9CF0" />
    </svg>
  );
}

export function VercelBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5L22.5 21h-21L12 2.5z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function AwsBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 8.5c1.8-1 3.6-1 5.5 0M13.5 8c1.6 0 3 .3 4.5 1M6.5 16.5c2 1 6 1 8 0"
        stroke="#FF9900"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 8.5l1.7 3.7L9.5 9l1.7 3.7L13 8.5l1.7 3.7"
        stroke="#FF9900"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4.5 17.5c0 1.2.8 1.9 2.2 1.9M19.5 17.5c0 1.2-.8 1.9-2.2 1.9"
        stroke="#FF9900"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CloudflareBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.3 12.4c-.3-2.7-2.6-4.8-5.4-4.8-2.3 0-4.3 1.4-5.1 3.4-.6-.2-1.3-.2-1.9-.1-1.9.2-3.3 1.8-3.3 3.7 0 .2 0 .5.1.7.1.3.4.4.7.4h15.6c.3 0 .5-.2.6-.5.1-.3.1-.6.1-.9 0-.8-.4-1.6-.9-2.2-.2-.2-.4 0-.5.2z"
        fill="#F38020"
      />
      <path
        d="M20.2 12.6c-.1-.4-.5-.6-.8-.5-.2.1-.4.2-.4.4-.1.5 0 1 .3 1.5.1.2 0 .4-.1.5-.1.1-.3.2-.4.2H4.3c-.2 0-.3.1-.4.2-.1.2 0 .4.1.5.3.3.8.4 1.2.4h14.7c.4 0 .7-.2 1-.6.2-.4.2-.9.1-1.3 0-.7-.3-1.3-.6-1.8z"
        fill="#FAAE40"
      />
    </svg>
  );
}

export function PrismaBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.4 14.9L13.3 2.4c-.4-.6-1.3-.6-1.8.1L2.6 16.1c-.4.6-.2 1.4.4 1.7l7.4 3.8c.4.2.9.2 1.3 0l9.2-4.9c.6-.3.8-1.1.5-1.8z"
        fill="#2D3748"
      />
      <path
        d="M16.7 16.4L9.5 14.7c-.4-.1-.6-.6-.3-.9L14.4 6c.3-.4.9-.3 1 .2l1.8 9.4c.1.5-.3.9-.5.8z"
        fill="#fff"
      />
    </svg>
  );
}

export function ExpoBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5c-.4 0-.8.2-1 .5L1.9 17.8c-.4.6-.2 1.4.4 1.8.6.4 1.4.2 1.8-.4L12 6.4l7.9 12.8c.4.6 1.2.8 1.8.4.6-.4.8-1.2.4-1.8L13 3c-.2-.3-.6-.5-1-.5z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function FlutterBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14 2L4 12l2.5 2.5L19 2h-5z" fill="#42A5F5" />
      <path d="M14 10.5L6.5 18l2.5 2.5 2.5-2.5L19 10.5h-5z" fill="#42A5F5" />
      <path d="M9 20.5l2.5 2.5h5l-2.5-2.5H9z" fill="#0D47A1" />
      <path d="M6.5 18L4 15.5 9 10.5l2.5 2.5L6.5 18z" fill="#1E88E5" />
    </svg>
  );
}

export function AndroidBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.5 9.6H6.5c-.3 0-.5.2-.5.5v7c0 .8.7 1.5 1.5 1.5h.8v3c0 .5.4.9.9.9s.9-.4.9-.9v-3h3.8v3c0 .5.4.9.9.9s.9-.4.9-.9v-3h.8c.8 0 1.5-.7 1.5-1.5v-7c0-.3-.2-.5-.5-.5zM6 9.2c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-4.2c0-.7-.6-1.3-1.3-1.3zM18 9.2c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-4.2c0-.7-.6-1.3-1.3-1.3z"
        fill="#A4C639"
      />
      <path
        d="M12 2.5c-2.5 0-4.6 1.4-5.7 3.5-.1.2 0 .5.2.5h11c.2 0 .4-.3.3-.5-1.1-2.1-3.3-3.5-5.8-3.5z"
        fill="#A4C639"
      />
      <circle cx="9.3" cy="5.8" r="0.6" fill="#fff" />
      <circle cx="14.7" cy="5.8" r="0.6" fill="#fff" />
    </svg>
  );
}

export function AppleBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.6 12.4c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.3-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.1-.1 1.6-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1-.1-2.5-1-2.5-3.5zM14.4 5.4c.6-.7 1-1.8 1-2.8-.9.1-2 .5-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.6-1.2z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}
// ═════════════════════════════════════════════════
// DESIGN
// ═════════════════════════════════════════════════

export function FigmaBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8.5 24a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0 0 8z" fill="#0ACF83" />
      <path d="M4.5 12a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4z" fill="#A259FF" />
      <path d="M4.5 4a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4z" fill="#F24E1E" />
      <path d="M12.5 0h4a4 4 0 0 1 0 8h-4V0z" fill="#FF7262" />
      <path
        d="M20.5 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"
        fill="#1ABCFE"
      />
    </svg>
  );
}

export function PhotoshopBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#001E36" />
      <path
        d="M7 17V7.5h3.8c1.7 0 2.9 1 2.9 2.7 0 1.7-1.2 2.7-2.9 2.7H8.9V17H7zm1.9-5.2h1.4c.7 0 1.1-.4 1.1-1.1 0-.7-.4-1.1-1.1-1.1H8.9v2.2z"
        fill="#31A8FF"
      />
      <path
        d="M16.5 17c-1.4 0-2.4-.5-2.8-1.5l1.6-.6c.2.4.6.6 1.1.6.5 0 .8-.2.8-.5 0-.4-.5-.5-1.2-.7-1.2-.3-2.1-.8-2.1-2 0-1.2 1.1-2 2.5-2 1.1 0 2 .4 2.5 1.3l-1.4.7c-.2-.3-.5-.5-.9-.5-.4 0-.6.1-.6.4 0 .3.4.4 1.1.6 1.2.3 2.2.7 2.2 1.9 0 1.3-1.1 2.3-2.8 2.3z"
        fill="#31A8FF"
      />
    </svg>
  );
}

export function IllustratorBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#330000" />
      <path
        d="M7 17l1.7-8h2.1l1.7 8H10.6l-.3-1.6H9l-.3 1.6H7zm2.3-3.3h1.3l-.6-3.4-.7 3.4zM15 9.8V8.7h1.6v1.1H15zm0 7.2v-6h1.6v6H15z"
        fill="#FF9A00"
      />
    </svg>
  );
}

export function CanvaBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="url(#canva-grad)" />
      <path
        d="M15.6 8.4c-.8-.6-1.7-.9-2.7-.7-1.9.4-3.3 2.2-3.7 4.2-.4 2.4.7 4.5 2.7 5 1 .2 2-.1 2.9-.8.6-.5 1.2-1.2 1.6-2 .2-.4-.1-.7-.4-.6-.6.2-1.1.4-1.7.4-1.2 0-2.1-1-2.1-2.3 0-1.9 1.3-3.4 3.2-3.8.5-.1 1-.1 1.5 0 .4.1.7-.4.3-.7-.4-.4-.8-.6-1.6-.7z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="canva-grad"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="0.5" stopColor="#7D2AE8" />
          <stop offset="1" stopColor="#5B2C89" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ═════════════════════════════════════════════════
// OFFICE
// ═════════════════════════════════════════════════

export function WordBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        fill="#2B579A"
      />
      <path d="M15 2l6 6h-6V2z" fill="#1E3F73" />
      <path
        d="M8.5 10.5L10 17l1.5-4 1.5 4 1.5-6.5h-1.3l-.7 3.7-1-2.7h-.9l-1 2.7-.7-3.7H8.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function ExcelBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        fill="#217346"
      />
      <path d="M15 2l6 6h-6V2z" fill="#0F5132" />
      <path
        d="M8.5 10.5l2.5 6.5M11 10.5L8.5 17M13 10.5l2.5 6.5M15.5 10.5L13 17"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PowerpointBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        fill="#B7472A"
      />
      <path d="M15 2l6 6h-6V2z" fill="#8A3620" />
      <path
        d="M9.5 17V10h2.5c1.3 0 2.3.8 2.3 2 0 1.3-1 2.1-2.3 2.1H11V17H9.5zm1.5-4.2h.8c.6 0 .9-.3.9-.8 0-.5-.4-.8-.9-.8H11v1.6z"
        fill="#fff"
      />
    </svg>
  );
}

export function OfficeBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 4h18v16H3V4z" fill="#D83B01" />
      <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" fill="#fff" />
    </svg>
  );
}

// ═════════════════════════════════════════════════
// COLLABORATION
// ═════════════════════════════════════════════════

export function SlackBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M5.4 14.8a2 2 0 1 1-2-2h2v2z" fill="#E01E5A" />
      <path d="M6.4 14.8a2 2 0 0 1 4 0v5a2 2 0 1 1-4 0v-5z" fill="#E01E5A" />
      <path d="M8.4 5.4a2 2 0 1 1 2-2v2h-2z" fill="#36C5F0" />
      <path d="M8.4 6.4a2 2 0 0 1 0 4h-5a2 2 0 0 1 0-4h5z" fill="#36C5F0" />
      <path d="M18.6 8.4a2 2 0 1 1 2 2h-2v-2z" fill="#2EB67D" />
      <path d="M17.6 8.4a2 2 0 0 1-4 0v-5a2 2 0 1 1 4 0v5z" fill="#2EB67D" />
      <path d="M14.8 18.6a2 2 0 1 1-2 2v-2h2z" fill="#ECB22E" />
      <path d="M14.8 17.6a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5z" fill="#ECB22E" />
    </svg>
  );
}

export function DiscordBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M19.5 5.4c-1.4-.6-2.8-1.1-4.4-1.3l-.2.5c-1.5-.2-3.1-.2-4.6 0l-.2-.5c-1.5.3-3 .7-4.4 1.3C2.4 9.8 1.7 14 2.1 18.2c1.7 1.2 3.4 2 5 2.4l.6-1c-.8-.3-1.6-.7-2.3-1.2l.5-.4c3.3 1.5 6.9 1.5 10.2 0l.5.4c-.7.5-1.5.9-2.3 1.2l.6 1c1.6-.5 3.3-1.3 5-2.4.5-4.8-.6-9-2.1-12.8zM8.5 15.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"
        fill="#5865F2"
      />
    </svg>
  );
}

export function NotionBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="3"
        className="fill-black dark:fill-white"
      />
      <path
        d="M6.8 17V7h1.7l4.5 5.6V7H15v10h-1.7l-4.6-5.7V17H6.8z"
        className="fill-white dark:fill-black"
      />
    </svg>
  );
}

export function TrelloBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#0079BF" />
      <rect x="5" y="5" width="6.2" height="13" rx="1.2" fill="#fff" />
      <rect x="12.8" y="5" width="6.2" height="9" rx="1.2" fill="#fff" />
    </svg>
  );
}

export function JiraBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L22 12 12 22 2 12 12 2z" fill="#2684FF" />
      <path d="M12 6.2L17.8 12 12 17.8 6.2 12 12 6.2z" fill="#fff" />
    </svg>
  );
}

export function ZoomBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="14" height="12" rx="3" fill="#2D8CFF" />
      <path d="M16 11l6-3v8l-6-3v-2z" fill="#2D8CFF" />
    </svg>
  );
}

// ═════════════════════════════════════════════════
// COMMERCE
// ═════════════════════════════════════════════════

export function StripeBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#635BFF" />
      <path
        d="M11 9.8c0-.5.4-.7 1-.7.9 0 2 .3 2.9.8V6.6c-1-.4-2-.5-2.9-.5-2.4 0-4 1.3-4 3.4 0 3.2 4.4 2.7 4.4 4.1 0 .5-.5.7-1.1.7-1 0-2.2-.4-3.2-1v3.4c1.1.5 2.2.7 3.2.7 2.4 0 4.1-1.2 4.1-3.4 0-3.5-4.4-2.9-4.4-4.2z"
        fill="#fff"
      />
    </svg>
  );
}

export function ShopifyBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.8 5.3c0-.1-.1-.2-.2-.2-.1 0-1.6-.1-1.6-.1s-1.2-1.2-1.3-1.3c-.2-.2-.5-.1-.6-.1l-.8.2c-.5-1.4-1.3-2.6-2.8-2.6h-.1c-.4-.5-1-.8-1.5-.8C6.5.4 5 3 4.5 4.3l-2.5.8c-.8.3-.8.3-.9 1L.3 20.2l13 2.4 7.2-1.5c0-.1-2.7-15.8-2.7-15.8zM12 3.9c-.5.2-1 .4-1.6.6v-.4c0-.8-.1-1.4-.3-1.9.8.1 1.4.8 1.9 1.7zm-2.8-1.4c.2.5.3 1.2.3 2.1v.2l-2.4.7c.5-1.8 1.4-2.8 2.1-3zm-1.2-.7c.3 0 .6.1.9.3-.9.4-1.9 1.5-2.3 3.6l-1.9.6c.5-1.7 1.7-4.5 3.3-4.5z"
        fill="#95BF47"
      />
      <path
        d="M17.6 5.1c-.1 0-1.6-.1-1.6-.1s-1.2-1.2-1.3-1.3c-.1-.1-.1-.1-.2-.1l-1.7 17.3 7.2-1.5s-2.3-14.1-2.3-14.2c0-.1-.1-.1-.1-.1z"
        fill="#5E8E3E"
      />
      <path
        d="M12 9.7l-.8 2.5s-.8-.4-1.7-.4c-1.4 0-1.4.9-1.4 1.1 0 1.2 3.1 1.6 3.1 4.4 0 2.2-1.4 3.6-3.3 3.6-2.2 0-3.4-1.4-3.4-1.4l.6-2s1.2 1 2.2 1c.7 0 .9-.5.9-.9 0-1.5-2.5-1.6-2.5-4.1 0-2.1 1.5-4.2 4.6-4.2 1.2 0 1.7.4 1.7.4z"
        fill="#fff"
      />
    </svg>
  );
}

export function WordpressBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#21759B" />
      <path
        d="M3.7 12c0 3.3 1.9 6.1 4.7 7.4L4.4 9.4c-.4 1-.7 1.7-.7 2.6zM12 20.5c1.1 0 2.1-.2 3.1-.5l-3.3-9.5-2.9 8.4c1 .4 2 .6 3.1.6zM19.2 7.3c0-1.2-.5-2.1-1-2.8-.5-.6-1.5-1.5-1.5-2.3 0-.8.7-1.5 1.6-1.5h.2C16.2 1 14.2 0.2 12 0.2 10.2 0.2 8.6.8 7.3 1.6h.6c1 0 2.5-.2 2.5 1.4 0 .8-.6 1.9-.9 2.8l-1.9 6.2-3-9.4c1-.1 1.5-.3 1.5-.3.4-.1.4-.5 0-.5 0 0-1.1.1-1.9.1-3 0-6-.3-6-.3v.5s.5 0 1.1.1c.8.1.9.1 1.2 1.1l1.5 4.4-1.9 5.2-3.2-9.7c.6-.1 1.3-.1 1.3-.1.4-.1.3-.5 0-.5 0 0-1.1.1-1.9.1h-.6C1.9 2.4 5.5.5 9.9.5c3.5 0 6.6 2 8.4 5.1-.1 0-.2 0-.2 0-1 0-1.8.9-1.8 1.9 0 .9.5 1.7 1.1 2.6.4.7.9 1.7.9 3 0 1-.4 2.1-.9 3.6l-1.1 3.5c3.7-2.2 6.2-6.2 6.2-10.8 0-.9-.1-1.7-.3-2.5"
        fill="#fff"
        transform="scale(0.88) translate(1.5 1.5)"
      />
    </svg>
  );
}

// ═════════════════════════════════════════════════
// MEDIA
// ═════════════════════════════════════════════════

export function ChromeBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path
        d="M12 2a10 10 0 0 0-8.7 5.1h17.4A10 10 0 0 0 12 2z"
        fill="#EA4335"
      />
      <path d="M21.5 7.1L12 22.5l-5.6-9.3h15.1z" fill="#34A853" />
      <path d="M2.5 7.1L12 22.5l2.9-9.4L2.5 7.1z" fill="#FBBC05" />
      <circle cx="12" cy="12" r="4.2" fill="#4285F4" />
      <circle cx="12" cy="12" r="2.4" fill="#fff" />
      <circle cx="12" cy="12" r="1.8" fill="#4285F4" />
    </svg>
  );
}

export function CameraBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MicrophoneBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="9"
        y="2.5"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 12a7 7 0 0 0 14 0M12 19v3M9 22h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpeakerBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.5 9.5L9 5v14l-5.5-4.5V9.5zM12 6.5l6.5 2.5v6l-6.5 2.5v-11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 9c.8 1 .8 5 0 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ═════════════════════════════════════════════════
// HARDWARE
// ═════════════════════════════════════════════════

export function PrinterBrandIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 8V3h11v5M6.5 18H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5M6.5 14h11v7h-11v-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="10.5" cy="11.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
