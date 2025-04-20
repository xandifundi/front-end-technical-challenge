import type { ChallengeAttempt } from "@/domain/types";

export async function saveChallengeAttempt(challengeAttempt: ChallengeAttempt) {
  const response = await fetch("/api/challenge-attempt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(challengeAttempt),
  });

  if (!response.ok) {
    throw new Error("Failed to save challenge attempt");
  }

  return response.json();
}
