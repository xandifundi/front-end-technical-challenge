import type {
  Challenge,
  MultipleChoiceQuestion,
  TextSnippet,
} from "@/domain/types";
import type {
  ChallengeState,
  ChallengeStateItem,
  ChallengeStateItem_MultipleChoiceQuestion,
  ChallengeStateItem_TextSnippet,
} from "./types";

function makeMultipleChoiceQuestionItem(
  question: MultipleChoiceQuestion
): ChallengeStateItem_MultipleChoiceQuestion {
  return {
    kind: "MultipleChoiceQuestion",
    question,
    state: { kind: "NotMarked", selectedOptionId: null },
  };
}

function makeTextSnippetItem(
  page: TextSnippet
): ChallengeStateItem_TextSnippet {
  return {
    kind: "TextSnippet",
    snippet: page,
  };
}

function makeItems(challenge: Challenge): ChallengeStateItem[] {
  return challenge.items.map((item) => {
    switch (item.kind) {
      case "MultipleChoiceQuestion":
        return makeMultipleChoiceQuestionItem(item);
      case "TextSnippet":
        return makeTextSnippetItem(item);
    }
  });
}

export type MakeInitialStateProps = {
  challenge: Challenge;
};

export function makeInitialState(props: MakeInitialStateProps): ChallengeState {
  const { challenge } = props;

  const items = makeItems(challenge);

  return {
    challenge,
    items,
    page: { kind: "StartPage" },
  };
}
