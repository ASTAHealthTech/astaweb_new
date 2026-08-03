import type {
  AuditEvent,
  Capability,
  ComplianceMetric,
  ComplianceProofItem,
  CTA,
  DemoBullet,
  DemoMetric,
  HospitalDeployment,
  HowStep,
  InstitutionalPartner,
  Outcome,
  SecurityMetric,
} from "@/lib/types";
import { ROUTES } from "@/lib/constants";

export const hero = {
  eyebrow: "AI Healthcare Solutions",
  headline: "AI Healthcare Solutions",
  headlineAccent: "for Hospitals.",
  sub:
    "ASTA Health Tech delivers device-agnostic AI healthcare solutions: converting raw monitor displays into continuous physiological AI reasoning and role-aware clinical action.",
  primaryCta: { label: "Request a demo", href: ROUTES.demo },
  secondaryCta: { label: "Explore product", href: ROUTES.platform },
  microProof: [
    "15+ OEM monitor brands supported",
    "Zero hardware replacement required",
    "Real-time physiological AI reasoning",
  ],
};

export const clinicalAiInAction: {
  eyebrow: string;
  heading: string;
  sub: string;
  mediaLabel: string;
  mediaTitle: string;
  mediaCaption: string;
  primaryCta: CTA;
  bullets: DemoBullet[];
  metrics: DemoMetric[];
} = {
  eyebrow: "From pixels to clinical action",
  heading: "Advanced healthcare AI solutions for hospitals: Monitor reading to physiological reasoning.",
  sub:
    "As one of the best healthcare AI solutions for hospitals, ASTA mounts a non-invasive camera on existing bedside monitors. Structured vitals flow continuously into our predictive analytics clinical AI platform, enabling real-time clinical intelligence and role-aware action to prevent patient deterioration.",
  mediaLabel: "Live product walkthrough",
  mediaTitle: "Computer vision reads any monitor. Physiological reasoning drives clinical action.",
  mediaCaption:
    "Live walkthrough: monitor display reading, structured vital extraction, and evidence-linked alert routing across an active ward deployment.",
  primaryCta: { label: "Request a walkthrough", href: ROUTES.demo },
  bullets: [
    {
      title: "Computer vision reads any monitor",
      body: "A camera mounts on the bedside monitor, not the patient, and reads any LCD display from any OEM brand. No API. No hardware tap. No hospital IT integration required for the monitoring layer.",
    },
    {
      title: "Structured vital extraction",
      body: "Raw display data becomes structured, time-stamped vitals: heart rate, SpO₂, blood pressure, respiratory rate, extracted at 98% CV accuracy across 15+ OEM brands.",
    },
    {
      title: "Physiological reasoning layer",
      body: "A Physiological Pattern Learning Model evaluates vital trajectories, identifies deterioration signals, and produces evidence-linked clinical context, going beyond threshold alerting.",
    },
    {
      title: "Role-aware clinical action",
      body: "Alerts reach the right clinician with physiological context and trajectory attached, not a bare threshold trigger. The governance trail is captured in the same operational flow.",
    },
  ],
  metrics: [
    { label: "Signal to interpretation", value: "<2s", note: "Real-time, ward-scale" },
    { label: "CV model accuracy", value: "98%", note: "100M+ labeled monitor frames" },
    { label: "OEM brands supported", value: "15+", note: "Any monitor, no API required" },
  ],
};

export const institutionalTrust: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: InstitutionalPartner[];
} = {
  eyebrow: "Institutional backing",
  heading: "National innovation backing and research institution support.",
  sub:
    "ASTA is supported by government-recognised innovation programs and research institutions, grounding a clinical AI product in translational validation and institutional credibility.",
  items: [
    {
      name: "AIC-SEED",
      descriptor: "Atal Incubation Centre - SEED",
      note: "Translational healthcare innovation support: incubation, validation, and early-stage clinical deployment backing.",
    },
    {
      name: "MeitY Startup Hub",
      descriptor: "Ministry of Electronics & IT, Government of India",
      note: "Government of India innovation program backing for technology ventures building national health infrastructure.",
    },
    {
      name: "IISER Pune",
      descriptor: "Indian Institute of Science Education and Research, Pune",
      note: "Research institution support grounding clinical AI product development in scientific rigour and translational validation.",
    },
    {
      name: "NIT Andhra Pradesh",
      descriptor: "National Institute of Technology, Andhra Pradesh",
      note: "Engineering collaboration supporting product depth, technical validation, and field deployment.",
    },
  ],
};

export const trust: {
  heading: string;
  sub: string;
  postures: string[];
} = {
  heading: "Designed for institutional deployment",
  sub:
    "Numerical vitals only. No patient imagery. Standard monitoring consent. Engineered for regulated clinical environments and hospital governance requirements.",
  postures: [
    "Numerical data only. No patient imagery.",
    "Standard monitoring consent",
    "DPDP-aligned posture",
    "Legal audit trail",
    "Role-based access control",
  ],
};

