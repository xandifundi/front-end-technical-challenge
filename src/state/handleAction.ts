import type {
  ChallengeState,
  ChallengeItem,
  MultipleChoiceQuestionItem,
  ChallengeAction,
  GoToResultsPageAction,
  SetMultipleChoiceQuestionSelectedOptionAction,
  SetMultipleChoiceQuestionResultAction,
} from "./types";
import { makeInitialState } from "./makeInitialState";

export type HandleActionProps = {
  state: ChallengeState;
  action: ChallengeAction;
};

export function handleAction(props: HandleActionProps): ChallengeState {
  const { state, action } = props;
  switch (action.kind) {
    case "ResetChallege": {
      return resetChallenge(state);
    }
    case "GoToFirstItem": {
      return goToFirstItem(state);
    }
    case "GoToResultsPage": {
      return goToResultsPage(state, action);
    }
    case "GoToNextItem": {
      return goToNextItem(state);
    }
    case "GoToPreviousItem": {
      return goToPreviousItem(state);
    }
    case "SetMultipleChoiceQuestionSelectedOption": {
      return setMultipleChoiceQuestionSelectedOption(state, action);
    }
    case "SetMultipleChoiceQuestionResult": {
      return setMultipleChoiceQuestionResult(state, action);
    }
  }
}

function resetChallenge(state: ChallengeState): ChallengeState {
  return makeInitialState({ challenge: state.challenge });
}

function goToFirstItem(state: ChallengeState): ChallengeState {
  return {
    ...state,
    page: { kind: "ItemPage", itemIndex: 0 },
  };
}

function goToNextItem(state: ChallengeState): ChallengeState {
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

function goToPreviousItem(state: ChallengeState): ChallengeState {
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

function goToResultsPage(
  state: ChallengeState,
  action: GoToResultsPageAction
): ChallengeState {
  const { marks, totalMarks } = action;
  return {
    ...state,
    page: { kind: "ResultsPage", totalMarks, marks },
  };
}

function setMultipleChoiceQuestionSelectedOption(
  state: ChallengeState,
  action: SetMultipleChoiceQuestionSelectedOptionAction
): ChallengeState {
  const { items, page } = state;

  if (page.kind !== "ItemPage") {
    return state;
  }

  const item = items[page.itemIndex];

  if (item.kind !== "MultipleChoiceQuestion") {
    return state;
  }

  if (item.state.kind === "Marked") {
    return state;
  }

  const newItem: MultipleChoiceQuestionItem = {
    ...item,
    state: {
      kind: "NotMarked",
      selectedOptionId: action.selectedOptionId,
    },
  };

  const newItems: ChallengeItem[] = items.map((_, index) =>
    index === action.itemIndex ? newItem : items[index]
  );

  return {
    ...state,
    items: newItems,
  };
}

function setMultipleChoiceQuestionResult(
  state: ChallengeState,
  action: SetMultipleChoiceQuestionResultAction
): ChallengeState {
  const { items, page } = state;

  if (page.kind !== "ItemPage") {
    return state;
  }

  const item = items[page.itemIndex];

  if (item.kind !== "MultipleChoiceQuestion") {
    return state;
  }

  const newItem: MultipleChoiceQuestionItem = {
    ...item,
    state: {
      kind: "Marked",
      result: action.result,
    },
  };

  const newItems: ChallengeItem[] = items.map((_, index) =>
    index === action.itemIndex ? newItem : items[index]
  );

  return {
    ...state,
    items: newItems,
  };
}
