"use client";

import { useState } from "react";

type Node = { id: string; label: string; x: number; y: number; tone: "app" | "infra" | "ops" | "data"; info: string };

const W = 98;
const H = 42;

const nodes: Node[] = [
  { id: "users", label: "Users", x: 6, y: 160, tone: "infra", info: "Requests arrive over HTTPS from browsers and mobile clients." },
  { id: "lb", label: "Load balancer", x: 126, y: 160, tone: "infra", info: "Spreads traffic across healthy instances and terminates TLS." },
  { id: "ingress", label: "Ingress", x: 250, y: 160, tone: "infra", info: "Kubernetes Ingress routes each path to the right service." },
  { id: "web", label: "Web · Angular", x: 370, y: 104, tone: "app", info: "Front end served from its own pods, scaled independently." },
  { id: "api", label: "API · Django", x: 370, y: 216, tone: "app", info: "Stateless API pods — easy to scale horizontally and roll back." },
  { id: "db", label: "PostgreSQL", x: 496, y: 216, tone: "data", info: "Managed database with backups; the only stateful piece." },
  { id: "ci", label: "GitHub Actions", x: 6, y: 22, tone: "ops", info: "Builds, tests and packages every commit into a container image." },
  { id: "registry", label: "Registry", x: 126, y: 22, tone: "ops", info: "Versioned images that the cluster pulls during a rolling update." },
  { id: "prom", label: "Prometheus", x: 496, y: 104, tone: "ops", info: "Scrapes metrics from every pod for SLIs and alerting." },
  { id: "grafana", label: "Grafana", x: 496, y: 22, tone: "ops", info: "Dashboards for latency, errors and the error budget." },
];

const edges: [string, string, "solid" | "dashed"][] = [
  ["users", "lb", "solid"],
  ["lb", "ingress", "solid"],
  ["ingress", "web", "solid"],
  ["ingress", "api", "solid"],
  ["api", "db", "solid"],
  ["ci", "registry", "solid"],
  ["registry", "ingress", "dashed"],
  ["web", "prom", "dashed"],
  ["api", "prom", "dashed"],
  ["prom", "grafana", "solid"],
];

const tones = {
  app: "var(--blue)",
  infra: "var(--cyan)",
  ops: "var(--violet)",
  data: "var(--ok)",
};

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function anchor(a: Node, b: Node) {
  const ax = a.x + W / 2;
  const ay = a.y + H / 2;
  const bx = b.x + W / 2;
  const by = b.y + H / 2;
  // leave from the side facing the target
  const dx = bx - ax;
  const dy = by - ay;
  if (Math.abs(dx) > Math.abs(dy)) {
    return { x1: ax + Math.sign(dx) * (W / 2), y1: ay, x2: bx - Math.sign(dx) * (W / 2), y2: by };
  }
  return { x1: ax, y1: ay + Math.sign(dy) * (H / 2), x2: bx, y2: by - Math.sign(dy) * (H / 2) };
}

export function Architecture() {
  const [sel, setSel] = useState<string>("ingress");
  const current = byId[sel];
  const linked = new Set(edges.filter(([a, b]) => a === sel || b === sel).flatMap(([a, b]) => [a, b]));

  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-ink">Infrastructure architecture</h3>
      <p className="mt-1 text-sm text-muted">Click a component.</p>

      <div className="-mx-2 mt-5 overflow-x-auto px-2">
        <svg viewBox="0 0 600 280" className="w-full min-w-[440px]" role="group" aria-label="Architecture diagram">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
            </marker>
          </defs>

          {/* cluster boundary */}
          <rect x="238" y="88" width="242" height="186" rx="14" fill="none" stroke="var(--line-strong)" strokeDasharray="4 5" />
          <text x="252" y="106" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">
            kubernetes cluster
          </text>

          {edges.map(([a, b, style]) => {
            const p = anchor(byId[a], byId[b]);
            const hot = linked.has(a) && linked.has(b) && (a === sel || b === sel);
            return (
              <line
                key={a + b}
                {...p}
                stroke={hot ? "var(--blue)" : "var(--line-strong)"}
                strokeWidth={hot ? 2 : 1.5}
                strokeDasharray={style === "dashed" ? "4 4" : undefined}
                className={hot ? "flow" : undefined}
                markerEnd="url(#arr)"
              />
            );
          })}

          {nodes.map((n) => {
            const active = n.id === sel;
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={n.label}
                onClick={() => setSel(n.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(n.id))}
                className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3]"
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={W}
                  height={H}
                  rx="10"
                  fill={active ? tones[n.tone] : "var(--card-2)"}
                  fillOpacity={active ? 0.16 : 1}
                  stroke={tones[n.tone]}
                  strokeOpacity={active ? 1 : 0.45}
                  strokeWidth={active ? 2 : 1.25}
                />
                <circle cx={n.x + 12} cy={n.y + H / 2} r="3.5" fill={tones[n.tone]} />
                <text
                  x={n.x + 21}
                  y={n.y + H / 2 + 4}
                  fontSize="10.5"
                  fontWeight={600}
                  fill="var(--ink)"
                  fontFamily="var(--font-sans)"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-card-2 p-4" aria-live="polite">
        <p className="text-sm font-semibold text-ink">{current.label}</p>
        <p className="mt-1 text-sm text-muted">{current.info}</p>
      </div>
    </div>
  );
}
