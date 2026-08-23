import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  BarChart3,
  Bug,
  Clock,
  Cpu,
  Files,
  FileSearch,
  FileText,
  Globe,
  History,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  EyeOff,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-scan", label: "New Scan", icon: Search },
  { to: "/evidence", label: "Evidence Analysis", icon: FileSearch },
  { to: "/hidden-files", label: "Hidden Files", icon: EyeOff },
  { to: "/timestamps", label: "Timestamp Analysis", icon: Clock },
  { to: "/logs", label: "Log Analysis", icon: ScrollText },
  { to: "/browser", label: "Browser Artifacts", icon: Globe },
  { to: "/memory", label: "Memory Analysis", icon: Cpu },
  { to: "/malware", label: "Malware Detection", icon: Bug },
  { to: "/integrity", label: "File Integrity", icon: ShieldCheck },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/history", label: "Scan History", icon: History },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const stages = [
  { label: "Detect", icon: Activity },
  { label: "Analyze", icon: FileSearch },
  { label: "Score Risk", icon: BarChart3 },
  { label: "Investigate", icon: Files },
  { label: "Report", icon: FileText },
];

export function StageRail({ active }: { active?: string }) {
  return (
    <div className="panel mb-6 flex flex-wrap items-center gap-1 px-4 py-2.5">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-1">
          <span
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium tracking-wide uppercase",
              active === s.label
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground",
            )}
          >
            <s.icon className="size-3.5" />
            {s.label}
          </span>
          {i < stages.length - 1 && (
            <span className="text-muted-foreground/50">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
          <div className="flex size-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
            <Shield className="size-5" />
          </div>
          <div>
            <p className="text-base leading-tight font-semibold tracking-wider">
              AFD
            </p>
            <p className="text-[11px] text-muted-foreground">
              Anti-Forensics Detection
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "border border-primary/25 bg-sidebar-accent font-medium text-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2.5">
            <div className="flex size-8 items-center justify-center rounded-full border border-border bg-surface-2 text-xs font-semibold">
              VD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">V. Daggupati</p>
              <p className="text-[11px] text-muted-foreground">Investigator</p>
            </div>
            <Link
              to="/login"
              aria-label="Logout"
              className="text-muted-foreground transition-colors hover:text-critical"
            >
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex flex-wrap items-center gap-4 px-6 py-3.5">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[15px] font-semibold">
                Automated Anti-Forensics Detection
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Digital Evidence Integrity &amp; Threat Analysis
              </p>
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search evidence, hashes, cases…"
                className="h-9 w-64 rounded-md border border-input bg-surface pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            <Link
              to="/alerts"
              className="relative rounded-md border border-border bg-surface p-2 text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-critical text-[10px] font-bold text-background">
                3
              </span>
            </Link>
            <div className="hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 sm:flex">
              <div className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                VD
              </div>
              <span className="text-xs">Investigator</span>
            </div>
            <Link
              to="/new-scan"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              + Start New Scan
            </Link>
          </div>
        </header>
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
