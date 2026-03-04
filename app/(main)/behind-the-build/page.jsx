'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function BehindTheBuild() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const progressRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Custom cursor
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    // Progress bar
    const handleScroll = () => {
      if (progressRef.current) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressRef.current.style.width = pct + '%';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animateRing();

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Cursor hover effects
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '10px';
        cursorRef.current.style.height = '10px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
      }
    };

    const interactiveElements = document.querySelectorAll('a, button, .faq-q, .feat-card, .tech-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const toggleFaq = (e) => {
    const item = e.currentTarget.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          overflow-x: hidden;
        }

        :root {
          --bg: #03050a;
          --ink: #f0ede8;
          --muted: #5c6070;
          --subtle: #10141f;
          --border: rgba(240,237,232,0.07);
          --gold: #d4a853;
          --gold-dim: rgba(212,168,83,0.15);
          --teal: #3ecfb2;
          --teal-dim: rgba(62,207,178,0.12);
          --rose: #e05c6a;
          --rose-dim: rgba(224,92,106,0.12);
          --blue: #4a8fe8;
          --blue-dim: rgba(74,143,232,0.12);
        }

        .cursor {
          position: fixed;
          width: 10px; height: 10px;
          background: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%,-50%);
          transition: transform 0.1s, width 0.3s, height 0.3s;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          width: 36px; height: 36px;
          border: 1px solid rgba(212,168,83,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%,-50%);
          transition: transform 0.15s ease;
        }

        body::after {
          content:'';
          position: fixed; inset:0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1000;
          opacity: 0.6;
        }

        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--teal));
          z-index: 600;
          transition: width 0.1s;
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 20px 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(3,5,10,0.95), transparent);
          backdrop-filter: blur(12px);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-back {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          transition: color 0.2s;
        }
        .nav-back:hover {
          color: var(--gold);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }
        .nav-logo span { color: var(--gold); }
        .nav-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid rgba(212,168,83,0.3);
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(212,168,83,0.06);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 6vw 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 22vw, 280px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,237,232,0.03);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -8px;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .glow-gold { width:600px; height:600px; background: rgba(212,168,83,0.07); top:-200px; right:-100px; }
        .glow-teal { width:400px; height:400px; background: rgba(62,207,178,0.06); bottom:-100px; left:-50px; }

        .hero-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
          animation: rise 0.8s ease 0.1s forwards;
        }
        .hero-eyebrow::before {
          content: '';
          width: 32px; height: 1px;
          background: var(--gold);
        }

        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 9vw, 120px);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -3px;
          position: relative;
          z-index: 2;
          opacity: 0;
          animation: rise 0.9s ease 0.2s forwards;
        }
        .hero-h1 .italic { font-style: italic; color: var(--gold); }
        .hero-h1 .outline {
          -webkit-text-stroke: 1.5px var(--ink);
          color: transparent;
        }

        .hero-sub {
          max-width: 520px;
          font-size: 16px;
          line-height: 1.75;
          color: var(--muted);
          margin-top: 28px;
          font-weight: 300;
          opacity: 0;
          animation: rise 0.9s ease 0.35s forwards;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 48px;
          flex-wrap: wrap;
          opacity: 0;
          animation: rise 0.9s ease 0.45s forwards;
        }

        .btn-primary {
          background: var(--gold);
          color: #0a0800;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 14px 32px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212,168,83,0.3);
        }
        .btn-ghost {
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: var(--ink); }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0;
          animation: rise 1s ease 0.8s forwards;
        }
        .scroll-bar {
          width: 48px; height: 1px;
          background: var(--muted);
          position: relative;
          overflow: hidden;
        }
        .scroll-bar::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: var(--gold);
          animation: slideBar 2s ease-in-out infinite;
        }
        @keyframes slideBar { 0%{left:-100%} 100%{left:100%} }

        .stats-strip {
          display: flex;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .stat-cell {
          flex: 1;
          padding: 36px 6vw;
          border-right: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-cell:hover { background: var(--subtle); }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 900;
          color: var(--ink);
          line-height: 1;
        }
        .stat-num span { color: var(--gold); }
        .stat-label {
          font-size: 12px;
          color: var(--muted);
          margin-top: 6px;
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        section { padding: 100px 6vw; position: relative; }

        .sec-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sec-label::before { content: '//'; opacity: 0.5; }

        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -2px;
        }
        .sec-title em { font-style: italic; color: var(--gold); }

        .features-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          margin-bottom: 80px;
        }
        @media(max-width:768px){ .features-intro { grid-template-columns: 1fr; gap: 32px; } }

        .features-intro-text { max-width: 480px; }
        .features-intro-text p {
          font-size: 15px;
          line-height: 1.85;
          color: var(--muted);
          margin-top: 24px;
          font-weight: 300;
        }

        .features-intro-quote {
          border-left: 2px solid var(--gold);
          padding: 24px 28px;
          background: var(--gold-dim);
          border-radius: 0 8px 8px 0;
        }
        .features-intro-quote blockquote {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-style: italic;
          line-height: 1.6;
          color: var(--ink);
        }
        .features-intro-quote cite {
          display: block;
          margin-top: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          font-style: normal;
        }

        .feature-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        @media(max-width:900px){ .feature-cards { grid-template-columns: 1fr; } }

        .feat-card {
          background: var(--subtle);
          padding: 44px 36px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
          border: 1px solid var(--border);
        }
        .feat-card:hover { background: #13171f; }
        .feat-card:hover .feat-num { opacity: 1; }

        .feat-num {
          position: absolute;
          top: 24px; right: 28px;
          font-family: 'Playfair Display', serif;
          font-size: 80px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,237,232,0.05);
          line-height: 1;
          opacity: 0.5;
          transition: opacity 0.3s;
        }

        .feat-icon {
          width: 48px; height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 24px;
        }

        .feat-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .feat-desc {
          font-size: 13px;
          line-height: 1.8;
          color: var(--muted);
          font-weight: 300;
        }

        .feat-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 20px;
        }
        .feat-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid;
        }

        .tech-section { background: var(--subtle); }

        .tech-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 80px;
          align-items: start;
          margin-top: 60px;
        }
        @media(max-width:900px){ .tech-layout { grid-template-columns: 1fr; gap:40px; } }

        .tech-sidebar p {
          font-size: 14px;
          line-height: 1.85;
          color: var(--muted);
          font-weight: 300;
          margin-top: 20px;
        }

        .tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media(max-width:600px){ .tech-grid { grid-template-columns: 1fr; } }

        .tech-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 22px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: border-color 0.2s, transform 0.2s;
        }
        .tech-card:hover { border-color: rgba(212,168,83,0.3); transform: translateY(-2px); }

        .tech-icon-box {
          width: 40px; height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .tech-info { flex: 1; }
        .tech-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .tech-role { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .tech-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 2px;
          display: inline-block;
          margin-top: 8px;
        }

        .arch-diagram {
          margin-top: 60px;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 40px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .arch-diagram::before {
          content:'';
          position:absolute;
          top:-80px; right:-80px;
          width:300px; height:300px;
          background: radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%);
        }
        .arch-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .arch-flow {
          display: flex;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
          justify-content: center;
        }
        .arch-node {
          background: var(--subtle);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 14px 20px;
          text-align: center;
          flex-shrink: 0;
          min-width: 110px;
          transition: border-color 0.2s;
        }
        .arch-node:hover { border-color: rgba(212,168,83,0.4); }
        .arch-node-icon { font-size: 20px; margin-bottom: 6px; }
        .arch-node-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--ink);
          font-weight: 500;
        }
        .arch-node-sub { font-size: 9px; color: var(--muted); margin-top: 2px; }
        .arch-arrow {
          color: var(--gold);
          font-size: 16px;
          padding: 0 8px;
          opacity: 0.5;
        }

        .build-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 60px;
        }
        @media(max-width:768px){ .build-grid { grid-template-columns: 1fr; } }

        .build-cell {
          padding: 44px 40px;
          border: 1px solid var(--border);
          background: var(--subtle);
          position: relative;
          transition: background 0.3s;
        }
        .build-cell:hover { background: #13171f; }
        .build-cell.highlight {
          background: var(--gold-dim);
          border-color: rgba(212,168,83,0.2);
        }
        .build-step {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
        }
        .build-cell-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 14px;
          line-height: 1.2;
        }
        .build-cell-desc {
          font-size: 13px;
          line-height: 1.8;
          color: var(--muted);
          font-weight: 300;
        }

        .code-snippet {
          margin-top: 20px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
          padding: 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--teal);
          line-height: 1.7;
          overflow-x: auto;
        }
        .code-snippet .comment { color: #3d4556; }
        .code-snippet .keyword { color: var(--gold); }
        .code-snippet .string { color: var(--rose); }

        .faq-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 80px;
          margin-top: 60px;
        }
        @media(max-width:900px){ .faq-layout { grid-template-columns: 1fr; gap: 40px; } }

        .faq-sidebar .sec-title { font-size: clamp(28px, 4vw, 48px); }
        .faq-sidebar p { font-size: 14px; color: var(--muted); line-height: 1.8; margin-top: 20px; font-weight: 300; }

        .faq-list { display: flex; flex-direction: column; gap: 2px; }

        .faq-item {
          border: 1px solid var(--border);
          background: var(--subtle);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .faq-item:hover { border-color: rgba(212,168,83,0.2); }
        .faq-item.open { border-color: rgba(212,168,83,0.3); background: var(--gold-dim); }

        .faq-q {
          padding: 20px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          user-select: none;
        }
        .faq-q-text {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: var(--ink);
        }
        .faq-toggle {
          flex-shrink: 0;
          width: 28px; height: 28px;
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--gold);
          line-height: 1;
          transition: transform 0.3s, background 0.2s;
          font-weight: 300;
        }
        .faq-item.open .faq-toggle { transform: rotate(45deg); background: var(--gold-dim); }

        .faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s;
          padding: 0 24px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.8;
          font-weight: 300;
        }
        .faq-item.open .faq-a { max-height: 300px; padding: 0 24px 20px; }

        .cta-strip {
          padding: 100px 6vw;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border);
        }
        .cta-strip::before {
          content:'';
          position:absolute;
          top:50%; left:50%;
          transform: translate(-50%, -50%);
          width: 700px; height:400px;
          background: radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 70%);
        }
        .cta-strip h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 7vw, 88px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -3px;
          position: relative;
        }
        .cta-strip h2 em { font-style: italic; color: var(--gold); }
        .cta-strip p {
          font-size: 15px;
          color: var(--muted);
          max-width: 460px;
          margin: 20px auto 0;
          font-weight: 300;
          line-height: 1.75;
          position: relative;
        }
        .cta-strip .btn-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 40px;
          flex-wrap: wrap;
          position: relative;
        }

        footer {
          padding: 40px 6vw;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 900;
        }
        .footer-logo span { color: var(--gold); }
        .footer-text { font-size: 12px; color: var(--muted); }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .h-line { height: 1px; background: var(--border); margin: 0; }

        .made-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(62,207,178,0.1);
          border: 1px solid rgba(62,207,178,0.3);
          color: var(--teal);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          margin-top: 28px;
        }
        .made-badge::before { content:'●'; font-size: 8px; animation: blink 1.5s ease infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        @keyframes rise {
          from { opacity:0; transform: translateY(24px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>

      {mounted && (
        <>
          <div className="cursor" ref={cursorRef}></div>
          <div className="cursor-ring" ref={ringRef}></div>
        </>
      )}
      <div className="progress-bar" ref={progressRef}></div>

      {/* NAV */}
      <nav>
        <div className="nav-left">
          <Link href="/dashboard" className="nav-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </Link>
          <div className="nav-logo">Path<span>Pilot</span></div>
        </div>
        <div className="nav-pill">Behind The Build</div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-glow glow-gold"></div>
        <div className="hero-glow glow-teal"></div>
        <div className="hero-bg-text">PATHPILOT</div>

        <div className="hero-eyebrow">The Story Behind PathPilot</div>

        <h1 className="hero-h1">
          <span className="outline">We Built</span><br />
          <span className="italic">Something</span><br />
          <span>Real.</span>
        </h1>

        <p className="hero-sub">
          PathPilot isn't just a side project — it's a full-stack AI career platform built from scratch. Here's every decision, every technology, and every feature that went into it.
        </p>

        <div className="hero-cta-row">
          <a href="#features" className="btn-primary">
            Explore The Build
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#faq" className="btn-ghost">
            Read the FAQs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-bar"></div>
          Scroll to explore
        </div>
      </div>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stat-cell reveal">
          <div className="stat-num">3<span>x</span></div>
          <div className="stat-label">AI-powered career tools in one platform</div>
        </div>
        <div className="stat-cell reveal">
          <div className="stat-num">1<span>00%</span></div>
          <div className="stat-label">Personalized to your industry & skills</div>
        </div>
        <div className="stat-cell reveal">
          <div className="stat-num">7<span>d</span></div>
          <div className="stat-label">Weekly AI-updated industry insights</div>
        </div>
        <div className="stat-cell reveal">
          <div className="stat-num">0<span>$</span></div>
          <div className="stat-label">Data sold to third parties. Ever.</div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="features-intro reveal">
          <div className="features-intro-text">
            <div className="sec-label">What We Built</div>
            <h2 className="sec-title">Three tools.<br /><em>One mission.</em></h2>
            <p>
              Most career tools do one thing. We built three deeply integrated, AI-powered products that work together — all learning from the same profile you create on day one.
            </p>
          </div>
          <div className="features-intro-quote reveal">
            <blockquote>"The platform that learns your career and grows with it — from first resume to dream job."</blockquote>
            <cite>PathPilot · Core Vision</cite>
          </div>
        </div>

        <div className="feature-cards">
          <div className="feat-card reveal">
            <div className="feat-num">01</div>
            <div className="feat-icon" style={{ background: 'var(--gold-dim)' }}>📄</div>
            <div className="feat-title">Intelligent Resume Builder</div>
            <div className="feat-desc">
              Not a template editor — an AI system that understands your experience and industry standards to generate ATS-optimized resumes that actually get noticed. Full markdown editor for complete control.
            </div>
            <div className="feat-tags">
              <span className="feat-tag" style={{ color: 'var(--gold)', borderColor: 'rgba(212,168,83,0.3)', background: 'var(--gold-dim)' }}>ATS Optimized</span>
              <span className="feat-tag" style={{ color: 'var(--gold)', borderColor: 'rgba(212,168,83,0.3)', background: 'var(--gold-dim)' }}>Markdown Editor</span>
              <span className="feat-tag" style={{ color: 'var(--gold)', borderColor: 'rgba(212,168,83,0.3)', background: 'var(--gold-dim)' }}>Industry-Tailored</span>
            </div>
          </div>

          <div className="feat-card reveal">
            <div className="feat-num">02</div>
            <div className="feat-icon" style={{ background: 'var(--teal-dim)' }}>✉️</div>
            <div className="feat-title">Cover Letter Generator</div>
            <div className="feat-desc">
              Paste a job description, get a cover letter that reads like you wrote it at your best. The AI adapts tone, highlights relevant skills, and aligns with the company's language — fully editable after generation.
            </div>
            <div className="feat-tags">
              <span className="feat-tag" style={{ color: 'var(--teal)', borderColor: 'rgba(62,207,178,0.3)', background: 'var(--teal-dim)' }}>Job-Description Aware</span>
              <span className="feat-tag" style={{ color: 'var(--teal)', borderColor: 'rgba(62,207,178,0.3)', background: 'var(--teal-dim)' }}>Tone-Adaptive</span>
              <span className="feat-tag" style={{ color: 'var(--teal)', borderColor: 'rgba(62,207,178,0.3)', background: 'var(--teal-dim)' }}>Fully Editable</span>
            </div>
          </div>

          <div className="feat-card reveal">
            <div className="feat-num">03</div>
            <div className="feat-icon" style={{ background: 'var(--rose-dim)' }}>🎯</div>
            <div className="feat-title">Adaptive Interview Prep</div>
            <div className="feat-desc">
              Practice real interview questions tailored to your role and industry. The AI tracks your answers across sessions, identifies weak spots, and generates targeted improvement tips. Your personal interview coach — available 24/7.
            </div>
            <div className="feat-tags">
              <span className="feat-tag" style={{ color: 'var(--rose)', borderColor: 'rgba(224,92,106,0.3)', background: 'var(--rose-dim)' }}>Performance Tracking</span>
              <span className="feat-tag" style={{ color: 'var(--rose)', borderColor: 'rgba(224,92,106,0.3)', background: 'var(--rose-dim)' }}>Role-Specific Q&A</span>
              <span className="feat-tag" style={{ color: 'var(--rose)', borderColor: 'rgba(224,92,106,0.3)', background: 'var(--rose-dim)' }}>AI Feedback Loop</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-line"></div>

      {/* TECH STACK */}
      <section className="tech-section" id="tech">
        <div className="sec-label reveal">How We Built It</div>
        <h2 className="sec-title reveal">The <em>Stack</em><br />Under the Hood</h2>

        <div className="tech-layout">
          <div className="tech-sidebar reveal">
            <p>
              Every technology choice was deliberate. We picked tools that are production-grade, developer-friendly, and fast enough to keep the experience seamless — because a career tool that lags is a career tool you close.
            </p>
            <p style={{ marginTop: '16px' }}>
              From Clerk's enterprise-grade authentication to AI-powered content generation — here's exactly what runs PathPilot.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'var(--gold-dim)' }}>🔐</div>
              <div className="tech-info">
                <div className="tech-name">Clerk</div>
                <div className="tech-role">Authentication & User Management. Secure sign-in, session handling, and profile management — zero compromise on security.</div>
                <span className="tech-badge" style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid rgba(212,168,83,0.3)' }}>Auth Layer</span>
              </div>
            </div>

            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'rgba(0,0,0,0.3)' }}>▲</div>
              <div className="tech-info">
                <div className="tech-name">Next.js</div>
                <div className="tech-role">Full-stack React framework. Server-side rendering, API routes, and App Router for a fast, SEO-optimized experience.</div>
                <span className="tech-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--ink)', border: '1px solid var(--border)' }}>Frontend + Backend</span>
              </div>
            </div>

            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'var(--teal-dim)' }}>🤖</div>
              <div className="tech-info">
                <div className="tech-name">Gemini AI</div>
                <div className="tech-role">Powers resume generation, cover letter writing, interview question creation, and feedback analysis with Google's latest model.</div>
                <span className="tech-badge" style={{ background: 'var(--teal-dim)', color: 'var(--teal)', border: '1px solid rgba(62,207,178,0.3)' }}>AI Engine</span>
              </div>
            </div>

            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'var(--blue-dim)' }}>🗄️</div>
              <div className="tech-info">
                <div className="tech-name">Prisma + Supabase</div>
                <div className="tech-role">Type-safe ORM with a PostgreSQL database. Stores user profiles, generated content, and interview progress.</div>
                <span className="tech-badge" style={{ background: 'var(--blue-dim)', color: 'var(--blue)', border: '1px solid rgba(74,143,232,0.3)' }}>Database</span>
              </div>
            </div>

            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'var(--rose-dim)' }}>⚡</div>
              <div className="tech-info">
                <div className="tech-name">Inngest</div>
                <div className="tech-role">Background job processing for weekly AI industry insight updates — runs without blocking the main app.</div>
                <span className="tech-badge" style={{ background: 'var(--rose-dim)', color: 'var(--rose)', border: '1px solid rgba(224,92,106,0.3)' }}>Background Jobs</span>
              </div>
            </div>

            <div className="tech-card reveal">
              <div className="tech-icon-box" style={{ background: 'var(--gold-dim)' }}>🎨</div>
              <div className="tech-info">
                <div className="tech-name">Tailwind + shadcn/ui</div>
                <div className="tech-role">Utility-first styling with a polished component library for a consistent, accessible, and beautiful UI.</div>
                <span className="tech-badge" style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid rgba(212,168,83,0.3)' }}>Styling</span>
              </div>
            </div>
          </div>
        </div>

        {/* ARCH DIAGRAM */}
        <div className="arch-diagram reveal">
          <div className="arch-title">// System Architecture Flow</div>
          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-icon">👤</div>
              <div className="arch-node-name">User</div>
              <div className="arch-node-sub">Browser</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node" style={{ borderColor: 'rgba(212,168,83,0.3)' }}>
              <div className="arch-node-icon">🔐</div>
              <div className="arch-node-name">Clerk Auth</div>
              <div className="arch-node-sub">Session + JWT</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <div className="arch-node-icon">▲</div>
              <div className="arch-node-name">Next.js App</div>
              <div className="arch-node-sub">SSR + API Routes</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node" style={{ borderColor: 'rgba(62,207,178,0.3)' }}>
              <div className="arch-node-icon">🤖</div>
              <div className="arch-node-name">Gemini AI</div>
              <div className="arch-node-sub">Content Gen</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node" style={{ borderColor: 'rgba(74,143,232,0.3)' }}>
              <div className="arch-node-icon">🗄️</div>
              <div className="arch-node-name">Supabase</div>
              <div className="arch-node-sub">Prisma ORM</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: 'var(--muted)' }}>
              + Inngest handles weekly background jobs for industry insight updates
            </span>
          </div>
        </div>
      </section>

      <div className="h-line"></div>

      {/* HOW WE BUILT IT */}
      <section id="how">
        <div className="sec-label reveal">Development Journey</div>
        <h2 className="sec-title reveal">How We Actually<br /><em>Built This.</em></h2>

        <div className="build-grid">
          <div className="build-cell highlight reveal">
            <div className="build-step">Step 01 · Foundation</div>
            <div className="build-cell-title">Auth & Onboarding First</div>
            <div className="build-cell-desc">We started with Clerk authentication and built a detailed onboarding flow that collects your industry, experience level, and skills. This profile data is the backbone of every AI generation in the app.</div>
            <div className="code-snippet">
              <span className="comment">{'//'} Clerk middleware in Next.js</span><br />
              <span className="keyword">{'export default'}</span> authMiddleware({'{'}<br />
              &nbsp;&nbsp;publicRoutes: [<span className="string">{"/"}</span>, <span className="string">{"/sign-in"}</span>],<br />
              &nbsp;&nbsp;ignoredRoutes: [<span className="string">{"/api/webhooks"}</span>]<br />
              {'}'});
            </div>
          </div>

          <div className="build-cell reveal">
            <div className="build-step">Step 02 · AI Layer</div>
            <div className="build-cell-title">Wiring Gemini to User Context</div>
            <div className="build-cell-desc">Every AI generation call passes the user's full profile context — not just the prompt. This is why PathPilot's output is genuinely personalized and not generic boilerplate. Industry + skills + experience go into every request.</div>
            <div className="code-snippet">
              <span className="comment">{'//'} Contextualized AI prompt</span><br />
              <span className="keyword">{'const'}</span> prompt = {`You are a career expert<br />
              &nbsp;for ${'{'}{'{'}user.industry{'}'}{'}'}.<br />
              &nbsp;Generate for: ${'{'}{'{'}user.skills{'}'}{'}'}`};
            </div>
          </div>

          <div className="build-cell reveal">
            <div className="build-step">Step 03 · Database Design</div>
            <div className="build-cell-title">Prisma Schema for Career Data</div>
            <div className="build-cell-desc">We designed a Prisma schema that links users to their resumes, cover letters, and interview sessions. Supabase's PostgreSQL handles concurrent users with zero cold start issues at the query layer.</div>
          </div>

          <div className="build-cell highlight reveal">
            <div className="build-step">Step 04 · Background Intelligence</div>
            <div className="build-cell-title">Weekly Industry Insights via Inngest</div>
            <div className="build-cell-desc">Inngest triggers a weekly background function that uses AI to analyze current market trends — salary data, in-demand skills, growth patterns — and updates every user's insight dashboard automatically, without any user action required.</div>
          </div>

          <div className="build-cell reveal">
            <div className="build-step">Step 05 · Editor Experience</div>
            <div className="build-cell-title">The Markdown Editor Layer</div>
            <div className="build-cell-desc">AI generates, you refine. We built a markdown editor that lets you take full ownership of every piece of generated content — because your resume should sound like you, not like a robot.</div>
          </div>

          <div className="build-cell reveal">
            <div className="build-step">Step 06 · Analytics Loop</div>
            <div className="build-cell-title">Interview Progress Tracking</div>
            <div className="build-cell-desc">After every mock interview session, the AI scores your answers, stores the analytics, and builds a personalized improvement plan over time. The more you practice, the smarter the feedback gets.</div>
          </div>
        </div>
      </section>

      <div className="h-line"></div>

      {/* FAQ */}
      <section id="faq">
        <div className="faq-layout">
          <div className="faq-sidebar reveal">
            <div className="sec-label">Questions</div>
            <h2 className="sec-title">Every<br /><em>FAQ</em><br />Answered.</h2>
            <p>Everything you wanted to know about how PathPilot works, what makes it different, and why your data is safe with us.</p>
            <div className="made-badge">Live & Updated</div>
          </div>

          <div className="faq-list reveal">
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">What makes PathPilot unique as a career development tool?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">PathPilot combines AI-powered career tools with industry-specific insights to help you advance your career. Our platform offers three main features: an intelligent resume builder, a cover letter generator, and an adaptive interview preparation system. Each tool is tailored to your industry and skills, providing personalized guidance for your professional journey.</div>
            </div>

            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">How does PathPilot create tailored content?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">PathPilot learns about your industry, experience, and skills during onboarding. It then uses this information to generate customized resumes, cover letters, and interview questions. The content is specifically aligned with your professional background and industry standards, making it highly relevant and effective.</div>
            </div>

            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">How accurate and up-to-date are PathPilot's industry insights?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">We update our industry insights weekly using advanced AI analysis of current market trends. This includes salary data, in-demand skills, and industry growth patterns. Our system constantly evolves to ensure you have the most relevant information for your career decisions.</div>
            </div>

            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">Is my data secure with PathPilot?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">Absolutely. We prioritize the security of your professional information. All data is encrypted and securely stored using industry-standard practices. We use Clerk for authentication and never share your personal information with third parties.</div>
            </div>

            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">How can I track my interview preparation progress?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">PathPilot tracks your performance across multiple practice interviews, providing detailed analytics and improvement suggestions. You can view your progress over time, identify areas for improvement, and receive AI-generated tips to enhance your interview skills based on your responses.</div>
            </div>

            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>
                <div className="faq-q-text">Can I edit the AI-generated content?</div>
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-a">Yes! While PathPilot generates high-quality initial content, you have full control to edit and customize all generated resumes, cover letters, and other content. Our markdown editor makes it easy to refine the content to perfectly match your needs.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-line"></div>

      {/* CTA */}
      <div className="cta-strip">
        <h2>Your career.<br /><em>Elevated.</em></h2>
        <p>Join PathPilot and let AI do the heavy lifting — so you can focus on what actually matters: landing the job.</p>
        <div className="btn-row">
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: '14px', padding: '16px 40px' }}>
            Get Started Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Path<span>Pilot</span></div>
        <div className="footer-text">Built with Next.js · Clerk · Gemini AI · Prisma · Supabase · Inngest</div>
        <div className="footer-text" style={{ color: 'var(--gold)', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px' }}>Made with 🔥 at IIT Patna</div>
      </footer>
    </>
  );
}
