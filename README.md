# مدى الناس — Madaa Linsan

> منصة إنسانية عربية مستقلة تنقل قصص الناس، مقالاتهم، رسائلهم، وقضاياهم بكرامة ووضوح.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Mtzallqmy/Madaalinsan)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)

---

## 📌 فكرة المشروع

**مدى الناس** منصة إنسانية عربية RTL مستقلة مبنية بـ Next.js 14 App Router، تهدف إلى:
- نشر قصص وأخبار إنسانية من المجتمع
- متابعة القضايا الإنسانية العاجلة
- استقبال مقالات الكتّاب المشاركين
- استقبال بلاغات ورسائل المجتمع
- لوحة إدارة كاملة (UI جاهز للربط بـ Supabase)

---

## 🛠️ التقنيات

| التقنية | الإصدار | الغرض |
|---------|---------|-------|
| Next.js | 14.2.5 | Framework |
| React | 18 | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.4 | Styling |
| next/font | — | Arabic Fonts (Cairo, Tajawal, Noto Kufi) |
| lucide-react | 0.395 | Icons |
| clsx + tailwind-merge | — | Class utilities |

---

## 🚀 طريقة التشغيل

### المتطلبات
- Node.js 18+ أو 20+
- npm أو pnpm

### الخطوات

```bash
# 1. تثبيت الحزم
npm install

# 2. نسخ متغيرات البيئة
cp .env.example .env.local
# عدّل .env.local بقيمك الخاصة

# 3. تشغيل بيئة التطوير
npm run dev

# 4. بناء للإنتاج
npm run build

# 5. تشغيل الإنتاج
npm start
```

---

## 🌐 متغيرات البيئة

| المتغير | مطلوب | الوصف |
|---------|-------|-------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | رابط الموقع |
| `DATABASE_URL` | للمستقبل | PostgreSQL connection string |
| `DIRECT_URL` | للمستقبل | للـ Prisma migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | للمستقبل | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | للمستقبل | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | للمستقبل | Server-only (لا تضعه في Client) |
| `AUTH_SECRET` | للمستقبل | JWT secret (32+ chars) |

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx          # Root layout + Arabic fonts
│   ├── page.tsx            # الصفحة الرئيسية
│   ├── globals.css         # Global styles RTL
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt
│   ├── not-found.tsx       # 404
│   ├── about/              # من نحن
│   ├── articles/[slug]/    # تفاصيل المقال
│   ├── authors/[slug]/     # صفحة الكاتب
│   ├── contact/            # تواصل معنا
│   ├── issues/             # قضايا وملفات
│   ├── issues/[slug]/      # تفاصيل القضية
│   ├── letters/            # رسالة إنسان
│   ├── life/               # حياة الناس
│   ├── login/              # تسجيل الدخول (Admin)
│   ├── news/               # الأخبار الإنسانية
│   ├── opinions/           # أقلام الناس
│   ├── report/             # بلّغ عن حالة
│   ├── send-story/         # أرسل قصتك
│   ├── stories/            # قصة وكفاح
│   ├── write/              # اكتب معنا
│   └── admin/              # لوحة الإدارة (UI)
│       ├── layout.tsx
│       ├── page.tsx
│       ├── articles/
│       ├── authors/
│       ├── cases/
│       ├── categories/
│       ├── media/
│       ├── settings/
│       ├── social-links/
│       ├── submissions/
│       └── users/
├── components/
│   ├── forms/              # نماذج التفاعل
│   ├── home/               # مكونات الصفحة الرئيسية
│   ├── layout/             # Header, Footer, PageWrapper
│   └── ui/                 # مكونات UI قابلة لإعادة الاستخدام
└── lib/
    ├── mock-data.ts        # بيانات تجريبية
    ├── navigation.ts       # قوائم التنقل
    ├── sections.ts         # الأقسام الديناميكية
    ├── social-links.ts     # روابط التواصل
    ├── types.ts            # TypeScript types
    └── utils.ts            # دوال مساعدة
```

---

## 🎨 الهوية البصرية

| اللون | المتغير | الاستخدام |
|-------|---------|-----------|
| `#0E1B2A` | navy | خلفيات رئيسية |
| `#F5EFE3` | ivory | خلفيات فاتحة |
| `#C99A3E` | gold | لون التمييز |
| `#2F8F6B` | hope | اللون الإيجابي |
| `#B84C4C` | urgent | العاجل/التحذير |
| `#0F766E` | teal | اللون الثانوي |

**الخطوط:** Cairo · Tajawal · Noto Kufi Arabic

---

## 📱 الصفحات الرئيسية

| الصفحة | المسار |
|--------|--------|
| الرئيسية | `/` |
| الأخبار | `/news` |
| حياة الناس | `/life` |
| قصة وكفاح | `/stories` |
| رسالة إنسان | `/letters` |
| قضايا وملفات | `/issues` |
| أقلام الناس | `/opinions` |
| من نحن | `/about` |
| تواصل معنا | `/contact` |
| أرسل قصتك | `/send-story` |
| اكتب معنا | `/write` |
| بلّغ عن حالة | `/report` |
| لوحة الإدارة | `/admin` |

---

## 🔮 المستقبل (CMS الكامل)

الهيكلة جاهزة للربط مع:
- **Supabase** — قاعدة بيانات PostgreSQL + Storage + Auth
- **Prisma** — ORM للبيانات
- **NextAuth.js / Supabase Auth** — تسجيل الدخول

الأنواع (Types) محددة مسبقاً في `src/lib/types.ts` لدعم:
- Article, Author, Case, Section, Tag
- MediaItem, SEOMeta, GeoMeta
- AdminUser, DashboardStats
- UserRole, ArticleStatus, CaseStatus

---

## 📦 النشر على Vercel

```bash
# 1. ادفع الكود على GitHub
git push origin main

# 2. اربط المشروع بـ Vercel
# vercel.com/new → اختر الـ repo

# 3. أضف متغيرات البيئة في Vercel Dashboard

# 4. النشر تلقائي مع كل push
```

---

## 📄 الترخيص

جميع الحقوق محفوظة © مدى الناس 2026
