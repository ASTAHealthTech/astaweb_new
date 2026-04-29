import type { CTA, IconName } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

type HeroProof = {
  value: string;
  label: string;
};

type FoundingPressure = {
  icon: IconName;
  title: string;
  body: string;
  color: string;
  colorTo: string;
};

type Person = {
  name: string;
  initials: string;
  photo: string;
  title: string;
  badge: string;
  headline: string;
  body: string;
  contribution: string;
  accent: string;
  accentTo: string;
  linkedin?: string;
  scholar?: string;
};

type PedigreeItem = {
  name: string;
  descriptor: string;
  badge: string;
  logo: string;
  note: string;
  color: string;
  colorTo: string;
};

const leadershipMembers: Person[] = [
  {
    name: "Vikram Paramasivan",
    initials: "VP",
    photo: "/team/vikram.jpeg",
    linkedin: "https://www.linkedin.com/in/vikramparamasivan/",
    title: "CEO & Co-Founder",
    badge: "Enterprise technology",
    headline: "Brings product and engineering discipline from large-scale software systems.",
    body:
      "Vikram brings 15+ years of enterprise product and engineering experience, including AI-led work across Microsoft environments such as M365 and Azure.",
    contribution:
      "He sets the bar for product rigor, platform thinking, and the operating discipline required for hospital-grade software.",
    accent: "#4F6BFF",
    accentTo: "#7C5CFF",
  },
  {
    name: "Dr. Kumaresh Krishnamoorthy",
    initials: "DK",
    photo: "/team/kumaresh.jpeg",
    linkedin: "https://www.linkedin.com/in/drkumaresh/",
    title: "CMO & Co-Founder",
    badge: "Clinical leadership",
    headline: "Keeps the company anchored in the bedside problem, not an abstract AI thesis.",
    body:
      "A practicing ENT surgeon and health-tech innovator with 20+ years of clinical experience, Dr. Kumaresh brings the realities of ward workflows, missed deterioration, and clinician burden directly into product decisions.",
    contribution:
      "He defines the clinical relevance of what ASTA builds and keeps patient safety, adoption, and real hospital fit at the center.",
    accent: "#28D7B5",
    accentTo: "#49C6FF",
  },
  {
    name: "Adyanta Dubey",
    initials: "AD",
    photo: "/team/adyanta.jpeg",
    linkedin: "https://www.linkedin.com/in/adyanta-dubey-a57895225/",
    title: "CTO & Co-Founder",
    badge: "AI, robotics, and ML",
    headline: "Leads the technical build from monitor reading to the product systems around it.",
    body:
      "An AI and robotics builder from NIT Andhra Pradesh, Adyanta brings full-stack, machine-learning, and data-science depth to the hard problem of reading heterogeneous monitor output reliably at scale.",
    contribution:
      "He bridges research-grade modeling with day-to-day execution across vision, data, infrastructure, and clinical product surfaces.",
    accent: "#7C5CFF",
    accentTo: "#4F6BFF",
  },
  {
    name: "Varun Singh",
    initials: "VS",
    photo: "/team/varun.jpeg",
    linkedin: "https://www.linkedin.com/in/varunxiphias/",
    title: "Co-Founder & Chief Business Officer",
    badge: "Commercial execution",
    headline: "Translates ASTA from technical capability into institutional relationships and deployment motion.",
    body:
      "Varun brings business and operating experience from building ventures across the XIPHIAS ecosystem, with a focus on partnerships, market access, and disciplined execution.",
    contribution:
      "He helps position ASTA for hospital buyers, partner conversations, and the commercial structure required for responsible scale.",
    accent: "#49C6FF",
    accentTo: "#28D7B5",
  },
];

