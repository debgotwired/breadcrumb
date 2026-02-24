import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-medium">
            <span>🍞</span>
            <span>breadcrumb</span>
          </div>
          <Link
            href="/app"
            className="text-sm text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Leave a trail of{" "}
            <span className="text-[#f59e0b]">why</span>.
          </h1>
          <p className="text-xl text-[#9ca3af] mb-8 leading-relaxed">
            A dead-simple tool to log decisions with context.
            <br />
            For the &quot;why did we do this?&quot; moment 6 months later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-black font-medium px-8 py-3.5 rounded-lg transition-colors text-lg"
            >
              Start logging
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-lg border border-[#262626] bg-[#141414]">
              <div className="text-2xl mb-3">✍️</div>
              <h3 className="font-medium mb-2">Quick capture</h3>
              <p className="text-sm text-[#6b7280]">
                Log what you decided and why. That&apos;s it. No folders, tags, or complexity.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-[#262626] bg-[#141414]">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-medium mb-2">Search everything</h3>
              <p className="text-sm text-[#6b7280]">
                Find past decisions instantly with full-text search across all your entries.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-[#262626] bg-[#141414]">
              <div className="text-2xl mb-3">💾</div>
              <h3 className="font-medium mb-2">Yours forever</h3>
              <p className="text-sm text-[#6b7280]">
                Data stays in your browser. Export anytime as JSON or Markdown.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-6 text-center text-sm text-[#6b7280]">
        No account needed. Your data stays in your browser.
      </footer>
    </div>
  );
}
