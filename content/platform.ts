import type { IconName } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

export const platformHero = {
  eyebrow: "Platform",
  headline: "The intelligence layer behind",
  headlineAccent: "smart wards.",
  sub: "A device-agnostic clinical intelligence stack that reads any bedside monitor, structures vitals in real time, reasons over physiology, and turns those signals into evidence-linked clinical action.",
  primaryCta: { label: "Request a platform walkthrough", href: ROUTES.demo },
  secondaryCta: { label: "Explore solutions", href: ROUTES.solutions },
  proofRow: [
    { value: "15+", label: "OEM monitor brands" },
    { value: "98%", label: "CV extraction accuracy" },
    { value: "100M+", label: "Labeled monitor frames" },
    { value: "10+", label: "Hospital deployments" },
  ],
};

export const platformStack: {
  eyebrow: string;
  heading: string;
  sub: string;
  layers: {
    icon: IconName;
    tag: string;
    title: string;
    body: string;
    bullets: string[];
    color: string;
    colorTo: string;
  }[];
  footer: string;
} = {
  eyebrow: "Clinical Intelligence Stack",
  heading: "Three productized layers. One clinical intelligence system.",
  sub: "ASTA combines monitor reading, physiological reasoning, and clinical output in one continuous path from signal to bedside action.",
  layers: [
    {
      icon: "camera",
      tag: "Layer 01",
      title: "Computer Vision Layer",
      body: "Reads existing bedside monitors and converts displayed numerics into structured vital streams without APIs, hardware taps, or vendor-specific integration.",
      bullets: [
        "Extracts HR, BP, SpO2, and RR in real time",
        "Supports 15+ OEM monitor brands",
        "No API or hardware tap required",
        "Deploys without vendor lock-in",
      ],
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
    },
    {
      icon: "cpu",
      tag: "Layer 02",
      title: "PPLM Reasoning Layer",
      body: "A 10–20B parameter physiological language model reasons over continuous vital trajectories to surface deterioration context. Live deployment integration coming soon.",
      bullets: [
        "10–20B parameter physiological language model",
        "Trajectory-aware reasoning over continuous windows",
        "Ranked deterioration context",
        "Evidence-linked interpretation before output",
      ],
      color: "#28D7B5",
      colorTo: "#49C6FF",
    },
    {
      icon: "bell",
      tag: "Layer 03",
      title: "Clinical Output Layer",
      body: "Frames evidence-linked outputs and escalation guidance so the receiving nurse or clinician gets usable bedside context.",
      bullets: [
        "Evidence-linked bedside outputs",
        "Role-aware escalation support",
        "Recommended next-step framing",
        "Explainable action at the endpoint",
      ],
      color: "#7C5CFF",
      colorTo: "#4F6BFF",
    },
  ],
  footer: "From monitor reading to reasoning to action, ASTA operates as one clinical intelligence loop.",
};

export const platformSignalFlow: {
  eyebrow: string;
  heading: string;
  sub: string;
  steps: {
    icon: IconName;
    step: string;
    title: string;
    body: string;
    color: string;
    colorTo: string;
  }[];
} = {
  eyebrow: "Signal Flow",
  heading: "From monitor pixels to clinical action.",
  sub: "A simplified view of how ASTA moves from bedside monitor display to evidence-linked clinical output.",
  steps: [
    {
      icon: "camera",
      step: "01",
      title: "Monitor display",
      body: "ASTA starts with the bedside monitor already in use.",
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
    },
    {
      icon: "eye",
      step: "02",
      title: "Structured extraction",
      body: "Computer vision converts displayed numerics into structured, time-stamped vitals.",
      color: "#7C5CFF",
      colorTo: "#49C6FF",
    },
    {
      icon: "layers",
      step: "03",
      title: "Physiological embedding",
      body: "Vital windows are normalized into machine-readable physiological state embeddings.",
      color: "#49C6FF",
      colorTo: "#28D7B5",
    },
    {
      icon: "activity",
      step: "04",
      title: "Deterioration interpretation",
      body: "Alerts trigger on vitals exceeding threshold and on camera obstruction detection. PPLM ranks deterioration context above the raw alert.",
      color: "#28D7B5",
      colorTo: "#4F6BFF",
    },
    {
      icon: "bell",
      step: "05",
      title: "Clinical output",
      body: "Vitals are captured continuously every 5 seconds, not static snapshots. Output reflects current patient trajectory, framed for the receiving clinical role.",
      color: "#4F6BFF",
      colorTo: "#49C6FF",
    },
  ],
};

