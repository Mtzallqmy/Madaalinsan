import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Calendar, Mail, PenLine } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import ArticleCard from "@/components/ui/ArticleCard";
import Badge from "@/components/ui/Badge";
import { ARTICLES, AUTHORS } from "@/lib/mock-data";
import { buildMetadata, formatDateArabic } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

function getAuthorSlug(author: (typeof AUTHORS)[number]) {
  return author.slug || author.id;
}

function getAuthor(slug: string) {
  return AUTHORS.find((author) => getAuthorSlug(author) === slug);
}

export function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: getAuthorSlug(author) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const author = getAuthor(params.slug);
  if (!author) return {};

  return buildMetadata({
    title: `${author.name} | كتّاب مدى الناس`,
    description: author.bio,
    image: author.avatar,
    keywords: [author.name, "مدى الناس", "أقلام الناس", author.role || "كاتب"],
  });
}

export default function AuthorPage({ params }: Props) {
  const author = getAuthor(params.slug);
  if (!author) notFound();

  const authorArticles = ARTICLES.filter((article) => article.author.id === author.id);
  const latestArticle = authorArticles[0];

  return (
    <PageWrapper>
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-80" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <Link
            href="/opinions"
            className="inline-flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors text-sm font-cairo mb-8"
          >
            <ArrowRight size={16} />
            العودة إلى أقلام الناس
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={220}
                  height={220}
                  priority
                  className="h-44 w-44 md:h-56 md:w-56 rounded-[2rem] object-cover ring-4 ring-gold/30 shadow-gold"
                />
              ) : (
                <div className="h-44 w-44 md:h-56 md:w-56 rounded-[2rem] bg-gold text-white flex items-center justify-center text-6xl font-bold font-cairo">
                  {author.name[0]}
                </div>
              )}
            </div>

            <div className="text-center lg:text-right">
              <Badge variant="gold" className="mb-4">
                {author.role || "كاتب"}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold font-cairo leading-tight mb-5">
                {author.name}
              </h1>
              <p className="text-ivory/85 text-base md:text-lg font-tajawal leading-[2] max-w-3xl">
                {author.bio}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                  <BookOpen className="text-gold mx-auto lg:mx-0 mb-2" size={20} />
                  <div className="font-cairo font-bold text-xl">{authorArticles.length}</div>
                  <div className="font-tajawal text-xs text-ivory/70">مقال منشور</div>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                  <PenLine className="text-gold mx-auto lg:mx-0 mb-2" size={20} />
                  <div className="font-cairo font-bold text-xl">{author.role || "كاتب"}</div>
                  <div className="font-tajawal text-xs text-ivory/70">الصفة التحريرية</div>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 col-span-2 md:col-span-1">
                  <Calendar className="text-gold mx-auto lg:mx-0 mb-2" size={20} />
                  <div className="font-cairo font-bold text-sm">
                    {latestArticle ? formatDateArabic(latestArticle.publishedAt) : "قريبًا"}
                  </div>
                  <div className="font-tajawal text-xs text-ivory/70">آخر مساهمة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <h2 className="section-title">مقالات الكاتب</h2>
              <p className="section-subtitle mt-2">
                أرشيف المقالات والقصص المنشورة باسم {author.name}.
              </p>
            </div>
            <Link href="/write" className="btn-outline-gold w-fit">
              <Mail size={17} />
              اكتب معنا
            </Link>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center shadow-card">
              <p className="text-text-muted font-tajawal">لا توجد مقالات منشورة لهذا الكاتب بعد.</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
