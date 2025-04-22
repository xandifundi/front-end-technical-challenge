import { PageLayout } from "@/ui/components/layouts/PageLayout";

export type ErrorPageProps = {
  message: string;
};

export function ErrorPage(props: ErrorPageProps) {
  const { message } = props;
  return (
    <PageLayout>
      <main>{message}</main>
    </PageLayout>
  );
}
