import { Button } from "@/ui/components/common/Button";
import styles from "./ChallengeItemFooter.module.css";

export type ChallengeItemFooterProps = {
  onBack: () => void;
  onNext: () => void;
};

export function ChallengeItemFooter(props: ChallengeItemFooterProps) {
  const { onBack, onNext } = props;

  return (
    <div className={styles.footer}>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
}
