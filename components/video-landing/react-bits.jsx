'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';

export function MouseHalo() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, { stiffness: 90, damping: 26, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 26, mass: 0.5 });

  useEffect(() => {
    const handle = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, [x, y]);

  return <motion.div className="mouse-halo" style={{ left: smoothX, top: smoothY }} aria-hidden="true" />;
}

export function Reveal({ children, delay = 0, y = 34, className = '', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, as = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const MotionTag = useMemo(() => {
    if (as === 'h1') return motion.h1;
    if (as === 'h3') return motion.h3;
    if (as === 'p') return motion.p;
    return motion.h2;
  }, [as]);
  const words = text.split(' ');

  return (
    <MotionTag ref={ref} className={`split-text ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span className="split-word" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span
            initial={{ y: '112%', opacity: 0, filter: 'blur(8px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : { y: '112%', opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.72, delay: delay + index * 0.035, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function SpotlightCard({ children, className = '', intensity = 0.18 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const update = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{ '--spot-x': `${pos.x}%`, '--spot-y': `${pos.y}%`, '--spot-opacity': intensity }}
      onPointerMove={update}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({ children, className = '', href = '#contact', variant = 'primary' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`magnetic-button ${variant} ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

export function SectionLabel({ icon, children, light = false }) {
  return (
    <div className={`section-label ${light ? 'light' : ''}`}>
      <span>{icon}</span>
      {children}
    </div>
  );
}

export function AnimatedCounter({ value, label }) {
  return (
    <Reveal className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </Reveal>
  );
}

export function Orbit({ items = [] }) {
  return (
    <div className="orbit-wrap" aria-hidden="true">
      <motion.div className="orbit-ring ring-one" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 38, ease: 'linear' }} />
      <motion.div className="orbit-ring ring-two" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 55, ease: 'linear' }} />
      <motion.div className="orbit-core" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 4.8 }}>
        ASTA
        <strong>ranked lanes</strong>
      </motion.div>
      {items.map((item, index) => {
        const angle = (Math.PI * 2 * index) / items.length - Math.PI / 2;
        const radius = index % 2 === 0 ? 176 : 132;
        const left = 50 + Math.cos(angle) * (radius / 4.3);
        const top = 50 + Math.sin(angle) * (radius / 3.6);
        return (
          <motion.div
            key={item}
            className={`orbit-dot dot-${index}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.76, 1, 0.76] }}
            transition={{ repeat: Infinity, duration: 3.5 + index * 0.4, delay: index * 0.18 }}
          >
            {item}
          </motion.div>
        );
      })}
    </div>
  );
}

export function Ticker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <motion.div className="ticker-track" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function Floaty({ children, className = '', range = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '100px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={inView ? { y: [0, -range, 0] } : { y: 0 }}
      transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function GradientLine({ className = '' }) {
  return <span className={`gradient-line ${className}`} aria-hidden="true" />;
}

export function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollPinLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <div className="scroll-pin-line" ref={ref} aria-hidden="true">
      <motion.span style={{ scaleY }} />
    </div>
  );
}
