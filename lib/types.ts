import type { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type IconName =
  | "activity"
  | "shield"
  | "bell"
  | "mail"
  | "phone"
  | "message-circle"
  | "user"
  | "building"
  | "globe"
  | "search"
  | "chevron-down"
  | "eye"
  | "workflow"
  | "server"
  | "dashboard"
  | "route"
  | "cloud"
  | "cpu"
  | "heart-pulse"
  | "layers"
  | "lock"
  | "check"
  | "arrow-right"
  | "hospital"
  | "stethoscope"
  | "camera"
  | "bar-chart"
  | "compass"
  | "spark"
  | "map-pin"
  | "linkedin"
  | "twitter";

export type Capability = {
  icon: IconName;
  title: string;
  body: string;
};

export type HowStep = {
  step: string;
  title: string;
  body: string;
  icon: IconName;
};

export type Deployment = {
  name: string;
  category: string;
  region: string;
  status: "Live" | "Piloting" | "Onboarding";
  note?: string;
};

export type InstitutionalPartner = {
  name: string;
  descriptor: string;
  note?: string;
  href?: string;
};

export type DemoBullet = {
  title: string;
  body: string;
};

export type DemoMetric = {
  label: string;
  value: string;
  note: string;
};

export type HospitalDeployment = {
  name: string;
  city: string;
  state: string;
  status: "Live" | "Scaling" | "Expansion";
  liveSince: string;
  website: string;
  note: string;
};

export type Outcome = {
  icon: IconName;
  audience: string;
  title: string;
  body: string;
  metric?: string;
  proof?: string;
};

export type ComplianceProofItem = {
  icon: IconName;
  title: string;
  body: string;
};

export type ComplianceMetric = {
  label: string;
  score: number;
  color: string;
  statusLabel?: string;
};

export type SecurityMetric = {
  val: string;
  label: string;
  color: string;
};

export type AuditEvent = {
  time: string;
  type: "ok" | "info";
  msg: string;
};

export type CTA = {
  label: string;
  href: string;
};

export type SectionCommon = {
  eyebrow?: string;
  heading: string | ReactNode;
  sub?: string;
};
