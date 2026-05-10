"use client";

import { useState } from "react";
import { Send, CheckCircle, Eye, EyeOff, Upload } from "lucide-react";

const STORY_TYPES = [
  "قصة شخصية",
  "قصة عائلة",
  "قضية صحية",
  "قضية تعليمية",
  "نزوح أو تهجير",
  "فقر ومعاناة",
  "كفاح وصمود",
  "حالة عاجلة",
  "أخرى",
];

export default function SendStoryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowPublish, setAllowPublish] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-10 text-center">
        <div className="w-16 h-16 bg-hope/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-hope" />
        </div>
        <h3 className="text-xl font-bold font-cairo text-navy mb-3">تم استلام قصتك!</h3>
        <p className="text-text-light font-tajawal text-sm leading-relaxed">
          شكراً لمشاركتنا قصتك. سيراجعها فريق التحرير وسنتواصل معك قريباً.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-7 md:p-9">
      <div className="mb-7">
        <h2 className="text-xl font-bold font-cairo text-navy mb-2">نموذج إرسال القصة</h2>
        <p className="text-text-muted text-sm font-tajawal">
          جميع المعلومات تُعامَل بسرية تامة ولا تُنشر إلا بموافقتك.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* الاسم أو إخفاء */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label-field">الاسم</label>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="flex items-center gap-1.5 text-xs font-tajawal text-text-muted hover:text-gold transition-colors"
            >
              {isAnonymous ? <Eye size={13} /> : <EyeOff size={13} />}
              {isAnonymous ? "إظهار الاسم" : "إخفاء الاسم"}
            </button>
          </div>
          {!isAnonymous ? (
            <input
              type="text"
              className="input-field"
              placeholder="اسمك الكامل أو اسم مستعار"
            />
          ) : (
            <div className="input-field bg-gray-50 text-text-muted cursor-not-allowed select-none">
              سيتم نشر القصة بدون اسم
            </div>
          )}
        </div>

        {/* رقم التواصل */}
        <div>
          <label className="label-field">رقم التواصل (واتساب)</label>
          <input
            type="tel"
            className="input-field ltr"
            placeholder="+967xxxxxxxxx"
            dir="ltr"
          />
          <p className="text-xs text-text-muted font-tajawal mt-1">
            للتواصل معك بشأن القصة فقط - اختياري
          </p>
        </div>

        {/* المنطقة */}
        <div>
          <label className="label-field">المنطقة / المحافظة <span className="text-urgent">*</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="مثال: صنعاء، تعز، عدن..."
            required
          />
        </div>

        {/* نوع القصة */}
        <div>
          <label className="label-field">نوع القصة <span className="text-urgent">*</span></label>
          <select className="input-field" required defaultValue="">
            <option value="" disabled>اختر نوع القصة</option>
            {STORY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* تفاصيل القصة */}
        <div>
          <label className="label-field">تفاصيل القصة <span className="text-urgent">*</span></label>
          <textarea
            className="textarea-field"
            placeholder="اكتب قصتك بتفاصيلها هنا. كلما كانت التفاصيل أوضح، كلما استطعنا نقلها بشكل أفضل..."
            required
            rows={7}
          />
        </div>

        {/* رفع صور */}
        <div>
          <label className="label-field">صور أو وثائق (اختياري)</label>
          <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gold/40 transition-colors cursor-pointer focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
            <Upload size={22} className="text-gold mx-auto mb-2" />
            <p className="text-sm text-text-muted font-tajawal">
              اضغط لاختيار الصور أو الوثائق
            </p>
            <p className="text-xs text-text-muted font-tajawal mt-1">
              صور JPG/PNG أو PDF - بحد أقصى 5MB لكل ملف
            </p>
            <input type="file" className="sr-only" multiple accept="image/*,.pdf" />
          </label>
        </div>

        {/* السماح بالنشر */}
        <div className="bg-ivory rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowPublish}
              onChange={(e) => setAllowPublish(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-gold"
            />
            <div>
              <span className="text-sm font-semibold font-cairo text-navy block">
                أوافق على نشر قصتي
              </span>
              <span className="text-xs text-text-muted font-tajawal mt-0.5 block">
                أوافق على نشر قصتي على منصة مدى الناس بعد مراجعة التحرير{isAnonymous ? " دون ذكر اسمي" : " باسمي"}
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full btn-primary justify-center py-3.5 text-base"
        >
          <Send size={18} />
          إرسال القصة
        </button>
      </form>
    </div>
  );
}
