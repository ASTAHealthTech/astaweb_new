'use client';

import { ArrowRight, ChevronRight, AlertTriangle, ScanLine, Pill, FileQuestion, ArrowRightLeft, BookOpen, BellOff, GitBranch, ShieldCheck } from 'lucide-react';
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
import { useCases } from '../video-landing/content.js';

const USECASE_ICONS = [AlertTriangle, ScanLine, Pill, FileQuestion, ArrowRightLeft, BookOpen];

const OUTCOMES = [
  { icon: BellOff, title: 'Less alarm fatigue', text: 'Ranked, trajectory-aware lanes replace a wall of identical threshold buzzers.' },
  { icon: GitBranch, title: 'Continuity across handover', text: 'Trends, source cards, and active lanes compress into a packet that survives transition of care.' },
  { icon: ShieldCheck, title: 'Escalation with a source trail', text: 'Every lane a clinician sees carries supporting evidence, counter-signals, and the missing checks.' }
];

function UseCasesHero() {
  return (
    <section className="as-subhero as-subhero-center" id="top">
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <div className="as-hero-orb" aria-hidden="true" />
      <div className="as-shell as-subhero-centerinner">
        <Scramble as="span" className="as-kicker center" text="Use cases" />
        <SplitText as="h1" className="as-subhero-title center" text="One reasoning core. Many wards." immediate />
        <Reveal delay={0.2} immediate className="as-subhero-sub-wrap">
          <p className="as-subhero-sub center">
            Ward escalation, artifact-versus-deterioration, medication safety, sparse-patient review, and handoff all pass
            through the same source-grounded reasoning system.
          </p>
        </Reveal>
        <Reveal delay={0.32} className="as-subhero-cta center" immediate>
          <MagneticButton href="/contact" variant="primary">Request demo <ArrowRight size={16} /></MagneticButton>
          <MagneticButton href="#cases" variant="ghost">See the cases <ChevronRight size={16} /></MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

function CaseGrid() {
  return (
    <section className="as-page-section" id="cases">
      <NeuralField className="as-section-neural" />
      <div className="as-shell">
        <div className="as-case-grid">
          {useCases.map((c, i) => {
            const Icon = USECASE_ICONS[i] || AlertTriangle;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.08} variant="scale">
                <SpotlightCard className="as-case-card">
                  <div className="as-case-top">
                    <span className="as-case-icon"><Icon size={22} /></span>
                    <span className="as-case-n">{String(i + 1).padStart(2, '0')}</span>
                  </div>
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

function Outcomes() {
  return (
    <section className="as-page-section">
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">What it changes</span>
            <CharReveal as="h2" className="as-section-title" text="The same checks, every case." />
          </Reveal>
        </div>
        <div className="as-role-grid">
          {OUTCOMES.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} delay={i * 0.1} variant="up">
                <SpotlightCard className="as-role-card">
                  <span className="as-role-icon"><Icon size={24} /></span>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function UseCases() {
  return (
    <SiteShell>
      <UseCasesHero />
      <CaseGrid />
      <Outcomes />
      <DemoCTA />
    </SiteShell>
  );
}
