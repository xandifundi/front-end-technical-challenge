import type { Challenge, ChallengeSession } from "@/domain/types";
import { useStore } from "@/ui/hooks/useStore";
import { useStateFromStore } from "@/ui/hooks/useStateFromStore";
import { useHandleEvent } from "@/ui/hooks/useHandleEvent";

export type ChallengePageProps = {
  challenge: Challenge;
  challengeSession: ChallengeSession | null;
};

export function useChallenge(props: ChallengePageProps) {
  const { challenge, challengeSession } = props;

  const store = useStore({ challenge, challengeSession });

  const handleEvent = useHandleEvent({ store });

  const state = useStateFromStore({ store });

  return { state, handleEvent };
}
