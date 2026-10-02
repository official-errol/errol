import { resolveIcon } from "./icon-resolver";

/**
 * Normalizes a tech name and finds a matching icon.
 * Returns null if no match is found.
 */
export function resolveTechIcon(
  name: string,
): React.ComponentType<{ className?: string }> | null {
  const slug = matchSlug(name);
  if (!slug) return null;

  const Icon = resolveIcon(slug);
  // resolveIcon returns LinkIcon as fallback. We want null instead.
  return slug ? Icon : null;
}

/**
 * Maps a tech name to a known icon slug. Returns null when no mapping exists.
 */
function matchSlug(name: string): string | null {
  const n = name.toLowerCase().trim();

  // Remove common noise
  const cleaned = n
    .replace(/\.js$/, "js")
    .replace(/[.\-_\s]+/g, "")
    .replace(/js$/, "js");

  return MAP[cleaned] ?? MAP[n] ?? null;
}

const MAP: Record<string, string> = {
  // Languages
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
  c: "code",
  go: "code",
  golang: "code",
  rust: "code",
  ruby: "code",
  kotlin: "code",
  swift: "apple",

  // Frameworks & Libraries
  react: "react",
  reactjs: "react",
  reactnative: "react",
  nextjs: "nextjs",
  next: "nextjs",
  vue: "code",
  vuejs: "code",
  nuxt: "code",
  nuxtjs: "code",
  svelte: "code",
  sveltekit: "code",
  angular: "code",
  express: "node",
  expressjs: "node",
  laravel: "laravel",
  django: "python",
  flask: "python",
  fastapi: "python",
  spring: "java",
  springboot: "java",
  flutter: "flutter",
  reactnativeandroid: "android",

  // Styling
  tailwindcss: "tailwind",
  tailwind: "tailwind",

  // Runtime & Tools
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

  // Databases
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

  // Cloud & Hosting
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

  // Git
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "git",

  // OS
  linux: "linux",
  ubuntu: "linux",
  debian: "linux",
  windows: "windows",
  macos: "apple",
  mac: "apple",
  ios: "apple",
  android: "android",

  // Editors & Design
  vscode: "vscode",
  figma: "figma",
  photoshop: "photoshop",
  illustrator: "illustrator",
  canva: "canva",

  // Microsoft
  word: "word",
  excel: "excel",
  powerpoint: "powerpoint",
  office: "office",
  microsoftoffice: "office",
  msoffice: "office",
  sharepoint: "office",

  // API & Auth
  rest: "code",
  restapi: "code",
  graphql: "code",
  api: "code",
  stripe: "stripe",
  shopify: "shopify",
  wordpress: "wordpress",

  // Collab
  slack: "slack",
  discord: "discord",
  notion: "notion",
  trello: "trello",
  jira: "jira",
  zoom: "zoom",
};
