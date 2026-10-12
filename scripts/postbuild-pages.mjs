// Finalizes the static GitHub Pages output in dist/client after `vite build`:
//  - 404.html: GitHub Pages serves it for ANY unknown path, so the client router would
//    try to hydrate the /404 route's state at a different URL (React hydration mismatch).
//    It ships as plain static HTML instead: hydration scripts and module preloads removed.
//  - .nojekyll: tells GitHub Pages to publish the folder as-is (no Jekyll processing).
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "dist/client");
const required = ["index.html", "404.html", "sitemap.xml", "robots.txt", "llms.txt"];
for (const file of required) {
  await stat(path.join(outDir, file)).catch(() => {
    throw new Error(`postbuild-pages: expected ${file} in ${outDir} — did prerendering run?`);
  });
}

const notFoundPath = path.join(outDir, "404.html");
let html = await readFile(notFoundPath, "utf8");
html = html
  .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "");
await writeFile(notFoundPath, html);
await writeFile(path.join(outDir, ".nojekyll"), "");
console.log(`postbuild-pages: static 404.html and .nojekyll written to ${outDir}`);
