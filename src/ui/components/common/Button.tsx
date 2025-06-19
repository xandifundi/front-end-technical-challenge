import styles from "./Button.module.css";
import classNames from "classnames";

export function Button({
  children,
  disabled = false,
  size = "large",
  buttonInverse = false,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  size?: "small" | "large";
  buttonInverse?: boolean;
  onClick: () => void;
}) {
  const className = classNames({
    [styles.buttonSmall]: size === "small",
    [styles.buttonLarge]: size === "large",
    [styles.buttonInverse]: buttonInverse,
  });
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
