import { Column, Row, Span, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `trip.DayCard` — one day of the walk, as a postcard card: an orange
 * rule, the day in serif, the place, the walking distance and the
 * day's highlight line.
 *
 * A custom element because the day is the kit's unit of reuse: the
 * page lists five of them, and a mistyped day number or a missing
 * place should be a diagnostic with a path, not a broken page.
 * Props are typed with the prop.* builders, so the checker and the
 * editor both enforce them.
 */
export const DayCard = defineElement({
  type: "trip.DayCard",
  label: "Trip day card",
  description:
    "One day of the trip: day label, title, place, walking distance and highlight.",
  props: {
    day: prop.text({ label: "Day", required: true }),
    title: prop.text({ label: "Title", required: true }),
    place: prop.text({ label: "Place", required: true }),
    distance: prop.text({ label: "Walking distance", required: true }),
    highlight: prop.text({ label: "Highlight", required: true }),
  },
  render: ({ day, title, place, distance, highlight }) => {
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: { width: 1, style: "solid", color: token("colors.border") },
          borderRadius: 8,
          padding: 18,
        }}
      >
        <Column style={{ apply: ["orangeRule"], width: 48 }} />
        <Text
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {place} · <Span style={{ fontWeight: 700 }}>{distance}</Span>
        </Text>
        <Text style={{ fontSize: 14 }}>{highlight}</Text>
        <Row style={{ gap: 0 }} stackOnMobile={false}>
          <Column style={{ flex: "none" }}>
            <Text style={{ apply: ["stamp"], color: "#9a3412" }}>
              {day.toUpperCase()}
            </Text>
          </Column>
          <Column />
        </Row>
      </Column>
    );
  },
});
