import type { ChallengeAttempt } from "@/domain/types";
import type { ChallengeState, ChallengeAction } from "@/state/types";

export type ChallengeStore = {
  getState: () => ChallengeState;
  dispatch: (action: ChallengeAction) => void;
};

export type ChallengeAPI = {
  saveChallengeAttempt: (challengeAttempt: ChallengeAttempt) => Promise<void>;
};

export type HandleEventContext = {
  store: ChallengeStore;
  api: ChallengeAPI;
};
