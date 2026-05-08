import { Workflow, Bot, Container, Webhook, Database } from "lucide-react";

const nodes = [
  { id: "n8n", label: "n8n", sub: "orchestrator", x: 80,  y: 130, icon: Workflow, color: "primary" },
  { id: "wh",  label: "Webhook", sub: "failure event", x: 260, y: 60, icon: Webhook, color: "warning" },
  { id: "oc",  label: "OpenClaw", sub: "router · agents", x: 460, y: 130, icon: Bot, color: "primary" },
  { id: "k8s", label: "Kubernetes", sub: "prod-eu-west", x: 660, y: 60, icon: Container, color: "success" },
  { id: "db",  label: "Postgres", sub: "remediation log", x: 660, y: 200, icon: Database, color: "info" },
];
const edges = [
  ["n8n", "wh"], ["wh", "oc"], ["oc", "k8s"], ["oc", "db"], ["k8s", "n8n"],
];

const colorMap: Record<string, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--info)",
};

export function Topology() {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm panel-shadow">
      <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[oklch(0.74_0.24_340/0.14)] blur-3xl" />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Live Topology</div>
          <h3 className="mt-1 font-display text-lg font-semibold">Self-Healing <span className="text-aurora">Mesh Flow</span></h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-success" />healthy</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-warning" />routing</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-destructive" />incident</span>
        </div>
      </div>

      <div className="relative dot-bg overflow-hidden rounded-xl border border-border/40 bg-background/40">
        <div className="pointer-events-none absolute inset-0 scan-line" />
        <svg viewBox="0 0 760 280" className="h-[300px] w-full">
          <defs>
            <radialGradient id="nodeFill" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.28 0.04 250)" />
              <stop offset="100%" stopColor="oklch(0.18 0.025 250)" />
            </radialGradient>
          </defs>
          {edges.map(([from, to], i) => {
            const a = byId[from], b = byId[to];
            const mx = (a.x + b.x) / 2;
            const pathId = `p${i}`;
            const d = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
            return (
              <g key={i}>
                <path id={pathId} d={d} fill="none" stroke="oklch(0.82 0.17 195 / 0.18)" strokeWidth={3} />
                <path d={d} fill="none" stroke="oklch(0.82 0.17 195 / 0.55)" strokeWidth={1.5} className="flow-dash" />
                <circle r={3} fill="oklch(0.88 0.18 190)">
                  <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}
          {nodes.map((n) => (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
              <circle r={28} fill="url(#nodeFill)" stroke={colorMap[n.color]} strokeWidth={1.5} />
              <circle r={28} fill="none" stroke={colorMap[n.color]} strokeWidth={0.6} opacity={0.25} />
              <circle r={26} fill="none" stroke={colorMap[n.color]} strokeWidth={0.6} opacity={0.4}>
                <animate attributeName="r" from="28" to="44" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <foreignObject x={-12} y={-12} width={24} height={24}>
                <div style={{ color: colorMap[n.color] }} className="flex h-6 w-6 items-center justify-center">
                  <n.icon size={16} />
                </div>
              </foreignObject>
              <text y={50} textAnchor="middle" fontSize={11} fontWeight={700} fill="oklch(0.95 0.01 240)" letterSpacing="0.5">{n.label}</text>
              <text y={64} textAnchor="middle" fontSize={9} fill="oklch(0.72 0.02 250)" letterSpacing="0.6">{n.sub.toUpperCase()}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
        {[
          { l: "events / min", v: "1.2k", c: "text-primary" },
          { l: "agent latency", v: "180ms", c: "text-success" },
          { l: "open routes", v: "5", c: "text-warning" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border/60 bg-background/40 px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className={`mt-0.5 font-mono text-sm ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
