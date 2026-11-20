/**
 * The trip file — the kit's single source of truth.
 *
 * One trip record renders the traveller email, the public trip page,
 * the printed itinerary (PDF) and the daily social cards. Change
 * `trip` and every artefact agrees, because every artefact reads
 * this file.
 */

export interface Stop {
  /** "09:00" — the time the group is there. */
  time: string;
  /** "Praca do Comercio" — where the group stops. */
  name: string;
  /** One line: what happens there. */
  note: string;
}

export interface TripDay {
  /** 1..5 */
  day: number;
  date: string;
  /** "Arrival in Lisbon" */
  title: string;
  /** "Lisbon" */
  place: string;
  /** "6 km" — the day's walking distance. */
  distance: string;
  /** "4 hours" — walking time. */
  walking: string;
  /** One line for the page card and the day card. */
  highlight: string;
  stops: Stop[];
  /** "Breakfast at the guesthouse, dinner in Alfama" */
  meals: string;
  /** "Pensao Londres, Lisbon" */
  sleep: string;
}

export interface Traveller {
  firstName: string;
  /** "Single" or "Shared with Ana" */
  rooming: string;
  /** "Vegetarian" or "None" */
  dietary: string;
  ref: string;
}

export interface Trip {
  operator: string;
  name: string;
  /** "Lisbon to Porto, on foot" */
  route: string;
  /** "12-16 April 2027" — printed on every artefact. */
  datesLabel: string;
  /** "5 days, 4 nights" */
  length: string;
  groupSize: number;
  leader: string;
  meetingPoint: string;
  price: string;
  /** One-paragraph pitch used by the email and the page hero. */
  pitch: string;
  /** The leader's note, printed in the itinerary. */
  leadersNote: string;
  days: TripDay[];
  includes: string[];
  packing: string[];
  contact: string;
}

