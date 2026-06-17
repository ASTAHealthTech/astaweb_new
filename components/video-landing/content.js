export const navItems = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Customers', href: '/#trust' },
  { label: 'Partners', href: '/#trust' },
  { label: 'About', href: '/about' }
];

export const heroPills = [
  'Existing monitor context',
  'Source-grounded review',
  'Ranked clinical lanes',
  'Missing checks + audit'
];

export const vitals = [
  { label: 'HR', value: '78', unit: 'bpm', range: '60–100' },
  { label: 'SpO₂', value: '97', unit: '%', range: '95–100' },
  { label: 'BP', value: '124/78', unit: 'mmHg', range: 'Sys 90–140' },
  { label: 'RR', value: '18', unit: '/min', range: '12–20' },
  { label: 'Temp', value: '37.1', unit: '°C', range: '36.5–37.5' }
];

export const storyCards = [
  {
    eyebrow: 'Monitor reality',
    number: '01',
    title: 'ASTA reads the monitor room before the alert becomes noise.',
    body: 'ASTA starts at the bedside: monitor screen, vitals trend, waveform context, recent data, and the clinical question are captured into one signal route.',
    sees: 'A cleaner first read of what changed, where it changed, and whether signal quality is affecting trust.'
  },
  {
    eyebrow: 'Patient packet',
    number: '02',
    title: 'The live signal becomes a packet clinicians can inspect.',
    body: 'Vitals, labs, medication context, notes, source trail, and missing data are kept visible instead of being flattened into one opaque alert.',
    sees: 'Every lane carries supporting and counter-signal context before it reaches the handoff.'
  },
  {
    eyebrow: 'Review output',
    number: '03',
    title: 'The handoff stays questionable, auditable, and safe.',
    body: 'ASTA compresses multiple specialist lanes into one reviewable output with the source cards and missing checks attached.',
    sees: 'A clinician-facing answer that can be challenged, reviewed, and improved.'
  }
];

export const pipeline = [
  {
    eyebrow: 'Sensory layer',
    title: 'Monitor vision',
    text: 'screen reading, waveform support, device context',
    tags: ['camera', 'LCD', 'no API']
  },
  {
    eyebrow: 'Context layer',
    title: 'Patient packet',
    text: 'vitals, labs, meds, notes, missing data',
    tags: ['vitals', 'labs', 'meds']
  },
  {
    eyebrow: 'Direction layer',
    title: 'Forecast and risk heads',
    text: 'trend direction, confidence posture, horizon limits',
    tags: ['trajectory', 'risk', 'confidence']
  },
  {
    eyebrow: 'Evidence layer',
    title: 'Knowledge retrieval',
    text: 'retrieval, references, source cards',
    tags: ['retrieval', 'references', 'source cards']
  },
  {
    eyebrow: 'Reasoning layer',
    title: 'Specialist lanes',
    text: 'ranked lanes, counter-signals, confirmers',
    tags: ['ranked lanes', 'counter-signals', 'confirmers']
  },
  {
    eyebrow: 'Review layer',
    title: 'Council output',
    text: 'clinician review, audit, feedback',
    tags: ['review', 'audit', 'feedback']
  }
];

export const lanes = [
  { name: 'Pulse', subtitle: 'trend direction', body: 'Vitals drift, deterioration direction, temporal signal.' },
  { name: 'Aegis', subtitle: 'safety guard', body: 'Uncertainty, abstain posture, missing checks.' },
  { name: 'Atlas', subtitle: 'context map', body: 'Patient packet, labs, meds, ward context.' },
  { name: 'Nyra', subtitle: 'source lane', body: 'Reference support, source cards, evidence trail.' },
  { name: 'Lumen', subtitle: 'review output', body: 'Ranked lanes, explainability, feedback loop.' }
];

export const revealTabs = [
  {
    tab: 'Why active',
    badge: 'Direction',
    heading: 'ASTA shows why the lane is active',
    text: 'The output is not just a threshold breach. It carries trajectory, uncertainty, and the clinical signal that made the lane rise.'
  },
  {
    tab: 'What confirms',
    badge: 'What confirms',
    heading: 'ASTA asks for the next useful checks',
    text: 'The lane avoids false certainty. It tells the clinician what data would make the lane stronger, weaker, or unnecessary.'
  },
  {
    tab: 'What reduces',
    badge: 'Counter-signal',
    heading: 'Counter-signals stay visible',
    text: 'A source-grounded review keeps negative findings, artifact risk, and alternative explanations next to the ranked output.'
  },
  {
    tab: 'What is missing',
    badge: 'Missing check',
    heading: 'Missing data becomes a clinical object',
    text: 'When the record is thin, ASTA prioritizes the missing checks instead of overconfidently filling the gap.'
  }
];

