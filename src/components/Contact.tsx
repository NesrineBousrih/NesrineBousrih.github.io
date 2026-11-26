import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/data/profile";
import { CvButtons } from "./CvButtons";
import { Reveal, StatusDot } from "./ui";

export function Contact() {
  const channels = [
    { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: profile.github, label: "GitHub", Icon: FaGithub },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-accent-soft px-6 py-14 text-center sm:px-12 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[2.3rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-[3.2rem]">
            Let&apos;s work <em className="text-accent">together.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[17px] text-ink-2">
            I&apos;m looking for a PFE internship starting February 2027 in DevOps, SRE or cloud. My inbox is open.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2.5 break-all font-display text-xl font-medium text-ink underline decoration-accent/40 decoration-2 underline-offset-[6px] transition hover:decoration-accent sm:text-2xl"
          >
            <Mail className="size-5 shrink-0 text-accent" /> {profile.email}
          </a>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {channels.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="btn btn-ghost bg-card">
                <Icon className="size-4" /> {label} <ArrowUpRight className="size-4" />
              </a>
            ))}
            <CvButtons />
          </div>

          <p className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink-2">
            <StatusDot /> {profile.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
