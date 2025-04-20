import { saveChallengeAttempt } from "@/utils/api/saveChallengeAttempt";
import type { ChallengeStore } from "@/store/types";
import type {
  ChallengeEvent,
  HandleEventContext,
  ChallengeAPI,
} from "@/events/types";
import { handleEvent as handleEventInternal } from "@/events/handleEvent";

export type UseChallengeEventsProps = {
  store: ChallengeStore;
};

export function useHandleEvent(props: UseChallengeEventsProps) {
  const { store } = props;

  async function handleEvent(event: ChallengeEvent) {
    const api: ChallengeAPI = {
      saveChallengeAttempt,
    };

    const context: HandleEventContext = {
      store,
      api,
    };

    await handleEventInternal({
      context,
      event,
    });
  }

  return handleEvent;
}
