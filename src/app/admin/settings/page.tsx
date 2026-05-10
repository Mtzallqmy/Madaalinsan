import { Save, Globe, Mail, Bell, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الإعدادات | مدى الناس" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">إعدادات الموقع</h1>
        <p className="text-gray-400 text-xs font-tajawal mt-0.5">إدارة الإعدادات العامة للمنصة</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Globe size={16} className="text-[#C99A3E]" />
          <h2 className="font-bold text-[#0E1B2A] font-cairo text-sm">الإعدادات العامة</h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">اسم الموقع</label>
            <input
              type="text"
              defaultValue="مدى الناس"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">وصف الموقع</label>
            <textarea
              defaultValue="منصة إنسانية عربية مستقلة تنقل قصص الناس ورسائلهم وقضاياهم بكرامة ووضوح."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">رابط الموقع</label>
            <input
              type="url"
              defaultValue="https://madaalinsan.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">نص الشريط المتحرك</label>
            <input
              type="text"
              defaultValue="أخبار إنسانية • قصص من الواقع • أقلام الناس • رسائل للجهات المعنية"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Mail size={16} className="text-[#C99A3E]" />
          <h2 className="font-bold text-[#0E1B2A] font-cairo text-sm">إعدادات التواصل</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">البريد الرسمي</label>
              <input
                type="email"
                defaultValue="info@madaalinsan.com"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">بريد التحرير</label>
              <input
                type="email"
                defaultValue="editorial@madaalinsan.com"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Search size={16} className="text-[#C99A3E]" />
          <h2 className="font-bold text-[#0E1B2A] font-cairo text-sm">إعدادات SEO</h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">عنوان الصفحة الرئيسية</label>
            <input
              type="text"
              defaultValue="مدى الناس | منصة إنسانية عربية مستقلة"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">الكلمات المفتاحية الرئيسية</label>
            <input
              type="text"
              defaultValue="مدى الناس، أخبار إنسانية، قصص الناس، منصة عربية"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
            />
            <p className="text-[10px] text-gray-400 font-tajawal mt-1">افصل الكلمات بفاصلة</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">Google Analytics ID (اختياري)</label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell size={16} className="text-[#C99A3E]" />
          <h2 className="font-bold text-[#0E1B2A] font-cairo text-sm">إعدادات الإشعارات</h2>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: "إشعار عند ورود قصة جديدة",    id: "notify_story" },
            { label: "إشعار عند ورود بلاغ جديد",    id: "notify_report" },
            { label: "إشعار عند ورود مقال جديد",    id: "notify_article" },
            { label: "إشعار عند ورود رسالة تواصل",  id: "notify_contact" },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="flex items-center gap-3 cursor-pointer">
              <input
                id={item.id}
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#C99A3E]"
              />
              <span className="text-sm text-gray-700 font-tajawal">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save */}
      <div>
        <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-6 py-2.5 rounded-xl transition-colors">
          <Save size={16} />
          حفظ جميع الإعدادات
        </button>
      </div>
    </div>
  );
}
