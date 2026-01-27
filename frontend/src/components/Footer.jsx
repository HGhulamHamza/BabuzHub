import React from "react";

const Footer = () => {
  return (
    <>
      {/* ===== Footer: floating wave top with centered logo ===== */}
      <footer className="site-footer">
        <div className="footer-waves" aria-hidden>
          <svg
            className="wave wave-1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,48 C150,120 350,0 600,40 C850,80 1050,20 1200,48 L1200,120 L0,120 Z"></path>
          </svg>

          <svg
            className="wave wave-2"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
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
            <img
              src="/logo.png"
              alt="BabyzHub Logo"
              className="footer-logo"
            />
          </div>

          <div className="footer-right" />
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} BabyzHub. All rights reserved. | Created
            by Nuvayra
          </p>
        </div>
      </footer>

      {/* ===== Footer Styles ===== */}
      <style>{`
        :root{
          --accent: #07B5B8;
          --accent-2: #06a4a6;
          --max-width: 1200px;
        }

        .site-footer {
          position: relative;
          background: linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%);
          color: #fff;
          overflow: visible;
          margin-top: 80px;
        }

        .footer-waves {
          position: absolute;
          top: -120px;
          left: 0;
          right: 0;
          height: 140px;
          pointer-events: none;
        }

        .wave {
          width: 100%;
          height: 140px;
          display: block;
        }

        .wave-1 path {
          fill: rgba(255,255,255,0.08);
        }

        .wave-2 {
          position: absolute;
          top: -22px;
          left: 0;
          right: 0;
        }

        .wave-2 path {
          fill: rgba(255,255,255,0.14);
        }

        .footer-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          max-width: var(--max-width);
          margin: 40px auto 8px;
          padding: 0 6%;
        }

        .footer-left {
          flex: 1;
        }

        .footer-left h3 {
          margin-bottom: 12px;
          font-size: 20px;
        }

        .quick-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quick-links a {
          color: #fff;
          text-decoration: none;
          font-size: 15px;
        }

        .quick-links a:hover {
          text-decoration: underline;
        }

        .footer-center {
          flex: 0 0 260px;
          display: flex;
          justify-content: center;
        }

        .footer-logo {
          max-width: 180px;
          width: 100%;
          filter: drop-shadow(0 8px 22px rgba(0,0,0,0.16));
          border-radius: 6px;
          background: rgba(255,255,255,0.03);
          padding: 6px;
        }

        .footer-right {
          flex: 1;
        }

        .footer-bottom {
          text-align: center;
          padding: 18px 6% 36px;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 14px;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1000px) {
          .footer-main {
            flex-direction: column;
            text-align: center;
            gap: 14px;
          }

          .footer-right {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
