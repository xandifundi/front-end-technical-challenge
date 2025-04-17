import {
  MultipleChoiceQuestion,
  MultipleChoiceQuestionResult,
  TextPage,
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

export type TextPageState = { kind: "NotViewed" } | { kind: "Viewed" };

export type TextPageItem = {
  kind: "TextPage";
  page: TextPage;
  state: TextPageState;
};

export type ChallengeItem = TextPageItem | MultipleChoiceQuestionItem;

export type ChallengePage =
  | { kind: "StartPage" }
  | { kind: "ResultsPage" }
  | { kind: "ItemPage"; itemIndex: number };

export type ChallengeState = {
  challenge: Challenge;
  items: ChallengeItem[];
  page: ChallengePage;
};
