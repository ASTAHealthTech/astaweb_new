import type { CTA, HospitalDeployment, IconName } from "@/lib/types";
import { ROUTES } from "@/lib/constants";
import { deployments } from "@/content/home";

type HeroProof = {
  value: string;
  label: string;
};

type UseCaseCard = {
  title: string;
  context: string;
  pressure: string;
  fit: string;
  outcome: string;
  priority?: "primary" | "secondary";
};

type UseCaseCluster = {
  icon: IconName;
  label: string;
  title: string;
  sub: string;
  color: string;
  colorTo: string;
  layout: "wide" | "half";
  cases: UseCaseCard[];
  footer: string;
};

type TeachingPillar = {
  title: string;
  body: string;
  stat: string;
  color: string;
};

type TeachingPathway = {
  title: string;
  body: string;
};

type OutcomeTheme = {
  icon: IconName;
  context: string;
  title: string;
  body: string;
  color: string;
};

type UseCaseLiveProofHospital = HospitalDeployment & {
  careContext: string;
  deploymentFit: string;
};

const liveHospitalCount = deployments.items.length;
const liveStatesCount = new Set(deployments.items.map((deployment) => deployment.state)).size;
const firstPublicGoLive = Math.min(
  ...deployments.items.map((deployment) => Number(deployment.liveSince)),
);

const liveHospitalContext: Record<
  string,
  Pick<UseCaseLiveProofHospital, "careContext" | "deploymentFit" | "note">
> = {
  "Southern Railway HQ Hospital": {
    careContext: "General ward monitoring",
    deploymentFit: "Large institutional hospital",
    note:
      "Live ward deployment supporting continuous patient-care visibility with hospital and railway medical leadership.",
  },
  "Karnataka ENT Hospital": {
    careContext: "Specialty inpatient workflows",
    deploymentFit: "ENT-specific monitored care",
    note:
      "Vital extraction and alert routing aligned to ENT care pathways and specialty inpatient acuity patterns.",
  },
  "Aksha Hospital": {
    careContext: "Multi-ward inpatient coverage",
    deploymentFit: "Clinical and nursing operations",
    note:
      "Real-time monitoring deployed across active wards for clinical, nursing, and operational teams.",
  },
  "Seethapathy Clinic": {
    careContext: "Clinic-led monitored care",
    deploymentFit: "Continuous observation workflows",
    note:
      "Continuous observation and escalation routing configured to clinic-specific care protocols and ward patterns.",
  },
  "K.S. Hospital": {
    careContext: "Existing-monitor deployment",
    deploymentFit: "No infrastructure change",
    note:
      "Bedside monitor reading configured to the ward layout and equipment already in place at go-live.",
  },
  "Sugam Hospital": {
    careContext: "Active ward operations",
    deploymentFit: "Continuous ward coverage",
    note:
      "Real-time vital extraction and alert routing configured for continuous operational coverage across active wards.",
  },
  "Anbu Hospital": {
    careContext: "Ward monitoring deployment",
    deploymentFit: "Clinical and operations fit",
    note:
      "Active ward deployment delivered with hospital clinical and operations teams in a live patient-care setting.",
  },
};

export const useCasesHero: {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  microProof: string[];
  proofRow: HeroProof[];
} = {
  eyebrow: "Use Cases - Real Hospital Environments",
  headline: "One intelligence layer across",
  headlineAccent: "the environments hospitals actually run.",
  sub:
    "ASTA fits general wards, step-down beds, ICU/HCU oversight, peripheral centers, hospital-at-home pathways, and academic programs by reading the monitors already in place and adding continuous clinical visibility without a new monitor fleet.",
  primaryCta: { label: "Review ASTA for your ward type", href: ROUTES.demo },
  secondaryCta: { label: "Talk to the ASTA team", href: ROUTES.contact },
  microProof: [
    "Built for existing hospital infrastructure",
    "Starts on the monitors already on the ward",
    "Extends from live monitoring into teaching and research",
  ],
  proofRow: [
    { value: String(liveHospitalCount), label: "Named live hospitals" },
    { value: String(liveStatesCount), label: "States represented" },
    { value: "15+", label: "OEM monitor brands" },
    { value: "0", label: "New monitor fleet required" },
  ],
};

