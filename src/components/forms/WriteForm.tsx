"use client";

import { useState } from "react";
import { Send, CheckCircle, Upload } from "lucide-react";

export default function WriteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [publishWithName, setPublishWithName] = useState(true);

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
        <h3 className="text-xl font-bold font-cairo text-navy mb-3">تم استلام مقالك!</h3>
        <p className="text-text-light font-tajawal text-sm leading-relaxed">
          شكراً لمشاركتنا كتاباتك. سيراجع فريق التحرير مقالك وسنتواصل معك قريباً.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-7 md:p-9">
      <div className="mb-7">
        <h2 className="text-xl font-bold font-cairo text-navy mb-2">نموذج إرسال مقال</h2>
        <p className="text-text-muted text-sm font-tajawal">
          نرحب بأي مقال يلامس قضايا الناس، يتسم بالموضوعية والأمانة.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* معلومات الكاتب */}
        <div className="bg-ivory rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold font-cairo text-navy border-b border-ivory-dark pb-2">
            معلومات الكاتب
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-field">الاسم الكامل <span className="text-urgent">*</span></label>
              <input type="text" className="input-field" placeholder="اسمك الكامل" required />
            </div>
            <div>
              <label className="label-field">البريد الإلكتروني <span className="text-urgent">*</span></label>
              <input type="email" className="input-field ltr" placeholder="email@example.com" dir="ltr" required />
            </div>
          </div>

          <div>
            <label className="label-field">رقم واتساب (اختياري)</label>
            <input type="tel" className="input-field ltr" placeholder="+967xxxxxxxxx" dir="ltr" />
          </div>

          <div>
            <label className="label-field">نبذة قصيرة عن الكاتب <span className="text-urgent">*</span></label>
            <textarea
              className="textarea-field min-h-[80px]"
              placeholder="عرّف بنفسك في جملتين أو ثلاث..."
              required
              rows={3}
            />
          </div>

          <div>
            <label className="label-field">صورة الكاتب (اختياري)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-gold/40 transition-colors cursor-pointer">
              <Upload size={18} className="text-gold mx-auto mb-1.5" />
              <p className="text-xs text-text-muted font-tajawal">صورة شخصية - JPG/PNG</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>

          {/* روابط اجتماعية */}
          <div className="space-y-2">
            <label className="label-field">روابط التواصل (اختياري)</label>
            <input type="url" className="input-field ltr text-xs" placeholder="رابط فيسبوك" dir="ltr" />
            <input type="url" className="input-field ltr text-xs" placeholder="رابط إنستغرام" dir="ltr" />
            <input type="url" className="input-field ltr text-xs" placeholder="رابط X / تويتر" dir="ltr" />
          </div>
        </div>

        {/* معلومات المقال */}
        <div className="bg-ivory rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold font-cairo text-navy border-b border-ivory-dark pb-2">
            معلومات المقال
          </h3>

          <div>
            <label className="label-field">عنوان المقال <span className="text-urgent">*</span></label>
            <input type="text" className="input-field" placeholder="عنوان واضح ومعبّر..." required />
          </div>

          <div>
            <label className="label-field">ملخص المقال <span className="text-urgent">*</span></label>
            <textarea
              className="textarea-field min-h-[80px]"
              placeholder="ملخص قصير لا يتجاوز 3 جمل..."
              required
              rows={3}
            />
          </div>

          <div>
            <label className="label-field">نص المقال <span className="text-urgent">*</span></label>
            <textarea
              className="textarea-field"
              placeholder="اكتب مقالك هنا بالكامل..."
              required
              rows={12}
            />
          </div>

          <div>
            <label className="label-field">صورة غلاف (اختياري)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-gold/40 transition-colors cursor-pointer">
              <Upload size={20} className="text-gold mx-auto mb-2" />
              <p className="text-sm text-text-muted font-tajawal">صورة الغلاف - JPG/PNG</p>
              <p className="text-xs text-text-muted font-tajawal mt-0.5">حجم مناسب: 1200×630 بكسل</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        {/* خيار النشر */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={publishWithName}
              onChange={(e) => setPublishWithName(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-gold"
            />
            <div>
              <span className="text-sm font-semibold font-cairo text-navy block">
                أريد نشر المقال باسمي الكامل
              </span>
              <span className="text-xs text-text-muted font-tajawal mt-0.5 block">
                {publishWithName
                  ? "سيُنشر المقال باسمك وصورتك مع نبذتك"
                  : "سيُنشر المقال باسم مستعار أو بدون اسم"}
              </span>
            </div>
          </label>
        </div>

        <button type="submit" className="w-full btn-hope justify-center py-3.5 text-base">
          <Send size={18} />
          إرسال المقال
        </button>
      </form>
    </div>
  );
}
