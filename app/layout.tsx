import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginDialogProvider } from "@/components/auth/login-dialog-provider";
import { Toaster } from "@/components/ui/toast";
import { RegisterServiceWorker } from "@/components/pwa/register-sw";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Errol — Developer, Builder, Problem Solver",
    template: "%s · Errol",
  },
  description:
    "Personal portfolio, blog, and file-sharing platform. Projects, writing, and resources by Errol.",
  metadataBase: new URL(BASE_URL),
  applicationName: "Errol",
  authors: [{ name: "Errol", url: BASE_URL }],
  creator: "Errol",
  publisher: "Errol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Errol",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Errol",
    title: "Errol — Developer, Builder, Problem Solver",
    description: "Personal portfolio, blog, and file-sharing platform.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Errol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Errol — Developer, Builder, Problem Solver",
    description: "Personal portfolio, blog, and file-sharing platform.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "2S9obhawLxeaQKoDR3e-mN-DQdxH52DUuo9jcaReSjY",
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/rss.xml`,
    },
  },
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F11" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LoginDialogProvider>
            <Toaster>{children}</Toaster>
          </LoginDialogProvider>
        </ThemeProvider>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
