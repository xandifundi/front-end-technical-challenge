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

export type MultipleChoiceQuestionState =
  | { kind: "NotAnswered" }
  | { kind: "Answered"; selectedOptionId: string }
  | { kind: "Correct" }
  | { kind: "Incorrect"; selectedOptionId: string };

export type ChallengeItemState = MultipleChoiceQuestionState;

export type State = {
  challenge: Challenge;
  itemStates: ChallengeItemState[];
  currentItemIndex: number;
};
