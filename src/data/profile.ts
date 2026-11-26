/**
 * ─────────────────────────────────────────────────────────────
 *  All the portfolio content lives in this file.
 *  Edit text, links, projects, skills and certifications here —
 *  you never need to touch the components to update your site.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Nesrine Bousrih",
  firstName: "Nesrine",
  role: "DevOps & SRE · Cloud & DevSecOps",
  location: "Tunisia",

  availability: "Available for PFE Internship – February 2027",
  greeting: "Hi, I'm Nesrine 👋",
  headline: ["Building Reliable Systems.", "Automating the Future."],
  intro: "Software engineer specializing in DevOps & SRE — CI/CD, containers, cloud and reliable systems.",

  email: "nesrinebousrih11@gmail.com",
  github: "https://github.com/NesrineBousrih",
  linkedin: "https://www.linkedin.com/in/nesrine-bousrih-106a81328/",

  /**
   * CV: put your PDF in /public/cv/ and set the file name here,
   * e.g. "Nesrine-Bousrih-CV.pdf". While it is null, the button
   * becomes "Request my CV" and opens an email instead.
   */
  cvFile: null as string | null,

  /**
   * Portrait: put your photo in /public/images/ and set the file
   * name here, e.g. "portrait.jpg". While it is null, a styled
   * placeholder with your initials is shown.
   */
  portrait: null as string | null,
};

export const about = {
  title: "A little about me",
  // Short version for the site — replace with your LinkedIn "About" text if you prefer.
  paragraphs: [
    "Master's student in DevOps & Site Reliability Engineering at Horizon School of Digital Technologies, with a Bachelor's degree in Software Engineering from the Faculty of Sciences of Monastir (Mention Très Bien).",
    "I enjoy automating how software is built, shipped and kept reliable — CI/CD, containers, cloud and DevSecOps.",
  ],
  facts: [
    { icon: "education", label: "Education", value: "MSc DevOps & SRE – Horizon University" },
    { icon: "background", label: "Background", value: "Bachelor's degree in Software Engineering" },
    { icon: "location", label: "Location", value: "Tunisia" },
    { icon: "goal", label: "Looking for", value: "PFE internship · Feb – Jul 2027" },
  ],
};

/** Icon keys are mapped to official logos in components/TechIcon.tsx */
export const skillGroups = [
  {
    title: "Programming & Development",
    items: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
      { name: "C/C++", icon: "cpp" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Docker Compose", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "Terraform", icon: "terraform" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    title: "Monitoring & SRE",
    items: [
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "SLO", icon: "slo" },
      { name: "Observability", icon: "observability" },
      { name: "Reliability Engineering", icon: "reliability" },
    ],
  },
  {
    title: "Backend & Architecture",
    items: [
      { name: "Django", icon: "django" },
      { name: "REST APIs", icon: "api" },
      { name: "Angular", icon: "angular" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Microservices", icon: "microservices" },
      { name: "Kafka", icon: "kafka" },
      { name: "gRPC", icon: "grpc" },
    ],
  },
  {
    title: "Testing & Quality",
    items: [
      { name: "Selenium", icon: "selenium" },
      { name: "Cucumber", icon: "cucumber" },
      { name: "Gherkin", icon: "cucumber" },
      { name: "BDD", icon: "bdd" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features?: string[];
  tech: string[];
  github?: string; // leave undefined when the code isn't public
  /** Put a screenshot in /public/images/ and set its file name here to replace the generated cover. */
  image?: string;
  cover: "devbridge" | "gourmet" | "nest" | "monitor" | "yarn" | "scripts";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "devbridge",
    name: "DevBridge",
    tagline: "Development Project Automation Platform",
    description:
      "Generates and configures ready-to-run development projects. Built during my PFE internship at Flesk.",
    features: [
      "Project scaffolding",
      "Schema → entity generation",
      "API & service generation",
      "Docker-based execution",
      "ZIP export",
      "Admin dashboard",
    ],
    tech: ["Angular 17", "Django", "PostgreSQL", "Docker"],
    github: "https://github.com/NesrineBousrih/DevBridge-backend",
    cover: "devbridge",
    featured: true,
  },
  {
    slug: "gourmet-go",
    name: "Gourmet-Go",
    tagline: "Distributed order system",
    description:
      "gRPC microservices with Saga orchestration, deployed by a GitHub Actions pipeline.",
    tech: ["gRPC", "Docker", "GitHub Actions", "PostgreSQL"],
    github: "https://github.com/NesrineBousrih/gourmet-go",
    cover: "gourmet",
  },
  {
    slug: "microservices-nest",
    name: "Microservices with NestJS",
    tagline: "REST · GraphQL · gRPC · Kafka",
    description:
      "Five services, each using a different way to communicate.",
    tech: ["NestJS", "REST", "GraphQL", "gRPC", "Kafka"],
    github: "https://github.com/NesrineBousrih/microservices-nest",
    cover: "nest",
  },
  {
    slug: "init-automation",
    name: "Project Init Automation",
    tagline: "One-command Angular & Django setup",
    description:
      "Scripts that create Dockerized Angular and Django projects in one command.",
    tech: ["Bash", "Docker Compose"],
    github: "https://github.com/NesrineBousrih/Django-Init-Automation",
    cover: "scripts",
  },
  {
    slug: "devops-monitor",
    name: "DevOps Monitor",
    tagline: "Service registry dashboard",
    description:
      "Register, search and inspect services in one dashboard.",
    tech: ["Angular 17", "SSR", "TypeScript"],
    github: "https://github.com/NesrineBousrih/devops-monitor",
    cover: "monitor",
  },
  {
    slug: "yarn-corner",
    name: "Yarn Corner",
    tagline: "Website for a handmade crochet brand",
    description:
      "Website for a Tunisian handmade crochet brand.",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/NesrineBousrih/yarn-corner-website",
    cover: "yarn",
  },
];

export const timeline = [
  {
    kind: "education",
    title: "MSc DevOps & SRE",
    org: "Horizon University",
    period: "2025 – 2027",
    description: "CI/CD, Kubernetes, AWS and SRE practices.",
  },
  {
    kind: "work",
    title: "PFE Internship — DevBridge",
    org: "Flesk",
    period: "Feb – Jun 2025",
    description: "Built a platform that automates project generation with Angular, Django, PostgreSQL and Docker.",
  },
  {
    kind: "education",
    title: "Bachelor's degree in Software Engineering",
    org: "Faculty of Sciences of Monastir",
    period: "2022 – 2025",
    description: "",
  },
] as const;

/**
 * status: "completed" — only once confirmed
 *         "in-progress" — currently learning
 *         "planned" — on the roadmap
 * Add `url` when you have a credential link.
 */
export const certifications: {
  title: string;
  issuer: string;
  kind: "certification" | "achievement";
  status: "completed" | "in-progress" | "planned";
  note?: string;
  url?: string;
}[] = [
  {
    title: "DevOps Engineering",
    issuer: "Coursera",
    kind: "certification",
    status: "in-progress",
  },
  {
    title: "Data2Innov – AINC Edition",
    issuer: "Winning team",
    kind: "achievement",
    status: "completed",
  },
  {
    title: "Technical certifications",
    issuer: "Cloud & Kubernetes certifications",
    kind: "certification",
    status: "planned",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#lab", label: "DevOps Lab" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
