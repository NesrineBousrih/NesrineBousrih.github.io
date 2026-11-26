import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: profile.github, label: "GitHub", Icon: FaGithub },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent"
          >
            <Icon className="size-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
