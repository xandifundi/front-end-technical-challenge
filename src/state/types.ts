import { MultipleChoiceQuestion, TextPage, Challenge } from "@/domain/types";

export type MultipleChoiceQuestionState =
  | { kind: "NotAnswered" }
  | { kind: "Answered"; selectedOptionId: string }
  | { kind: "Correct" }
  | { kind: "Incorrect"; selectedOptionId: string };

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
