import React from "react";
import type { ChallengeItem as ChallengeItemType } from "@/state/types";
import type { ChallengeEvent } from "@/events/types/event";
import pageStyles from "@/ui/styles/page.module.css";
import { Button } from "@/ui/components/common/Button";
import { ChallengeItem } from "./ChallengeItem";
import styles from "./ChallengeItemPage.module.css";

export type ChallengeItemPageProps = {
  itemIndex: number;
  itemCount: number;
  item: ChallengeItemType;
  isLastItem: boolean;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItemPage(
  props: ChallengeItemPageProps
): React.JSX.Element {
  const { itemIndex, item, itemCount, isLastItem, onEvent } = props;

  const backButton = (
    <Button
      onClick={() => {
        onEvent({ kind: "GoToPreviousItem" });
      }}
    >
      Back
    </Button>
  );

  const nextButton = isLastItem ? (
    <Button
      onClick={() => {
        onEvent({ kind: "FinishChallenge" });
      }}
    >
      Finish
    </Button>
  ) : (
    <Button
      onClick={() => {
        onEvent({ kind: "GoToNextItem" });
      }}
    >
      Next
    </Button>
  );

  return (
    <div className={pageStyles.page}>
      <header className={styles.header}>
        <div className={styles.headerProgress}>
          <ProgressBar current={itemIndex + 1} total={itemCount} />
        </div>
        <div>
          <Button
            size="small"
            onClick={() => onEvent({ kind: "CloseChallenge" })}
          >
            ✕
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <ChallengeItem itemIndex={itemIndex} item={item} onEvent={onEvent} />
      </main>
      <footer className={styles.footer}>
        {backButton}
        {nextButton}
      </footer>
    </div>
  );
}

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}): React.JSX.Element {
  const widthPercent = (current / total) * 100;
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${widthPercent}%` }} />
    </div>
  );
}
