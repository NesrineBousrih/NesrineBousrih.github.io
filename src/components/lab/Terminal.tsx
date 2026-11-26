"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects, skillGroups } from "@/data/profile";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string };

const HELP = [
  "Available commands:",
  "  whoami            who I am",
  "  skills            my toolbox",
  "  projects          what I've built",
  "  kubectl get pods  cluster status",
  "  docker ps         running containers",
  "  slo               reliability targets",
  "  contact           how to reach me",
  "  clear             clear the screen",
];

function respond(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase().replace(/\s+/g, " ");
  const out = (t: string): Line => ({ kind: "out", text: t });
  switch (c) {
    case "":
      return [];
    case "help":
      return HELP.map(out);
    case "whoami":
      return [out(`${profile.name} — ${profile.role}`), out(`📍 ${profile.location} · ${profile.availability}`)];
    case "skills":
      return skillGroups.map((g) => out(`${g.title}: ${g.items.map((i) => i.name).join(", ")}`));
    case "projects":
    case "ls projects":
      return projects.map((p) => out(`• ${p.name} — ${p.tagline}`));
    case "kubectl get pods":
      return [
        out("NAME                 READY   STATUS    RESTARTS"),
        out("portfolio-web-7f9c   1/1     Running   0"),
        out("portfolio-api-5d8b   1/1     Running   0"),
        { kind: "ok", text: "STATUS: RUNNING · SYSTEM: OPERATIONAL" },
      ];
    case "docker ps":
      return [
        out("CONTAINER ID   IMAGE               STATUS"),
        out("a1b2c3d4e5f6   nesrine/web:latest  Up 3 days"),
        out("f6e5d4c3b2a1   postgres:16         Up 3 days (healthy)"),
      ];
    case "slo":
      return [out("Availability SLO ....... 99.9%"), out("Latency SLO (p95) ...... < 300 ms"), out("Error budget ........... 43 min / 30 days")];
    case "contact":
      return [out(`email     ${profile.email}`), out(`linkedin  ${profile.linkedin}`), out(`github    ${profile.github}`)];
    case "sudo hire nesrine":
    case "hire nesrine":
      return [{ kind: "ok", text: `✔ Great choice! Write to ${profile.email} 🚀` }];
    default:
      return [{ kind: "err", text: `command not found: ${cmd.trim()} — type 'help'` }];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Welcome to nesrine-shell 1.0 (illustrative)" },
    { kind: "out", text: "Type 'help' to see what you can run." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    setHIdx(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 30));
    if (cmd.trim().toLowerCase() === "clear") return setLines([]);
    setLines((l) => [...l, { kind: "in", text: cmd }, ...respond(cmd)]);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      setHIdx(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(i);
      setValue(i >= 0 ? history[i] : "");
    }
  };

  const quick = ["help", "whoami", "kubectl get pods", "projects"];

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-display text-sm font-semibold text-ink">Interactive terminal</span>
      </div>

      <div
        ref={scroller}
        onClick={() => input.current?.focus({ preventScroll: true })}
        className="h-72 flex-1 overflow-y-auto bg-[#111318] px-4 py-3 font-mono text-[12.5px] leading-relaxed text-[#c9d3ee]"
      >
        {lines.map((l, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap break-words ${
              l.kind === "in" ? "text-white" : l.kind === "ok" ? "text-[#34d399]" : l.kind === "err" ? "text-[#fb7185]" : ""
            }`}
          >
            {l.kind === "in" && <span className="text-[#22d3ee]">nesrine@lab:~$ </span>}
            {l.text}
          </p>
        ))}
        <form onSubmit={submit} className="flex items-center">
          <label htmlFor="term-input" className="shrink-0 text-[#22d3ee]">
            nesrine@lab:~$&nbsp;
          </label>
          <input
            id="term-input"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-white caret-[#22d3ee] outline-none"
            aria-label="Terminal command"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => {
              setLines((l) => [...l, { kind: "in", text: q }, ...respond(q)]);
              input.current?.focus({ preventScroll: true });
            }}
            className="rounded-lg border border-line bg-card-2 px-2.5 py-1.5 font-mono text-xs text-ink-2 transition hover:border-blue/40 hover:text-blue"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
