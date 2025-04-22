import type { Quiz } from "@/domain/types";

export type FetchQuizProps = {
  quizId: string;
};

export async function fetchQuiz(props: FetchQuizProps): Promise<Quiz> {
  const { quizId } = props;

  const response = await fetch(`/api/quiz/${quizId}`);

  if (!response.ok) {
    throw new Error("Cannot fetch quiz");
  }

  const data = await response.json();

  return data;
}
