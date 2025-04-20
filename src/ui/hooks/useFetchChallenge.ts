import React from "react";
import * as API from "@/utils/api";
import { Challenge } from "@/domain/types";

export type UseChallengeProps = {
  challengeId: string;
};

export type UseChallengeResult =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | { kind: "Success"; challenge: Challenge };

export function useFetchChallenge(props: UseChallengeProps) {
  const { challengeId } = props;

  const [result, setResult] = React.useState<UseChallengeResult>({
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
