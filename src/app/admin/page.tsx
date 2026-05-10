import {
  FileText,
  AlertTriangle,
  Inbox,
  Users,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "لوحة الإدارة | مدى الناس" };

const STATS = [
  { label: "إجمالي المقالات", value: "156", change: "+12 هذا الشهر", icon: FileText, color: "#C99A3E", bg: "#FDF6E8" },
  { label: "القضايا النشطة", value: "23", change: "7 عاجلة", icon: AlertTriangle, color: "#B84C4C", bg: "#FFF0F0" },
  { label: "الوارد الجديد", value: "48", change: "12 يحتاج مراجعة", icon: Inbox, color: "#2F8F6B", bg: "#EDFAF4" },
  { label: "الكتّاب المشاركون", value: "34", change: "+3 هذا الأسبوع", icon: Users, color: "#0F766E", bg: "#E6F4F4" },
  { label: "إجمالي المشاهدات", value: "48.2K", change: "+18% هذا الشهر", icon: Eye, color: "#0E1B2A", bg: "#EEF0F3" },
  { label: "نسبة النشر", value: "72%", change: "من إجمالي المقدمات", icon: TrendingUp, color: "#C99A3E", bg: "#FDF6E8" },
];

const RECENT_ACTIVITIES = [
  { type: "article", text: "نُشر مقال: «أم خالد.. ثلاثون عاماً تحمل الطين»", time: "منذ ساعتين", status: "published", icon: FileText },
  { type: "case", text: "تحديث قضية: «أسرة من سبعة أفراد تعيش في خيمة»", time: "منذ 4 ساعات", status: "in-progress", icon: AlertTriangle },
  { type: "submission", text: "ورد بلاغ جديد: «طفلة تحتاج عملية قلب عاجلة»", time: "منذ 6 ساعات", status: "new", icon: Inbox },
  { type: "author", text: "انضم كاتب جديد: «محمد الشهري»", time: "أمس", status: "new", icon: Users },
  { type: "article", text: "حُفظ كمسودة: «تحقيق عن تسرب الأطفال»", time: "أمس", status: "draft", icon: Clock },
  { type: "case", text: "تم حل قضية: «مسنّة وحيدة في منزل آيل للسقوط»", time: "قبل يومين", status: "resolved", icon: CheckCircle },
];

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  new: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-600",
  resolved: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABELS: Record<string, string> = {
  published: "نُشر",
  "in-progress": "قيد المتابعة",
  new: "جديد",
  draft: "مسودة",
  resolved: "تم الحل",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0E1B2A] font-cairo">مرحباً بك في لوحة الإدارة</h1>
        <p className="text-gray-500 text-sm font-tajawal mt-1">
          هذه نظرة عامة على أداء منصة مدى الناس
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-gray-500 text-xs font-tajawal mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0E1B2A] font-cairo">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-tajawal mt-1">{stat.change}</p>
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#0E1B2A] font-cairo">آخر النشاطات</h2>
          <span className="text-xs text-gray-400 font-tajawal">آخر 7 أيام</span>
        </div>
        <div className="divide-y divide-gray-50">
          {RECENT_ACTIVITIES.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-tajawal truncate">{activity.text}</p>
                  <p className="text-xs text-gray-400 font-tajawal mt-0.5">{activity.time}</p>
                </div>
                <span className={`text-[10px] font-semibold font-cairo px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[activity.status]}`}>
                  {STATUS_LABELS[activity.status]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "مقال جديد", href: "/admin/articles", color: "#C99A3E", icon: FileText },
          { label: "رصد قضية", href: "/admin/cases", color: "#B84C4C", icon: AlertTriangle },
          { label: "مراجعة الوارد", href: "/admin/submissions", color: "#2F8F6B", icon: Inbox },
          { label: "إضافة كاتب", href: "/admin/authors", color: "#0F766E", icon: Users },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-center hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${action.color}15`, color: action.color }}
              >
                <Icon size={20} />
              </div>
              <span className="text-sm font-semibold text-[#0E1B2A] font-cairo">{action.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
