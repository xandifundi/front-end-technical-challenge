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

export type CompleteQuizProps = {
  quizId: string;
  marks: number;
};

export async function completeQuiz(props: CompleteQuizProps) {
  const { quizId, marks } = props;

  const response = await fetch(`/api/quiz/${quizId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quizId, marks }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete the quiz");
  }

  return response.json();
}
