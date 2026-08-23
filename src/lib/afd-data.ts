// Mock forensic data layer.
// Every page reads from here so the app can later be swapped to real API calls
// (one fetch layer, same shapes) without touching components.

export type Severity = "critical" | "high" | "medium" | "low";

export const SEVERITY_POINTS: Record<Severity, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 3,
};

export function riskLevel(score: number): {
  label: string;
  tone: Severity | "ok";
} {
  if (score <= 20) return { label: "LOW RISK", tone: "ok" };
  if (score <= 40) return { label: "MODERATE RISK", tone: "low" };
  if (score <= 60) return { label: "MEDIUM RISK", tone: "medium" };
  if (score <= 80) return { label: "HIGH RISK", tone: "high" };
  return { label: "CRITICAL RISK", tone: "critical" };
}

/** Configurable weighted risk score, normalised to 0-100. */
export function computeRiskScore(
  counts: Partial<Record<Severity, number>>,
  maxPoints = 200,
): number {
  const raw = (Object.keys(SEVERITY_POINTS) as Severity[]).reduce(
    (sum, key) => sum + (counts[key] ?? 0) * SEVERITY_POINTS[key],
    0,
  );
  return Math.min(100, Math.round((raw / maxPoints) * 100));
}

export const dashboardStats = {
  totalScans: 128,
  suspicious: 37,
  critical: 8,
  integrity: 94,
  riskScore: 78,
  aiAnomalyScore: 87,
  filesAnalyzed: 24_812,
};

export const detectionOverview = [
  { category: "Hidden Files", findings: 14 },
  { category: "Timestamp Tampering", findings: 21 },
  { category: "Log Deletion", findings: 9 },
  { category: "Browser Anomalies", findings: 12 },
  { category: "File Integrity", findings: 6 },
  { category: "Malware Indicators", findings: 4 },
];

export const riskTrend = [
  { scan: "Scan 01", score: 25 },
  { scan: "Scan 02", score: 34 },
  { scan: "Scan 03", score: 46 },
  { scan: "Scan 04", score: 63 },
  { scan: "Scan 05", score: 78 },
];

export type Finding = {
  id: string;
  severity: Severity;
  detection: string;
  evidence: string;
  timestamp: string;
  risk: number;
  status: "Open" | "Reviewed" | "Escalated";
  confidence: number;
  reason: string;
  created: string;
  modified: string;
  accessed: string;
};

export const findings: Finding[] = [
  {
    id: "F-1041",
    severity: "critical",
    detection: "Log Deletion",
    evidence: "system.log",
    timestamp: "21:34",
    risk: 92,
    status: "Open",
    confidence: 96,
    reason:
      "A contiguous block of 214 syslog entries is missing while sequence identifiers continue, indicating selective log removal.",
    created: "08:02 AM",
    modified: "09:41 PM",
    accessed: "09:44 PM",
  },
  {
    id: "F-1042",
    severity: "high",
    detection: "Timestamp Tampering",
    evidence: "evidence01.txt",
    timestamp: "20:18",
    risk: 78,
    status: "Open",
    confidence: 94,
    reason:
      "File modification timestamp is inconsistent with the evidence timeline.",
    created: "12:30 PM",
    modified: "09:15 PM",
    accessed: "12:35 PM",
  },
  {
    id: "F-1043",
    severity: "medium",
    detection: "Hidden File",
    evidence: ".hidden_data",
    timestamp: "19:45",
    risk: 51,
    status: "Reviewed",
    confidence: 81,
    reason:
      "Hidden attribute set on a user-space archive containing packed binaries outside expected directories.",
    created: "07:10 PM",
    modified: "07:41 PM",
    accessed: "07:44 PM",
  },
  {
    id: "F-1044",
    severity: "high",
    detection: "Browser Artifact Inconsistency",
    evidence: "chrome/History",
    timestamp: "18:52",
    risk: 74,
    status: "Open",
    confidence: 88,
    reason:
      "Download records exist without matching history entries; a history range was cleared selectively.",
    created: "02:11 PM",
    modified: "06:50 PM",
    accessed: "06:51 PM",
  },
  {
    id: "F-1045",
    severity: "low",
    detection: "Hash Drift",
    evidence: "config.ini",
    timestamp: "17:20",
    risk: 22,
    status: "Reviewed",
    confidence: 62,
    reason: "Baseline hash differs; change matches an approved config update.",
    created: "09:00 AM",
    modified: "05:12 PM",
    accessed: "05:12 PM",
  },
  {
    id: "F-1046",
    severity: "critical",
    detection: "Anti-Forensics Tool Signature",
    evidence: "wipe_helper.exe",
    timestamp: "16:04",
    risk: 95,
    status: "Escalated",
    confidence: 97,
    reason:
      "Binary matches known secure-deletion utility hash set (3 indicator matches).",
    created: "03:40 PM",
    modified: "03:58 PM",
    accessed: "04:02 PM",
  },
];

