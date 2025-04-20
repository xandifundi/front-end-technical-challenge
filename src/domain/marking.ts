export type MultipleChoiceQuestionResult =
  | { kind: "Correct"; selectedOptionId: string; marks: number }
  | { kind: "Incorrect"; selectedOptionId: string | null; marks: number };
