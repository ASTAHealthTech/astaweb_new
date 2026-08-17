import type { CTA, IconName } from "@/lib/types";

export const partnerForm = {
  eyebrow: "Partner with ASTA",
  heading: "Become a Channel Partner",
  sub: "Bring ASTA's clinical AI to your region or network.",
  labels: {
    fullName: "Full name",
    workEmail: "Work email",
    institution: "Organization / Company",
    phone: "Contact number",
    country: "Country",
    state: "State / Province",
    message: "How can you help ASTA? (Connections, reach, etc.)",
  },
  placeholders: {
    fullName: "Your full name",
    workEmail: "name@company.com",
    institution: "Company name",
    phone: "Phone number",
    country: "Select country",
    state: "State or province",
    message: "Describe your network, capabilities, and how we can collaborate...",
  },
  consentLabel:
    "I consent to ASTA using these details to respond to this partnership inquiry and coordinate the next conversation.",
  submitLabel: "Submit Proposal",
};

export const partnerMain = {
  eyebrow: "Channel Partners",
  heading: "Expand clinical intelligence globally.",
  sub: "We partner with established distributors, system integrators, and healthcare consultants to bring ASTA's bedside AI to new regions and networks.",
  channelsTitle: "Direct partner contact",
  channels: [
    {
      icon: "mail" as IconName,
      label: "Partnership Inquiries",
      value: "adyanta@astahealthtech.com",
      href: "mailto:adyanta@astahealthtech.com?subject=Channel%20Partner%20Inquiry",
    },
  ],
};
