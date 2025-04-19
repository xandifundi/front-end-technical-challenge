import type { Challenge } from "@/domain/types";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import { HtmlContent } from "@/ui/components/common/HtmlContent";
import pageStyles from "@/ui/styles/page.module.css";
import styles from "./ChallengeStartPage.module.css";

export type ChallengeStartPageProps = {
  challenge: Challenge;
  onStart: () => void;
};

export function ChallengeStartPage(props: ChallengeStartPageProps) {
  const { challenge, onStart } = props;

  return (
    <div className={pageStyles.page}>
      <main>
        <Heading>{challenge.name}</Heading>

        <div className={styles.content}>
          <HtmlContent content={challenge.description} />
        </div>

        <div>
          <Button onClick={onStart}>Start Challenge</Button>
        </div>
      </main>
    </div>
  );
}
