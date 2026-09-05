import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorSheen } from "@/components/motion/CursorSheen";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <CursorSheen />
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
