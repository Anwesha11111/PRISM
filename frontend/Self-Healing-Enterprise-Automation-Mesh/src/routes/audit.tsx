import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { MeshLayout } from "@/components/mesh/Layout";
import { auditEntries } from "@/lib/mock-mesh";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Logs · Mesh" },
      { name: "description", content: "Historical record of every AI-driven remediation across the mesh." },
    ],
  }),
  component: Audit,
});

function Audit() {
  return (
    <MeshLayout title="Audit Logs" subtitle="Every AI fix, every redeploy, fully traceable">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3 panel-shadow">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-full bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search by service, agent, or YAML diff…" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm">
            <Filter className="h-4 w-4" /> Last 24h
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40 panel-shadow">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-background/40 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Agent</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {auditEntries.map((a, i) => (
                <tr key={a.id} className={`border-b border-border/30 transition hover:bg-primary/5 ${i % 2 ? "bg-background/20" : ""}`}>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                  <td className="px-4 py-3 font-medium">{a.service}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.action}</td>
                  <td className="px-4 py-3"><span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px]">{a.agent}</span></td>
                  <td className="px-4 py-3 font-mono text-xs">{a.duration}</td>
                  <td className="px-4 py-3">
                    {a.status === "resolved" ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
                        <CheckCircle2 className="h-3 w-3" /> resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-destructive/15 px-2 py-0.5 text-[11px] font-medium text-destructive">
                        <XCircle className="h-3 w-3" /> rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MeshLayout>
  );
}
