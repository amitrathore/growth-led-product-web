"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(7, 6, 10, 0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,83,0.1)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4" style={{ maxWidth: "720px", margin: "0 auto", width: "100%" }}>
        <a href="#" className="font-display text-xl font-semibold tracking-wide" style={{ color: "var(--gold)" }}>
          GLP
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Methodology", "The Book", "Contents", "Community"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-").replace("the-", "")}`}
              className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:access@growthledproduct.com?subject=Growth-Led Product Early Access"
          className="btn-outline text-xs py-2 px-5"
        >
          Join The Movement
        </a>
      </div>
    </nav>
  );
}
