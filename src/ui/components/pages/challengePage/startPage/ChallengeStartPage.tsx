import type { Challenge } from "@/domain/types";
import { PageLayout } from "@/ui/components/layouts/PageLayout";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import { Markdown } from "@/ui/components/common/Markdown";
import styles from "./ChallengeStartPage.module.css";

export type ChallengeStartPageProps = {
  challenge: Challenge;
  onStart: () => void;
};

export function ChallengeStartPage(props: ChallengeStartPageProps) {
  const { challenge, onStart } = props;

  return (
    <PageLayout>
      <main>
        <Heading>{challenge.name}</Heading>

        <div className={styles.content}>
          <Markdown>{challenge.description}</Markdown>
        </div>

        <div>
          <Button onClick={onStart}>Start Challenge</Button>
        </div>
      </main>
    </PageLayout>
  );
}
