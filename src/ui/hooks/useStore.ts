import * as React from "react";
import { type Challenge } from "@/domain/types";
import { makeStore, type ChallengeStore } from "@/store/makeStore";

type UseStoreParams = {
  challenge: Challenge;
};

export function useStore(params: UseStoreParams): ChallengeStore {
  const { challenge } = params;

  const storeRef = React.useRef<ChallengeStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore({ challenge });
  }

  return storeRef.current;
}