export const useCaseClusters: {
  eyebrow: string;
  heading: string;
  sub: string;
  clusters: UseCaseCluster[];
} = {
  eyebrow: "Deployment contexts",
  heading: "Where ASTA creates value in real hospital settings.",
  sub:
    "ASTA is not a ward-specific product. It is a device-agnostic intelligence layer that adapts to each care environment's staffing reality, escalation pattern, and deployment posture.",
  clusters: [
    {
      icon: "hospital",
      label: "Acute inpatient care",
      title: "Continuous oversight for the beds hospitals manage all day.",
      sub:
        "Operational gain often starts outside the ICU, where teams need broader visibility across mixed-acuity beds without replacing the monitors already installed.",
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
      layout: "wide",
      cases: [
        {
          title: "Smart wards in general hospitals",
          context: "General wards and monitored inpatient beds on mixed monitor fleets.",
          pressure:
            "Periodic observation and threshold-only alarms can miss deterioration between checks.",
          fit:
            "ASTA reads the monitors already at each bed and centralizes watchlists, trends, and escalation across the unit.",
          outcome:
            "Broader ward visibility, earlier deterioration cues, and no monitor replacement program.",
        },
        {
          title: "ICU & HCU optimization",
          context: "ICUs, HCUs, and high-dependency floors under constant bed pressure.",
          pressure:
            "Critical-care beds are strained when general floors escalate late or without enough context.",
          fit:
            "ASTA extends continuous oversight into the units feeding ICU/HCU escalation, using one layer across floor and critical care.",
          outcome:
            "Better step-up timing, stronger escalation quality, and tighter use of scarce critical-care beds.",
        },
        {
          title: "Post-operative and step-down oversight",
          context: "Recovery beds, monitored post-op units, and night-shift handovers.",
          pressure:
            "Subtle drift in oxygenation, pressure, or pulse can matter before a threshold breach appears.",
          fit:
            "Trajectory-aware watchlists surface change early while keeping clinicians on familiar monitors and workflows.",
          outcome:
            "Safer recovery oversight and fewer blind spots during high-risk observation windows.",
        },
      ],
      footer:
        "ASTA adds continuous intelligence to the inpatient beds where staffing pressure, escalation timing, and throughput matter most.",
    },
    {
      icon: "route",
      label: "Distributed and remote coverage",
      title: "One operational model across the central hospital and the care edge.",
      sub:
        "ASTA extends monitored oversight into smaller centers and supervised home pathways without splitting into separate technology stacks.",
      color: "#28D7B5",
      colorTo: "#49C6FF",
      layout: "half",
      cases: [
        {
          title: "Remote monitoring for peripheral centers",
          context: "Satellite hospitals, peripheral centers, and smaller monitored units without constant specialist presence.",
          pressure:
            "Escalation quality weakens when coverage depends only on local staff and disconnected workflows.",
          fit:
            "ASTA keeps monitored beds visible centrally and supports specialist review while preserving the equipment already used at the edge.",
          outcome:
            "Broader clinical reach and stronger support for tier-2 and tier-3 care environments.",
        },
        {
          title: "Hospital-at-home services",
          context: "Home recovery, monitored discharge, and supervised chronic-care follow-up.",
          pressure:
            "Hospitals need continuity after discharge without training teams on a second monitoring model.",
          fit:
            "ASTA extends familiar dashboards, watchlists, and escalation logic into supervised home pathways where they fit the care model.",
          outcome:
            "Safer discharge pathways and continuity from bedside monitoring into home observation.",
        },
      ],
      footer:
        "The same ASTA operating model can cover central hospitals, remote sites, and supervised home pathways when hospitals want one deployment language across settings.",
    },
    {
      icon: "layers",
      label: "Academic and institutional intelligence",
      title: "A monitored ward layer that also strengthens teaching and research.",
      sub:
        "For medical college hospitals and academic centers, ASTA supports live monitoring while creating structured material for teaching rounds, protocol work, and publication-oriented research.",
      color: "#7C5CFF",
      colorTo: "#4F6BFF",
      layout: "half",
      cases: [
        {
          title: "AI-backed clinical training",
          context: "Teaching hospitals, academic ICUs, simulation reviews, and protocol teaching.",
          pressure:
            "Clinical education often lacks structured, time-linked cases from the institution's own monitored care environment.",
          fit:
            "ASTA turns alert timelines, deterioration trajectories, and review history into material for teaching and escalation training.",
          outcome:
            "Stronger clinical education grounded in the hospital's own monitored cases.",
        },
        {
          title: "Medical research enablement",
          context: "Departments running publications, validation studies, audits, or protocol-improvement work.",
          pressure:
            "Research slows when vital patterns, escalation events, and review trails stay fragmented.",
          fit:
            "ASTA structures longitudinal monitor data and operational history into a research-ready layer.",
          outcome:
            "Faster publication workflows, better protocol development, and clearer academic differentiation.",
        },
      ],
      footer:
        "The academic value compounds after go-live: live monitoring first, then teaching material, protocol improvement, and research output on top.",
    },
    {
      icon: "shield",
      label: "Specialized monitored environments",
      title: "Operational confidence in regulated and non-acute programs.",
      sub:
        "Some ASTA deployments are less about bedside acuity and more about traceable monitoring, exception handling, and long-horizon visibility in specialized environments.",
      color: "#49C6FF",
      colorTo: "#28D7B5",
      layout: "wide",
      cases: [
        {
          title: "Blood & organ bank monitoring",
          context: "Temperature-controlled blood, organ, and other regulated storage environments.",
          pressure:
            "Compliance failures and delayed exception response can create patient-safety risk, wastage, and operational exposure.",
          fit:
            "ASTA supports continuous oversight, alert routing, and traceable exception handling where special environments demand reliable watchfulness.",
          outcome:
            "Stronger compliance posture, lower wastage risk, and more confidence in critical inventory monitoring.",
        },
        {
          title: "Rehabilitation & behavioral-health programs",
          context: "Biofeedback-led rehabilitation, behavioral-health observation, and supervised wellness pathways.",
          pressure:
            "Institutions expanding beyond acute beds need structured physiological visibility without standing up a separate monitoring stack.",
          fit:
            "ASTA supports longitudinal biofeedback and monitored observation on the same device-agnostic base used in acute care.",
          outcome:
            "A controlled path into differentiated programs without diluting the hospital's core monitoring model.",
          priority: "secondary",
        },
      ],
      footer:
        "ASTA can begin on live wards and expand into specialized monitored environments once the operating model is proven.",
    },
  ],
};

