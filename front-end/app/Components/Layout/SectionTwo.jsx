"use client";
import { useEffect, useRef } from "react";

export default function SectionTwo() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const root = canvas.parentElement;
    let W, H;
    const CELL = 52;
    const GLOW_R = 240;

    const resize = () => {
      W = root.offsetWidth;
      H = root.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawGrid = (mx, my) => {
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      for (let c = 0; c <= cols; c++) {
        const x = c * CELL;
        let maxT = 0;
        for (let r = 0; r <= rows; r++) {
          const dist = Math.hypot(x - mx, r * CELL - my);
          maxT = Math.max(maxT, Math.max(0, 1 - dist / GLOW_R));
        }
        ctx.strokeStyle = `rgba(109,40,217,${0.055 + maxT * 0.32})`;
        ctx.lineWidth = 0.5 + maxT * 0.8;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      for (let r = 0; r <= rows; r++) {
        const y = r * CELL;
        let maxT = 0;
        for (let c = 0; c <= cols; c++) {
          const dist = Math.hypot(c * CELL - mx, y - my);
          maxT = Math.max(maxT, Math.max(0, 1 - dist / GLOW_R));
        }
        ctx.strokeStyle = `rgba(109,40,217,${0.055 + maxT * 0.32})`;
        ctx.lineWidth = 0.5 + maxT * 0.8;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * CELL; const y = r * CELL;
          const dist = Math.hypot(x - mx, y - my);
          const t = Math.max(0, 1 - dist / (GLOW_R * 0.65));
          if (t > 0.04) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + t * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139,92,246,${t * 0.7})`;
            ctx.fill();
          }
        }
      }
    };

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    const loop = () => {
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.07);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.07);
      drawGrid(smoothMouse.current.x, smoothMouse.current.y);
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const services = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      title: "Web Development",
      desc: "Fast, accessible and scalable websites & web apps.",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
        </svg>
      ),
      title: "Product Design",
      desc: "User-centered design that turns ideas into intuitive experiences.",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
      title: "Mobile Development",
      desc: "Cross-platform mobile apps built for performance.",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: "Cloud & DevOps",
      desc: "Reliable infrastructure and CI/CD to ship with confidence.",
    },
  ];

  const projects = [
    {
      title: "Pulse Dashboard",
      tag: "SaaS",
      desc: "Analytics platform for real-time insights",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%" style={{display:"block"}}>
          <rect width="320" height="180" fill="#0a0614"/>
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[40,80,120,160].map(y=><line key={y} x1="20" y1={y} x2="300" y2={y} stroke="#ffffff07" strokeWidth="1"/>)}
          <path d="M20,140 L60,110 L100,120 L140,80 L180,90 L220,55 L260,70 L300,40 L300,160 L20,160Z" fill="url(#lg1)"/>
          <polyline points="20,140 60,110 100,120 140,80 180,90 220,55 260,70 300,40" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round"/>
          {[[20,140],[60,110],[100,120],[140,80],[180,90],[220,55],[260,70],[300,40]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="3.5" fill="#7c3aed" stroke="#0a0614" strokeWidth="2"/>
          ))}
          {[0,1,2,3,4].map(i=>(
            <rect key={i} x={28+i*18} y={148-i*9} width="10" height={i*9+10} rx="2" fill="#4c1d95" opacity="0.7"/>
          ))}
          <rect x="210" y="12" width="82" height="20" rx="10" fill="#7c3aed22" stroke="#7c3aed44" strokeWidth="1"/>
          <text x="251" y="25" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">↑ 24.5%</text>
        </svg>
      ),
    },
    {
      title: "Northwind Marketing",
      tag: "Marketing",
      desc: "Modern marketing site with CMS",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%" style={{display:"block"}}>
          <rect width="320" height="180" fill="#08080f"/>
          <defs>
            <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="300" height="160" rx="6" fill="#10101c" stroke="#ffffff0a" strokeWidth="1"/>
          <rect x="10" y="10" width="300" height="22" rx="6" fill="#16162a"/>
          <circle cx="24" cy="21" r="4" fill="#ff5f5770"/>
          <circle cx="38" cy="21" r="4" fill="#ffbd2e70"/>
          <circle cx="52" cy="21" r="4" fill="#28ca4170"/>
          <rect x="70" y="15" width="180" height="12" rx="6" fill="#ffffff07"/>
          <rect x="20" y="40" width="280" height="58" rx="4" fill="url(#lg2)"/>
          <rect x="32" y="52" width="110" height="9" rx="3" fill="#ffffff1a"/>
          <rect x="32" y="67" width="75" height="6" rx="3" fill="#ffffff0f"/>
          <rect x="32" y="80" width="48" height="13" rx="4" fill="#6366f1"/>
          {[0,1,2].map(i=>(
            <rect key={i} x={20+i*96} y={108} width="86" height="50" rx="4" fill="#14142a" stroke="#ffffff07" strokeWidth="1"/>
          ))}
          <rect x="28" y="116" width="38" height="6" rx="2" fill="#6366f170"/>
          <rect x="28" y="127" width="55" height="4" rx="2" fill="#ffffff12"/>
          <rect x="28" y="135" width="45" height="4" rx="2" fill="#ffffff0a"/>
        </svg>
      ),
    },
    {
      title: "Aurum Mobile",
      tag: "Fintech",
      desc: "Mobile banking app built for speed",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%" style={{display:"block"}}>
          <rect width="320" height="180" fill="#06060e"/>
          <rect x="160" y="14" width="90" height="154" rx="12" fill="#0e0e20" stroke="#ffffff08" strokeWidth="1" transform="rotate(6 205 91)"/>
          <rect x="80" y="9" width="100" height="165" rx="14" fill="#13132a" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="115" y="13" width="30" height="8" rx="4" fill="#0a0a1a"/>
          <rect x="88" y="30" width="84" height="20" rx="4" fill="#1c1c3a"/>
          <text x="130" y="44" fill="#8b5cf6" fontSize="9" fontFamily="monospace" textAnchor="middle">$24,850</text>
          <rect x="88" y="55" width="84" height="5" rx="2" fill="#ffffff0d"/>
          <polyline points="90,100 105,88 120,93 135,78 150,85 165,70" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M90,100 L105,88 L120,93 L135,78 L150,85 L165,70 L165,110 L90,110Z" fill="#8b5cf618"/>
          {[0,1,2].map(i=>(
            <g key={i}>
              <rect x="88" y={118+i*14} width="84" height="11" rx="3" fill="#1a1a35"/>
              <rect x="92" y={120+i*14} width="18" height="7" rx="2" fill="#4c1d9535"/>
              <rect x="114" y={121+i*14} width="28" height="5" rx="2" fill="#ffffff12"/>
              <rect x="150" y={121+i*14} width="16" height="5" rx="2" fill={i===0?"#34d39928":"#ef444428"}/>
            </g>
          ))}
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .s2-root {
          position: relative;
          background: #faf8ff;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .s2-grid-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .s2-wrap {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem);
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        /* ── BLOCK LAYOUT ── */
        .s2-block {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* ── LEFT COLUMN ── */
        .s2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #6d28d9;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
        }
        .s2-eyebrow::before {
          content: '';
          display: block;
          width: 3px; height: 13px;
          background: #6d28d9;
          border-radius: 2px;
        }
        .s2-block-title {
          font-size: clamp(1.75rem, 2.6vw, 2.4rem);
          font-weight: 800;
          color: #1a1033;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 0.9rem;
        }
        .s2-block-desc {
          font-size: 0.9rem;
          color: #7b7a9a;
          line-height: 1.72;
          margin: 0 0 1.4rem;
        }
        .s2-more-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.83rem;
          font-weight: 600;
          color: #6d28d9;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .s2-more-link:hover { gap: 9px; }

        /* ── SERVICE CARDS ── */
        .s2-service-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #ece8f8;
          border-radius: 16px;
          overflow: hidden;
          background: #ece8f8;
          gap: 1px;
          box-shadow: 0 2px 24px rgba(109,40,217,0.06);
        }
        .s2-svc-card {
          background: #faf8ff;
          padding: 1.7rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          position: relative;
          transition: background 0.2s;
          cursor: default;
        }
        .s2-svc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 1.4rem; right: 1.4rem;
          height: 2px;
          background: #6d28d9;
          border-radius: 2px 2px 0 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s ease;
        }
        .s2-svc-card:hover { background: #f3f0fd; }
        .s2-svc-card:hover::after { transform: scaleX(1); }

        .s2-svc-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: #ede9fe;
          border: 1px solid #ddd6fe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6d28d9;
        }
        .s2-svc-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #1a1033;
          margin: 0;
        }
        .s2-svc-desc {
          font-size: 0.8rem;
          color: #7b7a9a;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .s2-svc-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: #6d28d9;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s;
        }
        .s2-svc-link:hover { gap: 8px; }

        /* ── PROJECT CARDS ── */
        .s2-proj-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .s2-proj-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #ece8f8;
          background: #fff;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s, box-shadow 0.22s;
          box-shadow: 0 2px 12px rgba(109,40,217,0.05);
        }
        .s2-proj-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(109,40,217,0.14);
        }
        .s2-proj-visual {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          display: block;
          background: #0a0614;
        }
        .s2-proj-body {
          padding: 1rem 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .s2-proj-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .s2-proj-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1a1033;
          margin: 0;
        }
        .s2-proj-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #6d28d9;
          background: #ede9fe;
          border: 1px solid #ddd6fe;
          padding: 0.18rem 0.5rem;
          border-radius: 20px;
        }
        .s2-proj-desc {
          font-size: 0.77rem;
          color: #8b8aaa;
          margin: 0;
        }
        .s2-proj-link {
          font-size: 0.77rem;
          font-weight: 600;
          color: #6d28d9;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 0.3rem;
          transition: gap 0.2s;
        }
        .s2-proj-link:hover { gap: 8px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .s2-service-cards { grid-template-columns: repeat(2, 1fr); }
          .s2-proj-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .s2-block { grid-template-columns: 1fr; gap: 1.8rem; }
          .s2-service-cards { grid-template-columns: 1fr; }
          .s2-proj-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="s2-root">
        <canvas ref={canvasRef} className="s2-grid-canvas" />

        <div className="s2-wrap">

          {/* ── SERVICES ── */}
          <div className="s2-block">
            <div>
              <p className="s2-eyebrow">What We Do</p>
              <h2 className="s2-block-title">From idea to impactful product</h2>
              <p className="s2-block-desc">
                We partner with startups and businesses to design, build and
                scale digital products that users love.
              </p>
              <a href="#services" className="s2-more-link">View all services →</a>
            </div>

            <div className="s2-service-cards">
              {services.map((s) => (
                <div key={s.title} className="s2-svc-card">
                  <div className="s2-svc-icon">{s.icon}</div>
                  <p className="s2-svc-title">{s.title}</p>
                  <p className="s2-svc-desc">{s.desc}</p>
                  <a href="#" className="s2-svc-link">Learn more →</a>
                </div>
              ))}
            </div>
          </div>

          {/* ── PROJECTS ── */}
          <div className="s2-block">
            <div>
              <p className="s2-eyebrow">Featured Work</p>
              <h2 className="s2-block-title">Digital products we&apos;re proud of</h2>
              <p className="s2-block-desc">
                We help brands and startups launch digital experiences that
                drive real results.
              </p>
              <a href="#work" className="s2-more-link">View all projects →</a>
            </div>

            <div className="s2-proj-cards">
              {projects.map((p) => (
                <div key={p.title} className="s2-proj-card">
                  <div className="s2-proj-visual">{p.visual}</div>
                  <div className="s2-proj-body">
                    <div className="s2-proj-top">
                      <p className="s2-proj-title">{p.title}</p>
                      <span className="s2-proj-tag">{p.tag}</span>
                    </div>
                    <p className="s2-proj-desc">{p.desc}</p>
                    <a href="#" className="s2-proj-link">View case study →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}