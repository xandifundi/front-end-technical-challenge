import type { Challenge } from "@/domain/types";
import { useStore } from "@/ui/hooks/useStore";
import { useStateFromStore } from "@/ui/hooks/useStateFromStore";
import { useHandleEvent } from "@/ui/hooks/useHandleEvent";
import { ChallengeStartPage } from "./startPage/ChallengeStartPage";
import { ChallengeResultsPage } from "./resultsPage/ChallengeResultsPage";
import { ChallengeItemPage } from "./itemPage/ChallengeItemPage";

export type ChallengePageProps = {
  challenge: Challenge;
};

export function ChallengePage(props: ChallengePageProps) {
  const { challenge } = props;

  const challengeStore = useStore({ challenge });

  const handleEvent = useHandleEvent({ challengeStore });

  const state = useStateFromStore(challengeStore);

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
      return (
        <ChallengeItemPage
          itemIndex={itemIndex}
          item={item}
          isLastItem={isLastItem}
          itemCount={itemCount}
          onEvent={handleEvent}
        />
      );
    }
  }
}
