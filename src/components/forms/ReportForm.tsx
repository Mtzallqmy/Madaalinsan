"use client";

import { useState, useRef } from "react";
import { AlertTriangle, CheckCircle, Upload, FileImage, X } from "lucide-react";

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
  { value: "high", label: "عاجل جداً — تهديد للحياة", color: "text-urgent" },
  { value: "medium", label: "متوسط — يحتاج متابعة قريبة", color: "text-gold-dark" },
  { value: "low", label: "منخفض — يمكن المتابعة لاحقاً", color: "text-hope" },
];

// ─── مكوّن رفع الملفات ────────────────────────────────────────────────────
function FileUploadZone({
  id,
  label,
  hint,
  accept = "image/*,.pdf",
}: {
  id: string;
  label: string;
  hint?: string;
  accept?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 hover:border-urgent/40 focus-within:border-urgent/60"
      >
        <Upload size={22} className="text-urgent/60 mx-auto mb-2" />
        <p className="text-sm text-text-light font-tajawal font-medium">{label}</p>
        {hint && <p className="text-xs text-text-muted font-tajawal mt-1">{hint}</p>}
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-cairo font-semibold bg-urgent/10 text-urgent">
          اختر ملفاً أو اسحبه هنا
        </span>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          onChange={handleChange}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 bg-ivory rounded-lg px-3 py-2 text-xs font-tajawal text-text"
            >
              <FileImage size={13} className="text-urgent/60 shrink-0" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="text-text-muted shrink-0">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={(e) => removeFile(i, e)}
                className="text-text-muted hover:text-urgent transition-colors"
                aria-label="حذف الملف"
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── النموذج الرئيسي ─────────────────────────────────────────────────────────
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
          <p className="text-sm font-bold font-cairo text-urgent mb-0.5">
            في حالات الخطر الفوري
          </p>
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
        {/* ── نوع الحالة ── */}
        <div>
          <label htmlFor="caseType" className="label-field">
            نوع الحالة <span className="text-urgent">*</span>
          </label>
          <select
            id="caseType"
            name="caseType"
            className="input-field"
            required
            defaultValue=""
          >
            <option value="" disabled>اختر نوع الحالة</option>
            {CASE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* ── المنطقة ── */}
        <div>
          <label htmlFor="caseRegion" className="label-field">
            المنطقة / المحافظة <span className="text-urgent">*</span>
          </label>
          <input
            id="caseRegion"
            name="caseRegion"
            type="text"
            className="input-field"
            placeholder="مثال: محافظة تعز، مديرية الشماخة"
            required
          />
        </div>

        {/* ── مستوى العاجلية ── */}
        <div>
          <label className="label-field">
            مستوى العاجلية <span className="text-urgent">*</span>
          </label>
          <div className="space-y-2 mt-2">
            {URGENCY_LEVELS.map((level) => (
              <label
                key={level.value}
                htmlFor={`urgency-${level.value}`}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  urgency === level.value
                    ? "border-gold bg-gold/5"
                    : "border-gray-100 hover:border-gold/30"
                }`}
              >
                <input
                  id={`urgency-${level.value}`}
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

        {/* ── وصف الحالة ── */}
        <div>
          <label htmlFor="caseDescription" className="label-field">
            وصف الحالة <span className="text-urgent">*</span>
          </label>
          <textarea
            id="caseDescription"
            name="caseDescription"
            className="textarea-field"
            placeholder="صف الحالة بتفاصيل واضحة: من هم المتضررون؟ ما هي المشكلة؟ منذ متى؟ ما هو المطلوب؟"
            required
            rows={6}
          />
        </div>

        {/* ── معلومات التواصل ── */}
        <div>
          <label htmlFor="contactInfo" className="label-field">
            معلومات التواصل (اختياري)
          </label>
          <input
            id="contactInfo"
            name="contactInfo"
            type="text"
            className="input-field"
            placeholder="رقم هاتف أو واتساب للمتابعة"
          />
          <p className="text-xs text-text-muted font-tajawal mt-1">
            لن تُنشر معلوماتك ونستخدمها فقط للتواصل بشأن الحالة
          </p>
        </div>

        {/* ── رفع الملفات ── */}
        <div>
          <label className="label-field">صور أو وثائق (اختياري)</label>
          <FileUploadZone
            id="caseFiles"
            label="صور، وثائق طبية، أو أي ملفات تدعم البلاغ"
            hint="JPG/PNG/PDF — بحد أقصى 10MB لكل ملف"
            accept="image/*,.pdf"
          />
        </div>

        <button type="submit" className="w-full btn-urgent justify-center py-3.5 text-base">
          <AlertTriangle size={18} />
          إرسال البلاغ
        </button>
      </form>
    </div>
  );
}
