import React from "react";
import type { ChallengeItem } from "@/state/types";
import type { ChallengeEvent } from "@/events/types";
import { MultipleChoiceQuestion } from "./items/MultipleChoiceQuestion";
import { TextSnippet } from "./items/TextSnippet";

export type ChallengeItemProps = {
  itemIndex: number;
  item: ChallengeItem;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItem(props: ChallengeItemProps): React.JSX.Element {
  const { itemIndex, item, onEvent } = props;

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
              itemIndex,
              selectedOptionId,
            });
          }}
          onCheckAnswer={() => {
            onEvent({ kind: "MultipleChoiceQuestionCheckAnswer" });
          }}
        />
      );
    }
  }
}
