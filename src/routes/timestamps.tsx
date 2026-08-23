import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import { PageHeader, Panel, SeverityBadge } from "@/components/afd/primitives";
import { evidenceFiles } from "@/lib/afd-data";

export const Route = createFileRoute("/timestamps")({
  head: () => ({
    meta: [
      { title: "Timestamp Analysis — AFD" },
      {
        name: "description",
        content:
          "MACB timeline analysis highlighting modified-before-created, access anomalies and timestamp gaps.",
      },
      { property: "og:title", content: "Timestamp Analysis — AFD" },
      {
        property: "og:description",
        content: "Created → Modified → Accessed timeline with suspicious relationship detection.",
      },
    ],
  }),
  component: Timestamps,
});

const anomalies = [
  { rule: "Modified before creation", hits: 4, severity: "critical" as const },
  { rule: "Accessed before creation", hits: 2, severity: "high" as const },
  { rule: "Unusual timestamp changes", hits: 11, severity: "high" as const },
  { rule: "Timestamp gaps in timeline", hits: 4, severity: "medium" as const },
];

function Timestamps() {
  return (
    <AppShell>
      <StageRail active="Analyze" />
      <PageHeader
        title="Timestamp Analysis"
        subtitle="MACB timeline reconstruction and anti-forensics indicators"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {anomalies.map((a) => (
          <div key={a.rule} className="panel p-5">
            <SeverityBadge severity={a.severity} />
            <p className="mt-3 text-2xl font-semibold tabular-nums">{a.hits}</p>
            <p className="text-xs text-muted-foreground">{a.rule}</p>
          </div>
        ))}
      </div>

      <Panel title="Evidence Timelines" className="mt-4" bodyClassName="space-y-4 p-5">
        {evidenceFiles.map((f) => {
          const suspicious = f.severity === "critical" || f.severity === "high";
          return (
            <div
              key={f.file}
              className={
                "rounded-md border p-4 " +
                (suspicious ? "border-high/35 bg-high/6" : "border-border bg-surface")
              }
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-sm">{f.file}</p>
                <SeverityBadge severity={f.severity} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <Node label="Created" value={f.created} />
                <span className="text-muted-foreground">→</span>
                <Node label="Modified" value={f.modified} warn={suspicious} />
                <span className="text-muted-foreground">→</span>
                <Node label="Accessed" value={f.accessed} />
              </div>
              {suspicious && (
                <p className="mt-3 text-xs text-high">
                  Suspicious relationship: modification timestamp is inconsistent with the
                  established evidence timeline.
                </p>
              )}
            </div>
          );
        })}
      </Panel>
    </AppShell>
  );
}

function Node({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div
      className={
        "rounded-md border px-3 py-2 " +
        (warn ? "border-high/50 bg-high/10 text-high" : "border-border bg-surface-2")
      }
    >
      <p className="text-[10px] tracking-wide uppercase opacity-70">{label}</p>
      <p className="font-mono text-xs">{value}</p>
    </div>
  );
}
