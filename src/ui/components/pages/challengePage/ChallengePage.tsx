import React from "react";
import type { Challenge } from "@/domain/types";
import { useChallenge } from "@/ui/hooks/useChallenge";
import { ChallengeStartPage } from "./startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./resultsPage/ChallengeResultsPage";
import { ChallengeItemPage } from "./itemPage/ChallengeItemPage";

export type ChallengePageProps = {
  challenge: Challenge;
};

export function ChallengePage(props: ChallengePageProps) {
  const { challenge } = props;

  const { state, handleEvent } = useChallenge({ challenge });

  // Save the session every second
  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const session = makeChallengeSession(state);
  //     saveChallengeSession(session);
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [state]);

  switch (state.page.kind) {
    case "StartPage": {
      return (
        <ChallengeStartPage
          challenge={challenge}
          onStart={() => {
            handleEvent({ kind: "StartChallenge" });
          }}
        />
      );
    }
    case "ResultsPage": {
      return (
        <ChallengeResultsPage
          challenge={challenge}
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
        <ChallengeItemPage
          itemIndex={itemIndex}
          itemCount={itemCount}
          question={question}
          questionState={questionState}
          onEvent={handleEvent}
        />
      );
    }
  }
}
