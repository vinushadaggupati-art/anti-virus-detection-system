import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createFileRoute as _unused } from "@tanstack/react-router";
import { AppShell, StageRail } from "@/components/afd/AppShell";
import { PageHeader, Panel } from "@/components/afd/primitives";
import { detectionModules, scanStages } from "@/lib/afd-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

void _unused;

export const Route = createFileRoute("/new-scan")({
  head: () => ({
    meta: [
      { title: "New Forensic Scan — AFD" },
      {
        name: "description",
        content:
          "Configure evidence sources and detection modules, then run an automated anti-forensics scan.",
      },
      { property: "og:title", content: "New Forensic Scan — AFD" },
      {
        property: "og:description",
        content: "Select evidence, enable detection modules and start a forensic scan.",
      },
    ],
  }),
  component: NewScan,
});

function NewScan() {
  const [selected, setSelected] = useState<string[]>(detectionModules.slice(0, 4));
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (stage >= scanStages.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [running, stage]);

  const toggle = (m: string) =>
    setSelected((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );

  return (
    <AppShell>
      <StageRail active="Detect" />
      <PageHeader
        title="New Forensic Scan"
        subtitle="Configure evidence source and detection modules"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Select Evidence" bodyClassName="space-y-4 p-5">
          <Field label="Upload forensic image">
            <Input type="file" className="bg-surface" />
          </Field>
          <Field label="Evidence folder">
            <Input defaultValue="/mnt/evidence/C-2291" className="bg-surface font-mono text-xs" />
          </Field>
          <Field label="Case ID">
            <Input defaultValue="C-2291" className="bg-surface" />
          </Field>
          <Field label="Investigator">
            <Input defaultValue="V. Daggupati" className="bg-surface" />
          </Field>
        </Panel>

        <Panel title="Detection Modules" bodyClassName="space-y-3 p-5">
          {detectionModules.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface px-3 py-2.5 text-sm"
            >
              <Checkbox
                checked={selected.includes(m)}
                onCheckedChange={() => toggle(m)}
              />
              {m}
            </label>
          ))}
          <Button
            className="w-full font-semibold tracking-wide"
            disabled={running || selected.length === 0}
            onClick={() => {
              setRunning(true);
              setStage(0);
            }}
          >
            {running ? "SCAN IN PROGRESS…" : "START FORENSIC SCAN"}
          </Button>
        </Panel>
      </div>

      {running && (
        <Panel title="Scan Workflow" className="mt-4" bodyClassName="p-5">
          <ol className="space-y-1">
            {scanStages.map((s, i) => {
              const done = i < stage;
              const current = i === stage;
              return (
                <li key={s}>
                  <div
                    className={
                      "flex items-center gap-3 rounded-md border px-4 py-3 text-sm " +
                      (done
                        ? "border-ok/30 bg-ok/8 text-ok"
                        : current
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-surface text-muted-foreground")
                    }
                  >
                    {done ? (
                      <CheckCircle2 className="size-4" />
                    ) : current ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Circle className="size-4" />
                    )}
                    {s}
                  </div>
                  {i < scanStages.length - 1 && (
                    <div className="py-0.5 pl-6 text-muted-foreground/60">↓</div>
                  )}
                </li>
              );
            })}
          </ol>
          {stage >= scanStages.length && (
            <p className="mt-4 text-sm text-ok">
              Scan complete — 37 findings, risk score 78/100. Open Evidence Analysis to
              investigate.
            </p>
          )}
        </Panel>
      )}
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}
