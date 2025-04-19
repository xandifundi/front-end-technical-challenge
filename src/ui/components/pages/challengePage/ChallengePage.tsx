import type { Challenge } from "@/domain/types";
import { useChallengeState } from "@/ui/hooks/useChallengeState";
import { ChallengeStartPage } from "./startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./resultsPage/ChallengeResultsPage";
import { ChallengeItemPage } from "./itemPage/ChallengeItemPage";

export type ChallengePageProps = {
  challenge: Challenge;
};

export function ChallengePage(props: ChallengePageProps) {
  const { challenge } = props;

  const { state, handleEvent } = useChallengeState({ challenge });

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
      const isLastItem = itemIndex === state.items.length - 1;
      const itemCount = state.items.length;
      const itemNumber = itemIndex + 1;
      return (
        <ChallengeItemPage
          item={item}
          isLastItem={isLastItem}
          itemNumber={itemNumber}
          itemCount={itemCount}
          onEvent={handleEvent}
        />
      );
    }
  }
}
