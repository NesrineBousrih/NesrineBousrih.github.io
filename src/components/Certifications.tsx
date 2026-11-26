import { ArrowUpRight, Award, Trophy } from "lucide-react";
import { certifications } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";

const statusStyle = {
  completed: { label: "Completed", cls: "text-ok" },
  "in-progress": { label: "In progress", cls: "text-blue" },
  planned: { label: "Planned", cls: "text-muted" },
} as const;

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading title="Certifications & Achievements" />
      <div className="grid gap-4 md:grid-cols-3">
        {certifications.map((c, i) => {
          const s = statusStyle[c.status];
          const Icon = c.kind === "achievement" ? Trophy : Award;
          return (
            <Reveal key={c.title} delay={0.04 * i} className="h-full">
              <article className={`card flex h-full flex-col p-5 ${c.status === "planned" ? "border-dashed" : ""}`}>
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-ink-2" />
                  <span className={`text-xs font-semibold ${s.cls}`}>{s.label}</span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-ink">{c.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{c.issuer}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-blue">
                    View credential <ArrowUpRight className="size-4" />
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
