import React from "react";
import type { ChallengeStateItem } from "@/state/types";
import type { ChallengeEvent } from "@/events/types";
import { PageLayout } from "@/ui/components/layouts/PageLayout";
import { Button } from "@/ui/components/common/Button";
import { ProgressBar } from "@/ui/components/common/ProgressBar";
import { ChallengeItem } from "./ChallengeItem";
import styles from "./ChallengeItemPage.module.css";

export type ChallengeItemPageProps = {
  itemIndex: number;
  itemCount: number;
  item: ChallengeStateItem;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItemPage(
  props: ChallengeItemPageProps
): React.JSX.Element {
  const { itemIndex, item, itemCount, onEvent } = props;

  const isFirstItem = itemIndex === 0;
  const isLastItem = itemIndex === itemCount - 1;

  const backButton = (
    <Button
      disabled={isFirstItem}
      onClick={() => onEvent({ kind: "GoToPreviousItem" })}
    >
      Back
    </Button>
  );

  const nextButton = isLastItem ? (
    <Button onClick={() => onEvent({ kind: "FinishChallenge" })}>Finish</Button>
  ) : (
    <Button onClick={() => onEvent({ kind: "GoToNextItem" })}>Next</Button>
  );

  return (
    <PageLayout>
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
        <ChallengeItem item={item} onEvent={onEvent} />
      </main>

      <footer className={styles.footer}>
        {backButton}
        {nextButton}
      </footer>
    </PageLayout>
  );
}
