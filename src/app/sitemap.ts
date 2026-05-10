import type { MetadataRoute } from "next";
import { ARTICLES, AUTHORS, CASES } from "@/lib/mock-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://madaalinsan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/news",
    "/life",
    "/stories",
    "/letters",
    "/issues",
    "/opinions",
    "/send-story",
    "/write",
    "/report",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseRoutes = CASES.map((caseItem) => ({
    url: `${SITE_URL}/issues/${caseItem.slug}`,
    lastModified: new Date(caseItem.lastUpdated || caseItem.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const authorRoutes = AUTHORS.map((author) => ({
    url: `${SITE_URL}/authors/${author.slug || author.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes, ...caseRoutes, ...authorRoutes];
}