export const teachingHospitalValue: {
  eyebrow: string;
  heading: string;
  sub: string;
  audiences: string[];
  pillars: TeachingPillar[];
  pathway: TeachingPathway[];
} = {
  eyebrow: "Academic / teaching hospital value",
  heading: "For medical college hospitals, ASTA becomes more than a monitoring layer.",
  sub:
    "ASTA gives academic institutions a practical path from live monitoring to stronger clinical education, protocol improvement, measurable patient-safety work, and publication-oriented research. It helps teaching hospitals differentiate on real deployment, not only on technology claims.",
  audiences: [
    "Medical college hospitals",
    "Academic ICUs and teaching rounds",
    "Protocol development teams",
    "Research and publication teams",
  ],
  pillars: [
    {
      title: "Stronger clinical education",
      body:
        "Use alert timelines, deterioration trajectories, and review history as material for bedside teaching, case conferences, and escalation drills.",
      stat: "Teaching rounds",
      color: "#4F6BFF",
    },
    {
      title: "Research & publications",
      body:
        "Structured longitudinal monitoring data gives academic departments a better base for observational studies, validation work, and publication pipelines.",
      stat: "Publication-ready data",
      color: "#28D7B5",
    },
    {
      title: "Measurable patient safety work",
      body:
        "Teams can review deterioration patterns, escalation quality, and protocol adherence using monitored evidence instead of anecdotal reconstruction.",
      stat: "Protocol review",
      color: "#7C5CFF",
    },
    {
      title: "Institutional differentiation",
      body:
        "Hospitals can show a credible AI-enabled monitoring program operating inside real wards while building academic output and reputation on top.",
      stat: "Academic positioning",
      color: "#49C6FF",
    },
  ],
  pathway: [
    {
      title: "1. Go live",
      body: "Start in active wards, step-down units, or academic ICUs on the monitors already in place.",
    },
    {
      title: "2. Review patterns",
      body: "Use trajectories and alert history in teaching rounds, protocol review, and escalation discussions.",
    },
    {
      title: "3. Build research output",
      body: "Turn structured monitoring data into audits, validation work, and publication pipelines.",
    },
    {
      title: "4. Differentiate the institution",
      body: "Demonstrate a real AI-enabled care environment that supports patient safety and academic leadership.",
    },
  ],
};

