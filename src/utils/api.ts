import type { Challenge } from "@/domain/types";

export type FetchChallengeProps = {
  challengeId: string;
};

export async function fetchChallenge(
  props: FetchChallengeProps
): Promise<Challenge> {
  const { challengeId } = props;

  const response = await fetch(`/api/challenge/${challengeId}`);

  if (!response.ok) {
    throw new Error("Cannot fetch challenge");
  }

  const data = await response.json();

  return data;
}
