import { type ChallengeStore } from "@/store/makeStore";
import { type ChallengeEvent } from "@/events/types";
import { handleEvent as handleEventInternal } from "@/events/handleEvent";

export type UseChallengeEventsProps = {
  challengeStore: ChallengeStore;
};

export function useHandleChallengeEvent(props: UseChallengeEventsProps) {
  const { challengeStore } = props;

  async function handleChallengeEvent(event: ChallengeEvent) {
    await handleEventInternal({
      store: challengeStore,
      event,
    });
  }

  return handleChallengeEvent;
}
