"use client";

import { useEffect, useRef, useState } from "react";

const TYPEWRITER_PHRASES = [
    "Meaningful Impact.",
    "We Build Sites.",
    "Magnificent Work.",
    "Crafted For You.",
    "Scalable Products.",
    "Your Vision, Live.",
];

export default function SectionOne() {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const smoothMouse = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    // ── Typewriter state ──
    const [displayed, setDisplayed] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing forward
                setDisplayed(currentPhrase.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);

                if (charIndex + 1 === currentPhrase.length) {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setIsDeleting(true);
                    }, 1800);
                }
            } else {
                // Deleting
                setDisplayed(currentPhrase.slice(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);

                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
                }
            }
        }, isDeleting ? 42 : 72);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex, isPaused, displayed]);

    // ── Canvas grid ──
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
                ctx.strokeStyle = `rgba(109,40,217,${0.065 + maxT * 0.38})`;
                ctx.lineWidth = 0.5 + maxT * 0.8;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }

            for (let r = 0; r <= rows; r++) {
                const y = r * CELL;
                let maxT = 0;
                for (let c = 0; c <= cols; c++) {
                    const dist = Math.hypot(c * CELL - mx, y - my);
                    maxT = Math.max(maxT, Math.max(0, 1 - dist / GLOW_R));
                }
                ctx.strokeStyle = `rgba(109,40,217,${0.065 + maxT * 0.38})`;
                ctx.lineWidth = 0.5 + maxT * 0.8;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }

            for (let c = 0; c <= cols; c++) {
                for (let r = 0; r <= rows; r++) {
                    const x = c * CELL;
                    const y = r * CELL;
                    const dist = Math.hypot(x - mx, y - my);
                    const t = Math.max(0, 1 - dist / (GLOW_R * 0.65));
                    if (t > 0.04) {
                        ctx.beginPath();
                        ctx.arc(x, y, 1.2 + t * 2.4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(139,92,246,${t * 0.72})`;
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

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${smoothMouse.current.x}px, ${smoothMouse.current.y}px)`;
            }

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

    return (
        <>
            {/* ── CURSOR FOLLOWER ── */}
            <div className="cursor-follower" ref={cursorRef} />

            <div className="page-root">

                {/* ── GRID CANVAS ── */}
                <canvas className="grid-canvas" ref={canvasRef} />

                {/* ── AMBIENT ORBS ── */}
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                {/* ── HERO ── */}
                <section className="hero-section">
                    <div className="hero-container">

                        {/* Left */}
                        <div className="hero-left">
                            <div className="hero-badge">
                                <span className="badge-dot" />
                                We build digital experiences that scale
                            </div>

                            <h1 className="hero-heading">
                                Elegant Code.<br />
                                <span className="hero-heading-accent">
                                    {displayed}
                                    <span className="typewriter-cursor" />
                                </span>
                            </h1>

                            <p className="hero-subtext">
                                Velvet Code Co. is a design-driven development studio
                                crafting fast, scalable and beautiful web experiences.
                            </p>

                            <div className="hero-cta-group">
                                <a href="#" className="btn-primary">Explore Our Work →</a>
                                <a href="#" className="btn-secondary">Let&apos;s Talk</a>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="hero-right">
                            <div className="hero-logo-wrap">
                                <img
                                    src="/asset/logo_one.png"
                                    alt="Brand Logo"
                                    className="hero-logo-img"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Trusted bar */}
                    <div className="trusted-bar">
                        <span className="trusted-label">Trusted by innovative teams</span>
                        <img src="/asset/logo_two.png" alt="Trusted Partner" className="trusted-logo" />
                    </div>
                </section>
            </div>

            <style>{`
                *, *::before, *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    cursor: none;
                    background: #faf8ff;
                }

                /* ── PAGE ROOT ── */
                .page-root {
                    position: relative;
                    min-height: 100vh;
                    background: #faf8ff;
                    overflow: hidden;
                    cursor: none;
                }

                /* ── GRID CANVAS ── */
                .grid-canvas {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    width: 100%;
                    height: 100%;
                }

                /* ── AMBIENT ORBS ── */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    filter: blur(90px);
                }

                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(139,92,246,0.22), transparent 65%);
                    top: -140px;
                    right: -120px;
                    animation: drift1 9s ease-in-out infinite alternate;
                }

                .orb-2 {
                    width: 480px;
                    height: 480px;
                    background: radial-gradient(circle, rgba(192,168,255,0.16), transparent 65%);
                    bottom: -100px;
                    left: -80px;
                    animation: drift2 11s ease-in-out infinite alternate;
                }

                .orb-3 {
                    width: 320px;
                    height: 320px;
                    background: radial-gradient(circle, rgba(220,210,255,0.14), transparent 65%);
                    top: 38%;
                    left: 42%;
                    animation: drift3 7s ease-in-out infinite alternate;
                }

                @keyframes drift1 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-60px, 80px) scale(1.14); }
                }
                @keyframes drift2 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(70px, -55px) scale(1.1); }
                }
                @keyframes drift3 {
                    0%   { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-50px, -65px) scale(1.2); }
                }

                /* ── CURSOR FOLLOWER ── */
                .cursor-follower {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 380px;
                    height: 380px;
                    margin-left: -190px;
                    margin-top: -190px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    background: radial-gradient(circle, rgba(210,190,255,0.2) 0%, rgba(160,120,255,0.08) 45%, transparent 70%);
                    filter: blur(6px);
                    mix-blend-mode: screen;
                    will-change: transform;
                }

                /* ── HERO ── */
                .hero-section {
                    position: relative;
                    z-index: 2;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .hero-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 80px 80px 40px;
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    gap: 40px;
                }

                /* ── LEFT ── */
                .hero-left {
                    flex: 0 0 480px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.88);
                    border: 1px solid #e5e0f5;
                    border-radius: 999px;
                    padding: 6px 14px;
                    font-size: 13px;
                    color: #4b4b6b;
                    width: fit-content;
                    backdrop-filter: blur(8px);
                    box-shadow: 0 1px 8px rgba(109,40,217,0.07);
                }

                .badge-dot {
                    width: 7px;
                    height: 7px;
                    background: #7c3aed;
                    border-radius: 50%;
                    flex-shrink: 0;
                    animation: badgePulse 2.4s ease-in-out infinite;
                }

                @keyframes badgePulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.45; transform: scale(0.7); }
                }

                .hero-heading {
                    font-size: clamp(34px, 4vw, 58px);
                    font-weight: 800;
                    line-height: 1.1;
                    color: #1a1033;
                    letter-spacing: -1.5px;
                    /* Reserve height so layout doesn't jump as text changes */
                    min-height: 2.4em;
                }

                /* ── TYPEWRITER ACCENT ── */
                .hero-heading-accent {
                    color: #6d28d9;
                    display: inline-block;
                    min-width: 2ch;
                }

                .typewriter-cursor {
                    display: inline-block;
                    width: 3px;
                    height: 0.85em;
                    background: #6d28d9;
                    margin-left: 3px;
                    vertical-align: middle;
                    border-radius: 2px;
                    animation: cursorBlink 0.75s step-end infinite;
                }

                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }

                .hero-subtext {
                    font-size: 16px;
                    line-height: 1.75;
                    color: #6b7280;
                    max-width: 400px;
                }

                .hero-cta-group {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    flex-wrap: wrap;
                }

                .btn-primary {
                    background: #6d28d9;
                    color: #fff;
                    padding: 13px 28px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: background 0.2s, transform 0.15s;
                }
                .btn-primary:hover {
                    background: #5b21b6;
                    transform: translateY(-2px);
                }

                .btn-secondary {
                    background: rgba(255,255,255,0.88);
                    color: #1a1033;
                    padding: 13px 28px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #e5e0f5;
                    backdrop-filter: blur(8px);
                    transition: border-color 0.2s, transform 0.15s;
                }
                .btn-secondary:hover {
                    border-color: #7c3aed;
                    transform: translateY(-2px);
                }

                /* ── RIGHT — BIG CLEAN LOGO ── */
                .hero-right {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-logo-wrap {
                    width: clamp(360px, 44vw, 600px);
                    height: clamp(360px, 44vw, 600px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: floatLogo 5s ease-in-out infinite;
                }

                @keyframes floatLogo {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-14px); }
                }

                .hero-logo-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                /* ── TRUSTED BAR ── */
                .trusted-bar {
                    border-top: 1px solid rgba(237,233,248,0.85);
                    padding: 20px 80px;
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 32px;
                }

                .trusted-label {
                    font-size: 13px;
                    color: #9ca3af;
                    white-space: nowrap;
                    font-weight: 500;
                }

                .trusted-logo {
                    height: 30px;
                    width: auto;
                    object-fit: contain;
                    opacity: 0.5;
                    filter: grayscale(30%);
                    transition: opacity 0.2s, filter 0.2s;
                }
                .trusted-logo:hover {
                    opacity: 1;
                    filter: none;
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 960px) {
                    .hero-container {
                        flex-direction: column-reverse;
                        padding: 50px 32px 30px;
                        gap: 30px;
                        text-align: center;
                    }
                    .hero-left {
                        flex: unset;
                        align-items: center;
                        max-width: 100%;
                    }
                    .hero-subtext { max-width: 100%; }
                    .hero-logo-wrap {
                        width: clamp(240px, 62vw, 360px);
                        height: clamp(240px, 62vw, 360px);
                    }
                    .trusted-bar { padding: 16px 32px; flex-wrap: wrap; gap: 16px; }
                }

                @media (max-width: 480px) {
                    .hero-container { padding: 40px 20px 24px; }
                    .hero-logo-wrap { width: 230px; height: 230px; }
                    .hero-cta-group { flex-direction: column; width: 100%; }
                    .btn-primary,
                    .btn-secondary { width: 100%; justify-content: center; }
                    .trusted-bar { padding: 14px 20px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .orb-1, .orb-2, .orb-3,
                    .hero-logo-wrap,
                    .badge-dot,
                    .typewriter-cursor { animation: none; }
                }
            `}</style>
        </>
    );
}