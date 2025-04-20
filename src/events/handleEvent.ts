import * as Marking from "@/utils/marking";
import type { ChallengeState, ChallengeAction } from "@/state/types";
import type {
  ChallengeEvent,
  MultipleChoiceQuestionOptionSelectedEvent,
} from "./types";

export type ChallengeStore = {
  getState: () => ChallengeState;
  dispatch: (action: ChallengeAction) => void;
};

export type HandleEventProps = {
  store: ChallengeStore;
  event: ChallengeEvent;
};

export async function handleEvent(props: HandleEventProps): Promise<void> {
  const { store, event } = props;
  switch (event.kind) {
    case "StartChallenge": {
      return handleStartChallengeEvent(store);
    }
    case "CloseChallenge": {
      return handleCloseChallengeEvent(store);
    }
    case "FinishChallenge": {
      return handleFinishChallengeEvent(store);
    }
    case "RestartChallenge": {
      return handleRestartChallengeEvent(store);
    }
    case "GoToNextItem": {
      return handleGoToNextItemEvent(store);
    }
    case "GoToPreviousItem": {
      return handleGoToPreviousItemEvent(store);
    }
    case "MultipleChoiceQuestionOptionSelected": {
      return handleMultipleChoiceQuestionOptionSelectedEvent(store, event);
    }
    case "MultipleChoiceQuestionCheckAnswer": {
      return handleMultipleChoiceQuestionCheckAnswerEvent(store);
    }
  }
}

function handleStartChallengeEvent(store: ChallengeStore): void {
  store.dispatch({ kind: "GoToFirstItem" });
}

function handleCloseChallengeEvent(store: ChallengeStore): void {
  store.dispatch({ kind: "ResetChallege" });
}

function handleFinishChallengeEvent(store: ChallengeStore): void {
  const state = store.getState();

  const totalMarks = state.items.reduce((acc, item) => {
    switch (item.kind) {
      case "TextSnippet": {
        return acc;
      }
      case "MultipleChoiceQuestion": {
        return acc + item.question.marks;
      }
    }
  }, 0);

  const marks = state.items.reduce((acc, item) => {
    switch (item.kind) {
      case "TextSnippet": {
        return acc;
      }
      case "MultipleChoiceQuestion": {
        return item.state.kind === "Marked"
          ? acc + item.state.result.marks
          : acc;
      }
    }
  }, 0);

  store.dispatch({
    kind: "GoToResultsPage",
    totalMarks,
    marks,
  });
}

function handleRestartChallengeEvent(store: ChallengeStore): void {
  store.dispatch({ kind: "ResetChallege" });
}

function handleGoToNextItemEvent(store: ChallengeStore): void {
  store.dispatch({ kind: "GoToNextItem" });
}

function handleGoToPreviousItemEvent(store: ChallengeStore): void {
  store.dispatch({ kind: "GoToPreviousItem" });
}

function handleMultipleChoiceQuestionOptionSelectedEvent(
  store: ChallengeStore,
  event: MultipleChoiceQuestionOptionSelectedEvent
): void {
  store.dispatch({
    kind: "SetMultipleChoiceQuestionSelectedOption",
    itemIndex: event.itemIndex,
    selectedOptionId: event.selectedOptionId,
  });
}

function handleMultipleChoiceQuestionCheckAnswerEvent(
  store: ChallengeStore
): void {
  const state = store.getState();

  const { items, page } = state;

  if (page.kind !== "ItemPage") {
    return;
  }

  const item = items[page.itemIndex];

  if (item.kind !== "MultipleChoiceQuestion") {
    return;
  }

  if (item.state.kind !== "NotMarked") {
    return;
  }

  const result = Marking.markMultipleChoiceQuestion({
    question: item.question,
    selectedOptionId: item.state.selectedOptionId,
  });

  store.dispatch({
    kind: "SetMultipleChoiceQuestionResult",
    itemIndex: page.itemIndex,
    result,
  });
}