export const howItWorks: {
  eyebrow: string;
  heading: string;
  sub: string;
  steps: HowStep[];
} = {
  eyebrow: "How our clinical AI platform works",
  heading: "Automated clinical data extraction and predictive analytics in five continuous steps.",
  sub:
    "Signal capture to clinical escalation, running continuously across every bed, transforming existing infrastructure into a real-time data stream.",
  steps: [
    {
      step: "01",
      title: "Capture",
      subtitle: "Optical Screen Capture & Non-Invasive Camera Mounting",
      body: "A non-invasive camera mounts directly on the bedside monitor frame (facing the display screen, not the patient). ASTA reads any LCD display continuously across all ward lighting environments: with zero serial ports, zero hardware taps, zero EMR dependencies, and zero patient imagery.",
      highlights: [
        "100% Display-Facing: Focuses exclusively on monitor numerical displays",
        "Zero Hardware Taps: Operates without opening or altering monitor hardware",
        "Zero Patient Imagery: Completely privacy-preserving with standard consent",
      ],
      icon: "camera",
    },
    {
      step: "02",
      title: "Extract",
      subtitle: "Computer Vision & Multi-OEM Vital Digitization",
      body: "Deep-learning computer vision models (trained on 100M+ labeled monitor frames across 15+ OEM brands including Mindray, Philips, GE, Dräger, Schiller, Nihon Kohden) digitize raw screen pixels into structured numerical vitals in real time (<2s latency) at 98% accuracy.",
      highlights: [
        "Structured Vitals: Heart Rate, SpO₂, NIBP, Respiratory Rate & Temperature",
        "Multi-OEM Support: Legacy & modern monitor displays supported out-of-the-box",
        "Real-Time Cadence: Continuous 2-second processing across active ward beds",
      ],
      icon: "eye",
    },
    {
      step: "03",
      title: "Reason",
      subtitle: "Physiological AI Pattern Learning Model",
      body: "Going beyond rigid single-parameter threshold alarms, ASTA's Physiological Pattern Learning Model analyzes multi-vital trajectories continuously. It detects early deterioration cues (e.g. subtle cross-parameter shifts before sepsis or collapse) and generates evidence-linked clinical differentials.",
      highlights: [
        "Multi-Vital Trajectory: Evaluates joint rate-of-change across parameters",
        "Early Deterioration Cues: Identifies instability hours before overt crisis",
        "Auditable Proof: Links every reasoning insight directly to source vital trends",
      ],
      icon: "cpu",
    },
    {
      step: "04",
      title: "Alert",
      subtitle: "Role-Aware Escalation & Trajectory Context",
      body: "Context-enriched alerts are routed directly to assigned nurses, duty doctors, or specialist mobile surfaces. Each alert includes the full vital trajectory trend, ranked clinical differentials, and recommended next steps: eliminating alarm fatigue and transient false alarms.",
      highlights: [
        "Role-Aware Dispatch: Directs alerts based on shift assignments and acuity",
        "Rich Clinical Context: Includes trajectory graphs and ranked differentials",
        "False Alarm Filter: Suppresses transient motion/sensor artifact spikes",
      ],
      icon: "bell",
    },
    {
      step: "05",
      title: "Review",
      subtitle: "Unit Oversight & Operational Governance",
      body: "Nursing leadership and clinical heads gain continuous real-time visibility over every bed through centralized intelligence dashboards. Full time-stamped audit trails log every vital snapshot and clinical escalation for shift handovers and DPDP 2023 compliance.",
      highlights: [
        "Clinical Oversight Dashboard: Live status grid for every bed in the unit",
        "Shift Handover Efficiency: Instant longitudinal summaries for incoming teams",
        "Audit & Compliance: Complete time-stamped logs for governance & safety",
      ],
      icon: "bar-chart",
    },
  ],
};

