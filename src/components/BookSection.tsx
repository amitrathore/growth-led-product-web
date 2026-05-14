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

export default function BookSection() {
  const { ref, visible } = useFadeIn(0.1);

  return (
    <section
      id="book"
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(194,107,47,0.07) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Book image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative animate-float">
              {/* Glow behind book */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(212,168,83,0.2) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  border: "1px solid rgba(212,168,83,0.15)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,168,83,0.08)",
                  maxWidth: "380px",
                }}
              >
                <Image
                  src={GLP_IMAGES.logo}
                  alt="Growth-Led Product book cover"
                  width={380}
                  height={214}
                  className="block w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Book details */}
          <div className="flex flex-col gap-7">
            <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>
              The Book
            </p>

            <h2
              className="font-display leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text-primary)" }}
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
                Building Brands, Networks, and Ecosystems That Last
              </span>
            </h2>

            <div className="divider-gold" />

            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The roadmap to this transformation. From the first principles of Growth-Led
              thinking to a full playbook for founders, executives, and business owners —
              this book is the definitive guide to building in the ecosystem-first era.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "6", label: "Parts" },
                { n: "30+", label: "Chapters" },
                { n: "3", label: "Leader Playbooks" },
                { n: "∞", label: "The Flywheel" },
              ].map(({ n, label }) => (
                <div key={label} className="glass-card p-5" style={{ borderRadius: "2px" }}>
                  <div
                    className="font-display text-3xl font-bold mb-1"
                    style={{
                      background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {n}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>

            <a
              href="mailto:?subject=Growth-Led Product Early Access"
              className="btn-primary self-start mt-2"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
