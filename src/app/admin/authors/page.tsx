import Image from "next/image";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "إدارة الكتّاب | مدى الناس" };

const MOCK_AUTHORS = [
  { id: "1", name: "أحمد المنصوري", role: "محرر",            email: "ahmed@madaalinsan.com", avatar: "https://i.pravatar.cc/150?img=11", articles: 3, active: true },
  { id: "2", name: "سارة الزهراني",  role: "كاتبة مشاركة",    email: "sara@madaalinsan.com",  avatar: "https://i.pravatar.cc/150?img=47", articles: 2, active: true },
  { id: "3", name: "خالد البريكي",   role: "كاتب مشارك",     email: "khaled@madaalinsan.com", avatar: "https://i.pravatar.cc/150?img=33", articles: 1, active: true },
  { id: "4", name: "نورة العتيبي",   role: "كاتبة مشاركة",   email: "noura@madaalinsan.com",  avatar: "https://i.pravatar.cc/150?img=45", articles: 1, active: true },
  { id: "5", name: "هيئة التحرير",  role: "هيئة التحرير",     email: "editorial@madaalinsan.com", avatar: "https://i.pravatar.cc/150?img=60", articles: 0, active: true },
];

export default function AdminAuthorsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إدارة الكتّاب</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">{MOCK_AUTHORS.length} كتّاب مسجلون</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />
          إضافة كاتب
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الكاتب</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">البريد</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">الدور</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">المقالات</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الحالة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_AUTHORS.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                      <span className="font-semibold text-[#0E1B2A] font-cairo text-sm">{author.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-gray-500 font-tajawal text-xs">{author.email}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="bg-[#C99A3E]/10 text-[#A87E2E] text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full">
                      {author.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-600 font-tajawal text-sm">{author.articles}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${author.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {author.active ? "نشط" : "معطل"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <a href={`/authors/${author.id}`} target="_blank" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="الصفحة">
                        <ExternalLink size={14} />
                      </a>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#C99A3E] hover:bg-[#C99A3E]/10 transition-colors" title="تعديل">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="حذف">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
