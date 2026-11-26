import { ArrowUpRight, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/profile";
import { Badge, Reveal, Section, SectionHeading } from "./ui";
import { ProjectCover } from "./ProjectCover";

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p !== featured);

  return (
    <Section id="projects" className="bg-bg-2">
      <SectionHeading title="Projects" />

      <Reveal>
        <article className="card grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
          <div className="aspect-[16/11] lg:aspect-auto lg:min-h-[400px]">
            <ProjectCover project={featured} large />
          </div>
          <div className="flex flex-col p-7 sm:p-9">
            <p className="text-sm font-medium text-blue">Featured · {featured.tagline}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{featured.name}</h3>
            <p className="mt-3 text-ink-2">{featured.description}</p>
            {featured.features && (
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                {featured.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink-2">
                    <Check className="size-4 shrink-0 text-ok" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {featured.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            {featured.github && (
              <a
                href={featured.github}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-[15px] font-semibold text-ink hover:text-blue"
              >
                <FaGithub className="size-4" /> View on GitHub <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </article>
      </Reveal>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p, i) => (
          <Reveal key={p.slug} delay={0.04 * (i % 3)} className="h-full">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="card group flex h-full flex-col overflow-hidden transition hover:border-line-strong"
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-line">
                <ProjectCover project={p} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-ink">{p.name}</h3>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-blue" />
                </div>
                <p className="mt-1.5 text-sm text-muted">{p.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
