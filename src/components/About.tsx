import { Code2, GraduationCap, MapPin, Target } from "lucide-react";
import { about, profile } from "@/data/profile";
import { Reveal, Section, SectionHeading } from "./ui";
import { withBase } from "@/lib/path";

const factIcons = {
  education: GraduationCap,
  background: Code2,
  location: MapPin,
  goal: Target,
} as const;

function Portrait() {
  return profile.portrait ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBase(`/images/${profile.portrait}`)}
      alt={`Portrait of ${profile.name}`}
      className="aspect-[4/5] w-full rounded-2xl object-cover"
    />
  ) : (
    <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border border-line bg-card-2">
      <div className="text-center">
        <span className="font-display text-6xl font-semibold text-ink-2">NB</span>
        <p className="mt-2 text-sm text-muted">Your photo goes here</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" className="bg-bg-2">
      <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[320px]">
          <Portrait />
        </Reveal>

        <div>
          <SectionHeading title={about.title} />
          <Reveal className="-mt-4 max-w-2xl space-y-4 text-[17px] leading-relaxed text-ink-2">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.05}>
            <dl className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {about.facts.map((f) => {
                const Icon = factIcons[f.icon as keyof typeof factIcons];
                return (
                  <div key={f.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-blue" />
                    <div>
                      <dt className="text-sm text-muted">{f.label}</dt>
                      <dd className="font-medium text-ink">{f.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
