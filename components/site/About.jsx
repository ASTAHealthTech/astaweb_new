'use client';

import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Camera, BrainCircuit, ShieldCheck, Linkedin } from 'lucide-react';
import { SiteShell, DemoCTA } from './Shell.jsx';
import {
  Reveal,
  SplitText,
  ClipText,
  CharReveal,
  Scramble,
  MagneticButton,
  SpotlightCard,
  NeuralField
} from './ui.jsx';
import { team, advisors } from '../video-landing/content.js';

const PARTNERS = [
  { name: 'AIC-SEED', src: '/partners/AIC-SEED-logo-pune.jpg' },
  { name: 'MeitY Startup Hub', src: '/partners/MeitYStartupHub-Logo-FINAL_5.png' },
  { name: 'IISER Pune', src: '/partners/IISER,_PUNE_Logo.png' },
  { name: 'NIT Andhra Pradesh', src: '/partners/NIT_Andhra.png' }
];

const BELIEFS = [
  { icon: Camera, title: 'Built on what wards already have', text: 'A camera reads the existing bedside monitor — no new hardware on the monitoring layer, no IT integration, ₹0 CAPEX.' },
  { icon: BrainCircuit, title: 'Source-grounded, not a black box', text: 'Every output carries trajectory, evidence, counter-signals, and the missing checks a clinician can question.' },
  { icon: ShieldCheck, title: 'Hospital-controlled by design', text: 'Data stays with the hospital, with a clear audit trail on every clinician-facing output.' }
];

function AboutHero() {
  return (
    <section className="as-subhero as-subhero-center" id="top">
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <div className="as-hero-orb" aria-hidden="true" />
      <div className="as-shell as-subhero-centerinner">
        <Scramble as="span" className="as-kicker center" text="About ASTA Health Tech" />
        <SplitText as="h1" className="as-subhero-title center" text="A practical clinical brain for hospital wards." immediate />
        <Reveal delay={0.2} immediate className="as-subhero-sub-wrap">
          <p className="as-subhero-sub center">
            We turn the monitor context wards already produce into source-grounded reasoning — ranked lanes, evidence,
            missing checks, and clinician review — without asking hospitals to rip and replace what works.
          </p>
        </Reveal>
        <Reveal delay={0.32} className="as-subhero-cta center" immediate>
          <MagneticButton href="/contact" variant="primary">Work with us <ArrowRight size={16} /></MagneticButton>
          <MagneticButton href="#team" variant="ghost">Meet the team <ChevronRight size={16} /></MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section className="as-page-section">
      <NeuralField className="as-section-neural" />
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">What we believe</span>
            <ClipText as="h2" className="as-section-title" text="The screen is the data. We stopped throwing it away." />
          </Reveal>
        </div>
        <div className="as-role-grid">
          {BELIEFS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.1} variant="up">
                <SpotlightCard className="as-role-card">
                  <span className="as-role-icon"><Icon size={24} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PersonCard({ person }) {
  return (
    <Reveal variant="up">
      <motion.article className="as-person" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 230, damping: 22 }}>
        <div className="as-person-photo">
          <img src={person.img} alt={person.name} loading="lazy" />
        </div>
        <div className="as-person-body">
          <h4>{person.name}</h4>
          <span>{person.role}</span>
          <p>{person.text}</p>
          <a href={person.profile} target="_blank" rel="noreferrer"><Linkedin size={14} /> Profile</a>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Team() {
  return (
    <section className="as-page-section" id="team">
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">The team</span>
            <CharReveal as="h2" className="as-section-title" text="Clinical, AI, product, and deployment in one company." />
          </Reveal>
          <Reveal delay={0.12} className="as-section-lead">
            <p>Clinical leadership, AI product engineering, business execution, and advisory depth for hospital-facing intelligence.</p>
          </Reveal>
        </div>
        <h3 className="as-team-label">Founding &amp; operating team</h3>
        <div className="as-people-grid">
          {team.map((p) => <PersonCard key={p.name} person={p} />)}
        </div>
        <h3 className="as-team-label">Advisory board</h3>
        <div className="as-people-grid">
          {advisors.map((p) => <PersonCard key={p.name} person={p} />)}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="as-partners">
      <NeuralField className="as-partners-neural" />
      <div className="as-shell">
        <Reveal className="as-partners-head">
          <span className="as-kicker center">Institutional trust</span>
          <CharReveal as="h2" className="as-partners-title" text="Backed by India’s innovation ecosystem." />
        </Reveal>
        <div className="as-partners-grid">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} variant="scale">
              <motion.div className="as-logo-card" whileHover={{ y: -8, rotateX: 6, rotateY: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
                <span className="as-logo-tile"><img src={p.src} alt={p.name} /></span>
                <em>{p.name}</em>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <SiteShell>
      <AboutHero />
      <Beliefs />
      <Team />
      <Partners />
      <DemoCTA />
    </SiteShell>
  );
}
