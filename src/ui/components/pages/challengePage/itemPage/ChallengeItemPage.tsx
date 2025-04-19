import React from "react";
import type {
  ChallengeItem as ChallengeItemType,
  ChallengeEvent,
} from "@/state/types";
import pageStyles from "@/ui/styles/page.module.css";
import { Button } from "@/ui/components/common/Button";
import { ChallengeItem } from "./ChallengeItem";
import styles from "./ChallengeItemPage.module.css";

export type ChallengeItemPageProps = {
  item: ChallengeItemType;
  isLastItem: boolean;
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItemPage(
  props: ChallengeItemPageProps
): React.JSX.Element {
  const { item, isLastItem, onEvent } = props;

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
      <main>
        <ChallengeItem item={item} onEvent={onEvent} />
      </main>
      <footer className={styles.footer}>
        {backButton}
        {nextButton}
      </footer>
    </div>
  );
}
