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
  assert.match(html, /I build learning systems from/);
  assert.match(html, /83\.4/);
  assert.match(html, /100% Recall@10/);
  assert.match(html, /Deep learning, rebuilt from the bottom up/);
  assert.match(html, /JARVIS, a local voice-agent system/);
  assert.match(html, /href="https:\/\/github\.com\/midhun9901"/);
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
  assert.match(page, /aria-label="Main navigation"/);
  assert.match(page, /aria-hidden|aria-labelledby/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /new URL\("\/og\.png", siteUrl\)/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(packageJson, /"name": "midhun-somanunnithan-portfolio"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
