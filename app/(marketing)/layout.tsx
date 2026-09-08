import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorSheen } from "@/components/motion/CursorSheen";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SceneRoot } from "@/components/visual/scene/SceneRoot";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No background on this wrapper: the room lives behind it at -z-10, and an
    // opaque layer here would hide the whole scene. The ground colour comes
    // from <body> in globals.css.
    <div className="flex min-h-dvh flex-col">
      <SceneRoot />
      <SmoothScroll />
      <CursorSheen />
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
