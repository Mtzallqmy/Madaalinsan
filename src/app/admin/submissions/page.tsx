import { Eye, Check, X, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الوارد | مدى الناس" };

const TABS = ["القصص الواردة", "المقالات الواردة", "البلاغات", "رسائل التواصل"];

const MOCK_SUBMISSIONS = [
  { id: "1", type: "story",   name: "محمود الريمي",    region: "صنعاء",   subject: "قصة أسرتي بعد النزوح",              date: "2026-05-09", status: "new" },
  { id: "2", type: "article", name: "فاطمة الحكيمي",   region: "تعز",     subject: "مقال: الفقر والتعليم في اليمن",       date: "2026-05-08", status: "review" },
  { id: "3", type: "report",  name: "مجهول",           region: "حجة",     subject: "بلاغ: طفل مريض يحتاج علاجاً عاجلاً", date: "2026-05-09", status: "new" },
  { id: "4", type: "contact", name: "سعيد البكري",     region: "عدن",     subject: "استفسار عن نشر قصة",                 date: "2026-05-07", status: "replied" },
  { id: "5", type: "story",   name: "أم يوسف",         region: "إب",      subject: "أسرة نازحة بدون مأوى",               date: "2026-05-06", status: "accepted" },
];

const TYPE_LABELS: Record<string, string> = {
  story: "قصة", article: "مقال", report: "بلاغ", contact: "رسالة",
};

const TYPE_STYLES: Record<string, string> = {
  story:   "bg-[#C99A3E]/10 text-[#A87E2E]",
  article: "bg-[#2F8F6B]/10 text-[#247558]",
  report:  "bg-[#B84C4C]/10 text-[#B84C4C]",
  contact: "bg-[#0F766E]/10 text-[#0F766E]",
};

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  new:      { label: "جديد",          className: "bg-yellow-100 text-yellow-700" },
  review:   { label: "قيد المراجعة",  className: "bg-blue-100 text-blue-700" },
  accepted: { label: "مقبول",         className: "bg-green-100 text-green-700" },
  rejected: { label: "مرفوض",        className: "bg-red-100 text-red-700" },
  replied:  { label: "تم الرد",      className: "bg-gray-100 text-gray-600" },
};

export default function AdminSubmissionsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">الوارد</h1>
        <p className="text-gray-400 text-xs font-tajawal mt-0.5">إجمالي {MOCK_SUBMISSIONS.length} وارد جديد</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl text-sm font-cairo transition-colors ${i === 0 ? "bg-[#C99A3E] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {tab}
            {i === 0 && <span className="mr-2 bg-white/30 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الموضوع</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">المُرسِل</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">المنطقة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">النوع</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الحالة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden lg:table-cell">التاريخ</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_SUBMISSIONS.map((sub) => {
                const st = STATUS_STYLES[sub.status];
                return (
                  <tr key={sub.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#0E1B2A] font-cairo text-sm line-clamp-1">{sub.subject}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-600 font-tajawal text-xs">{sub.name}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-500 font-tajawal text-xs">{sub.region}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${TYPE_STYLES[sub.type]}`}>
                        {TYPE_LABELS[sub.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${st.className}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-gray-400 font-tajawal text-xs">
                        <Clock size={11} />
                        {sub.date}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="عرض">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="قبول">
                          <Check size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="رفض">
                          <X size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
