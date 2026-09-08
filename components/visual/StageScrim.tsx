/**
 * Readability scrim over the live 3D scene.
 * Desktop: shades the left column where the copy sits.
 * Phones (<lg): the object is framed in the top half, copy sits at the bottom —
 * so the scrim rises from the bottom instead.
 */
export function StageScrim({ side = "wide" }: { side?: "wide" | "narrow" }) {
  const desktop =
    side === "wide"
      ? "linear-gradient(100deg, rgba(12,8,18,0.96) 0%, rgba(12,8,18,0.9) 26%, rgba(12,8,18,0.6) 42%, rgba(12,8,18,0.12) 58%, rgba(12,8,18,0) 70%)"
      : "linear-gradient(100deg, rgba(12,8,18,0.96) 0%, rgba(12,8,18,0.9) 24%, rgba(12,8,18,0.55) 40%, rgba(12,8,18,0.08) 54%, rgba(12,8,18,0) 66%)";
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block" style={{ background: desktop }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,8,18,0.97) 0%, rgba(12,8,18,0.94) 42%, rgba(12,8,18,0.7) 56%, rgba(12,8,18,0.18) 70%, rgba(12,8,18,0) 82%)",
        }}
      />
    </>
  );
}
