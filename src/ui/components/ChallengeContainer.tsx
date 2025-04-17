import { useChallenge } from "@/ui/hooks/useChallenge";
import { Challenge } from "./Challenge";

export type ChallengeContainerProps = {
  challengeId: string;
};

export function ChallengeContainer(props: ChallengeContainerProps) {
  const { challengeId } = props;

  const challengeResult = useChallenge({ challengeId });

  switch (challengeResult.kind) {
    case "Loading": {
      return <div>Loading...</div>;
    }
    case "Error": {
      return <div>Error: {challengeResult.error}</div>;
    }
    case "Success": {
      const { challengeState } = challengeResult;

      return <Challenge challengeState={challengeState} />;
    }
  }
}
