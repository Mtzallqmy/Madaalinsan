import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import { getArticlesByCategory, getRecentArticles } from "@/lib/mock-data";
import Link from "next/link";
import { Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "رسالة إنسان",
  description: "رسائل مفتوحة من الناس إلى الجهات المعنية والمجتمع.",
};

export default function LettersPage() {
  const articles = getArticlesByCategory("letters");
  const fallback = getRecentArticles(3);
  const items = articles.length > 0 ? articles : fallback;

  return (
    <PageWrapper>
      <PageHero
        badge="رسالة إنسان"
        badgeColor="#0F766E"
        title="رسالة إنسان"
        subtitle="رسائل مفتوحة من قلوب الناس إلى الجهات المعنية، المجتمع، وكل من يهمه الأمر"
      />

      {/* مقدمة توضيحية */}
      <section className="bg-white py-10">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-text-light text-base font-tajawal leading-[2]">
            هذه الصفحة مساحة للناس لكتابة رسائل مفتوحة إلى من يعنيه الأمر. رسائل بلا زخرفة، تحمل حقيقة واقع يعيشه أصحابها كل يوم.
          </p>
          <Link
            href="/send-story"
            className="inline-flex items-center gap-2 mt-6 bg-teal hover:bg-teal-dark text-white font-bold font-cairo px-6 py-3 rounded-xl transition-all duration-300 text-sm"
          >
            <Send size={16} />
            أرسل رسالتك
          </Link>
        </div>
      </section>

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
