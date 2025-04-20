import type { Challenge } from "@/domain/types";
import { useStore } from "@/ui/hooks/useStore";
import { useStateFromStore } from "@/ui/hooks/useStateFromStore";
import { useHandleEvent } from "@/ui/hooks/useHandleEvent";

export type ChallengePageProps = {
  challenge: Challenge;
};

export function useChallenge(props: ChallengePageProps) {
  const { challenge } = props;

  const store = useStore({ challenge });

  const handleEvent = useHandleEvent({ store });

  const state = useStateFromStore({ store });

  return { state, handleEvent };
}
