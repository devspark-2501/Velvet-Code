"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home" },
  { label: "Services" },
  { label: "Work" },
  { label: "About" },
  { label: "Blog" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .navbar-wrapper {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 1100px;
          z-index: 1000;
          animation: slideDown 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-24px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 16px;
          height: 60px;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: rgba(255, 255, 255, 0.90);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 999px;
          border: 1px solid rgba(107, 47, 217, 0.12);
          box-shadow: 0 4px 24px rgba(107,47,217,0.10), 0 1px 4px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          box-shadow: 0 8px 40px rgba(107,47,217,0.16), 0 2px 8px rgba(0,0,0,0.08);
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
          animation: fadeInLeft 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .logo img {
          height: 32px;
          width: auto;
          display: block;
        }
        .logo-text {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.3px;
          white-space: nowrap;
        }
        .logo-text span { font-weight: 400; }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Desktop Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links li {
          animation: fadeInDown 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nav-links li:nth-child(1) { animation-delay: 0.15s; }
        .nav-links li:nth-child(2) { animation-delay: 0.20s; }
        .nav-links li:nth-child(3) { animation-delay: 0.25s; }
        .nav-links li:nth-child(4) { animation-delay: 0.30s; }
        .nav-links li:nth-child(5) { animation-delay: 0.35s; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          position: relative;
          display: inline-block;
          padding: 6px 14px;
          font-size: 14.5px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          border-radius: 999px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: #6B2FD9;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nav-link:hover {
          color: #6B2FD9;
          background: rgba(107,47,217,0.06);
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active {
          color: #6B2FD9;
          font-weight: 600;
          background: rgba(107,47,217,0.07);
        }
        .nav-link.active::after { transform: scaleX(1); }

        /* CTA */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #6B2FD9;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          padding: 9px 20px;
          border-radius: 999px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          animation: fadeInRight 0.6s 0.4s cubic-bezier(0.16,1,0.3,1) both;
          white-space: nowrap;
        }
        .cta-btn:hover {
          background: #5a25b8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(107,47,217,0.38);
        }
        .cta-btn:active { transform: translateY(0); box-shadow: none; }
        .cta-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cta-btn:hover .cta-arrow { transform: translateX(4px); }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .hamburger:hover { background: rgba(107,47,217,0.08); }
        .hamburger span {
          display: block;
          height: 2px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s, width 0.3s;
          transform-origin: center;
        }
        .hamburger span:nth-child(2) { width: 70%; margin-left: auto; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile dropdown */
        .mobile-menu {
          margin-top: 8px;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(107,47,217,0.10);
          box-shadow: 0 8px 32px rgba(107,47,217,0.13);
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        }
        .mobile-menu.open {
          max-height: 380px;
          opacity: 1;
        }
        .mobile-menu-inner {
          display: flex;
          flex-direction: column;
          padding: 12px 12px 16px;
          gap: 2px;
        }
        .mobile-link {
          display: block;
          padding: 11px 16px;
          font-size: 15px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          border-radius: 12px;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(107,47,217,0.08);
          color: #6B2FD9;
          transform: translateX(4px);
        }
        .mobile-link.active { font-weight: 600; }
        .mobile-cta {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6B2FD9;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 13px;
          border-radius: 14px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .mobile-cta:hover { background: #5a25b8; }

        @media (max-width: 768px) {
          .navbar-wrapper { width: calc(100% - 32px); top: 12px; }
          .nav-links, .cta-btn { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 480px) {
          .navbar-wrapper { width: calc(100% - 24px); top: 10px; }
          .logo-text { font-size: 15px; }
        }
      `}</style>

      <div className="navbar-wrapper">
        {/* Pill Navbar */}
        <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
          {/* Logo */}
          <a href="#" className="logo">
            <img src="/asset/logo_one.png" alt="Velvet Code Co." />
            <span className="logo-text">
              <span>Velvet</span> Code Co.
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label }) => (
              <li key={label}>
                <a
                  href="#"
                  className={`nav-link${activeLink === label ? " active" : ""}`}
                  onClick={e => { e.preventDefault(); setActiveLink(label); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#" className="cta-btn">
            Let's Talk
            <span className="cta-arrow">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          {/* Hamburger (mobile) */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile dropdown (inside wrapper so it inherits centering) */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <div className="mobile-menu-inner">
            {NAV_LINKS.map(({ label }) => (
              <a
                key={label}
                href="#"
                className={`mobile-link${activeLink === label ? " active" : ""}`}
                onClick={e => { e.preventDefault(); setActiveLink(label); setMenuOpen(false); }}
              >
                {label}
              </a>
            ))}
            <a href="#" className="mobile-cta">
              Let's Talk
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}