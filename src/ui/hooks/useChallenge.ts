import React from "react";
import type { Challenge } from "@/domain/types";
import * as API from "@/utils/api";

export type UseChallengeProps = {
  challengeId: string;
};

// TODO: Make this less type safe as an exercise?
export type UseChallengeState =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | { kind: "Success"; challenge: Challenge };

export function useChallenge(props: UseChallengeProps) {
  const { challengeId } = props;

  const [state, setState] = React.useState<UseChallengeState>({
    kind: "Loading",
  });

  React.useEffect(() => {
    async function fetchChallenge() {
      try {
        const challenge = await API.fetchChallenge({ challengeId });
        setState({ kind: "Success", challenge });
      } catch (error) {
        setState({ kind: "Error", error: String(error) });
      }
    }

    fetchChallenge();
  }, [challengeId]);

  return state;
}
