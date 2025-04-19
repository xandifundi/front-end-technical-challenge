import React from "react";
import {
  MultipleChoiceQuestionItem,
  MultipleChoiceQuestionStateNotMarked,
  MultipleChoiceQuestionStateMarked,
} from "@/state/types";
import { Button } from "@/ui/components/common/Button";
import { HtmlContent } from "@/ui/components/common/HtmlContent";
import styles from "./MultipleChoiceQuestionPage.module.css";

export type MultipleChoiceQuestionProps = {
  item: MultipleChoiceQuestionItem;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

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
  question: MultipleChoiceQuestionItem["question"];
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
        <HtmlContent content={question.prompt} />
      </div>

      <div className={styles.options}>
        {question.options.map((option) => (
          <div key={option.id} className={styles.option}>
            <input
              type="radio"
              id={option.id}
              className={styles.optionInput}
              checked={state.selectedOptionId === option.id}
              onChange={() => {
                onOptionSelected(option.id);
              }}
            />
            <label htmlFor={option.id}>{option.text}</label>
          </div>
        ))}
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
  question: MultipleChoiceQuestionItem["question"];
  state: MultipleChoiceQuestionStateMarked;
};

function MultipleChoiceQuestionMarked(
  props: MultipleChoiceQuestionMarkedProps
) {
  const { question, state } = props;

  return (
    <div>
      <div>
        <HtmlContent content={question.prompt} />
      </div>

      <div>
        {question.options.map((option) => (
          <div key={option.id}>{option.text}</div>
        ))}
      </div>

      <div>{state.result.kind}</div>

      <HtmlContent content={question.explanation} />
    </div>
  );
}
