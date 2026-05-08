"use client";

export default function Footer() {
  return (
    <footer
      className="relative py-12 text-center"
      style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="font-display text-xl font-semibold"
            style={{ color: "var(--gold)" }}
          >
            GLP
          </span>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Growth-Led Product
          </span>
        </div>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Growth-Led Product. All rights reserved.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
