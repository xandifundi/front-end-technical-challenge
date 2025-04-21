import * as Marking from "@/marking";
import * as Session from "@/session";
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
    case "RepeatChallenge": {
      return handleRepeatChallengeEvent(context);
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
    default: {
      event satisfies never;
    }
  }
}

function handleStartChallengeEvent(context: HandleEventContext) {
  context.store.dispatch({ kind: "GoToFirstItem" });
}

function handleCloseChallengeEvent(context: HandleEventContext) {
  const { challenge } = context.store.getState();
  const challengeSession = Session.makeInitialSession({ challenge });
  context.store.dispatch({ kind: "ResetChallenge", challengeSession });
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

function handleRepeatChallengeEvent(context: HandleEventContext) {
  const { challenge } = context.store.getState();
  const challengeSession = Session.makeInitialSession({ challenge });
  context.store.dispatch({ kind: "ResetChallenge", challengeSession });
}

function handleGoToNextItemEvent(context: HandleEventContext) {
  context.store.dispatch({ kind: "GoToNextItem" });
}

function handleGoToPreviousItemEvent(context: HandleEventContext) {
  context.store.dispatch({ kind: "GoToPreviousItem" });
}

function handleMultipleChoiceQuestionOptionSelectedEvent(
  context: HandleEventContext,
  event: MultipleChoiceQuestionOptionSelectedEvent
) {
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
) {
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
