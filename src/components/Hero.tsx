"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialLinks } from "./Brand";
import { HeroVisual } from "./HeroVisual";
import { StatusDot } from "./ui";
import { withBase } from "@/lib/path";

export function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  });

  const cv = profile.cvFile;
  const secondary =
    "inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-[15px] font-semibold text-ink transition hover:border-ink-2";

  return (
    <section id="home" className="pt-32 pb-20 sm:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <motion.p {...item(0)} className="inline-flex items-center gap-2 text-sm font-medium text-ok">
            <StatusDot />
            {profile.availability}
          </motion.p>

          <motion.p {...item(1)} className="mt-6 text-lg text-ink-2">
            {profile.greeting}
          </motion.p>

          <motion.h1
            {...item(2)}
            className="mt-2 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[3.2rem] xl:text-[3.5rem]"
          >
            {profile.headline[0]}
            <br />
            <span className="text-blue">{profile.headline[1]}</span>
          </motion.h1>

          <motion.p {...item(3)} className="mt-5 max-w-lg text-lg text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...item(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-[15px] font-semibold text-bg transition hover:opacity-85"
            >
              Explore My Work <ArrowDown className="size-4" />
            </a>
            {cv ? (
              <a href={withBase(`/cv/${cv}`)} download className={secondary}>
                <Download className="size-4" /> Download My CV
              </a>
            ) : (
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`} className={secondary}>
                <Mail className="size-4" /> Request My CV
              </a>
            )}
          </motion.div>

          <motion.div {...item(5)} className="mt-8">
            <SocialLinks />
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
