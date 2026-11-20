# WAYFARER — design notes

## Concept

A template kit for a small-group walking trip. One trip file renders
the traveller email, the public trip page, the printed itinerary
(PDF) and the daily social cards. Domain and style are deliberately
the opposite pole from a burgundy theatre kit: warm cream paper
`#f8f0dc`, ink brown `#33241a`, burnt orange `#9a3412` for text and
`#c2410c` for shapes only, deep rust `#7c2d12` for the hero, serif
display headings (Georgia in Email/Page, Times in the Document)
against an Inter body.

Signature: the **PostcardStrip** — one perforation per day of the
walk, burnt orange and cream alternating — plus the **day stamp**
(DAY 1 … DAY 5) that follows every day from the data file into the
page cards and the day-card PNGs. One file, one road: that is the
product idea and the design idea at once.

## Build lessons (from the gate and the screenshot review, all fixed)

1. Theme element defaults are flat style objects — no `style:`
   wrapper, and no nested `elements` inside a Table entry
   (`TableCell` gets its own top-level entry).
2. Theme defaults reject `padding: {x, y}` — use the array form
   `[vertical, horizontal]` there (and, in this version, in Section
   styles too).
3. `TableCell` holds text and inline `Span`s directly — never a
   nested `Text`. Inline runs inside `Text` are `Span`s, not nested
   `Text`s.
4. An Email has no `subject` prop and a root has no padding.
5. A mark built from a Grid scatters if its columns stretch — the
   PostcardStrip is a Row of fixed-width Columns with an explicit
   width, two days per page in the Document so no stop table is cut.
6. **A Document page clips what does not fit; it never flows it
   onto the next page.** The first build put three days on one
   itinerary page and the real PDF silently lost Day 3's last two
   stops. The fix is structural, not cosmetic: two days per
   day-by-day page, five pages in all, and every page verified from
   the actual PDF with `pdftoppm`, not from the print HTML.
7. The `☐` checkbox glyph drops out of the PDF fonts (Times /
   Helvetica have no such glyph), so the packing list uses `[ ]` —
   plain text that survives every root.
8. A stamp `Text` alone in a `Row` stretches to the full width —
   wrap it in a `flex: "none"` Column beside an empty Column so it
   hugs its text.
9. Satori only draws the fonts it is given as bytes: the theme's
   `formats.canvas` forces Inter on Canvas headings and text, while
   the Document keeps its Times serif headings through
   `formats.document`.
10. Deterministic data is a feature, not a nicety: the rooming list
    is a fixed array, and the gate's outline caught "Diana — Shared
    with Diana" before it ever shipped. Read the outline, not just
    the error count.
