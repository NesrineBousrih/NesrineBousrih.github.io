import { ArrowUpRight, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, type Project, type Shot } from "@/data/profile";
import { withBase } from "@/lib/path";
import { Reveal, Section, SectionHeading, Tag } from "./ui";

function Browser({ shot, className = "" }: { shot: Shot; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-card shadow-[var(--shadow)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-bg-2 px-3 py-2" aria-hidden>
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase(`/images/${shot.src}`)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        className="block aspect-[2/1] w-full object-cover object-top"
      />
    </figure>
  );
}

function Showcase({ shots }: { shots: Shot[] }) {
  const [main, second] = shots;
  return (
    <div className="relative pb-[14%] pr-[12%]">
      <Browser shot={main} />
      {second && <Browser shot={second} className="absolute right-0 bottom-0 w-[60%] ring-4 ring-bg" />}
    </div>
  );
}

function GithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-accent"
    >
      <FaGithub className="size-4" /> View the code
      <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function FeaturedRow({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className={flip ? "lg:order-2" : ""}>
          <Showcase shots={p.shots!} />
        </div>
        <div className={flip ? "lg:order-1" : ""}>
          <p className="text-sm font-semibold text-accent">{p.tagline}</p>
          <h3 className="mt-2 font-display text-[2rem] font-medium leading-tight text-ink">{p.name}</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{p.description}</p>
          {p.points && (
            <ul className="mt-5 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-[15px] text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {pt}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {p.github && (
            <div className="mt-7">
              <GithubLink href={p.github} />
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function SmallCard({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{p.tagline}</p>
          <h3 className="mt-2 font-display text-xl font-medium text-ink">{p.name}</h3>
        </div>
        {p.github && (
          <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        )}
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </>
  );
  const cls = "card group flex h-full flex-col p-6 transition duration-300";
  return p.github ? (
    <a href={p.github} target="_blank" rel="noreferrer" className={`${cls} hover:-translate-y-1 hover:border-line-strong`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.shots?.length);
  const others = projects.filter((p) => !p.shots?.length);

  return (
    <Section id="projects" className="border-t border-line bg-bg-2">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <em className="text-accent">built</em>
          </>
        }
      />

      <div className="space-y-24 sm:space-y-28">
        {featured.map((p, i) => (
          <FeaturedRow key={p.slug} p={p} flip={i % 2 === 1} />
        ))}
      </div>

      <Reveal className="mt-24 sm:mt-28">
        <h3 className="font-display text-2xl font-medium text-ink">More projects</h3>
      </Reveal>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {others.map((p, i) => (
          <Reveal key={p.slug} delay={0.05 * (i % 2)} className="h-full">
            <SmallCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
