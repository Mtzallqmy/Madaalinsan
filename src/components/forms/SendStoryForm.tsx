"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, Eye, EyeOff, Upload, FileImage, X } from "lucide-react";

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

// ─── مكوّن رفع الملفات ────────────────────────────────────────────────────
interface FileUploadZoneProps {
  id: string;
  label: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
}

function FileUploadZone({
  id,
  label,
  hint,
  accept = "image/*,.pdf",
  multiple = true,
}: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => (multiple ? [...prev, ...selected] : selected));
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
        className="block border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 hover:border-gold/60 focus-within:border-gold"
      >
        <Upload size={22} className="text-gold mx-auto mb-2" />
        <p className="text-sm text-text-light font-tajawal font-medium">{label}</p>
        {hint && <p className="text-xs text-text-muted font-tajawal mt-1">{hint}</p>}
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-cairo font-semibold bg-gold/10 text-gold-dark">
          اختر ملفاً أو اسحبه هنا
        </span>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type="file"
          accept={accept}
          multiple={multiple}
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
              <FileImage size={13} className="text-gold shrink-0" />
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
        {/* ── الاسم أو الإخفاء ── */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="senderName" className="label-field !mb-0">
              الاسم
            </label>
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
              id="senderName"
              name="senderName"
              type="text"
              className="input-field"
              placeholder="اسمك الكامل أو اسم مستعار"
            />
          ) : (
            <div className="input-field bg-gray-50 text-text-muted select-none">
              سيتم نشر القصة بدون اسم
            </div>
          )}
        </div>

        {/* ── رقم التواصل ── */}
        <div>
          <label htmlFor="phone" className="label-field">
            رقم التواصل (واتساب)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input-field ltr"
            placeholder="+967xxxxxxxxx"
            dir="ltr"
          />
          <p className="text-xs text-text-muted font-tajawal mt-1">
            للتواصل معك بشأن القصة فقط — اختياري
          </p>
        </div>

        {/* ── المنطقة ── */}
        <div>
          <label htmlFor="region" className="label-field">
            المنطقة / المحافظة <span className="text-urgent">*</span>
          </label>
          <input
            id="region"
            name="region"
            type="text"
            className="input-field"
            placeholder="مثال: صنعاء، تعز، عدن..."
            required
          />
        </div>

        {/* ── نوع القصة ── */}
        <div>
          <label htmlFor="storyType" className="label-field">
            نوع القصة <span className="text-urgent">*</span>
          </label>
          <select id="storyType" name="storyType" className="input-field" required defaultValue="">
            <option value="" disabled>اختر نوع القصة</option>
            {STORY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* ── تفاصيل القصة ── */}
        <div>
          <label htmlFor="storyDetails" className="label-field">
            تفاصيل القصة <span className="text-urgent">*</span>
          </label>
          <textarea
            id="storyDetails"
            name="storyDetails"
            className="textarea-field"
            placeholder="اكتب قصتك بتفاصيلها هنا. كلما كانت التفاصيل أوضح، كلما استطعنا نقلها بشكل أفضل..."
            required
            rows={7}
          />
        </div>

        {/* ── رفع الملفات ── */}
        <div>
          <label className="label-field">صور أو وثائق (اختياري)</label>
          <FileUploadZone
            id="storyFiles"
            label="اسحب الملفات هنا أو انقر للاختيار"
            hint="صور JPG/PNG أو PDF — بحد أقصى 5MB لكل ملف"
            accept="image/*,.pdf"
            multiple
          />
        </div>

        {/* ── الموافقة على النشر ── */}
        <div className="bg-ivory rounded-xl p-4">
          <label htmlFor="allowPublish" className="flex items-start gap-3 cursor-pointer">
            <input
              id="allowPublish"
              name="allowPublish"
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
                أوافق على نشر قصتي على منصة مدى الناس بعد مراجعة التحرير
                {isAnonymous ? " دون ذكر اسمي" : " باسمي"}
              </span>
            </div>
          </label>
        </div>

        <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base">
          <Send size={18} />
          إرسال القصة
        </button>
      </form>
    </div>
  );
}
