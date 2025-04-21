import type {
  ChallengeState,
  ChallengeStateItem,
  ChallengeStateItem_MultipleChoiceQuestion,
  ChallengeAction,
  GoToResultsPageAction,
  SetMultipleChoiceQuestionSelectedOptionAction,
  SetMultipleChoiceQuestionResultAction,
} from "./types";
import { getItemPage, getMultipleChoiceQuestionItem } from "./utils";
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
    page: {
      kind: "ItemPage",
      itemIndex: 0,
    },
  };
}

function goToNextItem(state: ChallengeState): ChallengeState {
  const { items } = state;

  const page = getItemPage(state);

  if (!page) {
    return state;
  }

  const { itemIndex } = page;

  if (itemIndex >= items.length - 1) {
    return state;
  }

  return {
    ...state,
    page: {
      kind: "ItemPage",
      itemIndex: itemIndex + 1,
    },
  };
}

function goToPreviousItem(state: ChallengeState): ChallengeState {
  const page = getItemPage(state);

  if (!page) {
    return state;
  }

  const { itemIndex } = page;

  if (itemIndex <= 0) {
    return state;
  }

  return {
    ...state,
    page: {
      kind: "ItemPage",
      itemIndex: itemIndex - 1,
    },
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
  const item = getMultipleChoiceQuestionItem(state);

  if (!item) {
    return state;
  }

  const newItem: ChallengeStateItem_MultipleChoiceQuestion = {
    ...item,
    state: {
      kind: "NotMarked",
      selectedOptionId: action.selectedOptionId,
    },
  };

  const newItems: ChallengeStateItem[] = state.items.map((_, index) =>
    index === action.itemIndex ? newItem : state.items[index]
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
  const item = getMultipleChoiceQuestionItem(state);

  if (!item) {
    return state;
  }

  const newItem: ChallengeStateItem_MultipleChoiceQuestion = {
    ...item,
    state: {
      kind: "Marked",
      result: action.result,
    },
  };

  const newItems: ChallengeStateItem[] = state.items.map((_, index) =>
    index === action.itemIndex ? newItem : state.items[index]
  );

  return {
    ...state,
    items: newItems,
  };
}
