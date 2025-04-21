import * as React from "react";
import type { Challenge, ChallengeSession } from "@/domain/types";
import type { ChallengeStore } from "@/store/types";
import { makeStore } from "@/store/makeStore";

type UseStoreParams = {
  challenge: Challenge;
  challengeSession: ChallengeSession | null;
};

export function useStore(params: UseStoreParams): ChallengeStore {
  const { challenge, challengeSession } = params;

  const storeRef = React.useRef<ChallengeStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore({ challenge, challengeSession });
  }

  return storeRef.current;
}
