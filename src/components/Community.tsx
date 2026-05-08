"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

export default function Community() {
  const { ref, visible } = useFadeIn(0.1);

  return (
    <section
      id="community"
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="divider-gold absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(212,168,83,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Content */}
          <div className="flex flex-col gap-7">
            <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>
              The Community
            </p>

            <h2
              className="font-display leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text-primary)" }}
            >
              A growing network of{" "}
              <span
                className="font-display italic"
                style={{
                  background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Growth-Led Leaders
              </span>
            </h2>

            <div className="divider-gold" style={{ maxWidth: "200px" }} />

            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Join a movement of founders, executives, and business owners who are putting growth
              at the center of how they build, scale, and transform. The community is where the
              methodology becomes real.
            </p>

            <div className="flex flex-col gap-4">
              {[
                "Learn the methodology",
                "Join the community of leaders",
                "Discover how GLP can reshape your brand and business",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div
                    className="mt-1.5 shrink-0 rounded-full"
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "var(--gold)",
                      boxShadow: "0 0 8px rgba(212,168,83,0.6)",
                    }}
                  />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-2.5 px-5 text-xs"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-2.5 px-5 text-xs"
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Images collage */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src="https://growthled.carrd.co/assets/images/image03.jpg?v=977d0f3d"
                  alt="Growth-Led Product community"
                  width={280}
                  height={320}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src="https://growthled.carrd.co/assets/images/image05.jpg?v=977d0f3d"
                  alt="Growth-Led Product"
                  width={280}
                  height={200}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-10">
              <div className="overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image
                  src="https://growthled.carrd.co/assets/images/image04.jpg?v=977d0f3d"
                  alt="Growth-Led Product methodology"
                  width={280}
                  height={360}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
