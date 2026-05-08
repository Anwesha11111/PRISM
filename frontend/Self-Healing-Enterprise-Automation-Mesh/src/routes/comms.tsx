import { createFileRoute } from "@tanstack/react-router";
import { Hash, Bot, Send } from "lucide-react";
import { MeshLayout } from "@/components/mesh/Layout";
import { agentChatter } from "@/lib/mock-mesh";

export const Route = createFileRoute("/comms")({
  head: () => ({
    meta: [
      { title: "Agent Comm Link · Mesh" },
      { name: "description", content: "Live stream of OpenClaw agent chatter across Slack, Discord and Telegram." },
    ],
  }),
  component: Comms,
});

const channels = ["#ops-mesh", "#ci-cd", "#agent-bus", "#data-pipes"];

function Comms() {
  return (
    <MeshLayout title="Agent Comm Link" subtitle="Realtime OpenClaw chatter · Slack · Discord · Telegram">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1 rounded-xl border border-border/60 bg-card/40 p-3 panel-shadow">
          <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Channels</div>
          {channels.map((c, i) => (
            <button key={c} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-primary/5 ${i === 0 ? "bg-primary/10 text-primary" : ""}`}>
              <Hash className="h-3.5 w-3.5" /> {c.replace("#", "")}
              {i === 0 && <span className="ml-auto h-2 w-2 rounded-full bg-success pulse-ring" />}
            </button>
          ))}
        </aside>

        <section className="flex h-[calc(100vh-10rem)] flex-col rounded-xl border border-border/60 bg-card/40 panel-shadow">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">ops-mesh</span>
              <span className="text-xs text-muted-foreground">· 14 agents · 3 humans</span>
            </div>
            <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success">live</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {agentChatter.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-primary-glow/30 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm font-semibold text-primary">{m.agent}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.channel}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/90">{m.message}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary blink" />
              k8s-healer-v3 is typing…
            </div>
          </div>

          <div className="border-t border-border/60 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2">
              <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Send instruction to agents…" />
              <button className="rounded-md bg-gradient-to-br from-primary to-primary-glow p-2 text-primary-foreground transition hover:opacity-95">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </MeshLayout>
  );
}
