import * as API from "@/api";
import type { ChallengeStore } from "@/store/types";
import type {
  ChallengeEvent,
  HandleEventContext,
  HandleEventAPI,
} from "@/events/types";
import { handleEvent as handleEventInternal } from "@/events/handleEvent";

export type UseChallengeEventsProps = {
  store: ChallengeStore;
};

export function useHandleEvent(props: UseChallengeEventsProps) {
  const { store } = props;

  async function handleEvent(event: ChallengeEvent) {
    const api: HandleEventAPI = {
      completeChallengeSession: API.completeChallengeSession,
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
