export type MultipleChoiceQuestionStateNotMarked = {
  kind: "NotMarked";
  selectedOptionId: string | null;
};

export type MultipleChoiceQuestionResult =
  | { kind: "Correct"; selectedOptionId: string; marks: number }
  | { kind: "Incorrect"; selectedOptionId: string | null; marks: number };

export type MultipleChoiceQuestionStateMarked = {
  kind: "Marked";
  result: MultipleChoiceQuestionResult;
};

export type MultipleChoiceQuestionState =
  | MultipleChoiceQuestionStateNotMarked
  | MultipleChoiceQuestionStateMarked;

export type ChallengeSessionItem_MultipleChoiceQuestion = {
  kind: "MultipleChoiceQuestion";
  itemId: string;
  state: MultipleChoiceQuestionState;
};

export type ChallengeSessionItem_TextSnippet = {
  kind: "TextSnippet";
  itemId: string;
};

export type ChallengeSessionItem =
  | ChallengeSessionItem_MultipleChoiceQuestion
  | ChallengeSessionItem_TextSnippet;

export type ChallengeSession = {
  challengeId: string;
  items: ChallengeSessionItem[];
};
