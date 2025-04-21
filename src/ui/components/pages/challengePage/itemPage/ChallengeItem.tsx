import React from "react";
import type { ChallengeStateItem } from "@/state/types";
import type { ChallengeEvent } from "@/events/types/event";
import { MultipleChoiceQuestion } from "./items/MultipleChoiceQuestion";
import { TextSnippet } from "./items/TextSnippet";

export type ChallengeItemProps = {
  item: ChallengeStateItem;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItem(props: ChallengeItemProps): React.JSX.Element {
  const { item, onEvent } = props;

  switch (item.kind) {
    case "TextSnippet": {
      return <TextSnippet item={item} />;
    }
    case "MultipleChoiceQuestion": {
      return (
        <MultipleChoiceQuestion
          item={item}
          onOptionSelected={(selectedOptionId) => {
            onEvent({
              kind: "MultipleChoiceQuestionOptionSelected",
              selectedOptionId,
            });
          }}
          onCheckAnswer={() => {
            onEvent({
              kind: "MultipleChoiceQuestionCheckAnswer",
            });
          }}
        />
      );
    }
  }
}
