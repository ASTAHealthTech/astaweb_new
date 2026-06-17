'use client';

import { ArrowRight, ChevronRight, Eye, BellRing, Activity, ShieldCheck, Workflow, Zap, HeartPulse, Stethoscope, Building2, CheckCircle2 } from 'lucide-react';
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

const DEPLOY = [
  { k: '₹0', t: 'CAPEX to start', d: 'No capital purchase. A predictable operating model on infrastructure the hospital already owns.' },
  { k: 'Same day', t: 'Deployment window', d: 'Point a camera, calibrate, capture — no monitor changeover, no IT integration on the monitoring layer.' },
  { k: '0', t: 'New devices on the wall', d: 'Clinicians keep their workflow and their monitors. ASTA is the intelligence layer behind them.' }
];

const LAYERS = [
  { icon: Eye, title: 'Camera-based monitoring', text: 'Reads any of 15+ OEM monitor brands directly off the display — no integration, no monitor changeover.' },
  { icon: BellRing, title: 'Trajectory-aware alerting', text: 'Context-rich, role-aware routing framed by where the patient is heading, not just a single threshold breach.' },
  { icon: Activity, title: '24/7 signal continuity', text: 'Continuous vital capture every few seconds, with no gaps during shift changes or monitor handover.' },
  { icon: ShieldCheck, title: 'Compliance posture', text: 'Security and regulatory alignment with hospital-controlled data and a clear audit trail on every output.' },
  { icon: Workflow, title: 'Fits existing workflow', text: 'No new hardware on the monitoring layer and no IT integration required to start capturing signal.' },
  { icon: Zap, title: 'Same-day deployment', text: 'Stand up on existing infrastructure with a ₹0 CAPEX model and predictable operating cost.' }
];

const ROLES = [
  {
    icon: HeartPulse,
    role: 'Bedside nurse',
    line: 'Fewer false buzzers, clearer escalation.',
    text: 'Ranked lanes and the missing checks that matter — instead of one more threshold alarm to silence.'
  },
  {
    icon: Stethoscope,
    role: 'Physician',
    line: 'A handoff you can question.',
    text: 'Source-grounded support with trajectory, evidence, and counter-signals visible in one reviewable view.'
  },
  {
    icon: Building2,
    role: 'Administrator',
    line: 'Value without a capital project.',
    text: '₹0 CAPEX on the monitoring layer, hospital-controlled data, and an audit trail on every output.'
  }
];

function SolutionsHero() {
  return (
    <section className="as-subhero" id="top">
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <div className="as-hero-orb" aria-hidden="true" />
      <div className="as-shell as-subhero-grid">
        <div className="as-subhero-copy">
          <Scramble as="span" className="as-kicker" text="Solutions" />
          <SplitText as="h1" className="as-subhero-title" text="Built to fit the ward, not the other way around." immediate />
          <Reveal delay={0.2} immediate>
            <p className="as-subhero-sub">
              ASTA layers clinical intelligence onto the monitors a hospital already runs — no new hardware on the
              monitoring layer, no IT integration, and clinical value the day a camera goes up.
            </p>
          </Reveal>
          <Reveal delay={0.32} className="as-subhero-cta" immediate>
            <MagneticButton href="/contact" variant="primary">Talk to the team <ArrowRight size={16} /></MagneticButton>
            <MagneticButton href="#layers" variant="ghost">What ASTA adds <ChevronRight size={16} /></MagneticButton>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="as-deploy-visual" immediate>
          <div className="as-layerstack-head">
            <span><i className="as-live-dot" /> DEPLOYMENT</span>
            <em>same-day · ₹0 CAPEX</em>
          </div>
          <div className="as-deploy-tiles">
            {DEPLOY.map((d, i) => (
              <Reveal key={d.t} delay={0.4 + i * 0.1} variant="right" immediate>
                <div className="as-deploy-tile">
                  <strong>{d.k}</strong>
                  <span>{d.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="as-deploy-check">
            {['No monitor changeover', 'Hospital-controlled data', 'Audit trail on every output'].map((c) => (
              <span key={c}><CheckCircle2 size={15} /> {c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DeploymentModel() {
  return (
    <section className="as-page-section" id="deploy">
      <NeuralField className="as-section-neural" />
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">Deployment model</span>
            <ClipText as="h2" className="as-section-title" text="Land in the ward this week, not next budget cycle." />
          </Reveal>
        </div>
        <div className="as-deploy-cards">
          {DEPLOY.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1} variant="right">
              <div className="as-deploy-card">
                <strong>{c.k}</strong>
                <em>{c.t}</em>
                <p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Layers() {
  return (
    <section className="as-page-section" id="layers">
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">One intelligence layer</span>
            <CharReveal as="h2" className="as-section-title" text="Everything a ward needs, on the monitors it already runs." />
          </Reveal>
          <Reveal delay={0.12} className="as-section-lead">
            <p>Monitoring, alerting, continuity, compliance, integration, and deployment — one layer behind the wall.</p>
          </Reveal>
        </div>
        <div className="as-cap-grid">
          {LAYERS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.08} variant="scale">
                <SpotlightCard className="as-cap-card">
                  <span className="as-cap-icon"><Icon size={22} /></span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="as-cap-corner" aria-hidden="true" />
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section className="as-page-section">
      <NeuralField className="as-section-neural" />
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">What changes at the bedside</span>
            <ClipText as="h2" className="as-section-title" text="A clearer shift for everyone on the ward." />
          </Reveal>
        </div>
        <div className="as-role-grid">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.role} delay={i * 0.1} variant="up">
                <SpotlightCard className="as-role-card">
                  <span className="as-role-icon"><Icon size={24} /></span>
                  <span className="as-role-name">{r.role}</span>
                  <h3>{r.line}</h3>
                  <p>{r.text}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Solutions() {
  return (
    <SiteShell>
      <SolutionsHero />
      <DeploymentModel />
      <Layers />
      <Roles />
      <DemoCTA />
    </SiteShell>
  );
}
