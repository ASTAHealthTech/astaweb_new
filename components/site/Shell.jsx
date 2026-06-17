'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import SmoothScroll from './SmoothScroll.jsx';
import { MagneticButton, ScrollLight, NeuralCanvas, NeuralField, Reveal, SplitText } from './ui.jsx';

export const NAV = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'About', href: '/about' }
];

/* ================================================================== Nav */
export function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header
      className={`as-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="as-nav-inner">
        <a className="as-nav-brand" href="/" aria-label="ASTA Health Tech home">
          <img src="/logo-asta.png" alt="ASTA Health Tech" />
        </a>
        <nav className="as-nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.label} href={item.href}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="as-nav-actions">
          <a className="as-nav-login" href="https://web.astahealthtech.co.in/user/login" target="_blank" rel="noreferrer">
            Login
          </a>
          <MagneticButton href="/contact" variant="primary" className="as-nav-cta">
            Request demo <ArrowRight size={15} />
          </MagneticButton>
        </div>
        <button
          type="button"
          className="as-nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="as-mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile-only expandable menu */}
      <div id="as-mobile-menu" className={`as-nav-mobile ${open ? 'is-open' : ''}`}>
        <div className="as-nav-mobile-inner">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="as-nav-mobile-login"
            href="https://web.astahealthtech.co.in/user/login"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Login
          </a>
          <a className="as-nav-mobile-cta" href="/contact" onClick={() => setOpen(false)}>
            Request demo <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* =============================================================== Footer */
export function Footer() {
  return (
    <footer className="as-footer">
      <div className="as-shell as-footer-grid">
        <div className="as-footer-brand">
          <span className="as-footer-logo"><img src="/logo-asta.png" alt="ASTA Health Tech" /></span>
          <p>Source-grounded clinical intelligence for hospital wards — built on the monitors you already have.</p>
        </div>
        <div className="as-footer-cols">
          <div>
            <span>Product</span>
            {NAV.map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
            <a href="/contact">Contact</a>
          </div>
          <div>
            <span>Contact</span>
            <a href="mailto:info@astahealthtech.com">info@astahealthtech.com</a>
            <a href="tel:+918779404951">+91 87794 04951</a>
            <a href="https://web.astahealthtech.co.in/user/login" target="_blank" rel="noreferrer">Login</a>
          </div>
        </div>
      </div>
      <div className="as-shell as-footer-bottom">
        <span>© 2026 ASTA Health Tech Corporation. All rights reserved.</span>
        <span>Bengaluru · India-South · Hospital-controlled intelligence</span>
      </div>
    </footer>
  );
}

/* =============================================== Shared demo CTA block */
export function DemoCTA() {
  return (
    <section className="as-cta" id="contact">
      <NeuralField className="as-cta-neural" />
      <div className="as-cta-glow" aria-hidden="true" />
      <div className="as-shell as-cta-inner">
        <Reveal>
          <span className="as-kicker center">Request a demo</span>
          <SplitText as="h2" className="as-cta-title" text="See ASTA read a live ward monitor." />
        </Reveal>
        <Reveal delay={0.15} className="as-cta-sub">
          <p>A focused 30-minute session on monitor compatibility, ward-workflow fit, and deployment for your unit.</p>
        </Reveal>
        <Reveal delay={0.28} className="as-cta-actions">
          <MagneticButton href="mailto:info@astahealthtech.com" variant="primary">
            Email ASTA <ArrowRight size={17} />
          </MagneticButton>
          <MagneticButton href="https://wa.me/918779404951" variant="ghost">
            WhatsApp <ArrowUpRight size={17} />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================== Shared page wrapper */
export function SiteShell({ children }) {
  return (
    <SmoothScroll>
      <div className="as-void" aria-hidden="true" />
      <NeuralCanvas />
      <ScrollLight />
      <GlassNav />
      <main className="as-root">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
