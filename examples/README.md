# Examples — real artefacts from the demo run

Produced by `npm run render` on the sample trip in
`src/data/trip.ts` (Wayfarer Walks — The Slow Road, Lisbon to Porto,
12–16 April 2027). Nothing here is hand-made: if it is in this
folder, the library rendered it.

- `traveller-email.html` / `traveller-email.txt` — the traveller email and its
  plain-text twin (the greeting shows `{{first_name}}` because the
  sample renders the template itself; the batch fills real names).
- `trip-page.html` — the public trip page.
- `itinerary.pdf` — the printed itinerary: five A4 pages.
- `day-card.png` — the trip cover card (1080×1080); the batch makes
  one card per day plus this cover.

Regenerate everything with `npm run check && npm run render`.
