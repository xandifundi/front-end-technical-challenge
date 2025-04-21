import { ChallengeState } from "@/state/types";
import {
  ChallengeAttempt,
  TextSnippetAttempt,
  MultipleChoiceQuestionAttempt,
} from "@/domain/types";

export function makeChallengeAttempt(state: ChallengeState) {
  const items = state.items.map((item) => {
    switch (item.kind) {
      case "TextSnippet": {
        const attempt: TextSnippetAttempt = {
          kind: "TextSnippetAttempt",
          itemId: item.snippet.id,
        };
        return attempt;
      }

      case "MultipleChoiceQuestion": {
        const attempt: MultipleChoiceQuestionAttempt = {
          kind: "MultipleChoiceQuestionAttempt",
          itemId: item.question.id,
          state: item.state,
        };
        return attempt;
      }
    }
  });

  const challengeAttempt: ChallengeAttempt = {
    challengeId: state.challenge.id,
    items,
  };

  return challengeAttempt;
}
