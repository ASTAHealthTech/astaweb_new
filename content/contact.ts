import type { CTA, IconName } from "@/lib/types";
import { deployments } from "@/content/home";

type ContactProofItem = {
  value: string;
  label: string;
};

type ContactHelpItem = {
  icon: IconName;
  title: string;
  body: string;
};

type ContactStep = {
  step: string;
  title: string;
  body: string;
};

type ContactChannel = {
  icon: IconName;
  title: string;
  body: string;
  email: string;
};

export const CONTACT_EMAIL = "info@astahealthtech.com";
const CONTACT_PHONE_RAW = "918779404951";
export const CONTACT_PHONE_DISPLAY = "+91 87794 04951";
export const CONTACT_PHONE_LINK = `tel:+${CONTACT_PHONE_RAW}`;
export const CONTACT_WHATSAPP_URL =
  `https://wa.me/${CONTACT_PHONE_RAW}?text=` +
  encodeURIComponent("Hello ASTA team, I would like to discuss a hospital or deployment inquiry.");

export const contactInquiryTypes = [
  "Product walkthrough",
  "Deployment review",
  "Teaching hospital / research",
  "Partnership",
  "Other",
] as const;

export type ContactInquiryType = (typeof contactInquiryTypes)[number];

const liveHospitalCount = deployments.items.length;
const liveStates = Array.from(new Set(deployments.items.map((deployment) => deployment.state))).sort(
  (a, b) => a.localeCompare(b),
);
const liveCities = Array.from(new Set(deployments.items.map((deployment) => deployment.city))).sort(
  (a, b) => a.localeCompare(b),
);

export function resolveContactInquiryType(intent?: string): ContactInquiryType {
  switch (intent) {
    case "demo":
      return "Product walkthrough";
    case "deployment":
      return "Deployment review";
    case "academic":
      return "Teaching hospital / research";
    case "partner":
      return "Partnership";
    default:
      return "Other";
  }
}

export const contactHero: {
  eyebrow: string;
  headline: string;
  sub: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  microProof: string[];
} = {
  eyebrow: "Contact ASTA",
  headline: "Get in touch with ASTA.",
  sub:
    "Send a quick inquiry or start a WhatsApp chat.",
  primaryCta: { label: "Send an inquiry", href: "#contact-form" },
  secondaryCta: { label: "Chat on WhatsApp", href: CONTACT_WHATSAPP_URL },
  microProof: [],
};

export const contactMain: {
  eyebrow: string;
  heading: string;
  sub: string;
  channelsTitle: string;
  channels: {
    icon: IconName;
    label: string;
    value: string;
    href: string;
    note?: string;
  }[];
  whatsapp: {
    title: string;
    body: string;
    ctaLabel: string;
    href: string;
  };
  address: {
    eyebrow: string;
    company: string;
    body: string;
  };
} = {
  eyebrow: "Contact details",
  heading: "Reach ASTA Healthtech Private Limited",
  sub: "Use the form or contact us directly.",
  channelsTitle: "Direct contact",
  channels: [
    {
      icon: "mail",
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: "phone",
      label: "Phone / WhatsApp",
      value: CONTACT_PHONE_DISPLAY,
      href: CONTACT_PHONE_LINK,
    },
  ],
  whatsapp: {
    title: "WhatsApp chat",
    body: "Quick replies for demos, deployment discussions, and follow-up.",
    ctaLabel: "Open WhatsApp chat",
    href: CONTACT_WHATSAPP_URL,
  },
  address: {
    eyebrow: "Office address",
    company: "ASTA Healthtech Private Limited",
    body:
      "Kaveri Regent Coronet, Aurbis Prime, 11, 80 Feet Rd, 3rd Block, Koramangala, Bengaluru, Karnataka 560034",
  },
};

export const contactForm = {
  eyebrow: "Inquiry form",
  heading: "Send us a message",
  sub: "We will get back to you soon.",
  labels: {
    fullName: "Full name",
    workEmail: "Work email",
    institution: "Hospital / institution",
    phone: "Contact number",
    message: "What would you like to discuss?",
  },
  placeholders: {
    fullName: "Your full name",
    workEmail: "name@hospital.org",
    institution: "Hospital, institution, or organization",
    phone: "Phone number",
    message: "Your message",
  },
  consentLabel:
    "I consent to ASTA using these details to respond to this inquiry and coordinate the next conversation.",
  submitLabel: "Send inquiry",
};

export const contactProofStrip: {
  eyebrow: string;
  title: string;
  note: string;
  items: ContactProofItem[];
} = {
  eyebrow: "Public proof points",
  title: "A serious contact page still needs concrete proof.",
  note:
    "These are the public-safe signals ASTA can stand behind before a hospital or institution enters a deeper review.",
  items: [
    { value: String(liveHospitalCount), label: "Named live hospital deployments" },
    { value: "15+", label: "OEM monitor brands supported" },
    { value: "98%", label: "Computer-vision accuracy" },
    { value: "0", label: "New monitor fleet required" },
    { value: "4", label: "Institutional anchors" },
  ],
};

export const contactNextSteps: {
  eyebrow: string;
  heading: string;
  sub: string;
  steps: ContactStep[];
} = {
  eyebrow: "What happens next",
  heading: "A clear path from first outreach to deployment review.",
  sub:
    "ASTA keeps the first response operational. The goal is to understand the setting, assess fit, and decide whether a deeper product and deployment conversation makes sense.",
  steps: [
    {
      step: "01",
      title: "ASTA reviews your context",
      body:
        "The team reviews the monitored environment, institution type, and inquiry theme so the conversation starts in the right lane.",
    },
    {
      step: "02",
      title: "Initial fit conversation",
      body:
        "A first discussion clarifies ward type, current monitoring setup, operational goals, and whether ASTA fits the setting.",
    },
    {
      step: "03",
      title: "Product or platform walkthrough",
      body:
        "If there is alignment, ASTA walks through the product, workflow surfaces, and relevant use patterns for your environment.",
    },
    {
      step: "04",
      title: "Deployment review and next steps",
      body:
        "The team outlines the deployment posture, rollout considerations, and the next actions required for a more formal review.",
    },
  ],
};

export const contactDetails: {
  eyebrow: string;
  heading: string;
  sub: string;
  primaryEmail: string;
  channels: ContactChannel[];
} = {
  eyebrow: "Direct contact details",
  heading: "Prefer direct email instead of the form?",
  sub:
    "ASTA routes serious hospital, academic, and partner outreach through one contact point. Use the same address whether you are evaluating a walkthrough, deployment fit, research relevance, or partnership scope.",
  primaryEmail: CONTACT_EMAIL,
  channels: [
    {
      icon: "hospital",
      title: "Hospital deployment conversations",
      body:
        "For ward fit, product walkthroughs, rollout questions, and monitored-environment deployment reviews.",
      email: CONTACT_EMAIL,
    },
    {
      icon: "layers",
      title: "Academic and teaching institution outreach",
      body:
        "For teaching-hospital, research, validation, protocol, and institution-led innovation conversations.",
      email: CONTACT_EMAIL,
    },
    {
      icon: "compass",
      title: "Partnership and institutional conversations",
      body:
        "For collaboration, channel, program, and broader institution-facing partnership discussions.",
      email: CONTACT_EMAIL,
    },
  ],
};
