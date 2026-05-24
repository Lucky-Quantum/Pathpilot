'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const TECH_STACK = [
  { name: 'Next.js 15', icon: '▲', desc: 'App Router & Server Actions', category: 'Framework' },
  { name: 'React 19', icon: '⚛', desc: 'UI Components & Hooks', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', desc: 'Utility-first Styling', category: 'Frontend' },
  { name: 'Prisma ORM', icon: '◆', desc: 'Type-safe Database Queries', category: 'Backend' },
  { name: 'Supabase', icon: '⚡', desc: 'PostgreSQL Database', category: 'Backend' },
  { name: 'Clerk Auth', icon: '🔐', desc: 'Authentication & Users', category: 'Backend' },
  { name: 'OpenRouter AI', icon: '🤖', desc: 'AI Model API Gateway', category: 'AI' },
  { name: 'Inngest', icon: '⏱', desc: 'Background Job Scheduling', category: 'Backend' },
  { name: 'Vercel', icon: '▴', desc: 'Edge Deployment Platform', category: 'DevOps' },
];

const AI_FEATURES = [
  { icon: '💬', title: 'AI Career Coach Chatbot', desc: 'Personalized career advice powered by DeepSeek AI. Knows your industry, skills, and experience to give tailored guidance.' },
  { icon: '📄', title: 'AI Resume Builder', desc: 'Generate professional, ATS-optimized resumes with AI assistance and real-time scoring.' },
  { icon: '✉️', title: 'Cover Letter Generator', desc: 'Craft compelling cover letters tailored to specific job descriptions using advanced language models.' },
  { icon: '🎯', title: 'Mock Interview Prep', desc: 'Industry-specific interview questions with instant AI feedback and improvement tips.' },
  { icon: '📊', title: 'Industry Insights Dashboard', desc: 'Real-time market data, salary trends, and skill demand forecasts — AI-generated weekly.' },
];

const TIMELINE = [
  { phase: '01', title: 'Concept & Planning', desc: 'Identified the gap in AI-powered career tools. Designed the system architecture and planned the full product roadmap solo.' },
  { phase: '02', title: 'Core Infrastructure', desc: 'Set up Next.js 15 with App Router, configured Supabase + Prisma ORM, integrated Clerk for authentication.' },
  { phase: '03', title: 'AI Integration', desc: 'Built the AI Career Coach using OpenRouter API with DeepSeek, implemented context-aware prompting with user profile data.' },
  { phase: '04', title: 'Feature Development', desc: 'Shipped Resume Builder, Cover Letter Generator, Mock Interview Prep, and Industry Insights Dashboard.' },
  { phase: '05', title: 'Deploy & Ship', desc: 'Deployed to Vercel with edge functions, set up Inngest for background jobs, launched to 50+ active users.' },
];

