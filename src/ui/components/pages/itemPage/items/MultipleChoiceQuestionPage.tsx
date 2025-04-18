import { MultipleChoiceQuestionItem } from "@/state/types";
import pageStyles from "@/ui/styles/page.module.css";

export type MultipleChoiceQuestionPageProps = {
  item: MultipleChoiceQuestionItem;
  onPrevious: () => void;
  onNext: () => void;
};

export function MultipleChoiceQuestionPage(
  props: MultipleChoiceQuestionPageProps
) {
  const { item, onPrevious, onNext } = props;

  switch (item.state.kind) {
    case "NotMarked": {
      return (
        <div className={pageStyles.page}>
          <main>Multiple Choice Question Not Marked</main>
          <footer>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
          </footer>
        </div>
      );
    }
    case "Marked": {
      return (
        <div className={pageStyles.page}>
          <main>Multiple Choice Question Marked</main>
          <footer>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
          </footer>
        </div>
      );
    }
  }
}
