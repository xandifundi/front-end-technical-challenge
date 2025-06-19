import type { Quiz } from "@/types";
import { PageLayout } from "@/ui/components/layouts/PageLayout";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import { Markdown } from "@/ui/components/common/Markdown";
import styles from "./QuizStartPage.module.css";

export type QuizStartPageProps = {
  quiz: Quiz;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
  hasQuestionStateResults: boolean;
};

export function QuizStartPage(props: QuizStartPageProps) {
  const { quiz, onStart, onResume, onRestart, hasQuestionStateResults } = props;

  return (
    <PageLayout>
      <main>
        <Heading>{quiz.name}</Heading>

        <div className={styles.content}>
          <Markdown>{quiz.description}</Markdown>
        </div>

        <div>
          {!hasQuestionStateResults ? (<Button onClick={onStart}>Start Quiz</Button>) : (
            <div className={styles.buttonsRow}>
              <Button onClick={onResume}>Resume Quiz</Button>
              <Button onClick={onRestart} buttonInverse>Restart Quiz</Button>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}
