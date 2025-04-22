import React from "react";
import type { Question, QuestionState, QuizEvent } from "@/types";
import { PageLayout } from "@/ui/components/layouts/PageLayout";
import { Button } from "@/ui/components/common/Button";
import { ProgressBar } from "@/ui/components/common/ProgressBar";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import styles from "./QuizQuestionPage.module.css";

export type QuizQuestionPageProps = {
  questionIndex: number;
  questionCount: number;
  question: Question;
  questionState: QuestionState;
  onEvent: (event: QuizEvent) => void;
};

export function QuizQuestionPage(
  props: QuizQuestionPageProps
): React.JSX.Element {
  const { questionIndex, questionCount, question, questionState, onEvent } =
    props;

  const isFirstItem = questionIndex === 0;
  const isLastItem = questionIndex === questionCount - 1;

  const backButton = (
    <Button
      disabled={isFirstItem}
      onClick={() => onEvent({ kind: "GoToPreviousItem" })}
    >
      Back
    </Button>
  );

  const nextButton = isLastItem ? (
    <Button onClick={() => onEvent({ kind: "FinishQuiz" })}>Finish</Button>
  ) : (
    <Button onClick={() => onEvent({ kind: "GoToNextItem" })}>Next</Button>
  );

  return (
    <PageLayout>
      <header className={styles.header}>
        <div className={styles.headerProgress}>
          <ProgressBar current={questionIndex + 1} total={questionCount} />
        </div>
        <div>
          <Button size="small" onClick={() => onEvent({ kind: "CloseQuiz" })}>
            ✕
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <MultipleChoiceQuestion
          question={question}
          questionState={questionState}
          onOptionSelected={(selectedOptionId) => {
            onEvent({
              kind: "MultipleChoiceQuestionOptionSelected",
              selectedOptionId,
            });
          }}
          onCheckAnswer={() => {
            onEvent({ kind: "MultipleChoiceQuestionCheckAnswer" });
          }}
        />
      </main>

      <footer className={styles.footer}>
        {backButton}
        {nextButton}
      </footer>
    </PageLayout>
  );
}
