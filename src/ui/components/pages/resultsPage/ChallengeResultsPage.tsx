import pageStyles from "@/ui/styles/page.module.css";

export type ChallengeResultsPageProps = {
  challengeName: string;
  challengeDescription: string;
  onRestart: () => void;
};

export function ChallengeResultsPage(props: ChallengeResultsPageProps) {
  const { challengeName, challengeDescription, onRestart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <h1>{challengeName} Results</h1>
        <div>{challengeDescription}</div>
        <div>
          <button onClick={onRestart}>Restart</button>
        </div>
      </main>
    </div>
  );
}
