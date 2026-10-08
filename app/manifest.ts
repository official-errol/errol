import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Errol — Portfolio, Blog, Files",
    short_name: "Errol",
    description:
      "Personal portfolio, blog, and file-sharing platform by Errol.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0F11",
    theme_color: "#0E0F11",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["portfolio", "productivity", "developer"],
    lang: "en",
  };
}
