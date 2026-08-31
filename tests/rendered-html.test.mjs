import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: { accept: "text/html", host: "portfolio.example" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Midhun's complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Midhun Somanunnithan/);
  assert.match(html, /Machine Learning Researcher/);
  assert.match(html, /models meet physical systems/);
  assert.match(html, /83\.4/);
  assert.match(html, /Recall@10/);
  assert.match(html, /100%/);
  assert.match(html, /Deep learning from scratch/);
  assert.match(html, /JARVIS/);
  assert.match(html, /GRBL and pneumatic spray system/);
  assert.match(html, /href="https:\/\/github\.com\/midhun9901"/);
  assert.match(html, /href="https:\/\/github\.com\/midhun9901\/vase-urn-project"/);
  assert.match(html, /href="https:\/\/github\.com\/midhun9901\/deep-learning-from-scratch"/);
  assert.match(html, /href="https:\/\/github\.com\/midhun9901\/jarvis"/);
  assert.match(html, /Research code not public/);
  assert.match(html, /MS \/\/ SYSTEM PATH/);
  assert.match(html, /Playable Snake game/);
  assert.match(html, /Tap, swipe, or use WASD/);
  assert.match(html, /href="mailto:midhunnrd812@gmail\.com"/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /ChatGPT|OpenAI|Codex/);
});

test("keeps final metadata, assets, and accessibility safeguards in place", async () => {
  const [page, layout, css, packageJson, appFiles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../app/", import.meta.url)),
    access(new URL("../public/profile.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.doesNotMatch(appFiles.join(" "), /_sites-preview/);
  assert.match(page, /aria-label="Portfolio sections"/);
  assert.match(page, /Playable Snake game/);
  assert.match(page, /Bayesian parameter optimization/);
  assert.match(page, /OpenCV quality measurement/);
  assert.match(page, /SNAKE_COLUMNS/);
  assert.match(page, /onKeyDown=\{handleSnakeKey\}/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /aria-hidden|aria-labelledby/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /new URL\("\/og\.png", siteUrl\)/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(packageJson, /"name": "midhun-somanunnithan-portfolio"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
