import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import { getArticlesByCategory, getRecentArticles } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قصة وكفاح",
  description: "قصص إنسانية حقيقية عن الصمود والإرادة والأمل رغم الصعاب.",
};

export default function StoriesPage() {
  const articles = getArticlesByCategory("stories");
  const fallback = getRecentArticles(4);
  const items = articles.length > 0 ? articles : fallback;

  return (
    <PageWrapper>
      <PageHero
        badge="قصة وكفاح"
        badgeColor="#C99A3E"
        title="قصة وكفاح"
        subtitle="قصص حقيقية عن أناس تحدّوا الصعاب وصنعوا مستقبلهم بإرادتهم"
      />

      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* البطاقة المميزة */}
          {items[0] && (
            <div className="mb-8">
              <ArticleCard article={items[0]} variant="featured" />
            </div>
          )}

          {/* بقية البطاقات */}
          {items.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {items.slice(1).map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          <div className="max-w-2xl mx-auto mt-10">
            <WriteWithUsBanner />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
