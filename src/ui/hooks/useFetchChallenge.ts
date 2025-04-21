import React from "react";
import * as API from "@/api";
import * as SessionAPI from "@/session";
import { Challenge, ChallengeSession } from "@/domain/types";

export type UseFetchChallengeProps = {
  challengeId: string;
};

export type UseFetchChallengeResult =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | {
      kind: "Success";
      challenge: Challenge;
      challengeSession: ChallengeSession | null;
    };

export function useFetchChallenge(props: UseFetchChallengeProps) {
  const { challengeId } = props;

  const [result, setResult] = React.useState<UseFetchChallengeResult>({
    kind: "Loading",
  });

  React.useEffect(() => {
    async function fetchChallenge() {
      try {
        const challenge = await API.fetchChallenge({ challengeId });
        const challengeSession = SessionAPI.loadChallengeSession();
        setResult({ kind: "Success", challenge, challengeSession });
      } catch (error) {
        setResult({ kind: "Error", error: String(error) });
      }
    }

    fetchChallenge();
  }, [challengeId]);

  return result;
}
