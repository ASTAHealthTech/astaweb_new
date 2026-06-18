'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Activity,
  BrainCircuit,
  BellRing,
  ShieldCheck,
  Workflow,
  Layers,
  Eye,
  ScanLine,
  Zap,
  Play,
  HeartPulse,
  Wind,
  Thermometer,
  Droplet,
  Pill,
  TrendingUp,
  Quote
} from 'lucide-react';
import { SiteShell } from './Shell.jsx';
import PoweredBy from './PoweredBy.jsx';
import {
  Reveal,
  SplitText,
  Scramble,
  CharReveal,
  ClipText,
  MagneticButton,
  SpotlightCard,
  Counter,
  Marquee,
  LogoMarquee,
  EcgLine,
  Parallax,
  NeuralField
} from './ui.jsx';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ============================================================== content */
const PARTNERS = [
  { name: 'AIC-SEED', src: '/partners/AIC-SEED-logo-pune.jpg' },
  { name: 'MeitY Startup Hub', src: '/partners/MeitYStartupHub-Logo-FINAL_5.png' },
  { name: 'IISER Pune', src: '/partners/IISER,_PUNE_Logo.png' },
  { name: 'NIT Andhra Pradesh', src: '/partners/NIT_Andhra.png' }
];

const HOSPITALS = [
  { name: 'Aksha Hospitals', src: '/hospitals/aksha.png' },
  { name: 'Anbu Hospitals', src: '/hospitals/anbu.png' },
  { name: 'Karnataka ENT', src: '/hospitals/karnataka-ent.png' },
  { name: 'KS Hospital', src: '/hospitals/ks.png' },
  { name: 'Seethapathy Clinic', src: '/hospitals/seethapathy.png' },
  { name: 'Southern Railway HQ Hospital', src: '/hospitals/southern-railway-hq.png' },
  { name: 'Sugam Hospital', src: '/hospitals/sugam.png' }
];

const PIPELINE = [
  { n: '01', icon: Camera, title: 'Monitor display', text: 'A camera reads the bedside monitor you already own.' },
  { n: '02', icon: ScanLine, title: 'Structured extraction', text: 'Vision turns on-screen numbers into a live vitals stream.' },
  { n: '03', icon: Layers, title: 'Physiological embedding', text: 'Vitals become machine-readable physiological state.' },
  { n: '04', icon: BrainCircuit, title: 'Deterioration read', text: 'PPLM ranks deterioration with a trajectory-aware view.' },
  { n: '05', icon: BellRing, title: 'Clinical output', text: 'Role-aware, source-grounded alerts a clinician can question.' }
];

const STORY = [
  {
    eyebrow: 'The reality',
    title: 'Wards are already drowning in signal.',
    body: 'Every bed has a monitor showing live vitals. Almost none of it is captured, trended, or routed. The screen is the data — and it is being thrown away every second.',
    accent: '#7db8ff'
  },
  {
    eyebrow: 'The shift',
    title: 'ASTA reads the monitor you already own.',
    body: 'A camera turns any of 15+ OEM displays into a continuous vitals stream at 98% extraction accuracy — sub-2-second latency, ₹0 CAPEX, same-day deployment.',
    accent: '#f5c75d'
  },
  {
    eyebrow: 'The outcome',
    title: 'Trajectory-aware alerts, not more noise.',
    body: 'Instead of another threshold buzzer, clinicians get context-rich, role-aware alerts framed by trajectory — designed to cut alarm fatigue, not add to it.',
    accent: '#7db8ff'
  }
];

const CAPABILITIES = [
  { icon: Eye, title: 'Camera-based monitoring', text: 'Reads any of 15+ OEM monitor brands directly off the display — no integration, no monitor changeover.' },
  { icon: BellRing, title: 'Trajectory-aware alerting', text: 'Context-rich, role-aware routing framed by where the patient is heading, not just a single threshold breach.' },
  { icon: Activity, title: '24/7 signal continuity', text: 'Continuous vital capture every few seconds, with no gaps during shift changes or monitor handover.' },
  { icon: ShieldCheck, title: 'Compliance posture', text: 'Security and regulatory alignment with hospital-controlled data and a clear audit trail on every output.' },
  { icon: Workflow, title: 'Fits existing workflow', text: 'No new hardware on the monitoring layer and no IT integration required to start capturing signal.' },
  { icon: Zap, title: 'Same-day deployment', text: 'Stand up on existing infrastructure with a ₹0 CAPEX model and predictable operating cost.' }
];

