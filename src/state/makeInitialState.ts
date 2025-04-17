import type {
  Challenge,
  MultipleChoiceQuestion,
  TextPage,
} from "@/domain/types";
import type {
  ChallengeState,
  ChallengeItem,
  MultipleChoiceQuestionItem,
  TextPageItem,
} from "@/state/types";

function makeMultipleChoiceQuestionItem(
  question: MultipleChoiceQuestion
): MultipleChoiceQuestionItem {
  return {
    kind: "MultipleChoiceQuestion",
    question,
    state: { kind: "NotAnswered" },
  };
}

function makeTextPageItem(page: TextPage): TextPageItem {
  return {
    kind: "TextPage",
    page,
    state: { kind: "NotViewed" },
  };
}

function makeItems(challenge: Challenge): ChallengeItem[] {
  return challenge.items.map((item) => {
    switch (item.kind) {
      case "MultipleChoiceQuestion":
        return makeMultipleChoiceQuestionItem(item);
      case "TextPage":
        return makeTextPageItem(item);
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
