import React from "react";
import { MultipleChoiceQuestionItem } from "@/state/types";
import pageStyles from "@/ui/styles/page.module.css";

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

  switch (state.kind) {
    case "NotMarked": {
      return (
        <div className={pageStyles.page}>
          <main>
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
          </main>
          <footer>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
          </footer>
        </div>
      );
    }
    case "Marked": {
      return (
        <div className={pageStyles.page}>
          <main>
            <div>{question.prompt}</div>
            <div>
              {question.options.map((option) => (
                <div key={option.id}>{option.text}</div>
              ))}
            </div>
            <div>{state.result.kind}</div>
          </main>
          <footer>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
          </footer>
        </div>
      );
    }
  }
}
