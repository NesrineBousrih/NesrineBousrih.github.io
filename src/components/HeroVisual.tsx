"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TechIcon } from "./TechIcon";

/* Ring of technologies around the cloud, in % of the square canvas */
const nodes = [
  { key: "kubernetes", label: "Kubernetes", x: 66, y: 13, float: "float-a" },
  { key: "aws", label: "AWS", x: 83, y: 39, float: "float-b" },
  { key: "terraform", label: "Terraform", x: 68, y: 64, float: "float-c" },
  { key: "cicd", label: "CI/CD", x: 32, y: 64, float: "float-a" },
  { key: "linux", label: "Linux", x: 15, y: 39, float: "float-b" },
  { key: "docker", label: "Docker", x: 33, y: 13, float: "float-c" },
];
const CX = 50;
const CY = 38.5;

const terminal = [
  { t: "$ kubectl get pods", c: "text-ink" },
  { t: "NAME              READY   STATUS", c: "text-muted" },
  { t: "api-7f9c4-x2k     1/1     Running", c: "text-ink-2" },
  { t: "web-5d8b2-q7m     1/1     Running", c: "text-ink-2" },
  { t: "STATUS: RUNNING", c: "text-ok" },
  { t: "SYSTEM: OPERATIONAL", c: "text-cyan" },
];

const spark = [22, 26, 24, 30, 28, 34, 31, 29, 36, 33, 38, 35, 40, 37, 42];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const max = Math.max(...spark);
  const pts = spark.map((v, i) => `${(i / (spark.length - 1)) * 100},${36 - (v / max) * 30}`).join(" ");

  return (
    <div className="relative mx-auto w-full max-w-[540px] sm:aspect-[1/1.02]" aria-hidden>
      <div className="relative aspect-[1/0.72] sm:absolute sm:inset-0 sm:aspect-auto">

      {/* connection lines */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hv-line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--blue)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <circle cx={CX} cy={CY} r="0" />
        {nodes.map((n) => (
          <line
            key={n.key}
            x1={n.x}
            y1={n.y}
            x2={CX}
            y2={CY}
            stroke="url(#hv-line)"
            strokeOpacity="0.4"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            className="flow"
          />
        ))}
        <ellipse
          cx={CX}
          cy={CY}
          rx="35"
          ry="26.5"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="2 5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* central cloud */}
      <motion.div
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[38.5%] w-[40%] -translate-x-1/2 -translate-y-1/2"
      >
        <svg viewBox="0 0 200 130" className="w-full">
          <defs>
            <linearGradient id="hv-cloud" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--blue)" />
              <stop offset="0.6" stopColor="var(--violet)" />
              <stop offset="1" stopColor="var(--blue)" />
            </linearGradient>
            <linearGradient id="hv-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--card)" stopOpacity="0.95" />
              <stop offset="1" stopColor="var(--card-2)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M52 116h104a34 34 0 0 0 4-67.8A46 46 0 0 0 73 36a30 30 0 0 0-21 80z"
            fill="url(#hv-fill)"
            stroke="url(#hv-cloud)"
            strokeWidth="3"
          />
          {/* three pods inside the cloud */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${66 + i * 26} 70)`}>
              <rect width="20" height="20" rx="5" fill="url(#hv-cloud)" opacity={0.18 + i * 0.06} />
              <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="4.5" fill="none" stroke="url(#hv-cloud)" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill="var(--ok)" />
            </g>
          ))}
          <text x="104" y="106" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--font-mono)">
            cluster · 3/3 ready
          </text>
        </svg>
      </motion.div>

      {/* technology chips */}
      {nodes.map((n, i) => (
        <motion.div
          key={n.key}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className={`${n.float} flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 shadow-sm`}>
            <TechIcon name={n.key} className="size-5" />
            <span className="hidden text-xs font-semibold text-ink-2 sm:inline">{n.label}</span>
          </div>
        </motion.div>
      ))}

      </div>

      {/* terminal */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative -mt-2 w-full overflow-hidden sm:absolute sm:bottom-0 sm:left-0 sm:mt-0 sm:w-[64%] rounded-xl border border-line bg-card shadow-sm"
      >
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-muted">nesrine@cluster: ~</span>
        </div>
        <div className="space-y-0.5 px-3 py-2.5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
          {terminal.map((l, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.28 }}
              className={`whitespace-pre ${l.c} ${i >= 4 ? "font-semibold" : ""}`}
            >
              {l.t}
              {i === terminal.length - 1 && <span className="caret ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-cyan" />}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* monitoring card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.6 }}
        className="absolute bottom-[6%] right-0 hidden w-[40%] rounded-xl border border-line bg-card p-3 shadow-sm sm:block"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-ink-2">Requests / s</span>
          <span className="rounded-full bg-ok/15 px-1.5 py-0.5 text-[9px] font-bold text-ok">healthy</span>
        </div>
        <svg viewBox="0 0 100 40" className="mt-2 h-12 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,40 ${pts} 100,40`} fill="url(#hv-area)" />
          <polyline points={pts} fill="none" stroke="var(--cyan)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="mt-1 text-[9px] text-muted">Illustration</p>
      </motion.div>
    </div>
  );
}