const STATS = [
  { to: 98, suffix: '%', label: 'CV extraction accuracy' },
  { to: 2, prefix: '<', suffix: 's', label: 'Monitor to clinical output' },
  { to: 15, suffix: '+', label: 'OEM monitor brands' },
  { to: 100, suffix: 'M+', label: 'Labeled monitor frames' },
  { to: 10, suffix: '+', label: 'Hospital deployments' }
];

const COUNCIL = [
  { name: 'Cardiology', tag: 'CV', icon: HeartPulse },
  { name: 'Pulmonology', tag: 'RESP', icon: Wind },
  { name: 'Sepsis watch', tag: 'INFX', icon: Thermometer },
  { name: 'Neurology', tag: 'NEURO', icon: BrainCircuit },
  { name: 'Renal', tag: 'RENAL', icon: Droplet },
  { name: 'Pharmacology', tag: 'RX', icon: Pill },
  { name: 'Trajectory', tag: 'TREND', icon: TrendingUp },
  { name: 'Evidence', tag: 'CITES', icon: Quote }
];

const TICKER = [
  'HR 78 bpm', 'SpO₂ 97%', 'BP 124 / 78', 'RR 18 /min', 'Temp 37.2°C',
  'Trajectory ↑ stable', 'Council · 8 specialists', 'Risk 12 / 100', 'Source-grounded',
  'Latency < 2s', '98% extraction', 'No new hardware'
];

// Ranked working concerns — mirrors the ASTA AI Pro risk panel.
const RISK_SCENARIOS = [
  { name: 'Acute coronary / arrhythmia concern', pct: 32, status: 'critical' },
  { name: 'Pulmonary edema / fluid overload', pct: 31, status: 'watch' },
  { name: 'Shock / sepsis progression', pct: 29, status: 'watch' },
  { name: 'Medication safety / treatment constraint', pct: 26, status: 'watch' },
  { name: 'Neurologic decline / sedation effect', pct: 18, status: 'watch' },
  { name: 'Renal / metabolic instability', pct: 10, status: 'watch' }
];

/* =========================================================== Brain graph */
// Dummy clinical reasoning graph — mirrors the ASTA software "Brain Graph".
const GRAPH_NODES = [
  { id: 'core', x: 50, y: 50, kind: 'core', label: 'Risk score', value: '85' },
  { id: 'wave', x: 50, y: 13, kind: 'sat', label: 'Waveform reader', tag: 'QUEUED', status: 'ready' },
  { id: 'evidence', x: 79, y: 34, kind: 'sat', label: 'Evidence', tag: 'LIVE', status: '3' },
  { id: 'spec', x: 76, y: 75, kind: 'sat', label: 'Specialists', tag: 'LIVE', status: '8' },
  { id: 'forecast', x: 50, y: 85, kind: 'sat', label: 'Forecast', tag: 'LIVE', status: '0/6' },
  { id: 'risk', x: 24, y: 75, kind: 'sat', label: 'Risk factors', tag: 'LIVE', status: '6' },
  { id: 'chat', x: 21, y: 34, kind: 'sat', label: 'ASTA chat', tag: 'READY', status: 'open' },
  { id: 'd1', x: 36, y: 30, kind: 'dim' },
  { id: 'd2', x: 64, y: 29, kind: 'dim' },
  { id: 'd3', x: 69, y: 58, kind: 'dim' },
  { id: 'd4', x: 39, y: 65, kind: 'dim' },
  { id: 'd5', x: 31, y: 52, kind: 'dim' },
  { id: 'd6', x: 60, y: 68, kind: 'dim' },
  { id: 'd7', x: 50, y: 34, kind: 'dim' },
  { id: 'd8', x: 63, y: 46, kind: 'dim' }
];
const GRAPH_EDGES = [
  // core spokes
  ['core', 'wave', 1], ['core', 'evidence', 1], ['core', 'spec', 0], ['core', 'forecast', 1],
  ['core', 'risk', 1], ['core', 'chat', 0], ['core', 'd7', 0], ['core', 'd8', 0],
  ['core', 'd5', 0], ['core', 'd6', 0],
  // outer ring between satellites
  ['wave', 'evidence', 0], ['evidence', 'spec', 0], ['spec', 'forecast', 0],
  ['forecast', 'risk', 0], ['risk', 'chat', 0], ['chat', 'wave', 0],
  // satellite -> nearby dim nodes
  ['wave', 'd2', 0], ['wave', 'd7', 0], ['evidence', 'd2', 0], ['evidence', 'd3', 0],
  ['evidence', 'd8', 1], ['spec', 'd3', 1], ['spec', 'd6', 0], ['forecast', 'd6', 0],
  ['forecast', 'd4', 0], ['risk', 'd4', 1], ['risk', 'd5', 0], ['chat', 'd5', 0],
  ['chat', 'd1', 0], ['chat', 'd7', 0],
  // dim web
  ['d1', 'd7', 0], ['d8', 'd3', 0], ['d7', 'd2', 0], ['d2', 'd8', 0], ['d8', 'd6', 0],
  ['d6', 'd4', 0], ['d4', 'd5', 0], ['d5', 'd1', 0], ['d1', 'd2', 0]
];
const nodeById = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));

