import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  GlobeIcon,
  LinkIcon,
} from "./icons";

import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
  ThreadsIcon,
  DiscordIcon,
  DevtoIcon,
  MediumIcon,
  RedditIcon,
  DribbbleIcon,
  BehanceIcon,
  StackoverflowIcon,
  NpmIcon,
  CodepenIcon,
  MastodonIcon,
  TwitchIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "./icons-social";

import {
  RedisIcon,
  MonitorIcon,
  CpuIcon,
  WrenchIcon,
  DatabaseIcon,
  CloudIcon,
  TerminalIcon,
  CodeIcon,
  SettingsIcon,
  AwsIcon as AwsOutlineIcon,
} from "./icons-tech";

import {
  ReactBrandIcon,
  NextjsBrandIcon,
  TypescriptBrandIcon,
  JavascriptBrandIcon,
  HtmlBrandIcon,
  CssBrandIcon,
  PythonBrandIcon,
  JavaBrandIcon,
  PhpBrandIcon,
  LaravelBrandIcon,
  MysqlBrandIcon,
  PostgresBrandIcon,
  MongodbBrandIcon,
  SupabaseBrandIcon,
  FirebaseBrandIcon,
  GitBrandIcon,
  GithubBrandIcon,
  GitlabBrandIcon,
  DockerBrandIcon,
  LinuxBrandIcon,
  WindowsBrandIcon,
  VscodeBrandIcon,
  VercelBrandIcon,
  AwsBrandIcon,
  CloudflareBrandIcon,
  PrismaBrandIcon,
  ExpoBrandIcon,
  FlutterBrandIcon,
  AndroidBrandIcon,
  AppleBrandIcon,
  FigmaBrandIcon,
  PhotoshopBrandIcon,
  IllustratorBrandIcon,
  CanvaBrandIcon,
  WordBrandIcon,
  ExcelBrandIcon,
  PowerpointBrandIcon,
  OfficeBrandIcon,
  SlackBrandIcon,
  DiscordBrandIcon,
  NotionBrandIcon,
  TrelloBrandIcon,
  JiraBrandIcon,
  ZoomBrandIcon,
  StripeBrandIcon,
  ShopifyBrandIcon,
  WordpressBrandIcon,
  ChromeBrandIcon,
  CameraBrandIcon,
  MicrophoneBrandIcon,
  SpeakerBrandIcon,
  PrinterBrandIcon,
} from "./icons-brand";

export type IconMeta = {
  slug: string;
  label: string;
  category: string;
  Component: React.ComponentType<{ className?: string }>;
};

