import type { Challenge } from "@/domain/types";
import { ChallengeStartPage } from "./pages/startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./pages/resultsPage/ChallengeResultsPage";
import { ChallengeItemPage } from "./pages/itemPage/ChallengeItemPage";
import { useChallengeState } from "@/ui/hooks/useChallengeState";

export type ChallengeProps = {
  challenge: Challenge;
};

export function Challenge(props: ChallengeProps) {
  const { challenge } = props;

  const { challengeState, handleEvent } = useChallengeState({ challenge });

  switch (challengeState.page.kind) {
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
          onRestart={() => {
            handleEvent({ kind: "RestartChallenge" });
          }}
        />
      );
    }
    case "ItemPage": {
      const { itemIndex } = challengeState.page;
      const item = challengeState.items[itemIndex];
      return (
        <ChallengeItemPage
          item={item}
          onPrevious={() => {
            handleEvent({ kind: "GoToPreviousItem" });
          }}
          onNext={() => {
            handleEvent({ kind: "GoToNextItem" });
          }}
        />
      );
    }
  }
}
