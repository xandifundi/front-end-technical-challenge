import pageStyles from "@/ui/styles/page.module.css";

export type ErrorPageProps = {
  message: string;
};

export function ErrorPage(props: ErrorPageProps) {
  const { message } = props;
  return (
    <div className={pageStyles.page}>
      <main>{message}</main>
    </div>
  );
}
