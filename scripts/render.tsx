import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import TravellerEmail from "../templates/traveller-email";
import TripPage from "../templates/trip-page";
import ItineraryDocument from "../templates/itinerary-document";
import TripCanvas from "../templates/day-canvas";

/**
 * Render the four committed examples into out/ :
 *   traveller-email.html + .txt | trip-page.html
 *   itinerary.html + itinerary.pdf
 *   day-card.html (+ day-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter WOFF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<TravellerEmail />);
await writeFile("out/traveller-email.html", email.html);
await writeFile("out/traveller-email.txt", email.text);
console.log("traveller-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<TripPage />);
await writeFile("out/trip-page.html", page.html);
console.log("trip-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <ItineraryDocument />;
const printed = await render(doc);
await writeFile("out/itinerary.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics — it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/itinerary.pdf", pdf.pdf);
console.log(
  "itinerary: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <TripCanvas />;
const cardHtml = await render(card);
await writeFile("out/day-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/day-card.png", image);
  console.log("day-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "day-card: HTML written. PNG skipped — add Inter WOFF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
