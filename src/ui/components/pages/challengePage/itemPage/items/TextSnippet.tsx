import { TextSnippetItem } from "@/state/types";
import { HtmlContent } from "@/ui/components/common/HtmlContent";

export type TextSnippetProps = {
  item: TextSnippetItem;
};

export function TextSnippet(props: TextSnippetProps) {
  const { item } = props;
  const { snippet } = item;

  return (
    <div>
      <HtmlContent content={snippet.content} />
    </div>
  );
}
