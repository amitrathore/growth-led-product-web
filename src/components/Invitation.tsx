"use client";

import { useEffect, useRef, useState } from "react";

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

export default function Invitation() {
  const { ref, visible } = useFadeIn(0.15);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `mailto:growth-led-product@example.com?subject=Early Access Request&body=Email: ${email}`;
      setSubmitted(true);
    }
  };

  return (
    <section
      id="invitation"
      className="relative py-40 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Top divider */}
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Cosmic bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(194,107,47,0.1) 0%, rgba(212,168,83,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Orbital ring */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: "700px",
            height: "700px",
            border: "1px solid rgba(212,168,83,0.06)",
            transform: "translateY(50%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8 relative z-10 transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>
          The Invitation
        </p>

        <h2
          className="font-display leading-tight"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", color: "var(--text-primary)" }}
        >
          This is{" "}
          <span
            className="font-display italic"
            style={{
              background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your
          </span>{" "}
          moment.
        </h2>

        <p
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Discover how Growth-Led Product can reshape your brand and business. Be first to
          access the book, the framework, and the community that is changing how leaders grow.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 text-sm outline-none transition-all duration-200"
              style={{
                background: "rgba(20,18,28,0.8)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Get Early Access
            </button>
          </form>
        ) : (
          <div
            className="glass-card px-8 py-5 text-sm"
            style={{ borderRadius: "2px", color: "var(--gold)" }}
          >
            ✦ You&apos;re on the list. We&apos;ll be in touch soon.
          </div>
        )}

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          No spam. Just the methodology, the book, and early access.
        </p>

        {/* Flywheel visual */}
        <div className="mt-10 glass-card px-8 py-6 w-full max-w-lg" style={{ borderRadius: "2px" }}>
          <p className="text-xs tracking-[0.15em] uppercase mb-5 font-medium" style={{ color: "var(--text-muted)" }}>
            The Infinite Flywheel
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {["Growth", "Ecosystem", "Product", "Mega-network", "Growth"].map((node, i, arr) => (
              <div key={`${node}-${i}`} className="flex items-center gap-2">
                <span
                  className="font-display italic text-sm md:text-base"
                  style={{
                    color: i === 0 || i === arr.length - 1 ? undefined : "var(--text-secondary)",
                    background:
                      i === 0 || i === arr.length - 1
                        ? "linear-gradient(135deg, var(--gold-light), var(--amber))"
                        : undefined,
                    WebkitBackgroundClip: i === 0 || i === arr.length - 1 ? "text" : undefined,
                    WebkitTextFillColor: i === 0 || i === arr.length - 1 ? "transparent" : undefined,
                    backgroundClip: i === 0 || i === arr.length - 1 ? "text" : undefined,
                  }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "var(--gold-dim)" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
