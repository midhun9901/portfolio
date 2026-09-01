import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import test from "node:test";

const outputDirectory = new URL("../gh-pages/", import.meta.url);
const html = readFileSync(new URL("index.html", outputDirectory), "utf8");
const responsiveCss = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("builds a self-contained GitHub Pages site under the repository path", async () => {
  assert.match(html, /src="\/portfolio\/assets\/[^"]+\.js"/);
  assert.match(html, /href="\/portfolio\/assets\/[^"]+\.css"/);
  assert.match(html, /href="\/portfolio\/profile\.png"/);
  assert.match(html, /viewport-fit=cover/);
  assert.doesNotMatch(html, /\/_next\//);
  assert.ok(existsSync(new URL(".nojekyll", outputDirectory)));
  assert.ok(existsSync(new URL("profile.png", outputDirectory)));
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
  assert.doesNotMatch(html, /ChatGPT|OpenAI|AI-generated/i);
});
