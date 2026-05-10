import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import { getArticlesByCategory, getRecentArticles } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأخبار الإنسانية",
  description: "أحدث الأخبار والتقارير الإنسانية من مختلف المناطق والمجتمعات.",
};

export default function NewsPage() {
  const articles = getArticlesByCategory("news");
  const recent = getRecentArticles(3);

  return (
    <PageWrapper>
      <PageHero
        badge="الأخبار الإنسانية"
        badgeColor="#B84C4C"
        title="الأخبار الإنسانية"
        subtitle="تقارير وأخبار موثقة عن أوضاع الناس في مختلف المناطق"
      />

      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            // fallback: عرض أحدث المقالات
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {recent.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            <WriteWithUsBanner />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
