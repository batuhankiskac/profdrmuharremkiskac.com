import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login", "/api/"],
      },
    ],
    sitemap: "https://profdrmuharremkiskac.com/sitemap.xml",
    host: "https://profdrmuharremkiskac.com",
  };
}
