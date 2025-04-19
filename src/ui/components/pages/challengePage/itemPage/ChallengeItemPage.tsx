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
  onEvent: (event: ChallengeEvent) => void;
};

export function ChallengeItemPage(
  props: ChallengeItemPageProps
): React.JSX.Element {
  const { item, onEvent } = props;
  return (
    <div className={pageStyles.page}>
      <main>
        <ChallengeItem item={item} onEvent={onEvent} />
      </main>
      <footer className={styles.footer}>
        <Button
          onClick={() => {
            onEvent({ kind: "GoToPreviousItem" });
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            onEvent({ kind: "GoToNextItem" });
          }}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
