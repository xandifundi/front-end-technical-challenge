import React from "react";
import {
  MultipleChoiceQuestionItem,
  MultipleChoiceQuestionStateNotMarked,
  MultipleChoiceQuestionStateMarked,
} from "@/state/types";
import { ChallengeItemLayout } from "../common/ChallengeItemLayout";
import { ChallengeItemFooter } from "../common/ChallengeItemFooter";

export type MultipleChoiceQuestionPageProps = {
  item: MultipleChoiceQuestionItem;
  onPrevious: () => void;
  onNext: () => void;
  onOptionSelected: (optionId: string) => void;
  onCheckAnswer: () => void;
};

export function MultipleChoiceQuestionPage(
  props: MultipleChoiceQuestionPageProps
) {
  const { item, onOptionSelected, onCheckAnswer, onPrevious, onNext } = props;
  const { question, state } = item;

  const footer = (
    <ChallengeItemFooter onPrevious={onPrevious} onNext={onNext} />
  );

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

  return (
    <div>
      <div>{question.prompt}</div>
      <div>
        {question.options.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id}
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
        <button onClick={onCheckAnswer}>Check Answer</button>
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
      <div>{question.prompt}</div>
      <div>
        {question.options.map((option) => (
          <div key={option.id}>{option.text}</div>
        ))}
      </div>
      <div>{state.result.kind}</div>
    </div>
  );
}
