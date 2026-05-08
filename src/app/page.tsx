"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";

/* ─── Starfield ─── */
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.1 + 0.2,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.005 + 0.001,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.a += s.s;
        const alpha = (Math.sin(s.a) * 0.45 + 0.55) * 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 193, 122, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ─── Fade-in hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── Section wrapper with fade-in ─── */
function Section({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, vis } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Full-width image divider ─── */
function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ margin: "5rem 0", border: "1px solid rgba(212,168,83,0.45)", padding: "4px" }}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className="w-full h-auto block"
        unoptimized
        style={{ display: "block" }}
      />
    </div>
  );
}

/* ─── Decorative heading rule ─── */
function Rule() {
  return <div style={{ margin: "2rem 0", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.35), transparent)" }} />;
}

/* ─── TOC accordion item ─── */
function TocPart({ num, title, subtitle, items }: { num: string; title: string; subtitle?: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left"
        style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", background: "none", border: "none", cursor: "pointer" }}
      >
        <div className="flex items-start gap-4">
          <span className="font-display text-2xl" style={{ color: "rgba(212,168,83,0.3)", lineHeight: 1, minWidth: "2rem" }}>{num}</span>
          <div>
            <div className="font-display text-lg font-semibold" style={{ color: "var(--text-primary)", lineHeight: 1.3 }}>{title}</div>
            {subtitle && <div className="font-display italic text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{subtitle}</div>}
          </div>
        </div>
        <span style={{ color: "var(--gold)", fontSize: "1.2rem", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0, marginTop: "2px" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? "800px" : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
        <ul className="pb-6 pl-14 flex flex-col gap-2">
          {items.map(item => (
            <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--gold-dim)", flexShrink: 0 }}>—</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", width: "100%" }}>
      <StarField />
      <Nav />

      {/* ── Radial ambient glow ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(194,107,47,0.07) 0%, transparent 65%)" }} />

      {/* ════ Content column — explicitly centered ════ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "8rem 1.5rem 6rem",
        }}
      >

        {/* ── Image 01: circular sun disc ── */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#fff",
              border: "1px solid rgba(212,168,83,0.45)",
              padding: "2px",
              boxShadow: "0 0 0 6px rgba(255,255,255,0.08), 0 0 48px rgba(212,168,83,0.25), 0 8px 40px rgba(0,0,0,0.5)",
              flexShrink: 0,
            }}
          >
            <Image
              src="https://growthled.carrd.co/assets/images/image01.jpg?v=977d0f3d"
              alt="Growth-Led Product radiant sun"
              width={110}
              height={110}
              unoptimized
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transform: "scale(1.35)", transformOrigin: "center" }}
            />
          </div>
        </div>

        {/* ── Hero ── */}
        <Section className="text-center">
          <h1 className="font-display" style={{ fontSize: "clamp(2.8rem, 7vw, 4.5rem)", color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Growth-Led Product.
          </h1>
          <p
            className="font-display italic"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.4, marginTop: "3rem", background: "linear-gradient(135deg, var(--gold-light), var(--amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Continuous Viral Growth in the Age of AI
          </p>
          <Rule />
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "1rem", marginTop: "0.5rem" }}>
            Growth-Led Product is more than a framework — it&apos;s a philosophy, a methodology, and a movement transforming how modern businesses build, scale, and grow.
          </p>
        </Section>

        {/* ── Image 02 ── */}
        <Img src="https://growthled.carrd.co/assets/images/image02.jpg?v=977d0f3d" alt="The Methodology" />

        {/* ── Methodology ── */}
        <Section style={{ paddingTop: "3rem" }}>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600 }}>
            The Methodology
          </h2>
          <h3 className="font-display text-center" style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "var(--text-primary)", lineHeight: 1.2, marginTop: "0.6rem" }}>
            Growth-Led Product: The Infinite Play.
          </h3>
          <Rule />
          <div style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "1rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p>
              At its core, GLP transforms businesses from being product-first into becoming ecosystem-first.
              Brands become radiant centers of influence. Communities evolve into distribution.
              Networks turn into commerce. AI insights fuel viral loops that scale across every stage.
            </p>
            <p>
              Instead of chasing growth through fragmented tactics, GLP orchestrates a system of brand,
              network, and community where products are not just launched — they&apos;re anticipated.
            </p>
          </div>

          <div style={{ marginTop: "6rem" }}>
            <h2 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600 }}>
              The Book
            </h2>
            <h3 className="font-display text-center" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-primary)", lineHeight: 1.3, marginTop: "0.6rem" }}>
              Growth-Led Product: Building Brands, Networks, and Ecosystems That Last
            </h3>
            <Rule />
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "1rem" }}>
              The roadmap to this transformation. A definitive guide for founders, executives, and business owners
              navigating the ecosystem-first era. From first principles to a full playbook — this is the book
              the market has been waiting for.
            </p>
          </div>

          <div style={{ marginTop: "6rem" }}>
            <h2 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600 }}>
              The Community
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "1rem", marginTop: "1.25rem" }}>
              Join a growing network of founders, executives, and business owners putting growth at the center
              of how they build, scale, and transform. The community is where the methodology becomes real —
              where conversations become commerce and leaders become catalysts.
            </p>
          </div>
        </Section>

        {/* ── Image 03 ── */}
        <Img src="https://growthled.carrd.co/assets/images/image03.jpg?v=977d0f3d" alt="Why GLP Matters Now" />

        {/* ── Why Now + Invitation ── */}
        <Section style={{ paddingTop: "3rem" }}>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600 }}>
            Why GLP Matters Now
          </h2>
          <h3 className="font-display text-center" style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "var(--text-primary)", lineHeight: 1.2, marginTop: "0.6rem" }}>
            In this climate,{" "}
            <span className="font-display italic" style={{ background: "linear-gradient(135deg, var(--gold-light), var(--amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              old playbooks fail.
            </span>
          </h3>
          <Rule />
          <div style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "1rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p>
              Markets are noisier. Buyers are more empowered. AI is reshaping every growth channel.
              In this climate, old playbooks fail.
            </p>
            <p>
              GLP is the methodology that aligns your brand, community, and product into one unstoppable
              growth engine.
            </p>
          </div>

          {/* Evolution */}
          <div className="text-center" style={{ marginTop: "3rem", padding: "2.5rem 1.5rem", border: "1px solid rgba(212,168,83,0.12)", background: "rgba(20,18,25,0.5)" }}>
            <p className="text-xs tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>The Evolution</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Sales-Led", "Marketing-Led", "Product-Led", "Growth-Led"].map((s, i, a) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className="font-display"
                    style={{
                      fontSize: "1rem",
                      color: i < a.length - 1 ? "var(--text-muted)" : undefined,
                      background: i === a.length - 1 ? "linear-gradient(135deg, var(--gold-light), var(--amber))" : undefined,
                      WebkitBackgroundClip: i === a.length - 1 ? "text" : undefined,
                      WebkitTextFillColor: i === a.length - 1 ? "transparent" : undefined,
                      backgroundClip: i === a.length - 1 ? "text" : undefined,
                    }}
                  >{s}</span>
                  {i < a.length - 1 && <span style={{ color: "var(--gold-dim)" }}>→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Invitation */}
          <div style={{ marginTop: "6rem" }}>
            <h2 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600 }}>
              The Invitation
            </h2>
            <h3 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--text-primary)", lineHeight: 1.3, marginTop: "0.6rem" }}>
              This is the future of growth.{" "}
              <span className="font-display italic" style={{ background: "linear-gradient(135deg, var(--gold-light), var(--amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Welcome to Growth-Led Product.
              </span>
            </h3>
            <Rule />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem", marginBottom: "2.5rem" }}>
              {[
                { e: "📖", t: "Learn the methodology." },
                { e: "🌐", t: "Join the community of leaders." },
                { e: "⚡", t: "Discover how GLP can reshape your brand and business." },
              ].map(({ e, t }) => (
                <div key={t} className="flex items-start gap-3" style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* Email CTA */}
            <EmailCapture />
          </div>
        </Section>

        {/* ── Image 04 ── */}
        <Img src="https://growthled.carrd.co/assets/images/image04.jpg?v=977d0f3d" alt="Table of Contents" />

        {/* ── Table of Contents ── */}
        <Section style={{ paddingTop: "3rem" }}>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "var(--text-primary)", lineHeight: 1.2 }}>
            Growth-Led Product:{" "}
            <span className="font-display italic" style={{ background: "linear-gradient(135deg, var(--gold-light), var(--amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Building Brands, Networks, and Ecosystems First
            </span>
          </h2>
          <h3 className="font-display text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--gold)", lineHeight: 1.3, fontWeight: 600, marginTop: "0.6rem" }}>
            Table of Contents
          </h3>
          <Rule />

          <div className="mt-6" style={{ borderTop: "1px solid rgba(212,168,83,0.1)" }}>
            <TocPart num="00" title="Introduction" items={[
              "Why Growth Must Lead the Product (Not the Other Way Around)",
              "The Evolution from Sales-Led → Marketing-Led → Product-Led → Growth-Led",
            ]} />
            <TocPart num="I" title="Part I" subtitle="The Growth-First Mindset" items={[
              "What is Growth-Led Product (GLP)?",
              "Defining GLP and how it differs from PLG",
              "Why GLP is built for the modern digital and networked economy",
              "From Scarcity to Abundance: Redefining Go-to-Market",
              "Why launching cold is outdated",
              "Ecosystem-first strategies in the age of speed",
              "The Founder as Growth Catalyst",
              "Personal brand and thought leadership as the spark",
              "Why the market responds to people before products",
            ]} />
            <TocPart num="II" title="Part II" subtitle="Designing the Ecosystem Before the Product" items={[
              "Building Marketplace Advantage",
              "Selling adjacent, competitive, and partner products",
              "Creating value as a hub, not just as a vendor",
              "Community as the New Distribution",
              "How to grow trust and collective energy before you launch",
              "Turning conversations into commerce",
              "The Content Flywheel",
              "Storytelling, thought leadership, and media as growth multipliers",
              "Creating category influence and demand without product",
            ]} />
            <TocPart num="III" title="Part III" subtitle="Growth Infrastructure & Revenue Design" items={[
              "Revenue First, Product Later",
              "How to monetize through services, partnerships, and community",
              "Early revenue as a strategic foundation",
              "RevOps for GLP",
              "Operating models that prioritize network health, not just pipeline",
              "Using data + distribution as your primary GTM levers",
              "Signals Over Funnels",
              "Replacing the old funnel with distributed growth signals",
              "Identifying when the market is ready for your product",
            ]} />
            <TocPart num="IV" title="Part IV" subtitle="The Product as the Outcome of Growth" items={[
              "When to Launch Your Product",
              "Recognizing the inflection point: demand > supply gap",
              "Launching into a market that's already warmed",
              "Product Design in a Growth-Led World",
              "Building for ecosystems, not silos",
              "Customer-driven product via community signals",
              "Dropping the Megastar: The Cosmic Metaphor",
              "Your product as the inevitable outcome of a thriving network",
            ]} />
            <TocPart num="V" title="Part V" subtitle="The GLP Playbook for Leaders" items={[
              "For Startup Founders — How to steal time and grow faster without a product",
              "For Executives & Enterprise Leaders — How GLP transforms digital transformation, ecosystems, and partner strategy",
              "For Business Owners — Practical steps to shift from product-first to growth-first mindset",
            ]} />
            <TocPart num="VI" title="Part VI" subtitle="The Future of Growth-Led Businesses" items={[
              "The Age of Ecosystem Domination",
              "Why networks, partnerships, and communities outscale single products",
              "Brands as Suns: Leading With Radiance",
              "The role of identity, story, and influence in powering distributions",
              "The Infinite Flywheel — Growth → Ecosystem → Product → Mega-network → Growth",
              "Conclusion: The Manifesto for Growth-Led Leaders",
              "Why GLP is Not Just a Strategy — It's a Movement",
            ]} />
          </div>
        </Section>

        {/* ── Image 05 ── */}
        <Img src="https://growthled.carrd.co/assets/images/image05.jpg?v=977d0f3d" alt="Growth-Led Product" />

        {/* ── Provenance note ── */}
        <Section className="text-center" style={{ paddingBottom: "4rem" }}>
          <div className="divider-gold" style={{ marginBottom: "3rem" }} />
          <p className="text-xs tracking-[0.18em] uppercase mb-8" style={{ color: "var(--text-muted)" }}>
            A note on origins
          </p>
          <ArticleCard />
          <div className="divider-gold" style={{ marginTop: "3rem" }} />
        </Section>

        {/* ── Footer ── */}
        <Section className="text-center" style={{ paddingBottom: "3rem", paddingTop: "1rem" }}>
          <div className="flex justify-center gap-6" style={{ marginBottom: "3rem" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "X / Twitter", href: "https://twitter.com" },
              { label: "Facebook", href: "https://facebook.com" },
              { label: "Email", href: "mailto:access@growthledproduct.com?subject=Growth-Led Product Early Access" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="btn-outline py-2 px-5 text-xs"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="divider-gold" style={{ marginBottom: "3rem" }} />
          <p className="font-display text-2xl mb-1" style={{ color: "var(--gold)", marginTop: "3rem" }}>Growth-Led Product.</p>
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </Section>

      </div>
    </div>
  );
}

/* ─── Email capture component ─── */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `mailto:access@growthledproduct.com?subject=Growth-Led Product Early Access&body=Please add me to the list: ${email}`;
      setDone(true);
    }
  };
  if (done) return (
    <div className="text-center py-4 text-sm" style={{ color: "var(--gold)" }}>
      ✦ You&apos;re on the list. We&apos;ll be in touch.
    </div>
  );
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 text-sm outline-none"
        style={{
          background: "rgba(20,18,25,0.8)",
          border: "1px solid rgba(212,168,83,0.2)",
          color: "var(--text-primary)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "var(--gold)"}
        onBlur={e => e.currentTarget.style.borderColor = "rgba(212,168,83,0.2)"}
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Join The Movement
      </button>
    </form>
  );
}

