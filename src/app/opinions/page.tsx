import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import AuthorCard from "@/components/ui/AuthorCard";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { getArticlesByCategory, AUTHORS } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أقلام الناس",
  description: "مقالات المشاركين والكتّاب المستقلين من قلب المجتمع.",
};

export default function OpinionsPage() {
  const articles = getArticlesByCategory("opinions");
  const stories = getArticlesByCategory("stories");
  const allItems = [...articles, ...stories];
  const contributors = AUTHORS.slice(0, 4);

  return (
    <PageWrapper>
      <PageHero
        badge="أقلام الناس"
        badgeColor="#C99A3E"
        title="أقلام الناس"
        subtitle="مقالات من أبناء المجتمع تلامس الواقع وتعبّر عن الحياة كما هي"
      />

      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* المقالات */}
          <div className="mb-16">
            <SectionHeader
              title="أحدث المقالات"
              subtitle="أقلام مشاركة من كتّاب وكاتبات من مختلف المناطق"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(allItems.length > 0 ? allItems : articles).map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>

          {/* الكتّاب */}
          <div className="mb-14">
            <SectionHeader
              title="كتّابنا المشاركون"
              subtitle="نخبة من الكتّاب الذين يشاركون أقلامهم على مدى الناس"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((author) => (
                <AuthorCard
                  key={author.id}
                  author={author}
                  articleCount={allItems.filter((a) => a.author.id === author.id).length}
                />
              ))}
            </div>
          </div>

          {/* بانر اكتب معنا */}
          <div className="max-w-2xl mx-auto">
            <WriteWithUsBanner />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
