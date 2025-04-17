export type MultipleChoiceQuestionOption = {
  id: string;
  text: string;
};

export type MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion";
  id: string;
  question: string;
  options: MultipleChoiceQuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type MultipleChoiceQuestionResult =
  | { kind: "Correct" }
  | { kind: "Incorrect"; selectedOptionId: string };

export type TextPage = {
  kind: "TextPage";
  id: string;
  content: string;
};

export type ChallengeItem = TextPage | MultipleChoiceQuestion;

export type Challenge = {
  id: string;
  name: string;
  description: string;
  items: ChallengeItem[];
};
