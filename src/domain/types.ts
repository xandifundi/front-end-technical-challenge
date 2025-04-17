export type MultipleChoiceQuestionOption = {
  id: string;
  text: string;
};

export type MultipleChoiceQuestion = {
  id: string;
  question: string;
  options: MultipleChoiceQuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type TextPage = {
  id: string;
  content: string;
};

export type ChallengeItem = TextPage | MultipleChoiceQuestion;

export type Challenge = {
  id: string;
  title: string;
  description: string;
  items: ChallengeItem[];
};
