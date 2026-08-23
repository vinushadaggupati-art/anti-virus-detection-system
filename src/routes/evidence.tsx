import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import {
  PageHeader,
  Panel,
  SeverityBadge,
  StatusPill,
} from "@/components/afd/primitives";
import { FindingDetail } from "@/components/afd/FindingDetail";
import {
  currentCase,
  evidenceFiles,
  findings,
  type Finding,
  type Severity,
} from "@/lib/afd-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence Analysis — AFD" },
      {
        name: "description",
        content:
          "Forensic scan results, severity breakdown and a searchable evidence explorer with SHA-256 hashes.",
      },
      { property: "og:title", content: "Evidence Analysis — AFD" },
      {
        property: "og:description",
        content: "Review scan results, findings by severity and file-level evidence metadata.",
      },
    ],
  }),
  component: Evidence,
});

const severities: (Severity | "all")[] = ["all", "critical", "high", "medium", "low"];

function Evidence() {
  const [query, setQuery] = useState("");
  const [sev, setSev] = useState<Severity | "all">("all");
  const [active, setActive] = useState<Finding | null>(null);

  const rows = useMemo(
    () =>
      evidenceFiles.filter(
        (f) =>
          (sev === "all" || f.severity === sev) &&
          f.file.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, sev],
  );

  const counts = (["critical", "high", "medium", "low"] as Severity[]).map((s) => ({
    s,
    n: findings.filter((f) => f.severity === s).length,
  }));

  return (
    <AppShell>
      <StageRail active="Investigate" />
      <PageHeader
        title="Forensic Scan Results"
        subtitle={`Case ${currentCase.caseId} · ${currentCase.evidence}`}
      />

      <Panel title="Case Summary" bodyClassName="grid gap-4 p-5 sm:grid-cols-4">
        <Meta label="Case ID" value={currentCase.caseId} />
        <Meta label="Evidence" value={currentCase.evidence} />
        <Meta label="Scan Date" value={currentCase.scanDate} />
        <Meta label="Investigator" value={currentCase.investigator} />
        <Meta label="Files Analyzed" value={currentCase.filesAnalyzed.toLocaleString()} />
        <Meta label="Findings" value={String(currentCase.findings)} />
        <Meta label="Risk Score" value={`${currentCase.risk} / 100`} />
        <Meta label="AI Anomaly Score" value="87% (prediction)" />
      </Panel>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {counts.map(({ s, n }) => (
          <div key={s} className="panel p-5">
            <SeverityBadge severity={s} label={`${s} findings`} />
            <p className="mt-3 text-3xl font-semibold tabular-nums">{n}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Evidence Explorer"
        className="mt-4"
        bodyClassName="p-0"
        action={
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files…"
              className="h-8 w-44 bg-surface text-xs"
            />
            <select
              value={sev}
              onChange={(e) => setSev(e.target.value as Severity | "all")}
              className="h-8 rounded-md border border-input bg-surface px-2 text-xs capitalize"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] tracking-wide text-muted-foreground uppercase">
                {["File", "Type", "Size", "Created", "Modified", "Accessed", "SHA-256", "Status"].map(
                  (h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.file} className="border-b border-border/60 last:border-0 hover:bg-surface-2/50">
                  <td className="px-5 py-3 font-mono text-xs">{f.file}</td>
                  <td className="px-5 py-3">{f.type}</td>
                  <td className="px-5 py-3 tabular-nums">{f.size}</td>
                  <td className="px-5 py-3">{f.created}</td>
                  <td className="px-5 py-3">{f.modified}</td>
                  <td className="px-5 py-3">{f.accessed}</td>
                  <td className="max-w-[180px] truncate px-5 py-3 font-mono text-[11px] text-muted-foreground">
                    {f.sha}
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={f.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No evidence matches the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Findings" className="mt-4" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] tracking-wide text-muted-foreground uppercase">
                {["Severity", "Detection", "Evidence", "Confidence", "Risk", "Status", "Action"].map(
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
                <tr key={f.id} className="border-b border-border/60 last:border-0 hover:bg-surface-2/50">
                  <td className="px-5 py-3">
                    <SeverityBadge severity={f.severity} />
                  </td>
                  <td className="px-5 py-3">{f.detection}</td>
                  <td className="px-5 py-3 font-mono text-xs">{f.evidence}</td>
                  <td className="px-5 py-3 tabular-nums">{f.confidence}%</td>
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}
