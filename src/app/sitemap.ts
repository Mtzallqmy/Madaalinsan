import type { MetadataRoute } from "next";
import { ARTICLES, CASES, AUTHORS } from "@/lib/mock-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://madaalinsan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── الصفحات الثابتة ───────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/news`,            lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/life`,            lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/stories`,         lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/letters`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/issues`,          lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/opinions`,        lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/about`,           lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,         lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/send-story`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/write`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/report`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // ── المقالات ──────────────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.9 : 0.8,
  }));

  // ── القضايا ───────────────────────────────────────────────────────────────
  const casePages: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${BASE_URL}/issues/${c.slug}`,
    lastModified: c.lastUpdated,
    changeFrequency: "daily" as const,
    priority: c.status === "urgent" ? 0.95 : 0.75,
  }));

  // ── صفحات الكتّاب ─────────────────────────────────────────────────────────
  const authorPages: MetadataRoute.Sitemap = AUTHORS.filter(
    (a): a is typeof a & { slug: string } => Boolean(a.slug)
  ).map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...casePages, ...authorPages];
}