export default function BehindTheBuild() {
  const [activeFeature, setActiveFeature] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = pct + '%';
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      }),
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .btb-page {
          font-family: 'Syne', sans-serif;
          background: #080c14;
          color: #e2e8f0;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .mono { font-family: 'Space Mono', monospace; }

        /* Grid background */
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,220,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,220,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Noise overlay */
        .noise::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* Reveal animations */
        .reveal { opacity: 0; transform: translateY(28px); transition: all 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.animate-in { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        /* Progress bar */
        .progress-bar {
          position: fixed; top: 0; left: 0; z-index: 100;
          height: 2px;
          background: linear-gradient(90deg, #00ffdc, #4079ff);
          transition: width 0.1s linear;
          box-shadow: 0 0 12px #00ffdc88;
        }

        /* Hero */
        .hero {
          position: relative;
          padding: 160px 24px 100px;
          text-align: center;
          overflow: hidden;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .hero-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,255,220,0.12), transparent 70%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          animation: pulse-orb 8s ease-in-out infinite;
        }

        .hero-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(64,121,255,0.1), transparent 70%);
          bottom: 0; right: -50px;
          animation: pulse-orb 6s ease-in-out infinite 2s;
        }

        @keyframes pulse-orb {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(0,255,220,0.3);
          background: rgba(0,255,220,0.06);
          color: #00ffdc;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ffdc;
          animation: blink 2s infinite;
        }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .hero-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          color: #fff;
        }

        .hero-title .accent {
          background: linear-gradient(135deg, #00ffdc, #4079ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 18px;
          color: #64748b;
          max-width: 560px;
          margin: 0 auto 48px;
          line-height: 1.7;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 14px 32px;
          background: linear-gradient(135deg, #00ffdc, #4079ff);
          color: #080c14;
          font-weight: 700;
          font-size: 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.02em;
        }

        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,255,220,0.3); }

        .btn-secondary {
          padding: 14px 32px;
          background: transparent;
          color: #e2e8f0;
          font-weight: 600;
          font-size: 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover { border-color: rgba(0,255,220,0.4); color: #00ffdc; }

        /* Stats row */
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 64px;
          margin-top: 80px;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .stat-item { text-align: center; }

        .stat-num {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #00ffdc, #4079ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 6px;
          font-family: 'Space Mono', monospace;
        }

        /* Section */
        .section {
          padding: 100px 24px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #00ffdc;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .section-desc {
          color: #64748b;
          font-size: 16px;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        /* Solo builder section */
        .solo-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(0,255,220,0.15);
          background: linear-gradient(135deg, rgba(0,255,220,0.04), rgba(64,121,255,0.04));
          padding: 48px;
          overflow: hidden;
        }

        .solo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffdc, #4079ff, transparent);
        }

        .solo-avatar {
          width: 72px; height: 72px;
          border-radius: 16px;
          background: linear-gradient(135deg, #00ffdc, #4079ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 800; color: #080c14;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .solo-name {
          font-size: 28px; font-weight: 800; color: #fff;
          margin-bottom: 4px;
        }

        .solo-role {
          font-size: 13px; color: #00ffdc;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }

        .solo-desc {
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 28px;
          max-width: 600px;
        }

        .solo-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 28px;
        }

        .solo-tag {
          padding: 4px 14px;
          border-radius: 100px;
          background: rgba(0,255,220,0.08);
          border: 1px solid rgba(0,255,220,0.2);
          color: #00ffdc;
          font-size: 12px;
          font-weight: 600;
        }

        .solo-links { display: flex; gap: 16px; }

        .solo-link {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s;
        }

        .solo-link:hover { color: #00ffdc; }

        .solo-bg-text {
          position: absolute;
          right: -20px; top: 50%;
          transform: translateY(-50%);
          font-size: 180px;
          font-weight: 800;
          color: rgba(0,255,220,0.03);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 32px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, #00ffdc, #4079ff, transparent);
        }

        .timeline-item {
          position: relative;
          padding-bottom: 48px;
          padding-left: 32px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -4px; top: 6px;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #00ffdc;
          box-shadow: 0 0 12px #00ffdc;
        }

        .timeline-phase {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #00ffdc;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .timeline-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }

        .timeline-desc {
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: rgba(255,255,255,0.04);
          border-radius: 20px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
        }

        .feature-card {
          background: #0d1220;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,255,220,0.04), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card:hover::before,
        .feature-card.active::before { opacity: 1; }

        .feature-card.active {
          border-left: 2px solid #00ffdc;
        }

        .feature-icon { font-size: 28px; margin-bottom: 12px; }

        .feature-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }

        .feature-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Tech stack */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .tech-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,255,220,0.04), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tech-card:hover { border-color: rgba(0,255,220,0.2); }
        .tech-card:hover::before { opacity: 1; }

        .tech-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .tech-category {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: #00ffdc;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .tech-name {
          font-size: 14px;
          font-weight: 700;
          color: #e2e8f0;
        }

        .tech-desc {
          font-size: 12px;
          color: #475569;
        }

        /* CTA */
        .cta-section {
          padding: 100px 24px;
          text-align: center;
        }

        .cta-card {
          max-width: 640px;
          margin: 0 auto;
          padding: 64px 48px;
          border-radius: 24px;
          border: 1px solid rgba(0,255,220,0.15);
          background: linear-gradient(135deg, rgba(0,255,220,0.04), rgba(64,121,255,0.04));
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffdc, #4079ff, transparent);
        }

        .cta-emoji { font-size: 56px; margin-bottom: 24px; display: block; }

        .cta-title {
          font-size: 40px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .cta-desc {
          color: #64748b;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 36px;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin: 0 24px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .stats-row { gap: 32px; }
          .hero { padding: 120px 20px 80px; }
          .solo-card { padding: 32px 24px; }
          .solo-bg-text { display: none; }
          .section { padding: 64px 20px; }
        }
      `}</style>

      <div className="btb-page grid-bg noise">
        {/* Progress bar */}
        <div className="progress-bar" ref={progressRef} style={{ width: '0%' }} />

        {/* HERO */}
        <section className="hero">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="badge reveal">
              <span className="badge-dot" />
              Solo Build — Fully Deployed
            </div>

            <h1 className="hero-title reveal">
              Behind the<br />
              <span className="accent">Build</span>
            </h1>

            <p className="hero-sub reveal reveal-delay-1">
              One developer. One idea. A fully deployed AI platform — designed, engineered, and shipped from scratch.
            </p>

            <div className="hero-cta reveal reveal-delay-2">
              <Link href="/dashboard">
                <button className="btn-primary">Try PathPilot →</button>
              </Link>
              <a href="https://github.com/Lucky-Quantum/Pathpilot.git" target="_blank" rel="noopener noreferrer">
                <button className="btn-secondary">View Source Code</button>
              </a>
            </div>

            <div className="stats-row reveal reveal-delay-3">
              {[
                { num: '50+', label: 'Active Users' },
                { num: '9+', label: 'Technologies' },
                { num: '5', label: 'AI Features' },
              ].map((s) => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* SOLO BUILDER */}
        <section className="section">
          <div className="reveal">
            <div className="section-label">The Builder</div>
            <h2 className="section-title">Built by one.<br />Driven by obsession.</h2>
            <p className="section-desc">
              PathPilot isn't a team project — it's a product I conceived, designed, engineered, and deployed entirely on my own.
            </p>
          </div>

          <div className="solo-card reveal reveal-delay-1">
            <div className="solo-bg-text">LK</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
              <div className="solo-avatar">LK</div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div className="solo-name">Lucky Kumar</div>
                <div className="solo-role">Full Stack Developer & Product Engineer</div>
                <p className="solo-desc">
                  A passionate developer who turned an idea into a fully deployed AI platform. I handled everything — system architecture, database design, API development, AI integration, UI/UX, and production deployment. PathPilot is proof that one person with the right tools and relentless focus can ship something real.
                </p>
                <div className="solo-tags">
                  {['System Architecture', 'AI Integration', 'Database Design', 'API Development', 'UI/UX', 'DevOps'].map(t => (
                    <span className="solo-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="solo-links">
                  <a href="https://github.com/Lucky-Quantum" className="solo-link" target="_blank" rel="noopener noreferrer">GitHub →</a>
                  <a href="https://www.linkedin.com/in/lucky-888310378" className="solo-link" target="_blank" rel="noopener noreferrer">LinkedIn →</a>
                  <a href="https://portfolio-v1-beryl-chi.vercel.app/" className="solo-link" target="_blank" rel="noopener noreferrer">Portfolio →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* TIMELINE */}
        <section className="section">
          <div className="reveal">
            <div className="section-label">How it happened</div>
            <h2 className="section-title">From idea to<br />production.</h2>
            <p className="section-desc">
              Every phase planned and executed solo — no shortcuts, no handoffs.
            </p>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div className={`timeline-item reveal reveal-delay-${(i % 4) + 1}`} key={item.phase}>
                <div className="timeline-phase">PHASE {item.phase}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* AI FEATURES */}
        <section className="section">
          <div className="reveal">
            <div className="section-label">What I built</div>
            <h2 className="section-title">5 AI-powered<br />features.</h2>
            <p className="section-desc">
              Every feature designed, built, and integrated end-to-end by a single developer.
            </p>
          </div>

          <div className="features-grid reveal reveal-delay-1">
            {AI_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-card ${activeFeature === i ? 'active' : ''}`}
                onClick={() => setActiveFeature(i)}
              >
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* TECH STACK */}
        <section className="section">
          <div className="reveal">
            <div className="section-label">Under the hood</div>
            <h2 className="section-title">The stack I<br />chose and why.</h2>
            <p className="section-desc">
              Production-grade technologies selected for performance, scalability, and developer velocity — chosen and configured entirely by me.
            </p>
          </div>

          <div className="tech-grid">
            {TECH_STACK.map((tech, i) => (
              <div className={`tech-card reveal reveal-delay-${(i % 4) + 1}`} key={tech.name}>
                <div className="tech-icon">{tech.icon}</div>
                <div>
                  <div className="tech-category">{tech.category}</div>
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-desc">{tech.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-card reveal">
            <span className="cta-emoji">🚀</span>
            <div className="cta-title">Try PathPilot</div>
            <p className="cta-desc">
              Experience the AI career tools I built — from resume generation to mock interviews, all powered by AI and shipped by one developer.
            </p>
            <Link href="/dashboard">
              <button className="btn-primary">Get Started Free →</button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}