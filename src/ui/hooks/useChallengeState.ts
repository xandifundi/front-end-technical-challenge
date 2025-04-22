import React from "react";
import type { ChallengeState, ChallengeEvent } from "@/domain/types";
import * as LocalStorageAPI from "@/api/localStorageAPI";
import { makeInitialState } from "@/state/makeInitialState";

export function useChallengeState({
  challengeState,
}: {
  challengeState: ChallengeState;
}) {
  const [state, setState] = React.useState(challengeState);

  function handleEvent(event: ChallengeEvent) {
    console.log(event);

    switch (event.kind) {
      case "StartChallenge": {
        setState({
          ...state,
          page: { kind: "QuestionPage", itemIndex: 0 },
        });
        return;
      }

      case "RepeatChallenge": {
        setState(makeInitialState(state.challenge));
        return;
      }

      case "CloseChallenge": {
        setState({
          ...state,
          page: { kind: "StartPage" },
        });
        return;
      }

      case "FinishChallenge": {
        const marks = state.questionStates.reduce(
          (acc, questionState) =>
            questionState.result === "Correct" ? acc + 1 : acc,
          0
        );

        const totalMarks = state.challenge.questions.length;

        setState({
          ...state,
          page: { kind: "ResultsPage", marks, totalMarks },
        });

        LocalStorageAPI.clearChallengeState();

        return;
      }

      case "GoToNextItem": {
        if (state.page.kind !== "QuestionPage") {
          return;
        }
        const { itemIndex } = state.page;
        setState({
          ...state,
          page: { kind: "QuestionPage", itemIndex: itemIndex + 1 },
        });
        return;
      }

      case "GoToPreviousItem": {
        if (state.page.kind !== "QuestionPage") {
          return;
        }
        const { itemIndex } = state.page;
        setState({
          ...state,
          page: { kind: "QuestionPage", itemIndex: itemIndex - 1 },
        });
        return;
      }

      case "MultipleChoiceQuestionCheckAnswer": {
        if (state.page.kind !== "QuestionPage") {
          return;
        }
        const { challenge, page } = state;
        const newState: ChallengeState = {
          ...state,
          questionStates: state.questionStates.map((questionState, index) => {
            if (index === page.itemIndex) {
              const question = challenge.questions[index];
              const isCorrect =
                questionState.selectedOptionId === question.correctOptionId;
              return {
                ...questionState,
                result: isCorrect ? "Correct" : "Incorrect",
              };
            }
            return questionState;
          }),
        };
        setState(newState);
        return;
      }

      case "MultipleChoiceQuestionOptionSelected": {
        if (state.page.kind !== "QuestionPage") {
          return;
        }
        const { itemIndex } = state.page;
        const { selectedOptionId } = event;
        const newState: ChallengeState = {
          ...state,
          questionStates: state.questionStates.map((questionState, index) => {
            return index === itemIndex
              ? { ...questionState, selectedOptionId }
              : questionState;
          }),
        };
        setState(newState);
        return;
      }

      default: {
        event satisfies never;
      }
    }
  }

  return {
    state,
    handleEvent,
  };
}
