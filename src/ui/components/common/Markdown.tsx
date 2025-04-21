import styles from "./Markdown.module.css";

function convertLinesToParagraphs(text: string) {
  // Split the text into lines
  const lines = text.split("\n");
  // Filter out empty lines
  const nonEmptyLines = lines.filter((line) => line.trim() !== "");
  // Join the non-empty lines with <p> tags
  const paragraphs = nonEmptyLines.map((line) => `<p>${line}</p>`).join("\n");
  // Return the paragraphs as a single string
  return paragraphs;
}

export function Markdown({ children }: { children: string }) {
  const html = convertLinesToParagraphs(children);
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
