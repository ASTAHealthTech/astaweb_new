'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Camera,
  Layers,
  TrendingUp,
  BookOpen,
  GitBranch,
  ClipboardCheck,
  ShieldCheck,
  Activity,
  MessageSquareText
} from 'lucide-react';
import { SiteShell, DemoCTA } from './Shell.jsx';
import {
  Reveal,
  SplitText,
  ClipText,
  CharReveal,
  Scramble,
  MagneticButton,
  SpotlightCard,
  Counter,
  NeuralField
} from './ui.jsx';
import { pipeline, lanes, revealTabs, productPanels, platformStats } from '../video-landing/content.js';

const LAYER_ICONS = [Camera, Layers, TrendingUp, BookOpen, GitBranch, ClipboardCheck];

/* ---------------------------------------------------------- sub hero */
function PlatformHero() {
  return (
    <section className="as-subhero" id="top">
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <div className="as-hero-orb" aria-hidden="true" />
      <div className="as-shell as-subhero-grid">
        <div className="as-subhero-copy">
          <Scramble as="span" className="as-kicker" text="The platform" />
          <SplitText as="h1" className="as-subhero-title" text="One clinical brain, layered on the monitors you already run." immediate />
          <Reveal delay={0.2} immediate>
            <p className="as-subhero-sub">
              ASTA turns live monitor context into a patient packet, routes it through specialist lanes with source
              support and missing checks, and renders the reasoning as a clinician-reviewable artifact.
            </p>
          </Reveal>
          <Reveal delay={0.32} className="as-subhero-cta" immediate>
            <MagneticButton href="/contact" variant="primary">Request demo <ArrowRight size={16} /></MagneticButton>
            <MagneticButton href="#reasoning" variant="ghost">How it reasons <ChevronRight size={16} /></MagneticButton>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="as-layerstack" immediate>
          <div className="as-layerstack-head">
            <span><i className="as-live-dot" /> SIGNAL FLOW</span>
            <em>monitor → review</em>
          </div>
          {pipeline.map((layer, i) => {
            const Icon = LAYER_ICONS[i] || Layers;
            return (
              <motion.div
                className="as-layer"
                key={layer.title}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="as-layer-icon"><Icon size={18} /></span>
                <span className="as-layer-text">
                  <i>{layer.eyebrow}</i>
                  <b>{layer.title}</b>
                </span>
                <span className="as-layer-n">{String(i + 1).padStart(2, '0')}</span>
                <motion.span
                  className="as-layer-pulse"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: pipeline.length * 0.4 - 1, delay: i * 0.4 }}
                />
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------- interactive reasoning */
function ReasoningLayers() {
  const [active, setActive] = useState(0);
  const step = pipeline[active];
  const ActiveIcon = LAYER_ICONS[active] || Layers;
  return (
    <section className="as-page-section" id="reasoning">
      <NeuralField className="as-section-neural" />
      <div className="as-shell as-reason-grid">
        <div>
          <Reveal>
            <span className="as-kicker">How ASTA reasons</span>
            <ClipText as="h2" className="as-section-title" text="Six layers, one source-grounded output." />
          </Reveal>
          <div className="as-layer-list">
            {pipeline.map((layer, i) => {
              const Icon = LAYER_ICONS[i] || Layers;
              return (
                <motion.button
                  type="button"
                  key={layer.title}
                  className={active === i ? 'is-active' : ''}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 8 }}
                >
                  <span className="as-layer-list-icon"><Icon size={20} /></span>
                  <span>
                    <i>{layer.eyebrow}</i>
                    <b>{layer.title}</b>
                  </span>
                  <ChevronRight size={16} />
                </motion.button>
              );
            })}
          </div>
        </div>
        <Reveal variant="scale" className="as-reason-detail">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -22, filter: 'blur(8px)' }}
              transition={{ duration: 0.35 }}
            >
              <span className="as-reason-eyebrow">{step.eyebrow}</span>
              <div className="as-reason-icon"><ActiveIcon size={30} /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="as-reason-tags">
                {step.tags.map((t) => <em key={t}>{t}</em>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ specialist lanes */
function Lanes() {
  return (
    <section className="as-page-section as-lanes">
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">Specialist lanes</span>
            <CharReveal as="h2" className="as-section-title" text="Five lanes click into one reviewable council." />
          </Reveal>
          <Reveal delay={0.12} className="as-section-lead">
            <p>Each lane carries a role, a source trail, and an uncertainty posture before it becomes clinician-facing output.</p>
          </Reveal>
        </div>
        <div className="as-lane-grid">
          {lanes.map((lane, i) => (
            <Reveal key={lane.name} delay={(i % 3) * 0.08} variant="scale">
              <SpotlightCard className="as-lane-card">
                <span className="as-lane-tag">LANE {i + 1}</span>
                <h3>{lane.name}</h3>
                <em>{lane.subtitle}</em>
                <div className="as-lane-line" />
                <p>{lane.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- reasoning reveal tabs */
function ReasoningReveal() {
  const [tab, setTab] = useState(0);
  const cur = revealTabs[tab];
  return (
    <section className="as-page-section">
      <NeuralField className="as-section-neural" />
      <div className="as-shell as-reveal-grid">
        <div>
          <Reveal>
            <span className="as-kicker">Reasoning, opened up</span>
            <ClipText as="h2" className="as-section-title" text="Why active, what confirms, what is missing." />
          </Reveal>
          <Reveal delay={0.12} className="as-section-lead">
            <p>Every ranked lane explains its direction, asks for the next useful checks, and keeps counter-signals visible.</p>
          </Reveal>
          <div className="as-reveal-tabs" role="tablist">
            {revealTabs.map((t, i) => (
              <button key={t.tab} type="button" className={tab === i ? 'is-active' : ''} onMouseEnter={() => setTab(i)} onClick={() => setTab(i)}>
                {t.tab} <ChevronRight size={15} />
              </button>
            ))}
          </div>
        </div>
        <Reveal variant="right" className="as-reveal-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.heading}
              initial={{ opacity: 0, x: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -28, filter: 'blur(10px)' }}
              transition={{ duration: 0.36 }}
            >
              <span className="as-reveal-badge">{cur.badge}</span>
              <h3>{cur.heading}</h3>
              <p>{cur.text}</p>
              <div className="as-reveal-checks">
                {['repeat vitals', 'latest lab', 'clinical exam detail'].map((c) => <em key={c}>{c}</em>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- product surfaces */
function ProductSurfaces() {
  const icons = [Activity, ShieldCheck, MessageSquareText];
  return (
    <section className="as-page-section">
      <div className="as-shell">
        <div className="as-section-head">
          <Reveal>
            <span className="as-kicker">Product surfaces</span>
            <CharReveal as="h2" className="as-section-title" text="The reasoning lands in screens the ward can use." />
          </Reveal>
        </div>
        <div className="as-surface-grid">
          {productPanels.map((p, i) => {
            const Icon = icons[i] || Activity;
            return (
              <Reveal key={p.title} delay={i * 0.1} variant="up">
                <SpotlightCard className="as-surface-card">
                  <span className="as-surface-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="as-surface-icon"><Icon size={22} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
        <div className="as-shell as-stats-row as-platform-stats">
          {platformStats.map((s) => (
            <Reveal key={s.label} className="as-stat" variant="scale">
              <div className="as-stat-value">{s.value}</div>
              <div className="as-stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Platform() {
  return (
    <SiteShell>
      <PlatformHero />
      <ReasoningLayers />
      <Lanes />
      <ReasoningReveal />
      <ProductSurfaces />
      <DemoCTA />
    </SiteShell>
  );
}
