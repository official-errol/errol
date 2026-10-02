import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginDialogProvider } from "@/components/auth/login-dialog-provider";
import { Toaster } from "@/components/ui/toast";
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

export const metadata: Metadata = {
  title: {
    default: "Sidequest Studio",
    template: "%s · Sidequest Studio",
  },
  description:
    "A personal multi-purpose platform: portfolio, blog, and file sharing.",
  metadataBase: new URL("https://sidequeststudio.vercel.app"),
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
      <head>
        <meta
          name="google-site-verification"
          content="2S9obhawLxeaQKoDR3e-mN-DQdxH52DUuo9jcaReSjY"
        />
      </head>
      <body>
        <ThemeProvider>
          <LoginDialogProvider>
            <Toaster>{children}</Toaster>
          </LoginDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
