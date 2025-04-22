import { Quiz, Question } from "@/domain/types";

const q1: Question = {
  id: "a78ce4af",
  prompt: "What contains over 99% of the total mass of the solar system?",
  options: [
    { id: "1", text: "Jupiter" },
    { id: "2", text: "The Kuiper Belt" },
    { id: "3", text: "The Sun" },
    { id: "4", text: "The Asteroid Belt" },
  ],
  correctOptionId: "3",
  explanation:
    "The Sun holds over 99% of the solar system’s mass, making it the dominant gravitational force.",
};

const q2: Question = {
  id: "f349e135",
  prompt: "Where is the Asteroid Belt located?",
  options: [
    { id: "1", text: "Between Earth and Mars" },
    { id: "2", text: "Beyond Neptune" },
    { id: "3", text: "Between Mars and Jupiter" },
    { id: "4", text: "Inside the Moon’s orbit" },
  ],
  correctOptionId: "3",
  explanation:
    "The Asteroid Belt lies between Mars and Jupiter and contains rocky debris and small bodies.",
};

const q3: Question = {
  id: "f03dcf42",
  prompt: `Why is Europa, one of Jupiter’s moons, scientifically interesting?`,
  options: [
    { id: "1", text: "It has an active volcano" },
    { id: "2", text: "It has a dense atmosphere" },
    { id: "3", text: "It may have a subsurface ocean" },
    { id: "4", text: "It reflects radio signals" },
  ],
  correctOptionId: "3",
  explanation: `Europa is believed to have a subsurface ocean beneath its icy crust, which could potentially harbor life.`,
};

export const sampleQuiz: Quiz = {
  id: "c8a06163",
  name: "The Solar System",
  description: `
The solar system consists of the Sun and everything bound to it by gravity. This includes the eight major planets, their moons, dwarf planets, comets, and asteroids.

The Sun contains over 99% of the solar system’s total mass and is the primary source of light and energy.

Between Mars and Jupiter lies the Asteroid Belt, a region filled with rocky debris.

Far beyond Neptune, the Kuiper Belt hosts icy bodies and dwarf planets like Pluto.

Even further out, the hypothesized Oort Cloud is thought to be a spherical shell of icy objects that may be the source of long-period comets.

Moons are natural satellites that orbit planets; some, like Jupiter’s moon Europa, are of particular interest due to the possibility of subsurface oceans.
`,
  questions: [q1, q2, q3],
};
