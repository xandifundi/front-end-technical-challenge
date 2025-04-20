import {
  MultipleChoiceQuestion,
  MultipleChoiceQuestionResult,
  TextSnippet,
  Challenge,
} from "@/domain/types";

export type MultipleChoiceQuestionStateNotMarked = {
  kind: "NotMarked";
  selectedOptionId: string | null;
};

export type MultipleChoiceQuestionStateMarked = {
  kind: "Marked";
  result: MultipleChoiceQuestionResult;
};

export type MultipleChoiceQuestionState =
  | MultipleChoiceQuestionStateNotMarked
  | MultipleChoiceQuestionStateMarked;

export type MultipleChoiceQuestionItem = {
  kind: "MultipleChoiceQuestion";
  question: MultipleChoiceQuestion;
  state: MultipleChoiceQuestionState;
};

export type TextSnippetItem = {
  kind: "TextSnippet";
  snippet: TextSnippet;
};

export type ChallengeItem = TextSnippetItem | MultipleChoiceQuestionItem;

export type ChallengePage_StartPage = { kind: "StartPage" };

export type ChallengePage_ResultsPage = {
  kind: "ResultsPage";
  totalMarks: number;
  marks: number;
};

export type ChallengePage_ItemPage = { kind: "ItemPage"; itemIndex: number };

export type ChallengePage =
  | ChallengePage_StartPage
  | ChallengePage_ResultsPage
  | ChallengePage_ItemPage;

export type ChallengeState = {
  challenge: Challenge;
  items: ChallengeItem[];
  page: ChallengePage;
};
