export type QuizEvent =
  | { kind: "StartQuiz" }
  | { kind: "RepeatQuiz" }
  | { kind: "RestartQuiz" }
  | { kind: "GoToNextQuestion" }
  | { kind: "GoToPreviousQuestion" }
  | { kind: "FinishQuiz" }
  | { kind: "CloseQuiz" }
  | { kind: "MultipleChoiceQuestionOptionSelected"; selectedOptionId: string }
  | { kind: "MultipleChoiceQuestionCheckAnswer" };
