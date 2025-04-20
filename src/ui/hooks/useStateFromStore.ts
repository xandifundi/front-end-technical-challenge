import React from "react";
import { type ChallengeState } from "@/state/types";
import { type ChallengeStore } from "@/store/types";

export type UseStateFromStoreProps = {
  store: ChallengeStore;
};

export function useStateFromStore({ store }: UseStateFromStoreProps) {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    function handleChange(newState: ChallengeState) {
      setState(newState);
    }

    store.subscribe(handleChange);

    return () => {
      store.unsubscribe(handleChange);
    };
  }, [store]);

  return state;
}
