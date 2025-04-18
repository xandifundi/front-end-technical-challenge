export type ChallengeItemFooterProps = {
  onBack: () => void;
  onNext: () => void;
};

export function ChallengeItemFooter(props: ChallengeItemFooterProps) {
  const { onBack, onNext } = props;

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
