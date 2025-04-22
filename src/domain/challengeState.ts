export type QuestionStateResult = "Correct" | "Incorrect";

export type QuestionState = {
  selectedOptionId: string | null;
  result: QuestionStateResult | null;
};
