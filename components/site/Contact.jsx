'use client';

import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { SiteShell } from './Shell.jsx';
import {
  Reveal,
  SplitText,
  Scramble,
  MagneticButton,
  SpotlightCard,
  NeuralField
} from './ui.jsx';

const STEPS = [
  'ASTA reviews your ward context',
  'Initial fit conversation',
  'Product walkthrough',
  'Deployment review'
];

function ContactBody() {
  return (
    <section className="as-subhero as-contact" id="contact">
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <div className="as-hero-orb" aria-hidden="true" />
      <NeuralField className="as-section-neural" />
      <div className="as-shell as-subhero-grid">
        <div className="as-subhero-copy">
          <Scramble as="span" className="as-kicker" text="Request a demo" />
          <SplitText as="h1" className="as-subhero-title" text="See ASTA read a live ward monitor." immediate />
          <Reveal delay={0.2} immediate>
            <p className="as-subhero-sub">
              A focused 30-minute session with the clinical and engineering team — covering monitor compatibility,
              ward-workflow fit, and deployment requirements for your unit.
            </p>
          </Reveal>
          <Reveal delay={0.32} className="as-subhero-cta" immediate>
            <MagneticButton href="mailto:info@astahealthtech.com" variant="primary">Email ASTA <ArrowRight size={16} /></MagneticButton>
            <MagneticButton href="https://wa.me/918779404951" variant="ghost">WhatsApp <ArrowUpRight size={16} /></MagneticButton>
          </Reveal>
          <Reveal delay={0.44} className="as-contact-steps" immediate>
            {STEPS.map((s, i) => (
              <span key={s}><em>{String(i + 1).padStart(2, '0')}</em> {s}</span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} immediate>
          <SpotlightCard className="as-contact-card">
            <div className="as-contact-card-head">
              <span>Inquiry portal · ASTA Health Tech</span>
              <strong>Response &lt; 24h</strong>
            </div>
            <a className="as-contact-line" href="mailto:info@astahealthtech.com">
              <span className="as-contact-ico"><Mail size={18} /></span>
              <span><i>Email</i><b>info@astahealthtech.com</b></span>
            </a>
            <a className="as-contact-line" href="tel:+918779404951">
              <span className="as-contact-ico"><Phone size={18} /></span>
              <span><i>Phone</i><b>+91 87794 04951</b></span>
            </a>
            <a className="as-contact-line" href="https://wa.me/918779404951" target="_blank" rel="noreferrer">
              <span className="as-contact-ico"><MessageCircle size={18} /></span>
              <span><i>WhatsApp</i><b>Message the team</b></span>
            </a>
            <div className="as-contact-line as-contact-addr">
              <span className="as-contact-ico"><MapPin size={18} /></span>
              <span><i>India office</i><b>Kaveri Regent Coronet, Aurbis Prime, 80 Feet Rd, 3rd Block, Koramangala, Bengaluru, Karnataka 560034</b></span>
            </div>
            <div className="as-contact-line as-contact-addr">
              <span className="as-contact-ico"><MapPin size={18} /></span>
              <span><i>Canada office</i><b>161 Bay St, Toronto, Ontario, Canada M5J 2S1</b></span>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <SiteShell>
      <ContactBody />
    </SiteShell>
  );
}
