export type StartChallengeEvent = {
  kind: "StartChallenge";
};

export type CloseChallengeEvent = {
  kind: "CloseChallenge";
};

export type FinishChallengeEvent = {
  kind: "FinishChallenge";
};

export type RepeatChallengeEvent = {
  kind: "RepeatChallenge";
};

export type GoToNextItemEvent = {
  kind: "GoToNextItem";
};

export type GoToPreviousItemEvent = {
  kind: "GoToPreviousItem";
};

export type MultipleChoiceQuestionOptionSelectedEvent = {
  kind: "MultipleChoiceQuestionOptionSelected";
  selectedOptionId: string;
};

export type MultipleChoiceQuestionCheckAnswerEvent = {
  kind: "MultipleChoiceQuestionCheckAnswer";
};

export type ChallengeEvent =
  | StartChallengeEvent
  | CloseChallengeEvent
  | FinishChallengeEvent
  | RepeatChallengeEvent
  | GoToNextItemEvent
  | GoToPreviousItemEvent
  | MultipleChoiceQuestionOptionSelectedEvent
  | MultipleChoiceQuestionCheckAnswerEvent;
