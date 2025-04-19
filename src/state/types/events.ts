export type StartChallengeEvent = {
  kind: "StartChallenge";
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
  selectedOptionId: string;
};

export type MultipleChoiceQuestionCheckAnswerEvent = {
  kind: "MultipleChoiceQuestionCheckAnswer";
};

export type ChallengeEvent =
  | StartChallengeEvent
  | FinishChallengeEvent
  | RestartChallengeEvent
  | GoToNextItemEvent
  | GoToPreviousItemEvent
  | MultipleChoiceQuestionOptionSelectedEvent
  | MultipleChoiceQuestionCheckAnswerEvent;
