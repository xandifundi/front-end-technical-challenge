import * as Storage from "@/utils/storage";
import { ChallengeSession } from "@/domain/types";

export function loadChallengeSession(): ChallengeSession | null {
  const session = Storage.getStorageItem("atomi_challenge_session");
  if (session) {
    return session as ChallengeSession;
  }
  return null;
}

export function saveChallengeSession(session: ChallengeSession): void {
  Storage.setStorageItem("atomi_challenge_session", session);
}

export function clearChallengeSession(): void {
  Storage.removeStorageItem("atomi_challenge_session");
}
