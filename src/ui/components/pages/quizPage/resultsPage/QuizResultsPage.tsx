import type { Quiz } from "@/types";
import { PageLayout } from "@/ui/components/layouts/PageLayout";
import { Heading } from "@/ui/components/common/Heading";
import { Button } from "@/ui/components/common/Button";
import styles from "./QuizResultsPage.module.css";

export type QuizResultsPageProps = {
  quiz: Quiz;
  totalMarks: number;
  marks: number;
  onRepeatQuiz: () => void;
};

export function QuizResultsPage(props: QuizResultsPageProps) {
  const { quiz, onRepeatQuiz } = props;

  const percentage = (props.marks / props.totalMarks) * 100;
  const percentageInt = Math.floor(percentage);

  return (
    <PageLayout>
      <main>
        <Heading>{quiz.name} Results</Heading>

        <div className={styles.results}>
          You got {props.marks} out of {props.totalMarks} marks ({percentageInt}
          %)
        </div>

        <div>
          <Button onClick={onRepeatQuiz}>Try again</Button>
        </div>
      </main>
    </PageLayout>
  );
}
