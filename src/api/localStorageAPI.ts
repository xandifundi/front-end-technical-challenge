import type { ChallengeState } from "@/domain/types";

const key = "atomi_challenge_state";

export function loadChallengeState(): ChallengeState | null {
  const state = localStorage.getItem(key);
  return state ? (JSON.parse(state) as ChallengeState) : null;
}

export function saveChallengeState(state: ChallengeState): void {
  localStorage.setItem(key, JSON.stringify(state));
}

export function clearChallengeState(): void {
  localStorage.removeItem(key);
}
