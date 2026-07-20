// Generates data/asset-manifest.json — the list of real image files actually
// present under /public/photos and /public/brand. Runs as `prebuild`, so the
// site renders real photos when they exist and branded placeholders when they
// don't. We never fetch images off the internet.
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const pub = join(root, "public");
const out = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else {
      const rel = "/" + relative(pub, p).split(/[\\/]/).join("/");
      // Images + product demo video (mp4/webm) so product media slots can detect
      // real assets and fall back to branded placeholders when absent.
      if (/\.(jpe?g|png|webp|avif|gif|svg|mp4|webm)$/i.test(rel)) out.push(rel);
    }
  }
}

walk(join(pub, "photos"));
walk(join(pub, "brand"));
walk(join(pub, "product"));

const dataDir = join(root, "data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
writeFileSync(join(dataDir, "asset-manifest.json"), JSON.stringify(out.sort(), null, 2) + "\n");
console.log(`[assets] manifest: ${out.length} image(s)`);
