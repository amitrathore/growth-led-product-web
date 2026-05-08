"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Starfield canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) * 0.5 + 0.5) * 0.7 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 211, 138, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Deep radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(194,107,47,0.12) 0%, rgba(212,168,83,0.06) 30%, transparent 70%)",
        }}
      />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute rounded-full animate-orbit-cw"
          style={{
            width: "520px",
            height: "520px",
            border: "1px solid rgba(212,168,83,0.09)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "6px",
              height: "6px",
              background: "var(--gold)",
              top: "-3px",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 12px 3px rgba(212,168,83,0.6)",
            }}
          />
        </div>
        <div
          className="absolute rounded-full animate-orbit-ccw"
          style={{
            width: "760px",
            height: "760px",
            border: "1px solid rgba(212,168,83,0.05)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: "4px",
              height: "4px",
              background: "var(--amber)",
              bottom: "-2px",
              left: "40%",
              boxShadow: "0 0 10px 3px rgba(194,107,47,0.5)",
            }}
          />
        </div>
        <div
          className="absolute rounded-full"
          style={{
            width: "280px",
            height: "280px",
            border: "1px solid rgba(212,168,83,0.06)",
          }}
        />
      </div>

      {/* Sun core */}
      <div className="absolute flex items-center justify-center pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <div
          className="animate-pulse-radial rounded-full"
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(237,211,138,0.25) 0%, rgba(212,168,83,0.06) 60%, transparent 100%)",
            boxShadow: "0 0 60px 20px rgba(212,168,83,0.12), 0 0 120px 60px rgba(194,107,47,0.05)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="hidden sm:block h-px w-12" style={{ background: "var(--gold-dim)" }} />
          <span
            className="text-xs tracking-[0.2em] uppercase font-medium text-center"
            style={{ color: "var(--gold)" }}
          >
            A Philosophy · A Methodology · A Movement
          </span>
          <div className="hidden sm:block h-px w-12" style={{ background: "var(--gold-dim)" }} />
        </div>

        <h1
          className="font-display leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--text-primary)" }}
        >
          Continuous Viral{" "}
          <span
            className="font-display italic"
            style={{
              background: "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--amber) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Growth
          </span>{" "}
          <br />
          in the Age of AI
        </h1>

        <p
          className="font-display text-2xl md:text-3xl italic font-light tracking-wide"
          style={{ color: "var(--gold)", opacity: 0.85 }}
        >
          Growth-Led Product
        </p>

        <p
          className="max-w-xl text-base md:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          More than a framework — it&apos;s a philosophy, a methodology, and a movement
          transforming how modern businesses build, scale, and grow.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="mailto:?subject=Growth-Led Product Early Access"
            className="btn-primary"
          >
            Get Early Access
          </a>
          <a href="#methodology" className="btn-outline">
            Explore the Method
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, var(--gold-dim), transparent)",
          }}
        />
      </div>
    </section>
  );
}
