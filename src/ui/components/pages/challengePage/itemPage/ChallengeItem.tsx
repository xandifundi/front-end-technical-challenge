import React from "react";
import type { Question, QuestionState } from "@/domain/types";
import type { ChallengeEvent } from "@/ui/hooks/useChallenge";
import { MultipleChoiceQuestion } from "./items/MultipleChoiceQuestion";

export type ChallengeItemProps = {
  question: Question;
  questionState: QuestionState;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItem(props: ChallengeItemProps): React.JSX.Element {
  const { question, questionState, onEvent } = props;

  return (
    <MultipleChoiceQuestion
      question={question}
      questionState={questionState}
      onOptionSelected={(selectedOptionId) => {
        onEvent({
          kind: "MultipleChoiceQuestionOptionSelected",
          selectedOptionId,
        });
      }}
      onCheckAnswer={() => {
        onEvent({
          kind: "MultipleChoiceQuestionCheckAnswer",
        });
      }}
    />
  );
}
