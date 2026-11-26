import type { Project } from "@/data/profile";
import { withBase } from "@/lib/path";
import { TechIcon } from "./TechIcon";

/**
 * Generated cover art for each project. Replace with a real screenshot by
 * setting `image` on the project in src/data/profile.ts.
 */
export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBase(`/images/${project.image}`)}
        alt={`Screenshot of ${project.name}`}
        className="size-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative size-full overflow-hidden bg-card-2">
      <div className={`relative flex size-full items-center justify-center ${large ? "p-6 sm:p-10" : "p-5"}`}>
        <Window title={project.name.toLowerCase().replace(/\s+/g, "-")} large={large}>
          <Art kind={project.cover} />
        </Window>
      </div>
    </div>
  );
}

function Window({ title, children, large }: { title: string; children: React.ReactNode; large: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-white/10 bg-[#16191f] shadow-lg ${large ? "max-w-[520px]" : "max-w-[340px]"}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[10px] text-white/40">{title}</span>
      </div>
      <div className="p-3 text-white/80">{children}</div>
    </div>
  );
}

const box = "rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[10px] font-medium text-white/80";

function Art({ kind }: { kind: Project["cover"] }) {
  switch (kind) {
    case "devbridge":
      return (
        <div className="grid gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white">New project</span>
            <span className="rounded bg-[#4d8dff]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#8fb5ff]">step 3 / 4</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`${box} flex items-center gap-2 border-[#ff4d6d]/40`}>
              <TechIcon name="angular" className="size-3.5" /> Angular 17
            </div>
            <div className={`${box} flex items-center gap-2 border-[#44b78b]/40`}>
              <TechIcon name="django" className="size-3.5" /> Django
            </div>
          </div>
          <div className={box}>
            <p className="text-[9px] text-white/50">Schema → entities</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {["User", "Project", "Framework", "Entity"].map((e) => (
                <span key={e} className="rounded bg-[#60a5fa]/20 px-1.5 py-0.5 text-[9px] text-[#bfdbfe]">
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full bg-[#60a5fa]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-white/50">Generating API & services…</span>
            <span className="rounded bg-white px-2 py-1 text-[9px] font-bold text-[#16191f]">Export ZIP</span>
          </div>
        </div>
      );
    case "gourmet":
      return (
        <div className="grid gap-2.5">
          <div className="flex items-center justify-center gap-1.5">
            <div className={box}>Angular</div>
            <HArrow />
            <div className={box}>Gateway</div>
            <HArrow />
            <div className={`${box} border-[#4d8dff]/50 bg-[#4d8dff]/20 text-white`}>Saga</div>
          </div>
          <div className="mx-auto h-3 w-px bg-[#60a5fa]" aria-hidden />
          <div className="flex justify-center gap-1.5">
            {["Order", "Kitchen", "Accounting"].map((s) => (
              <div key={s} className={box}>
                {s}
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-[9px] text-white/45">gRPC · 1 PostgreSQL per service</p>
        </div>
      );
    case "nest":
      return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 text-[10px]">
          {[
            ["REST", "catalog-service"],
            ["REST", "order-service"],
            ["gRPC", "stock-service"],
            ["Kafka", "notification-service"],
            ["GraphQL", "query-service"],
          ].map(([p, s]) => (
            <div key={s} className="contents">
              <span className="rounded bg-[#22d3ee]/15 px-1.5 py-0.5 text-center font-mono text-[9px] text-[#7ee8f7]">{p}</span>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/80">{s}</span>
            </div>
          ))}
        </div>
      );
    case "scripts":
      return (
        <div className="font-mono text-[10px] leading-relaxed">
          <p className="text-white">$ ./init_project.sh my-app</p>
          <p className="text-white/50">› creating Django project…</p>
          <p className="text-white/50">› writing Dockerfile</p>
          <p className="text-white/50">› writing docker-compose.yml</p>
          <p className="text-[#34d399]">✔ ready — docker compose up</p>
        </div>
      );
    case "monitor":
      return (
        <div className="grid gap-1.5">
          {[
            ["auth-service", "#34d399"],
            ["payment-api", "#34d399"],
            ["search", "#fbbf24"],
            ["notifications", "#34d399"],
          ].map(([n, c]) => (
            <div key={n} className={`${box} flex items-center justify-between`}>
              <span>{n}</span>
              <span className="size-2 rounded-full" style={{ background: c }} />
            </div>
          ))}
        </div>
      );
    case "yarn":
      return (
        <div className="grid gap-2">
          <p className="text-center font-display text-sm font-semibold text-white">Yarn Corner</p>
          <div className="grid grid-cols-3 gap-1.5">
            {["#f4a7b9", "#f6d6a8", "#b8d8c8"].map((c) => (
              <div key={c} className="aspect-square rounded-md" style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }} />
            ))}
          </div>
          <div className="mx-auto h-1.5 w-16 rounded-full bg-white/30" />
        </div>
      );
  }
}

function HArrow() {
  return <span className="h-px w-3 bg-[#60a5fa]" aria-hidden />;
}
