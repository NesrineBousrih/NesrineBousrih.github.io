import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { profile } from "@/data/profile";

const title = `${profile.name} — Software Engineer · DevOps & SRE`;

export const metadata: Metadata = {
  title,
  description: profile.intro,
  openGraph: {
    title,
    description: profile.intro,
    type: "profile",
    images: [`/images/${profile.portrait}`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1714" },
  ],
};

/* Light by default; dark only when the visitor chose it. Runs before paint so there is no flash. */
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
