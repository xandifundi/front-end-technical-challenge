import styles from "./Button.module.css";

export function Button({
  children,
  disabled = false,
  size = "large",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  size?: "small" | "large";
  onClick: () => void;
}) {
  const className = size === "small" ? styles.buttonSmall : styles.buttonLarge;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
