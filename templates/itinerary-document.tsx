import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { trip } from "../src/data/trip";
import type { Traveller, Trip } from "../src/data/trip";
import { makeTravellers } from "../src/data/trip";
import { wayfarerTheme } from "../src/theme";
import {
  DayTable,
  IncludesList,
  PackingList,
  PostcardStrip,
  StopTable,
} from "../src/components/shared";

/**
 * OUTPUT 3 — The printed itinerary (Document root -> print HTML via
 * render(), PDF via renderPdf() from @hyper-elements/react/pdf).
 *
 * The formal record handed to every walker: page one is the trip
 * itself (pitch, the five days, price and inclusions); pages two to
 * four walk the road day by day; page five is the packing list, the
 * traveller roster and the leader's note. Each page carries the same
 * postcard edge the email sent, and the footer counts the pages —
 * written for a human holding paper, not a browser print button.
 * Two days per day-by-day page, so no stop table is ever cut off at
 * a page edge: a Document page clips what does not fit, it never
 * flows it onto the next page.
 */
export function ItineraryDocument({
  trip: t = trip,
  travellers = makeTravellers(t.groupSize),
}: {
  trip?: Trip;
  travellers?: Traveller[];
}) {
  const firstDays = t.days.slice(0, 2);
  const midDays = t.days.slice(2, 4);
  const lastDay = t.days.slice(4);
  return (
    <Document
      theme={wayfarerTheme}
      size="A4"
      margin={42}
      title={`${t.operator} — ${t.name} itinerary`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <PostcardStrip days={t.days} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {t.operator} · {t.name} · {t.datesLabel} · Itinerary
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#6f5b47" }}>
          Page <PageNumber /> of <PageNumber total /> · One trip file
          rendered this itinerary · {t.operator} · {t.datesLabel}
        </Text>
      </PageFooter>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Text style={{ apply: ["eyebrow"] }}>
            {t.operator} presents
          </Text>
          <Heading level={1} style={{ fontSize: 28 }}>
            {t.name}
          </Heading>
          <Text>
            {t.route} · {t.datesLabel} · {t.length} · {t.groupSize}{" "}
            walkers · Leader {t.leader}
          </Text>
        </Column>

        <Text>{t.pitch}</Text>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>The five days</Heading>
          <DayTable trip={t} />
          <Text>
            Meeting point: {t.meetingPoint}. The group walks at the
            pace of the slowest walker; luggage moves ahead each
            morning.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>What your price covers</Heading>
          <IncludesList trip={t} />
          <Text>{t.price}.</Text>
        </Column>
      </Document.Page>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Day by day — Lisbon and Sintra
          </Heading>
          <Text>
            Every stop of the first two days — the times are when the
            group is there, not when the bus leaves, because there is
            no bus.
          </Text>
        </Column>

        {firstDays.map((d) => (
          <Column key={d.day} style={{ gap: 6 }}>
            <Heading level={3}>
              Day {d.day} — {d.title} · {d.date}
            </Heading>
            <Text>
              {d.place} · {d.distance} · {d.walking} · {d.meals} ·
              Sleep: {d.sleep}
            </Text>
            <StopTable day={d} />
          </Column>
        ))}
      </Document.Page>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Day by day — Obidos and Nazare
          </Heading>
          <Text>
            The middle two days: the castle town, then the coast.
          </Text>
        </Column>

        {midDays.map((d) => (
          <Column key={d.day} style={{ gap: 6 }}>
            <Heading level={3}>
              Day {d.day} — {d.title} · {d.date}
            </Heading>
            <Text>
              {d.place} · {d.distance} · {d.walking} · {d.meals} ·
              Sleep: {d.sleep}
            </Text>
            <StopTable day={d} />
          </Column>
        ))}
      </Document.Page>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Day by day — Porto, and packing
          </Heading>
          <Text>
            The last day, and the packing list for the road.
          </Text>
        </Column>

        {lastDay.map((d) => (
          <Column key={d.day} style={{ gap: 6 }}>
            <Heading level={3}>
              Day {d.day} — {d.title} · {d.date}
            </Heading>
            <Text>
              {d.place} · {d.distance} · {d.walking} · {d.meals} ·
              Sleep: {d.sleep}
            </Text>
            <StopTable day={d} />
          </Column>
        ))}

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Pack this</Heading>
          <PackingList trip={t} />
        </Column>
      </Document.Page>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            The party
          </Heading>
          <Text>
            Twelve walkers, one leader. Find your rooming below — the
            roster is the same list your email was built from.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Travellers ({travellers.length})</Heading>
          {travellers.map((v) => (
            <Text key={v.ref}>
              {v.firstName} — {v.rooming} — Dietary: {v.dietary} —{" "}
              {v.ref}
            </Text>
          ))}
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>A note from the leader</Heading>
          <Text>{t.leadersNote}</Text>
        </Column>

        <Column
          style={{
            gap: 6,
            padding: { top: 12 },
            border: { top: "1px dashed #6f5b47" },
          }}
        >
          <Text style={{ fontWeight: 700 }}>
            Walk slowly — keep this itinerary.
          </Text>
          <Text>
            It is the record of the road: the same dates, distances
            and names your email carried and the page still shows.
          </Text>
        </Column>
      </Document.Page>
    </Document>
  );
}

ItineraryDocument.PreviewProps = { trip };
export default ItineraryDocument;
