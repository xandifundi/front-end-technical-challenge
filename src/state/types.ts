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

export type ChallengeItemState = TextPageState | MultipleChoiceQuestionState;

export type State = {
  challenge: Challenge;
  itemStates: ChallengeItemState[];
  currentItemIndex: number;
};
