import type { ChallengeStore } from "@/store/types";
import type { ChallengeEvent } from "@/events/types";
import { handleEvent as handleEventInternal } from "@/events/handleEvent";

export type UseChallengeEventsProps = {
  store: ChallengeStore;
};

export function useHandleEvent(props: UseChallengeEventsProps) {
  const { store } = props;

  async function handleEvent(event: ChallengeEvent) {
    await handleEventInternal({
      store,
      event,
    });
  }

  return handleEvent;
}