export const useCases = [
  { title: 'Ward escalation', text: 'Turn monitor noise and patient context into reviewable escalation lanes before the handoff becomes chaotic.' },
  { title: 'Artifact vs. deterioration', text: 'Show why a signal may be artifact, why deterioration remains plausible, and which checks clarify it.' },
  { title: 'Renal / medication safety', text: 'Make medication context, renal/metabolic changes, and missing labs visible beside the reasoning.' },
  { title: 'Sparse-patient review', text: 'When the data is thin, ASTA prioritizes missing checks instead of forcing an overconfident answer.' },
  { title: 'ICU / step-down handoff', text: 'Compress trends, source cards, and active lanes into a packet that survives transition of care.' },
  { title: 'Source-grounded review', text: 'Keep the relevant source cards and counter-signals attached to every lane a clinician sees.' }
];

export const platformStats = [
  { value: '98%', label: 'CV extraction accuracy' },
  { value: '<2s', label: 'Monitor to clinical output' },
  { value: '15+', label: 'OEM monitor brands' },
  { value: '100M+', label: 'Labeled monitor frames' }
];

export const trustCards = [
  { title: 'AIC-SEED', meta: 'Incubation', text: 'Venture support for translational healthcare innovation.' },
  { title: 'MeitY Startup Hub', meta: 'National innovation', text: 'Government innovation program backing technology ventures.' },
  { title: 'IISER Pune', meta: 'Research', text: 'Scientific rigor grounding product development.' },
  { title: 'NIT Andhra Pradesh', meta: 'Technology', text: 'Engineering depth and clinical validation support.' }
];

export const productPanels = [
  { title: 'Ward cockpit', text: 'Bed status, critical flags, recording state, and ASTA entry points in one scan-friendly view.' },
  { title: 'Risk workbench', text: 'Review vitals drift, signal quality, lane confidence, and artifact risk before escalation.' },
  { title: 'Clinical conversation', text: 'Source-aligned handoff with patient signals, evidence support, missing data, governance, and memory.' }
];

export const team = [
  {
    name: 'Dr. Vikram Paramasivan',
    role: 'CEO and Co-Founder',
    img: '/team/1.jpeg',
    text: 'Technology leader with long experience building AI-driven products across large-scale software environments.',
    profile: 'https://www.linkedin.com/in/vparamas/'
  },
  {
    name: 'Dr. Kumaresh Krishnamoorthy',
    role: 'CMO and Co-Founder',
    img: '/team/2.jpeg',
    text: 'ENT surgeon and health-tech builder focused on practical clinical workflows and real-world adoption.',
    profile: 'https://www.linkedin.com/in/drkumaresh/'
  },
  {
    name: 'Adyanta Dubey',
    role: 'CTO and Co-Founder',
    img: '/team/3.jpeg',
    imgPosition: 'center 12%',
    text: 'AI, robotics, full-stack, and data-science builder leading the technical development of ASTA.',
    profile: 'https://www.linkedin.com/in/adyanta-dubey-a57895225/'
  },
  {
    name: 'Mr. Varun Singh',
    role: 'Chief Business Officer and Co-Founder',
    img: '/team/11.jpeg',
    text: 'Business leader with experience across immigration, project delivery, investment migration, and enterprise growth.',
    profile: 'https://www.linkedin.com/in/varunxiphias/'
  }
];

export const advisors = [
  {
    name: 'Dr. Karthick Seshadri',
    role: 'Advisor',
    img: '/team/6.webp',
    text: 'Assistant Professor at NIT Andhra Pradesh and AI researcher focused on deep learning systems.',
    profile: 'https://scholar.google.co.in/citations?user=7KmAy8AAAAAJ'
  },
  {
    name: 'Dr. Balaraman Ravindran',
    role: 'Advisor',
    img: '/team/7.jpeg',
    text: 'Founding Head, Wadhwani School of Data Science and AI, IIT Madras.',
    profile: 'https://www.linkedin.com/in/balaraman-ravindran-427a307/'
  },
  {
    name: 'Mr. Krishnakumar Srinivasan',
    role: 'Advisor',
    img: '/team/9.jpeg',
    text: 'Investment professional, founder and director at Lion Hill Capital, and independent director at DEXIT Global.',
    profile: 'https://www.linkedin.com/in/krishnakumar-srinivasan-32b1b51b/'
  },
  {
    name: 'Dr. Sandeep Murali',
    role: 'Advisor',
    img: '/team/10.png',
    text: 'Healthcare professional, surgeon, and administrator with a passion for medicine, education, research, and innovation.',
    profile: 'https://www.linkedin.com/in/sandeep-murali-2080714/'
  }
];
