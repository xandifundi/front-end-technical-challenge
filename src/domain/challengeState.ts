import type { Challenge } from "./challenge";

export type ChallengePage =
  | { kind: "StartPage" }
  | { kind: "QuestionPage"; itemIndex: number }
  | { kind: "ResultsPage"; totalMarks: number; marks: number };

export type QuestionStateResult = "Correct" | "Incorrect";

export type QuestionState = {
  selectedOptionId: string | null;
  result: QuestionStateResult | null;
};

export type ChallengeState = {
  challenge: Challenge;
  page: ChallengePage;
  questionStates: QuestionState[];
};

export type ChallengeEvent =
  | { kind: "StartChallenge" }
  | { kind: "RepeatChallenge" }
  | { kind: "GoToNextItem" }
  | { kind: "GoToPreviousItem" }
  | { kind: "FinishChallenge" }
  | { kind: "CloseChallenge" }
  | { kind: "MultipleChoiceQuestionOptionSelected"; selectedOptionId: string }
  | { kind: "MultipleChoiceQuestionCheckAnswer" };
