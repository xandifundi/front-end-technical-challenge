import styles from "./PageLayout.module.css";

export type PageLayoutProps = {
  children: React.ReactNode;
};

export function PageLayout(props: PageLayoutProps) {
  const { children } = props;
  return <div className={styles.page}>{children}</div>;
}
