import * as Marking from "@/domain/marking";
import type {
  ChallengeState,
  ChallengeItem,
  MultipleChoiceQuestionItem,
} from "./types/challengeState";
import type {
  ChallengeEvent,
  MultipleChoiceQuestionCheckAnswerEvent,
} from "./types/events";

export type HandleEventProps = {
  state: ChallengeState;
  event: ChallengeEvent;
};

function handleStartChallengeEvent(state: ChallengeState): ChallengeState {
  return {
    ...state,
    page: { kind: "ItemPage", itemIndex: 0 },
  };
}

function handleRestartChallengeEvent(state: ChallengeState): ChallengeState {
  return {
    ...state,
    page: { kind: "StartPage" },
  };
}

function handleGoToNextItemEvent(state: ChallengeState): ChallengeState {
  const { items, page } = state;
  if (page.kind !== "ItemPage") {
    return state;
  }
  const { itemIndex } = page;
  if (itemIndex >= items.length - 1) {
    return state;
  }
  return {
    ...state,
    page: { kind: "ItemPage", itemIndex: itemIndex + 1 },
  };
}

function handleGoToPreviousItemEvent(state: ChallengeState): ChallengeState {
  const { page } = state;
  if (page.kind !== "ItemPage") {
    return state;
  }
  const { itemIndex } = page;
  if (itemIndex <= 0) {
    return state;
  }
  return {
    ...state,
    page: { kind: "ItemPage", itemIndex: itemIndex - 1 },
  };
}

function handleMultipleChoiceQuestionCheckAnswerEvent(
  state: ChallengeState,
  event: MultipleChoiceQuestionCheckAnswerEvent
): ChallengeState {
  const { items, page } = state;
  if (page.kind !== "ItemPage") {
    return state;
  }
  const { itemIndex } = page;
  const item = items[itemIndex];
  if (item.kind !== "MultipleChoiceQuestion") {
    return state;
  }
  const { question } = item;
  const { selectedOptionId } = event;
  const result = Marking.markMultipleChoiceQuestion({
    question,
    selectedOptionId,
  });
  const newItem: MultipleChoiceQuestionItem = {
    ...item,
    state: {
      kind: "Marked",
      result,
    },
  };
  const newItems: ChallengeItem[] = items.map((_, index) =>
    index === itemIndex ? newItem : items[index]
  );
  return {
    ...state,
    items: newItems,
  };
}

export function handleEvent(props: HandleEventProps): ChallengeState {
  const { state, event } = props;
  switch (event.kind) {
    case "StartChallenge": {
      return handleStartChallengeEvent(state);
    }
    case "RestartChallenge": {
      return handleRestartChallengeEvent(state);
    }
    case "GoToNextItem": {
      return handleGoToNextItemEvent(state);
    }
    case "GoToPreviousItem": {
      return handleGoToPreviousItemEvent(state);
    }
    case "MultipleChoiceQuestionCheckAnswer": {
      return handleMultipleChoiceQuestionCheckAnswerEvent(state, event);
    }
  }
}
