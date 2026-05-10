"use client";

import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Placeholder — يُستبدل لاحقاً بـ API call حقيقي
    await new Promise((r) => setTimeout(r, 800));
    setError("تسجيل الدخول غير مفعّل بعد. سيتم تفعيله عند ربط قاعدة البيانات.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-white/70 font-cairo mb-1.5"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@madaalinsan.com"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
          dir="ltr"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-white/70 font-cairo mb-1.5"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 text-sm font-tajawal focus:outline-none focus:border-[#C99A3E] transition-colors"
          dir="ltr"
        />
      </div>

      {error && (
        <p className="text-[#B84C4C] text-xs font-tajawal bg-[#B84C4C]/10 border border-[#B84C4C]/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C99A3E] hover:bg-[#A87E2E] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold font-cairo py-3 rounded-xl transition-all duration-200 text-sm mt-2"
      >
        {loading ? "جاري الدخول..." : "دخول"}
      </button>
    </form>
  );
}
