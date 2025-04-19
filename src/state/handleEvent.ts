import * as Marking from "@/domain/marking";
import type {
  ChallengeState,
  ChallengeItem,
  MultipleChoiceQuestionItem,
} from "./types/challengeState";
import type {
  ChallengeEvent,
  MultipleChoiceQuestionOptionSelectedEvent,
} from "./types/events";

export type HandleEventProps = {
  state: ChallengeState;
  event: ChallengeEvent;
};

export function handleEvent(props: HandleEventProps): ChallengeState {
  const { state, event } = props;
  switch (event.kind) {
    case "StartChallenge": {
      return handleStartChallengeEvent(state);
    }
    case "FinishChallenge": {
      return handleFinishChallengeEvent(state);
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
    case "MultipleChoiceQuestionOptionSelected": {
      return handleMultipleChoiceQuestionOptionSelectedEvent(state, event);
    }
    case "MultipleChoiceQuestionCheckAnswer": {
      return handleMultipleChoiceQuestionCheckAnswerEvent(state);
    }
  }
}

function handleStartChallengeEvent(state: ChallengeState): ChallengeState {
  return {
    ...state,
    page: { kind: "ItemPage", itemIndex: 0 },
  };
}

function handleFinishChallengeEvent(state: ChallengeState): ChallengeState {
  return {
    ...state,
    page: { kind: "ResultsPage" },
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

function handleMultipleChoiceQuestionOptionSelectedEvent(
  state: ChallengeState,
  event: MultipleChoiceQuestionOptionSelectedEvent
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
  const { selectedOptionId } = event;
  const newItem: MultipleChoiceQuestionItem = {
    ...item,
    state: {
      kind: "NotMarked",
      selectedOptionId,
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

function handleMultipleChoiceQuestionCheckAnswerEvent(
  state: ChallengeState
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
  const selectedOptionId =
    item.state.kind === "NotMarked" ? item.state.selectedOptionId : null;
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
