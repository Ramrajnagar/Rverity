import Link from "next/link";
import { Ghost, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main
      aria-labelledby="not-found-title"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-20 text-center text-white"
    >
      {/* Ambient glow, consistent with landing hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A3FF]/[0.08] blur-[80px]"
      />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <Ghost className="h-7 w-7 text-[#00A3FF]" aria-hidden="true" />
        </div>

        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          404 — Page not found
        </p>

        <h1
          id="not-found-title"
          className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl"
        >
          Lost in the graph.
        </h1>

        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
          This memory doesn&apos;t exist (yet). The link you followed may be
          broken, moved, or dreaming in another dimension.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#00A3FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,163,255,0.25)] transition-all duration-150 hover:bg-[#008FE0] hover:shadow-[0_0_30px_rgba(0,163,255,0.35)]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Return home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-5 py-3 text-sm font-medium text-neutral-400 transition-all duration-150 hover:border-white/[0.15] hover:text-white"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Read the docs
          </Link>
        </div>

        <p className="mt-8 font-mono text-[11px] text-neutral-700">
          rverity://graph/node/not-found
        </p>
      </div>
    </main>
  );
}
