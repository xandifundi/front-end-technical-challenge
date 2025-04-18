import React from "react";
import { Challenge } from "@/domain/types";
import { ChallengeState, ChallengeEvent } from "@/state/types";
import { makeInitialState } from "@/state/makeInitialState";
import { handleEvent as handleEventInternal } from "@/state/handleEvent";

export type UseChallengeStateProps = {
  challenge: Challenge;
};

export function useChallengeState(props: UseChallengeStateProps) {
  const { challenge } = props;

  const [state, setState] = React.useState<ChallengeState>(() =>
    makeInitialState({ challenge })
  );

  function handleEvent(event: ChallengeEvent) {
    const newState = handleEventInternal({ state, event });
    setState(newState);
  }

  return {
    state,
    handleEvent,
  };
}
