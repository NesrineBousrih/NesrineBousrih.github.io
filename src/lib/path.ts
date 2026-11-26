/** Prefixes local asset paths with the base path (needed when hosted in a GitHub Pages sub-folder). */
export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
