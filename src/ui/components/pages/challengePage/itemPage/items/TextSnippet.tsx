import { ChallengeStateItem_TextSnippet } from "@/state/types";
import { Markdown } from "@/ui/components/common/Markdown";

export type TextSnippetProps = {
  item: ChallengeStateItem_TextSnippet;
};

export function TextSnippet(props: TextSnippetProps) {
  const { item } = props;
  const { snippet } = item;

  return (
    <div>
      <Markdown>{snippet.content}</Markdown>
    </div>
  );
}
