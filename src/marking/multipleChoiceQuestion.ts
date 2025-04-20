import {
  MultipleChoiceQuestion,
  MultipleChoiceQuestionResult,
} from "@/domain/types";

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
    return { kind: "Correct", selectedOptionId, marks: 1 };
  }

  return { kind: "Incorrect", selectedOptionId, marks: 0 };
}