function BrainGraph() {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.4 });
  const ry = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.4 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 18);
    tiltX.set(-py * 18);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };
  return (
    <div className="as-graph" aria-hidden="true" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="as-graph-head">
        <span><i className="as-live-dot" /> ASTA BRAIN GRAPH · LIVE</span>
        <em>council · 8 specialists</em>
      </div>
      <motion.div className="as-graph-stage" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}>
        <svg className="as-graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="edge-gold" x1="0" x2="1">
              <stop offset="0" stopColor="#f5c75d" stopOpacity="0" />
              <stop offset="0.5" stopColor="#f5c75d" />
              <stop offset="1" stopColor="#f5c75d" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="edge-mint" x1="0" x2="1">
              <stop offset="0" stopColor="#7db8ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7db8ff" />
              <stop offset="1" stopColor="#7db8ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {GRAPH_EDGES.map(([a, b, gold], i) => {
            const from = nodeById[a];
            const to = nodeById[b];
            return (
              <line
                key={`base-${i}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                className={`as-edge ${gold ? 'gold' : ''}`}
              />
            );
          })}
          {GRAPH_EDGES.filter((e) => e[2]).map(([a, b], i) => {
            const from = nodeById[a];
            const to = nodeById[b];
            const len = Math.hypot(to.x - from.x, to.y - from.y);
            return (
              <motion.line
                key={`flow-${i}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="url(#edge-gold)"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray={`${len * 0.28} ${len}`}
                initial={{ strokeDashoffset: len * 1.28 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.4 + (i % 3) * 0.6, repeat: Infinity, ease: 'linear', delay: i * 0.25 }}
              />
            );
          })}
        </svg>

        {GRAPH_NODES.map((n, i) => {
          if (n.kind === 'dim') {
            return (
              <motion.span
                key={n.id}
                className="as-node as-node-dim"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.25, 1] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
              />
            );
          }
          if (n.kind === 'core') {
            return (
              <motion.div
                key={n.id}
                className="as-node as-node-core"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="as-core-ring" />
                <span className="as-core-ring two" />
                <div className="as-core-face">
                  <em>{n.label}</em>
                  <strong>{n.value}</strong>
                  <small>critical state</small>
                </div>
              </motion.div>
            );
          }
          return (
            <motion.div
              key={n.id}
              className="as-node as-node-sat"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <span className="as-sat-dot" />
              <div className="as-sat-chip">
                <i>{n.tag}</i>
                <b>{n.label}</b>
                <u>{n.status}</u>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="as-graph-foot">
        <EcgLine height={56} duration={3} />
        <div className="as-graph-vitals">
          {[['HR', '118'], ['SpO₂', '92'], ['RR', '24']].map(([k, v]) => (
            <span key={k}><em>{k}</em> {v}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================= Hero */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const graphLift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" className="as-hero" ref={ref}>
      <div className="as-hero-grid-bg" aria-hidden="true" />
      <motion.div className="as-hero-orb" style={{ y: lift }} aria-hidden="true" />
      <motion.div className="as-hero-inner" style={{ opacity: fade }}>
        <Reveal as="div" className="as-eyebrow" immediate>
          <span className="as-dot" /> <Scramble as="span" text="Source-grounded clinical intelligence" />
        </Reveal>
        <SplitText as="h1" className="as-hero-title" text="A clinical brain for the ward you already run." immediate />
        <Reveal delay={0.25} className="as-hero-sub" immediate>
          <p>
            ASTA reads your existing bedside monitors with computer vision, runs a council of specialist models, and
            returns trajectory-aware, source-grounded alerts — no new hardware, no IT integration.
          </p>
        </Reveal>
        <Reveal delay={0.38} className="as-hero-cta" immediate>
          <MagneticButton href="#contact" variant="primary">
            Request demo <ArrowRight size={17} />
          </MagneticButton>
          <MagneticButton href="#film" variant="ghost">
            Watch the film <Play size={15} />
          </MagneticButton>
        </Reveal>
        <Reveal delay={0.5} className="as-hero-mini" immediate>
          {['98% CV accuracy', '<2s latency', '15+ OEM monitors'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </Reveal>
      </motion.div>

      <motion.div className="as-hero-visual" style={{ opacity: fade, y: graphLift }}>
        <BrainGraph />
      </motion.div>

      <div className="as-scrollcue" aria-hidden="true"><span /></div>
    </section>
  );
}

/* ============================================================ Pipeline (H) */
function HorizontalPipeline() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !track.current) return undefined;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.as-pipe-card', track.current);
      const total = track.current.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${total + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      // Title words start hidden; they rise in (GSAP stagger) when lit.
      const allWords = track.current.querySelectorAll('.as-pipe-title .w > span');
      gsap.set(allWords, { yPercent: 110, opacity: 0 });

      // Each card lights up + animates its title as it crosses the centre.
      cards.forEach((card) => {
        const words = card.querySelectorAll('.as-pipe-title .w > span');
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tween,
          start: 'left 80%',
          end: 'right 20%',
          onToggle: (self) => {
            card.classList.toggle('is-lit', self.isActive);
            if (self.isActive) {
              gsap.to(words, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out' });
            }
          }
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="as-pipe" ref={section} id="how">
      <NeuralField className="as-pipe-neural" />
      <div className="as-pipe-track" ref={track}>
        <div className="as-pipe-panel as-pipe-intro">
          <div className="as-pipe-intro-inner">
            <span className="as-kicker">From pixels to clinical action</span>
            <h2>Five stages, screen to decision.</h2>
            <p>Scroll to move through the signal flow →</p>
          </div>
        </div>
        {PIPELINE.map((step) => {
          const Icon = step.icon;
          return (
            <div className="as-pipe-panel" key={step.n}>
              <div className="as-pipe-card">
                <span className="as-pipe-ghost">{step.n}</span>
                <div className="as-pipe-top">
                  <span className="as-pipe-badge"><Icon size={26} /></span>
                  <span className="as-pipe-num">STAGE {step.n}</span>
                </div>
                <h3 className="as-pipe-title">
                  {step.title.split(' ').map((w, i) => (
                    <span className="w" key={`${w}-${i}`}><span>{w}</span></span>
                  ))}
                </h3>
                <p>{step.text}</p>
                <div className="as-pipe-foot">
                  <div className="as-pipe-line"><i /></div>
                  <span className="as-pipe-step">{step.n} / 05</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================ Story stack */
function StoryStack() {
  return (
    <section className="as-story" id="why">
      <div className="as-shell">
        <Reveal className="as-story-head" variant="left">
          <span className="as-kicker">Why ASTA</span>
          <ClipText as="h2" text="The data is already on the screen. We stopped throwing it away." />
        </Reveal>
        <div className="as-story-cards">
          {STORY.map((card, i) => (
            <article className="as-story-card" key={card.title} style={{ '--accent': card.accent, top: `${110 + i * 26}px` }}>
              <div className="as-story-card-inner">
                <span className="as-story-eyebrow">{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="as-story-index">{String(i + 1).padStart(2, '0')} / 03</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================= Capabilities */
function Capabilities() {
  return (
    <section className="as-cap" id="platform">
      <NeuralField className="as-cap-neural" />
      <div className="as-shell">
        <div className="as-cap-head">
          <Reveal>
            <span className="as-kicker">Platform capabilities</span>
            <SplitText as="h2" text="Everything a ward needs, layered on the monitors it already runs." />
          </Reveal>
          <Reveal delay={0.12} className="as-cap-lead">
            <p>One intelligence layer for monitoring, alerting, visibility, compliance, integration, and deployment.</p>
          </Reveal>
        </div>
        <div className="as-cap-grid">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.08} variant="scale">
                <SpotlightCard className="as-cap-card">
                  <motion.span
                    className="as-cap-icon"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  >
                    <Icon size={22} />
                  </motion.span>
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

/* ================================================================ Stats */
function Stats() {
  return (
    <section className="as-stats">
      <Parallax className="as-stats-glow" amount={40} />
      <div className="as-shell as-stats-row">
        {STATS.map((s) => (
          <Reveal key={s.label} className="as-stat">
            <div className="as-stat-value">
              <Counter to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} />
            </div>
            <div className="as-stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================== Deployment */
function Deployment() {
  const cards = [
    { k: '₹0', t: 'CAPEX to start', d: 'No capital purchase. A predictable operating model on infrastructure the hospital already owns.' },
    { k: 'Same day', t: 'Deployment window', d: 'Point a camera, calibrate, capture. No monitor changeover and no IT integration on the monitoring layer.' },
    { k: '0', t: 'New devices on the wall', d: 'Clinicians keep their workflow and their monitors. ASTA is the intelligence layer behind them.' }
  ];
  return (
    <section className="as-deploy" id="solutions">
      <div className="as-shell as-deploy-grid">
        <Reveal className="as-deploy-copy">
          <span className="as-kicker">Deployment model</span>
          <ClipText as="h2" text="Built to land in the ward this week, not next budget cycle." />
          <p>The monitoring layer needs no new hardware and no integration, so clinical value starts the day a camera goes up.</p>
          <MagneticButton href="#contact" variant="ghost">Talk to the team <ArrowRight size={16} /></MagneticButton>
        </Reveal>
        <div className="as-deploy-cards">
          {cards.map((c, i) => (
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

/* ============================================================= Partners */
function Partners() {
  return (
    <section className="as-partners" id="trust">
      <NeuralField className="as-partners-neural" />
      <div className="as-shell">
        <Reveal className="as-partners-head">
          <span className="as-kicker center">Institutional trust</span>
          <CharReveal as="h2" className="as-partners-title" text="Backed by India’s innovation ecosystem." />
        </Reveal>
        <div className="as-partners-grid">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} variant="scale">
              <motion.div
                className="as-logo-card"
                whileHover={{ y: -8, rotateX: 6, rotateY: -6 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              >
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

/* ============================================================ Hospitals */
function Hospitals() {
  return (
    <section className="as-hospitals" id="hospitals">
      <div className="as-shell as-hospitals-head">
        <Reveal>
          <span className="as-kicker">Deployed in the field</span>
          <Scramble as="h2" text="Live in wards across India." />
        </Reveal>
        <Reveal delay={0.12} className="as-hospitals-lead">
          <p>Running in real hospitals and clinics — not a lab demo.</p>
        </Reveal>
      </div>
      <LogoMarquee logos={HOSPITALS} speed={46} />
      <LogoMarquee logos={[...HOSPITALS].reverse()} speed={56} reverse />
    </section>
  );
}

/* =============================================================== Council */
function Council() {
  return (
    <section className="as-council" id="council">
      <NeuralField className="as-council-neural" />
      <div className="as-shell as-council-grid">
        <div className="as-council-copy">
          <Reveal>
            <Scramble as="span" className="as-kicker" text="The ASTA brain" />
            <CharReveal as="h2" text="A council of specialists, not one black box." />
          </Reveal>
          <Reveal delay={0.14} className="as-council-lead">
            <p>
              Every reading is debated by a panel of specialist models — cardiology, pulmonology, sepsis, neuro and
              more — then reconciled into one trajectory-aware, source-grounded verdict a clinician can interrogate.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="as-council-consensus">
            <div className="as-consensus-head">
              <span>Council consensus</span>
              <b>87%</b>
            </div>
            <div className="as-consensus-bar">
              <motion.i
                initial={{ width: '0%' }}
                whileInView={{ width: '87%' }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <em>8 of 8 specialists reporting · reconciled in 1.4s</em>
          </Reveal>
        </div>

        <div className="as-council-panel">
          {COUNCIL.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                className="as-council-chip"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* traveling "deliberation" highlight passes through the panel */}
                <motion.span
                  className="as-chip-scan"
                  animate={{ opacity: [0, 0.85, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: COUNCIL.length * 0.45 - 0.9, delay: i * 0.45 }}
                />
                <span className="as-chip-icon"><Icon size={18} /></span>
                <span className="as-chip-text">
                  <i>{c.tag}</i>
                  <b>{c.name}</b>
                </span>
                <span className="as-chip-dot" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========================================================= RiskScenarios */
function RiskScenarios() {
  return (
    <section className="as-risk" id="reasoning">
      <NeuralField className="as-risk-neural" />
      <div className="as-shell as-risk-grid">
        <div className="as-risk-copy">
          <Reveal variant="left">
            <span className="as-kicker">Ranked, not absolute</span>
            <ClipText as="h2" text="ASTA ranks the differential — and shows its work." />
          </Reveal>
          <Reveal variant="left" delay={0.12} className="as-risk-lead">
            <p>
              Every run returns a ranked set of working concerns with calibrated probabilities, a single risk score,
              and the bedside checks that would confirm or rule each one down.
            </p>
          </Reveal>
          <Reveal variant="left" delay={0.22} className="as-risk-score">
            <div className="as-risk-score-face">
              <em>Risk score</em>
              <strong><Counter to={85} /></strong>
            </div>
            <div className="as-risk-score-meta">
              <span className="as-risk-score-tag"><i /> live</span>
              <small>/ 100 · critical state</small>
            </div>
          </Reveal>
        </div>

        <div className="as-risk-list">
          {RISK_SCENARIOS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07} variant="right">
              <div className={`as-risk-row is-${r.status}`}>
                <div className="as-risk-row-head">
                  <span className="as-risk-rank">{String(i + 1).padStart(2, '0')}</span>
                  <b>{r.name}</b>
                  <span className="as-risk-status">{r.status}</span>
                </div>
                <div className="as-risk-row-bar">
                  <div className="as-risk-bar">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.pct}%` }}
                      viewport={{ once: true, margin: '-12% 0px' }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <em><Counter to={r.pct} suffix="%" /></em>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ Ticker */
function Ticker() {
  return (
    <div className="as-ticker" aria-hidden="true">
      <Marquee items={TICKER} speed={32} />
    </div>
  );
}

/* ========================================================= Video reveal */
function VideoReveal() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.62, 1, 1.04]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [60, 18]);
  const clip = useTransform(scrollYProgress, [0.05, 0.45], [88, 0]);
  const clipPath = useTransform(clip, (v) => `inset(${v}% ${v / 2}% round 18px)`);
  const dark = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, -10]);

  // Lazy-load + play only while in view: the source is attached on approach
  // (not at page load), so the video file isn't fetched until you're near it.
  // Saves bandwidth/CPU and noticeably lightens initial load — esp. on mobile.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = '/Landing_Video.mp4';
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25, rootMargin: '200px 0px' }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="as-film" id="film" ref={ref}>
      <motion.div className="as-film-caption" style={{ y: titleY }}>
        <span className="as-kicker center">See it move</span>
        <CharReveal as="h2" className="as-film-title" text="From a glowing screen to a decision — in motion." />
      </motion.div>
      <motion.div className="as-film-frame" style={{ scale, borderRadius: radius, clipPath }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
        />
        <motion.div className="as-film-veil" style={{ opacity: dark }} />
        <div className="as-film-glow" aria-hidden="true" />
      </motion.div>
    </section>
  );
}

/* ================================================================== CTA */
function CTA() {
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

/* ================================================================= Page */
export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <PoweredBy />
      <Partners />
      <HorizontalPipeline />
      <StoryStack />
      <Council />
      <RiskScenarios />
      <VideoReveal />
      <Ticker />
      <Capabilities />
      <Stats />
      <Hospitals />
      <Deployment />
      <CTA />
    </SiteShell>
  );
}
