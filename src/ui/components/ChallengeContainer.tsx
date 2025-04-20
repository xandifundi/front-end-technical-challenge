import { useFetchChallenge } from "@/ui/hooks/useFetchChallenge";
import { ChallengePage } from "./pages/challengePage/ChallengePage";
import { LoadingPage } from "./pages/loadingPage/LoadingPage";
import { ErrorPage } from "./pages/errorPage/ErrorPage";

export type ChallengeContainerProps = {
  challengeId: string;
};

export function ChallengeContainer(props: ChallengeContainerProps) {
  const { challengeId } = props;

  const challengeResult = useFetchChallenge({ challengeId });

  switch (challengeResult.kind) {
    case "Loading": {
      return <LoadingPage />;
    }
    case "Error": {
      return <ErrorPage message={challengeResult.error} />;
    }
    case "Success": {
      return <ChallengePage challenge={challengeResult.challenge} />;
    }
  }
}
