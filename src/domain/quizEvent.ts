export type QuizEvent =
  | { kind: "StartQuiz" }
  | { kind: "RepeatQuiz" }
  | { kind: "GoToNextItem" }
  | { kind: "GoToPreviousItem" }
  | { kind: "FinishQuiz" }
  | { kind: "CloseQuiz" }
  | { kind: "MultipleChoiceQuestionOptionSelected"; selectedOptionId: string }
  | { kind: "MultipleChoiceQuestionCheckAnswer" };
