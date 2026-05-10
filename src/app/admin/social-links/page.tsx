import { Save } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "روابط التواصل | مدى الناس" };

const SOCIAL_FIELDS = [
  { id: "facebook",  label: "فيسبوك",          placeholder: "https://facebook.com/madaalinsan",  color: "#1877F2", value: "https://facebook.com/madaalinsan" },
  { id: "instagram", label: "إنستغرام",         placeholder: "https://instagram.com/madaalinsan", color: "#E1306C", value: "https://instagram.com/madaalinsan" },
  { id: "twitter",   label: "X (تويتر)",         placeholder: "https://x.com/madaalinsan",         color: "#000000", value: "https://x.com/madaalinsan" },
  { id: "whatsapp",  label: "واتساب",            placeholder: "https://wa.me/967xxxxxxxxx",        color: "#25D366", value: "https://wa.me/967xxxxxxxxx" },
  { id: "telegram",  label: "تليجرام",           placeholder: "https://t.me/madaalinsan",          color: "#2AABEE", value: "https://t.me/madaalinsan" },
  { id: "youtube",   label: "يوتيوب",            placeholder: "https://youtube.com/@madaalinsan",  color: "#FF0000", value: "https://youtube.com/@madaalinsan" },
  { id: "email",     label: "البريد الإلكتروني", placeholder: "mailto:info@madaalinsan.com",       color: "#C99A3E", value: "mailto:info@madaalinsan.com" },
  { id: "phone",     label: "رقم الهاتف",        placeholder: "+967xxxxxxxxx",                     color: "#2F8F6B", value: "" },
];

export default function AdminSocialLinksPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">روابط التواصل الاجتماعي</h1>
        <p className="text-gray-400 text-xs font-tajawal mt-0.5">إدارة روابط المنصة على مواقع التواصل</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        {SOCIAL_FIELDS.map((field) => (
          <div key={field.id} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm font-cairo"
              style={{ backgroundColor: field.color }}
            >
              {field.label[0]}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#0E1B2A] font-cairo mb-1.5">
                {field.label}
              </label>
              <input
                type="url"
                defaultValue={field.value}
                placeholder={field.placeholder}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
                dir="ltr"
              />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-6 py-2.5 rounded-xl transition-colors">
            <Save size={16} />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
