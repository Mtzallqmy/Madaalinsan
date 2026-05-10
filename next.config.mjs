/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // صور المحتوى
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // أفاتارات تجريبية
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      // Supabase Storage – استبدل xxxx بـ project ID الخاص بك عند الربط
      // Next.js 14 لا يدعم wildcards في hostname
      // {
      //   protocol: "https",
      //   hostname: "xxxx.supabase.co",
      //   pathname: "/storage/v1/object/public/**",
      // },
    ],
  },
};

export default nextConfig;
