import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول | مدى الناس",
  description: "تسجيل دخول لوحة إدارة منصة مدى الناس",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0E1B2A] flex items-center justify-center px-4" dir="rtl">
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#C99A3E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#2F8F6B]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C99A3E] to-[#A87E2E] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl font-kufi">م</span>
          </div>
          <h1 className="text-white font-bold text-xl font-cairo">مدى الناس</h1>
          <p className="text-white/40 text-xs font-tajawal mt-1">لوحة الإدارة</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
          <h2 className="text-white font-bold text-lg font-cairo mb-6 text-center">تسجيل الدخول</h2>

          <form className="space-y-4" action="/api/auth/login" method="POST">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white/70 font-cairo mb-1.5">
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
              <label htmlFor="password" className="block text-xs font-semibold text-white/70 font-cairo mb-1.5">
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

            <button
              type="submit"
              className="w-full bg-[#C99A3E] hover:bg-[#A87E2E] text-white font-bold font-cairo py-3 rounded-xl transition-all duration-200 text-sm mt-2"
            >
              دخول
            </button>
          </form>

          <p className="text-center text-xs text-white/30 font-tajawal mt-6">
            منصة مدى الناس — لوحة الإدارة الداخلية
          </p>
        </div>
      </div>
    </div>
  );
}
