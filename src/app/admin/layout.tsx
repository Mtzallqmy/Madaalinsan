"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  AlertTriangle,
  Inbox,
  Image,
  Share2,
  Settings,
  UserCog,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_MENU = [
  { label: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { label: "المقالات", href: "/admin/articles", icon: FileText },
  { label: "الأقسام", href: "/admin/categories", icon: FolderOpen },
  { label: "الكتّاب", href: "/admin/authors", icon: Users },
  { label: "القضايا", href: "/admin/cases", icon: AlertTriangle },
  { label: "الوارد", href: "/admin/submissions", icon: Inbox },
  { label: "الوسائط", href: "/admin/media", icon: Image },
  { label: "التواصل الاجتماعي", href: "/admin/social-links", icon: Share2 },
  { label: "المستخدمون", href: "/admin/users", icon: UserCog },
  { label: "الإعدادات", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir="rtl">
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#0E1B2A] text-white transition-all duration-300 shrink-0",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/10", !sidebarOpen && "justify-center px-2")}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C99A3E] to-[#A87E2E] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-base font-kufi">م</span>
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-white font-bold text-sm">مدى الناس</div>
              <div className="text-[#C99A3E] text-[10px] opacity-80">لوحة الإدارة</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {ADMIN_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-xl mb-0.5",
                  isActive
                    ? "bg-[#C99A3E]/20 text-[#C99A3E]"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                  !sidebarOpen && "justify-center px-2"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-white/10 p-4", !sidebarOpen && "flex justify-center p-2")}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C99A3E]/20 flex items-center justify-center">
                <span className="text-[#C99A3E] font-bold text-sm">أ</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate">المدير العام</div>
                <div className="text-white/50 text-[10px] truncate">admin@madaalinsan.com</div>
              </div>
              <button className="text-white/50 hover:text-white/90 transition-colors" title="تسجيل خروج">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button className="text-white/50 hover:text-white transition-colors" title="تسجيل خروج">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "lg:hidden fixed top-0 right-0 h-full z-50 w-72 bg-[#0E1B2A] text-white transition-transform duration-300 flex flex-col",
        mobileSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C99A3E] to-[#A87E2E] flex items-center justify-center">
              <span className="text-white font-bold text-base font-kufi">م</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">مدى الناس</div>
              <div className="text-[#C99A3E] text-[10px]">لوحة الإدارة</div>
            </div>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="text-white/70">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {ADMIN_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-xl mb-0.5",
                  isActive
                    ? "bg-[#C99A3E]/20 text-[#C99A3E]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            {/* Desktop collapse button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft
                size={18}
                className={cn("text-gray-600 transition-transform duration-300", !sidebarOpen && "rotate-180")}
              />
            </button>
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 font-tajawal hidden sm:block">
              لوحة الإدارة
              {pathname !== "/admin" && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-800 font-semibold">
                    {ADMIN_MENU.find((m) => m.href === pathname)?.label ?? ""}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B84C4C] rounded-full" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-xs text-gray-500 hover:text-[#C99A3E] transition-colors font-tajawal"
            >
              عرض الموقع
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
