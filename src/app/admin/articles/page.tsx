import { Plus, Search, Filter, Edit, Trash2, Eye, Send, Archive } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "إدارة المقالات | مدى الناس" };

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  published:  { label: "منشور",         className: "bg-green-100 text-green-700" },
  draft:      { label: "مسودة",          className: "bg-gray-100 text-gray-600" },
  review:     { label: "قيد المراجعة",   className: "bg-blue-100 text-blue-700" },
  needs_edit: { label: "يحتاج تعديل",    className: "bg-orange-100 text-orange-700" },
  scheduled:  { label: "مجدول",          className: "bg-purple-100 text-purple-700" },
  archived:   { label: "مؤرشف",          className: "bg-gray-100 text-gray-500" },
  rejected:   { label: "مرفوض",          className: "bg-red-100 text-red-700" },
};

const MOCK_ARTICLES = [
  { id: "1", title: "أم خالد.. ثلاثون عاماً تحمل الطين وتزرع الأمل", author: "أحمد المنصوري", category: "قصة وكفاح",  status: "published",  date: "2026-05-08", views: 1240 },
  { id: "2", title: "مدرسة بلا سقف.. أطفال يتعلمون تحت المطر",       author: "سارة الزهراني",  category: "الأخبار",    status: "published",  date: "2026-05-06", views: 892 },
  { id: "3", title: "تحقيق عن تسرب الأطفال من المدارس",              author: "سارة الزهراني",  category: "أقلام الناس",status: "draft",      date: "2026-05-07", views: 0 },
  { id: "4", title: "عائلة نازحة تبني من الصفر",                     author: "خالد البريكي",   category: "حياة الناس", status: "review",     date: "2026-05-05", views: 0 },
  { id: "5", title: "رسالة إلى من يعنيه الأمر",                      author: "نورة العتيبي",   category: "رسالة إنسان",status: "needs_edit", date: "2026-05-04", views: 0 },
  { id: "6", title: "شاب من الأحياء الشعبية يبني مشروعه بيده",       author: "أحمد المنصوري", category: "قصة وكفاح",  status: "scheduled",  date: "2026-05-10", views: 0 },
  { id: "7", title: "التعليم حق لا رفاهية",                          author: "سارة الزهراني",  category: "أقلام الناس",status: "published",  date: "2026-04-28", views: 650 },
];

export default function AdminArticlesPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إدارة المقالات</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">إجمالي {MOCK_ARTICLES.length} مقالات</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />
          إضافة مقال
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[180px] relative">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن مقال..."
            className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E]"
          />
        </div>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] bg-white">
          <option value="">كل الحالات</option>
          {Object.entries(STATUS_STYLES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] bg-white">
          <option value="">كل الأقسام</option>
          <option>الأخبار الإنسانية</option>
          <option>قصة وكفاح</option>
          <option>حياة الناس</option>
          <option>رسالة إنسان</option>
          <option>قضايا وملفات</option>
          <option>أقلام الناس</option>
        </select>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-tajawal px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={14} />
          فلترة
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">العنوان</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">الكاتب</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden lg:table-cell">القسم</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الحالة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">التاريخ</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden lg:table-cell">المشاهدات</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_ARTICLES.map((article) => {
                const st = STATUS_STYLES[article.status];
                return (
                  <tr key={article.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#0E1B2A] font-cairo text-sm line-clamp-1">{article.title}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-600 font-tajawal text-xs">{article.author}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-gray-600 font-tajawal text-xs">{article.category}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${st.className}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-400 font-tajawal text-xs">{article.date}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-gray-500 font-tajawal text-xs">{article.views.toLocaleString("ar-SA")}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="عرض">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#C99A3E] hover:bg-[#C99A3E]/10 transition-colors" title="تعديل">
                          <Edit size={14} />
                        </button>
                        {article.status === "draft" || article.status === "review" ? (
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="نشر">
                            <Send size={14} />
                          </button>
                        ) : (
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="أرشفة">
                            <Archive size={14} />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="حذف">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-tajawal">عرض 1-7 من 7 مقالات</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-cairo transition-colors ${p === 1 ? "bg-[#C99A3E] text-white" : "text-gray-500 hover:bg-gray-100"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
