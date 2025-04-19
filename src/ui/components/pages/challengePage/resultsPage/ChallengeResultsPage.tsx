import type { Challenge } from "@/domain/types";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import pageStyles from "@/ui/styles/page.module.css";
import styles from "./ChallengeResultsPage.module.css";

export type ChallengeResultsPageProps = {
  challenge: Challenge;
  onRestart: () => void;
};

export function ChallengeResultsPage(props: ChallengeResultsPageProps) {
  const { challenge, onRestart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <Heading>{challenge.name} Results</Heading>

        <div className={styles.results}>Your results are ...</div>

        <div>
          <Button onClick={onRestart}>Restart</Button>
        </div>
      </main>
    </div>
  );
}
