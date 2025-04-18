import { Challenge, TextSnippet, MultipleChoiceQuestion } from "@/domain/types";

const introduction: TextSnippet = {
  kind: "TextSnippet",
  id: "1",
  content: "This is a sample text page.",
};

const q1: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "2",
  prompt: "What is the capital of France?",
  options: [
    { id: "1", text: "Berlin" },
    { id: "2", text: "Madrid" },
    { id: "3", text: "Paris" },
    { id: "4", text: "Rome" },
  ],
  correctOptionId: "3",
  explanation: "The capital of France is Paris.",
};

const q2: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "3",
  prompt: "What is the largest planet in our solar system?",
  options: [
    { id: "1", text: "Earth" },
    { id: "2", text: "Jupiter" },
    { id: "3", text: "Mars" },
    { id: "4", text: "Saturn" },
  ],
  correctOptionId: "2",
  explanation: "The largest planet in our solar system is Jupiter.",
};

const q3: MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion",
  id: "4",
  prompt: "What is the chemical symbol for gold?",
  options: [
    { id: "1", text: "Au" },
    { id: "2", text: "Ag" },
    { id: "3", text: "Fe" },
    { id: "4", text: "Pb" },
  ],
  correctOptionId: "1",
  explanation: "The chemical symbol for gold is Au.",
};

export const challenge: Challenge = {
  id: "1",
  name: "Sample Challenge",
  description: "This is a sample challenge.",
  items: [introduction, q1, q2, q3],
};
