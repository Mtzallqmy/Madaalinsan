import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "إدارة الأقسام | مدى الناس" };

const MOCK_CATEGORIES = [
  { id: "1", label: "الأخبار الإنسانية", slug: "news",     color: "#B84C4C", icon: "Newspaper",  order: 1, active: true,  count: 2 },
  { id: "2", label: "حياة الناس",        slug: "life",     color: "#2F8F6B", icon: "Heart",      order: 2, active: true,  count: 1 },
  { id: "3", label: "قصة وكفاح",         slug: "stories",  color: "#C99A3E", icon: "BookOpen",   order: 3, active: true,  count: 2 },
  { id: "4", label: "رسالة إنسان",       slug: "letters",  color: "#0F766E", icon: "Mail",       order: 4, active: true,  count: 1 },
  { id: "5", label: "قضايا وملفات",      slug: "issues",   color: "#0E1B2A", icon: "FolderOpen", order: 5, active: true,  count: 0 },
  { id: "6", label: "أقلام الناس",       slug: "opinions", color: "#C99A3E", icon: "PenLine",    order: 6, active: true,  count: 1 },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إدارة الأقسام</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">{MOCK_CATEGORIES.length} أقسام نشطة</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />
          إضافة قسم
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg font-cairo shrink-0"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.label[0]}
                </div>
                <div>
                  <h3 className="font-bold text-[#0E1B2A] font-cairo text-sm">{cat.label}</h3>
                  <code className="text-xs text-gray-400 font-mono">/{cat.slug}</code>
                </div>
              </div>
              <button className="text-gray-300 hover:text-[#2F8F6B] transition-colors" title={cat.active ? "تعطيل" : "تفعيل"}>
                {cat.active ? <ToggleRight size={20} className="text-[#2F8F6B]" /> : <ToggleLeft size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-tajawal text-gray-500 border-t border-gray-50 pt-3">
              <span>{cat.count} مقال</span>
              <span>الترتيب: {cat.order}</span>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-[#C99A3E]/10 hover:text-[#C99A3E] transition-colors" title="تعديل">
                  <Edit size={13} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors" title="حذف">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
