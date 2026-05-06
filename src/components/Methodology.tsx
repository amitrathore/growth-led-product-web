"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "✦",
    label: "Brands",
    arrow: "become",
    outcome: "Radiant Centers of Influence",
    description:
      "Your brand radiates energy outward — attracting attention, trust, and loyalty before a product ever ships.",
  },
  {
    icon: "◈",
    label: "Communities",
    arrow: "evolve into",
    outcome: "Distribution",
    description:
      "A cultivated community is a living distribution channel — one that scales with authenticity, not ad spend.",
  },
  {
    icon: "⬡",
    label: "Networks",
    arrow: "turn into",
    outcome: "Commerce",
    description:
      "Every relationship in your network is a potential transaction. AI-driven viral loops multiply the velocity.",
  },
];

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Methodology() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn(0.2);
  const { ref: pillarsRef, visible: pillarsVisible } = useFadeIn(0.1);

  return (
    <section
      id="methodology"
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.2), transparent)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20 transition-all duration-1000"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(32px)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "var(--gold)" }}>
            The Methodology
          </p>
          <h2
            className="font-display mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--text-primary)", lineHeight: 1.15 }}
          >
            Growth-Led Product:{" "}
            <span
              className="font-display italic"
              style={{
                background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Infinite Play
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            The core transformation: from being product-first into becoming ecosystem-first.
          </p>
        </div>

        {/* Central quote */}
        <div
          className="relative glass-card p-10 md:p-14 mb-20 text-center overflow-hidden"
          style={{ borderRadius: "2px" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,168,83,0.03) 0%, transparent 70%)",
            }}
          />
          <p
            className="font-display italic relative z-10"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;Brands become radiant centers of influence.
            <br />
            Communities evolve into distribution.
            <br />
            Networks turn into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              commerce.
            </span>
            &rdquo;
          </p>
          {/* Decorative corners */}
          <div className="absolute top-5 left-5 w-8 h-8" style={{ borderTop: "1px solid var(--gold-dim)", borderLeft: "1px solid var(--gold-dim)" }} />
          <div className="absolute top-5 right-5 w-8 h-8" style={{ borderTop: "1px solid var(--gold-dim)", borderRight: "1px solid var(--gold-dim)" }} />
          <div className="absolute bottom-5 left-5 w-8 h-8" style={{ borderBottom: "1px solid var(--gold-dim)", borderLeft: "1px solid var(--gold-dim)" }} />
          <div className="absolute bottom-5 right-5 w-8 h-8" style={{ borderBottom: "1px solid var(--gold-dim)", borderRight: "1px solid var(--gold-dim)" }} />
        </div>

        {/* Three pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="glass-card p-8 flex flex-col gap-4 transition-all duration-700"
              style={{
                borderRadius: "2px",
                opacity: pillarsVisible ? 1 : 0,
                transform: pillarsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="flex items-baseline gap-3">
                <span style={{ color: "var(--gold)", fontSize: "1.4rem" }}>{p.icon}</span>
                <span
                  className="font-display text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.label}
                </span>
              </div>
              <div className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>
                {p.arrow}
              </div>
              <div
                className="font-display text-xl italic"
                style={{
                  background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {p.outcome}
              </div>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
