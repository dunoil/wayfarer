# Fonts for the PDF and PNG outputs

`renderPdf()` and `renderImage()` fetch nothing: fonts are passed in as
bytes. The scripts look for these files here:

- `Inter-Regular.woff` (weight 400)
- `Inter-Bold.woff` (weight 700)

Inter is free (SIL Open Font License) — https://rsms.me/inter/ — and the
WOFF builds also ship in the `@fontsource/inter` npm package. The files
themselves are git-ignored so nobody commits binaries by accident;
without them, the HTML outputs still render and the scripts say plainly
what the PDF/PNG steps need. Text set in a family with no file given
falls back per the library's rules and is reported in diagnostics.
