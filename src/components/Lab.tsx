import { FlaskConical } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui";
import { Pipeline } from "./lab/Pipeline";
import { Cluster } from "./lab/Cluster";
import { Metrics } from "./lab/Metrics";
import { Terminal } from "./lab/Terminal";
import { Architecture } from "./lab/Architecture";

export function Lab() {
  return (
    <Section id="lab">
      <SectionHeading title="DevOps Lab" description="Interactive demos — try them." />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
        <Reveal className="lg:col-span-2">
          <Pipeline />
        </Reveal>
        <Reveal className="h-full">
          <Cluster />
        </Reveal>
        <Reveal delay={0.05} className="h-full">
          <Metrics />
        </Reveal>
        <Reveal className="h-full">
          <Terminal />
        </Reveal>
        <Reveal delay={0.05} className="h-full">
          <Architecture />
        </Reveal>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-muted">
        <FlaskConical className="size-4" />
        Simulations running in your browser.
      </p>
    </Section>
  );
}
