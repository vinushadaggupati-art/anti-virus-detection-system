import { useState } from "react";
import { toast } from "sonner";
import type { Finding } from "@/lib/afd-data";
import { SeverityBadge } from "./primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function FindingDetail({
  finding,
  onOpenChange,
}: {
  finding: Finding | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={!!finding} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card">
        {finding && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-base">
                {finding.detection} Detected
                <SeverityBadge severity={finding.severity} />
              </DialogTitle>
            </DialogHeader>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Row label="Evidence" value={finding.evidence} mono />
              <Row label="Finding ID" value={finding.id} mono />
              <Row label="Created" value={finding.created} />
              <Row label="Modified" value={finding.modified} />
              <Row label="Accessed" value={finding.accessed} />
              <Row label="Risk Score" value={`${finding.risk} / 100`} />
              <Row
                label="Severity"
                value={finding.severity.toUpperCase()}
              />
              <Row label="Confidence" value={`${finding.confidence}%`} />
            </dl>

            <div className="rounded-md border border-border bg-surface p-3">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Reason
              </p>
              <p className="mt-1 text-sm">{finding.reason}</p>
            </div>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Investigation note…"
              className="bg-surface"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  toast.success(`${finding.id} marked as reviewed`);
                  onOpenChange(false);
                }}
              >
                Mark as Reviewed
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast.success("Investigation note added to case file");
                  setNote("");
                }}
              >
                Add Investigation Note
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className={mono ? "font-mono text-xs" : "text-sm"}>{value}</dd>
    </div>
  );
}
