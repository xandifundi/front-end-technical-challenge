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
          onRestart={() => {
            handleEvent({ kind: "RestartChallenge" });
          }}
        />
      );
    }
    case "ItemPage": {
      const { itemIndex } = state.page;
      const item = state.items[itemIndex];
      const itemCount = state.items.length;
      return (
        <ChallengeItemPage
          itemIndex={itemIndex}
          itemCount={itemCount}
          item={item}
          onEvent={handleEvent}
        />
      );
    }
  }
}
