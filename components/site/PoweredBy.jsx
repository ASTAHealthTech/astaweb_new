'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Cpu } from 'lucide-react';
import { Reveal, CharReveal } from './ui.jsx';

const EASE = [0.16, 1, 0.3, 1];

/* Logo with graceful fallback: if the official asset isn't present yet,
   render a clean styled wordmark so the section never looks broken. */
function LogoMark({ src, name }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <span className="as-pb-wordmark">{name}</span>;
  }
  return (
    <img
      className="as-pb-logo"
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Plate({ kind, label, mark, logoSrc, heading, tagline, points, icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <motion.article
      ref={ref}
      className={`as-pb-plate as-pb-${kind} ${inView ? 'is-landed' : ''}`}
      initial={{ opacity: 0, y: 42 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="as-pb-aura" aria-hidden="true" />

      {/* signal thread routes into the mark — drawn once on reveal (no infinite loop) */}
      <svg className="as-pb-thread" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          className="as-pb-thread-path"
          d="M0,98 C70,98 92,46 160,46 C228,46 250,98 320,98"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
        />
      </svg>

      <span className="as-pb-eyebrow">{icon}{label}</span>

      <div className="as-pb-logo-wrap">
        <span className="as-pb-glow" aria-hidden="true" />
        <motion.div
          className="as-pb-logo-inner"
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        >
          <span className="as-pb-logo-spin">
            <span className="as-pb-shine" aria-hidden="true" />
            <LogoMark src={logoSrc} name={mark} />
          </span>
        </motion.div>

        {/* a single, tasteful "landing" pulse for the achievement — not a screen flash */}
        {kind === 'nvidia' && (
          <motion.span
            className="as-pb-ring"
            initial={{ opacity: 0, scale: 0.45 }}
            animate={inView ? { opacity: [0, 0.55, 0], scale: [0.45, 1.3, 1.55] } : {}}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.95 }}
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="as-pb-name">{heading}</h3>
      <p className="as-pb-tagline">{tagline}</p>
      <ul className="as-pb-points">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function PoweredBy() {
  return (
    <section className="as-pb" id="powered">
      <div className="as-shell">
        <Reveal className="as-pb-head">
          <span className="as-kicker center">The engine behind ASTA</span>
          <CharReveal as="h2" className="as-pb-title" text="Built on world-class AI foundations." />
          <p className="as-pb-sub">
            ASTA stands on sovereign foundation models and NVIDIA-grade acceleration — the
            same caliber of infrastructure trusted to run frontier AI.
          </p>
        </Reveal>

        <div className="as-pb-grid">
          <Plate
            kind="sarvam"
            label="Powered by"
            mark="Sarvam AI"
            logoSrc="/partners/sarvam-ai.jpg"
            heading="Sovereign foundation models"
            tagline="Sarvam AI's India-first language and reasoning models, tuned for real clinical context."
            points={['Sovereign, India-first LLMs', 'Grounded clinical reasoning']}
            icon={<Sparkles size={15} />}
          />
          {/* Text wordmark for now (no corporate NVIDIA logo). To add the approved
              program badge later, pass logoSrc="/partners/nvidia-inception.svg". */}
          <Plate
            kind="nvidia"
            label="Selected for"
            mark="NVIDIA"
            logoSrc={null}
            heading="Inception + Innovation Lab"
            tagline="A member of NVIDIA Inception, and selected for the NVIDIA Innovation Lab — a track reserved for a select few startups."
            points={['NVIDIA Inception member', 'Innovation Lab — select cohort']}
            icon={<Cpu size={15} />}
          />
        </div>
      </div>
    </section>
  );
}
