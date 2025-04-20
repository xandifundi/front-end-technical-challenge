import type { ChallengeStore } from "@/store/types";
import type { ChallengeEvent } from "@/events/types";
import { handleEvent as handleEventInternal } from "@/events/handleEvent";

export type UseChallengeEventsProps = {
  challengeStore: ChallengeStore;
};

export function useHandleEvent(props: UseChallengeEventsProps) {
  const { challengeStore } = props;

  async function handleEvent(event: ChallengeEvent) {
    await handleEventInternal({
      store: challengeStore,
      event,
    });
  }

  return handleEvent;
}
