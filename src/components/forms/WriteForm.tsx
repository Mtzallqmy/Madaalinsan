"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, Upload, FileImage, X } from "lucide-react";

// ─── مكوّن رفع الملفات القابل لإعادة الاستخدام ────────────────────────────
interface FileUploadProps {
  id: string;
  label: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  accentColor?: "gold" | "hope" | "urgent";
}

function FileUploadZone({
  id,
  label,
  hint,
  accept = "image/*",
  multiple = false,
  accentColor = "gold",
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorMap = {
    gold: {
      border: "hover:border-gold/60 focus-within:border-gold",
      icon: "text-gold",
      badge: "bg-gold/10 text-gold-dark",
    },
    hope: {
      border: "hover:border-hope/60 focus-within:border-hope",
      icon: "text-hope",
      badge: "bg-hope/10 text-hope-dark",
    },
    urgent: {
      border: "hover:border-urgent/40 focus-within:border-urgent",
      icon: "text-urgent/60",
      badge: "bg-urgent/10 text-urgent",
    },
  };

  const c = colorMap[accentColor];

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
        className={`block border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${c.border}`}
      >
        <Upload size={22} className={`${c.icon} mx-auto mb-2`} />
        <p className="text-sm text-text-light font-tajawal font-medium">{label}</p>
        {hint && (
          <p className="text-xs text-text-muted font-tajawal mt-1">{hint}</p>
        )}
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-cairo font-semibold ${c.badge}`}>
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

      {/* معاينة الملفات المختارة */}
      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 bg-ivory rounded-lg px-3 py-2 text-xs font-tajawal text-text"
            >
              <FileImage size={13} className={c.icon} />
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
        {/* ── معلومات الكاتب ── */}
        <div className="bg-ivory rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold font-cairo text-navy border-b border-ivory-dark pb-2">
            معلومات الكاتب
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="label-field">
                الاسم الكامل <span className="text-urgent">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="input-field"
                placeholder="اسمك الكامل"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="label-field">
                البريد الإلكتروني <span className="text-urgent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field ltr"
                placeholder="email@example.com"
                dir="ltr"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="whatsapp" className="label-field">
              رقم واتساب (اختياري)
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              className="input-field ltr"
              placeholder="+967xxxxxxxxx"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="authorBio" className="label-field">
              نبذة قصيرة عن الكاتب <span className="text-urgent">*</span>
            </label>
            <textarea
              id="authorBio"
              name="authorBio"
              className="textarea-field min-h-[80px]"
              placeholder="عرّف بنفسك في جملتين أو ثلاث..."
              required
              rows={3}
            />
          </div>

          <div>
            <label className="label-field">صورة الكاتب (اختياري)</label>
            <FileUploadZone
              id="authorPhoto"
              label="صورة شخصية"
              hint="JPG أو PNG — بحد أقصى 2MB"
              accept="image/*"
              accentColor="gold"
            />
          </div>

          {/* روابط اجتماعية */}
          <div className="space-y-2">
            <label className="label-field">روابط التواصل (اختياري)</label>
            <input
              name="socialFacebook"
              type="url"
              className="input-field ltr text-xs"
              placeholder="رابط فيسبوك"
              dir="ltr"
            />
            <input
              name="socialInstagram"
              type="url"
              className="input-field ltr text-xs"
              placeholder="رابط إنستغرام"
              dir="ltr"
            />
            <input
              name="socialTwitter"
              type="url"
              className="input-field ltr text-xs"
              placeholder="رابط X / تويتر"
              dir="ltr"
            />
          </div>
        </div>

        {/* ── معلومات المقال ── */}
        <div className="bg-ivory rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold font-cairo text-navy border-b border-ivory-dark pb-2">
            معلومات المقال
          </h3>

          <div>
            <label htmlFor="articleTitle" className="label-field">
              عنوان المقال <span className="text-urgent">*</span>
            </label>
            <input
              id="articleTitle"
              name="articleTitle"
              type="text"
              className="input-field"
              placeholder="عنوان واضح ومعبّر..."
              required
            />
          </div>

          <div>
            <label htmlFor="articleSummary" className="label-field">
              ملخص المقال <span className="text-urgent">*</span>
            </label>
            <textarea
              id="articleSummary"
              name="articleSummary"
              className="textarea-field min-h-[80px]"
              placeholder="ملخص قصير لا يتجاوز 3 جمل..."
              required
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="articleContent" className="label-field">
              نص المقال <span className="text-urgent">*</span>
            </label>
            <textarea
              id="articleContent"
              name="articleContent"
              className="textarea-field"
              placeholder="اكتب مقالك هنا بالكامل..."
              required
              rows={12}
            />
          </div>

          <div>
            <label className="label-field">صورة غلاف (اختياري)</label>
            <FileUploadZone
              id="coverImage"
              label="صورة الغلاف"
              hint="JPG/PNG — الحجم المناسب: 1200×630 بكسل"
              accept="image/*"
              accentColor="gold"
            />
          </div>
        </div>

        {/* ── خيار النشر ── */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
          <label htmlFor="publishWithName" className="flex items-start gap-3 cursor-pointer">
            <input
              id="publishWithName"
              name="publishWithName"
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
