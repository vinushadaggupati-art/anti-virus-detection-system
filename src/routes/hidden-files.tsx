import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EyeOff, Files, AlertOctagon, AlertTriangle } from "lucide-react";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import {
  PageHeader,
  Panel,
  SeverityBadge,
  StatCard,
} from "@/components/afd/primitives";
import { hiddenFiles } from "@/lib/afd-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/hidden-files")({
  head: () => ({
    meta: [
      { title: "Hidden File Detection — AFD" },
      {
        name: "description",
        content:
          "Detect concealed files, hidden attributes and NTFS alternate data streams across acquired evidence.",
      },
      { property: "og:title", content: "Hidden File Detection — AFD" },
      {
        property: "og:description",
        content: "Concealed file discovery with risk rating and detection rationale.",
      },
    ],
  }),
  component: HiddenFiles,
});

function HiddenFiles() {
  const [q, setQ] = useState("");
  const rows = hiddenFiles.filter((f) =>
    (f.file + f.location).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <StageRail active="Analyze" />
      <PageHeader
        title="Hidden File Detection"
        subtitle="Concealed artifacts, hidden attributes and alternate data streams"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Files className="size-5" />} label="Files Scanned" value="24,812" />
        <StatCard icon={<EyeOff className="size-5" />} label="Hidden Files" value="142" tone="high" />
        <StatCard
          icon={<AlertTriangle className="size-5" />}
          label="Suspicious Files"
          value="14"
          tone="high"
        />
        <StatCard
          icon={<AlertOctagon className="size-5" />}
          label="Critical Files"
          value="1"
          tone="critical"
        />
      </div>

      <Panel
        title="Hidden File Inventory"
        className="mt-4"
        bodyClassName="p-0"
        action={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="h-8 w-48 bg-surface text-xs"
          />
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] tracking-wide text-muted-foreground uppercase">
                {["File", "Location", "Attribute", "Type", "Size", "Risk", "Reason"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.file} className="border-b border-border/60 last:border-0 hover:bg-surface-2/50">
                  <td className="px-5 py-3 font-mono text-xs">{f.file}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{f.location}</td>
                  <td className="px-5 py-3">{f.attribute}</td>
                  <td className="px-5 py-3">{f.type}</td>
                  <td className="px-5 py-3 tabular-nums">{f.size}</td>
                  <td className="px-5 py-3">
                    <SeverityBadge severity={f.risk} />
                  </td>
                  <td className="max-w-sm px-5 py-3 text-xs text-muted-foreground">{f.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
