import {
  MultipleChoiceQuestion,
  MultipleChoiceQuestionResult,
  TextSnippet,
  Challenge,
} from "@/domain/types";

export type MultipleChoiceQuestionState =
  | { kind: "NotMarked"; selectedOptionId: string | null }
  | { kind: "Marked"; result: MultipleChoiceQuestionResult };

export type MultipleChoiceQuestionItem = {
  kind: "MultipleChoiceQuestion";
  question: MultipleChoiceQuestion;
  state: MultipleChoiceQuestionState;
};

export type TextSnippetState = { kind: "NotViewed" } | { kind: "Viewed" };

export type TextSnippetItem = {
  kind: "TextSnippet";
  snippet: TextSnippet;
  state: TextSnippetState;
};

export type ChallengeItem = TextSnippetItem | MultipleChoiceQuestionItem;

export type ChallengePage =
  | { kind: "StartPage" }
  | { kind: "ResultsPage" }
  | { kind: "ItemPage"; itemIndex: number };

export type ChallengeState = {
  challenge: Challenge;
  items: ChallengeItem[];
  page: ChallengePage;
};
