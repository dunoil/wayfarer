import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Span,
  Text,
} from "@hyper-elements/react";
import { trip } from "../src/data/trip";
import type { Traveller, Trip } from "../src/data/trip";
import { wayfarerTheme } from "../src/theme";
import {
  DayLine,
  DayTable,
  IncludesList,
  KitFooter,
  PackingList,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1 — The traveller email (Email root -> email-safe HTML + a
 * plain-text twin from the same render).
 *
 * No Svg, no remote images: the PostcardStrip is layout, so the trip
 * survives image-blocking inboxes. The five days lead — a traveller
 * email is, first, a date and a meeting point.
 */
export function TravellerEmail({
  trip: t = trip,
  traveller,
}: {
  trip?: Trip;
  traveller?: Traveller;
}) {
  return (
    <Email
      theme={wayfarerTheme}
      width={600}
      previewText={`The Slow Road walks ${t.datesLabel} — five days from Lisbon to Porto. Your meeting point inside.`}
      title={`${t.operator} — ${t.name}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark trip={t} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Pack your bag, <MergeTag name="first_name" />
        </Heading>
        <Text>{t.pitch}</Text>
        <DayLine trip={t} />
        <DayTable trip={t} />
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700 }}>Meeting point: </Span>
          {t.meetingPoint}. Your walk leader is {t.leader}.
        </Text>
        <Heading level={2}>What your price covers</Heading>
        <IncludesList trip={t} />
        <Heading level={2}>Pack this</Heading>
        <PackingList trip={t} />
        <Button href="https://wayfarerwalks.example/trips/slow-road">
          Read the full itinerary
        </Button>
        {traveller ? (
          <Text style={{ apply: ["quiet"] }}>
            Booked as {traveller.rooming} · Dietary:{" "}
            {traveller.dietary} · Reference {traveller.ref} ·{" "}
            {t.price}. Luggage moves ahead each morning — your day pack
            is all you carry.
          </Text>
        ) : null}
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive traveller email because you booked with Wayfarer
        Walks.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

TravellerEmail.PreviewProps = { trip };
export default TravellerEmail;
