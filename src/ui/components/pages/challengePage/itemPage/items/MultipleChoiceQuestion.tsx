import React from "react";
import {
  MultipleChoiceQuestionStateNotMarked,
  MultipleChoiceQuestionStateMarked,
} from "@/domain/types";
import { ChallengeStateItem_MultipleChoiceQuestion } from "@/state/types";
import { Button } from "@/ui/components/common/Button";
import { Markdown } from "@/ui/components/common/Markdown";
import styles from "./MultipleChoiceQuestion.module.css";

export type MultipleChoiceQuestionProps = {
  item: ChallengeStateItem_MultipleChoiceQuestion;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

const optionLabels = "ABCD".split("");

export function MultipleChoiceQuestion(props: MultipleChoiceQuestionProps) {
  const { item, onOptionSelected, onCheckAnswer } = props;

  const { question, state } = item;

  switch (state.kind) {
    case "NotMarked": {
      return (
        <MultipleChoiceQuestionNotMarked
          question={question}
          state={state}
          onOptionSelected={onOptionSelected}
          onCheckAnswer={onCheckAnswer}
        />
      );
    }
    case "Marked": {
      return <MultipleChoiceQuestionMarked question={question} state={state} />;
    }
  }
}

type MultipleChoiceQuestionNotMarkedProps = {
  question: ChallengeStateItem_MultipleChoiceQuestion["question"];
  state: MultipleChoiceQuestionStateNotMarked;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

function MultipleChoiceQuestionNotMarked(
  props: MultipleChoiceQuestionNotMarkedProps
) {
  const { question, state, onOptionSelected, onCheckAnswer } = props;

  const canCheckAnswer = Boolean(state.selectedOptionId);

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
                checked={state.selectedOptionId === option.id}
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
  question: ChallengeStateItem_MultipleChoiceQuestion["question"];
  state: MultipleChoiceQuestionStateMarked;
};

function MultipleChoiceQuestionMarked(
  props: MultipleChoiceQuestionMarkedProps
) {
  const { question, state } = props;

  const selectedOptionId =
    state.result.kind === "Correct"
      ? question.correctOptionId
      : state.result.selectedOptionId;

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
        <MultipleChoiceQuestionResult state={state} />
      </div>

      <div>
        <Markdown>{question.explanation}</Markdown>
      </div>
    </div>
  );
}

function MultipleChoiceQuestionResult({
  state,
}: {
  state: MultipleChoiceQuestionStateMarked;
}) {
  switch (state.result.kind) {
    case "Correct": {
      return <div>✅ Correct</div>;
    }
    case "Incorrect": {
      return <div>❌ Incorrect</div>;
    }
  }
}
