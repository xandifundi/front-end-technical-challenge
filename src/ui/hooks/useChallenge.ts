import type { Challenge, ChallengeSession } from "@/domain/types";
import { useStore } from "@/ui/hooks/useStore";
import { useStateFromStore } from "@/ui/hooks/useStateFromStore";
import { useHandleEvent } from "@/ui/hooks/useHandleEvent";

export type ChallengePageProps = {
  challenge: Challenge;
  challengeSession: ChallengeSession | null;
};

export function useChallenge(props: ChallengePageProps) {
  const { challenge, challengeSession } = props;

  // The store contains the application state.
  // We use `store.getState()` to get the current state.
  // We use `store.dispatch(action)` to update the state.
  const store = useStore({ challenge, challengeSession });

  // `handleEvent` handles application events sent from the UI.
  // It interacts with the store to update the state and also executes side effects.
  const handleEvent = useHandleEvent({ store });

  // `useStateFromStore` listens to changes to the store and triggers re-renders.
  const state = useStateFromStore({ store });

  return { state, handleEvent };
}
