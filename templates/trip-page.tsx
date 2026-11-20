import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import { trip } from "../src/data/trip";
import type { Trip } from "../src/data/trip";
import { wayfarerTheme } from "../src/theme";
import {
  DayLine,
  DayTable,
  IncludesList,
  KitFooter,
  PackingList,
  PostcardStrip,
} from "../src/components/shared";
import { DayCard } from "../src/components/day-card";

/**
 * OUTPUT 2 — The public trip page (Page root -> responsive web HTML,
 * no client-side JavaScript).
 *
 * The email's public twin. Where the email must survive Outlook, the
 * page gets the full postcard: a rust hero, every day as a typed
 * trip.DayCard, the five days and the price.
 */
export function TripPage({ trip: t = trip }: { trip?: Trip }) {
  return (
    <Page
      theme={wayfarerTheme}
      width={1100}
      title={`${t.name} — ${t.operator} · ${t.datesLabel}`}
      description={t.pitch}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#7c2d12",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#fff8ec",
            muted: "#f3ddb8",
            primary: "#f3ddb8",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#f3ddb8",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${t.operator} · ${t.route}`}
            </Text>
            <Heading
              level={1}
              style={{ fontSize: 46, mobile: { fontSize: 32 } }}
            >
              {t.name}
            </Heading>
            <Text style={{ fontSize: 17 }}>
              {t.datesLabel} · {t.length} · {t.groupSize} walkers
            </Text>
            <Text style={{ fontSize: 17 }}>{t.pitch}</Text>
            <DayLine trip={t} />
            <Row style={{ gap: 12 }}>
              <Button href="https://wayfarerwalks.example/trips/slow-road/book">
                Book your place
              </Button>
              <Button
                href="https://wayfarerwalks.example/trips/slow-road/itinerary"
                variant="secondary"
                style={{ color: "#33241a" }}
              >
                Read the itinerary
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 10 }}>
            <PostcardStrip days={t.days} cell={20} />
            <Text style={{ apply: ["quiet"], color: "#f3ddb8" }}>
              The postcard edge: one perforation per day of the walk —
              the same mark your email and itinerary carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <Heading level={2}>The five days</Heading>
        <DayTable trip={t} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          We walk {t.days.map((d) => d.distance).join(", ")} —{" "}
          {t.days.reduce((sum, d) => sum + Number(d.distance.split(" ")[0]), 0)}{" "}
          km in all. The group walks at the pace of the slowest walker;
          the luggage moves ahead each morning.
        </Text>
        <Heading level={2}>A day on the road</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {t.days.map((d) => (
            <DayCard
              key={d.day}
              day={`Day ${d.day}`}
              title={d.title}
              place={d.place}
              distance={`${d.distance} · ${d.walking}`}
              highlight={d.highlight}
            />
          ))}
        </Grid>
        <Heading level={2}>What your price covers</Heading>
        <IncludesList trip={t} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          {t.price}. Booked travellers receive a personal email with
          their rooming, dietary notes and reference.
        </Text>
        <Heading level={2}>Pack this</Heading>
        <PackingList trip={t} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Meeting point: {t.meetingPoint}. Walk leader: {t.leader} ·
          Questions: {t.contact}.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

TripPage.PreviewProps = { trip };
export default TripPage;
