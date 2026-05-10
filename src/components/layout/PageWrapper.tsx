import Header from "./Header";
import Footer from "./Footer";
import TickerBar from "@/components/ui/TickerBar";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <TickerBar />
      <Header />
      <main className="pt-[72px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
