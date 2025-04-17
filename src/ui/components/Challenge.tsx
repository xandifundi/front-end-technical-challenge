import type { ChallengeState } from "@/state/types";
import { ChallengeStartPage } from "./pages/startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./pages/resultsPage/ChallengeResultsPage";
import { ChallengeItemPage } from "./pages/itemPage/ChallengeItemPage";

export type ChallengeProps = {
  challengeState: ChallengeState;
};

export function Challenge(props: ChallengeProps) {
  const { challengeState } = props;
  const { challenge } = challengeState;

  switch (challengeState.page.kind) {
    case "StartPage": {
      return <ChallengeStartPage challenge={challenge} onStart={() => {}} />;
    }
    case "ResultsPage": {
      return (
        <ChallengeResultsPage challenge={challenge} onRestart={() => {}} />
      );
    }
    case "ItemPage": {
      const { itemIndex } = challengeState.page;
      const item = challengeState.items[itemIndex];
      return (
        <ChallengeItemPage
          item={item}
          onPrevious={() => {}}
          onNext={() => {}}
        />
      );
    }
  }
}
