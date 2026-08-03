import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[4rem] font-semibold tracking-tight text-fg dark:text-frost">404</h1>
      <p className="mt-2 text-[1rem] text-fg-muted dark:text-frost-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-[10px] bg-fg px-5 text-[0.875rem] font-medium text-white transition-colors hover:bg-fg/85 dark:bg-frost dark:text-night"
      >
        Back to home
      </Link>
    </div>
  );
}