export const capabilities: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: Capability[];
} = {
  eyebrow: "Platform capabilities",
  heading: "A comprehensive clinical AI platform, built for robust data deployment.",
  sub:
    "Every module is engineered to operate inside real hospital workflows: turning existing hardware into reliable, observable clinical data streams.",
  items: [
    {
      icon: "activity",
      title: "Real-time vital extraction",
      body: "Structured vitals extracted continuously from any OEM monitor display: heart rate, SpO₂, blood pressure, respiratory rate, at clinical cadence across every bed in the ward.",
    },
    {
      icon: "bell",
      title: "Trajectory-aware alerts",
      body: "Context-enriched alerting built on physiological trajectory, engineered to reduce alarm fatigue while surfacing the signals that demand clinical attention.",
    },
    {
      icon: "dashboard",
      title: "Unit-level visibility",
      body: "Unit, department, and patient-level data dashboards built for nursing and clinical leadership, delivering real-time intelligence across all beds, not just the IT team.",
    },
    {
      icon: "shield",
      title: "Compliance-ready posture",
      body: "Numerical vitals only. No patient imagery. Standard monitoring consent. DPDP-aligned architecture, full audit trail, and role-based access aligned to hospital governance.",
    },
    {
      icon: "route",
      title: "Workflow compatibility",
      body: "HL7/FHIR-aligned. Connects with existing EMR, escalation protocols, and ward workflows. No hospital IT integration is required for monitor reading; connection is additive, not a prerequisite.",
    },
    {
      icon: "cloud",
      title: "Deployment flexibility",
      body: "Camera on the monitor, not the patient. Same-day deployment on existing infrastructure. On-prem, hybrid, or managed cloud, matched to the hospital's IT posture and data governance requirements.",
    },
  ],
};

export const deployments: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: HospitalDeployment[];
  publicNote: string;
} = {
  eyebrow: "Live hospital deployments",
  heading: "10+ hospital deployments, including named live sites across Tamil Nadu and Karnataka.",
  sub:
    "Named, verified deployments in active patient-care environments. Not pilots, not proof-of-concept installations.",
  publicNote:
    "Each deployment is operational in an active patient-care environment, in partnership with hospital clinical and technical teams. Public website references included where available.",
  items: [
    {
      name: "Southern Railway HQ Hospital",
      city: "Chennai",
      state: "Tamil Nadu",
      status: "Live",
      liveSince: "2025",
      website: "https://srhqh.edu.in",
      note: "Continuous clinical data streams deployed across active patient-care units in collaboration with hospital and railway medical leadership.",
    },
    {
      name: "Karnataka ENT Hospital",
      city: "Chitradurga",
      state: "Karnataka",
      status: "Live",
      liveSince: "2025",
      website: "https://kenthospitals.com",
      note: "Bedside vital extraction and alert routing adapted to ENT-specific clinical workflows and patient acuity patterns.",
    },
    {
      name: "Aksha Hospital",
      city: "Bangalore",
      state: "Karnataka",
      status: "Live",
      liveSince: "2025",
      website: "https://akshahospital.in",
      note: "Multi-ward deployment with real-time vital monitoring across clinical, nursing, and operational teams in an active hospital environment.",
    },
    {
      name: "Seethapathy Clinic",
      city: "Chennai",
      state: "Tamil Nadu",
      status: "Live",
      liveSince: "2025",
      website: "https://seethapathyclinic.org",
      note: "Continuous observation and escalation routing configured to clinic-specific patient care protocols and ward operating patterns.",
    },
    {
      name: "K.S. Hospital",
      city: "Kumbakonam",
      state: "Tamil Nadu",
      status: "Live",
      liveSince: "2025",
      website: "https://kshospital.co.in",
      note: "Bedside monitor reading configured to existing equipment and ward layout. No infrastructure change required at deployment.",
    },
    {
      name: "Sugam Hospital",
      city: "Kumbakonam",
      state: "Tamil Nadu",
      status: "Live",
      liveSince: "2026",
      website: "https://jsdl.in",
      note: "Real-time vital extraction and threshold-based alert routing configured for continuous operational intelligence across active units.",
    },
    {
      name: "Anbu Hospital",
      city: "Kumbakonam",
      state: "Tamil Nadu",
      status: "Live",
      liveSince: "2026",
      website: "https://anbuhospital.org",
      note: "Active ward deployment with vital monitoring and clinical escalation in partnership with hospital clinical and operations teams.",
    },
  ],
};

export const outcomes: {
  eyebrow: string;
  heading: string;
  sub: string;
  items: Outcome[];
} = {
  eyebrow: "Deployment model",
  heading: "Practical healthcare AI and clinical intelligence software you can deploy today.",
  sub:
    "ASTA delivers structured data value across clinical, operational, and governance dimensions, with an AI deployment model designed for how hospitals actually buy and operate technology.",
  items: [
    {
      icon: "server",
      audience: "Operating model",
      title: "Zero hardware capex. Predictable operating cost.",
      body: "Runs on the monitors and infrastructure hospitals already own. A camera per monitor, a per-bed operating model, and ASTA's clinical and technical team guiding deployment from day one. No device fleet to procure, no refresh program required.",
      metric: "No new monitor fleet capex",
      proof: "Same-day deployment available",
    },
    {
      icon: "heart-pulse",
      audience: "Clinical safety",
      title: "Continuous monitoring without disruption.",
      body: "ASTA adds real-time vital extraction and physiological reasoning to existing bedside workflows, improving signal continuity and deterioration visibility without forcing monitor changeover or clinical retraining.",
      metric: "24/7 signal continuity",
      proof: "Works on existing monitor fleet",
    },
    {
      icon: "stethoscope",
      audience: "Escalation quality",
      title: "Evidence-linked alerts. Not alarm noise.",
      body: "Threshold-driven routing delivers physiological context, vital trajectory, and ranked differentials to the right clinician, designed to reduce alarm fatigue while ensuring deteriorating patients are not missed.",
      metric: "Role-aware alert routing",
      proof: "Physiological context at escalation",
    },
    {
      icon: "lock",
      audience: "Governance",
      title: "Hospital-owned. Institutionally controlled.",
      body: "Numerical vitals only. No patient imagery. Standard monitoring consent. Data residency, retention policy, access control, and audit posture remain under hospital ownership, not vendor-defined defaults.",
      metric: "Full audit trail",
      proof: "No patient imagery captured",
    },
  ],
};

