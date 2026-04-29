import type { IconName } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

export const solutionsHero = {
  eyebrow: "Clinical AI Platform",
  headline: "Clinical intelligence for",
  headlineAccent: "active wards.",
  sub: "ASTA reads existing bedside monitors, structures vitals in real time, and drives role-aware escalation across active wards - without a new monitor fleet or monitor-side IT integration.",
  primaryCta: { label: "Request a walkthrough", href: ROUTES.demo },
  secondaryCta: { label: "Talk to the team", href: ROUTES.contact },
  proofRow: [
    { value: "98%", label: "CV extraction accuracy" },
    { value: "<2s", label: "Monitor to action" },
    { value: "15+", label: "OEM monitor brands" },
    { value: "10+", label: "Live hospital deployments" },
  ],
};

export const capabilitySuite: {
  eyebrow: string;
  heading: string;
  sub: string;
  modules: {
    icon: IconName;
    tag: string;
    title: string;
    body: string;
    bullets: string[];
    color: string;
    colorTo: string;
    featured?: boolean;
  }[];
  comingSoon: { label: string; note: string };
} = {
  eyebrow: "SAMD Capability Suite",
  heading: "Three productized modules. One clinical intelligence platform.",
  sub: "Deploy monitor reading, physiological reasoning, and escalation as one continuous product flow. ASTA starts on the hospital's existing monitor estate, then layers clinical reasoning and escalation on top.",
  modules: [
    {
      icon: "camera",
      tag: "Module 01",
      title: "CV Monitor Reading",
      body: "Reads existing bedside monitor screens in real time and converts them into structured vitals. Works across 15+ OEM LCD monitors with no API, no hardware tap, and no hospital IT integration required for monitor reading.",
      bullets: [
        "Reads existing bedside monitors",
        "Structured HR, SpO2, BP, and RR in real time",
        "15+ OEM monitor brands supported",
        "No API, hardware tap, or IT integration",
      ],
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
      featured: true,
    },
    {
      icon: "cpu",
      tag: "Module 02",
      title: "Physiological Pattern Learning Model",
      body: "Evaluates vital trajectories continuously instead of waiting for isolated threshold breaches. Surfaces deterioration patterns, ranked clinical differentials, and evidence-linked reasoning for each alert.",
      bullets: [
        "Trajectory-based reasoning beyond thresholds",
        "Ranked clinical differentials",
        "Evidence-linked outputs",
        "Continuous per-bed evaluation",
      ],
      color: "#28D7B5",
      colorTo: "#49C6FF",
    },
    {
      icon: "bell",
      tag: "Module 03",
      title: "Clinical Escalation Engine",
      body: "Routes the right escalation to the right clinician with vital trend context, physiological rationale, and ward-specific next-step logic. Every acknowledgement and action stays governance logged.",
      bullets: [
        "Role-aware routing by ward and protocol",
        "Vital trend plus context at escalation",
        "Recommended next-step framing",
        "Governance logging in the same flow",
      ],
      color: "#7C5CFF",
      colorTo: "#4F6BFF",
    },
  ],
  comingSoon: {
    label: "SAMD pathway in preparation",
    note: "Regulatory documentation is being prepared for the relevant software-as-a-medical-device classification pathway.",
  },
};

export const dashboardWalkthrough: {
  eyebrow: string;
  heading: string;
  sub: string;
  wardStats: { label: string; value: string; color: string }[];
  bedRows: {
    bed: string;
    hr: string;
    spo2: string;
    bp: string;
    status: "ok" | "warn" | "alert";
  }[];
  alertQueue: { time: string; bed: string; msg: string; priority: "high" | "medium" }[];
  auditEntries: { time: string; type: "ok" | "info"; msg: string }[];
} = {
  eyebrow: "Product Experience",
  heading: "The live ward view for nursing, clinical leadership, and operations.",
  sub: "One shared product surface for the whole unit: monitored beds, structured vitals, escalation queue, and audit trail in a single ward view.",
  wardStats: [
    { label: "Beds monitored", value: "24", color: "#4F6BFF" },
    { label: "Beds on watch", value: "3", color: "#FBBF24" },
    { label: "Escalations", value: "1", color: "#EF4444" },
    { label: "Ward coverage", value: "100%", color: "#28D7B5" },
  ],
  bedRows: [
    { bed: "B-01", hr: "76 bpm", spo2: "98%", bp: "122/80", status: "ok" },
    { bed: "B-02", hr: "91 bpm", spo2: "94%", bp: "138/88", status: "warn" },
    { bed: "B-03", hr: "68 bpm", spo2: "99%", bp: "118/76", status: "ok" },
    { bed: "B-04", hr: "108 bpm", spo2: "89%", bp: "142/92", status: "alert" },
    { bed: "B-05", hr: "72 bpm", spo2: "97%", bp: "126/82", status: "ok" },
    { bed: "B-06", hr: "83 bpm", spo2: "96%", bp: "130/84", status: "ok" },
  ],
  alertQueue: [
    {
      time: "09:44:12",
      bed: "B-04",
      msg: "SpO2 89% - 6 min downward trend - PPLM flags respiratory deterioration - escalate to nurse on duty",
      priority: "high",
    },
    {
      time: "09:41:07",
      bed: "B-02",
      msg: "HR 91 bpm - rising over 3 min - physiological watchlist only - no escalation yet",
      priority: "medium",
    },
    {
      time: "09:38:55",
      bed: "B-07",
      msg: "BP 142/92 - above ward range - trend stable - continue observation",
      priority: "medium",
    },
  ],
  auditEntries: [
    {
      time: "09:44:18",
      type: "ok",
      msg: "Escalation routed to nurse on duty - B-04 - role check passed - consent state verified",
    },
    {
      time: "09:44:12",
      type: "info",
      msg: "PPLM escalation logged - SpO2 deterioration pattern - B-04 - Ward 3",
    },
    {
      time: "09:41:07",
      type: "info",
      msg: "Ward watchlist updated - B-02 - no escalation triggered",
    },
  ],
};

