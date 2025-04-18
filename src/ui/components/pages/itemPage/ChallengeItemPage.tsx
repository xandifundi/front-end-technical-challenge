import type { ChallengeItem, ChallengeEvent } from "@/state/types";
import { MultipleChoiceQuestionPage } from "./items/MultipleChoiceQuestionPage";
import { TextSnippetPage } from "./items/TextSnippetPage";
import { JSX } from "react";

export type ChallengeItemPageProps = {
  item: ChallengeItem;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItemPage(props: ChallengeItemPageProps): JSX.Element {
  const { item, onEvent } = props;

  switch (item.kind) {
    case "TextSnippet": {
      return (
        <TextSnippetPage
          item={item}
          onBack={() => {
            onEvent({ kind: "GoToPreviousItem" });
          }}
          onNext={() => {
            onEvent({ kind: "GoToNextItem" });
          }}
        />
      );
    }
    case "MultipleChoiceQuestion": {
      return (
        <MultipleChoiceQuestionPage
          item={item}
          onOptionSelected={(selectedOptionId) => {
            onEvent({
              kind: "MultipleChoiceQuestionOptionSelected",
              selectedOptionId,
            });
          }}
          onCheckAnswer={() => {
            onEvent({ kind: "MultipleChoiceQuestionCheckAnswer" });
          }}
          onBack={() => {
            onEvent({ kind: "GoToPreviousItem" });
          }}
          onNext={() => {
            onEvent({ kind: "GoToNextItem" });
          }}
        />
      );
    }
  }
}
