import React from "react";
import type { ChallengeState } from "@/domain/types";
import * as ChallengeAPI from "@/api/challengeAPI";
import * as LocalStorageAPI from "@/api/localStorageAPI";
import { makeInitialState } from "./makeInitialState";

export type UseLoadChallengeStateProps = {
  challengeId: string;
};

export type UseLoadChallengeStateResult =
  | { kind: "Loading" }
  | { kind: "Error"; error: string }
  | { kind: "Success"; challengeState: ChallengeState };

export function useLoadChallengeState(props: UseLoadChallengeStateProps) {
  const { challengeId } = props;

  const [result, setResult] = React.useState<UseLoadChallengeStateResult>({
    kind: "Loading",
  });

  React.useEffect(() => {
    async function getChallengeState() {
      try {
        const challengeStateFromLocalStorage =
          LocalStorageAPI.loadChallengeState();

        if (challengeStateFromLocalStorage) {
          setResult({
            kind: "Success",
            challengeState: challengeStateFromLocalStorage,
          });
          return;
        }

        const challenge = await ChallengeAPI.fetchChallenge({ challengeId });

        setResult({
          kind: "Success",
          challengeState: makeInitialState(challenge),
        });
      } catch (error) {
        setResult({ kind: "Error", error: String(error) });
      }
    }

    getChallengeState();
  }, [challengeId]);

  return result;
}
