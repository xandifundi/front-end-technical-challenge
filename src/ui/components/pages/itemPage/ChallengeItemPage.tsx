import { ChallengeItem } from "@/state/types";
import { MultipleChoiceQuestionPage } from "./items/MultipleChoiceQuestionPage";
import { TextSnippetPage } from "./items/TextSnippetPage";
import { JSX } from "react";

export type ChallengeItemPageProps = {
  item: ChallengeItem;
  onPrevious: () => void;
  onNext: () => void;
};

export function ChallengeItemPage(props: ChallengeItemPageProps): JSX.Element {
  const { item, onPrevious, onNext } = props;

  switch (item.kind) {
    case "TextSnippet": {
      return (
        <TextSnippetPage item={item} onPrevious={onPrevious} onNext={onNext} />
      );
    }
    case "MultipleChoiceQuestion": {
      return (
        <MultipleChoiceQuestionPage
          item={item}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      );
    }
  }
}
