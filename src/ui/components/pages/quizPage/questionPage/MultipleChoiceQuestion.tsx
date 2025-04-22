import React from "react";
import { Question, QuestionState, QuestionStateResult } from "@/types";
import { Button } from "@/ui/components/common/Button";
import { Markdown } from "@/ui/components/common/Markdown";
import styles from "./MultipleChoiceQuestion.module.css";

export type MultipleChoiceQuestionProps = {
  question: Question;
  questionState: QuestionState;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

const optionLabels = "ABCD".split("");

export function MultipleChoiceQuestion(props: MultipleChoiceQuestionProps) {
  const { question, questionState, onOptionSelected, onCheckAnswer } = props;

  if (questionState.result) {
    return (
      <MultipleChoiceQuestionMarked
        question={question}
        selectedOptionId={questionState.selectedOptionId}
        result={questionState.result}
      />
    );
  }

  return (
    <MultipleChoiceQuestionNotMarked
      question={question}
      selectedOptionId={questionState.selectedOptionId}
      onOptionSelected={onOptionSelected}
      onCheckAnswer={onCheckAnswer}
    />
  );
}

type MultipleChoiceQuestionNotMarkedProps = {
  question: Question;
  selectedOptionId: string | null;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

function MultipleChoiceQuestionNotMarked(
  props: MultipleChoiceQuestionNotMarkedProps
) {
  const { question, selectedOptionId, onOptionSelected, onCheckAnswer } = props;

  const canCheckAnswer = Boolean(selectedOptionId);

  return (
    <div>
      <div className={styles.prompt}>
        <Markdown>{question.prompt}</Markdown>
      </div>

      <div className={styles.options}>
        {question.options.map((option, index) => {
          const label = optionLabels[index];
          return (
            <div key={option.id} className={styles.option}>
              <span className={styles.optionLabel}>{label}</span>
              <input
                type="radio"
                className={styles.optionInput}
                checked={selectedOptionId === option.id}
                onChange={() => {
                  onOptionSelected(option.id);
                }}
              />
              <span>{option.text}</span>
            </div>
          );
        })}
      </div>

      <div>
        <Button disabled={!canCheckAnswer} onClick={onCheckAnswer}>
          Check Answer
        </Button>
      </div>
    </div>
  );
}

type MultipleChoiceQuestionMarkedProps = {
  question: Question;
  selectedOptionId: string | null;
  result: QuestionStateResult;
};

function MultipleChoiceQuestionMarked(
  props: MultipleChoiceQuestionMarkedProps
) {
  const { question, selectedOptionId, result } = props;

  return (
    <div>
      <div className={styles.prompt}>
        <Markdown>{question.prompt}</Markdown>
      </div>

      <div className={styles.options}>
        {question.options.map((option, index) => {
          const label = optionLabels[index];
          return (
            <div key={option.id} className={styles.option}>
              <span className={styles.optionLabel}>{label}</span>
              <input
                type="radio"
                className={styles.optionInput}
                checked={selectedOptionId === option.id}
                disabled
              />
              <span>{option.text}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.result}>
        <MultipleChoiceQuestionResult result={result} />
      </div>

      <div>
        <Markdown>{question.explanation}</Markdown>
      </div>
    </div>
  );
}

function MultipleChoiceQuestionResult({
  result,
}: {
  result: QuestionStateResult;
}) {
  switch (result) {
    case "Correct": {
      return <div>✅ Correct</div>;
    }
    case "Incorrect": {
      return <div>❌ Incorrect</div>;
    }
  }
}
