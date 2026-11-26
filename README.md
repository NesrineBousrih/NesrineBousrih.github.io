# Nesrine Bousrih — Portfolio

Personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS 4** and **Framer Motion**.
It exports to a static site, ready for GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Before pushing:

```bash
npm run lint
npm run build      # static site is generated in out/
```

## Edit your content

Everything you'd want to change is in **`src/data/profile.ts`**:

| What | Where in `profile.ts` |
|---|---|
| Name, headline, intro, links | `profile` |
| CV download | put the PDF in `public/cv/`, set `profile.cvFile` |
| Your photo | put it in `public/images/`, set `profile.portrait` |
| About text and info cards | `about` |
| Skills | `skillGroups` |
| Projects (+ screenshots) | `projects` — add a screenshot to `public/images/` and set `image` |
| Experience & education | `timeline` |
| Certifications | `certifications` — set `status` to `completed` only once confirmed |

## Structure

```
src/
  app/            layout, page, global styles
  components/     Hero, About, Skills, Projects, Lab, Experience, Certifications, Contact…
  components/lab/ Pipeline, Cluster, Metrics, Terminal, Architecture (DevOps Lab)
  data/profile.ts all the content
```

## Deploy on GitHub Pages

1. Push this project to a repository named `NesrineBousrih.github.io`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

If you use another repository name (e.g. `portfolio`), set `NEXT_PUBLIC_BASE_PATH: /portfolio` in the workflow.

## Contact form

The site is static, so **Send message** opens the visitor's email app with the message pre-filled.
To receive messages directly, create a free form on Formspree and post the form there instead.
