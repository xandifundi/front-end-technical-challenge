import { MultipleChoiceQuestionResult } from "./marking";

export type MultipleChoiceQuestionAttempt = {
  kind: "MultipleChoiceQuestionAttempt";
  itemId: string;
  result: MultipleChoiceQuestionResult;
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
