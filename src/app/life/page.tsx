import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import { getArticlesByCategory, getRecentArticles } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حياة الناس",
  description: "يوميات وحكايات الناس العاديين في مواجهة الحياة.",
};

export default function LifePage() {
  const articles = getArticlesByCategory("life");
  const fallback = getRecentArticles(3);
  const items = articles.length > 0 ? articles : fallback;

  return (
    <PageWrapper>
      <PageHero
        badge="حياة الناس"
        badgeColor="#2F8F6B"
        title="حياة الناس"
        subtitle="يوميات وحكايات من قلب الواقع، من أناس عاديين يخوضون معارك غير عادية"
      />

      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {items.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <WriteWithUsBanner />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
