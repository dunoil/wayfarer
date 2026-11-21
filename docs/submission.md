Posted 21 Nov 2026 — Discussion: https://github.com/hyper-elements/hyper-elements/discussions/308

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
WAYFARER — The Slow Road, walked: a small-group travel itinerary kit (traveller email, trip page, printed itinerary PDF, daily social cards from one trip file)

### Project description

One trip file in → **12 personalised traveller emails, a 5-page printed itinerary, a public trip page and 6 day cards** out — from one theme and one set of shared components.

A trip's paperwork fails in a predictable way: the email says one thing, the website another, and the itinerary in the walker's hands says a third — a different meeting time, a different distance, a traveller's rooming spelled two ways. This kit makes that impossible by construction. Every date, distance and name lives in one trip file: the email quotes it, the page's cards carry it, and the printed itinerary prints it next to the leader's note.

- **Traveller email** (`Email` → `render()`) — the five days lead, in their own day table, before the price and the packing list. No Svg, no remote images: the PostcardStrip (one perforation per day, burnt orange and cream alternating) is a `Row` of fixed-width `Column`s, so it survives image-blocking inboxes. `MergeTag` greeting; plain-text twin from the same render.
- **Trip page** (`Page` → `render()`) — rust hero with a serif display title, every day as a typed `trip.DayCard` with a day stamp, phone styles, no client-side JavaScript.
- **Printed itinerary** (`Document` → `renderPdf()`) — the record handed to every walker: page one is the trip itself (pitch, the five days, price and inclusions), pages two to four walk the road day by day with every stop timed, page five is the packing list, the traveller roster and the leader's note. `PageHeader`/`PageFooter` with `PageNumber`; Times serif headings. No browser makes this PDF.
- **Day cards** (`Canvas` → `renderImage()`) — 1080×1080 PNGs, one per day, led by that day in poster type with its stops listed, plus the trip cover card. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (20 Nov 2026):** 12 traveller emails · 5 itinerary pages in one PDF · 6 day cards · 49 km walked · **gate: 0 errors, 0 warnings** · full batch in **2.3s**.

**Corrections pass:** traveller generation is deterministic (no clock, no randomness), so fixing one record re-renders only that record — the other 11 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/wayfarer

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots — warm cream paper, ink brown, burnt orange and deep rust, a serif display face against Inter body, named `card`/`stamp`/`mono`/`orangeRule` styles, Button variants, per-format overrides: the Document gets Times headings, the Canvas is forced to Inter because satori only draws the font bytes it is given. One deliberate constraint shaped it: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks — Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `PostcardStrip`, `DayLine`, `DayTable`, `StopTable`, `IncludesList`, `PackingList`) are why the emailed walking distance and the printed one are the same distance.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the PostcardStrip is a Row of fixed-width Columns — and it recolours automatically per trip, because the perforations are data on the days.
- **A custom element with `defineElement()`**: `trip.DayCard` with typed props (`prop.text`). A mistyped day or a missing place is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 20 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (12 emails) · `npm run make:sample` (6) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the traveller email (HTML + plain text), the trip page, the printed itinerary as a PDF and the day card PNG, all from the demo run — and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026 for the SOWN entry; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
