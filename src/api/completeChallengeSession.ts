import type { ChallengeSession } from "@/domain/types";

export async function completeChallengeSession(
  challengeSession: ChallengeSession
) {
  const response = await fetch("/api/complete-challenge-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(challengeSession),
  });

  if (!response.ok) {
    throw new Error("Failed to complete the challenge session");
  }

  return response.json();
}
