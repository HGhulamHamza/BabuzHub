import React, { useEffect, useRef } from "react";
import ReviewsSection from "../components/ReviewSection";

/**
 * WhyUs.jsx
 *
 * Single-file React component containing:
 * - Hero / Why section
 * - Stats section with circular progress (97%, 93%, 100%) — partial fills
 * - 3 Feature cards (Fast Shipping, Easy Returns, 24/7 Support) with outline icons and hover animation
 * - Footer with floating wave top and centered logo (uses ./logo.jpg)
 *
 * All styling is included inside this file (per your request).
 *
 * Drop this file into your React project and import/use it where needed.
 */

const WhyUs = () => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // percentages
  const stats = [
    { id: 1, label: "Fast Shipping", sub: "Orders delivered quickly across Pakistan", pct: 97 },
    { id: 2, label: "Trusted Quality Products", sub: "Carefully chosen and safety-tested products", pct: 93 },
    { id: 3, label: "Secure Payments", sub: "Safe and seamless checkout experience", pct: 100 },
  ];

  // refs to animate on mount (draw effect)
  const ringRefs = useRef([]);

  useEffect(() => {
    // trigger CSS transition by setting strokeDashoffset to correct values after a tiny delay
    // this creates a smooth draw animation on mount
    const t = setTimeout(() => {
      ringRefs.current.forEach((el, index) => {
        if (!el) return;
        const pct = stats[index].pct;
        const offset = circumference * (1 - pct / 100);
        el.style.strokeDashoffset = String(offset);
      });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashOffsetFor = (pct) => circumference * (1 - pct / 100);

  return (
    <>
      {/* ===== Section 1: Hero / Top ===== */}
      <section className="why-section top-section" id="whyus">
        <div className="why-left">
          <img
            src="/WhyUS.jpg"
            alt="BabyzHub Products"
            className="first-img"
          />
        </div>

        <div className="why-right">
          <h2>Trusted Baby Care Essentials for Every Little Step</h2>
          <p>
            At <strong>BabyzHub</strong>, we care about your baby’s safety,
            comfort, and happiness. That’s why we bring you high-quality baby
            products that are soft, safe, and loved by parents.
          </p>
          <a href="#" className="shop-link">
            Shop Now <span className="arrow">→</span>
          </a>
        </div>
      </section>

      {/* ===== Section 2: Stats (circles) ===== */}
      <section className="why-section stats-section">
        <div className="stats-left">
          <h2>What makes BabyzHub different from others</h2>
          <p>
            We combine trusted product quality, lightning-fast delivery, and secure payment methods to make parenting easier.
            Our products are carefully selected, safety-checked, and delivered with love to thousands of happy parents.
          </p>
        </div>

        <div className="stats-right">
          {stats.map((s, i) => (
            <div className="circle-item-row" key={s.id}>
              <div className="circle-item" aria-hidden>
                <svg className="progress-ring" viewBox="0 0 110 110" role="img" aria-label={`${s.pct} percent`}>
                  <circle className="ring-bg" cx="55" cy="55" r={radius} />
                  <circle
                    ref={(el) => (ringRefs.current[i] = el)}
                    className="ring"
                    cx="55"
                    cy="55"
                    r={radius}
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: dashOffsetFor(0), // start from 0 offset (empty) then animate to pct in useEffect
                    }}
                  />
                  <text x="50%" y="52%" textAnchor="middle" className="percent-text">{s.pct}%</text>
                </svg>
              </div>

              <div className="circle-text">
                <h4>{s.label}</h4>
                <p>{s.sub}</p>
              </div>
            </div>
          ))}

          {/* separator after all rows */}
        </div>
      </section>

      {/* ===== Section 3: Feature Cards (pamu8-style white cards) ===== */}
      <section className="cards-section">
        <div className="cards-inner">
          {/* Card 1 - Fast Shipping */}
          <article className="feature-card card-shadow">
            <div className="card-icon" aria-hidden>
              {/* outline truck icon */}
              <svg viewBox="0 0 24 24" className="icon-svg">
                <path d="M3 7h13v7h-1.5a3.5 3.5 0 0 0-7 0H3V7z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10h4l1 2v3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7.5" cy="17.5" r="1.6" fill="currentColor" />
                <circle cx="18.5" cy="17.5" r="1.6" fill="currentColor" />
              </svg>
            </div>
            <div className="card-body">
              <h4>Fast Shipping</h4>
              <p>Fast shipping all over Pakistan.</p>
            </div>
          </article>

          {/* Card 2 - Easy Returns */}
          <article className="feature-card card-shadow">
            <div className="card-icon" aria-hidden>
              {/* outline return icon */}
              <svg viewBox="0 0 24 24" className="icon-svg">
                <path d="M21 15v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 13l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 9v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-body">
              <h4>Easy Returns</h4>
              <p>Hassle-free 14 days return policy.</p>
            </div>
          </article>

          {/* Card 3 - 24/7 Support */}
          <article className="feature-card card-shadow">
            <div className="card-icon" aria-hidden>
              {/* outline headset icon */}
              <svg viewBox="0 0 24 24" className="icon-svg">
                <path d="M3 13v-1a9 9 0 0 1 18 0v1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 13v4a2 2 0 0 0 2 2h.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 13v4a2 2 0 0 1-2 2h-.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="card-body">
              <h4>24/7 Support</h4>
              <p>We are always here to help you.</p>
            </div>
          </article>
        </div>
      </section>
      <ReviewsSection/>

      {/* ===== Footer: floating wave top with centered logo ===== */}
      <footer className="site-footer">
        <div className="footer-waves" aria-hidden>
          {/* Two layered waves create the floating water feel */}
          <svg className="wave wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,48 C150,120 350,0 600,40 C850,80 1050,20 1200,48 L1200,120 L0,120 Z"></path>
          </svg>
          <svg className="wave wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,70 C200,10 400,100 600,70 C800,40 1000,90 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

        <div className="footer-main">
          <div className="footer-left">
            <h3>Quick links</h3>
            <ul className="quick-links">
              <li><a href="/">Home</a></li>
              <li><a href="#whyus">Why Us</a></li>
              {/* <li><a href="/signin">Sign In</a></li> */}
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>

          <div className="footer-center">
            <img src="./logo.png" alt="BabyzHub Logo" className="footer-logo" />
          </div>

          <div className="footer-right">
            {/* left intentionally empty — keeps layout symmetrical */}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BabyzHub. All rights reserved. | Created by Nuvayra</p>
        </div>
      </footer>

      {/* ===== Inline CSS (all styles here) ===== */}
      <style>{`
        /* Google font */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        :root{
          --accent: #07B5B8;
          --accent-2: #06a4a6;
          --muted: #6b6b6b;
          --bg-soft: #f8f9fa;
          --max-width: 1200px;
        }

        * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }

        /* ===== Top Hero / Why Section ===== */
        .top-section {
          display: flex;
          gap: 28px;
          align-items: center;
          padding: 56px 6%;
          max-width: var(--max-width);
          margin: 0 auto;
        }
        .why-left { flex: 0 0 55%; }
        .why-right { flex: 1; }
        .first-img {
          width: 100%;
          height: 540px;
          object-fit: cover;
          border-radius: 8px;
          display: block;
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
        }
        .why-right h2 { font-size: 30px; color: #222; margin-bottom: 12px; line-height: 1.15; }
        .why-right p { color: var(--muted); line-height: 1.7; margin-bottom: 18px; }
        .shop-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          position: relative;
          display: inline-block;
          transition: color .25s ease;
        }
        .shop-link .arrow { margin-left: 8px; transition: margin .25s ease; }
        .shop-link:hover .arrow { margin-left: 12px; }
        .shop-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 4px;
          width: 0%;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transition: width .28s ease;
          border-radius: 2px;
        }
        .shop-link:hover::after { width: 100%; }

        /* ===== Stats Section ===== */
        .stats-section {
          display: flex;
          gap: 30px;
          align-items: flex-start;
          padding: 42px 6%;
          max-width: var(--max-width);
          margin: 0 auto;
          background: #fff;
        }
        .stats-left { flex: 1; padding-right: 30px; }
        .stats-left h2 { font-size: 26px; color: #222; margin-bottom: 10px; }
        .stats-left p { color: var(--muted); line-height: 1.7; }

        .stats-right { flex: 1; display: flex; flex-direction: column; gap: 6px; }

        .circle-item-row {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 12px 8px;
          border-radius: 8px;
          transition: background .15s ease;
        }
        .circle-item-row:hover { background: rgba(7,181,184,0.02); }

        .circle-item { width: 110px; flex-shrink: 0; display:flex; align-items:center; justify-content:center; }
        .circle-text { text-align: left; margin-left: 6px; }

        .progress-ring { width: 110px; height: 110px; display: block; }
        .progress-ring .ring-bg { fill: none; stroke: #eee; stroke-width: 8; }
        .progress-ring .ring {
          fill: none;
          stroke: var(--accent);
          stroke-width: 8;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 55px 55px;
          transition: stroke-dashoffset .9s cubic-bezier(.2,.9,.3,1);
        }
        .percent-text { font-size: 16px; fill: var(--accent); font-weight: 600; dominant-baseline: middle; }

        .circle-text h4 { font-size: 15px; margin: 0 0 4px; color: #222; }
        .circle-text p { margin: 0; font-size: 13px; color: var(--muted); }

        /* ===== Cards Section (3 white cards) ===== */
        .cards-section {
          padding: 28px 6%;
          background: var(--bg-soft);
        }
        .cards-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
        }

        .feature-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 14px;
          align-items: center;
          width: 340px;
          transition: transform .22s cubic-bezier(.2,.9,.3,1), box-shadow .22s ease;
          cursor: default;
          border: 1px solid rgba(0,0,0,0.03);
        }
        .card-shadow {
          box-shadow: 0 8px 30px rgba(2,14,24,0.06);
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 38px rgba(2,14,24,0.12);
        }

        .card-icon {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(7,181,184,0.08), rgba(6,164,166,0.04));
          flex-shrink: 0;
        }
        .icon-svg { width: 36px; height: 36px; color: var(--accent); }
        .card-body h4 { margin: 0; font-size: 16px; color: #111; }
        .card-body p { margin: 6px 0 0; color: var(--muted); font-size: 14px; }

        /* ===== Footer (floating water effect) ===== */
        .site-footer {
          position: relative;
          background: linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%);
          color: #fff;
          overflow: visible;
        }

        .footer-waves {
          position: absolute;
          top: -120px;
          left: 0;
          right: 0;
          height: 140px;
          pointer-events: none;
        }
        .wave { width: 100%; height: 140px; display: block; }
        .wave-1 path { fill: rgba(255,255,255,0.08); }
        .wave-2 { position: absolute; top: -22px; left: 0; right: 0; }
        .wave-2 path { fill: rgba(255,255,255,0.14); }

        .footer-main {
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 20px;
          max-width: var(--max-width);
          margin: 40px auto 8px;
          padding: 0 6%;
        }
        .footer-left { flex: 1; }
        .footer-center { flex: 0 0 260px; display:flex; align-items:center; justify-content:center; }
        .footer-right { flex: 1; }

        .footer-left h3 { margin: 0 0 12px; font-size: 20px; color: rgba(255,255,255,0.95); }
        .quick-links { list-style:none; padding:0; margin:0; display:flex; flex-direction: column; gap: 8px; }
        .quick-links a { color: rgba(255,255,255,0.95); text-decoration:none; font-size:15px; }
        .quick-links a:hover { text-decoration: underline; }

        .footer-logo { max-width: 180px; width: 100%; height: auto; filter: drop-shadow(0 8px 22px rgba(0,0,0,0.16)); border-radius: 6px; background: rgba(255,255,255,0.03); padding: 6px; }

        .footer-bottom { text-align:center; color: rgba(255,255,255,0.92); padding: 18px 6% 36px; border-top: 1px solid rgba(255,255,255,0.04); }

        /* ===== Responsive ===== */
        @media (max-width: 1000px) {
          .top-section { padding: 34px 5%; flex-direction: column; gap:18px; }
          .first-img { height: 300px; }
          .stats-section { flex-direction: column; padding: 28px 5%; }
          .stats-right { gap: 8px; }
          .cards-inner { flex-direction: column; align-items: center; gap: 16px; }
          .footer-main { flex-direction: column; text-align:center; padding: 0 5%; gap: 14px; }
          .footer-right { display: none; }
        }

        @media (max-width: 480px) {
          .progress-ring { width: 88px; height: 88px; }
          .circle-item { width: 88px; }
          .percent-text { font-size:14px; }
          .why-right h2 { font-size:20px; }
          .feature-card { width: 92%; }
          .card-icon { width: 56px; height: 56px; }
        }
      `}</style>
    
    </>
  );
};

export default WhyUs;
