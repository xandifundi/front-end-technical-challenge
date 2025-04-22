import type { Quiz, QuizState } from "@/domain/types";

export function makeInitialState(quiz: Quiz): QuizState {
  return {
    quiz,
    page: { kind: "StartPage" },
    questionStates: quiz.questions.map(() => {
      return { selectedOptionId: null, result: null };
    }),
  };
}
