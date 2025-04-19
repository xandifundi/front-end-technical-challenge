import { Challenge, TextSnippet, MultipleChoiceQuestion } from "@/domain/types";

const introduction: TextSnippet = {
  kind: "TextSnippet",
  id: "1",
  content: `
The solar system consists of the Sun and everything bound to it by gravity.

This includes the eight major planets, their moons, dwarf planets, comets, and asteroids.

The Sun contains over 99% of the solar system’s total mass and is the primary source of light and energy.

Between Mars and Jupiter lies the Asteroid Belt, a region filled with rocky debris.

Far beyond Neptune, the Kuiper Belt hosts icy bodies and dwarf planets like Pluto.

Even further out, the hypothesized Oort Cloud is thought to be a spherical shell of icy objects that may be the source of long-period comets.

Moons are natural satellites that orbit planets; some, like Jupiter’s moon Europa, are of particular interest due to the possibility of subsurface oceans.
`,
};

const q1: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "a78ce4af",
  marks: 1,
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

const q2: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "f349e135",
  marks: 1,
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

const q3: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "f03dcf42",
  marks: 1,
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

export const challenge: Challenge = {
  id: "c8a06163",
  name: "The Solar System",
  description:
    "The solar system is a vast and fascinating region of space that includes our Sun and all the celestial bodies that orbit it, such as planets, moons, asteroids, and comets. Understanding the solar system helps us gain insights into the formation of planets, the conditions for life, and the dynamics of space beyond Earth.",
  items: [introduction, q1, q2, q3],
};
