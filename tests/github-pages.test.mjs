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
  assert.ok(existsSync(new URL("Midhun_Somanunnithan_CV.pdf", outputDirectory)));

  const assets = await readdir(new URL("assets/", outputDirectory));
  assert.ok(assets.some((asset) => asset.endsWith(".js")));
  assert.ok(assets.some((asset) => asset.endsWith(".css")));
});

test("keeps narrow screens touch-friendly and free from desktop-only effects", () => {
  assert.match(responsiveCss, /@media \(max-width: 560px\)/);
  assert.match(responsiveCss, /\.practice-card[\s\S]*?width: 100%;/);
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
  assert.match(app, /Open Midhun's GitHub profile/);
  assert.match(app, /Open Midhun's LinkedIn profile/);
  assert.match(app, /download="Midhun_Somanunnithan_CV\.pdf"/);
  assert.match(app, /Engineering scope/);
});

test("keeps the introduction professional and game-free", () => {
  assert.match(app, /Physical systems/);
  assert.match(app, /Computer vision/);
  assert.match(app, /Build \/ measure \/ validate/);
  assert.doesNotMatch(app, /snake/i);
  assert.doesNotMatch(responsiveCss, /snake-/i);
});

test("uses a vibrant, restrained color system across the portfolio", () => {
  assert.match(responsiveCss, /--accent: #4ee3c2;/);
  assert.match(responsiveCss, /--blue: #69aef8;/);
  assert.match(responsiveCss, /--amber: #ffc166;/);
  assert.match(responsiveCss, /--violet: #b6a0ff;/);
  assert.match(responsiveCss, /\.project-card:nth-child\(4\)[\s\S]*?--card-accent: var\(--violet\);/);
});

test("presents selected work as evidence-led case studies", () => {
  assert.match(app, /My contribution/);
  assert.match(app, /78\.26% mAP/);
  assert.match(app, /vase-urn-project\/v5-dinov2-retrieval\/results\.svg/);
  assert.match(app, /deep-learning-from-scratch\/main\/01-micrograd\/assets\/computation_graph\.png/);
  assert.match(app, /jarvis\/main\/docs\/system-architecture\.svg/);
});
