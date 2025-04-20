import * as Marking from "@/utils/marking";
import type { ChallengeState, ChallengeAction } from "@/state/types";
import type {
  ChallengeAttempt,
  saveChallengeAttempt,
} from "@/utils/api/saveChallengeAttempt";
import type {
  ChallengeEvent,
  MultipleChoiceQuestionOptionSelectedEvent,
} from "./types";

export type ChallengeStore = {
  getState: () => ChallengeState;
  dispatch: (action: ChallengeAction) => void;
};

export type ChallengeAPI = {
  saveChallengeAttempt: typeof saveChallengeAttempt;
};

export type HandleEventContext = {
  store: ChallengeStore;
  api: ChallengeAPI;
};

export type HandleEventProps = {
  context: HandleEventContext;
  event: ChallengeEvent;
};

export async function handleEvent(props: HandleEventProps): Promise<void> {
  const { context, event } = props;
  switch (event.kind) {
    case "StartChallenge": {
      return handleStartChallengeEvent(context);
    }
    case "CloseChallenge": {
      return handleCloseChallengeEvent(context);
    }
    case "FinishChallenge": {
      return handleFinishChallengeEvent(context);
    }
    case "RestartChallenge": {
      return handleRestartChallengeEvent(context);
    }
    case "GoToNextItem": {
      return handleGoToNextItemEvent(context);
    }
    case "GoToPreviousItem": {
      return handleGoToPreviousItemEvent(context);
    }
    case "MultipleChoiceQuestionOptionSelected": {
      return handleMultipleChoiceQuestionOptionSelectedEvent(context, event);
    }
    case "MultipleChoiceQuestionCheckAnswer": {
      return handleMultipleChoiceQuestionCheckAnswerEvent(context);
    }
  }
}

function handleStartChallengeEvent(context: HandleEventContext): void {
  context.store.dispatch({ kind: "GoToFirstItem" });
}

function handleCloseChallengeEvent(context: HandleEventContext): void {
  context.store.dispatch({ kind: "ResetChallege" });
}

async function handleFinishChallengeEvent(
  context: HandleEventContext
): Promise<void> {
  const state = context.store.getState();

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

  const challengeAttempt: ChallengeAttempt = {
    challengeId: state.challenge.id,
    items: state.items.map((item) => {
      switch (item.kind) {
        case "TextSnippet": {
          return {
            kind: "TextSnippetAttempt",
            itemId: item.snippet.id,
          };
        }
        case "MultipleChoiceQuestion": {
          const result =
            item.state.kind === "Marked"
              ? item.state.result
              : Marking.markMultipleChoiceQuestion({
                  question: item.question,
                  selectedOptionId: item.state.selectedOptionId,
                });
          return {
            kind: "MultipleChoiceQuestionAttempt",
            itemId: item.question.id,
            result,
          };
        }
      }
    }),
  };

  await context.api.saveChallengeAttempt({ challengeAttempt });

  context.store.dispatch({
    kind: "GoToResultsPage",
    totalMarks,
    marks,
  });
}

function handleRestartChallengeEvent(context: HandleEventContext): void {
  context.store.dispatch({ kind: "ResetChallege" });
}

function handleGoToNextItemEvent(context: HandleEventContext): void {
  context.store.dispatch({ kind: "GoToNextItem" });
}

function handleGoToPreviousItemEvent(context: HandleEventContext): void {
  context.store.dispatch({ kind: "GoToPreviousItem" });
}

function handleMultipleChoiceQuestionOptionSelectedEvent(
  context: HandleEventContext,
  event: MultipleChoiceQuestionOptionSelectedEvent
): void {
  context.store.dispatch({
    kind: "SetMultipleChoiceQuestionSelectedOption",
    itemIndex: event.itemIndex,
    selectedOptionId: event.selectedOptionId,
  });
}

function handleMultipleChoiceQuestionCheckAnswerEvent(
  context: HandleEventContext
): void {
  const state = context.store.getState();

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

  context.store.dispatch({
    kind: "SetMultipleChoiceQuestionResult",
    itemIndex: page.itemIndex,
    result,
  });
}
