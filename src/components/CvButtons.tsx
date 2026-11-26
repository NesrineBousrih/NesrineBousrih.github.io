import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { withBase } from "@/lib/path";

/** "Download CV" pill with one link per language. */
export function CvButtons({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex min-h-[46px] items-center rounded-full border border-line-strong bg-card p-1 pl-4 text-[15px] ${className}`}
    >
      <span className="inline-flex items-center gap-2 pr-2 font-semibold text-ink">
        <Download className="size-4 text-accent" aria-hidden /> CV
      </span>
      {profile.cv.map((c) => (
        <a
          key={c.short}
          href={withBase(`/cv/${c.file}`)}
          download
          title={`Download CV — ${c.lang}`}
          aria-label={`Download CV in ${c.lang}`}
          className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-2 transition hover:bg-accent hover:text-white"
        >
          {c.short}
        </a>
      ))}
    </div>
  );
}
