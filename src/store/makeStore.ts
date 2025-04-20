import type { Challenge } from "@/domain/types";
import { ChallengeState, ChallengeAction } from "@/state/types";
import { handleAction } from "@/state/handleAction";
import { makeInitialState } from "@/state/makeInitialState";

export type ChallengeStore = ReturnType<typeof makeStore>;

type StoreListener = (state: ChallengeState) => void;

type MakeStoreParams = {
  challenge: Challenge;
};

export function makeStore(params: MakeStoreParams) {
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
