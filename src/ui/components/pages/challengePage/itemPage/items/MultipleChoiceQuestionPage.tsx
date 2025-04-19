import React from "react";
import {
  MultipleChoiceQuestionItem,
  MultipleChoiceQuestionStateNotMarked,
  MultipleChoiceQuestionStateMarked,
} from "@/state/types";
import { Button } from "@/ui/components/common/Button";
import { HtmlContent } from "@/ui/components/common/HtmlContent";
import { ChallengeItemLayout } from "../common/ChallengeItemLayout";
import { ChallengeItemFooter } from "../common/ChallengeItemFooter";
import styles from "./MultipleChoiceQuestionPage.module.css";

export type MultipleChoiceQuestionPageProps = {
  item: MultipleChoiceQuestionItem;
  onBack: () => void;
  onNext: () => void;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

export function MultipleChoiceQuestionPage(
  props: MultipleChoiceQuestionPageProps
) {
  const { item, onOptionSelected, onCheckAnswer, onBack, onNext } = props;

  const { question, state } = item;

  const footer = <ChallengeItemFooter onBack={onBack} onNext={onNext} />;

  switch (state.kind) {
    case "NotMarked": {
      return (
        <ChallengeItemLayout
          main={
            <MultipleChoiceQuestionNotMarked
              question={question}
              state={state}
              onOptionSelected={onOptionSelected}
              onCheckAnswer={onCheckAnswer}
            />
          }
          footer={footer}
        />
      );
    }
    case "Marked": {
      return (
        <ChallengeItemLayout
          main={
            <MultipleChoiceQuestionMarked question={question} state={state} />
          }
          footer={footer}
        />
      );
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
