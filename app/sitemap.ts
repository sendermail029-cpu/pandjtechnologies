import type { MetadataRoute } from "next";
import { services } from "@/lib/site";
import { getOpenJobs } from "@/lib/jobs";

const base = "https://www.pandjtechnologies.com";

// Every public page, so search engines find them all (the test center is marked as a top page)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const jobs = await getOpenJobs().catch(() => []);

  return [
    page("/", 1, "weekly"),
    page("/test-center", 0.95, "monthly"),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/contact", 0.8),
    page("/about", 0.7),
    page("/how-we-work", 0.6),
    page("/clients", 0.6),
    page("/careers", 0.7, "weekly"),
    ...jobs.map((j) => page(`/careers/${j.id}`, 0.5, "weekly")),
    page("/faqs", 0.6),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}
