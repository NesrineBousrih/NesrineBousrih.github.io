import { skillGroups } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";
import { TechIcon } from "./TechIcon";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading title="Skills" />
      <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={0.04 * (i % 2)}>
            <h3 className="text-sm font-semibold text-muted">{g.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s.name}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium text-ink transition hover:border-line-strong"
                >
                  <TechIcon name={s.icon} className="size-4" />
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
