export type StartChallengeEvent = {
  kind: "StartChallenge";
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

export type MultipleChoiceQuestionCheckAnswerEvent = {
  kind: "MultipleChoiceQuestionCheckAnswer";
  selectedOptionId: string;
};

export type ChallengeEvent =
  | StartChallengeEvent
  | RestartChallengeEvent
  | GoToNextItemEvent
  | GoToPreviousItemEvent
  | MultipleChoiceQuestionCheckAnswerEvent;
