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
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[2.1rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-[2.6rem]">
        {title}
      </h2>
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
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-bg px-2.5 py-1 text-xs font-medium text-ink-2">
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
