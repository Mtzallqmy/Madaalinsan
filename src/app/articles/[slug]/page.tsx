import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Quote } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import Badge from "@/components/ui/Badge";
import ArticleCard from "@/components/ui/ArticleCard";
import ShareButtons from "@/components/ui/ShareButtons";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import AuthorCard from "@/components/ui/AuthorCard";
import {
  getArticleBySlug,
  getRelatedArticles,
  ARTICLES,
} from "@/lib/mock-data";
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryHref,
  formatDateArabic,
  formatReadingTime,
  buildMetadata,
} from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.summary,
    image: article.coverImage,
    keywords: article.tags,
  });
}

export default function ArticleDetailPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.id, article.category, 3);
  const categoryBadge = getCategoryColor(article.category).replace("badge-", "") as
    | "gold" | "hope" | "urgent" | "teal" | "navy";

  return (
    <PageWrapper>
      {/* صورة الغلاف */}
      <div className="relative h-[55vh] md:h-[65vh] w-full">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

        {/* رابط العودة */}
        <div className="absolute top-6 right-6">
          <Link
            href={getCategoryHref(article.category)}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-cairo px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
          >
            <ArrowRight size={15} />
            {getCategoryLabel(article.category)}
          </Link>
        </div>

        {/* شارة الفئة */}
        <div className="absolute bottom-8 right-6 left-6 max-w-4xl mx-auto">
          <Badge variant={categoryBadge} className="mb-4">
            {getCategoryLabel(article.category)}
          </Badge>
          <h1 className="text-white text-2xl md:text-4xl font-bold font-cairo leading-relaxed">
            {article.title}
          </h1>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <article className="bg-ivory">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* العمود الرئيسي */}
            <div className="lg:col-span-2">
              {/* ميتا المقال */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-ivory-dark">
                <div className="flex items-center gap-3">
                  {article.author.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-gold/30"
                    />
                  )}
                  <div>
                    <div className="font-bold font-cairo text-navy text-sm">
                      {article.author.name}
                    </div>
                    {article.author.role && (
                      <div className="text-xs text-gold font-tajawal">
                        {article.author.role}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-text-muted text-xs font-tajawal mr-auto">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDateArabic(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {formatReadingTime(article.readingTime)}
                  </span>
                </div>
              </div>

              {/* ملخص */}
              <p className="text-text text-lg font-tajawal leading-[2] mb-8 font-medium">
                {article.summary}
              </p>

              {/* الاقتباس البارز */}
              {article.quote && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border-r-4 border-gold shadow-card my-8 relative">
                  <Quote size={28} className="text-gold/30 absolute top-4 left-4" />
                  <p className="text-navy text-base md:text-lg font-tajawal leading-[2] italic font-medium">
                    "{article.quote}"
                  </p>
                </div>
              )}

              {/* المحتوى */}
              <div className="prose-arabic space-y-5">
                {article.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-text font-tajawal leading-[2.2] text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* الوسوم */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-ivory-dark">
                  <span className="text-sm font-semibold font-cairo text-text-light ml-1">
                    الوسوم:
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white text-navy text-xs font-cairo px-3 py-1.5 rounded-xl border border-gray-100 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* مشاركة */}
              <div className="mt-8 pt-6 border-t border-ivory-dark">
                <ShareButtons title={article.title} />
              </div>
            </div>

            {/* الشريط الجانبي */}
            <aside className="space-y-6">
              {/* بطاقة الكاتب */}
              <div>
                <h3 className="text-sm font-bold font-cairo text-navy mb-4 pb-2 border-b border-ivory-dark">
                  عن الكاتب
                </h3>
                <AuthorCard author={article.author} />
              </div>

              {/* بانر اكتب معنا */}
              <WriteWithUsBanner />
            </aside>
          </div>

          {/* مقالات مشابهة */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-ivory-dark">
              <h2 className="text-xl font-bold font-cairo text-navy mb-6">
                مقالات مشابهة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageWrapper>
  );
}
