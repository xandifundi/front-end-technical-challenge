import React from "react";
import type { Challenge } from "@/domain/types";

export type ChallengePage =
  | { kind: "StartPage" }
  | { kind: "QuestionPage"; itemIndex: number }
  | { kind: "ResultsPage"; totalMarks: number; marks: number };

export type QuestionState = {
  selectedOptionId: string | null;
  result: "Correct" | "Incorrect" | null;
};

export type ChallengeState = {
  challenge: Challenge;
  page: ChallengePage;
  questionStates: QuestionState[];
};

export type ChallengeEvent =
  | { kind: "StartChallenge" }
  | { kind: "RepeatChallenge" }
  | { kind: "GoToNextItem" }
  | { kind: "GoToPreviousItem" }
  | { kind: "FinishChallenge" }
  | { kind: "CloseChallenge" }
  | { kind: "MultipleChoiceQuestionOptionSelected"; selectedOptionId: string }
  | { kind: "MultipleChoiceQuestionCheckAnswer" };

function makeInitialState(challenge: Challenge): ChallengeState {
  return {
    challenge,
    page: { kind: "StartPage" },
    questionStates: challenge.questions.map(() => {
      return { selectedOptionId: null, result: null };
    }),
  };
}

export function useChallenge({ challenge }: { challenge: Challenge }) {
  const [state, setState] = React.useState(() => makeInitialState(challenge));

  function handleEvent(event: ChallengeEvent) {
    switch (event.kind) {
      case "StartChallenge": {
        setState({
          ...state,
          page: { kind: "QuestionPage", itemIndex: 0 },
        });
        return;
      }

      case "RepeatChallenge": {
        setState(makeInitialState(challenge));
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
