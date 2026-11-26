import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { SocialLinks } from "@/components/Brand";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <SocialLinks />
        </div>
      </footer>
    </>
  );
}
