import type { Challenge } from "@/domain/types";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import pageStyles from "@/ui/styles/page.module.css";
import styles from "./ChallengeResultsPage.module.css";

export type ChallengeResultsPageProps = {
  challenge: Challenge;
  totalMarks: number;
  marks: number;
  onRepeatChallenge: () => void;
};

export function ChallengeResultsPage(props: ChallengeResultsPageProps) {
  const { challenge, onRepeatChallenge } = props;

  const percentage = (props.marks / props.totalMarks) * 100;
  const percentageInt = Math.floor(percentage);

  return (
    <div className={pageStyles.page}>
      <main>
        <Heading>{challenge.name} Results</Heading>

        <div className={styles.results}>
          You got {props.marks} out of {props.totalMarks} marks ({percentageInt}
          %)
        </div>

        <div>
          <Button onClick={onRepeatChallenge}>Try again</Button>
        </div>
      </main>
    </div>
  );
}
