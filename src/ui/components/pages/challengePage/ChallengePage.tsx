import React from "react";
import type { ChallengeState } from "@/domain/types";
import * as LocalStorageAPI from "@/api/localStorageAPI";
import { useChallengeState } from "@/ui/hooks/useChallengeState";
import { ChallengeStartPage } from "./startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./resultsPage/ChallengeResultsPage";
import { ChallengeQuestionPage } from "./questionPage/ChallengeQuestionPage";

export type ChallengePageProps = {
  challengeState: ChallengeState;
};

export function ChallengePage(props: ChallengePageProps) {
  const { state, handleEvent } = useChallengeState({
    challengeState: props.challengeState,
  });

  // Save the current state
  React.useEffect(() => {
    if (state.page.kind === "QuestionPage") {
      LocalStorageAPI.saveChallengeState(state);
    }
  }, [state]);

  switch (state.page.kind) {
    case "StartPage": {
      return (
        <ChallengeStartPage
          challenge={state.challenge}
          onStart={() => {
            handleEvent({ kind: "StartChallenge" });
          }}
        />
      );
    }
    case "ResultsPage": {
      return (
        <ChallengeResultsPage
          challenge={state.challenge}
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
