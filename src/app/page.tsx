"use client";

import { sampleQuiz } from "@/data/sampleQuiz";
import { QuizContainer } from "@/ui/components/QuizContainer";

export default function Quiz() {
  return <QuizContainer quizId={sampleQuiz.id} />;
}