export const trip: Trip = {
  operator: "Wayfarer Walks",
  name: "The Slow Road",
  route: "Lisbon to Porto, on foot",
  datesLabel: "12-16 April 2027",
  length: "5 days, 4 nights",
  groupSize: 12,
  leader: "Marta Ferreira",
  meetingPoint: "Praca do Comercio, Lisbon — 9:00 am, Day 1",
  price: "$1,480 per person, twin share",
  pitch:
    "Five days on foot from Lisbon to Porto, along the old coastal road: whitewashed fishing villages, cork-oak hills, a castle town, and the Atlantic never far from your left shoulder. We walk 6 to 14 kilometres a day, never in a hurry, and we sleep where the walk ends — a guesthouse in Lisbon, a farmhouse above Obidos, a fisherman's inn in Nazare, and a townhouse in Porto. Twelve walkers, one leader, no coach, no timetable except the tide.",
  leadersNote:
    "Walk at the pace of the slowest walker and you will see the most. The road gives you something every day — a bakery that opens at dawn, a chapel nobody visits, a fisherman mending nets who will tell you where the sardines are. Bring shoes you have already broken in. Leave room in your bag for a bottle of vinho verde. — Marta Ferreira, walk leader",
  days: [
    {
      day: 1,
      date: "12 April 2027",
      title: "Arrival in Lisbon",
      place: "Lisbon",
      distance: "6 km",
      walking: "3 hours",
      highlight:
        "A gentle first afternoon: the old town on foot, sunset from the castle hill.",
      stops: [
        {
          time: "09:00",
          name: "Praca do Comercio",
          note: "Meet the group under the arch; introductions and the first stamp in your postcard.",
        },
        {
          time: "10:30",
          name: "Alfama lanes",
          note: "A slow climb through the oldest quarter, laundry lines and tiled facades.",
        },
        {
          time: "13:00",
          name: "Lunch in Graca",
          note: "Bifana and green wine at a tasca the guidebooks missed.",
        },
        {
          time: "17:30",
          name: "Sao Jorge castle hill",
          note: "Sunset over the rooftops; the group photo, then dinner in Alfama.",
        },
      ],
      meals: "Lunch and dinner included",
      sleep: "Pensao Londres, Lisbon",
    },
    {
      day: 2,
      date: "13 April 2027",
      title: "Sintra hills",
      place: "Sintra",
      distance: "12 km",
      walking: "5 hours",
      highlight:
        "Palaces in the mist, a forest path, and the moorish castle on the ridge.",
      stops: [
        {
          time: "08:30",
          name: "Train to Sintra",
          note: "Forty minutes west; coffee and pasteis on the platform.",
        },
        {
          time: "10:00",
          name: "Moorish castle",
          note: "The ridge walk along the old walls, Sintra spread below.",
        },
        {
          time: "13:00",
          name: "Picnic in the forest",
          note: "Bread, cheese and oranges under the eucalyptus.",
        },
        {
          time: "16:00",
          name: "Pena Palace gardens",
          note: "The palace in the clouds, then the train back to Lisbon.",
        },
      ],
      meals: "Breakfast and picnic lunch included",
      sleep: "Pensao Londres, Lisbon",
    },
    {
      day: 3,
      date: "14 April 2027",
      title: "Obidos, the castle town",
      place: "Obidos",
      distance: "9 km",
      walking: "4 hours",
      highlight:
        "A walled town you can walk all the way around, and ginjinha in a chocolate cup.",
      stops: [
        {
          time: "08:00",
          name: "Coach to Obidos",
          note: "One hour north; the only coach ride of the trip.",
        },
        {
          time: "10:00",
          name: "The wall walk",
          note: "A full circuit of the ramparts, whitewashed houses below.",
        },
        {
          time: "13:00",
          name: "Lunch in the square",
          note: "Grilled sardines, then ginjinha served in a chocolate cup.",
        },
        {
          time: "16:30",
          name: "Farmhouse above town",
          note: "Check in, swim if the sun holds, dinner from the farm garden.",
        },
      ],
      meals: "Breakfast, lunch and dinner included",
      sleep: "Quinta da Serra, Obidos",
    },
    {
      day: 4,
      date: "15 April 2027",
      title: "The Nazare coast",
      place: "Nazare",
      distance: "14 km",
      walking: "6 hours",
      highlight:
        "Cliff paths and fishing boats, ending where the big waves break.",
      stops: [
        {
          time: "08:00",
          name: "Coastal path north",
          note: "Cliff-top walking with the Atlantic on your left all morning.",
        },
        {
          time: "11:30",
          name: "Sao Martinho bay",
          note: "A sheltered beach for a swim and a rest.",
        },
        {
          time: "14:00",
          name: "Lunch with the fishermen",
          note: "Cataplana at the harbour, cooked by the crew that caught it.",
        },
        {
          time: "17:00",
          name: "Nazare lighthouse",
          note: "The big-wave point; sunset, then dinner in the old town.",
        },
      ],
      meals: "Breakfast and lunch included",
      sleep: "Pousada do Mar, Nazare",
    },
    {
      day: 5,
      date: "16 April 2027",
      title: "Arrival in Porto",
      place: "Porto",
      distance: "8 km",
      walking: "4 hours",
      highlight:
        "The Douro at last: across the bridge on foot, port wine at the end of the road.",
      stops: [
        {
          time: "09:00",
          name: "Train to Porto",
          note: "Two hours north along the coast; the last postcard is written on board.",
        },
        {
          time: "12:00",
          name: "Ribeira waterfront",
          note: "Lunch by the river, rabelo boats at anchor.",
        },
        {
          time: "15:00",
          name: "Dom Luis bridge",
          note: "Cross on foot, upper deck, the whole city below.",
        },
        {
          time: "17:30",
          name: "Port lodge farewell",
          note: "A tasting at the lodge, the group photo, and the road officially walked.",
        },
      ],
      meals: "Breakfast and farewell tasting included",
      sleep: "Your own onward journey",
    },
  ],
  includes: [
    "Four nights in guesthouses and farm stays",
    "All breakfasts, four lunches, three dinners",
    "Train Lisbon-Sintra and coach to Obidos",
    "Marta Ferreira, your walk leader, every step",
    "Luggage moved ahead each morning",
  ],
  packing: [
    "Broken-in walking shoes, not new ones",
    "A day pack, 20 litres, with a rain cover",
    "Water bottle, 1 litre, refillable",
    "Sun hat and sunscreen, April sun is honest",
    "A light rain jacket, the Atlantic changes its mind",
    "One smart outfit for the Porto farewell",
    "A notebook, for the postcards you will write",
    "Chargers and a small power bank",
  ],
  contact: "walk@wayfarerwalks.example",
};

export const sampleTraveller: Traveller = {
  firstName: "Ana",
  rooming: "Shared with Beatriz",
  dietary: "Vegetarian",
  ref: "WF-201",
};

const FIRST = [
  "Ana", "Beatriz", "Carlos", "Diana", "Elena", "Felix",
  "Greta", "Henrik", "Ines", "Jonas", "Klara", "Lucas",
];
const ROOMING = [
  "Shared with Beatriz", "Shared with Ana", "Single", "Single",
  "Shared with Felix", "Shared with Elena", "Single", "Shared with Klara",
  "Shared with Jonas", "Shared with Ines", "Shared with Henrik", "Single",
];
const DIETARY = [
  "Vegetarian", "None", "None", "Gluten-free", "None", "Vegetarian",
  "None", "None", "Vegan", "None", "None", "Dairy-free",
];

/**
 * Deterministic traveller generation — no clock, no randomness.
 * Regenerating the batch after fixing one record reproduces every other
 * record byte-for-byte, which is what makes a corrections pass honest.
 */
export function makeTravellers(count: number): Traveller[] {
  const out: Traveller[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      firstName: FIRST[i % FIRST.length],
      rooming: ROOMING[i % ROOMING.length],
      dietary: DIETARY[i % DIETARY.length],
      ref: `WF-${201 + i}`,
    });
  }
  return out;
}
