import Header from "./Header";
import Footer from "./Footer";
import TickerBar from "@/components/ui/TickerBar";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      {/*
        TickerBar ارتفاعه ~36px (py-2 + نص)
        Header ارتفاعه ~64px (py-3 + محتوى)
        المجموع ~100px — نضعهما معاً في wrapper ثابت
        وnudge الـ main بالمقدار الصحيح
      */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <TickerBar />
        <Header />
      </div>
      {/* pt يعوّض: TickerBar ~36px + Header ~64px = 100px */}
      <main className="pt-[100px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
