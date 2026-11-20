import { defineTheme } from "@hyper-elements/react";

/**
 * WAYFARER theme — "the postcard": warm cream paper, ink-brown type,
 * burnt orange and a deep rust hero, a serif display face against an
 * Inter body.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and Page
 * templates set their own phone styles.
 *
 * Burnt orange #c2410c is a shape colour only — it never sets body
 * text. Text ink is burnt orange #9a3412 or the ink/muted browns, all
 * ≥ 4.5:1 on the cream paper.
 */
export const wayfarerTheme = defineTheme({
  colors: {
    background: "#f8f0dc",
    paper: "#fffaf0",
    foreground: "#33241a",
    muted: "#6f5b47",
    primary: "#9a3412",
    primaryForeground: "#fff8ec",
    border: "#dcc9a3",
    orange: "#c2410c",
    rust: "#7c2d12",
    gold: "#b45309",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Georgia, 'Times New Roman', serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 4, md: 8 },
  elements: {
    Heading: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 700,
      letterSpacing: -0.3,
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#9a3412",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 6,
      hover: { backgroundColor: "#7c2d12" },
      variants: {
        secondary: {
          backgroundColor: "#fffaf0",
          color: "#33241a",
          border: { width: 1, style: "solid", color: "#33241a" },
          hover: { backgroundColor: "#f8f0dc" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #dcc9a3" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fffaf0",
      padding: 28,
      gap: 16,
      borderRadius: 8,
      border: { width: 1, style: "solid", color: "#dcc9a3" },
    },
    quiet: { color: "#6f5b47", fontSize: 12 },
    eyebrow: {
      color: "#9a3412",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#9a3412" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
    orangeRule: {
      backgroundColor: "#c2410c",
      height: 3,
      borderRadius: 2,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: {
        Text: { fontSize: 11, lineHeight: 1.45 },
        Heading: { fontFamily: "'Times New Roman', Times, serif" },
      },
    },
    canvas: {
      elements: {
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
        Text: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof wayfarerTheme;
  }
}