export const useCasesLiveProof: {
  eyebrow: string;
  heading: string;
  sub: string;
  metrics: HeroProof[];
  hospitals: UseCaseLiveProofHospital[];
  note: string;
} = {
  eyebrow: "Live hospital proof",
  heading: "Real deployment contexts, not theoretical scenarios.",
  sub:
    "ASTA is already live in named hospitals across Tamil Nadu and Karnataka, in active patient-care environments rather than demo scenarios.",
  metrics: [
    { value: String(liveHospitalCount), label: "Named live hospitals" },
    { value: String(liveStatesCount), label: "States represented" },
    { value: String(firstPublicGoLive), label: "First public go-live" },
    { value: "Live", label: "Active patient-care settings" },
  ],
  hospitals: deployments.items.map((hospital) => ({
    ...hospital,
    ...(liveHospitalContext[hospital.name] ?? {
      careContext: "Live patient-care deployment",
      deploymentFit: "Existing-monitor fit",
      note: hospital.note,
    }),
  })),
  note:
    "Named sites are shown here as deployment proof: live hospitals, real care settings, and operating fit on infrastructure already in place.",
};

export const useCasesOutcomes: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: OutcomeTheme[];
} = {
  eyebrow: "Outcome framing",
  heading: "Why these deployment contexts matter to hospital buyers.",
  sub:
    "The value of ASTA changes with the environment. What stays constant is earlier visibility, broader monitored coverage, and a better operating model on the infrastructure hospitals already have.",
  items: [
    {
      icon: "activity",
      context: "Acute floors and recovery beds",
      title: "Earlier deterioration visibility",
      body:
        "ASTA helps teams see meaningful change sooner on wards where periodic observation and threshold-only alarms can leave too much time between signal and action.",
      color: "#4F6BFF",
    },
    {
      icon: "hospital",
      context: "General wards",
      title: "Broader monitored coverage",
      body:
        "Hospitals can extend smart-ward style oversight across more beds without a monitor refresh or a second hardware estate.",
      color: "#28D7B5",
    },
    {
      icon: "stethoscope",
      context: "Shift changes and distributed staffing",
      title: "Reduced staffing blind spots",
      body:
        "Continuous visibility helps teams stay ahead of the gaps that appear on larger wards, night shifts, and peripheral sites.",
      color: "#7C5CFF",
    },
    {
      icon: "bell",
      context: "Escalation workflows",
      title: "Stronger escalation quality",
      body:
        "Alerts arrive with trend context, routing logic, and clinical framing, improving how urgency is interpreted.",
      color: "#49C6FF",
    },
    {
      icon: "layers",
      context: "Teaching hospitals and research centers",
      title: "Teaching and research value",
      body:
        "The same deployment that improves live monitoring can also support academic rounds, protocol work, validation studies, and publication-oriented research.",
      color: "#4F6BFF",
    },
    {
      icon: "shield",
      context: "Special monitored environments",
      title: "Institutional differentiation and compliance",
      body:
        "In regulated environments and differentiated service lines, ASTA supports traceable oversight on a hospital-controlled operating model.",
      color: "#28D7B5",
    },
  ],
};

export const useCasesCta: {
  eyebrow: string;
  heading: string;
  sub: string;
  primaryCta: CTA;
  secondaryCta: CTA;
} = {
  eyebrow: "Deployment review",
  heading: "Discuss ASTA for your hospital setting.",
  sub:
    "Review the ward types, escalation model, and deployment path that matter most for your hospital - from inpatient monitoring to teaching-hospital use.",
  primaryCta: { label: "Review ASTA for your ward type", href: ROUTES.demo },
  secondaryCta: { label: "Talk to the ASTA team", href: ROUTES.contact },
};
