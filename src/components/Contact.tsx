"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/data/profile";
import { Reveal, StatusDot } from "./ui";

/**
 * The site is static, so submitting opens the visitor's email app with the
 * message pre-filled. To receive messages directly, use a service like Formspree.
 */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-line-strong bg-card px-3.5 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20";

  const channels = [
    { href: `mailto:${profile.email}`, value: profile.email, Icon: Mail },
    { href: profile.linkedin, value: "LinkedIn", Icon: FaLinkedin },
    { href: profile.github, value: "GitHub", Icon: FaGithub },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something reliable together.
          </h2>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ok">
            <StatusDot /> {profile.availability}
          </p>
          <ul className="mt-8 grid gap-3">
            {channels.map(({ href, value, Icon }) => (
              <li key={value}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 font-medium text-ink-2 hover:text-blue"
                >
                  <Icon className="size-5" /> {value}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05}>
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-ink-2">
                Name
                <input required value={form.name} onChange={set("name")} className={field} autoComplete="name" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-ink-2">
                Email
                <input required type="email" value={form.email} onChange={set("email")} className={field} autoComplete="email" />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-ink-2">
              Subject
              <input required value={form.subject} onChange={set("subject")} className={field} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-ink-2">
              Message
              <textarea required rows={5} value={form.message} onChange={set("message")} className={`${field} resize-y`} />
            </label>
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-ink px-5 py-3 font-semibold text-bg transition hover:opacity-85"
            >
              <Send className="size-4" /> Send message
            </button>
            {sent && (
              <p className="text-sm text-muted" aria-live="polite">
                Your email app should open. If not, write to {profile.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
