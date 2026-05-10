import PageWrapper from "@/components/layout/PageWrapper";
import PageHero from "@/components/ui/PageHero";
import CaseCard from "@/components/ui/CaseCard";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { CASES } from "@/lib/mock-data";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قضايا وملفات",
  description: "ملفات وقضايا إنسانية موثقة تحتاج إلى متابعة ومعالجة.",
};

export default function IssuesPage() {
  const urgent = CASES.filter((c) => c.status === "urgent");
  const active = CASES.filter((c) => c.status === "in-progress" || c.status === "under-review");
  const resolved = CASES.filter((c) => c.status === "resolved");

  return (
    <PageWrapper>
      <PageHero
        badge="قضايا وملفات"
        badgeColor="#0E1B2A"
        title="قضايا وملفات"
        subtitle="قضايا إنسانية موثقة نتابعها حتى تجد طريقها إلى الحل"
      />

      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-14">

          {/* القضايا العاجلة */}
          {urgent.length > 0 && (
            <div>
              <SectionHeader
                title="قضايا عاجلة"
                subtitle="تحتاج إلى تدخل فوري"
                action={
                  <Badge variant="urgent" className="flex items-center gap-1.5 text-xs">
                    <AlertTriangle size={12} />
                    {urgent.length} قضية
                  </Badge>
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {urgent.map((c) => (
                  <CaseCard key={c.id} caseItem={c} />
                ))}
              </div>
            </div>
          )}

          {/* قيد المتابعة */}
          {active.length > 0 && (
            <div>
              <SectionHeader
                title="قيد المتابعة"
                subtitle="قضايا رُصدت وجارٍ التعامل معها"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {active.map((c) => (
                  <CaseCard key={c.id} caseItem={c} />
                ))}
              </div>
            </div>
          )}

          {/* المحلولة */}
          {resolved.length > 0 && (
            <div>
              <SectionHeader
                title="قضايا تم حلها ✓"
                subtitle="نجاحات حققناها معاً"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resolved.map((c) => (
                  <CaseCard key={c.id} caseItem={c} />
                ))}
              </div>
            </div>
          )}

          {/* بلّغ عن حالة */}
          <div className="bg-navy rounded-2xl p-8 text-center">
            <h3 className="text-white text-xl font-bold font-cairo mb-3">
              هل تعلم عن حالة تحتاج متابعة؟
            </h3>
            <p className="text-ivory/70 text-sm font-tajawal mb-6">
              أرسل البلاغ وسيتولى فريقنا التحقق والمتابعة معك.
            </p>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 bg-urgent hover:bg-urgent-dark text-white font-bold font-cairo px-7 py-3 rounded-xl transition-all duration-300"
            >
              بلّغ عن حالة
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
