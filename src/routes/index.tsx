import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertOctagon,
  Activity,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import {
  Meter,
  Panel,
  PageHeader,
  SeverityBadge,
  StatCard,
  StatusPill,
} from "@/components/afd/primitives";
import { FindingDetail } from "@/components/afd/FindingDetail";
import {
  alerts,
  dashboardStats,
  detectionOverview,
  findings,
  riskLevel,
  riskTrend,
  type Finding,
} from "@/lib/afd-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AFD Dashboard — Anti-Forensics Detection" },
      {
        name: "description",
        content:
          "SOC-style dashboard for automated anti-forensics detection: risk scoring, evidence integrity and forensic findings.",
      },
      { property: "og:title", content: "AFD Dashboard — Anti-Forensics Detection" },
      {
        property: "og:description",
        content:
          "Detect, analyze, score and investigate anti-forensics activity across digital evidence.",
      },
    ],
  }),
  component: Dashboard,
});

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
} as const;

function chartTooltip() {
  return {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      fontSize: 12,
    },
    cursor: { fill: "oklch(1 0 0 / 4%)" },
  };
}

function Dashboard() {
  const [active, setActive] = useState<Finding | null>(null);
  const risk = riskLevel(dashboardStats.riskScore);

  return (
    <AppShell>
      <StageRail active="Detect" />
      <PageHeader
        title="Investigation Overview"
        subtitle="Live detection posture for case C-2291 · disk_image_01.E01"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ScanLine className="size-5" />}
          label="Total Scans"
          value={dashboardStats.totalScans}
          trend="▲ 12 this week"
        />
        <StatCard
          icon={<Activity className="size-5" />}
          label="Suspicious Activities"
          value={dashboardStats.suspicious}
          tone="high"
          trend="▲ 9 vs last scan"
        />
        <StatCard
          icon={<AlertOctagon className="size-5" />}
          label="Critical Findings"
          value={dashboardStats.critical}
          tone="critical"
          trend="▲ 3 vs last scan"
        />
        <StatCard
          icon={<ShieldCheck className="size-5" />}
          label="Evidence Integrity"
          value={`${dashboardStats.integrity}%`}
          tone="ok"
          trend="▼ 2% vs baseline"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Overall Risk Score" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <RiskDial score={dashboardStats.riskScore} />
            <div>
              <SeverityBadge severity={risk.tone} label={risk.label} />
              <p className="mt-3 text-sm text-muted-foreground">
                Multiple anti-forensics indicators detected.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                AI Anomaly Score:{" "}
                <span className="font-semibold text-primary">
                  {dashboardStats.aiAnomalyScore}%
                </span>{" "}
                <span className="text-[10px]">(prediction, not evidence)</span>
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <Meter value={dashboardStats.riskScore} tone="high" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>LOW</span>
              <span>MODERATE</span>
              <span>MEDIUM</span>
              <span>HIGH</span>
              <span>CRITICAL</span>
            </div>
          </div>
          <Link
            to="/evidence"
            className="mt-5 inline-flex text-sm font-medium text-primary hover:underline"
          >
            View Investigation →
          </Link>
        </Panel>

        <Panel
          title="Detection Overview"
          description="Findings per detection module"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={detectionOverview} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="category" {...axis} interval={0} angle={-12} dy={10} height={50} />
              <YAxis {...axis} />
              <Tooltip {...chartTooltip()} />
              <Bar dataKey="findings" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Risk Score Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={riskTrend} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="scan" {...axis} />
              <YAxis domain={[0, 100]} {...axis} />
              <Tooltip {...chartTooltip()} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--chart-4)"
                strokeWidth={2}
                dot={{ r: 3, fill: "var(--chart-4)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Recent Alerts" bodyClassName="p-3 space-y-2">
          {alerts.slice(0, 4).map((a) => (
            <div
              key={a.id}
              className="rounded-md border border-border bg-surface p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <SeverityBadge severity={a.severity} />
                <span className="text-[11px] text-muted-foreground">{a.time}</span>
              </div>
              <p className="mt-2 text-sm">{a.title}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {a.evidence}
                </span>
                <Link
                  to="/alerts"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <Panel title="Recent Findings" className="mt-4" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] tracking-wide text-muted-foreground uppercase">
                {["Severity", "Detection", "Evidence", "Timestamp", "Risk", "Status", "Action"].map(
                  (h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {findings.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-border/60 last:border-0 hover:bg-surface-2/50"
                >
                  <td className="px-5 py-3">
                    <SeverityBadge severity={f.severity} />
                  </td>
                  <td className="px-5 py-3">{f.detection}</td>
                  <td className="px-5 py-3 font-mono text-xs">{f.evidence}</td>
                  <td className="px-5 py-3 tabular-nums">{f.timestamp}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums">{f.risk}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={f.status} />
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setActive(f)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <FindingDetail finding={active} onOpenChange={() => setActive(null)} />
    </AppShell>
  );
}

function RiskDial({ score }: { score: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="size-32 shrink-0 -rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="var(--high)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * c} ${c}`}
      />
      <text
        x="60"
        y="56"
        textAnchor="middle"
        className="rotate-90 fill-foreground text-[22px] font-semibold"
        transform="rotate(90 60 60)"
      >
        {score}
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        className="fill-[var(--muted-foreground)] text-[11px]"
        transform="rotate(90 60 60)"
      >
        / 100
      </text>
    </svg>
  );
}
