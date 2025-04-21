import { MultipleChoiceQuestionResult } from "@/domain/types";

export type ResetChallengeAction = {
  kind: "ResetChallege";
};

export type GoToFirstItemAction = {
  kind: "GoToFirstItem";
};

export type GoToResultsPageAction = {
  kind: "GoToResultsPage";
  marks: number;
  totalMarks: number;
};

export type GoToNextItemAction = {
  kind: "GoToNextItem";
};

export type GoToPreviousItemAction = {
  kind: "GoToPreviousItem";
};

export type SetMultipleChoiceQuestionSelectedOptionAction = {
  kind: "SetMultipleChoiceQuestionSelectedOption";
  itemIndex: number;
  selectedOptionId: string;
};

export type SetMultipleChoiceQuestionResultAction = {
  kind: "SetMultipleChoiceQuestionResult";
  itemIndex: number;
  result: MultipleChoiceQuestionResult;
};

export type ChallengeAction =
  | ResetChallengeAction
  | GoToFirstItemAction
  | GoToNextItemAction
  | GoToPreviousItemAction
  | GoToResultsPageAction
  | SetMultipleChoiceQuestionSelectedOptionAction
  | SetMultipleChoiceQuestionResultAction;
