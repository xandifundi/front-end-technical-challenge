import type { Challenge } from "@/domain/types";
import pageStyles from "@/ui/styles/page.module.css";

export type ChallengeResultsPageProps = {
  challenge: Challenge;
  onRestart: () => void;
};

export function ChallengeResultsPage(props: ChallengeResultsPageProps) {
  const { challenge, onRestart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <h1>{challenge.name} Results</h1>
        <div>
          <button onClick={onRestart}>Restart</button>
        </div>
      </main>
    </div>
  );
}
