import { timeline } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";

export function Experience() {
  return (
    <Section id="experience" className="bg-bg-2">
      <SectionHeading title="Experience & Education" />
      <ol className="relative max-w-3xl border-l border-line-strong">
        {timeline.map((t, i) => (
          <li key={t.title} className="relative pb-9 pl-7 last:pb-0">
            <span
              className={`absolute -left-[6px] top-1.5 size-[11px] rounded-full ring-4 ring-bg-2 ${
                t.kind === "work" ? "bg-blue" : "bg-ink-2"
              }`}
              aria-hidden
            />
            <Reveal delay={0.04 * i}>
              <p className="text-sm text-muted">{t.period}</p>
              <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">{t.title}</h3>
              <p className="text-[15px] font-medium text-ink-2">{t.org}</p>
              {t.description && <p className="mt-1.5 text-[15px] text-muted">{t.description}</p>}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
