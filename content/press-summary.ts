/**
 * The few press numbers the home page needs, kept apart from content/press.ts
 * so the full outlet list never ships in the home bundle.
 */
export const pressStats = {
  outlets: 182,
  over100k: 5,
  over10k: 15,
  /** sum of the outlets' estimated monthly visits */
  combinedVisits: 1645590,
} as const;

/** The four names the home page strip shows, in order. */
export const pressStripNames = ["The Daily Guardian", "RT News24", "Sangri Today", "Bhaskar Live"] as const;
