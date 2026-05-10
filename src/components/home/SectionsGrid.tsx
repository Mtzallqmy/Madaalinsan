import SectionCard from "@/components/ui/SectionCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getActiveSections } from "@/lib/sections";
import { ARTICLES } from "@/lib/mock-data";

export default function SectionsGrid() {
  const sections = getActiveSections();

  return (
    <section className="py-16 md:py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="أقسام المنصة"
          subtitle="تصفح محتوى المنصة حسب الموضوع الذي يعنيك"
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sections.map((section) => {
            const count = ARTICLES.filter((a) => a.category === section.slug).length;
            return (
              <SectionCard key={section.id} section={section} articleCount={count} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