export const security: {
  eyebrow: string;
  heading: string;
  sub: string;
  quickMetrics: SecurityMetric[];
  scorecard: ComplianceMetric[];
  proofItems: ComplianceProofItem[];
  auditEvents: AuditEvent[];
} = {
  eyebrow: "Compliance posture",
  heading: "Numerical data only. Hospital-controlled. Institutionally auditable.",
  sub:
    "ASTA reads LCD display numerics, not patients. No patient imagery is captured or transmitted. Standard monitoring consent applies. DPDP-aligned architecture, ISO 13485-certified quality management, HL7/FHIR-aligned interoperability, role-based access, and full audit trail, with deployment posture under hospital control.",
  quickMetrics: [
    { val: "ISO 13485", label: "Certified", color: "#28D7B5" },
    { val: "DPDP", label: "Aligned", color: "#4F6BFF" },
    { val: "E2E", label: "Encryption", color: "#7C5CFF" },
  ],
  scorecard: [
    { label: "ISO 13485 (Medical device QMS)", score: 100, color: "#28D7B5", statusLabel: "Certified" },
    { label: "Consent tracking", score: 100, color: "#4F6BFF", statusLabel: "Active" },
    { label: "Legal audit trail", score: 100, color: "#4F6BFF", statusLabel: "Complete" },
    { label: "DPDP alignment", score: 96, color: "#49C6FF", statusLabel: "Aligned" },
    { label: "Data residency control", score: 94, color: "#7C5CFF", statusLabel: "Institution-controlled" },
    { label: "HL7/FHIR interoperability", score: 88, color: "#4F6BFF", statusLabel: "Supported" },
    { label: "CDSCO (SaMD registration)", score: 45, color: "#F59E0B", statusLabel: "In progress" },
  ],
  proofItems: [
    {
      icon: "lock",
      title: "Numerical data only. No patient imagery.",
      body: "ASTA reads LCD display numerics only. A camera mounts on the monitor, not the patient. No patient imagery is captured, stored, or transmitted. Standard monitoring consent applies. No special patient data protocols required.",
    },
    {
      icon: "shield",
      title: "Standard consent. DPDP-aligned. ISO 13485 certified.",
      body: "Monitor-facing camera reads display data only. No patient biometrics, no facial data, no imagery leaves the bedside environment. DPDP-aligned architecture, ISO 13485-certified quality management, CDSCO SaMD registration in progress.",
    },
    {
      icon: "check",
      title: "Full audit trail and role-based access",
      body: "Every access event, clinical interaction, and data operation is logged for legal review, governance reporting, and institutional compliance. Role-based access control is enforced at every layer.",
    },
    {
      icon: "server",
      title: "No IT integration required for monitor reading",
      body: "ASTA reads monitor displays via computer vision. No hospital IT integration, no HL7 feed, no API required for the monitoring layer. HL7/FHIR-aligned EMR connectivity is available. On-prem, hybrid, or managed cloud, hospital-controlled throughout.",
    },
  ],
  auditEvents: [
    { time: "09:42:17", type: "ok", msg: "Role:nurse accessed ward4 vitals · consent:verified · policy:pass" },
    { time: "09:41:55", type: "ok", msg: "Legal audit export triggered · actor:ops-lead · reason:review" },
    { time: "09:40:03", type: "info", msg: "Session token refreshed · user:dr_sharma · residency:india" },
    { time: "09:38:11", type: "ok", msg: "PHI query logged · access:authorised · control:rbac" },
    { time: "09:37:44", type: "info", msg: "CV layer: numerics only · patient-imagery:none · consent:standard" },
  ],
};

export const finalCta = {
  eyebrow: "Review deployment fit",
  heading: "See ASTA reading live ward monitors.",
  sub:
    "A focused 30-minute session with our clinical and engineering team, covering monitor compatibility, ward workflow fit, and deployment requirements for your unit.",
  primaryCta: { label: "Request a demo", href: ROUTES.demo },
  secondaryCta: { label: "Talk to our team", href: ROUTES.contact },
};
