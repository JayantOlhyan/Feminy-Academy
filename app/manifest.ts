import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Feminy Academy by Sunita Rathee",
    short_name: "Feminy Academy",
    description: "Professional Beauty & Cosmetology Courses in Hindi",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#7A1F3D",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
