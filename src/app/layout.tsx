import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Cairo, Tajawal } from "next/font/google";
import "./globals.css";

// ─── تحميل الخطوط عبر next/font (لا CDN، لا تكرار) ───────────────────────
const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-kufi",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "مدى الناس | منصة إنسانية عربية مستقلة",
    template: "%s | مدى الناس",
  },
  description:
    "مدى الناس منصة إنسانية مستقلة تنقل قصص الناس، مقالاتهم، رسائلهم، وقضاياهم بكرامة ووضوح، حتى يصل الصوت إلى من يهمه الأمر.",
  keywords: [
    "مدى الناس",
    "أخبار إنسانية",
    "قصص الناس",
    "منصة عربية",
    "إنسانية",
    "فقر",
    "نزوح",
    "تعليم",
  ],
  metadataBase: new URL("https://madaalinsan.com"),
  openGraph: {
    title: "مدى الناس | منصة إنسانية عربية مستقلة",
    description: "نمدّ صوت الإنسان… حتى لا تبقى القصة وحيدة",
    locale: "ar_SA",
    type: "website",
    siteName: "مدى الناس",
    url: "https://madaalinsan.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "مدى الناس | منصة إنسانية عربية مستقلة",
    description: "نمدّ صوت الإنسان… حتى لا تبقى القصة وحيدة",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoKufi.variable} ${cairo.variable} ${tajawal.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
