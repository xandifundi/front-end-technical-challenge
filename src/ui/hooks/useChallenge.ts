import React from "react";
import * as API from "@/utils/api";
import { ChallengeState } from "@/state/types";
import { makeInitialState } from "@/state/makeInitialState";

export type UseChallengeProps = {
  challengeId: string;
};

// TODO: Make this less type safe as an exercise?
export type UseChallengeState =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | { kind: "Success"; challengeState: ChallengeState };

export function useChallenge(props: UseChallengeProps) {
  const { challengeId } = props;

  const [state, setState] = React.useState<UseChallengeState>({
    kind: "Loading",
  });

  React.useEffect(() => {
    async function fetchChallenge() {
      try {
        const challenge = await API.fetchChallenge({ challengeId });
        const challengeState = makeInitialState({ challenge });
        setState({ kind: "Success", challengeState });
      } catch (error) {
        setState({ kind: "Error", error: String(error) });
      }
    }

    fetchChallenge();
  }, [challengeId]);

  return state;
}
