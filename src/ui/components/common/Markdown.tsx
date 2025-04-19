import { marked } from "marked";
import styles from "./Markdown.module.css";

export function Markdown({ children }: { children: string }) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: marked(children) }}
    />
  );
}
