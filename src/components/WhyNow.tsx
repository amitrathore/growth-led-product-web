"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GLP_IMAGES } from "@/lib/glpAssets";

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

const signals = [
  { label: "Markets are noisier.", detail: "The signal-to-noise ratio has collapsed. Attention is the new scarcity." },
  { label: "Buyers are more empowered.", detail: "Customers do the research. They arrive informed — or they don't arrive at all." },
  { label: "AI is reshaping every growth channel.", detail: "The playbooks written pre-AI no longer map to the terrain." },
];

export default function WhyNow() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn(0.2);
  const { ref: cardsRef, visible: cardsVisible } = useFadeIn(0.1);

  return (
    <section
      id="why-glp-matters-now"
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top divider */}
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Large background image with overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src={GLP_IMAGES.image01}
          alt=""
          fill
          className="object-cover opacity-[0.06]"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, var(--bg-surface), rgba(15,13,20,0.7), var(--bg-surface))",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 md:mb-20 transition-all duration-1000"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(32px)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "var(--gold)" }}>
            Why GLP Matters Now
          </p>
          <h2
            className="font-display mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", color: "var(--text-primary)", lineHeight: 1.15 }}
          >
            In this climate,{" "}
            <span
              className="font-display italic"
              style={{
                background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              old playbooks fail.
            </span>
          </h2>
        </div>

        {/* Signal cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-20">
          {signals.map((s, i) => (
            <div
              key={s.label}
              className="glass-card p-8 flex flex-col gap-4 transition-all duration-700"
              style={{
                borderRadius: "2px",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div
                className="w-8 h-px"
                style={{ background: "var(--gold)" }}
              />
              <p
                className="font-display text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {s.label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Growth evolution */}
        <div className="glass-card p-10 md:p-14 overflow-hidden" style={{ borderRadius: "2px" }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-8 font-medium" style={{ color: "var(--gold)" }}>
            The Evolution
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
            {[
              "Sales-Led",
              "Marketing-Led",
              "Product-Led",
              "Growth-Led",
            ].map((stage, i, arr) => (
              <div key={stage} className="flex items-center gap-4 md:gap-0 flex-col md:flex-row">
                <div
                  className="flex flex-col items-center gap-2 px-4 md:px-6"
                  style={{ opacity: i < arr.length - 1 ? 0.45 : 1 }}
                >
                  <div
                    className="font-display text-lg md:text-xl font-semibold text-center"
                    style={{
                      color: i === arr.length - 1 ? undefined : "var(--text-secondary)",
                      background:
                        i === arr.length - 1
                          ? "linear-gradient(135deg, var(--gold-light), var(--amber))"
                          : undefined,
                      WebkitBackgroundClip: i === arr.length - 1 ? "text" : undefined,
                      WebkitTextFillColor: i === arr.length - 1 ? "transparent" : undefined,
                      backgroundClip: i === arr.length - 1 ? "text" : undefined,
                    }}
                  >
                    {stage}
                  </div>
                  {i === arr.length - 1 && (
                    <div
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "var(--gold-dim)" }}
                    >
                      The Future
                    </div>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="h-8 md:h-px md:w-10 w-px" style={{ background: "var(--border-hover)" }} />
                    <span className="hidden md:inline" style={{ color: "var(--gold-dim)", fontSize: "10px" }}>›</span>
                    <span className="inline md:hidden" style={{ color: "var(--gold-dim)", fontSize: "10px" }}>↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
