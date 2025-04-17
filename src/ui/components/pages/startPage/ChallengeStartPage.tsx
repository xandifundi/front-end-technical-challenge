import pageStyles from "@/ui/styles/page.module.css";

export type ChallengeStartPageProps = {
  challengeName: string;
  challengeDescription: string;
  onStart: () => void;
};

export function ChallengeStartPage(props: ChallengeStartPageProps) {
  const { challengeName, challengeDescription, onStart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <h1>{challengeName}</h1>
        <div>{challengeDescription}</div>
        <div>
          <button onClick={onStart}>Start Challenge</button>
        </div>
      </main>
    </div>
  );
}
