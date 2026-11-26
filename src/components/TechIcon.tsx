import type { IconType } from "react-icons";
import {
  SiAngular,
  SiApachekafka,
  SiCplusplus,
  SiCucumber,
  SiDjango,
  SiDocker,
  SiGithubactions,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiNodedotjs,
  SiPhp,
  SiPostman,
  SiPrometheus,
  SiPython,
  SiSelenium,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa6";
import { Activity, Boxes, Cable, GitBranch, Network, ShieldCheck, Target, Workflow } from "lucide-react";

type Def = { Icon: IconType | React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; darkColor?: string };

/** Official brand logos where they exist, with each brand's own colour. */
const map: Record<string, Def> = {
  python: { Icon: SiPython, color: "#3776AB", darkColor: "#5a9fd4" },
  javascript: { Icon: SiJavascript, color: "#d4b106", darkColor: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6", darkColor: "#4d97e8" },
  java: { Icon: FaJava, color: "#E76F00", darkColor: "#f08a2c" },
  cpp: { Icon: SiCplusplus, color: "#00599C", darkColor: "#4d8fd1" },
  php: { Icon: SiPhp, color: "#777BB4", darkColor: "#9da1d8" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  aws: { Icon: FaAws, color: "#FF9900" },
  terraform: { Icon: SiTerraform, color: "#7B42BC", darkColor: "#a06ee0" },
  githubactions: { Icon: SiGithubactions, color: "#2088FF" },
  linux: { Icon: SiLinux, color: "#1f2937", darkColor: "#FCC624" },
  kubernetes: { Icon: SiKubernetes, color: "#326CE5", darkColor: "#5b8ef0" },
  prometheus: { Icon: SiPrometheus, color: "#E6522C" },
  grafana: { Icon: SiGrafana, color: "#F46800" },
  django: { Icon: SiDjango, color: "#092E20", darkColor: "#44b78b" },
  angular: { Icon: SiAngular, color: "#DD0031", darkColor: "#ff4d6d" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E", darkColor: "#7cc36a" },
  kafka: { Icon: SiApachekafka, color: "#231F20", darkColor: "#e5e7eb" },
  selenium: { Icon: SiSelenium, color: "#43B02A" },
  cucumber: { Icon: SiCucumber, color: "#23D96C" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  // concepts without a brand logo
  cicd: { Icon: Workflow, color: "var(--blue)" },
  slo: { Icon: Target, color: "var(--violet)" },
  observability: { Icon: Activity, color: "var(--cyan)" },
  reliability: { Icon: ShieldCheck, color: "var(--ok)" },
  api: { Icon: Cable, color: "var(--blue)" },
  microservices: { Icon: Boxes, color: "var(--violet)" },
  grpc: { Icon: Network, color: "var(--cyan)" },
  bdd: { Icon: GitBranch, color: "var(--ok)" },
};

export function TechIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  const def = map[name] ?? map.cicd;
  const { Icon } = def;
  return (
    <>
      <Icon className={`${className} dark:hidden`} style={{ color: def.color }} aria-hidden />
      <Icon className={`${className} hidden dark:block`} style={{ color: def.darkColor ?? def.color }} aria-hidden />
    </>
  );
}
