import type { ChallengeSession } from "@/domain/types";
import type { ChallengeState, ChallengeAction } from "@/state/types";

export type HandleEventStore = {
  getState: () => ChallengeState;
  dispatch: (action: ChallengeAction) => void;
};

export type HandleEventAPI = {
  completeChallengeSession: (
    challengeSession: ChallengeSession
  ) => Promise<void>;
};

export type HandleEventContext = {
  store: HandleEventStore;
  api: HandleEventAPI;
};