export const interopGovernance: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: { icon: IconName; title: string; body: string; badge: string; color: string }[];
} = {
  eyebrow: "Interoperability & Governance",
  heading: "Hospital-ready governance without slowing deployment.",
  sub: "ASTA is designed for regulated clinical environments with interoperability-ready outputs, hospital-defined controls, and auditable operations from first deployment.",
  items: [
    {
      icon: "route",
      title: "HL7/FHIR aligned",
      body: "Structured vital outputs can be mapped into HL7/FHIR-aligned downstream workflows for EMR, analytics, or command-center integration. Monitor reading itself does not depend on hospital IT connectivity.",
      badge: "Aligned",
      color: "#4F6BFF",
    },
    {
      icon: "shield",
      title: "DPDP-aligned posture",
      body: "Deployment architecture is aligned with India's Digital Personal Data Protection Act 2023 and ABDM interoperability programs, so hospitals can integrate ASTA into their broader digital health posture as surrounding systems mature.",
      badge: "Ready posture",
      color: "#28D7B5",
    },
    {
      icon: "lock",
      title: "Role-based access control",
      body: "Access is controlled by hospital-defined roles across nursing, clinicians, leadership, and operations. The deployment model limits who can view, acknowledge, and review each layer of data.",
      badge: "Enforced",
      color: "#7C5CFF",
    },
    {
      icon: "check",
      title: "Legal audit trail",
      body: "Every access, alert, acknowledgement, and review action is time-stamped into a legal audit trail suitable for governance review and deployment-specific retention policy.",
      badge: "Auditable",
      color: "#49C6FF",
    },
    {
      icon: "server",
      title: "Hospital-controlled data residency",
      body: "Data residency, retention, and environment choice are hospital-defined - on-prem, hybrid, or managed cloud - and enforced by the selected deployment model.",
      badge: "Hospital-defined",
      color: "#28D7B5",
    },
    {
      icon: "eye",
      title: "No patient imagery",
      body: "The camera is monitor-facing and reads the screen, not the patient. ASTA is designed to operate without patient imagery, biometric capture, or patient video in the monitoring workflow.",
      badge: "Monitor-facing",
      color: "#4F6BFF",
    },
  ],
};

export const monitoringInPractice: {
  eyebrow: string;
  heading: string;
  sub: string;
  scenarios: {
    label: string;
    title: string;
    body: string;
    metrics: { label: string; value: string }[];
    color: string;
  }[];
} = {
  eyebrow: "Monitoring in Practice",
  heading: "How ASTA behaves across ward contexts.",
  sub: "The same monitor-reading and physiological reasoning stack adapts to the observation pattern, escalation path, and staffing reality of each ward.",
  scenarios: [
    {
      label: "ICU",
      title: "ICU: continuous watch with early escalation context.",
      body: "ASTA maintains continuous observation across every monitored bed, highlighting deterioration patterns early and routing escalation with trajectory context to the ICU care team.",
      metrics: [
        { label: "Monitoring cadence", value: "Continuous" },
        { label: "Signal latency", value: "<2s" },
        { label: "Escalation path", value: "ICU team" },
      ],
      color: "#4F6BFF",
    },
    {
      label: "General Ward",
      title: "General ward: broader coverage on the monitors already in place.",
      body: "ASTA reads the bedside monitors already on the ward, helping nursing teams maintain broader visibility and spot drift earlier without deploying a second monitor system.",
      metrics: [
        { label: "Beds per unit", value: "Up to 30+" },
        { label: "Coverage", value: "100% monitored" },
        { label: "Routing model", value: "Role-aware" },
      ],
      color: "#28D7B5",
    },
    {
      label: "Post-op",
      title: "Post-op: tighter oversight during the recovery window.",
      body: "ASTA tracks the high-risk post-operative period, surfacing gradual change in oxygenation, pulse, or pressure before it becomes a threshold-only event.",
      metrics: [
        { label: "Detection model", value: "Trajectory-based" },
        { label: "Escalation context", value: "PPLM-linked" },
        { label: "Audit capture", value: "Automatic" },
      ],
      color: "#7C5CFF",
    },
    {
      label: "High-dependency",
      title: "High-dependency: structured oversight for complex patients.",
      body: "ASTA supports higher-acuity wards with continuous per-bed observation, escalation logging, and auditable review trails aligned to hospital oversight workflows.",
      metrics: [
        { label: "Vital set", value: "HR, SpO2, BP, RR" },
        { label: "Reasoning", value: "Continuous" },
        { label: "Review trail", value: "Auditable" },
      ],
      color: "#49C6FF",
    },
  ],
};

export const solutionsCta = {
  eyebrow: "Review deployment fit",
  heading: "Request a walkthrough of ASTA on your ward setup.",
  sub: "Review monitor compatibility, workflow fit, escalation logic, and deployment options with ASTA's clinical and engineering team.",
  primaryCta: { label: "Request a walkthrough", href: ROUTES.demo },
  secondaryCta: { label: "Talk to the team", href: ROUTES.contact },
};
