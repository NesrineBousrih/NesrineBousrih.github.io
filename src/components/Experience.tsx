import { Award, GraduationCap } from "lucide-react";
import { certifications, education, experience } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <em className="text-accent">learned</em> by doing
          </>
        }
      />

      <ol className="border-t border-line">
        {experience.map((e, i) => (
          <li key={e.org} className="border-b border-line">
            <Reveal delay={0.05 * i} className="grid gap-2 py-8 md:grid-cols-[200px_1fr] md:gap-10">
              <div>
                <p className="text-sm font-semibold text-ink">{e.period}</p>
                <p className="text-sm text-muted">{e.place}</p>
              </div>
              <div>
                <h3 className="font-display text-[1.45rem] font-medium leading-snug text-ink">
                  {e.org} <span className="text-muted">— {e.role}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-2">{e.summary}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal className="card h-full p-7">
          <h3 className="flex items-center gap-2.5 font-display text-xl font-medium text-ink">
            <GraduationCap className="size-5 text-accent" /> Education
          </h3>
          <ul className="mt-5 space-y-5">
            {education.map((ed) => (
              <li key={ed.title}>
                <p className="font-semibold text-ink">{ed.title}</p>
                <p className="text-[15px] text-muted">
                  {ed.org} · {ed.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} className="card h-full p-7">
          <h3 className="flex items-center gap-2.5 font-display text-xl font-medium text-ink">
            <Award className="size-5 text-accent" /> Certifications & awards
          </h3>
          <ul className="mt-5 space-y-3.5">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-4">
                <span className="text-[15px] font-medium text-ink-2">{c.title}</span>
                <span className="shrink-0 text-sm text-muted">{c.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
