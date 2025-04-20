import type { Challenge } from "@/domain/types";
import { ChallengeState, ChallengeAction } from "@/state/types";
import { handleAction } from "@/state/handleAction";
import { makeInitialState } from "@/state/makeInitialState";
import type { ChallengeStore, StoreListener } from "./types";

type MakeStoreParams = {
  challenge: Challenge;
};

export function makeStore(params: MakeStoreParams): ChallengeStore {
  const { challenge } = params;

  let listeners: StoreListener[] = [];

  let state: ChallengeState = makeInitialState({
    challenge,
  });

  function getState(): ChallengeState {
    return state;
  }

  function dispatch(action: ChallengeAction): ChallengeState {
    state = handleAction({ state, action });
    listeners.forEach((listener) => listener(state));
    return state;
  }

  function subscribe(listenerToAdd: StoreListener) {
    listeners = [...listeners, listenerToAdd];
  }

  function unsubscribe(listenerToRemove: StoreListener) {
    listeners = listeners.filter((listener) => listener !== listenerToRemove);
  }

  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe,
  };
}
