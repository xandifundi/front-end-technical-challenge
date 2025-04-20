export type StartChallengeEvent = {
  kind: "StartChallenge";
};

export type CloseChallengeEvent = {
  kind: "CloseChallenge";
};

export type FinishChallengeEvent = {
  kind: "FinishChallenge";
};

export type RestartChallengeEvent = {
  kind: "RestartChallenge";
};

export type GoToNextItemEvent = {
  kind: "GoToNextItem";
};

export type GoToPreviousItemEvent = {
  kind: "GoToPreviousItem";
};

export type MultipleChoiceQuestionOptionSelectedEvent = {
  kind: "MultipleChoiceQuestionOptionSelected";
  itemIndex: number;
  selectedOptionId: string;
};

export type MultipleChoiceQuestionCheckAnswerEvent = {
  kind: "MultipleChoiceQuestionCheckAnswer";
};

export type ChallengeEvent =
  | StartChallengeEvent
  | CloseChallengeEvent
  | FinishChallengeEvent
  | RestartChallengeEvent
  | GoToNextItemEvent
  | GoToPreviousItemEvent
  | MultipleChoiceQuestionOptionSelectedEvent
  | MultipleChoiceQuestionCheckAnswerEvent;
