/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function DocumentationPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch("/api/readme");
        if (!response.ok) {
          throw new Error("Failed to fetch README");
        }
        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        setError("Failed to load documentation");
        console.error("Error fetching README:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, []);

  // Custom renderer for marked to handle code blocks with syntax highlighting
  useEffect(() => {
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang, escaped }: marked.Tokens.Code) => {
      return `<div class="code-block" data-language="${lang || "text"}">${text}</div>`;
    };

    renderer.heading = ({ tokens, depth }: marked.Tokens.Heading) => {
      const text = tokens.map(token => token.text).join('');
      const anchor = text
        .toLowerCase()
        .replace(/[^\w\- ]/g, "")
        .replace(/\s+/g, "-");
      return `<h${depth} id="${anchor}" class="heading-anchor">${text}</h${depth}>`;
    };

    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true,
    });
  }, []);

  const renderProcessedContent = (html: string) => {
    // Split the HTML to find code blocks and replace them with highlighted versions
    const parts = html.split(
      /<div class="code-block" data-language="([^"]*)">([\s\S]*?)<\/div>/g,
    );
    const elements: JSX.Element[] = [];

    for (let i = 0; i < parts.length; i += 3) {
      // Regular HTML content
      if (parts[i]) {
        elements.push(
          <div
            key={`html-${i}`}
            dangerouslySetInnerHTML={{ __html: parts[i] }}
            className="prose-content"
          />,
        );
      }

      // Code block
      if (parts[i + 1] !== undefined && parts[i + 2] !== undefined) {
        const language = parts[i + 1] || "text";
        const code = parts[i + 2];

        elements.push(
          <div key={`code-${i}`} className="my-6">
            <SyntaxHighlighter
              language={language}
              style={darkMode ? vscDarkPlus : vs}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          </div>,
        );
      }
    }

    return elements;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Error Loading Documentation
            </h1>
            <p className="text-gray-500">{error}</p>
            <Link
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          darkMode
            ? "bg-black/80 border-white/10"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Next.js Starter Kit
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                Home
              </Link>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-yellow-400 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Complete guide for the Next.js Production-Ready Starter Kit
            </p>
          </div>

          {/* Content */}
          <article
            className={`prose prose-lg max-w-none transition-colors duration-300 ${
              darkMode
                ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400 prose-code:text-pink-400 prose-pre:bg-gray-900"
                : "prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600"
            }`}
          >
            <div className="markdown-content">
              {markdownContent && renderProcessedContent(marked.parse(markdownContent) as string)}
            </div>
          </article>

          {/* Back to Top */}
          <div className="mt-12 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
              }`}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 py-8 border-t transition-colors duration-300 ${
          darkMode
            ? "border-white/10 bg-black/50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Built with ❤️ for developers who want to focus on building amazing
            applications
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          scroll-margin-top: 6rem;
        }

        .markdown-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .markdown-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid
            ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        }

        .markdown-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .markdown-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
        }

        .markdown-content blockquote {
          border-left: 4px solid ${darkMode ? "#3b82f6" : "#2563eb"};
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          background: ${darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)"};
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .markdown-content th,
        .markdown-content td {
          border: 1px solid
            ${darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
          padding: 0.75rem;
          text-align: left;
        }

        .markdown-content th {
          background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          font-weight: 600;
        }

        .markdown-content code:not([class*="language-"]) {
          background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: "Consolas", "Monaco", "Courier New", monospace;
        }

        .markdown-content hr {
          border: none;
          height: 1px;
          background: ${darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
          margin: 2rem 0;
        }

        .markdown-content a {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .markdown-content a:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
