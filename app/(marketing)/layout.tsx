import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas dark:bg-night-deep">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