export const alerts = [
  {
    id: "A-311",
    severity: "critical" as Severity,
    title: "Timestamp manipulation detected",
    evidence: "evidence01.txt",
    time: "21:36",
    reviewed: false,
  },
  {
    id: "A-312",
    severity: "high" as Severity,
    title: "Suspicious hidden files detected",
    evidence: ".hidden_data",
    time: "20:02",
    reviewed: false,
  },
  {
    id: "A-313",
    severity: "medium" as Severity,
    title: "Browser artifact inconsistency detected",
    evidence: "chrome/History",
    time: "18:55",
    reviewed: true,
  },
  {
    id: "A-314",
    severity: "critical" as Severity,
    title: "Secure-deletion utility signature matched",
    evidence: "wipe_helper.exe",
    time: "16:07",
    reviewed: false,
  },
  {
    id: "A-315",
    severity: "low" as Severity,
    title: "Baseline hash drift on configuration file",
    evidence: "config.ini",
    time: "17:22",
    reviewed: true,
  },
];

export const evidenceFiles = [
  {
    file: "evidence01.txt",
    type: "Text",
    size: "12 KB",
    created: "12:30 PM",
    modified: "09:15 PM",
    accessed: "12:35 PM",
    sha: "9f2c41a7e0b8d3c5f1a6b902e7d4c8135a0f6b2e94c7d1a3e5b8f0c2d4a6e819",
    status: "Suspicious",
    severity: "high" as Severity,
  },
  {
    file: "system.log",
    type: "Log",
    size: "3.4 MB",
    created: "08:02 AM",
    modified: "09:41 PM",
    accessed: "09:44 PM",
    sha: "1b7e93d0c4a25f68e1d3b8a0c7f24e95d6a1b3c8e0f7d2a4c6b9e1f3a5d7c082",
    status: "Critical",
    severity: "critical" as Severity,
  },
  {
    file: ".hidden_data",
    type: "Archive",
    size: "820 KB",
    created: "07:10 PM",
    modified: "07:41 PM",
    accessed: "07:44 PM",
    sha: "4c8a1e0b6d95f273a8c0e4b1d7f39a26c5b8e0d3f1a7c9b2e4d6a8c0f2b4d691",
    status: "Suspicious",
    severity: "medium" as Severity,
  },
  {
    file: "config.ini",
    type: "Config",
    size: "4 KB",
    created: "09:00 AM",
    modified: "05:12 PM",
    accessed: "05:12 PM",
    sha: "7d3f1a9c5e0b2d846f1a3c7e9b0d2f5a8c1e4b7d0f3a6c9e2b5d8f1a4c7e0b93",
    status: "Verified",
    severity: "low" as Severity,
  },
  {
    file: "wipe_helper.exe",
    type: "Executable",
    size: "1.1 MB",
    created: "03:40 PM",
    modified: "03:58 PM",
    accessed: "04:02 PM",
    sha: "0a5c8e2b7d1f4a936c0e8b2d5f7a1c4e9b3d6f0a2c5e8b1d4f7a0c3e6b9d2f45",
    status: "Critical",
    severity: "critical" as Severity,
  },
];

export const hiddenFiles = [
  {
    file: ".hidden_data",
    location: "/home/user/Documents",
    attribute: "Hidden + System",
    type: "Archive",
    size: "820 KB",
    risk: "medium" as Severity,
    reason: "Packed archive stored outside expected working directories",
  },
  {
    file: ".bash_history.bak",
    location: "/home/user",
    attribute: "Hidden",
    type: "Text",
    size: "6 KB",
    risk: "high" as Severity,
    reason: "Shadow copy of a shell history file that was truncated",
  },
  {
    file: "~$report.docx",
    location: "/home/user/Cases/C-2291",
    attribute: "Hidden",
    type: "Document",
    size: "44 KB",
    risk: "low" as Severity,
    reason: "Office lock artifact; benign but retained for timeline",
  },
  {
    file: ".ads:stream1",
    location: "C:\\Users\\Public",
    attribute: "Alternate Data Stream",
    type: "Binary",
    size: "212 KB",
    risk: "critical" as Severity,
    reason: "Executable content concealed in an NTFS alternate data stream",
  },
];

export const logAnalysis = {
  analyzed: 41_206,
  missing: 214,
  deleted: 3,
  modified: 17,
  suspicious: 26,
  events: [
    {
      time: "21:34:11",
      source: "system.log",
      event: "Sequence gap detected (214 entries)",
      severity: "critical" as Severity,
    },
    {
      time: "21:12:02",
      source: "auth.log",
      event: "Log rotation forced outside schedule",
      severity: "high" as Severity,
    },
    {
      time: "20:41:39",
      source: "audit.log",
      event: "Audit policy disabled for 6 minutes",
      severity: "high" as Severity,
    },
    {
      time: "19:58:44",
      source: "app.log",
      event: "Timestamp ordering inconsistency",
      severity: "medium" as Severity,
    },
    {
      time: "18:20:07",
      source: "syslog",
      event: "Service restart without shutdown record",
      severity: "low" as Severity,
    },
  ],
};

