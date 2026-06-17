'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate
} from 'motion/react';

const EASE = [0.16, 1, 0.3, 1];

/* ----------------------------------------------------------- mobile hook */
// Animating CSS `filter: blur()` forces a per-frame repaint (it isn't
// GPU-composited like transform/opacity), so blur-based text reveals stutter
// on phone GPUs. We detect mobile and drop the blur there, keeping the motion.
function getIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMobile;
}
function stripBlur(variant) {
  if (!variant || !('filter' in variant)) return variant;
  const { filter, ...rest } = variant;
  return rest;
}

/* ---------------------------------------------------------------- Reveal */
// Variety of entrance animations so the page doesn't feel one-note.
const REVEAL_VARIANTS = {
  up: { hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, shown: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  scale: { hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' }, shown: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  left: { hidden: { opacity: 0, x: -48, filter: 'blur(6px)' }, shown: { opacity: 1, x: 0, filter: 'blur(0px)' } },
  right: { hidden: { opacity: 0, x: 48, filter: 'blur(6px)' }, shown: { opacity: 1, x: 0, filter: 'blur(0px)' } },
  clip: { hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, shown: { opacity: 1, clipPath: 'inset(0 0% 0 0)' } },
  rise: { hidden: { opacity: 0, y: 60, rotateX: 12 }, shown: { opacity: 1, y: 0, rotateX: 0 } }
};
export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div', immediate = false, variant = 'up' }) {
  const ref = useRef(null);
  const inViewState = useInView(ref, { once: true, margin: '-12% 0px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isMobile = useIsMobile();
  const show = immediate ? mounted : inViewState;
  const Tag = motion[as] || motion.div;
  const v = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.up;
  let hidden = variant === 'up' && y !== 28 ? { ...v.hidden, y } : v.hidden;
  let shown = v.shown;
  if (isMobile) {
    hidden = stripBlur(hidden);
    shown = stripBlur(shown);
  }
  return (
    <Tag
      ref={ref}
      className={className}
      initial={hidden}
      animate={show ? shown : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------- SplitText */
export function SplitText({ text, as = 'h2', className = '', delay = 0, immediate = false }) {
  const ref = useRef(null);
  const inViewState = useInView(ref, { once: true, margin: '-10% 0px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const show = immediate ? mounted : inViewState;
  const Tag = motion[as] || motion.h2;
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`as-split ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span className="as-split-word" key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            initial={{ y: '115%', opacity: 0 }}
            animate={show ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: delay + i * 0.045, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------- Scramble */
/**
 * Decode-on-view text: characters cascade in from random glyphs to the
 * real string (left to right). A text animation that doesn't depend on
 * scroll position — fires once when the element enters view.
 */
const SCRAMBLE_GLYPHS = '!<>-_\\/[]{}—=+*^?#__01';
export function Scramble({ text, className = '', as = 'span', speed = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const len = text.length;
    let raf;
    let start;
    const tick = (t) => {
      if (start == null) start = t;
      const elapsed = (t - start) / 1000;
      const revealed = Math.floor(elapsed * speed * len);
      let out = '';
      for (let i = 0; i < len; i += 1) {
        if (text[i] === ' ') out += ' ';
        else if (i < revealed) out += text[i];
        else out += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      }
      setDisplay(out);
      if (revealed < len) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed]);

  const Tag = motion[as] || motion.span;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------ CharReveal */
/** Letters resolve in place from blur + scale (no vertical rise). */
export function CharReveal({ text, as = 'h2', className = '', delay = 0, immediate = false }) {
  const ref = useRef(null);
  const inViewState = useInView(ref, { once: true, margin: '-10% 0px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isMobile = useIsMobile();
  const show = immediate ? mounted : inViewState;
  const Tag = motion[as] || motion.h2;
  const words = text.split(' ');
  // Per-character blur is the heaviest reveal; on mobile keep scale+opacity only.
  const hiddenChar = isMobile ? { opacity: 0, scale: 1.4 } : { opacity: 0, filter: 'blur(12px)', scale: 1.5 };
  const shownChar = isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, filter: 'blur(0px)', scale: 1 };
  let idx = -1;
  return (
    <Tag ref={ref} className={`as-charrev ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="as-cr-word" aria-hidden="true">
            {[...word].map((c, ci) => {
              idx += 1;
              return (
                <motion.span
                  key={ci}
                  initial={hiddenChar}
                  animate={show ? shownChar : {}}
                  transition={{ duration: 0.5, delay: delay + idx * 0.016, ease: EASE }}
                >
                  {c}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------- ClipText */
/** Heading wipes in left-to-right behind a clip mask. */
export function ClipText({ text, as = 'h2', className = '', delay = 0, immediate = false }) {
  const ref = useRef(null);
  const inViewState = useInView(ref, { once: true, margin: '-12% 0px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const show = immediate ? mounted : inViewState;
  const Tag = motion[as] || motion.h2;
  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
      animate={show ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {text}
    </Tag>
  );
}

/* -------------------------------------------------------- MagneticButton */
export function MagneticButton({ children, href = '#contact', variant = 'primary', className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`as-btn as-btn-${variant} ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
    >
      <span>{children}</span>
    </motion.a>
  );
}

/* --------------------------------------------------------- SpotlightCard */
export function SpotlightCard({ children, className = '', tag = 'div' }) {
  const ref = useRef(null);
  const Tag = motion[tag] || motion.div;
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <Tag
      ref={ref}
      className={`as-spot ${className}`}
      onPointerMove={onMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- Counter */
export function Counter({ to, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setVal(v)
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------- Marquee row */
export function Marquee({ items, speed = 30 }) {
  const doubled = [...items, ...items];
  return (
    <div className="as-marquee" aria-hidden="true">
      <motion.div
        className="as-marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------- LogoMarquee */
export function LogoMarquee({ logos, speed = 38, reverse = false }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="as-logos-marquee" aria-hidden="true">
      <motion.div
        className="as-logos-track"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((logo, i) => (
          <span className="as-logo-tile" key={`${logo.name}-${i}`}>
            <img src={logo.src} alt={logo.name} loading="lazy" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------- ECG line */
/**
 * A static ECG trace with a glowing light pulse that TRAVELS along the
 * line (the light moves, not the line). Built from two copies of the same
 * path: a faint base + a short bright dash whose offset animates.
 */
export function EcgLine({ className = '', duration = 3.4, height = 120 }) {
  const d =
    'M0 60 H80 L92 60 L100 52 L110 66 L122 60 H180 L190 60 L198 22 L210 96 L224 60 H300 L312 60 L320 54 L330 66 L342 60 H420 L430 60 L438 30 L450 90 L462 60 H540 L552 60 L560 54 L570 66 L582 60 H660 L672 28 L684 92 L696 60 H760';
  return (
    <svg
      className={`as-ecg ${className}`}
      viewBox={`0 0 760 ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Live ECG signal"
    >
      <defs>
        <linearGradient id="ecg-glow" x1="0" x2="1">
          <stop offset="0" stopColor="#7db8ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7db8ff" />
          <stop offset="1" stopColor="#f5c75d" stopOpacity="0" />
        </linearGradient>
        <filter id="ecg-blur" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>
      {/* faint static baseline trace */}
      <path d={d} className="as-ecg-base" fill="none" pathLength="1000" />
      {/* glowing pulse traveling along the line */}
      <motion.path
        d={d}
        className="as-ecg-pulse"
        fill="none"
        stroke="url(#ecg-glow)"
        filter="url(#ecg-blur)"
        pathLength="1000"
        strokeDasharray="70 930"
        initial={{ strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <motion.path
        d={d}
        className="as-ecg-core"
        fill="none"
        stroke="#eaf3ff"
        pathLength="1000"
        strokeDasharray="14 986"
        initial={{ strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

/* ----------------------------------------------- ScrollLight (neuron) */
/**
 * A soft light that sits near the pointer and illuminates the dark via
 * mix-blend-mode. Overdamped springs => glides smoothly with no jerk /
 * attract-repel overshoot. The big halo follows looser than the core so
 * it reads as light rather than a chasing dot.
 */
export function ScrollLight() {
  // Cursor-follower: useless on touch devices, so skip it on mobile.
  const [enabled, setEnabled] = useState(true);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  // overdamped => smooth, no overshoot. Halo lags softer than the core.
  const haloX = useSpring(x, { stiffness: 90, damping: 30, mass: 0.8 });
  const haloY = useSpring(y, { stiffness: 90, damping: 30, mass: 0.8 });
  const coreX = useSpring(x, { stiffness: 380, damping: 40, mass: 0.5 });
  const coreY = useSpring(y, { stiffness: 380, damping: 40, mass: 0.5 });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (reduce || isMobile) {
      setEnabled(false);
      return undefined;
    }
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.span className="as-neuron-halo" style={{ x: haloX, y: haloY }} aria-hidden="true" />
      <motion.div className="as-neuron" style={{ x: coreX, y: coreY }} aria-hidden="true">
        <span className="as-neuron-ring" />
        <span className="as-neuron-core" />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="as-neuron-synapse"
            animate={{ rotate: 360 }}
            transition={{ duration: 7 + i * 3, repeat: Infinity, ease: 'linear' }}
            style={{ ['--r']: `${24 + i * 11}px` }}
          >
            <i />
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}

/* ------------------------------------------- NeuralCanvas (whole site) */
/**
 * A living neuron network rendered on a single full-viewport canvas that
 * sits behind the entire site. Pitch-black by default; the pointer acts
 * as a torch that lights up nearby nodes + synapses, and signal pulses
 * periodically fire along the connections — lighting the dark for a beat.
 */
export function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Mobile: lighten this always-on canvas (cap FPS + DPR, slower pulses).
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const frameInterval = isMobile ? 1000 / 30 : 0;

    let w = 0;
    let h = 0;
    let nodes = [];
    let edges = [];
    let pulses = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const ILLUM = 230; // torch radius
    const MAXD = 138; // max synapse length

    const build = () => {
      const target = Math.round((w * h) / 17000);
      const count = Math.min(Math.max(target, 36), 140);
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.7,
        tw: Math.random() * Math.PI * 2
      }));
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    const spawnPulse = () => {
      if (!edges.length) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ a: e.a, b: e.b, t: 0, speed: 0.006 + Math.random() * 0.012, gold: Math.random() < 0.28 });
      if (pulses.length > 22) pulses.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      edges = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.tw += 0.02;
        }
      }
      // synapses
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > MAXD * MAXD) continue;
          const d = Math.sqrt(d2);
          edges.push({ a: i, b: j });
          const base = (1 - d / MAXD) * 0.08;
          const mdx = (a.x + b.x) / 2 - mouse.x;
          const mdy = (a.y + b.y) / 2 - mouse.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          const mf = mouse.active ? Math.max(0, 1 - md / ILLUM) : 0;
          const alpha = base + mf * mf * 0.55;
          if (alpha <= 0.012) continue;
          ctx.strokeStyle = `rgba(125, 184, 255,${alpha})`;
          ctx.lineWidth = 0.55 + mf * 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // nodes
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const tw = 0.5 + 0.5 * Math.sin(n.tw);
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const mf = mouse.active ? Math.max(0, 1 - md / ILLUM) : 0;
        const a = 0.06 + tw * 0.08 + mf * mf * 0.88;
        if (mf > 0.05) {
          ctx.shadowColor = 'rgba(125, 184, 255,0.9)';
          ctx.shadowBlur = 12 * mf;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${Math.round(125 + mf * 110)}, ${Math.round(184 + mf * 60)}, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + mf * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // travelling signal pulses
      for (let p = pulses.length - 1; p >= 0; p -= 1) {
        const pu = pulses[p];
        pu.t += pu.speed;
        const a = nodes[pu.a];
        const b = nodes[pu.b];
        if (pu.t >= 1 || !a || !b) {
          pulses.splice(p, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pu.t;
        const y = a.y + (b.y - a.y) * pu.t;
        const col = pu.gold ? '245,199,93' : '190, 215, 255';
        ctx.strokeStyle = `rgba(${col},${0.45 * (1 - pu.t)})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowColor = `rgba(${col},1)`;
        ctx.shadowBlur = 14;
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let raf;
    let pulseTimer;
    let lastFrame = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      // Cap to ~30fps on mobile — invisible for a faint mesh, ~half the work.
      if (frameInterval && now - lastFrame < frameInterval) return;
      lastFrame = now;
      draw();
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onLeave);
    window.addEventListener('resize', resize);
    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
      pulseTimer = setInterval(spawnPulse, isMobile ? 1100 : 600);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pulseTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={ref} className="as-neural-canvas" aria-hidden="true" />;
}

/* ----------------------------------------------- NeuralField (ambient) */
/**
 * Light, decorative neural mesh — a few connected nodes that drift and
 * pulse. Pure SVG, no physics, cheap to render. Sits behind dark sections
 * to reinforce the "brain model" theme without stealing attention.
 */
const NEURAL_POINTS = [
  [12, 22], [26, 60], [20, 84], [40, 35], [52, 72], [46, 14],
  [66, 48], [74, 80], [82, 28], [90, 62], [60, 90], [34, 50]
];
const NEURAL_LINKS = [
  [0, 3], [3, 5], [3, 1], [1, 11], [11, 4], [1, 2], [4, 6], [6, 8],
  [8, 5], [6, 9], [9, 7], [7, 10], [4, 7], [6, 10], [0, 1]
];
export function NeuralField({ className = '' }) {
  return (
    <svg className={`as-neural ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {NEURAL_LINKS.map(([a, b], i) => (
        <motion.line
          key={`l-${i}`}
          x1={NEURAL_POINTS[a][0]} y1={NEURAL_POINTS[a][1]}
          x2={NEURAL_POINTS[b][0]} y2={NEURAL_POINTS[b][1]}
          className="as-neural-link"
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {NEURAL_POINTS.map(([cx, cy], i) => (
        <motion.circle
          key={`n-${i}`}
          cx={cx} cy={cy} r="0.5"
          className="as-neural-node"
          animate={{ opacity: [0.25, 0.9, 0.25], r: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
}

/* ----------------------------------------------------- Parallax wrapper */
export function Parallax({ children, className = '', amount = 60 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
