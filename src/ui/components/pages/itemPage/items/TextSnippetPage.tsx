import { TextSnippetItem } from "@/state/types";
import { ChallengeItemLayout } from "../common/ChallengeItemLayout";
import { ChallengeItemFooter } from "../common/ChallengeItemFooter";

export type TextSnippetPageProps = {
  item: TextSnippetItem;
  onBack: () => void;
  onNext: () => void;
};

export function TextSnippetPage(props: TextSnippetPageProps) {
  const { item, onBack, onNext } = props;
  const { snippet } = item;

  const footer = <ChallengeItemFooter onBack={onBack} onNext={onNext} />;

  const main = <div>{snippet.content}</div>;

  return <ChallengeItemLayout main={main} footer={footer} />;
}
