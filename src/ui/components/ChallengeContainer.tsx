import { useChallenge } from "@/ui/hooks/useChallenge";
import { ChallengeStartPage } from "./ChallengeStartPage";

export type ChallengeContainerProps = {
  challengeId: string;
};

export function ChallengeContainer(props: ChallengeContainerProps) {
  const { challengeId } = props;

  const challengeState = useChallenge({ challengeId });

  switch (challengeState.kind) {
    case "Loading": {
      return <div>Loading...</div>;
    }
    case "Error": {
      return <div>Error: {challengeState.error}</div>;
    }
    case "Success": {
      const { challenge } = challengeState;

      return (
        <ChallengeStartPage
          challengeName={challenge.title}
          challengeDescription={challenge.description}
          onStart={() => {
            console.log("Challenge started");
          }}
        />
      );
    }
  }
}
