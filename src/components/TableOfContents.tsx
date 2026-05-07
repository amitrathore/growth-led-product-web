"use client";

import { useEffect, useRef, useState } from "react";

const toc = [
  {
    part: "Introduction",
    subtitle: null,
    chapters: [
      "Why Growth Must Lead the Product (Not the Other Way Around)",
      "The Evolution from Sales-Led → Marketing-Led → Product-Led → Growth-Led",
    ],
  },
  {
    part: "Part I",
    subtitle: "The Growth-First Mindset",
    chapters: [
      "What is Growth-Led Product (GLP)?",
      "Defining GLP and how it differs from PLG",
      "Why GLP is built for the modern digital and networked economy",
      "From Scarcity to Abundance: Redefining Go-to-Market",
      "Why launching cold is outdated",
      "Ecosystem-first strategies in the age of speed",
      "The Founder as Growth Catalyst",
      "Personal brand and thought leadership as the spark",
      "Why the market responds to people before products",
    ],
  },
  {
    part: "Part II",
    subtitle: "Designing the Ecosystem Before the Product",
    chapters: [
      "Building Marketplace Advantage",
      "Selling adjacent, competitive, and partner products",
      "Creating value as a hub, not just as a vendor",
      "Community as the New Distribution",
      "How to grow trust and collective energy before you launch",
      "Turning conversations into commerce",
      "The Content Flywheel",
      "Storytelling, thought leadership, and media as growth multipliers",
      "Creating category influence and demand without product",
    ],
  },
  {
    part: "Part III",
    subtitle: "Growth Infrastructure & Revenue Design",
    chapters: [
      "Revenue First, Product Later",
      "How to monetize through services, partnerships, and community",
      "Early revenue as a strategic foundation",
      "RevOps for GLP",
      "Operating models that prioritize network health, not just pipeline",
      "Using data + distribution as your primary GTM levers",
      "Signals Over Funnels",
      "Replacing the old funnel with distributed growth signals",
      "Identifying when the market is ready for your product",
    ],
  },
  {
    part: "Part IV",
    subtitle: "The Product as the Outcome of Growth",
    chapters: [
      "When to Launch Your Product",
      "Recognizing the inflection point: demand > supply gap",
      "Launching into a market that's already warmed",
      "Product Design in a Growth-Led World",
      "Building for ecosystems, not silos",
      "Customer-driven product via community signals",
      "Dropping the Megastar: The Cosmic Metaphor",
      "Your product as the inevitable outcome of a thriving network",
    ],
  },
  {
    part: "Part V",
    subtitle: "The GLP Playbook for Leaders",
    chapters: [
      "For Startup Founders",
      "How to steal time and grow faster without a product",
      "For Executives & Enterprise Leaders",
      "How GLP transforms digital transformation, ecosystems, and partner strategy",
      "For Business Owners",
      "Practical steps to shift from product-first to growth-first mindset",
    ],
  },
  {
    part: "Part VI",
    subtitle: "The Future of Growth-Led Businesses",
    chapters: [
      "The Age of Ecosystem Domination",
      "Why networks, partnerships, and communities outscale single products",
      "Brands as Suns: Leading With Radiance",
      "The role of identity, story, and influence in powering distributions",
      "The Infinite Flywheel",
      "Growth → Ecosystem → Product → Mega-network → Growth",
      "Conclusion: The Manifesto for Growth-Led Leaders",
      "Why GLP is Not Just a Strategy — It's a Movement",
    ],
  },
];

function useFadeIn(threshold = 0.1) {
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

function TocItem({ item, index }: { item: typeof toc[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useFadeIn(0.05);

  return (
    <div
      ref={ref}
      className="glass-card overflow-hidden transition-all duration-700"
      style={{
        borderRadius: "2px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left group"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <div className="flex items-start gap-5 flex-1">
          <div
            className="font-display text-4xl font-bold shrink-0 mt-1 w-10 text-right leading-none"
            style={{
              background: "linear-gradient(135deg, var(--gold-light), var(--amber))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.5,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div>
            <div
              className="font-display text-xl md:text-2xl font-semibold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {item.part}
            </div>
            {item.subtitle && (
              <div
                className="font-display italic text-base mt-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.subtitle}
              </div>
            )}
          </div>
        </div>
        <div
          className="shrink-0 transition-transform duration-300 text-lg"
          style={{
            color: "var(--gold)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "600px" : "0px" }}
      >
        <div
          className="px-6 md:px-8 pb-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <ul className="pt-6 flex flex-col gap-2 max-w-3xl mx-auto">
            {item.chapters.map((ch) => (
              <li
                key={ch}
                className="flex items-start gap-3 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--gold-dim)", marginTop: "2px", flexShrink: 0 }}>—</span>
                {ch}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function TableOfContents() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn(0.2);

  return (
    <section
      id="contents"
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="divider-gold absolute top-0 left-0 right-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-1000"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(32px)" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "var(--gold)" }}>
            Inside the Book
          </p>
          <h2
            className="font-display mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text-primary)", lineHeight: 1.2 }}
          >
            Table of Contents
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Six parts. A complete system for the growth-first era.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {toc.map((item, i) => (
            <TocItem key={item.part} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
