import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import test from "node:test";

const outputDirectory = new URL("../dist/", import.meta.url);
const html = readFileSync(new URL("index.html", outputDirectory), "utf8");
const responsiveCss = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");

test("builds a self-contained GitHub Pages site under the repository path", async () => {
  assert.match(html, /src="\/portfolio\/assets\/[^"]+\.js"/);
  assert.match(html, /href="\/portfolio\/assets\/[^"]+\.css"/);
  assert.match(html, /href="\/portfolio\/favicon\.svg"/);
  assert.match(html, /viewport-fit=cover/);
  assert.doesNotMatch(html, /\/_next\//);
  assert.ok(existsSync(new URL(".nojekyll", outputDirectory)));
  assert.ok(existsSync(new URL("favicon.svg", outputDirectory)));
  assert.ok(existsSync(new URL("og.png", outputDirectory)));

  const assets = await readdir(new URL("assets/", outputDirectory));
  assert.ok(assets.some((asset) => asset.endsWith(".js")));
  assert.ok(assets.some((asset) => asset.endsWith(".css")));
});

test("keeps narrow screens touch-friendly and free from desktop-only effects", () => {
  assert.match(responsiveCss, /@media \(max-width: 560px\)/);
  assert.match(responsiveCss, /\.snake-controls button[\s\S]*?width: 44px;[\s\S]*?height: 44px;/);
  assert.match(responsiveCss, /env\(safe-area-inset-left\)/);
  assert.match(responsiveCss, /@media \(hover: none\), \(pointer: coarse\)/);
  assert.match(responsiveCss, /\.project-card\.reveal-ready\.is-visible:hover[\s\S]*?transform: none;/);
});

test("keeps public metadata and portfolio identity in the static entry point", () => {
  assert.match(html, /Midhun Somanunnithan/);
  assert.match(html, /Machine Learning Researcher & Engineer/);
  assert.match(html, /https:\/\/midhun9901\.github\.io\/portfolio\//);
  assert.match(html, /https:\/\/midhun9901\.github\.io\/portfolio\/og\.png/);
  assert.match(app, /I work where models meet physical systems/);
  assert.match(app, /Hold on/);
  assert.match(app, /Playable Snake game/);
});

test("presents selected work as evidence-led case studies", () => {
  assert.match(app, /My contribution/);
  assert.match(app, /83\.39% mAP/);
  assert.match(app, /vase-urn-project\/v5-dinov2-retrieval\/results\.svg/);
  assert.match(app, /deep-learning-from-scratch\/main\/01-micrograd\/assets\/computation_graph\.png/);
  assert.match(app, /jarvis\/main\/docs\/system-architecture\.svg/);
});
