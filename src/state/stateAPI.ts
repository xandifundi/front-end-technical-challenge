import * as Storage from "@/utils/storage";
import type { ChallengeState } from "@/domain/types";

export function loadChallengeState(): ChallengeState | null {
  const session = Storage.getStorageItem("atomi_challenge_session");
  if (session) {
    return session as ChallengeState;
  }
  return null;
}

export function saveChallengeState(session: ChallengeState): void {
  Storage.setStorageItem("atomi_challenge_session", session);
}

export function clearChallengeState(): void {
  Storage.removeStorageItem("atomi_challenge_session");
}
