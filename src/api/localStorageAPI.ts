import type { ChallengeState } from "@/domain/types";

function setStorageItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorageItem(key: string): unknown {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export function loadChallengeState(): ChallengeState | null {
  const session = getStorageItem("atomi_challenge_state");
  if (session) {
    return session as ChallengeState;
  }
  return null;
}

export function saveChallengeState(session: ChallengeState): void {
  setStorageItem("atomi_challenge_state", session);
}

export function clearChallengeState(): void {
  removeStorageItem("atomi_challenge_state");
}