export const platformVisionLayer: {
  eyebrow: string;
  heading: string;
  sub: string;
  points: { title: string; body: string }[];
  metrics: { value: string; label: string; note: string; color: string }[];
  pipeline: { title: string; body: string }[];
  footer: string;
} = {
  eyebrow: "Computer Vision Layer",
  heading: "The monitor-reading layer that unlocks deployment.",
  sub: "ASTA begins on the hospital's existing bedside monitors, so deployment does not wait on proprietary integrations, hardware taps, or a monitor refresh cycle.",
  points: [
    {
      title: "Reads existing bedside monitors",
      body: "ASTA works with the monitor already at the bed rather than requiring a new fleet or a vendor feed.",
    },
    {
      title: "Real-time structured vital extraction",
      body: "Displayed numerics become structured HR, BP, SpO2, and RR streams for downstream reasoning.",
    },
    {
      title: "No monitor-side IT dependency",
      body: "Monitor reading starts without hospital IT integration, proprietary APIs, or hardware taps.",
    },
    {
      title: "Monitor-facing capture, not patient surveillance",
      body: "The capture point is the monitor display. The workflow is built around numerical data extraction, not patient imagery.",
    },
  ],
  metrics: [
    { value: "15+",   label: "OEM brands",      note: "Device-agnostic monitor coverage",         color: "#4F6BFF" },
    { value: "98%",   label: "CV accuracy",     note: "Monitor-reading extraction accuracy",       color: "#28D7B5" },
    { value: "5s",    label: "Capture cadence", note: "Continuous vital capture every 5 seconds",  color: "#49C6FF" },
    { value: "0",     label: "API dependency",  note: "No API required for monitor reading",        color: "#7C5CFF" },
  ],
  pipeline: [
    {
      title: "Screen locate",
      body: "Identify the bedside monitor region in the capture frame.",
    },
    {
      title: "Layout classify",
      body: "Recognize OEM-specific layouts and select the right reading template.",
    },
    {
      title: "Value extract",
      body: "Apply OCR and parsing to vitals and displayed numerics.",
    },
    {
      title: "Signal normalize",
      body: "Time-stamp and standardize values for downstream reasoning.",
    },
  ],
  footer: "Vendor-agnostic monitor reading makes ASTA additive to the infrastructure already in place.",
};

export const platformReasoningLayer: {
  eyebrow: string;
  heading: string;
  sub: string;
  pillars: { title: string; body: string; color: string }[];
  comparisons: { label: string; body: string; highlight?: boolean }[];
  footer: string;
} = {
  eyebrow: "PPLM Reasoning Layer",
  heading: "Physiological reasoning beyond threshold-only monitoring.",
  sub: "PPLM is what turns monitor reading into clinical intelligence. A 10–20B parameter physiological language model reasons over continuous trajectories and pattern shifts so output reflects deterioration context, not just a line crossing or a static score. Live deployment integration is coming soon.",
  pillars: [
    {
      title: "Continuous trajectories",
      body: "Looks at how vitals move across time windows, not one reading at a time.",
      color: "#4F6BFF",
    },
    {
      title: "Pattern interpretation",
      body: "Detects deterioration signatures that threshold logic may miss or detect late.",
      color: "#28D7B5",
    },
    {
      title: "Ranked clinical context",
      body: "Surfaces likely deterioration context instead of sending a raw alert alone.",
      color: "#7C5CFF",
    },
    {
      title: "Evidence-linked output",
      body: "Carries the reasoning pathway into the output so escalation remains explainable.",
      color: "#49C6FF",
    },
  ],
  comparisons: [
    {
      label: "Threshold-only alerts",
      body: "Escalate after a single value crosses a line.",
    },
    {
      label: "Static dashboards",
      body: "Show status snapshots but do not reason over change over time.",
    },
    {
      label: "Simple OCR systems",
      body: "Extract numbers accurately but stop before clinical interpretation.",
    },
    {
      label: "ASTA PPLM",
      body: "Interprets trajectories, adds deterioration context, and produces evidence-linked output that is more useful than a simple alert.",
      highlight: true,
    },
  ],
  footer: "This is where ASTA moves beyond monitor reading into clinically useful reasoning.",
};

