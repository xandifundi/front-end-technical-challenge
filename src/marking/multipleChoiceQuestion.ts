import { Question, QuestionStateResult } from "@/domain/types";

export type MarkMultipleChoiceQuestionProps = {
  question: Question;
  selectedOptionId: string | null;
};

export function markMultipleChoiceQuestion(
  props: MarkMultipleChoiceQuestionProps
): QuestionStateResult {
  const { question, selectedOptionId } = props;
  return question.correctOptionId === selectedOptionId
    ? "Correct"
    : "Incorrect";
}
