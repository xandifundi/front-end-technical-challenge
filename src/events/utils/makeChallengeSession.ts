import { ChallengeState } from "@/state/types";
import {
  ChallengeSession,
  ChallengeSessionItem_TextSnippet,
  ChallengeSessionItem_MultipleChoiceQuestion,
} from "@/domain/types";

export function makeChallengeSession(state: ChallengeState): ChallengeSession {
  const items = state.items.map((stateItem) => {
    switch (stateItem.kind) {
      case "TextSnippet": {
        const item: ChallengeSessionItem_TextSnippet = {
          kind: "TextSnippet",
          itemId: stateItem.snippet.id,
        };
        return item;
      }

      case "MultipleChoiceQuestion": {
        const item: ChallengeSessionItem_MultipleChoiceQuestion = {
          kind: "MultipleChoiceQuestion",
          itemId: stateItem.question.id,
          state: stateItem.state,
        };
        return item;
      }
    }
  });

  const challengeSession: ChallengeSession = {
    challengeId: state.challenge.id,
    items,
  };

  return challengeSession;
}
