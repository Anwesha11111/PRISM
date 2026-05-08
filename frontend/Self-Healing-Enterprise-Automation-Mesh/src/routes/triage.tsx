import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, Terminal, AlertTriangle, ShieldCheck, GitBranch, Bot } from "lucide-react";
import { MeshLayout } from "@/components/mesh/Layout";
import { DiffViewer } from "@/components/mesh/DiffViewer";
import { initialIncidents, type Incident } from "@/lib/mock-mesh";

export const Route = createFileRoute("/triage")({
  head: () => ({
    meta: [
      { title: "Incident Triage · Mesh" },
      { name: "description", content: "Review, approve or reject AI-proposed remediations across the mesh." },
    ],
  }),
  component: Triage,
});

function Triage() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedId, setSelectedId] = useState<string>(initialIncidents[0].id);
  const selected = incidents.find((i) => i.id === selectedId)!;

  const act = (decision: "approve" | "reject") => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === selectedId ? { ...i, status: decision === "approve" ? "deploying" : "rejected" } : i
      )
    );
  };

  return (
    <MeshLayout title="Incident Triage" subtitle="Review agent-proposed remediations">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Queue */}
        <aside className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium uppercase tracking-[0.18em] text-muted-foreground">Queue · {incidents.length}</span>
            <span className="rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-warning">awaiting</span>
          </div>
          {incidents.map((i) => {
            const active = i.id === selectedId;
            return (
              <button
                key={i.id}
                onClick={() => setSelectedId(i.id)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-primary/60 bg-primary/5 panel-glow"
                    : "border-border/60 bg-card/40 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{i.id}</span>
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${
                    i.severity === "critical" ? "text-destructive" : "text-warning"
                  }`}>
                    {i.severity}
                  </span>
                </div>
                <div className="mt-2 font-medium">{i.service}</div>
                <div className="mt-1 text-xs text-muted-foreground">{i.cluster}</div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Bot className="h-3 w-3" /> {i.agent}</span>
                  <span className="font-mono text-primary">{Math.round(i.confidence * 100)}%</span>
                </div>
                {i.status !== "pending" && (
                  <div className={`mt-3 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    i.status === "deploying" ? "bg-info/15 text-info"
                    : i.status === "rejected" ? "bg-destructive/15 text-destructive"
                    : "bg-success/15 text-success"
                  }`}>
                    {i.status}
                  </div>
                )}
              </button>
            );
          })}
        </aside>

        {/* Theater */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-5 panel-shadow">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h2 className="font-display text-xl font-semibold">{selected.service}</h2>
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">{selected.cluster}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Root cause: <span className="text-foreground">{selected.rootCause}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => act("reject")} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2 text-sm font-medium transition hover:border-destructive/40 hover:text-destructive">
                <XCircle className="h-4 w-4" /> Reject & reroute
              </button>
              <button onClick={() => act("approve")} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow px-4 py-2 text-sm font-semibold text-primary-foreground panel-glow transition hover:opacity-95">
                <CheckCircle2 className="h-4 w-4" /> Approve & kubectl apply
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-xl border border-border/60 bg-card/40 p-5 panel-shadow">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Terminal className="h-4 w-4 text-primary" /> Agentic Diagnosis
              </h3>
              <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/60 p-4 font-mono text-xs leading-relaxed">
                <div className="text-muted-foreground">&gt; analyzing logs…</div>
                <div className="text-muted-foreground">&gt; building dependency graph…</div>
                <div className="text-muted-foreground">&gt; root cause identified.</div>
                <div className="mt-2 text-primary">&gt; {selected.diagnosis}</div>
                <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-success" /> policy check passed
                  <GitBranch className="ml-2 h-3 w-3" /> {selected.agent}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>Confidence</span><span>{Math.round(selected.confidence * 100)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${selected.confidence * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-xl border border-border/60 bg-card/40 p-5 panel-shadow">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Proposed Configuration Change</h3>
              <DiffViewer oldText={selected.oldYaml} newText={selected.newYaml} />
            </div>
          </div>
        </section>
      </div>
    </MeshLayout>
  );
}
