import React from "react";
import * as API from "@/api";
import { Challenge } from "@/domain/types";

export type UseFetchChallengeProps = {
  challengeId: string;
};

export type UseFetchChallengeResult =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | { kind: "Success"; challenge: Challenge };

export function useFetchChallenge(props: UseFetchChallengeProps) {
  const { challengeId } = props;

  const [result, setResult] = React.useState<UseFetchChallengeResult>({
    kind: "Loading",
  });

  React.useEffect(() => {
    async function fetchChallenge() {
      try {
        const challenge = await API.fetchChallenge({ challengeId });
        setResult({ kind: "Success", challenge });
      } catch (error) {
        setResult({ kind: "Error", error: String(error) });
      }
    }

    fetchChallenge();
  }, [challengeId]);

  return result;
}
