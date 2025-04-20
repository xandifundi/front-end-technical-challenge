export type MultipleChoiceQuestionOption = {
  id: string;
  text: string;
};

export type MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion";
  id: string;
  prompt: string;
  options: MultipleChoiceQuestionOption[];
  correctOptionId: string;
  explanation: string;
  marks: number;
};

export type TextSnippet = {
  kind: "TextSnippet";
  id: string;
  content: string;
};

export type ChallengeItem = TextSnippet | MultipleChoiceQuestion;

export type Challenge = {
  id: string;
  name: string;
  description: string;
  items: ChallengeItem[];
};
