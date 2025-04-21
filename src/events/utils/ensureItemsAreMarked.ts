import { ChallengeState, ChallengeStateItem } from "@/state/types";
import * as Marking from "@/marking";

export function ensureItemsAreMarked(state: ChallengeState): ChallengeState {
  const { items } = state;

  const newItems = items.map((item) => {
    switch (item.kind) {
      case "TextSnippet": {
        return item;
      }
      case "MultipleChoiceQuestion": {
        if (item.state.kind === "Marked") {
          return item;
        }

        const result = Marking.markMultipleChoiceQuestion({
          question: item.question,
          selectedOptionId: item.state.selectedOptionId,
        });

        const newItem: ChallengeStateItem = {
          kind: "MultipleChoiceQuestion",
          question: item.question,
          state: { kind: "Marked", result },
        };

        return newItem;
      }
    }
  });

  return {
    ...state,
    items: newItems,
  };
}
