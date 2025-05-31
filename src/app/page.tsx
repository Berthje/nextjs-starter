export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Ship faster with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Dev Layton&apos;s Next.js Kit
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              A production-ready starter with authentication, database, and
              modern tooling. Focus on building, not configuring.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 text-sm">
                Next.js 15 with App Router and optimized performance out of the
                box.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Secure Auth
              </h3>
              <p className="text-slate-600 text-sm">
                Better Auth integration with session management and security
                best practices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Database Ready
              </h3>
              <p className="text-slate-600 text-sm">
                PostgreSQL setup with raw SQL queries for maximum flexibility
                and performance.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            Built with Next.js, TypeScript, Tailwind CSS & PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  );
}
