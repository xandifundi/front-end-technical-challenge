import type { Challenge, ChallengeState } from "@/domain/types";

export function makeInitialState(challenge: Challenge): ChallengeState {
  return {
    challenge,
    page: { kind: "StartPage" },
    questionStates: challenge.questions.map(() => {
      return { selectedOptionId: null, result: null };
    }),
  };
}
