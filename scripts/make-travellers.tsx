import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import TravellerEmail from "../templates/traveller-email";
import ItineraryDocument from "../templates/itinerary-document";
import { TripCanvas } from "../templates/day-canvas";
import { trip, makeTravellers } from "../src/data/trip";

/**
 * The batch: one trip file -> a personalised traveller email for
 * every traveller, the five-page printed itinerary (PDF), and one day
 * card per day plus the cover card.
 *
 *   npm run make               12 traveller emails + itinerary PDF + 6 cards
 *   npm run make:sample        6 emails, for a quick look
 *
 * The gate runs first: the traveller email is validated before a single
 * file is written, so one bad trip entry never becomes 12 bad emails.
 * Traveller generation is deterministic — a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 12;
const started = Date.now();

const gate = validate(<TravellerEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/travellers", { recursive: true });
const travellers = makeTravellers(count);
let emails = 0;
for (const traveller of travellers) {
  const { html, text } = await render(
    <TravellerEmail traveller={traveller} />,
  );
  const stem = `out/travellers/${traveller.ref.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const itinerary = await renderPdf(<ItineraryDocument />);
await writeFile("out/itinerary.pdf", itinerary.pdf);

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  const { image: cover } = await renderImage(<TripCanvas />, { fonts });
  await writeFile("out/travellers/card-cover.png", cover);
  cards++;
  for (const day of trip.days) {
    const { image } = await renderImage(
      <TripCanvas day={day} />,
      { fonts },
    );
    await writeFile(`out/travellers/card-day-${day.day}.png`, image);
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  trip: `${trip.operator} — ${trip.name} (${trip.route})`,
  emails,
  itineraryPages: 5,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
