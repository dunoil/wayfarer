import {
  Column,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { Trip, TripDay } from "../data/trip";

/**
 * Shared components — plain functions returning elements, used under
 * several roots, which is exactly why the email, the page and the
 * itinerary can never disagree about a walking distance or a meeting
 * time.
 */

/**
 * The PostcardStrip: a perforation edge of alternating burnt-orange
 * and cream squares, one per trip day. Built from a Row of
 * fixed-width Columns with an explicit width — never a Grid, never an
 * Svg, never an image — because an Email cannot hold an Svg and
 * inboxes block images. It is the trip, drawn as a postcard edge.
 */
export function PostcardStrip({
  days,
  cell = 12,
}: {
  days: TripDay[];
  cell?: number;
}) {
  return (
    <Row
      style={{ gap: 3, width: days.length * cell + (days.length - 1) * 3 }}
      stackOnMobile={false}
    >
      {days.map((day, i) => (
        <Column
          key={day.day}
          style={{
            backgroundColor: i % 2 === 0 ? "#c2410c" : "#f8f0dc",
            border: {
              width: 1,
              style: "solid",
              color: i % 2 === 0 ? "#c2410c" : "#dcc9a3",
            },
            width: cell,
            height: cell,
            borderRadius: 2,
          }}
        />
      ))}
    </Row>
  );
}

export function Wordmark({ trip }: { trip: Trip }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <PostcardStrip days={trip.days} cell={9} />
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          {trip.operator.toUpperCase()}
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          {trip.name} · {trip.datesLabel}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The five days, as one line. Used by email, page, canvas. */
export function DayLine({ trip }: { trip: Trip }) {
  const parts = trip.days.map(
    (d) => `Day ${d.day} ${d.date.replace(" 2027", "")} · ${d.place}`,
  );
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {parts.join("  |  ")}
    </Text>
  );
}

/** Every day, as a table — email, page and itinerary.
 *  TableCells hold text and inline Spans directly, never a nested Text. */
export function DayTable({ trip }: { trip: Trip }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Day</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Where</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Walk</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Sleep</Span>
        </TableCell>
      </TableRow>
      {trip.days.map((d) => (
        <TableRow key={d.day}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>
              Day {d.day}, {d.date}
            </Span>
          </TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700, color: "#9a3412" }}>
              {d.place}
            </Span>
            {` — ${d.title}`}
          </TableCell>
          <TableCell>
            {d.distance} · {d.walking}
          </TableCell>
          <TableCell>{d.sleep}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** One day's stops, as a table — the itinerary. */
export function StopTable({ day }: { day: TripDay }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Time</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Stop</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>What happens</Span>
        </TableCell>
      </TableRow>
      {day.stops.map((s) => (
        <TableRow key={s.time}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{s.time}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700, color: "#9a3412" }}>
              {s.name}
            </Span>
          </TableCell>
          <TableCell>{s.note}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** What the price covers — email, page and itinerary. */
export function IncludesList({ trip }: { trip: Trip }) {
  return (
    <Column style={{ gap: 6 }}>
      {trip.includes.map((item) => (
        <Text key={item}>— {item}</Text>
      ))}
    </Column>
  );
}

/** What to pack — email, page and itinerary. "[ ]" is plain text so
 *  it survives the PDF fonts too, where the checkbox glyph drops. */
export function PackingList({ trip }: { trip: Trip }) {
  return (
    <Column style={{ gap: 6 }}>
      {trip.packing.map((item) => (
        <Text key={item}>[ ] {item}</Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        Wayfarer Walks · Lisbon to Porto, on foot · Twelve walkers, one
        leader, no coach
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One trip file rendered this — email, page, itinerary and day
        cards — with Hyper Elements.
      </Text>
    </Column>
  );
}

export function TripHeading({ trip }: { trip: Trip }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>{`${trip.operator} presents`}</Eyebrow>
      <Text
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.2,
        }}
      >
        {trip.name}
      </Text>
      <Text style={{ fontSize: 17 }}>
        {trip.route} · {trip.datesLabel} · {trip.length}
      </Text>
    </Column>
  );
}
