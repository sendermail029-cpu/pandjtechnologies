import type { MetadataRoute } from "next";

// Let search engines crawl the site (not the admin area or the API), and point them to the sitemap
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: "https://www.pandjtechnologies.com/sitemap.xml",
    host: "https://www.pandjtechnologies.com",
  };
}
