import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, Bell, Search } from "lucide-react";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur-xl">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="flex-1">
        <h1 className="text-base font-semibold tracking-wide">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="hidden items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground md:flex">
        <Search className="h-3.5 w-3.5" />
        <span>Search incidents, agents…</span>
        <kbd className="ml-4 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </div>

      <button className="relative rounded-md border border-border/60 bg-card/40 p-2 text-muted-foreground transition hover:text-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
      </button>

      <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-success">
        <Wifi className="h-3.5 w-3.5" />
        Live Sync
      </div>
    </header>
  );
}
