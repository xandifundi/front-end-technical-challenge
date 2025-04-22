import type { Quiz } from "./quiz";

export type QuizPage =
  | { kind: "StartPage" }
  | { kind: "QuestionPage"; itemIndex: number }
  | { kind: "ResultsPage"; totalMarks: number; marks: number };

export type QuestionStateResult = "Correct" | "Incorrect";

export type QuestionState = {
  selectedOptionId: string | null;
  result: QuestionStateResult | null;
};

export type QuizState = {
  quiz: Quiz;
  page: QuizPage;
  questionStates: QuestionState[];
};
