import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ASTA",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#060816",
    theme_color: "#060816",
    icons: [
      {
        src: "/logo/logo-asta.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