const advisoryMembers: Person[] = [
  {
    name: "Dr. Karthick Seshadri",
    initials: "KS",
    photo: "/team/karthick.webp",
    scholar: "https://scholar.google.co.in/citations?user=7KmAy8AAAAAJ",
    title: "Advisor",
    badge: "Distributed ML and AI systems",
    headline: "Extends ASTA's research depth in scalable, real-world machine learning.",
    body:
      "Assistant Professor at NIT Andhra Pradesh and AI researcher with a PhD in distributed machine learning, focused on deep learning systems that have to perform beyond clean benchmark conditions.",
    contribution:
      "Strengthens model scalability, experimentation discipline, and the technical depth needed for robust deployment.",
    accent: "#4F6BFF",
    accentTo: "#49C6FF",
  },
  {
    name: "Dr. Balaraman Ravindran",
    initials: "BR",
    photo: "/team/balaraman.jpeg",
    linkedin: "https://www.linkedin.com/in/balaraman-ravindran-427a307/",
    scholar: "https://scholar.google.co.in/citations?user=nGUcGrYAAAAJ&hl=en",
    title: "Advisor",
    badge: "AI academic depth",
    headline: "Provides one of the strongest scientific AI perspectives in the country.",
    body:
      "Founding Head of the Wadhwani School of Data Science & AI at IIT Madras, with decades of work across AI, machine learning, and robotics.",
    contribution:
      "Strengthens scientific rigor, long-horizon AI direction, and the research credibility behind ASTA's intelligence layer.",
    accent: "#7C5CFF",
    accentTo: "#4F6BFF",
  },
  {
    name: "Krishnakumar Srinivasan",
    initials: "KS",
    photo: "/team/krishnakumar.jpeg",
    linkedin: "https://www.linkedin.com/in/krishnakumar-srinivasan-32b1b51b/",
    title: "Advisor",
    badge: "Enterprise strategy and governance",
    headline: "Brings board-level perspective on execution, governance, and strategic scale.",
    body:
      "Investment professional, Founder & Director at Lion Hill Capital, and Independent Director at DEXIT Global, bringing experience across enterprise strategy and institutional decision-making.",
    contribution:
      "Helps ASTA think beyond product alone toward the governance, credibility, and commercial maturity buyers expect.",
    accent: "#28D7B5",
    accentTo: "#49C6FF",
  },
  {
    name: "Dr. Sandeep Murali",
    initials: "SM",
    photo: "/team/sandeep.png",
    linkedin: "https://www.linkedin.com/in/sandeep-murali-2080714/",
    title: "Advisor",
    badge: "Clinical judgment and administration",
    headline: "Keeps the hospital operator's lens close to product and adoption decisions.",
    body:
      "Surgeon, healthcare professional, and administrator with a strong orientation toward medicine, education, research, and innovation in institutional settings.",
    contribution:
      "Helps ASTA stay grounded in how hospital decisions are actually made across clinical, educational, and administrative environments.",
    accent: "#49C6FF",
    accentTo: "#28D7B5",
  },
];

const pedigreeItems: PedigreeItem[] = [
  {
    name: "AIC-SEED",
    descriptor: "Atal Incubation Centre - SEED",
    badge: "Incubation and acceleration",
    logo: "/partners/AIC-SEED.jpg",
    note:
      "Supports ASTA's translational medtech journey through incubation and accelerator backing tied to real-world healthcare innovation.",
    color: "#4F6BFF",
    colorTo: "#7C5CFF",
  },
  {
    name: "MeitY Startup Hub",
    descriptor: "Ministry of Electronics & IT, Government of India",
    badge: "National innovation backing",
    logo: "/partners/MeitY.png",
    note:
      "Provides national-level innovation support and public-sector credibility around ASTA's long-term role in digital health infrastructure.",
    color: "#28D7B5",
    colorTo: "#49C6FF",
  },
  {
    name: "IISER Pune",
    descriptor: "Indian Institute of Science Education and Research, Pune",
    badge: "Research grounding",
    logo: "/partners/IISER.png",
    note:
      "Anchors ASTA in scientific rigor and translational validation, reinforcing that the company is being shaped with research seriousness.",
    color: "#7C5CFF",
    colorTo: "#4F6BFF",
  },
  {
    name: "NIT Andhra Pradesh",
    descriptor: "National Institute of Technology, Andhra Pradesh",
    badge: "Engineering and founder pathway",
    logo: "/partners/NIT.png",
    note:
      "Represents the institute-linked engineering depth behind ASTA's technical build and the student-founder journey at the heart of its early growth.",
    color: "#49C6FF",
    colorTo: "#28D7B5",
  },
];

export const aboutHero: {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  microProof: string[];
  proofRow: HeroProof[];
} = {
  eyebrow: "Mission, leadership, and trust",
  headline: "Building the intelligence layer for",
  headlineAccent: "real hospital wards.",
  sub:
    "ASTA is building device-agnostic smart wards with practical, affordable, clinical-grade intelligence, led by a team spanning medicine, AI, enterprise technology, and hospital operations.",
  primaryCta: { label: "Talk to the ASTA team", href: ROUTES.contact },
  secondaryCta: { label: "See institutional backing", href: "#institutional-pedigree" },
  microProof: [
    "Device-agnostic smart wards on existing monitors",
    "AI at every bedside. Evidence at every decision.",
    "Built for real hospital, teaching, and institutional care environments",
  ],
  proofRow: [
    { value: "2025", label: "Live bedside use since" },
    { value: String(leadershipMembers.length), label: "Founding leaders" },
    { value: String(advisoryMembers.length), label: "Expert advisors" },
    { value: String(pedigreeItems.length), label: "Institutional anchors" },
  ],
};

