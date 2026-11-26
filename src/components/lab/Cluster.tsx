"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Zap } from "lucide-react";

type Pod = { id: number; node: number; state: "running" | "crashed" | "starting" };

const NODES = 3;
const initial: Pod[] = [
  { id: 1, node: 0, state: "running" },
  { id: 2, node: 1, state: "running" },
  { id: 3, node: 2, state: "running" },
  { id: 4, node: 0, state: "running" },
  { id: 5, node: 1, state: "running" },
];

export function Cluster() {
  const [pods, setPods] = useState<Pod[]>(initial);
  const [event, setEvent] = useState("Desired 5 · Ready 5");
  const nextId = useRef(6);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const ready = pods.filter((p) => p.state === "running").length;

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const scaleUp = () => {
    if (pods.length >= 9) return;
    const counts = Array.from({ length: NODES }, (_, n) => pods.filter((p) => p.node === n).length);
    const node = counts.indexOf(Math.min(...counts)); // schedule on the least busy node
    const id = nextId.current++;
    setPods((ps) => [...ps, { id, node, state: "starting" }]);
    setEvent(`Scaled to ${pods.length + 1} replicas · scheduling on node-${node + 1}`);
    later(() => setPods((ps) => ps.map((p) => (p.id === id ? { ...p, state: "running" } : p))), 900);
  };

  const scaleDown = () => {
    if (pods.length <= 1) return;
    setPods((ps) => ps.slice(0, -1));
    setEvent(`Scaled to ${pods.length - 1} replicas`);
  };

  const killPod = () => {
    const alive = pods.filter((p) => p.state === "running");
    if (!alive.length) return;
    const victim = alive[Math.floor(Math.random() * alive.length)];
    setPods((ps) => ps.map((p) => (p.id === victim.id ? { ...p, state: "crashed" } : p)));
    setEvent(`pod-${victim.id} crashed — Kubernetes is replacing it…`);
    later(() => {
      setPods((ps) => ps.map((p) => (p.id === victim.id ? { ...p, state: "starting" } : p)));
    }, 1100);
    later(() => {
      setPods((ps) => ps.map((p) => (p.id === victim.id ? { ...p, state: "running" } : p)));
      setEvent(`pod-${victim.id} restarted · self-healed ✓`);
    }, 2100);
  };

  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Kubernetes cluster</h3>
        </div>
        <span className="shrink-0 rounded-full bg-card-2 px-2.5 py-1 font-mono text-xs text-ink-2 ring-1 ring-line">
          {ready}/{pods.length} ready
        </span>
      </div>

      <div className="mt-6 grid flex-1 grid-cols-3 gap-3">
        {Array.from({ length: NODES }, (_, n) => (
          <div key={n} className="rounded-2xl border border-dashed border-line-strong bg-card-2 p-3">
            <p className="font-mono text-[11px] text-muted">node-{n + 1}</p>
            <ul className="mt-2.5 grid gap-2">
              <AnimatePresence initial={false}>
                {pods
                  .filter((p) => p.node === n)
                  .map((p) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 font-mono text-[11px] transition-colors ${
                        p.state === "running"
                          ? "border-ok/30 bg-ok/10 text-ink-2"
                          : p.state === "crashed"
                            ? "border-red-500/40 bg-red-500/10 text-red-500"
                            : "border-warn/40 bg-warn/10 text-ink-2"
                      }`}
                    >
                      <span
                        className={`size-2 shrink-0 rounded-full ${
                          p.state === "running" ? "bg-ok" : p.state === "crashed" ? "bg-red-500" : "animate-pulse bg-warn"
                        }`}
                      />
                      <span className="truncate">pod-{p.id}</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 min-h-5 font-mono text-xs text-ink-2" aria-live="polite">
        › {event}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={scaleDown} className="lab-btn" aria-label="Remove a replica">
          <Minus className="size-4" />
        </button>
        <button onClick={scaleUp} className="lab-btn">
          <Plus className="size-4" /> Scale up
        </button>
        <button onClick={killPod} className="lab-btn !border-red-500/30 !text-red-500 hover:!bg-red-500/10">
          <Zap className="size-4" /> Kill a pod
        </button>
      </div>
    </div>
  );
}
