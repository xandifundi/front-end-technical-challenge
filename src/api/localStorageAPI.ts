import type { QuizState } from "@/domain/types";

const key = "atomi_quiz_state";

export function loadQuizState(): QuizState | null {
  const state = localStorage.getItem(key);
  return state ? (JSON.parse(state) as QuizState) : null;
}

export function saveQuizState(state: QuizState): void {
  localStorage.setItem(key, JSON.stringify(state));
}

export function clearQuizState(): void {
  localStorage.removeItem(key);
}
