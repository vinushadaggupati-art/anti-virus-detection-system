import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { Severity } from "@/lib/afd-data";

const severityStyles: Record<Severity | "ok", string> = {
  critical: "bg-critical/12 text-critical border-critical/40",
  high: "bg-high/12 text-high border-high/40",
  medium: "bg-medium/12 text-medium border-medium/40",
  low: "bg-low/12 text-low border-low/40",
  ok: "bg-ok/12 text-ok border-ok/40",
};

const dot: Record<Severity | "ok", string> = {
  critical: "bg-critical",
  high: "bg-high",
  medium: "bg-medium",
  low: "bg-low",
  ok: "bg-ok",
};

export function SeverityBadge({
  severity,
  label,
  className,
}: {
  severity: Severity | "ok";
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        severityStyles[severity],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot[severity])} />
      {label ?? severity}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Open" || status === "Critical" || status === "Suspicious"
      ? "high"
      : status === "Escalated"
        ? "critical"
        : status === "Inconsistent"
          ? "medium"
          : "ok";
  return <SeverityBadge severity={tone as Severity | "ok"} label={status} />;
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("panel", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            {title && (
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  tone = "primary",
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  tone?: "primary" | "high" | "critical" | "ok";
}) {
  const toneMap = {
    primary: "text-primary bg-primary/10 border-primary/30",
    high: "text-high bg-high/10 border-high/30",
    critical: "text-critical bg-critical/10 border-critical/30",
    ok: "text-ok bg-ok/10 border-ok/30",
  } as const;
  return (
    <div className="panel flex items-start gap-4 p-5">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-md border",
          toneMap[tone],
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        {trend && (
          <p className="mt-1.5 text-[11px] text-muted-foreground">{trend}</p>
        )}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Meter({ value, tone = "high" }: { value: number; tone?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${value}%`, backgroundColor: `var(--${tone})` }}
      />
    </div>
  );
}
