import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import puppeteer from "puppeteer";

/**
 * Screenshots of the REAL rendered outputs in docs/ — the same HTML files
 * scripts/render.tsx wrote to out/, photographed in headless Chrome.
 * Nothing here is a mock-up: if it is pictured, it was rendered.
 * The overview is a composite of those same photographs.
 */
const shots: Array<{
  file: string;
  out: string;
  width: number;
  height?: number;
}> = [
  { file: "out/traveller-email.html", out: "docs/email.png", width: 680 },
  { file: "out/trip-page.html", out: "docs/page-desktop.png", width: 1280 },
  { file: "out/trip-page.html", out: "docs/page-mobile.png", width: 390 },
  { file: "out/itinerary.html", out: "docs/itinerary.png", width: 900 },
  { file: "out/clients/outlook.html", out: "docs/email-outlook.png", width: 680 },
  { file: "out/clients/gmail.html", out: "docs/email-gmail.png", width: 680 },
];

await mkdir("docs", { recursive: true });
const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: shot.width,
    height: shot.height ?? 1000,
    deviceScaleFactor: 1.5,
  });
  await page.goto(`file://${resolve(shot.file)}`, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: shot.out, fullPage: true });
  console.log("shot", shot.out);
  await page.close();
}

// Overview: the four outputs side by side, photographed from the real
// screenshots — a composite, not a mock-up.
const overviewHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body { margin: 0; background: #f8f0dc; font-family: Georgia, serif; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 32px; align-items: start; }
figure { margin: 0; background: #fffaf0; border: 1px solid #dcc9a3; border-radius: 8px; overflow: hidden; }
figcaption { padding: 12px 16px; font-size: 20px; font-weight: 700; color: #33241a; }
img { display: block; width: 100%; }
</style></head><body><div class="grid">
<figure><img src="email.png"><figcaption>The traveller email</figcaption></figure>
<figure><img src="page-desktop.png"><figcaption>The trip page</figcaption></figure>
<figure><img src="itinerary.png"><figcaption>The printed itinerary</figcaption></figure>
<figure><img src="../out/day-card.png"><figcaption>A day card</figcaption></figure>
</div></body></html>`;
await writeFile("docs/overview.html", overviewHtml);
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
await page.goto(`file://${resolve("docs/overview.html")}`, {
  waitUntil: "networkidle0",
});
await page.screenshot({ path: "docs/overview.png", fullPage: true });
console.log("shot docs/overview.png");
await page.close();
await browser.close();
