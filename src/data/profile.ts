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
  role: "Software Engineer · DevOps & SRE",
  location: "Monastir, Tunisia",
  availability: "Open to a PFE internship · Feb 2027",

  intro:
    "Software engineer studying DevOps & Site Reliability Engineering. I build full-stack web apps, containerized microservices and the CI/CD pipelines that ship them.",

  email: "nesrinebousrih11@gmail.com",
  github: "https://github.com/NesrineBousrih",
  linkedin: "https://www.linkedin.com/in/nesrine-bousrih-106a81328/",

  /** Files in /public/cv/ */
  cv: [
    { lang: "English", short: "EN", file: "Nesrine-Bousrih-CV-EN.pdf" },
    { lang: "Français", short: "FR", file: "Nesrine-Bousrih-CV-FR.pdf" },
  ],

  /** File in /public/images/ */
  portrait: "portrait.jpg",
};

export const about = {
  paragraphs: [
    "I'm a Software Engineering graduate (Faculty of Sciences of Monastir) now doing a Master's in DevOps & SRE at Horizon University. Through two internships and many side projects I've worked across the whole lifecycle — from API design and frontends to Docker, CI/CD and AWS.",
    "I like turning slow, manual work into something automatic and reliable. Outside of code: piano, cinema, learning languages, and running a small crochet business.",
  ],
  facts: [
    { label: "Studying", value: "MSc DevOps & SRE, Horizon University" },
    { label: "Degree", value: "BSc Software Engineering" },
    { label: "Based in", value: "Monastir, Tunisia" },
    { label: "Languages", value: "Arabic · French (B2) · English" },
  ],
};

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  points?: string[];
  tech: string[];
  github?: string;
  /** Screenshots in /public/images/ — projects with shots are shown large. */
  shots?: Shot[];
};

export const projects: Project[] = [
  {
    slug: "devbridge",
    name: "DevBridge",
    tagline: "End-of-studies project · Flesk",
    description:
      "A platform that removes manual project setup. Point it at a PostgreSQL database and it generates a ready-to-run Django REST backend and a matching Angular frontend — turning days of setup into minutes.",
    points: [
      "Schema → models, serializers and REST API",
      "Angular CRUD screens for every entity",
      "Full stack containerized with Docker Compose",
      "Exports a project teams can clone and extend",
    ],
    tech: ["Angular", "Django REST", "PostgreSQL", "Docker"],
    github: "https://github.com/NesrineBousrih/DevBridge-backend",
    shots: [
      { src: "devbridge-1.jpg", alt: "DevBridge landing page", width: 1062, height: 511 },
      { src: "devbridge-2.jpg", alt: "DevBridge “How it works” section", width: 1060, height: 508 },
    ],
  },
  {
    slug: "yarn-corner",
    name: "Yarn Corner",
    tagline: "Website for a handmade crochet brand",
    description:
      "The online shop window for Yarn Corner, a Tunisian handmade crochet brand: a soft, image-led catalogue with product colours, prices and one-tap WhatsApp ordering.",
    points: ["Responsive, image-first design", "Collection with colours & prices", "Order directly via WhatsApp"],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/NesrineBousrih/yarn-corner-website",
    shots: [
      { src: "yarn-corner-1.jpg", alt: "Yarn Corner home page", width: 1600, height: 763 },
      { src: "yarn-corner-2.jpg", alt: "Yarn Corner collection page", width: 1600, height: 722 },
    ],
  },
  {
    slug: "gourmet-go",
    name: "GourmetGo",
    tagline: "Food ordering on microservices",
    description:
      "Menu, orders, users and payments as independent services talking over gRPC, with a GitHub Actions pipeline, Selenium tests and deployment to AWS.",
    tech: ["gRPC", "Docker", "GitHub Actions", "AWS"],
    github: "https://github.com/NesrineBousrih/gourmet-go",
  },
  {
    slug: "distributed-orders",
    name: "Distributed Order Platform",
    tagline: "REST · GraphQL · gRPC · Kafka",
    description:
      "A reference architecture showing when to use each protocol, built with NestJS and Kafka in KRaft mode.",
    tech: ["NestJS", "GraphQL", "Kafka"],
    github: "https://github.com/NesrineBousrih/microservices-nest",
  },
  {
    slug: "devops-monitor",
    name: "DevOps Monitor",
    tagline: "Infrastructure dashboard",
    description:
      "An Angular dashboard bringing service health, pipeline status and performance metrics into one view for on-call engineers.",
    tech: ["Angular", "REST", "Chart.js"],
    github: "https://github.com/NesrineBousrih/devops-monitor",
  },
  {
    slug: "test-automation",
    name: "BDD Test Automation Suite",
    tagline: "End-to-end testing",
    description:
      "Selenium + Cucumber suite using the Page Object Model, stable waits and HTML reports with screenshots on failure.",
    tech: ["Java", "Selenium", "Cucumber"],
  },
];

export const experience = [
  {
    role: "Web Development Intern (PFE)",
    org: "Flesk",
    place: "Monastir",
    period: "Feb – Jun 2025",
    summary:
      "Built DevBridge, which generates a Django REST backend and Angular frontend from an existing PostgreSQL database, fully containerized with Docker.",
  },
  {
    role: "Research & Development Intern",
    org: "Clevertech France",
    place: "Tunis",
    period: "Jul 2024",
    summary:
      "Shipped four modules of ARCHIMATCH, a SaaS platform for architects and clients — showcase, quoting & reviews, admin back-office — plus a chatbot and the Figma prototypes.",
  },
];

export const education = [
  { title: "Master's in DevOps & Site Reliability Engineering", org: "Horizon University, Sousse", period: "2025 – 2027" },
  { title: "Bachelor's in Software Engineering", org: "Faculty of Sciences of Monastir", period: "2022 – 2025" },
];

export const certifications = [
  { title: "Winner — AI Night Challenge (Data2Innov), 5th edition", date: "Feb 2026" },
  { title: "IBM DevOps and Software Engineering Professional Certificate", date: "Apr 2026" },
  { title: "Microsoft Cloud Support Associate Professional Certificate", date: "Apr 2026" },
  { title: "IEEE Web Development & AI Fundamentals trainings", date: "2023 – 2024" },
];

export const skillGroups = [
  { title: "DevOps & Cloud", items: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "AWS (EC2, S3)", "Terraform", "Linux", "Git"] },
  { title: "Monitoring & SRE", items: ["Prometheus", "Grafana", "Observability", "SLOs"] },
  { title: "Backend & APIs", items: ["Django REST", "NestJS", "Node.js", "REST", "GraphQL", "gRPC", "Kafka", "PostgreSQL", "MySQL"] },
  { title: "Frontend & Design", items: ["Angular", "React", "TypeScript", "Tailwind CSS", "Figma"] },
  { title: "Languages", items: ["Python", "JavaScript", "Java", "C / C++", "C#", "PHP"] },
  { title: "Testing", items: ["Selenium", "Cucumber / Gherkin", "BDD", "Postman"] },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