/* ─── Article preview card ─── */
function ArticleCard() {
  const [hovered, setHovered] = useState(false);
  const ARTICLE_URL = "https://www.awake.ventures/p/from-product-led-growth-to-growth-led-product-n8fk56ltr461yban?refBy=Mzg4YmE4ZWViMw";
  return (
    <a
      href={ARTICLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        maxWidth: "520px",
        margin: "0 auto",
        textDecoration: "none",
        borderRadius: "2px",
        overflow: "hidden",
        border: hovered ? "1px solid var(--gold)" : "1px solid var(--border-hover)",
        background: "rgba(20,18,25,0.6)",
        backdropFilter: "blur(12px)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 8px 40px rgba(212,168,83,0.15), 0 2px 12px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image banner */}
      <div style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}>
        <img
          src="/GLP-00-03.webp"
          alt="From Product-Led Growth to Growth-Led Product"
          style={{ width: "100%", display: "block", objectFit: "cover" }}
        />
      </div>
      {/* Card body */}
      <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
        <p
          className="text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--gold)" }}
        >
          From AwakeVC
        </p>
        <p
          className="font-display"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "var(--text-primary)",
            lineHeight: 1.4,
            marginBottom: "0.75rem",
          }}
        >
          From Product-Led Growth to Growth-Led Product
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}
        >
          Amit Rathore · AwakeVC
        </p>
        <span
          className="text-xs tracking-[0.12em] uppercase"
          style={{
            color: hovered ? "var(--gold)" : "var(--gold-dim)",
            transition: "color 0.3s ease",
          }}
        >
          Read the article →
        </span>
      </div>
    </a>
  );
}