export const platformDeploymentArchitecture: {
  eyebrow: string;
  heading: string;
  sub: string;
  stages: {
    icon: IconName;
    title: string;
    body: string;
    color: string;
    colorTo: string;
  }[];
  principles: { icon: IconName; title: string; body: string }[];
  footer: string;
} = {
  eyebrow: "Deployment Architecture",
  heading: "Designed to fit hospital environments, not rebuild them.",
  sub: "ASTA fits hospital environments with monitor-facing bedside capture, a controlled processing posture, and interoperable outputs across on-prem, hybrid, or managed cloud deployment.",
  stages: [
    {
      icon: "camera",
      title: "Bedside capture",
      body: "Monitor-facing capture reads displayed numerics from the bedside monitor already in use.",
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
    },
    {
      icon: "layers",
      title: "Local extraction",
      body: "Vital streams are extracted, normalized, and buffered for continuous downstream reasoning.",
      color: "#7C5CFF",
      colorTo: "#49C6FF",
    },
    {
      icon: "server",
      title: "Controlled deployment posture",
      body: "Hospitals can adopt on-prem, hybrid, or managed cloud deployment under their own governance model.",
      color: "#28D7B5",
      colorTo: "#49C6FF",
    },
    {
      icon: "route",
      title: "Interoperable outputs",
      body: "Structured outputs and escalation context can map into HL7/FHIR-aligned workflows when needed.",
      color: "#49C6FF",
      colorTo: "#4F6BFF",
    },
  ],
  principles: [
    {
      icon: "eye",
      title: "Numerical data only",
      body: "No patient imagery is required in the monitoring workflow. The design centers on monitor numerics, not patient video.",
    },
    {
      icon: "shield",
      title: "Hospital-defined data residency",
      body: "Retention and environment posture are defined by the hospital and enforced by the selected deployment model.",
    },
    {
      icon: "cloud",
      title: "Flexible infrastructure posture",
      body: "ASTA can operate in on-prem, hybrid, or managed cloud environments depending on site requirements.",
    },
    {
      icon: "check",
      title: "Additive integration model",
      body: "Monitor reading starts without hospital IT integration. Downstream workflow connectivity can be added when the site is ready.",
    },
  ],
  footer: "Monitor reading starts without hospital IT integration. Workflow and EMR connectivity can be added as later layers, not day-one prerequisites.",
};

export const platformValidation: {
  eyebrow: string;
  heading: string;
  sub: string;
  metrics: { value: string; label: string; note: string; color: string }[];
  rows: { dimension: string; proof: string; implication: string }[];
  footer: string;
} = {
  eyebrow: "Validation & Benchmarks",
  heading: "Proof points that stand up to technical review.",
  sub: "ASTA's public proof stays focused on what serious buyers need to evaluate: monitor-reading accuracy, cross-OEM coverage, training scale, field deployment, and end-to-end latency.",
  metrics: [
    {
      value: "98%",
      label: "CV accuracy",
      note: "Monitor-reading extraction accuracy",
      color: "#4F6BFF",
    },
    {
      value: "15+",
      label: "OEM brands",
      note: "Device-agnostic monitor support",
      color: "#28D7B5",
    },
    {
      value: "100M+",
      label: "Labeled frames",
      note: "Training scale behind the CV layer",
      color: "#49C6FF",
    },
    {
      value: "10+",
      label: "Hospitals",
      note: "Live deployment footprint",
      color: "#7C5CFF",
    },
    {
      value: "25",
      label: "Devices live",
      note: "Current field footprint",
      color: "#28D7B5",
    },
    {
      value: "<2s",
      label: "Monitor to action",
      note: "Low-latency monitor-to-output pipeline",
      color: "#4F6BFF",
    },
  ],
  rows: [
    {
      dimension: "Monitor reading",
      proof: "98% CV accuracy across 15+ OEM monitor brands",
      implication: "Shows cross-device monitor reading rather than one-vendor optimization.",
    },
    {
      dimension: "Training scale",
      proof: "100M+ labeled monitor frames",
      implication: "Supports layout robustness across real display conditions.",
    },
    {
      dimension: "Real-world operation",
      proof: "10+ hospital deployments and 25 live devices",
      implication: "Shows field usage in hospital environments, not just lab validation.",
    },
  ],
  footer: "For platform evaluation, ASTA leads with monitor-reading accuracy, device breadth, real hospital operation, and low-latency output.",
};

export const platformCta = {
  eyebrow: "Platform walkthrough",
  heading: "Review ASTA's platform architecture and deployment fit.",
  sub: "A focused session with the ASTA platform team covering monitor compatibility, reasoning architecture, deployment posture, and technical fit for your hospital.",
  primaryCta: { label: "Request a platform walkthrough", href: ROUTES.demo },
  secondaryCta: { label: "Talk to the ASTA team", href: ROUTES.contact },
};
