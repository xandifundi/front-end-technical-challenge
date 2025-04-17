import pageStyles from "@/ui/styles/page.module.css";
import type { Challenge } from "@/domain/types";

export type ChallengeStartPageProps = {
  challenge: Challenge;
  onStart: () => void;
};

export function ChallengeStartPage(props: ChallengeStartPageProps) {
  const { challenge, onStart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <h1>{challenge.name}</h1>
        <div>{challenge.description}</div>
        <div>
          <button onClick={onStart}>Start Challenge</button>
        </div>
      </main>
    </div>
  );
}
