import { Plus, Edit, Eye, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "إدارة القضايا | مدى الناس" };

const CASE_STATUS_STYLES: Record<string, { label: string; className: string }> = {
  submitted:    { label: "وارد",             className: "bg-yellow-100 text-yellow-700" },
  under_review: { label: "قيد المراجعة",     className: "bg-blue-100 text-blue-700" },
  verified:     { label: "تم التحقق",        className: "bg-purple-100 text-purple-700" },
  published:    { label: "منشور",            className: "bg-green-100 text-green-700" },
  contacted:    { label: "تم التواصل",       className: "bg-teal-100 text-teal-700" },
  in_progress:  { label: "قيد المتابعة",     className: "bg-blue-50 text-blue-600" },
  resolved:     { label: "تم الحل",          className: "bg-emerald-100 text-emerald-700" },
  rejected:     { label: "مرفوض",           className: "bg-red-100 text-red-700" },
};

const URGENCY_STYLES: Record<number, string> = {
  3: "bg-red-100 text-red-700",
  2: "bg-yellow-100 text-yellow-700",
  1: "bg-green-100 text-green-700",
};

const URGENCY_LABELS: Record<number, string> = { 3: "عالٍ", 2: "متوسط", 1: "منخفض" };

const MOCK_CASES = [
  { id: "1", title: "أسرة من سبعة أفراد تعيش في خيمة منذ عامين",      region: "محافظة ذمار",      type: "سكن",   urgency: 3, status: "in_progress",  updated: "2026-05-01" },
  { id: "2", title: "طفل يحتاج عملية عاجلة والأسرة عاجزة عن التكاليف",  region: "محافظة تعز",       type: "مرض",   urgency: 3, status: "contacted",    updated: "2026-05-05" },
  { id: "3", title: "تسرب جماعي من مدرسة قرية معزولة",                 region: "محافظة حجة",       type: "تعليم", urgency: 2, status: "under_review", updated: "2026-04-28" },
  { id: "4", title: "مسنّة وحيدة في منزل آيل للسقوط",                   region: "أمانة العاصمة",    type: "فقر",   urgency: 1, status: "resolved",     updated: "2026-04-20" },
  { id: "5", title: "بلاغ جديد: طفلة تحتاج علاجاً عاجلاً",              region: "محافظة صنعاء",     type: "مرض",   urgency: 3, status: "submitted",    updated: "2026-05-09" },
];

export default function AdminCasesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إدارة القضايا</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">{MOCK_CASES.length} قضية مسجلة</p>
        </div>
        <button className="flex items-center gap-2 bg-[#B84C4C] hover:bg-[#9A3A3A] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />
          رصد قضية
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">القضية</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">المنطقة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">النوع</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">العاجلية</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الحالة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden lg:table-cell">آخر تحديث</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CASES.map((c) => {
                const st = CASE_STATUS_STYLES[c.status];
                return (
                  <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#0E1B2A] font-cairo text-sm line-clamp-1">{c.title}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-gray-500 font-tajawal text-xs">
                        <MapPin size={11} className="text-[#C99A3E]" />
                        {c.region}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-500 font-tajawal text-xs">{c.type}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${URGENCY_STYLES[c.urgency]}`}>
                        {URGENCY_LABELS[c.urgency]}
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
                        {c.updated}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="عرض">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#C99A3E] hover:bg-[#C99A3E]/10 transition-colors" title="تعديل">
                          <Edit size={14} />
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
