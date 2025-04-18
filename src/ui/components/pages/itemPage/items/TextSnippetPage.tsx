import { TextSnippetItem } from "@/state/types";
import pageStyles from "@/ui/styles/page.module.css";

export type TextSnippetPageProps = {
  item: TextSnippetItem;
  onPrevious: () => void;
  onNext: () => void;
};

export function TextSnippetPage(props: TextSnippetPageProps) {
  const { item, onPrevious, onNext } = props;
  const { snippet } = item;

  return (
    <div className={pageStyles.page}>
      <main>{snippet.content}</main>
      <footer>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </footer>
    </div>
  );
}
