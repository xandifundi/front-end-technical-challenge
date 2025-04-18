import { MultipleChoiceQuestion, MultipleChoiceQuestionResult } from "./types";

export type MarkMultipleChoiceQuestionProps = {
  question: MultipleChoiceQuestion;
  selectedOptionId: string | null;
};

export function markMultipleChoiceQuestion(
  props: MarkMultipleChoiceQuestionProps
): MultipleChoiceQuestionResult {
  const { question, selectedOptionId } = props;

  const isCorrect = question.correctOptionId === selectedOptionId;

  if (isCorrect) {
    return { kind: "Correct" };
  }

  return { kind: "Incorrect", selectedOptionId };
}
