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

export type MultipleChoiceQuestionAttempt = {
  kind: "MultipleChoiceQuestionAttempt";
  itemId: string;
  state: MultipleChoiceQuestionState;
};

export type TextSnippetAttempt = {
  kind: "TextSnippetAttempt";
  itemId: string;
};

export type ChallengeAttemptItem =
  | MultipleChoiceQuestionAttempt
  | TextSnippetAttempt;

export type ChallengeAttempt = {
  challengeId: string;
  items: ChallengeAttemptItem[];
};
