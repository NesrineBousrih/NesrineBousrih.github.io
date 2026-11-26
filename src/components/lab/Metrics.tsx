"use client";

import { useEffect, useRef, useState } from "react";
import { Siren } from "lucide-react";

const N = 40;
const SLO = 99.9;
const seed = (base: number) => Array.from({ length: N }, (_, i) => base + Math.sin(i / 3) * 4);

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function Metrics() {
  const [cpu, setCpu] = useState<number[]>(() => seed(38));
  const [mem, setMem] = useState<number[]>(() => seed(56));
  const [incident, setIncident] = useState(0); // ticks left in the incident
  const [errors, setErrors] = useState(2); // failed requests in the window
  const total = useRef(20000);
  const incidentRef = useRef(0);
  incidentRef.current = incident;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      const inc = incidentRef.current > 0;
      setCpu((a) => [...a.slice(1), clamp(inc ? 82 + Math.random() * 14 : a[a.length - 1] * 0.7 + (34 + Math.random() * 14) * 0.3, 4, 99)]);
      setMem((a) => [...a.slice(1), clamp(inc ? a[a.length - 1] + 2.5 : a[a.length - 1] * 0.8 + (54 + Math.random() * 8) * 0.2, 10, 96)]);
      total.current += 500;
      // errors pile up during an incident, then age out of the window once it is over
      setErrors((e) => (inc ? e + 4 : Math.max(2, e * 0.85)));
      setIncident((t) => Math.max(0, t - 1));
    }, reduce ? 2500 : 1100);
    return () => window.clearInterval(id);
  }, []);

  const availability = 100 - (errors / total.current) * 100;
  const budgetUsed = Math.min(100, ((100 - availability) / (100 - SLO)) * 100);
  const sloOk = availability >= SLO;

  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Monitoring</h3>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${incident > 0 ? "bg-red-500/15 text-red-500" : "bg-ok/15 text-ok"}`}>
          {incident > 0 ? "Incident" : "Healthy"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Chart label="CPU" unit="%" data={cpu} color="var(--blue)" />
        <Chart label="Memory" unit="%" data={mem} color="var(--violet)" />
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-card-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-muted">Availability</span>
          <span className={`font-display text-2xl font-semibold tabular-nums ${sloOk ? "text-ink" : "text-red-500"}`}>
            {availability.toFixed(3)}%
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>Error budget used</span>
          <span className="tabular-nums">{budgetUsed.toFixed(0)}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full transition-all duration-700 ${budgetUsed > 80 ? "bg-red-500" : budgetUsed > 50 ? "bg-warn" : "bg-ok"}`}
            style={{ width: `${budgetUsed}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => setIncident(6)} disabled={incident > 0} className="lab-btn disabled:opacity-50">
          <Siren className="size-4" /> Simulate incident
        </button>
        <span className="text-xs text-muted">SLO 99.9%</span>
      </div>
    </div>
  );
}

function Chart({ label, unit, data, color }: { label: string; unit: string; data: number[]; color: string }) {
  const last = data[data.length - 1];
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(" ");
  const gid = `g-${label}`;
  return (
    <div className="rounded-2xl border border-line bg-card-2 p-3.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="font-display text-lg font-semibold tabular-nums text-ink">
          {Math.round(last)}
          <span className="text-xs text-muted">{unit}</span>
        </span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-16 w-full" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.35" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" x2="100" y1="20" y2="20" stroke="var(--line-strong)" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <polygon points={`0,100 ${pts} 100,100`} fill={`url(#${gid})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
