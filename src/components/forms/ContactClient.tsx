"use client";

import { useState } from "react";
import { Mail, Send, MessageCircle, CheckCircle } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { SOCIAL_LINKS } from "@/lib/social-links";

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@madaalinsan.com",
    href: "mailto:info@madaalinsan.com",
    color: "#C99A3E",
  },
  {
    Icon: MessageCircle,
    label: "واتساب",
    value: "للتواصل السريع",
    href: "https://wa.me/967xxxxxxxxx",
    color: "#25D366",
  },
  {
    Icon: Send,
    label: "تليجرام",
    value: "@madaalinsan",
    href: "https://t.me/madaalinsan",
    color: "#2AABEE",
  },
] as const;

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-20 bg-ivory">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── نموذج التواصل ── */}
          <div>
            <h2 className="text-xl font-bold font-cairo text-navy mb-6">أرسل رسالة</h2>

            {submitted ? (
              <div className="bg-white rounded-2xl shadow-card p-10 text-center">
                <div className="w-16 h-16 bg-hope/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-hope" />
                </div>
                <h3 className="text-xl font-bold font-cairo text-navy mb-3">تم إرسال رسالتك!</h3>
                <p className="text-text-light font-tajawal text-sm">
                  شكراً للتواصل معنا. سنرد عليك في أقرب وقت ممكن.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-7 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="label-field">
                      الاسم <span className="text-urgent">*</span>
                    </label>
                    <input id="contactName" name="contactName" type="text" className="input-field" placeholder="اسمك" required />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="label-field">
                      البريد الإلكتروني <span className="text-urgent">*</span>
                    </label>
                    <input id="contactEmail" name="contactEmail" type="email" className="input-field ltr" placeholder="email@example.com" dir="ltr" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactSubject" className="label-field">
                    موضوع الرسالة <span className="text-urgent">*</span>
                  </label>
                  <select id="contactSubject" name="contactSubject" className="input-field" required defaultValue="">
                    <option value="" disabled>اختر الموضوع</option>
                    <option>استفسار عام</option>
                    <option>إرسال قصة أو مقال</option>
                    <option>بلاغ عن حالة</option>
                    <option>شكوى أو ملاحظة</option>
                    <option>شراكة أو تعاون</option>
                    <option>أخرى</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contactMessage" className="label-field">
                    الرسالة <span className="text-urgent">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    name="contactMessage"
                    className="textarea-field"
                    placeholder="اكتب رسالتك هنا..."
                    required
                    rows={6}
                  />
                </div>

                <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base">
                  <Send size={18} />
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>

          {/* ── معلومات التواصل ── */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold font-cairo text-navy mb-6">طرق التواصل</h2>
              <div className="space-y-4">
                {CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white rounded-2xl shadow-card p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.Icon size={22} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="font-semibold font-cairo text-navy text-sm group-hover:text-gold transition-colors">
                        {item.label}
                      </div>
                      <div className="text-text-muted text-xs font-tajawal mt-0.5">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* منصات التواصل */}
            <div>
              <h3 className="text-base font-bold font-cairo text-navy mb-4">تابعنا على</h3>
              <div className="grid grid-cols-3 gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${social.color}15`, color: social.color }}
                    >
                      <SocialIcon platform={social.id} size={18} />
                    </div>
                    <span className="text-xs font-tajawal text-text-muted group-hover:text-navy transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* أوقات الرد */}
            <div className="bg-navy rounded-2xl p-6">
              <h3 className="text-white font-bold font-cairo text-sm mb-4">أوقات الرد</h3>
              <div className="space-y-2.5">
                {[
                  { day: "السبت – الخميس", time: "9 ص – 9 م" },
                  { day: "الجمعة", time: "مغلق" },
                  { day: "الحالات العاجلة", time: "24/7" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="font-tajawal text-ivory/70">{item.day}</span>
                    <span className="font-cairo font-semibold text-gold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
