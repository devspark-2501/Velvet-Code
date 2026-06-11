"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function SectionOne() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function drawRibbon(time) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 - 10;
      const R = Math.min(w, h) * 0.32;
      const ribbonWidth = R * 0.22;
      const loops = 2;
      const steps = 300;

      // Outer glow shadow
      ctx.save();
      ctx.shadowColor = "rgba(120, 60, 255, 0.55)";
      ctx.shadowBlur = 60;

      for (let i = 0; i < steps; i++) {
        const frac = i / steps;
        const angle = frac * Math.PI * 2 * loops + time * 0.6;
        const wobble = Math.sin(frac * Math.PI * 4 + time * 1.2) * 0.18;
        const r = R * (0.82 + wobble);

        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle) * 0.55; // perspective flatten

        // Perpendicular for ribbon width
        const nextFrac = (i + 1) / steps;
        const nextAngle = nextFrac * Math.PI * 2 * loops + time * 0.6;
        const nextWobble = Math.sin(nextFrac * Math.PI * 4 + time * 1.2) * 0.18;
        const nextR = R * (0.82 + nextWobble);
        const nx = cx + nextR * Math.cos(nextAngle);
        const ny = cy + nextR * Math.sin(nextAngle) * 0.55;

        const dx = nx - x;
        const dy = ny - y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const px = (-dy / len) * ribbonWidth;
        const py = (dx / len) * ribbonWidth;

        // Depth-based color — lighter at top of loop, darker at bottom
        const depth = Math.sin(angle) * 0.5 + 0.5;
        const alpha = 0.55 + depth * 0.45;

        // Purple gradient across the ribbon face
        const grad = ctx.createLinearGradient(
          x - px, y - py, x + px, y + py
        );
        grad.addColorStop(0, `rgba(80, 30, 200, ${alpha * 0.7})`);
        grad.addColorStop(0.3, `rgba(130, 60, 255, ${alpha})`);
        grad.addColorStop(0.7, `rgba(170, 90, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(80, 20, 180, ${alpha * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(x - px, y - py);
        ctx.lineTo(x + px, y + py);
        ctx.lineTo(nx + px, ny + py);
        ctx.lineTo(nx - px, ny - py);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();

      // Pedestal / base shadow
      const grd = ctx.createRadialGradient(cx, cy + R * 0.6, 4, cx, cy + R * 0.6, R * 0.55);
      grd.addColorStop(0, "rgba(80, 40, 180, 0.45)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy + R * 0.62, R * 0.5, R * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Pedestal disc
      const discGrad = ctx.createLinearGradient(cx - R * 0.38, cy + R * 0.56, cx + R * 0.38, cy + R * 0.72);
      discGrad.addColorStop(0, "rgba(60,30,140,0.7)");
      discGrad.addColorStop(0.5, "rgba(100,60,200,0.55)");
      discGrad.addColorStop(1, "rgba(30,10,80,0.7)");
      ctx.beginPath();
      ctx.ellipse(cx, cy + R * 0.64, R * 0.36, R * 0.09, 0, 0, Math.PI * 2);
      ctx.fillStyle = discGrad;
      ctx.fill();
    }

    function animate() {
      t += 0.012;
      drawRibbon(t);
      animRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* BG blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="hero-inner">
        {/* ── LEFT CONTENT ── */}
        <div className="hero-left">
          <p className="eyebrow">SOFTWARE. DESIGN. IMPACT.</p>

          <h1 className="headline">
            We code products<br />
            that <span className="accent">create impact.</span>
          </h1>

          <p className="subtext">
            Velvet Code Co. is a digital studio crafting high-performance
            software, beautiful designs, and seamless experiences
            for ambitious brands and startups.
          </p>

          <div className="cta-row">
            <a href="#work" className="btn-primary">
              View Our Work <span className="arrow">→</span>
            </a>
            <a href="#services" className="btn-secondary">
              Explore Services
            </a>
          </div>

          <div className="trust-row">
            <p className="trust-label">Trusted by innovative teams</p>
            <div className="logos-row">
              {["NEXORA", "lumina", "orbital", "FORMA", "STUDIO X"].map((name) => (
                <span key={name} className="logo-pill">{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT CANVAS ── */}
        <div className="hero-right">
          <canvas ref={canvasRef} className="ribbon-canvas" />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: #05030f;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          padding: 0 clamp(1.5rem, 5vw, 6rem);
        }

        /* Ambient glow blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 520px; height: 420px;
          background: radial-gradient(circle, rgba(90,40,220,0.28) 0%, transparent 70%);
          top: -80px; left: -80px;
        }
        .blob-2 {
          width: 460px; height: 400px;
          background: radial-gradient(circle, rgba(110,50,240,0.18) 0%, transparent 70%);
          bottom: -60px; right: 5%;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 2rem;
          padding: 5rem 0 4rem;
        }

        /* ── LEFT ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #8b5cf6;
          margin: 0;
        }

        .headline {
          margin: 0;
          font-size: clamp(2.2rem, 4.2vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          color: #f0eeff;
          letter-spacing: -0.02em;
        }

        .accent {
          color: #7c3aed;
        }

        .subtext {
          margin: 0;
          font-size: clamp(0.88rem, 1.2vw, 1rem);
          line-height: 1.7;
          color: #8b8aaa;
          max-width: 420px;
        }

        /* CTA buttons */
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          align-items: center;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #6d28d9;
          color: #fff;
          text-decoration: none;
          padding: 0.75rem 1.6rem;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 600;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(109,40,217,0.38);
        }
        .btn-primary:hover {
          background: #7c3aed;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(109,40,217,0.55);
        }
        .arrow { font-size: 1.1em; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          color: #d4cfff;
          text-decoration: none;
          padding: 0.75rem 1.6rem;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 600;
          border: 1.5px solid rgba(160,130,255,0.28);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }
        .btn-secondary:hover {
          border-color: rgba(160,130,255,0.55);
          background: rgba(109,40,217,0.1);
          transform: translateY(-2px);
        }

        /* Trust */
        .trust-row { display: flex; flex-direction: column; gap: 0.65rem; }
        .trust-label {
          margin: 0;
          font-size: 0.76rem;
          color: #55536e;
          letter-spacing: 0.04em;
        }
        .logos-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          align-items: center;
        }
        .logo-pill {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #5e5a7a;
          transition: color 0.2s;
        }
        .logo-pill:hover { color: #a78bfa; }

        /* ── RIGHT CANVAS ── */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .ribbon-canvas {
          width: 100%;
          height: clamp(320px, 48vw, 540px);
          display: block;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            padding: 4rem 0 3rem;
            gap: 0;
          }
          .hero-right {
            order: -1;
          }
          .ribbon-canvas {
            height: clamp(260px, 55vw, 360px);
          }
          .subtext { max-width: 100%; }
        }

        @media (max-width: 520px) {
          .hero-section { padding: 0 1.25rem; }
          .cta-row { flex-direction: column; align-items: flex-start; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}