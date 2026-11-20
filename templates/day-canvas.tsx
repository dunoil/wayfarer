import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
} from "@hyper-elements/react";
import { trip } from "../src/data/trip";
import type { Trip, TripDay } from "../src/data/trip";
import { wayfarerTheme } from "../src/theme";
import { PostcardStrip } from "../src/components/shared";

/**
 * OUTPUT 4 — The day card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square social card rendered on the server with renderImage(). The
 * batch makes one card per day (5 cards), each led by that day in
 * poster type; this default export is the trip cover card. Fonts are
 * passed in as bytes by the scripts; nothing is fetched. The theme's
 * canvas format forces Inter here — satori only has the Inter bytes
 * we give it.
 */
export function TripCanvas({
  trip: t = trip,
  day,
}: {
  trip?: Trip;
  day?: TripDay;
}) {
  const headline = day ? day.title : `${t.name} — ${t.route}`;
  const subline = day
    ? `Day ${day.day} · ${day.date} · ${day.place} · ${day.distance}`
    : `${t.datesLabel} · ${t.length} · ${t.groupSize} walkers · ${t.leader}`;
  return (
    <Canvas
      theme={wayfarerTheme}
      width={1080}
      height={1080}
      title={`${t.operator} — ${t.name} — ${headline}`}
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#7c2d12",
      }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <PostcardStrip days={t.days} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text
            style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2, color: "#fff8ec" }}
          >
            {t.operator.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, color: "#f3ddb8" }}>
            {t.name} · {t.datesLabel}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 24 }}>
        <Column style={{ backgroundColor: "#c2410c", height: 18, borderRadius: 4 }} />
        <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#f3ddb8" }}>
          {day ? `Day ${day.day} of ${t.days.length}` : t.route}
        </Text>
        <Heading
          level={1}
          style={{
            fontSize: day ? 96 : 72,
            lineHeight: 1.1,
            color: "#fff8ec",
          }}
        >
          {headline}
        </Heading>
        <Text style={{ fontSize: 28, color: "#fff8ec" }}>
          {day ? day.highlight : t.pitch}
        </Text>
        {day ? (
          <Text style={{ fontSize: 24, color: "#f3ddb8" }}>
            {day.stops.map((s) => s.name).join(" · ")}
          </Text>
        ) : null}
      </Column>

      <Column style={{ gap: 14 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#f3ddb8" }}>
          {day
            ? `${day.distance} · ${day.walking} · ${day.meals}`
            : `${t.days.length} days · ${t.days.reduce((sum, d) => sum + Number(d.distance.split(" ")[0]), 0)} km on foot · ${t.price}`}
        </Text>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#f3ddb8" }}>
          {t.days
            .map((d) => `Day ${d.day} ${d.date.replace(" 2027", "")} · ${d.place}`)
            .join("  |  ")}
        </Text>
        <Text style={{ fontSize: 20, color: "#f3ddb8" }}>
          {t.operator} · {t.leader} · {t.contact}
        </Text>
      </Column>
    </Canvas>
  );
}

TripCanvas.PreviewProps = { trip };
export default TripCanvas;
