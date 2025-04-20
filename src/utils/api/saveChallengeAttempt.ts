import { MultipleChoiceQuestionResult } from "@/domain/types";

export type MultipleChoiceQuestionAttempt = {
  kind: "MultipleChoiceQuestionAttempt";
  itemId: string;
  result: MultipleChoiceQuestionResult;
};

export type TextSnippetAttempt = {
  kind: "TextSnippetAttempt";
  itemId: string;
};

export type ChallengeAttemptItem =
  | MultipleChoiceQuestionAttempt
  | TextSnippetAttempt;

export type ChallengeAttempt = {
  challengeId: string;
  items: ChallengeAttemptItem[];
};

export async function saveChallengeAttempt({
  challengeAttempt,
}: {
  challengeAttempt: ChallengeAttempt;
}) {
  const response = await fetch("/api/save-challenge-attempt", {
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
