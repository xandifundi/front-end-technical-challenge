import type { Challenge } from "@/domain/types";
import { makeInitialState } from "./makeInitialState";
import { handleAction } from "./handleAction";
import { ChallengeState, ChallengeAction } from "./types";

export type ChallengeStateAPI = {
  dispatch: (action: ChallengeAction) => ChallengeState;
  getState: () => ChallengeState;
};

export type MakeChallengeStateAPIProps = {
  challenge: Challenge;
};

export function makeChallengeStateAPI({
  challenge,
}: MakeChallengeStateAPIProps) {
  let state = makeInitialState({ challenge });
  let onChangeCallback: ((state: ChallengeState) => void) | null = null;

  function dispatch(action: ChallengeAction) {
    state = handleAction({ state, action });
    if (onChangeCallback) {
      onChangeCallback(state);
    }
    return state;
  }

  function getState() {
    return state;
  }

  function onChange(callback: (state: ChallengeState) => void) {
    onChangeCallback = callback;
  }

  return {
    dispatch,
    getState,
    onChange,
  };
}
