import type {
  Challenge,
  MultipleChoiceQuestion,
  TextSnippet,
} from "@/domain/types";
import type {
  ChallengeState,
  ChallengeItem,
  MultipleChoiceQuestionItem,
  TextSnippetItem,
} from "./types";

function makeMultipleChoiceQuestionItem(
  question: MultipleChoiceQuestion
): MultipleChoiceQuestionItem {
  return {
    kind: "MultipleChoiceQuestion",
    question,
    state: { kind: "NotMarked", selectedOptionId: null },
  };
}

function makeTextSnippetItem(page: TextSnippet): TextSnippetItem {
  return {
    kind: "TextSnippet",
    snippet: page,
  };
}

function makeItems(challenge: Challenge): ChallengeItem[] {
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