export const ICONS: IconMeta[] = [
  // Social
  {
    slug: "github",
    label: "GitHub",
    category: "Social",
    Component: GithubIcon,
  },
  {
    slug: "linkedin",
    label: "LinkedIn",
    category: "Social",
    Component: LinkedinIcon,
  },
  {
    slug: "twitter",
    label: "Twitter / X",
    category: "Social",
    Component: TwitterIcon,
  },
  {
    slug: "facebook",
    label: "Facebook",
    category: "Social",
    Component: FacebookIcon,
  },
  {
    slug: "instagram",
    label: "Instagram",
    category: "Social",
    Component: InstagramIcon,
  },
  {
    slug: "youtube",
    label: "YouTube",
    category: "Social",
    Component: YoutubeIcon,
  },
  {
    slug: "tiktok",
    label: "TikTok",
    category: "Social",
    Component: TiktokIcon,
  },
  {
    slug: "threads",
    label: "Threads",
    category: "Social",
    Component: ThreadsIcon,
  },
  {
    slug: "discord",
    label: "Discord",
    category: "Social",
    Component: DiscordIcon,
  },
  { slug: "devto", label: "Dev.to", category: "Social", Component: DevtoIcon },
  {
    slug: "medium",
    label: "Medium",
    category: "Social",
    Component: MediumIcon,
  },
  {
    slug: "reddit",
    label: "Reddit",
    category: "Social",
    Component: RedditIcon,
  },
  {
    slug: "dribbble",
    label: "Dribbble",
    category: "Social",
    Component: DribbbleIcon,
  },
  {
    slug: "behance",
    label: "Behance",
    category: "Social",
    Component: BehanceIcon,
  },
  {
    slug: "stackoverflow",
    label: "Stack Overflow",
    category: "Social",
    Component: StackoverflowIcon,
  },
  { slug: "npm", label: "npm", category: "Social", Component: NpmIcon },
  {
    slug: "codepen",
    label: "CodePen",
    category: "Social",
    Component: CodepenIcon,
  },
  {
    slug: "mastodon",
    label: "Mastodon",
    category: "Social",
    Component: MastodonIcon,
  },
  {
    slug: "twitch",
    label: "Twitch",
    category: "Social",
    Component: TwitchIcon,
  },
  {
    slug: "whatsapp",
    label: "WhatsApp",
    category: "Social",
    Component: WhatsappIcon,
  },
  {
    slug: "telegram",
    label: "Telegram",
    category: "Social",
    Component: TelegramIcon,
  },
  { slug: "email", label: "Email", category: "Social", Component: EmailIcon },
  {
    slug: "website",
    label: "Website",
    category: "Social",
    Component: GlobeIcon,
  },
  {
    slug: "link",
    label: "Generic link",
    category: "Social",
    Component: LinkIcon,
  },

  // Languages
  {
    slug: "react",
    label: "React",
    category: "Languages",
    Component: ReactBrandIcon,
  },
  {
    slug: "nextjs",
    label: "Next.js",
    category: "Languages",
    Component: NextjsBrandIcon,
  },
  {
    slug: "typescript",
    label: "TypeScript",
    category: "Languages",
    Component: TypescriptBrandIcon,
  },
  {
    slug: "javascript",
    label: "JavaScript",
    category: "Languages",
    Component: JavascriptBrandIcon,
  },
  {
    slug: "html",
    label: "HTML",
    category: "Languages",
    Component: HtmlBrandIcon,
  },
  { slug: "css", label: "CSS", category: "Languages", Component: CssBrandIcon },
  {
    slug: "python",
    label: "Python",
    category: "Languages",
    Component: PythonBrandIcon,
  },
  {
    slug: "java",
    label: "Java",
    category: "Languages",
    Component: JavaBrandIcon,
  },
  { slug: "php", label: "PHP", category: "Languages", Component: PhpBrandIcon },
  {
    slug: "laravel",
    label: "Laravel",
    category: "Languages",
    Component: LaravelBrandIcon,
  },

  // Databases
  {
    slug: "mysql",
    label: "MySQL",
    category: "Databases",
    Component: MysqlBrandIcon,
  },
  {
    slug: "postgresql",
    label: "PostgreSQL",
    category: "Databases",
    Component: PostgresBrandIcon,
  },
  {
    slug: "mongodb",
    label: "MongoDB",
    category: "Databases",
    Component: MongodbBrandIcon,
  },
  {
    slug: "supabase",
    label: "Supabase",
    category: "Databases",
    Component: SupabaseBrandIcon,
  },
  {
    slug: "firebase",
    label: "Firebase",
    category: "Databases",
    Component: FirebaseBrandIcon,
  },
  {
    slug: "redis",
    label: "Redis",
    category: "Databases",
    Component: RedisIcon,
  },

  // Tools
  { slug: "git", label: "Git", category: "Tools", Component: GitBrandIcon },
  {
    slug: "github-tool",
    label: "GitHub (tool)",
    category: "Tools",
    Component: GithubBrandIcon,
  },
  {
    slug: "gitlab",
    label: "GitLab",
    category: "Tools",
    Component: GitlabBrandIcon,
  },
  {
    slug: "docker",
    label: "Docker",
    category: "Tools",
    Component: DockerBrandIcon,
  },
  {
    slug: "linux",
    label: "Linux",
    category: "Tools",
    Component: LinuxBrandIcon,
  },
  {
    slug: "windows",
    label: "Windows",
    category: "Tools",
    Component: WindowsBrandIcon,
  },
  {
    slug: "vscode",
    label: "VS Code",
    category: "Tools",
    Component: VscodeBrandIcon,
  },
  {
    slug: "vercel",
    label: "Vercel",
    category: "Tools",
    Component: VercelBrandIcon,
  },
  { slug: "aws", label: "AWS", category: "Tools", Component: AwsBrandIcon },
  {
    slug: "cloudflare",
    label: "Cloudflare",
    category: "Tools",
    Component: CloudflareBrandIcon,
  },
  {
    slug: "prisma",
    label: "Prisma",
    category: "Tools",
    Component: PrismaBrandIcon,
  },
  { slug: "expo", label: "Expo", category: "Tools", Component: ExpoBrandIcon },
  {
    slug: "flutter",
    label: "Flutter",
    category: "Tools",
    Component: FlutterBrandIcon,
  },
  {
    slug: "android",
    label: "Android",
    category: "Tools",
    Component: AndroidBrandIcon,
  },
  {
    slug: "apple",
    label: "Apple",
    category: "Tools",
    Component: AppleBrandIcon,
  },

  // Design
  {
    slug: "figma",
    label: "Figma",
    category: "Design",
    Component: FigmaBrandIcon,
  },
  {
    slug: "photoshop",
    label: "Photoshop",
    category: "Design",
    Component: PhotoshopBrandIcon,
  },
  {
    slug: "illustrator",
    label: "Illustrator",
    category: "Design",
    Component: IllustratorBrandIcon,
  },
  {
    slug: "canva",
    label: "Canva",
    category: "Design",
    Component: CanvaBrandIcon,
  },

  // Office
  { slug: "word", label: "Word", category: "Office", Component: WordBrandIcon },
  {
    slug: "excel",
    label: "Excel",
    category: "Office",
    Component: ExcelBrandIcon,
  },
  {
    slug: "powerpoint",
    label: "PowerPoint",
    category: "Office",
    Component: PowerpointBrandIcon,
  },
  {
    slug: "office",
    label: "Microsoft Office",
    category: "Office",
    Component: OfficeBrandIcon,
  },

  // Collaboration
  {
    slug: "slack",
    label: "Slack",
    category: "Collaboration",
    Component: SlackBrandIcon,
  },
  {
    slug: "discord-tool",
    label: "Discord (tool)",
    category: "Collaboration",
    Component: DiscordBrandIcon,
  },
  {
    slug: "notion",
    label: "Notion",
    category: "Collaboration",
    Component: NotionBrandIcon,
  },
  {
    slug: "trello",
    label: "Trello",
    category: "Collaboration",
    Component: TrelloBrandIcon,
  },
  {
    slug: "jira",
    label: "Jira",
    category: "Collaboration",
    Component: JiraBrandIcon,
  },
  {
    slug: "zoom",
    label: "Zoom",
    category: "Collaboration",
    Component: ZoomBrandIcon,
  },

  // Hardware
  {
    slug: "monitor",
    label: "Monitor",
    category: "Hardware",
    Component: MonitorIcon,
  },
  { slug: "cpu", label: "CPU", category: "Hardware", Component: CpuIcon },
  {
    slug: "wrench",
    label: "Repair",
    category: "Hardware",
    Component: WrenchIcon,
  },
  {
    slug: "printer",
    label: "Printer",
    category: "Hardware",
    Component: PrinterBrandIcon,
  },

  // Generic
  {
    slug: "database",
    label: "Database",
    category: "Generic",
    Component: DatabaseIcon,
  },
  { slug: "cloud", label: "Cloud", category: "Generic", Component: CloudIcon },
  {
    slug: "terminal",
    label: "Terminal",
    category: "Generic",
    Component: TerminalIcon,
  },
  { slug: "code", label: "Code", category: "Generic", Component: CodeIcon },
  {
    slug: "settings",
    label: "Settings",
    category: "Generic",
    Component: SettingsIcon,
  },

  // Commerce
  {
    slug: "stripe",
    label: "Stripe",
    category: "Commerce",
    Component: StripeBrandIcon,
  },
  {
    slug: "shopify",
    label: "Shopify",
    category: "Commerce",
    Component: ShopifyBrandIcon,
  },
  {
    slug: "wordpress",
    label: "WordPress",
    category: "Commerce",
    Component: WordpressBrandIcon,
  },

  // Media
  {
    slug: "chrome",
    label: "Chrome",
    category: "Media",
    Component: ChromeBrandIcon,
  },
  {
    slug: "camera",
    label: "Camera",
    category: "Media",
    Component: CameraBrandIcon,
  },
  {
    slug: "microphone",
    label: "Microphone",
    category: "Media",
    Component: MicrophoneBrandIcon,
  },
  {
    slug: "speaker",
    label: "Speaker",
    category: "Media",
    Component: SpeakerBrandIcon,
  },
];

export function resolveIcon(slug: string) {
  return ICONS.find((i) => i.slug === slug)?.Component ?? LinkIcon;
}
