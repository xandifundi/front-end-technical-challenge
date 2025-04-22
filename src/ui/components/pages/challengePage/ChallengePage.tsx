import React from "react";
import type { ChallengeState } from "@/domain/types";
import { saveChallengeState } from "@/api/localStorageAPI";
import { useChallengeState } from "@/ui/hooks/useChallengeState";
import { ChallengeStartPage } from "./startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./resultsPage/ChallengeResultsPage";
import { ChallengeQuestionPage } from "./questionPage/ChallengeQuestionPage";

export type ChallengePageProps = {
  challengeState: ChallengeState;
};

export function ChallengePage(props: ChallengePageProps) {
  const { challengeState } = props;

  const { state, handleEvent } = useChallengeState({ challengeState });

  // Save the state every second
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      saveChallengeState(state);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [state]);

  switch (state.page.kind) {
    case "StartPage": {
      return (
        <ChallengeStartPage
          challenge={challengeState.challenge}
          onStart={() => {
            handleEvent({ kind: "StartChallenge" });
          }}
        />
      );
    }
    case "ResultsPage": {
      return (
        <ChallengeResultsPage
          challenge={challengeState.challenge}
          totalMarks={state.page.totalMarks}
          marks={state.page.marks}
          onRepeatChallenge={() => {
            handleEvent({ kind: "RepeatChallenge" });
          }}
        />
      );
    }
    case "QuestionPage": {
      const { itemIndex } = state.page;
      const question = state.challenge.questions[itemIndex];
      const questionState = state.questionStates[itemIndex];
      const itemCount = state.challenge.questions.length;
      return (
        <ChallengeQuestionPage
          questionIndex={itemIndex}
          questionCount={itemCount}
          question={question}
          questionState={questionState}
          onEvent={handleEvent}
        />
      );
    }
  }
}
