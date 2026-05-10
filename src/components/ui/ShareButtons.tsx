"use client";

import { useState } from "react";
import { Link2, Check, Send, MessageCircle } from "lucide-react";
import SocialIcon from "./SocialIcon";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const pageUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard api unavailable
    }
  };

  const links = [
    {
      label: "فيسبوك",
      href: `https://facebook.com/sharer/sharer.php?u=${encoded}`,
      className: "hover:bg-blue-50 hover:text-blue-600",
      icon: <SocialIcon platform="facebook" size={15} />,
    },
    {
      label: "تويتر / X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      className: "hover:bg-gray-100 hover:text-gray-900",
      icon: <SocialIcon platform="twitter" size={15} />,
    },
    {
      label: "واتساب",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      className: "hover:bg-green-50 hover:text-green-600",
      icon: <SocialIcon platform="whatsapp" size={15} />,
    },
    {
      label: "تليجرام",
      href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
      className: "hover:bg-sky-50 hover:text-sky-500",
      icon: <SocialIcon platform="telegram" size={15} />,
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold font-cairo text-text">شارك:</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 rounded-xl bg-ivory flex items-center justify-center transition-all duration-200 ${link.className}`}
          title={link.label}
          aria-label={`مشاركة عبر ${link.label}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="w-9 h-9 rounded-xl bg-ivory flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all duration-200"
        title="نسخ الرابط"
        aria-label="نسخ الرابط"
        type="button"
      >
        {copied ? <Check size={15} className="text-hope" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
