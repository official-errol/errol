import { resolveIcon } from "./icon-resolver";

export function resolveSkillIcon(
  name: string,
): React.ComponentType<{ className?: string }> | null {
  const slug = matchSlug(name);
  if (!slug) return null;
  return resolveIcon(slug);
}

/** Server-side safe: returns the slug directly for DB writes. */
export function matchSkillIconSlug(name: string): string | null {
  return matchSlug(name);
}

function matchSlug(name: string): string | null {
  const n = name.toLowerCase().trim();

  // Try exact match first (raw lowercase)
  if (MAP[n]) return MAP[n];

  // Normalize: strip punctuation, collapse whitespace
  const cleaned = n
    .replace(/\.js$/, "js")
    .replace(/[.\-_\s]+/g, "")
    .replace(/js$/, "js");

  if (MAP[cleaned]) return MAP[cleaned];

  // Substring fallback: if the name contains a keyword, match it
  for (const [key, slug] of Object.entries(MAP)) {
    if (key.length >= 4 && n.includes(key)) return slug;
  }

  return null;
}

const MAP: Record<string, string> = {
  // ── Languages
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  java: "java",
  php: "php",
  html: "html",
  html5: "html",
  css: "css",
  css3: "css",
  csharp: "code",
  cpp: "code",
  go: "code",
  golang: "code",
  rust: "code",
  ruby: "code",
  kotlin: "code",
  swift: "apple",

  // ── Frameworks & libs
  react: "react",
  reactjs: "react",
  reactnative: "react",
  nextjs: "nextjs",
  next: "nextjs",
  vue: "code",
  vuejs: "code",
  nuxt: "code",
  svelte: "code",
  angular: "code",
  express: "node",
  expressjs: "node",
  laravel: "laravel",
  django: "python",
  flask: "python",
  fastapi: "python",
  spring: "java",
  flutter: "flutter",

  // ── Styling
  tailwind: "tailwind",
  tailwindcss: "tailwind",

  // ── Runtime & tooling
  nodejs: "node",
  node: "node",
  deno: "node",
  bun: "node",
  npm: "npm",
  yarn: "npm",
  pnpm: "npm",
  vite: "vscode",
  webpack: "code",
  turbopack: "code",

  // ── Databases
  mysql: "mysql",
  postgresql: "postgresql",
  postgres: "postgresql",
  psql: "postgresql",
  mongodb: "mongodb",
  mongo: "mongodb",
  sqlite: "database",
  redis: "redis",
  supabase: "supabase",
  firebase: "firebase",
  prisma: "prisma",
  drizzle: "database",
  sql: "database",
  database: "database",

  // ── Cloud & DevOps
  vercel: "vercel",
  netlify: "cloudflare",
  cloudflare: "cloudflare",
  aws: "aws",
  amazonwebservices: "aws",
  gcp: "cloud",
  googlecloud: "cloud",
  azure: "cloud",
  heroku: "cloud",
  digitalocean: "cloud",
  docker: "docker",
  kubernetes: "docker",
  k8s: "docker",

  // ── Git
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "git",

  // ── OS
  linux: "linux",
  ubuntu: "linux",
  debian: "linux",
  windows: "windows",
  windowsinstallation: "windows",
  macos: "apple",
  mac: "apple",
  ios: "apple",
  android: "android",

  // ── Editors & design
  vscode: "vscode",
  figma: "figma",
  photoshop: "photoshop",
  illustrator: "illustrator",
  canva: "canva",

  // ── Microsoft Office
  word: "word",
  excel: "excel",
  powerpoint: "powerpoint",
  office: "office",
  microsoftoffice: "office",
  msoffice: "office",
  sharepoint: "office",

  // ── Collaboration
  slack: "slack",
  discord: "discord",
  notion: "notion",
  trello: "trello",
  jira: "jira",
  zoom: "zoom",

  // ── Hardware / IT support
  hardware: "cpu",
  software: "code",
  troubleshooting: "wrench",
  repair: "wrench",
  maintenance: "wrench",
  malware: "settings",
  backup: "database",
  recovery: "database",
  optimization: "settings",
  printer: "printer",
  monitor: "monitor",
  computer: "monitor",

  // ── Commerce / CMS
  stripe: "stripe",
  shopify: "shopify",
  wordpress: "wordpress",

  // ── Media
  camera: "camera",
  microphone: "microphone",
  speaker: "speaker",
  audovisual: "speaker",
  livestream: "speaker",
  video: "camera",

  // ── Generic fallbacks (in order of precedence)
  webdevelopment: "code",
  frontend: "code",
  backend: "code",
  fullstack: "code",
};
