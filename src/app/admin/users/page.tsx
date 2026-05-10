import Image from "next/image";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "المستخدمون | مدى الناس" };

type UserRole = "OWNER" | "ADMIN" | "EDITOR" | "REVIEWER" | "CONTRIBUTOR" | "FIELD_REPORTER" | "VIEWER";

const ROLE_STYLES: Record<UserRole, { label: string; className: string }> = {
  OWNER:         { label: "المالك",         className: "bg-purple-100 text-purple-700" },
  ADMIN:         { label: "أدمن",           className: "bg-red-100 text-red-700" },
  EDITOR:        { label: "محرر",           className: "bg-blue-100 text-blue-700" },
  REVIEWER:      { label: "مراجع",          className: "bg-yellow-100 text-yellow-700" },
  CONTRIBUTOR:   { label: "مساهم",          className: "bg-green-100 text-green-700" },
  FIELD_REPORTER:{ label: "مراسل ميداني",   className: "bg-teal-100 text-teal-700" },
  VIEWER:        { label: "مشاهد",          className: "bg-gray-100 text-gray-600" },
};

const MOCK_USERS: {
  id: string; name: string; email: string; role: UserRole;
  avatar: string; active: boolean; lastLogin: string;
}[] = [
  { id: "1", name: "المدير العام",    email: "admin@madaalinsan.com",    role: "OWNER",         avatar: "https://i.pravatar.cc/150?img=60", active: true,  lastLogin: "2026-05-10" },
  { id: "2", name: "أحمد المنصوري",  email: "ahmed@madaalinsan.com",    role: "EDITOR",        avatar: "https://i.pravatar.cc/150?img=11", active: true,  lastLogin: "2026-05-09" },
  { id: "3", name: "سارة الزهراني",  email: "sara@madaalinsan.com",     role: "EDITOR",        avatar: "https://i.pravatar.cc/150?img=47", active: true,  lastLogin: "2026-05-08" },
  { id: "4", name: "خالد البريكي",   email: "khaled@madaalinsan.com",   role: "REVIEWER",      avatar: "https://i.pravatar.cc/150?img=33", active: true,  lastLogin: "2026-05-07" },
  { id: "5", name: "نورة العتيبي",   email: "noura@madaalinsan.com",    role: "CONTRIBUTOR",   avatar: "https://i.pravatar.cc/150?img=45", active: true,  lastLogin: "2026-05-06" },
  { id: "6", name: "محمد الميسري",   email: "field@madaalinsan.com",    role: "FIELD_REPORTER", avatar: "https://i.pravatar.cc/150?img=52", active: false, lastLogin: "2026-04-20" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إدارة المستخدمين</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">{MOCK_USERS.length} مستخدمون مسجلون</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0E1B2A] hover:bg-[#162436] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />
          إضافة مستخدم
        </button>
      </div>

      {/* Role Legend */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-gray-500 font-cairo ml-2 flex items-center gap-1">
          <Shield size={13} />
          الأدوار:
        </span>
        {(Object.entries(ROLE_STYLES) as [UserRole, { label: string; className: string }][]).map(([key, val]) => (
          <span key={key} className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${val.className}`}>
            {val.label}
          </span>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">المستخدم</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden md:table-cell">البريد</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الدور</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">الحالة</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3 hidden lg:table-cell">آخر دخول</th>
                <th className="text-right text-xs font-semibold text-gray-500 font-cairo px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_USERS.map((user) => {
                const role = ROLE_STYLES[user.role];
                return (
                  <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={34}
                          height={34}
                          className="rounded-full object-cover"
                        />
                        <span className="font-semibold text-[#0E1B2A] font-cairo text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gray-500 font-tajawal text-xs">{user.email}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${role.className}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full ${user.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {user.active ? "نشط" : "معطل"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-gray-400 font-tajawal text-xs">{user.lastLogin}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#C99A3E] hover:bg-[#C99A3E]/10 transition-colors" title="تعديل">
                          <Edit size={14} />
                        </button>
                        {user.role !== "OWNER" && (
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="حذف">
                            <Trash2 size={14} />
                          </button>
                        )}
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
