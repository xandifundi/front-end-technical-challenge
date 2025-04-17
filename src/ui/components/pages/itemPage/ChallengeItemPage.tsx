import { ChallengeItemState } from "@/state/types";
import pageStyles from "@/ui/styles/page.module.css";

export type ChallengeItemPageProps = {
  itemState: ChallengeItemState;
  onPrevious: () => void;
  onNext: () => void;
};

export function ChallengeItemPage(props: ChallengeItemPageProps) {
  const { onPrevious, onNext } = props;

  return (
    <div className={pageStyles.page}>
      <main>Item Page</main>
      <footer>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </footer>
    </div>
  );
}
