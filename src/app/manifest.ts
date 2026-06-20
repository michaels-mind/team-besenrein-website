import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "team besenrein",
    short_name: "besenrein",
    description:
      "team besenrein – Entrümpelung, Umzüge, Garten- und Abrissarbeiten in Nienburg und Umgebung.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#24559a",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
