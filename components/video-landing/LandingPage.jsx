'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  DatabaseZap,
  FileCheck2,
  GitBranch,
  HeartPulse,
  Layers3,
  Mail,
  MapPin,
  MessageSquareText,
  Monitor,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow
} from 'lucide-react';
import {
  advisors,
  heroPills,
  lanes,
  navItems,
  pipeline,
  platformStats,
  productPanels,
  revealTabs,
  storyCards,
  team,
  trustCards,
  useCases,
  vitals
} from './content.js';
import {
  AnimatedCounter,
  GradientLine,
  MagneticButton,
  MouseHalo,
  Orbit,
  Reveal,
  ScrollPinLine,
  ScrollProgress,
  SectionLabel,
  SplitText,
  SpotlightCard,
  Ticker,
  TiltCard
} from './react-bits.jsx';

const iconMap = [Monitor, Layers3, HeartPulse, FileCheck2, GitBranch, ShieldCheck];

// Mobile detection for trimming background animation on small screens.
function useIsMobile(query = '(max-width: 768px)') {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return isMobile;
}

function Shell({ children }) {
  const isMobile = useIsMobile();
  // Far fewer particles on mobile, and no scroll-linked scale (saves a per-frame update each).
  const particleCount = isMobile ? 14 : 52;
  const backgroundParticles = useMemo(
    () => Array.from({ length: particleCount }, (_, i) => ({ id: i, left: (i * 37) % 100, top: (i * 61) % 100, delay: (i % 9) * 0.37 })),
    [particleCount]
  );
  const { scrollYProgress } = useScroll();
  const glowScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <>
      <ScrollProgress />
      {!isMobile && <MouseHalo />}
      <div className="ambient-particles" aria-hidden="true">
        {backgroundParticles.map((dot) => (
          <motion.span
            key={dot.id}
            style={{ left: `${dot.left}%`, top: `${dot.top}%`, ...(isMobile ? null : { scale: glowScale }) }}
            animate={{ opacity: [0.18, 0.85, 0.18], y: [0, -18, 0] }}
            transition={{ duration: 5 + (dot.id % 5), repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </div>
      <Header />
      {children}
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="/" className="brand" aria-label="ASTA Health Tech home">
        <img src="/logo-asta.png" alt="ASTA Health Tech" />
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="login-btn" href="https://web.astahealthtech.co.in/user/login" target="_blank" rel="noreferrer">
          Login
        </a>
        <a className="demo-btn" href="/#contact">
          Request demo <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}

function Waveform({ compact = false }) {
  return (
    <svg className={`waveform ${compact ? 'compact' : ''}`} viewBox="0 0 360 96" role="img" aria-label="ECG waveform">
      <defs>
        <linearGradient id={`wave-${compact ? 'compact' : 'normal'}`} x1="0" x2="1">
          <stop stopColor="#76f5dc" offset="0" />
          <stop stopColor="#f6c65d" offset="1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 55 L44 55 L52 50 L61 58 L73 58 L82 18 L94 80 L109 55 L139 55 L150 52 L162 55 L178 55 L189 42 L202 63 L215 55 L256 55 L268 54 L278 49 L287 59 L302 55 L360 55"
        fill="none"
        stroke={`url(#wave-${compact ? 'compact' : 'normal'})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: [0.15, 1, 0.15], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M0 55 L360 55" stroke="rgba(255,255,255,.08)" strokeDasharray="5 10" />
    </svg>
  );
}

function HeroConsole() {
  return (
    <TiltCard className="hero-console grid-surface">
      <div className="console-head">
        <div>
          <span>LIVE WARD SIGNAL</span>
          <p>Clinical cockpit built from monitor context</p>
        </div>
        <strong><span /> reading</strong>
      </div>
      <div className="console-grid">
        <div className="signal-panel">
          <div className="panel-row muted"><span>BED 14 · STEP-DOWN</span><span>00:42</span></div>
          <Waveform />
          <div className="mini-metrics">
            <span>SpO₂ 92</span>
            <span>HR 118</span>
            <span>RR 24</span>
          </div>
          <div className="patient-packet">
            <h4>PATIENT PACKET</h4>
            {['vitals trend', 'labs', 'medication context', 'missing checks'].map((item, i) => (
              <div key={item} className="packet-line">
                <span>{item}</span>
                <motion.i animate={{ scaleX: [0.3, 1, 0.45] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.25 }} />
              </div>
            ))}
          </div>
        </div>
        <div className="council-panel">
          <div className="panel-row muted"><span>COUNCIL COMPRESSOR</span><span>EXPLAINABLE</span></div>
          <Orbit items={['Pulse', 'Aegis', 'Atlas', 'Nyra', 'Lumen']} />
          {['Pulse', 'Aegis', 'Atlas', 'Nyra'].map((item, i) => (
            <motion.div
              key={item}
              className="lane-strip"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.14 }}
            >
              <span>{item}</span>
              <em>{['trend direction', 'safety guard', 'context map', 'source lane'][i]}</em>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="console-foot">
        <div><span>ACTIVE LANE</span><strong>Acute coronary / arrhythmia</strong></div>
        <div><span>EVIDENCE</span><strong>source cards + counter-signals</strong></div>
        <div><span>NEXT CHECK</span><strong>ECG, electrolytes, clinician review</strong></div>
      </div>
    </TiltCard>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.45]);

  return (
    <section id="top" className="hero section dark-section">
      <motion.div className="hero-bg-orb" style={{ y, opacity }} />
      <div className="container hero-grid">
        <Reveal className="hero-copy" y={26}>
          <SectionLabel icon={<Sparkles size={15} />}>Clinical brain for hospital wards</SectionLabel>
          <SplitText as="h1" text="Clinical intelligence from noise." />
          <p>
            ASTA reads live monitor context, builds a patient packet, and gives clinicians ranked lanes, source support,
            missing checks, and audit-ready reasoning.
          </p>
          <div className="hero-actions">
            <MagneticButton href="/#contact">Request Demo <ArrowRight size={17} /></MagneticButton>
            <MagneticButton href="/#platform" variant="ghost">See the platform <ChevronRight size={17} /></MagneticButton>
          </div>
          <div className="pill-grid">
            {heroPills.map((pill) => (
              <span key={pill}><CheckCircle2 size={15} /> {pill}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.14} y={24}>
          <HeroConsole />
        </Reveal>
      </div>
      <Ticker items={['monitor vision', 'patient packet', 'specialist lanes', 'source cards', 'missing checks', 'clinician review']} />
    </section>
  );
}

function SignalSection() {
  return (
    <section id="platform" className="section signal-section dark-section">
      <div className="container split-grid">
        <Reveal>
          <SectionLabel icon={<Activity size={15} />}>Monitor to reason</SectionLabel>
          <SplitText text="From bedside signal to reviewable output." />
          <p className="lead">
            ASTA turns monitor context into a patient packet, routes it through specialist lanes, attaches source support,
            and renders the reasoning as a clinician-reviewable artifact.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <SpotlightCard className="monitor-card grid-surface">
            <div className="monitor-header">
              <span>ASTA · Clinical Intelligence · Ward 4 · ICU-04</span>
              <strong>09:42:31 LIVE</strong>
            </div>
            <Waveform />
            <div className="vital-grid">
              {vitals.map((vital) => (
                <div key={vital.label} className="vital-tile">
                  <span>{vital.label} <em>NORMAL</em></span>
                  <strong>{vital.value}<small>{vital.unit}</small></strong>
                  <i>{vital.range}</i>
                </div>
              ))}
            </div>
            <div className="analysis-row">
              <div><span>Risk score</span><strong>0.04</strong><em>Low</em></div>
              <div><span>Trend</span><strong>Stable</strong><em>30 min window</em></div>
              <div><span>Rhythm</span><strong>NSR</strong><em>Normal sinus</em></div>
            </div>
            <div className="log-lines">
              {['09:42:31 trend window · risk=0.04 · stable', '09:42:26 audit logged · role=nurse · ok', '09:42:19 alert routed · dest=nurse_stn', '09:42:17 vitals ingested · latency=340ms'].map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
      <div className="container stat-row">
        {platformStats.map((stat) => <AnimatedCounter key={stat.label} {...stat} />)}
      </div>
    </section>
  );
}

function StoryStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);

  return (
    <section className="story-section dark-section" ref={ref}>
      <ScrollPinLine />
      <motion.div className="story-gold-orb" style={{ y: orbY }} aria-hidden="true" />
      <div className="container story-stack">
        {storyCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08} className="story-card-wrap">
            <SpotlightCard className="story-card grid-surface" intensity={0.12}>
              <div className="story-topline"><span>{card.eyebrow}</span><em>{card.number}</em></div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="story-sees">
                <span>Clinician sees</span>
                <strong>{card.sees}</strong>
              </div>
              <small>scroll to illuminate</small>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClinicalBrain() {
  const [active, setActive] = useState(3);
  const ActiveIcon = iconMap[active] || BrainCircuit;

  return (
    <section id="solutions" className="section brain-section dark-section">
      <div className="container brain-grid">
        <Reveal className="brain-copy">
          <SectionLabel icon={<BrainCircuit size={15} />}>Clinical brain hologram</SectionLabel>
          <SplitText text="The clinical brain shows how ASTA reasons through a ward case." />
          <p className="lead">
            It is a source-grounded clinical intelligence layer that moves a patient packet through monitor vision,
            trend support, knowledge retrieval, specialist lanes, and clinician-facing output.
          </p>
          <div className="pipeline-list">
            {pipeline.map((step, i) => {
              const Icon = iconMap[i] || Layers3;
              return (
                <motion.button
                  type="button"
                  key={step.title}
                  className={active === i ? 'active' : ''}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={21} />
                  <span>
                    <em>{step.eyebrow}</em>
                    <strong>{step.title}</strong>
                    <small>{step.text}</small>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="hologram grid-surface">
            <motion.div className="holo-node central" animate={{ rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
              <BrainCircuit size={58} />
            </motion.div>
            {[Monitor, DatabaseZap, HeartPulse, GitBranch, ClipboardCheck, ShieldCheck].map((Icon, i) => (
              <motion.div
                className={`holo-node n${i}`}
                key={i}
                animate={{ y: [0, -14, 0], scale: active === i ? 1.25 : 1 }}
                transition={{ repeat: Infinity, duration: 4 + i * 0.25, delay: i * 0.14 }}
              >
                <Icon size={26} />
              </motion.div>
            ))}
            <svg className="holo-paths" viewBox="0 0 620 520" aria-hidden="true">
              <defs>
                <linearGradient id="holo-stroke" x1="0" x2="1">
                  <stop stopColor="#76f5dc" offset="0" />
                  <stop stopColor="#f6c65d" offset="1" />
                </linearGradient>
              </defs>
              <motion.path d="M110 310 C180 160, 265 160, 310 260 C345 340, 445 210, 515 320" pathLength="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2 }} />
              <motion.path d="M160 365 C250 450, 410 420, 500 360" pathLength="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.4 }} />
              <motion.path d="M310 80 C250 175, 345 305, 310 440" pathLength="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.6 }} />
            </svg>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="holo-detail"
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
              >
                <span>{pipeline[active].eyebrow}</span>
                <h3>{pipeline[active].title}</h3>
                <p>{pipeline[active].text}</p>
                <div>{pipeline[active].tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
                <ActiveIcon size={30} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpecialistLanes() {
  return (
    <section className="section lanes-section dark-section">
      <div className="container lanes-head">
        <Reveal>
          <SplitText text="Specialist lanes click into one reviewable council output." />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lead">
            The visual metaphor is a set of specialized packets moving through controlled gates. Each packet has a role,
            a source trail, and an uncertainty posture before it becomes clinician-facing output.
          </p>
        </Reveal>
      </div>
      <div className="container lane-cards">
        {lanes.map((lane, i) => (
          <Reveal key={lane.name} delay={i * 0.06}>
            <SpotlightCard className="lane-card">
              <span>PACKET {i + 1}</span>
              <h3>{lane.name}</h3>
              <em>{lane.subtitle}</em>
              <GradientLine />
              <p>{lane.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ReasoningConsole() {
  const [tab, setTab] = useState(1);
  const current = revealTabs[tab];

  return (
    <section className="section reasoning-section dark-section">
      <div className="container reasoning-grid">
        <Reveal>
          <SectionLabel icon={<Workflow size={15} />}>Reasoning reveal console</SectionLabel>
          <SplitText text="The reasoning opens into why, what confirms, and what is missing." />
          <p className="lead">
            This section is interactive: hover creates a light lens, tabs transform the output panel, and the SVG route redraws.
            It is a better wow factor because it shows the actual ASTA promise.
          </p>
          <div className="tab-list" role="tablist" aria-label="Reasoning tabs">
            {revealTabs.map((item, i) => (
              <button key={item.tab} type="button" onClick={() => setTab(i)} onMouseEnter={() => setTab(i)} className={tab === i ? 'active' : ''}>
                {item.tab} <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="reason-card grid-surface">
            <div className="packet-column">
              {['Patient packet', 'Evidence source', 'Missing check'].map((group, i) => (
                <SpotlightCard className={`mini-stack ${i === tab % 3 ? 'active' : ''}`} key={group} intensity={0.12}>
                  <span>{group}</span>
                  {['monitor trend', 'labs + meds', 'clinical question'].map((line, j) => (
                    <p key={line}>{i === 1 ? ['source card', 'counter-signal', 'review note'][j] : i === 2 ? ['latest lab', 'exam detail', 'waveform gap'][j] : line}<em /></p>
                  ))}
                </SpotlightCard>
              ))}
            </div>
            <div className="answer-column">
              <Waveform compact />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.heading}
                  className="answer-panel"
                  initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.38 }}
                >
                  <span>{current.badge}</span>
                  <h3>{current.heading}</h3>
                  <p>{current.text}</p>
                  <div className="check-row">
                    {['repeat vitals', 'latest lab', 'clinical exam detail'].map((item) => <em key={item}>{item}</em>)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductTheater() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const screenX = useTransform(scrollYProgress, [0, 1], ['7%', '-7%']);
  const screenScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const screenGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.5]);

  return (
    <section ref={ref} className="section theater-section light-section">
      <div className="container theater-grid">
        <Reveal>
          <SectionLabel light icon={<MessageSquareText size={15} />}>Full-screen product theater</SectionLabel>
          <SplitText text="The reasoning resolves into a handoff the clinician can question." />
          <p className="dark-lead">
            ASTA conversation view keeps source-aligned support, patient signals, missing data, and governance notes visible
            with memory-aware clinical context.
          </p>
          <div className="light-callouts">
            <div><span>ASTA sees</span><strong>source-aligned handoff</strong></div>
            <div><span>Clinician gets</span><strong>a conversation they can question</strong></div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <motion.div className="clinical-conversation" style={{ x: screenX, scale: screenScale, opacity: screenGlow }}>
            <div className="screen-top"><span>ASTA AI</span><strong>Clinical conversation</strong><em>Memory on · 1 answer</em></div>
            <p className="conversation-main">
              The patient's presentation is most consistent with an acute coronary/arrhythmia concern (32% support),
              though monitor artifact/image quality risk and pulmonary edema/fluid overload are also possibilities.
            </p>
            <div className="evidence-box">
              <strong>NICE-aligned decision support</strong>
              <p>The response is anchored to current patient signals, source cards, and missing checks for bedside relevance.</p>
              <span>High Support</span>
            </div>
            <div className="accordion-grid">
              {['Patient signals', 'Model outputs', 'Supporting evidence', 'Missing data', 'Recommended checks', 'Safety limits'].map((item) => (
                <motion.div key={item} whileHover={{ x: 6 }}>{item}</motion.div>
              ))}
            </div>
            <small>Governance · Audit 2ee5729132ea87ed · india-south · /edge/medgemma-27b-text-it</small>
          </motion.div>
        </Reveal>
      </div>
      <div className="scroll-ribbon"><span>Scroll</span><b>Screens move left to right</b></div>
    </section>
  );
}

function TrustSection() {
  return (
    <section id="trust" className="section trust-section light-section">
      <div className="container section-title-row">
        <Reveal>
          <SectionLabel light icon={<Building2 size={15} />}>Trust constellation</SectionLabel>
          <SplitText text="Backed by India’s foremost innovation ecosystem." />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="dark-lead">
            ASTA is supported by national incubation programs, government innovation mandates, and leading research
            institutions — validating clinical credibility at every layer.
          </p>
        </Reveal>
      </div>
      <div className="container trust-grid">
        {trustCards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.06}>
            <SpotlightCard className="trust-card light-card">
              <span>{card.meta}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="section usecase-section dark-section">
      <div className="container usecase-grid">
        <Reveal>
          <SectionLabel icon={<GitBranch size={15} />}>Use-case helix</SectionLabel>
          <SplitText text="The use cases orbit the same clinical reasoning core." />
          <p className="lead">
            Ward escalation, medication safety, artifact review, and sparse-patient cases all pass through the same
            source-grounded reasoning system.
          </p>
        </Reveal>
        <div className="usecase-cards">
          {useCases.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <TiltCard className="usecase-card">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductLandingSection() {
  return (
    <section className="section product-landing light-section">
      <div className="container section-title-row">
        <Reveal>
          <SectionLabel light icon={<ShieldCheck size={15} />}>Clinical seriousness after the spectacle</SectionLabel>
          <SplitText text="The product experience lands in screens the ward can use." />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="dark-lead">
            The landing page moves from cinematic reasoning into practical product surfaces: ward view, risk review,
            and a conversation that keeps clinical support inspectable.
          </p>
        </Reveal>
      </div>
      <div className="container product-panel-grid">
        {productPanels.map((panel, index) => (
          <Reveal delay={index * 0.06} key={panel.title}>
            <SpotlightCard className="product-panel-card light-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
              <GradientLine />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-wrap">
      <div className="about-hero dark-section">
        <Reveal>
          <SectionLabel icon={<Sparkles size={15} />}>About</SectionLabel>
          <SplitText text="About ASTA Health Tech" />
          <p>
            We are building a practical clinical brain for hospital wards: monitor context, evidence, specialist signals,
            missing checks, and clinician review.
          </p>
        </Reveal>
      </div>
      <div className="section about-team light-section">
        <div className="container about-intro">
          <Reveal>
            <SectionLabel light icon={<Sparkles size={15} />}>Team constellation</SectionLabel>
            <SplitText text="Clinical, AI, product, and deployment experience in one company." />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="dark-lead">
              ASTA brings together clinical leadership, AI product engineering, business execution, and advisory depth for
              hospital-facing clinical intelligence.
            </p>
          </Reveal>
        </div>
        <div className="container people-block">
          <h3>Founding and operating team</h3>
          <div className="people-grid">
            {team.map((person) => <PersonCard key={person.name} person={person} />)}
          </div>
          <h3>Advisory board</h3>
          <div className="people-grid small">
            {advisors.map((person) => <PersonCard key={person.name} person={person} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonCard({ person }) {
  return (
    <Reveal>
      <motion.article className="person-card" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 230, damping: 22 }}>
        <img src={person.img} alt={person.name} style={person.imgPosition ? { objectPosition: person.imgPosition } : undefined} />
        <div>
          <h4>{person.name}</h4>
          <span>{person.role}</span>
          <p>{person.text}</p>
          <a href={person.profile} target="_blank" rel="noreferrer">Profile</a>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact-section dark-section">
      <div className="container contact-grid">
        <Reveal>
          <img className="footer-logo" src="/logo-asta.png" alt="ASTA Health Tech" />
          <SplitText text="See ASTA reading live ward monitors." />
          <p className="lead">
            A focused 30-minute session with the clinical and engineering team, covering monitor compatibility, ward workflow fit,
            and deployment requirements for your unit.
          </p>
          <div className="hero-actions">
            <MagneticButton href="mailto:info@astahealthtech.com">Email ASTA <ArrowRight size={17} /></MagneticButton>
            <MagneticButton variant="ghost" href="https://wa.me/918779404951">WhatsApp <ChevronRight size={17} /></MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <SpotlightCard className="contact-card grid-surface">
            <span>Inquiry portal · ASTA Health Tech Corporation</span>
            <h3>Response &lt; 24h</h3>
            <a href="mailto:info@astahealthtech.com"><Mail size={18} /> info@astahealthtech.com</a>
            <a href="tel:+918779404951"><Phone size={18} /> +91 87794 04951</a>
            <p><MapPin size={18} /> Kaveri Regent Coronet, Aurbis Prime, 11, 80 Feet Rd, 3rd Block, Koramangala, Bengaluru, Karnataka 560034</p>
            <div className="mini-steps">
              {['ASTA reviews your context', 'Initial fit conversation', 'Product walkthrough', 'Deployment review'].map((item, i) => <em key={item}>{String(i + 1).padStart(2, '0')} · {item}</em>)}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 ASTA Health Tech Corporation. All rights reserved.</span>
        <span>Platform live · 24/7 · Hospital-controlled intelligence</span>
      </div>
    </footer>
  );
}

export function AboutRoute() {
  return (
    <Shell>
      <main>
        <About />
      </main>
      <Contact />
    </Shell>
  );
}

export function ContactRoute() {
  return (
    <Shell>
      <main className="contact-route-spacer" />
      <Contact />
    </Shell>
  );
}

export default function LandingPage() {
  return (
    <Shell>
      <main>
        <Hero />
        <SignalSection />
        <StoryStack />
        <ClinicalBrain />
        <SpecialistLanes />
        <ReasoningConsole />
        <ProductTheater />
        <TrustSection />
        <UseCases />
        <ProductLandingSection />
        <About />
      </main>
      <Contact />
    </Shell>
  );
}