export const aboutFoundingThesis: {
  eyebrow: string;
  heading: string;
  sub: string;
  narrative: string[];
  pressures: FoundingPressure[];
  principles: string[];
  response: string;
} = {
  eyebrow: "Why ASTA exists",
  heading: "The problem was never a lack of monitors. It was a lack of usable intelligence.",
  sub:
    "ASTA began with a clinician-led realization: real wards already had vital signals at the bedside, but those signals were still too often trapped inside fragmented screens, noisy alarm logic, and overstretched workflows.",
  narrative: [
    "Alarm fatigue makes it harder to distinguish the signal that matters. Mixed monitor brands make it harder to standardize visibility across a hospital. And between intermittent observation windows, meaningful deterioration can still be missed.",
    "Dr. Kumaresh's experience helped shape a sharper founding thesis: hospitals needed a practical system that could work on the monitor fleet already in place, surface deterioration earlier, and stay affordable enough for broad institutional adoption, including teaching hospitals and public-health environments.",
  ],
  pressures: [
    {
      icon: "bell",
      title: "Alarm fatigue",
      body:
        "Too many raw alerts, too little usable context, and too much burden on already stretched clinical teams.",
      color: "#4F6BFF",
      colorTo: "#7C5CFF",
    },
    {
      icon: "hospital",
      title: "Fragmented monitor estates",
      body:
        "Hospitals cannot modernize care by replacing every bedside monitor just to standardize visibility across wards.",
      color: "#28D7B5",
      colorTo: "#49C6FF",
    },
    {
      icon: "activity",
      title: "Missed deterioration",
      body:
        "The clinically important change often happens before a threshold breach and between observation cycles.",
      color: "#7C5CFF",
      colorTo: "#4F6BFF",
    },
  ],
  principles: [
    "AI at every bedside",
    "Evidence at every decision",
    "Dedicated clinical partner",
  ],
  response:
    "ASTA exists to turn trapped monitor output into usable clinical intelligence without asking hospitals to replace the systems they already run.",
};

export const aboutLeadership = {
  eyebrow: "Leadership team",
  heading: "A founding team designed across medicine, AI, enterprise systems, and commercial execution.",
  sub:
    "ASTA is not a single-discipline company. The team behind it brings together clinical problem definition, AI system-building, enterprise product experience, and hospital-facing execution.",
  pillars: [
    "Clinical leadership",
    "AI and robotics",
    "Enterprise systems",
    "Commercial execution",
  ],
  framing:
    "The team is intentionally built to cover the full hospital adoption path: identify the bedside problem, build the intelligence layer, deliver a reliable product system, and take it into institutional deployment.",
  members: leadershipMembers,
};

export const aboutAdvisoryBoard = {
  eyebrow: "Advisory board",
  heading: "Expert guidance where hospital AI needs it most.",
  sub:
    "ASTA's advisory board matters because hospital intelligence is judged on more than code alone. It has to stand up to scientific scrutiny, clinical scrutiny, and executive scrutiny at the same time.",
  lenses: [
    "Scientific AI rigor",
    "Clinical judgment",
    "Strategic execution",
  ],
  supportNote:
    "The board helps keep ASTA credible across research rigor, clinical judgment, and institutional decision-making: the exact areas serious hospital buyers care about.",
  members: advisoryMembers,
};

export const aboutInstitutionalPedigree = {
  eyebrow: "Institutional pedigree",
  heading: "Grounded in serious institutions, not built in isolation.",
  sub:
    "ASTA's credibility comes from more than product claims. The company is shaped by national innovation programs, research institutions, and institute-linked engineering depth around a real hospital deployment journey.",
  partners: pedigreeItems,
  footer:
    "For hospitals, this means ASTA shows up as a company shaped by clinical reality, research seriousness, and institution-facing execution. Not just demo-stage ambition.",
};

export const aboutCta: {
  eyebrow: string;
  heading: string;
  sub: string;
  primaryCta: CTA;
  secondaryCta: CTA;
} = {
  eyebrow: "Connect with ASTA",
  heading: "Talk to the team behind the platform.",
  sub:
    "If you are evaluating ASTA for a hospital, teaching institution, or monitored care program, we can walk through clinical fit, deployment posture, and what responsible adoption should look like in practice.",
  primaryCta: { label: "Request a walkthrough", href: ROUTES.demo },
  secondaryCta: { label: "Contact ASTA", href: ROUTES.contact },
};
