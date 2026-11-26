import { skillGroups } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";

export function Skills() {
  return (
    <Section id="skills" className="border-t border-line bg-bg-2">
      <SectionHeading
        eyebrow="Toolbox"
        title={
          <>
            What I <em className="text-accent">work with</em>
          </>
        }
      />
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={0.04 * (i % 3)}>
            <h3 className="border-b border-line-strong pb-3 font-display text-lg font-medium text-ink">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-medium text-ink-2"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
