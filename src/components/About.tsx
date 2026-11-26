"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { about, profile } from "@/data/profile";
import { withBase } from "@/lib/path";
import { SocialLinks } from "./Brand";
import { CvButtons } from "./CvButtons";
import { Reveal, StatusDot } from "./ui";

/** A calm monitoring "heartbeat" trace with a pulse travelling along it. */
function Heartbeat() {
  const d =
    "M0 50 H260 l12 -22 l14 44 l12 -36 l9 14 H620 l10 -16 l12 30 l10 -24 l8 10 H980 l12 -22 l14 44 l12 -36 l9 14 H1200";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className="h-16 w-full text-accent sm:h-20"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} stroke="var(--line-strong)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        pathLength={1600}
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
        className="pulse-run"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function About() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -left-40 size-[560px] rounded-full bg-accent-soft opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Photo — left */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none"
        >
          <div className="relative">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border border-accent/40" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(`/images/${profile.portrait}`)}
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={1200}
              fetchPriority="high"
              className="relative aspect-square w-full rounded-[28px] object-cover object-[50%_18%] shadow-[var(--shadow)]"
            />
          </div>
          <p className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-ink-2 lg:justify-start">
            <StatusDot /> {profile.availability}
          </p>
        </motion.div>

        {/* Text — right */}
        <div>
          <motion.p {...item(0)} className="eyebrow">
            {profile.role}
          </motion.p>

          <motion.h1
            {...item(1)}
            className="mt-4 font-display text-[2.8rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.8rem]"
          >
            Hi, I&apos;m Nesrine.
          </motion.h1>

          <motion.p
            {...item(2)}
            className="mt-4 max-w-xl font-display text-[1.35rem] leading-snug text-ink-2 sm:text-[1.6rem]"
          >
            I build web apps — and the <em className="text-accent">pipelines</em> that keep them shipping reliably.
          </motion.p>

          <motion.div {...item(3)} className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed text-ink-2">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </motion.div>

          <motion.div {...item(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              See my work <ArrowRight className="size-4" />
            </a>
            <CvButtons />
            <SocialLinks className="ml-1" />
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-8">
        <Heartbeat />
      </div>

      <Reveal className="relative mx-auto mt-6 max-w-6xl px-5 sm:px-8">
        <dl className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.facts.map((f) => (
            <div key={f.label} className="bg-card px-6 py-5">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{f.label}</dt>
              <dd className="mt-1.5 font-medium text-ink">
                {f.label === "Based in" && <MapPin className="mr-1 inline size-4 -translate-y-px text-accent" />}
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
