"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Upload } from "lucide-react";

const CASE_TYPES = [
  "حالة فقر حادة",
  "مريض يحتاج علاجاً عاجلاً",
  "أسرة نازحة بدون مأوى",
  "طفل أو أطفال في خطر",
  "تسرب من التعليم",
  "عنف أو انتهاك",
  "شخص مسن وحيد",
  "حالة إنسانية أخرى",
];

const URGENCY_LEVELS = [
  { value: "high", label: "عاجل جداً - تهديد للحياة", color: "text-urgent" },
  { value: "medium", label: "متوسط - يحتاج متابعة قريبة", color: "text-gold-dark" },
  { value: "low", label: "منخفض - يمكن المتابعة لاحقاً", color: "text-hope" },
];

export default function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [urgency, setUrgency] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-10 text-center">
        <div className="w-16 h-16 bg-urgent/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-hope" />
        </div>
        <h3 className="text-xl font-bold font-cairo text-navy mb-3">تم استلام البلاغ!</h3>
        <p className="text-text-light font-tajawal text-sm leading-relaxed">
          شكراً على تبليغك. سيراجع فريقنا الحالة في أقرب وقت ممكن وسنتواصل معك للمتابعة.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-7 md:p-9">
      {/* تنبيه عاجل */}
      <div className="flex items-start gap-3 bg-urgent/5 border border-urgent/20 rounded-xl p-4 mb-7">
        <AlertTriangle size={18} className="text-urgent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold font-cairo text-urgent mb-0.5">في حالات الخطر الفوري</p>
          <p className="text-xs text-text-muted font-tajawal">
            إذا كانت الحالة تهديداً فورياً للحياة، يرجى التواصل مع الجهات الطارئة المحلية أولاً.
          </p>
        </div>
      </div>

      <div className="mb-7">
        <h2 className="text-xl font-bold font-cairo text-navy mb-2">نموذج البلاغ</h2>
        <p className="text-text-muted text-sm font-tajawal">
          سيتم التعامل مع جميع البلاغات بسرية تامة ومهنية عالية.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* نوع الحالة */}
        <div>
          <label className="label-field">نوع الحالة <span className="text-urgent">*</span></label>
          <select className="input-field" required defaultValue="">
            <option value="" disabled>اختر نوع الحالة</option>
            {CASE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* المنطقة */}
        <div>
          <label className="label-field">المنطقة / المحافظة <span className="text-urgent">*</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="مثال: محافظة تعز، مديرية الشماخة"
            required
          />
        </div>

        {/* مستوى العاجلية */}
        <div>
          <label className="label-field">مستوى العاجلية <span className="text-urgent">*</span></label>
          <div className="space-y-2 mt-2">
            {URGENCY_LEVELS.map((level) => (
              <label
                key={level.value}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  urgency === level.value
                    ? "border-gold bg-gold/5"
                    : "border-gray-100 hover:border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={level.value}
                  checked={urgency === level.value}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="accent-gold"
                />
                <span className={`text-sm font-semibold font-cairo ${level.color}`}>
                  {level.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* وصف الحالة */}
        <div>
          <label className="label-field">وصف الحالة <span className="text-urgent">*</span></label>
          <textarea
            className="textarea-field"
            placeholder="صف الحالة بتفاصيل واضحة: من هم المتضررون؟ ما هي المشكلة؟ منذ متى؟ ما هو المطلوب؟"
            required
            rows={6}
          />
        </div>

        {/* معلومات التواصل */}
        <div>
          <label className="label-field">معلومات التواصل (اختياري)</label>
          <input
            type="text"
            className="input-field"
            placeholder="رقم هاتف أو واتساب للمتابعة"
          />
          <p className="text-xs text-text-muted font-tajawal mt-1">
            لن تُنشر معلوماتك ونستخدمها فقط للتواصل بشأن الحالة
          </p>
        </div>

        {/* رفع صور أو وثائق */}
        <div>
          <label className="label-field">صور أو وثائق (اختياري)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-urgent/30 transition-colors cursor-pointer">
            <Upload size={22} className="text-urgent/60 mx-auto mb-2" />
            <p className="text-sm text-text-muted font-tajawal">
              صور، وثائق طبية، أو أي ملفات تدعم البلاغ
            </p>
            <p className="text-xs text-text-muted font-tajawal mt-0.5">
              JPG/PNG/PDF - بحد أقصى 10MB
            </p>
            <input type="file" className="hidden" multiple accept="image/*,.pdf" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-urgent justify-center py-3.5 text-base"
        >
          <AlertTriangle size={18} />
          إرسال البلاغ
        </button>
      </form>
    </div>
  );
}
