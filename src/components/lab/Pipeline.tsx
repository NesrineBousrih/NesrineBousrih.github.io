"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Code2, Hammer, Loader2, Play, RotateCcw, Rocket, FlaskConical } from "lucide-react";

type Status = "idle" | "running" | "passed";

const stages = [
  { name: "Code", Icon: Code2, log: "git push origin main", ms: 900 },
  { name: "Build", Icon: Hammer, log: "docker build -t app:sha-4f2c", ms: 1500 },
  { name: "Test", Icon: FlaskConical, log: "48 tests passed · lint ok", ms: 1300 },
  { name: "Deploy", Icon: Rocket, log: "kubectl rollout status · done", ms: 1200 },
];

export function Pipeline() {
  const [status, setStatus] = useState<Status[]>(stages.map(() => "idle"));
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setElapsed(null);
    setStatus(stages.map(() => "idle"));
    let t = 0;
    stages.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => setStatus((st) => st.map((v, j) => (j === i ? "running" : v))), t)
      );
      t += s.ms;
      timers.current.push(
        window.setTimeout(() => setStatus((st) => st.map((v, j) => (j === i ? "passed" : v))), t)
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setRunning(false);
        setElapsed(t / 1000);
      }, t)
    );
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setElapsed(null);
    setStatus(stages.map(() => "idle"));
  };

  const done = status.every((s) => s === "passed");

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">CI/CD pipeline</h3>
        </div>
        <div className="flex items-center gap-2">
          {(done || running) && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2.5 text-sm font-semibold text-ink-2 transition hover:text-ink"
            >
              <RotateCcw className="size-4" /> Reset
            </button>
          )}
          <button
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-85 disabled:opacity-60"
          >
            {running ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            {running ? "Running…" : done ? "Run again" : "Run pipeline"}
          </button>
        </div>
      </div>

      <ol className="mt-5 grid gap-3 md:grid-cols-4">
        {stages.map((s, i) => {
          const st = status[i];
          return (
            <li key={s.name} className="relative">
              <div
                className={`h-full rounded-2xl border p-4 transition-colors duration-300 ${
                  st === "passed"
                    ? "border-ok/40 bg-ok/[0.07]"
                    : st === "running"
                      ? "border-blue/50 bg-blue/[0.07]"
                      : "border-line bg-card-2"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      st === "passed" ? "bg-ok/15 text-ok" : st === "running" ? "bg-blue/15 text-blue" : "bg-card text-muted ring-1 ring-line"
                    }`}
                  >
                    <s.Icon className="size-5" />
                  </span>
                  <span className="text-xs font-semibold">
                    {st === "passed" && (
                      <span className="inline-flex items-center gap-1 text-ok">
                        <Check className="size-3.5" strokeWidth={3} /> passed
                      </span>
                    )}
                    {st === "running" && (
                      <span className="inline-flex items-center gap-1 text-blue">
                        <Loader2 className="size-3.5 animate-spin" /> running
                      </span>
                    )}
                    {st === "idle" && <span className="text-muted">queued</span>}
                  </span>
                </div>
                <p className="mt-3 font-display font-semibold text-ink">
                  <span className="mr-1.5 text-muted">{i + 1}.</span>
                  {s.name}
                </p>
                <p className="mt-1 truncate font-mono text-[11px] text-muted" title={s.log}>
                  {st === "idle" ? "—" : s.log}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 h-5 text-sm text-ink-2" aria-live="polite">
        {done && elapsed !== null && (
          <>
            <span className="font-semibold text-ok">Deployed</span> in {elapsed.toFixed(1)}s
          </>
        )}
      </p>
    </div>
  );
}
