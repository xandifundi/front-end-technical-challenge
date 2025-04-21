import * as Marking from "@/marking";
import type {
  ChallengeEvent,
  MultipleChoiceQuestionOptionSelectedEvent,
  HandleEventContext,
} from "./types";
import { ensureItemsAreMarked } from "./utils/ensureItemsAreMarked";
import { makeChallengeSession } from "./utils/makeChallengeSession";
import { calculateChallengeMarks } from "./utils/calculateChallengeMarks";

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
  const state = ensureItemsAreMarked(context.store.getState());

  const { totalMarks, marks } = calculateChallengeMarks(state);

  context.store.dispatch({
    kind: "GoToResultsPage",
    totalMarks,
    marks,
  });

  const challengeSession = makeChallengeSession(state);

  await context.api.completeChallengeSession(challengeSession);
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

  context.store.dispatch({
    kind: "SetMultipleChoiceQuestionSelectedOption",
    itemIndex: page.itemIndex,
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
