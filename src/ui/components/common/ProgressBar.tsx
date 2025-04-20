import styles from "./ProgressBar.module.css";

export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}): React.JSX.Element {
  const widthPercent = (current / total) * 100;
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${widthPercent}%` }} />
    </div>
  );
}
