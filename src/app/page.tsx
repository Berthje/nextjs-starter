"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Smooth scroll function
  const smoothScroll = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied to clipboard!");
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopySuccess("Failed to copy");
      setTimeout(() => setCopySuccess(null), 3000);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Snackbar */}
      {copySuccess && (
        <div
          className={`fixed bottom-8 right-12 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            copySuccess.includes("Failed")
              ? isDark
                ? "bg-red-600 text-white"
                : "bg-red-500 text-white"
              : isDark
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
          } animate-in slide-in-from-bottom-2`}
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              {copySuccess.includes("Failed") ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              <span className="font-medium">{copySuccess}</span>
            </div>
            <button
              onClick={() => setCopySuccess(null)}
              className="cursor-pointer ml-4 text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Background Effects - Only for Hero */}
      <div className="absolute inset-0 overflow-hidden h-screen">
        {/* Spotlight Effect */}
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? "bg-blue-500/20" : "bg-blue-400/30"} rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-80 h-80 ${isDark ? "bg-purple-500/20" : "bg-purple-400/30"} rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/2 w-72 h-72 ${isDark ? "bg-emerald-500/20" : "bg-emerald-400/30"} rounded-full blur-3xl animate-pulse delay-2000`}
        ></div>

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${isDark ? "bg-gray-900/50" : "bg-white/50"}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"} 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`relative z-10 border-b ${isDark ? "border-gray-800 bg-gray-900/80" : "border-gray-200 bg-white/80"} backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DL</span>
              </div>
              <h1
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Next.js Starter Kit
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => smoothScroll("features")}
                className={`text-sm font-medium ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors cursor-pointer`}
              >
                Features
              </button>
              <button
                onClick={() => smoothScroll("tech-stack")}
                className={`text-sm font-medium ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors cursor-pointer`}
              >
                Tech Stack
              </button>
              <button
                onClick={() => smoothScroll("setup")}
                className={`text-sm font-medium ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors cursor-pointer`}
              >
                Quick Start
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-600 hover:text-gray-900"} transition-colors`}
              >
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative z-10 h-screen flex items-center justify-center px-6 mt-16 sm:mt-0">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1
              className={`text-5xl md:text-7xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6 leading-tight`}
            >
              Ship faster with
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent block mt-2">
                Dev Layton&apos;s Next.js Kit
              </span>
            </h1>
            <p
              className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"} mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Production-ready Next.js starter with Docker, authentication,
              database, and modern tooling. Zero configuration, just clone and
              start building.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => smoothScroll("setup")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Now
            </button>
            <Link
              href="/documentation"
              className={`px-8 py-4 ${isDark ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"} border font-semibold rounded-xl hover:shadow-lg transition-all duration-300 inline-block text-center`}
            >
              View Documentation
            </Link>
          </div>

          {/* Quick Setup Command */}
          <div
            className={`max-w-2xl mx-auto p-6 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm rounded-2xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Quick Start - One Command Setup:
              </p>
              <button
                onClick={() =>
                  copyToClipboard(
                    "git clone https://github.com/Berthje/nextjs-starter-kit.git my-project && cd my-project && npm run docker:dev",
                  )
                }
                className={`text-xs px-3 py-1 ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} rounded-md transition-colors`}
              >
                Copy
              </button>
            </div>
            <div
              className={`p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"} rounded-lg font-mono text-left`}
            >
              <code
                className={`text-sm ${isDark ? "text-green-400" : "text-green-600"}`}
              >
                git clone https://github.com/Berthje/nextjs-starter-kit.git
                my-project <br />
                cd my-project <br />
                npm run docker:dev
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Separate Section */}
      <section
        id="features"
        className={`relative py-20 px-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
            >
              Everything you need to
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                build faster
              </span>
            </h2>
            <p
              className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto`}
            >
              A complete development environment with all the modern tools and
              best practices built-in.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div
              className={`p-8 rounded-2xl ${isDark ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-sm border ${isDark ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
              >
                Docker-First Development
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}
              >
                Complete containerized environment. No local dependencies needed
                except Docker. Identical setup for all developers.
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl ${isDark ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-sm border ${isDark ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3
                className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
              >
                Secure Authentication
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}
              >
                Better Auth integration with session management, OAuth
                providers, and security best practices built-in.
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl ${isDark ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-sm border ${isDark ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3
                className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
              >
                PostgreSQL Database
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}
              >
                Containerized PostgreSQL 17.5 with automatic setup, migrations,
                and optimized for development workflows.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Next.js 15.3",
                desc: "Latest features with App Router",
              },
              {
                icon: "🎨",
                title: "Tailwind CSS",
                desc: "Modern styling with custom components",
              },
              {
                icon: "📝",
                title: "TypeScript",
                desc: "Full type safety and IntelliSense",
              },
              {
                icon: "🔧",
                title: "ESLint + Prettier",
                desc: "Code quality and formatting",
              },
              {
                icon: "🚀",
                title: "Auto Project Naming",
                desc: "Smart container organization",
              },
              {
                icon: "🔐",
                title: "Secure by Default",
                desc: "Auto-generated credentials",
              },
              {
                icon: "🔄",
                title: "Hot Reload",
                desc: "Instant development feedback",
              },
              {
                icon: "📦",
                title: "Production Ready",
                desc: "Optimized Docker builds",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDark ? "bg-gray-800/30" : "bg-white/50"} backdrop-blur-sm border ${isDark ? "border-gray-700/50" : "border-gray-200/50"} hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h4
                  className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
                >
                  {feature.title}
                </h4>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech-stack"
        className={`relative py-20 px-6 ${isDark ? "bg-gray-800/20" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
            >
              Modern Tech Stack
            </h2>
            <p
              className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto`}
            >
              Built with the latest and most reliable technologies for modern
              web development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Next.js 15.3",
                type: "Frontend Framework",
                desc: "React-based framework with App Router, SSR, and ISR",
              },
              {
                name: "TypeScript",
                type: "Language",
                desc: "Static typing for better development experience",
              },
              {
                name: "Tailwind CSS",
                type: "Styling",
                desc: "Utility-first CSS framework for rapid UI development",
              },
              {
                name: "PostgreSQL 17.5",
                type: "Database",
                desc: "Robust relational database with JSON support",
              },
              {
                name: "Better Auth",
                type: "Authentication",
                desc: "Modern authentication with session management",
              },
              {
                name: "Docker",
                type: "Containerization",
                desc: "Consistent development and deployment environment",
              },
            ].map((tech, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDark ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-sm border ${isDark ? "border-gray-700" : "border-gray-200"} hover:shadow-lg transition-all duration-300`}
              >
                <div
                  className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"} mb-2`}
                >
                  {tech.type}
                </div>
                <h4
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
                >
                  {tech.name}
                </h4>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Setup Section */}
      <section
        id="setup"
        className={`relative py-20 px-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-8`}
          >
            Get Started in
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              60 seconds
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div
                className={`w-16 h-16 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  1
                </span>
              </div>
              <h3
                className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
              >
                Clone Repository
              </h3>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Download the starter kit to your machine
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  2
                </span>
              </div>
              <h3
                className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
              >
                Run Setup
              </h3>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Automatically configures environment and credentials
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  3
                </span>
              </div>
              <h3
                className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
              >
                Start Building
              </h3>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Your app runs at localhost:3000 with hot reload
              </p>
            </div>
          </div>

          {/* Command Examples */}
          <div className="space-y-4">
            <div
              className={`p-6 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Interactive Setup (Recommended)
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "git clone https://github.com/Berthje/nextjs-starter-kit.git my-awesome-project\ncd my-awesome-project\nnpm run docker:dev",
                    )
                  }
                  className={`text-xs px-3 py-1 ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} rounded-md transition-colors`}
                >
                  Copy
                </button>
              </div>
              <code
                className={`block p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"} rounded-lg font-mono text-sm ${isDark ? "text-green-400" : "text-green-600"}`}
              >
                git clone https://github.com/Berthje/nextjs-starter-kit.git
                my-awesome-project
                <br />
                cd my-awesome-project
                <br />
                npm run docker:dev
              </code>
            </div>

            <div
              className={`p-6 ${isDark ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Silent Setup (CI/Automation)
                </span>
                <button
                  onClick={() => copyToClipboard("npm run docker:dev:silent")}
                  className={`text-xs px-3 py-1 ${isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} rounded-md transition-colors`}
                >
                  Copy
                </button>
              </div>
              <code
                className={`block p-4 ${isDark ? "bg-gray-900" : "bg-gray-100"} rounded-lg font-mono text-sm ${isDark ? "text-green-400" : "text-green-600"}`}
              >
                npm run docker:dev:silent
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative border-t ${isDark ? "border-gray-800 bg-gray-900/80" : "border-gray-200 bg-white/80"} backdrop-blur-md py-12`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DL</span>
              </div>
              <span
                className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Dev Layton&apos;s Next.js Kit
              </span>
            </div>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Built with ❤️ for developers who want to focus on building amazing
              applications, not wrestling with development environment setup.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a
              href="#"
              className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Documentation
            </a>
            <a
              href="https://github.com/Berthje/nextjs-starter-kit"
              className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              GitHub
            </a>
            <a
              href="https://github.com/Berthje/nextjs-starter-kit/issues"
              className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Issues
            </a>
            <a
              href="#"
              className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Examples
            </a>
          </div>

          <div
            className={`pt-8 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}
          >
            <p
              className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              MIT License • Built with Next.js 15.3, TypeScript, Tailwind CSS &
              PostgreSQL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
