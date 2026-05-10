import Image from "next/image";
import { Upload, Copy, Trash2, FileVideo, FileAudio, FileText as FilePdf, ImageIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "مكتبة الوسائط | مدى الناس" };

type MediaFileType = "image" | "video" | "audio" | "pdf";

const MOCK_MEDIA: {
  id: string; name: string; type: MediaFileType; size: string;
  url: string; uploadedAt: string; uploadedBy: string; alt?: string;
}[] = [
  { id: "1", name: "story-cover-1.jpg",  type: "image", size: "245 KB", url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=200&q=60", uploadedAt: "2026-05-08", uploadedBy: "أحمد", alt: "أم خالد" },
  { id: "2", name: "school-photo.jpg",   type: "image", size: "312 KB", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&q=60", uploadedAt: "2026-05-06", uploadedBy: "سارة", alt: "مدرسة" },
  { id: "3", name: "family-story.jpg",   type: "image", size: "198 KB", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&q=60", uploadedAt: "2026-05-04", uploadedBy: "خالد", alt: "عائلة" },
  { id: "4", name: "interview.mp3",      type: "audio", size: "4.2 MB", url: "#", uploadedAt: "2026-05-03", uploadedBy: "محرر", alt: "" },
  { id: "5", name: "report-2026.pdf",    type: "pdf",   size: "1.8 MB", url: "#", uploadedAt: "2026-05-01", uploadedBy: "محرر", alt: "" },
  { id: "6", name: "field-video.mp4",    type: "video", size: "12.4 MB",url: "#", uploadedAt: "2026-04-30", uploadedBy: "محرر", alt: "" },
];

const TYPE_ICON: Record<MediaFileType, React.ElementType> = {
  image: ImageIcon,
  video: FileVideo,
  audio: FileAudio,
  pdf:   FilePdf,
};

const TYPE_STYLE: Record<MediaFileType, string> = {
  image: "bg-blue-50 text-blue-500",
  video: "bg-purple-50 text-purple-500",
  audio: "bg-green-50 text-green-500",
  pdf:   "bg-red-50 text-red-500",
};

export default function AdminMediaPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0E1B2A] font-cairo">مكتبة الوسائط</h1>
          <p className="text-gray-400 text-xs font-tajawal mt-0.5">{MOCK_MEDIA.length} ملفات مرفوعة</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C99A3E] hover:bg-[#A87E2E] text-white text-sm font-semibold font-cairo px-4 py-2.5 rounded-xl transition-colors">
          <Upload size={16} />
          رفع ملف
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["الكل", "صور", "فيديو", "صوت", "PDF"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl text-sm font-cairo transition-colors ${i === 0 ? "bg-[#0E1B2A] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {MOCK_MEDIA.map((file) => {
          const isImage = file.type === "image";

          return (
            <div key={file.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all">
              {/* Preview */}
              <div className={`relative h-32 flex items-center justify-center ${!isImage ? TYPE_STYLE[file.type] : "bg-gray-100"}`}>
                {isImage ? (
                  <Image src={file.url} alt={file.alt ?? ""} fill className="object-cover" />
                ) : (
                  (() => { const FileIcon = TYPE_ICON[file.type]; return <FileIcon size={32} />; })()
                )}


                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-1.5 bg-white/20 hover:bg-white/40 rounded-lg transition-colors text-white" title="نسخ الرابط">
                    <Copy size={14} />
                  </button>
                  <button className="p-1.5 bg-white/20 hover:bg-red-500/60 rounded-lg transition-colors text-white" title="حذف">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-2.5">
                <p className="text-[11px] font-semibold text-[#0E1B2A] font-cairo truncate">{file.name}</p>
                <p className="text-[10px] text-gray-400 font-tajawal mt-0.5">{file.size} • {file.uploadedAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
