import { ChallengeState, ChallengeAction } from "@/state/types";

export type StoreListener = (state: ChallengeState) => void;

export type ChallengeStore = {
  getState: () => ChallengeState;
  dispatch: (action: ChallengeAction) => ChallengeState;
  subscribe: (listenerToAdd: StoreListener) => void;
  unsubscribe: (listenerToRemove: StoreListener) => void;
};
