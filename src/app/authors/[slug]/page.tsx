import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, PenLine } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import Badge from "@/components/ui/Badge";
import ArticleCard from "@/components/ui/ArticleCard";
import SocialIcon from "@/components/ui/SocialIcon";
import type { SocialPlatformId } from "@/components/ui/SocialIcon";
import WriteWithUsBanner from "@/components/ui/WriteWithUsBanner";
import { getAuthorBySlug, getArticlesByAuthor, AUTHORS } from "@/lib/mock-data";
import { formatDateArabic, buildMetadata } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AUTHORS.filter((a) => a.slug).map((a) => ({ slug: a.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};
  return buildMetadata({
    title: `${author.name} | كاتب في مدى الناس`,
    description: author.bio,
    image: author.avatar,
    keywords: [author.name, author.role ?? "كاتب", "مدى الناس"],
  });
}

// خريطة: مفتاح SocialLinks → SocialPlatformId
const SOCIAL_PLATFORM_MAP: Record<string, SocialPlatformId> = {
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  whatsapp: "whatsapp",
  telegram: "telegram",
  youtube: "youtube",
  email: "email",
  website: "website",
};

export default function AuthorPage({ params }: Props) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const articles = getArticlesByAuthor(author.id);
  const totalReadingTime = articles.reduce((sum, a) => sum + a.readingTime, 0);

  return (
    <PageWrapper>
      {/* ── Hero الكاتب ── */}
      <div className="bg-navy pt-16 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6">

          {/* رابط العودة */}
          <Link
            href="/opinions"
            className="inline-flex items-center gap-2 text-ivory/60 hover:text-gold text-sm font-cairo mb-8 transition-colors"
          >
            <ArrowRight size={15} />
            أقلام الناس
          </Link>

          {/* بطاقة الكاتب */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm mb-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* الصورة */}
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={100}
                  height={100}
                  className="rounded-2xl object-cover ring-4 ring-gold/30 shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gold/20 flex items-center justify-center text-gold font-bold text-3xl font-kufi shrink-0">
                  {author.name[0]}
                </div>
              )}

              {/* المعلومات */}
              <div className="flex-1 text-center md:text-right">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3 justify-center md:justify-start">
                  <h1 className="text-2xl md:text-3xl font-bold font-cairo text-white">
                    {author.name}
                  </h1>
                  {author.role && (
                    <Badge variant="gold" className="self-center md:self-auto">
                      {author.role}
                    </Badge>
                  )}
                </div>

                <p className="text-ivory/70 text-sm md:text-base font-tajawal leading-relaxed mb-5 max-w-2xl">
                  {author.bio}
                </p>

                {/* إحصائيات سريعة */}
                <div className="flex flex-wrap items-center gap-5 justify-center md:justify-start mb-5">
                  <span className="flex items-center gap-1.5 text-ivory/60 text-sm font-tajawal">
                    <BookOpen size={15} className="text-gold" />
                    {articles.length} مقال
                  </span>
                  <span className="flex items-center gap-1.5 text-ivory/60 text-sm font-tajawal">
                    <Clock size={15} className="text-gold" />
                    {totalReadingTime} دقيقة محتوى
                  </span>
                  {author.joinedAt && (
                    <span className="flex items-center gap-1.5 text-ivory/60 text-sm font-tajawal">
                      <Calendar size={15} className="text-gold" />
                      منذ {formatDateArabic(author.joinedAt)}
                    </span>
                  )}
                </div>

                {/* روابط اجتماعية */}
                {author.social && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    {(Object.keys(author.social) as Array<keyof typeof author.social>).map((key) => {
                      const href = author.social![key];
                      if (!href) return null;
                      const platform = SOCIAL_PLATFORM_MAP[key];
                      if (!platform) return null;
                      return (
                        <a
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={String(key)}
                          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-all duration-200 hover:scale-110 text-ivory/70 hover:text-gold"
                        >
                          <SocialIcon platform={platform} size={15} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* موجة انتقال */}
        <div className="h-8 bg-ivory mt-0" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </div>

      {/* ── المقالات ── */}
      <section className="bg-ivory py-14">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {articles.length > 0 ? (
            <>
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-cairo text-navy mb-2">
                    مقالات {author.name}
                  </h2>
                  <div className="w-12 h-1 bg-gold rounded-full" />
                </div>
                <span className="text-text-muted text-sm font-tajawal">
                  {articles.length} مقال
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <PenLine size={40} className="text-gold/40 mx-auto mb-4" />
              <h3 className="text-lg font-bold font-cairo text-navy mb-2">
                لا توجد مقالات بعد
              </h3>
              <p className="text-text-muted font-tajawal text-sm">
                لم ينشر هذا الكاتب أي مقالات حتى الآن
              </p>
            </div>
          )}

          {/* بانر اكتب معنا */}
          <WriteWithUsBanner />
        </div>
      </section>
    </PageWrapper>
  );
}
