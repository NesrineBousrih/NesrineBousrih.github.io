"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fades content up once, the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.1rem]">{title}</h2>
      {description && <p className="mt-3 text-[17px] text-muted">{description}</p>}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-card-2 px-2 py-1 text-xs font-medium text-ink-2 ring-1 ring-line">
      {children}
    </span>
  );
}

export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-2 ${className}`} aria-hidden>
      <span className="ping absolute inset-0 rounded-full bg-ok" />
      <span className="relative inline-flex size-2 rounded-full bg-ok" />
    </span>
  );
}