export const browserArtifacts = [
  {
    browser: "Chrome",
    history: 1_284,
    downloads: 46,
    cookies: 912,
    cache: "412 MB",
    searches: 318,
    status: "Suspicious",
    note: "Downloads without matching history entries (selective clearing)",
  },
  {
    browser: "Edge",
    history: 402,
    downloads: 8,
    cookies: 221,
    cache: "96 MB",
    searches: 74,
    status: "Inconsistent",
    note: "Cache entries newer than the last recorded visit",
  },
  {
    browser: "Firefox",
    history: 96,
    downloads: 2,
    cookies: 48,
    cache: "12 MB",
    searches: 11,
    status: "Clean",
    note: "No anti-forensics indicators identified",
  },
];

export const malware = {
  scanned: 24_812,
  suspicious: 19,
  indicators: 7,
  hashMatches: 3,
  threat: "HIGH",
  items: [
    {
      file: "wipe_helper.exe",
      indicator: "Secure-deletion utility signature",
      match: "Hash set match",
      severity: "critical" as Severity,
    },
    {
      file: "svc_updater.dll",
      indicator: "Packed binary, high entropy (7.91)",
      match: "Heuristic",
      severity: "high" as Severity,
    },
    {
      file: "tmpclean.bat",
      indicator: "Bulk artifact deletion script",
      match: "Behavioural",
      severity: "high" as Severity,
    },
    {
      file: "netcheck.py",
      indicator: "Obfuscated network beacon",
      match: "Heuristic",
      severity: "medium" as Severity,
    },
  ],
};

export const integrity = {
  verified: 24_612,
  modified: 148,
  deleted: 39,
  created: 13,
  files: [
    {
      file: "system.log",
      original: "1b7e93d0c4a25f68e1d3b8a0c7f24e95",
      current: "8c2d40f6a1b93e57d0c4a28f6b1e93d0",
      ok: false,
    },
    {
      file: "evidence01.txt",
      original: "9f2c41a7e0b8d3c5f1a6b902e7d4c813",
      current: "5a0f6b2e94c7d1a3e5b8f0c2d4a6e819",
      ok: false,
    },
    {
      file: "config.ini",
      original: "7d3f1a9c5e0b2d846f1a3c7e9b0d2f5a",
      current: "7d3f1a9c5e0b2d846f1a3c7e9b0d2f5a",
      ok: true,
    },
    {
      file: "case_notes.md",
      original: "3e6b9d2f450a5c8e2b7d1f4a936c0e8b",
      current: "3e6b9d2f450a5c8e2b7d1f4a936c0e8b",
      ok: true,
    },
  ],
};

export const scanHistory = [
  {
    scanId: "SCN-0128",
    caseId: "C-2291",
    evidence: "disk_image_01.E01",
    date: "2026-08-23",
    findings: 37,
    risk: 78,
    investigator: "V. Daggupati",
    status: "Completed",
  },
  {
    scanId: "SCN-0127",
    caseId: "C-2291",
    evidence: "usb_dump.dd",
    date: "2026-08-21",
    findings: 22,
    risk: 63,
    investigator: "V. Daggupati",
    status: "Completed",
  },
  {
    scanId: "SCN-0126",
    caseId: "C-2280",
    evidence: "laptop_home.tar",
    date: "2026-08-18",
    findings: 14,
    risk: 46,
    investigator: "A. Rao",
    status: "Completed",
  },
  {
    scanId: "SCN-0125",
    caseId: "C-2277",
    evidence: "mail_archive.pst",
    date: "2026-08-14",
    findings: 9,
    risk: 34,
    investigator: "S. Menon",
    status: "Reviewed",
  },
  {
    scanId: "SCN-0124",
    caseId: "C-2271",
    evidence: "server_logs.zip",
    date: "2026-08-09",
    findings: 5,
    risk: 25,
    investigator: "A. Rao",
    status: "Archived",
  },
];

export const currentCase = {
  caseId: "C-2291",
  evidence: "disk_image_01.E01",
  scanDate: "2026-08-23 21:40 UTC",
  investigator: "V. Daggupati",
  filesAnalyzed: 24_812,
  findings: 37,
  risk: 78,
};

export const scanStages = [
  "Evidence Acquisition",
  "File Analysis",
  "Artifact Analysis",
  "Anomaly Detection",
  "Risk Calculation",
  "Report Generation",
];

export const detectionModules = [
  "Hidden File Detection",
  "Timestamp Tampering Detection",
  "Log Deletion Detection",
  "Browser Artifact Analysis",
  "Memory Analysis",
  "Malware Scanning",
  "File Integrity Monitoring",
  "AI Anomaly Detection",
];
