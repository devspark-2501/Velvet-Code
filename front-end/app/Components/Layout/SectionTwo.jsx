export default function SectionTwo() {
  const services = [
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      title: "Web Development",
      desc: "Fast, accessible and scalable websites & web apps.",
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
        </svg>
      ),
      title: "Product Design",
      desc: "User-centered design that turns ideas into intuitive experiences.",
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
      title: "Mobile Development",
      desc: "Cross-platform mobile apps built for performance.",
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
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
      bg: "linear-gradient(135deg, #0f0a1e 0%, #1a0f3a 40%, #0d1f3c 100%)",
      accent: "#7c3aed",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%">
          <rect width="320" height="180" fill="url(#dashBg)"/>
          <defs>
            <linearGradient id="dashBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f0a1e"/>
              <stop offset="100%" stopColor="#1a1040"/>
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Grid */}
          {[40,80,120,160].map(y => <line key={y} x1="20" y1={y} x2="300" y2={y} stroke="#ffffff08" strokeWidth="1"/>)}
          {/* Area fill */}
          <path d="M20,140 L60,110 L100,120 L140,80 L180,90 L220,55 L260,70 L300,40 L300,160 L20,160 Z" fill="url(#lineGrad)" opacity="0.5"/>
          {/* Line */}
          <polyline points="20,140 60,110 100,120 140,80 180,90 220,55 260,70 300,40" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Dots */}
          {[[20,140],[60,110],[100,120],[140,80],[180,90],[220,55],[260,70],[300,40]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#7c3aed" stroke="#1a1040" strokeWidth="2"/>
          ))}
          {/* Mini bars */}
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={30 + i*18} y={145 - i*8 - 10} width="10" height={i*8+10} rx="2" fill="#4c1d95" opacity="0.7"/>
          ))}
          {/* Labels */}
          <text x="20" y="175" fill="#ffffff30" fontSize="8" fontFamily="monospace">JAN</text>
          <text x="120" y="175" fill="#ffffff30" fontSize="8" fontFamily="monospace">APR</text>
          <text x="220" y="175" fill="#ffffff30" fontSize="8" fontFamily="monospace">AUG</text>
          {/* Pill */}
          <rect x="210" y="12" width="80" height="20" rx="10" fill="#7c3aed22" stroke="#7c3aed44" strokeWidth="1"/>
          <text x="250" y="25" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">↑ 24.5%</text>
        </svg>
      ),
    },
    {
      title: "Northwind Marketing",
      tag: "Marketing",
      desc: "Modern marketing site with CMS",
      bg: "linear-gradient(135deg, #0a0a14 0%, #0f1a2e 100%)",
      accent: "#6366f1",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%">
          <rect width="320" height="180" fill="#0a0a18"/>
          <defs>
            <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          {/* Browser chrome */}
          <rect x="10" y="10" width="300" height="160" rx="6" fill="#12121e" stroke="#ffffff10" strokeWidth="1"/>
          <rect x="10" y="10" width="300" height="24" rx="6" fill="#1a1a2e"/>
          <circle cx="24" cy="22" r="4" fill="#ff5f5780"/>
          <circle cx="38" cy="22" r="4" fill="#ffbd2e80"/>
          <circle cx="52" cy="22" r="4" fill="#28ca4180"/>
          <rect x="70" y="16" width="180" height="12" rx="6" fill="#ffffff08"/>
          {/* Page hero */}
          <rect x="20" y="42" width="280" height="60" rx="4" fill="url(#heroGrad)"/>
          <rect x="32" y="54" width="120" height="10" rx="3" fill="#ffffff20"/>
          <rect x="32" y="70" width="80" height="7" rx="3" fill="#ffffff10"/>
          <rect x="32" y="84" width="50" height="14" rx="4" fill="#6366f1"/>
          {/* Cards row */}
          {[0,1,2].map(i => (
            <rect key={i} x={20 + i*96} y={112} width="86" height="48" rx="4" fill="#1e1e32" stroke="#ffffff08" strokeWidth="1"/>
          ))}
          <rect x="28" y="120" width="40" height="6" rx="2" fill="#6366f180"/>
          <rect x="28" y="130" width="60" height="4" rx="2" fill="#ffffff15"/>
          <rect x="28" y="138" width="50" height="4" rx="2" fill="#ffffff10"/>
        </svg>
      ),
    },
    {
      title: "Aurum Mobile",
      tag: "Fintech",
      desc: "Mobile banking app built for speed",
      bg: "linear-gradient(135deg, #050510 0%, #0f0a20 100%)",
      accent: "#8b5cf6",
      visual: (
        <svg viewBox="0 0 320 180" width="100%" height="100%">
          <rect width="320" height="180" fill="#07070f"/>
          {/* Phone 1 - back */}
          <rect x="160" y="15" width="90" height="155" rx="12" fill="#111128" stroke="#ffffff10" strokeWidth="1" transform="rotate(6 205 90)"/>
          {/* Phone 2 - front */}
          <rect x="80" y="10" width="100" height="165" rx="14" fill="#16162a" stroke="#8b5cf6" strokeWidth="1.5"/>
          {/* Notch */}
          <rect x="115" y="14" width="30" height="8" rx="4" fill="#0d0d1e"/>
          {/* Screen content */}
          <rect x="88" y="30" width="84" height="20" rx="4" fill="#1e1e40"/>
          <text x="130" y="44" fill="#8b5cf6" fontSize="9" fontFamily="monospace" textAnchor="middle">$24,850</text>
          <rect x="88" y="55" width="84" height="6" rx="2" fill="#ffffff10"/>
          {/* Mini chart */}
          <polyline points="90,100 105,88 120,93 135,78 150,85 165,70" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M90,100 L105,88 L120,93 L135,78 L150,85 L165,70 L165,110 L90,110 Z" fill="#8b5cf620"/>
          {/* Transactions */}
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x="88" y={118 + i * 14} width="84" height="11" rx="3" fill="#1e1e38"/>
              <rect x="92" y={120 + i * 14} width="20" height="7" rx="2" fill="#4c1d9540"/>
              <rect x="116" y={121 + i * 14} width="30" height="5" rx="2" fill="#ffffff15"/>
              <rect x="152" y={121 + i * 14} width="16" height="5" rx="2" fill={i===0?"#34d39930":"#ef444430"}/>
            </g>
          ))}
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .s2-section {
          background: #05030f;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem);
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        /* ── SERVICES BLOCK ── */
        .s2-services-grid {
          max-width: 1280px;
          margin: 0 auto 6rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          align-items: start;
        }
        .s2-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #6d28d9;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .s2-label::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 12px;
          background: #6d28d9;
          border-radius: 2px;
        }
        .s2-left-title {
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #eeeaff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }
        .s2-left-desc {
          font-size: 0.92rem;
          color: #6b6890;
          line-height: 1.7;
          margin: 0 0 1.5rem;
        }
        .s2-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #7c3aed;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .s2-link:hover { gap: 0.7rem; }

        .s2-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #ffffff08;
          border: 1px solid #ffffff08;
          border-radius: 16px;
          overflow: hidden;
        }
        .s2-card {
          background: #08060f;
          padding: 1.8rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          transition: background 0.2s;
          position: relative;
        }
        .s2-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 1.5rem; right: 1.5rem;
          height: 2px;
          background: #7c3aed;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 2px;
        }
        .s2-card:hover { background: #0d0a18; }
        .s2-card:hover::after { transform: scaleX(1); }

        .s2-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: #12103a;
          border: 1px solid #2a1f6e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }
        .s2-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #e4e0ff;
          margin: 0;
        }
        .s2-card-desc {
          font-size: 0.82rem;
          color: #6b6890;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .s2-card-link {
          font-size: 0.8rem;
          font-weight: 600;
          color: #7c3aed;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.2s;
        }
        .s2-card-link:hover { gap: 0.55rem; }

        /* ── PROJECTS BLOCK ── */
        .s2-projects-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          align-items: start;
        }
        .s2-proj-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .s2-proj-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #ffffff0a;
          background: #08060f;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .s2-proj-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(109,40,217,0.2);
        }
        .s2-proj-visual {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          display: block;
        }
        .s2-proj-body {
          padding: 1.1rem 1.2rem 1.3rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .s2-proj-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .s2-proj-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ddd8ff;
          margin: 0;
        }
        .s2-proj-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #8b5cf6;
          background: #1e1040;
          border: 1px solid #3b1f8c;
          padding: 0.2rem 0.55rem;
          border-radius: 20px;
        }
        .s2-proj-desc {
          font-size: 0.78rem;
          color: #5a5778;
          margin: 0;
        }
        .s2-proj-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: #7c3aed;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.4rem;
          transition: gap 0.2s;
        }
        .s2-proj-link:hover { gap: 0.55rem; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .s2-cards { grid-template-columns: repeat(2, 1fr); }
          .s2-proj-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .s2-services-grid, .s2-projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .s2-cards { grid-template-columns: 1fr; }
          .s2-proj-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="s2-section">

        {/* ── SERVICES ── */}
        <div className="s2-services-grid">
          <div>
            <p className="s2-label">What We Do</p>
            <h2 className="s2-left-title">From idea to impactful product</h2>
            <p className="s2-left-desc">
              We partner with startups and businesses to design, build and scale
              digital products that users love.
            </p>
            <a href="#services" className="s2-link">View all services →</a>
          </div>

          <div className="s2-cards">
            {services.map((s) => (
              <div key={s.title} className="s2-card">
                <div className="s2-icon">{s.icon}</div>
                <p className="s2-card-title">{s.title}</p>
                <p className="s2-card-desc">{s.desc}</p>
                <a href="#" className="s2-card-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <div className="s2-projects-grid">
          <div>
            <p className="s2-label">Featured Work</p>
            <h2 className="s2-left-title">Digital products we're proud of</h2>
            <p className="s2-left-desc">
              We help brands and startups launch digital experiences that drive real results.
            </p>
            <a href="#work" className="s2-link">View all projects →</a>
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

      </section>
    </>
  );
}