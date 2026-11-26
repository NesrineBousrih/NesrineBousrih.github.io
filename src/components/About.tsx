"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { about, profile } from "@/data/profile";
import { withBase } from "@/lib/path";
import { SocialLinks } from "./Brand";
import { CvButtons } from "./CvButtons";
import { Reveal, StatusDot } from "./ui";

export function About() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* soft warm wash behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-accent-soft opacity-70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <motion.p {...item(0)} className="eyebrow">
            {profile.role}
          </motion.p>

          <motion.h1
            {...item(1)}
            className="mt-4 font-display text-[3rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[4.2rem]"
          >
            Hi, I&apos;m Nesrine.
          </motion.h1>

          <motion.p
            {...item(2)}
            className="mt-5 max-w-xl font-display text-[1.45rem] leading-snug text-ink-2 sm:text-[1.7rem]"
          >
            I build web apps — and the <em className="text-accent">pipelines</em> that keep them shipping reliably.
          </motion.p>

          <motion.div {...item(3)} className="mt-6 max-w-xl space-y-4 text-[17px] leading-relaxed text-ink-2">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </motion.div>

          <motion.div {...item(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              See my work <ArrowRight className="size-4" />
            </a>
            <CvButtons />
          </motion.div>

          <motion.div {...item(5)} className="mt-6 -ml-2">
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-2 lg:max-w-none"
        >
          <div className="relative">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[28px] border border-accent/40" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(`/images/${profile.portrait}`)}
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={1200}
              fetchPriority="high"
              className="relative aspect-[4/5] w-full rounded-t-full rounded-b-[28px] object-cover object-top shadow-[var(--shadow)]"
            />
            <div className="card absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink-2 lg:-left-6 lg:translate-x-0">
              <StatusDot /> {profile.availability}
            </div>
          </div>
        </motion.div>
      </div>

      <Reveal className="relative mx-auto mt-20 max-w-6xl px-5 sm:px-8">
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
