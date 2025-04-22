import { useGetChallengeState } from "@/ui/hooks/useGetChallengeState";
import { ChallengePage } from "./pages/challengePage/ChallengePage";
import { LoadingPage } from "./pages/loadingPage/LoadingPage";
import { ErrorPage } from "./pages/errorPage/ErrorPage";

export type ChallengeContainerProps = {
  challengeId: string;
};

export function ChallengeContainer(props: ChallengeContainerProps) {
  const { challengeId } = props;

  const result = useGetChallengeState({ challengeId });

  switch (result.kind) {
    case "Loading": {
      return <LoadingPage />;
    }
    case "Error": {
      return <ErrorPage message={result.error} />;
    }
    case "Success": {
      return <ChallengePage challengeState={result.challengeState} />;
    }
  }
}
