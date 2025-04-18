export type ChallengeItemFooterProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function ChallengeItemFooter(props: ChallengeItemFooterProps) {
  const { onPrevious, onNext } = props;

  return (
    <div>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
