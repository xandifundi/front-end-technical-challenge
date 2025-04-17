import { MultipleChoiceQuestion, MultipleChoiceQuestionResult } from "./types";

export type MarkMultipleChoiceQuestionProps = {
  question: MultipleChoiceQuestion;
  selectedOptionId: string;
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
