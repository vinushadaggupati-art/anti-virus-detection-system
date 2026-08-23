import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollText, FileMinus, Trash2, PenLine, AlertTriangle } from "lucide-react";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import { PageHeader, Panel, SeverityBadge, StatCard } from "@/components/afd/primitives";
import { logAnalysis } from "@/lib/afd-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/logs")({
  head: () => ({
    meta: [
      { title: "Log Analysis — AFD" },
      {
        name: "description",
        content:
          "Detect log deletion, sequence gaps and modified audit entries across acquired system logs.",
      },
      { property: "og:title", content: "Log Analysis — AFD" },
      {
        property: "og:description",
        content: "Missing entries, deletion indicators and suspicious log events.",
      },
    ],
  }),
  component: Logs,
});

function Logs() {
  const [q, setQ] = useState("");
  const events = logAnalysis.events.filter((e) =>
    (e.event + e.source).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <StageRail active="Analyze" />
      <PageHeader title="Log Analysis" subtitle="Log deletion and tampering indicators" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={<ScrollText className="size-5" />}
          label="Logs Analyzed"
          value={logAnalysis.analyzed.toLocaleString()}
        />
        <StatCard
          icon={<FileMinus className="size-5" />}
          label="Missing Entries"
          value={logAnalysis.missing}
          tone="critical"
        />
        <StatCard
          icon={<Trash2 className="size-5" />}
          label="Deleted Indicators"
          value={logAnalysis.deleted}
          tone="critical"
        />
        <StatCard
          icon={<PenLine className="size-5" />}
          label="Modified Entries"
          value={logAnalysis.modified}
          tone="high"
        />
        <StatCard
          icon={<AlertTriangle className="size-5" />}
          label="Suspicious Events"
          value={logAnalysis.suspicious}
          tone="high"
        />
      </div>

      <Panel
        title="Event Log"
        className="mt-4"
        bodyClassName="p-0"
        action={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events…"
            className="h-8 w-52 bg-surface text-xs"
          />
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] tracking-wide text-muted-foreground uppercase">
                {["Time", "Source", "Event", "Severity"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.time} className="border-b border-border/60 last:border-0 hover:bg-surface-2/50">
                  <td className="px-5 py-3 font-mono text-xs tabular-nums">{e.time}</td>
                  <td className="px-5 py-3 font-mono text-xs">{e.source}</td>
                  <td className="px-5 py-3">{e.event}</td>
                  <td className="px-5 py-3">
                    <SeverityBadge severity={e.severity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
